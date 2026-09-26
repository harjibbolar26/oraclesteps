<script setup lang="ts">
useSeoMeta({
  title: "Contact Us | OracleSteps",
  ogTitle: "Get in Touch | OracleSteps",
  description:
    "Contact the software engineering experts at OracleSteps for enterprise solutions, tech consultations, and custom platform development.",
});
const form = reactive({
  name: "",
  email: "",
  category: "",
  budget: "",
  description: "",
  website: "",
});
const sending = ref(false);
const sent = ref(false);
const sendError = ref("");
const feedback = ref<HTMLElement | null>(null);
watch([sent, sendError], async () => {
  if (!sent.value && !sendError.value) return;
  await nextTick();
  feedback.value?.scrollIntoView({ block: "center", behavior: "instant" });
});
const errors = reactive<Record<string, string>>({});
const categories = [
  "Fintech",
  "Transit / Public Sector",
  "AI / Analytics",
  "Custom Enterprise Application",
];
const budgets = [
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000+",
  "Let’s discuss",
];
function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!form.category) errors.category = "Please select a project category.";
  if (!form.budget) errors.budget = "Please select a budget range.";
  if (form.description.trim().length < 20)
    errors.description =
      "Please share at least 20 characters about your project.";
  const valid = Object.keys(errors).length === 0;
  if (!valid)
    nextTick(() =>
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
    );
  return valid;
}
async function submitEnquiry() {
  if (sending.value) return;
  sent.value = false;
  sendError.value = "";
  if (!validate()) return;
  sending.value = true;
  try {
    const response = await $fetch<{ success: boolean }>("/api/contact", { method: "POST", body: { ...form } });
    if (!response.success) throw new Error("Not accepted");
    Object.assign(form, { name: "", email: "", category: "", budget: "", description: "", website: "" });
    sent.value = true;
  } catch (error: any) {
    sendError.value = error?.statusCode === 429
      ? "Too many enquiries. Please wait a few minutes before trying again."
      : "We couldn’t confirm your enquiry was sent. Please try again later or email contact@oraclesteps.com.";
  } finally {
    sending.value = false;
  }
}
</script>
<template>
  <section class="container contact-page">
    <div class="contact-intro">
      <span class="eyebrow">LET’S BUILD SOMETHING THAT MATTERS</span>
      <h1>
        Your next system.<br /><span class="gradient-text"
          >Our next challenge.</span
        >
      </h1>
      <p>
        From a complex technical challenge to your next market-leading product.
        Let’s explore what we can build together.
      </p>
      <div class="contact-detail">

        <div>
          <span class="eyebrow">EMAIL US</span
          ><a href="mailto:contact@oraclesteps.com"
            >contact@oraclesteps.com </a>
        </div>
      </div>
      <div class="contact-detail">

        <div>
          <span class="eyebrow">WHERE WE WORK</span>
          <p>Global operations.<br />Remote-first enterprise engineering.</p>
        </div>
      </div>
      <div class="contact-detail"><span class="eyebrow">CALL OR WHATSAPP</span><a href="tel:+2348105986225">+234 810 598 6225</a><a href="https://wa.me/2348105986225" target="_blank" rel="noopener noreferrer">Start a WhatsApp conversation</a></div>
      <div class="contact-note">
        <span class="mono">01 / SHARE YOUR VISION</span
        ><span class="mono">02 / EXPLORE THE POSSIBILITIES</span
        ><span class="mono">03 / BUILD WHAT’S NEXT</span>
      </div>
    </div>
    <div class="form-panel">
      <span class="eyebrow">PROJECT ENQUIRY</span>
      <h2>Let’s build your next<br />digital system.</h2>
      <div ref="feedback" class="enquiry-feedback">
        <div v-if="sent" class="enquiry-message enquiry-message--success" role="status">
          <p>Thank you. Your enquiry has been sent.</p>
          <p>Our team will reply to the email address you provided.</p>
        </div>
        <p v-if="sendError" class="enquiry-message enquiry-message--error" role="alert">{{ sendError }}</p>
      </div>
      <form novalidate @submit.prevent="submitEnquiry" :aria-busy="sending">
        <div class="enquiry-trap" aria-hidden="true"><label for="website">Leave this field empty</label><input id="website" v-model="form.website" tabindex="-1" autocomplete="off"></div>
        <fieldset :disabled="sending" class="enquiry-fields">
        <div class="form-row">
          <div class="field">
            <label for="name">Full name <span>*</span></label
            ><input
              id="name"
              v-model="form.name"
              autocomplete="name"
              placeholder="Your full name"
              required
              maxlength="120"
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'name-error' : undefined"
            />
            <p v-if="errors.name" id="name-error" class="field-error">
              {{ errors.name }}
            </p>
          </div>
          <div class="field">
            <label for="email">Email address <span>*</span></label
            ><input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="you@company.com"
              required
              maxlength="254"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : undefined"
            />
            <p v-if="errors.email" id="email-error" class="field-error">
              {{ errors.email }}
            </p>
          </div>
        </div>
        <div class="field">
          <label for="category">Project category <span>*</span></label
          ><select
            id="category"
            v-model="form.category"
            required
            :aria-invalid="!!errors.category"
            :aria-describedby="errors.category ? 'category-error' : undefined"
          >
            <option disabled value="">What are we building?</option>
            <option v-for="category in categories" :key="category">
              {{ category }}
            </option>
          </select>
          <p v-if="errors.category" id="category-error" class="field-error">
            {{ errors.category }}
          </p>
        </div>
        <div class="field">
          <label for="budget">Estimated budget <span>*</span></label
          ><select
            id="budget"
            v-model="form.budget"
            required
            :aria-invalid="!!errors.budget"
            :aria-describedby="errors.budget ? 'budget-error' : undefined"
          >
            <option disabled value="">Select a range (USD)</option>
            <option v-for="budget in budgets" :key="budget">
              {{ budget }}
            </option>
          </select>
          <p v-if="errors.budget" id="budget-error" class="field-error">
            {{ errors.budget }}
          </p>
        </div>
        <div class="field">
          <label for="description"
            >Tell us about your project <span>*</span></label
          ><textarea
            id="description"
            v-model="form.description"
            rows="5"
            maxlength="5000"
            placeholder="Your vision, the challenge, and what success looks like…"
            required
            :aria-invalid="!!errors.description"
            :aria-describedby="
              errors.description ? 'description-error' : undefined
            "
          />
          <p
            v-if="errors.description"
            id="description-error"
            class="field-error"
          >
            {{ errors.description }}
          </p>
        </div>
        <button class="button primary submit-button" type="submit" :disabled="sending">
          {{ sending ? 'Sending…' : 'Send enquiry' }}
        </button>
        </fieldset>
        <p class="form-disclaimer">Your enquiry goes directly to our team at contact@oraclesteps.com.</p>
      </form>
    </div>
  </section>
</template>
