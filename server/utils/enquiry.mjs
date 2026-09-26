export const categories = [
  "Fintech",
  "Transit / Public Sector",
  "AI / Analytics",
  "Custom Enterprise Application",
];
export const budgets = [
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000+",
  "Let’s discuss",
];
export function validateEnquiry(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const result = {};
  for (const [key, min, max] of [
    ["name", 2, 120],
    ["email", 3, 254],
    ["category", 1, 80],
    ["budget", 1, 80],
    ["description", 20, 5000],
  ]) {
    if (typeof body[key] !== "string") return null;
    const value = body[key].trim();
    if (value.length < min || value.length > max || value.includes("\0"))
      return null;
    result[key] = value;
  }
  if (
    /[\r\n]/.test(result.name) ||
    !/^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]+$/.test(result.email)
  )
    return null;
  if (!categories.includes(result.category) || !budgets.includes(result.budget))
    return null;
  if (body.website !== undefined && body.website !== "") return null;
  return result;
}
export function enquiryMessage(enquiry, sender) {
  return {
    from: { name: "OracleSteps website", address: sender },
    to: "contact@oraclesteps.com",
    replyTo: { name: enquiry.name, address: enquiry.email },
    subject: `Project enquiry: ${enquiry.category}`,
    text: `New OracleSteps project enquiry\n\nName: ${enquiry.name}\nEmail: ${enquiry.email}\nCategory: ${enquiry.category}\nBudget: ${enquiry.budget}\n\n${enquiry.description}`,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}
