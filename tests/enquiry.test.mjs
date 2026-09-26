import test from "node:test";
import assert from "node:assert/strict";
import { validateEnquiry, enquiryMessage } from "../server/utils/enquiry.mjs";
const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  category: "Fintech",
  budget: "Let’s discuss",
  description: "A sufficiently detailed project enquiry.",
  website: "",
};
test("valid enquiries are trimmed and unexpected routing fields are discarded", () => {
  const data = validateEnquiry({
    ...valid,
    name: " Test Visitor ",
    to: "attacker@example.com",
  });
  assert.equal(data.name, "Test Visitor");
  const message = enquiryMessage(data, "contact@oraclesteps.com");
  assert.equal(message.to, "contact@oraclesteps.com");
  assert.equal(message.from.address, "contact@oraclesteps.com");
  assert.equal(message.replyTo.address, valid.email);
  assert.equal(message.html, undefined);
});
test("rejects malformed inputs, header injection, oversized content and honeypot submissions", () => {
  for (const data of [
    null,
    [],
    { ...valid, email: "x@example.com\r\nBcc:a@example.com" },
    { ...valid, name: "Name\nBcc" },
    { ...valid, description: "x".repeat(5001) },
    { ...valid, category: "Unknown" },
    { ...valid, budget: "Unknown" },
    { ...valid, website: "https://spam.test" },
    { ...valid, name: { value: "Name" } },
  ])
    assert.equal(validateEnquiry(data), null);
});
