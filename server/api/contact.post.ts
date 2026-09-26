import nodemailer from "nodemailer";
import { validateEnquiry, enquiryMessage } from "../utils/enquiry.mjs";

// A bounded per-instance throttle. Use hosting firewall limits for distributed enforcement.
const attempts = new Map<string, { count: number; expires: number }>();
export default defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const origin = getHeader(event, "origin");
  if (origin && origin !== getRequestURL(event).origin) {
    throw createError({
      statusCode: 403,
      statusMessage: "Request not allowed.",
    });
  }
  if (!getHeader(event, "content-type")?.startsWith("application/json")) {
    throw createError({
      statusCode: 415,
      statusMessage: "Please submit the contact form.",
    });
  }
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires <= now) attempts.delete(key);
  const ip = getRequestIP(event) || "unknown";
  const attempt = attempts.get(ip);
  if ((attempt && attempt.count >= 5) || (!attempt && attempts.size >= 5000)) {
    setHeader(event, "Retry-After", "600");
    throw createError({
      statusCode: 429,
      statusMessage: "Too many enquiries. Please try again later.",
    });
  }
  attempts.set(ip, {
    count: (attempt?.count || 0) + 1,
    expires: attempt?.expires || now + 600_000,
  });
  if (Number(getHeader(event, "content-length") || 0) > 32_000) {
    throw createError({
      statusCode: 413,
      statusMessage: "Your enquiry is too long.",
    });
  }
  const raw = await readRawBody(event);
  if (!raw || Buffer.byteLength(raw) > 32_000)
    throw createError({
      statusCode: 413,
      statusMessage: "Invalid enquiry size.",
    });
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid enquiry." });
  }
  const enquiry = validateEnquiry(body);
  if (!enquiry)
    throw createError({
      statusCode: 400,
      statusMessage: "Please check your enquiry details.",
    });
  const config = useRuntimeConfig(event);
  const port = Number(config.smtpPort);
  if (
    !config.smtpHost ||
    !config.smtpUser ||
    !config.smtpPassword ||
    ![465, 587].includes(port)
  ) {
    throw createError({
      statusCode: 503,
      statusMessage:
        "Unable to send right now. Please email contact@oraclesteps.com.",
    });
  }
  const transport = nodemailer.createTransport({
    host: config.smtpHost,
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: config.smtpUser, pass: config.smtpPassword },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail(
      enquiryMessage(enquiry, config.smtpUser),
    );
    if (
      !result.accepted.some(
        (address) =>
          String(address).toLowerCase() === "contact@oraclesteps.com",
      )
    )
      throw new Error("Recipient not accepted");
    return { success: true };
  } catch {
    // Never expose SMTP credentials, provider responses, or visitor details.
    throw createError({
      statusCode: 502,
      statusMessage:
        "Unable to confirm sending. Please email contact@oraclesteps.com or try again later.",
    });
  } finally {
    transport.close();
  }
});
