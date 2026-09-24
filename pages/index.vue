<script setup lang="ts">
import {
  ArrowUpRight,
  ArrowDown,
  Layers3,
  BrainCircuit,
  Cloud,
  ChartNoAxesCombined,
} from "lucide-vue-next";
import { projects } from "~/data/projects";
useSeoMeta({
  title: "OracleSteps | Enterprise Software Solutions & Digital Transformation",
  ogTitle: "OracleSteps | Enterprise Software Solutions & Engineering",
  description:
    "OracleSteps crafts scalable, high-performance web applications, AI-powered financial tools, transport logistics platforms, and enterprise data analytics software.",
  ogDescription:
    "OracleSteps crafts scalable, high-performance web applications, AI-powered financial tools, transport logistics platforms, and enterprise data analytics software.",
  ogImage: "https://oraclesteps.com/og-image.jpg",
  twitterCard: "summary_large_image",
});
const services = [
  {
    icon: Layers3,
    title: "Enterprise engineering",
    description:
      "Fast, resilient full-stack applications. Built for high concurrency and the complexity of your business.",
    tags: "FULL-STACK / SSR / ENTERPRISE",
  },
  {
    icon: BrainCircuit,
    title: "AI & machine learning",
    description:
      "Predictive intelligence, automated security scoring, and custom LLM workflows, embedded where they matter.",
    tags: "PREDICTIVE AI / LLM / AUTOMATION",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Auto-scaling, cloud-agnostic infrastructure with dependable CI/CD pipelines and security compliance.",
    tags: "CLOUD / CI/CD / INFRASTRUCTURE",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Data & analytics",
    description:
      "High-throughput data pipelines and intuitive dashboards that turn complex information into confident decisions.",
    tags: "DATA SCIENCE / VISUALIZATION",
  },
];
</script>
<template>
  <section class="hero">
    <ClientOnly><QuantumMesh /></ClientOnly>
    <div class="hero-glow" />
    <div class="container hero-content">
      <div class="hero-eyebrow">
        <span class="small-star">✦</span> NEXT-GENERATION SOFTWARE ENGINEERING
      </div>
      <h1>
        Architecting high-scale<br />digital ecosystems.<br /><span
          class="gradient-text"
          >Engineering growth.</span
        >
      </h1>
      <p>
        Robust, AI-powered, mission-critical software.<br
          class="desktop-break"
        />
        From urban mobility to intelligent fintech, we build the systems<br
          class="desktop-break"
        />
        that move enterprises forward.
      </p>
      <div class="hero-actions">
        <a class="button primary" href="#work"
          >Explore our portfolio <ArrowUpRight :size="18" /></a
        ><NuxtLink class="button secondary" to="/contact"
          >Schedule a tech consultation <ArrowUpRight :size="17"
        /></NuxtLink>
      </div>
      <div class="hero-bottom">
        <span class="mono">BUILT FOR COMPLEXITY. DESIGNED FOR IMPACT.</span
        ><a href="#work" class="scroll-link"
          >SCROLL TO EXPLORE <ArrowDown :size="15"
        /></a>
      </div>
    </div>
  </section>
  <section class="metrics container" aria-label="Our impact">
    <div>
      <span class="metric-number" data-counter="99.99"
        >99.99<span>%</span></span
      >
      <p>Platform uptime ensured</p>
    </div>
    <div>
      <span class="metric-number" data-counter="4">4<span>+</span></span>
      <p>Enterprise-scale systems deployed</p>
    </div>
    <div>
      <span class="metric-number">Millions<span>+</span></span>
      <p>Daily transactions & users handled</p>
    </div>
    <div class="metric-note">
      <span class="eyebrow">ENGINEERING AT SCALE</span>
      <p>Real systems.<br />Real-world impact.</p>
    </div>
  </section>
  <section id="work" class="section container">
    <div class="section-heading" data-reveal>
      <div>
        <span class="eyebrow">01 / SELECTED WORK</span>
        <h2>
          Complexity, solved.<br /><span class="muted">Impact, delivered.</span>
        </h2>
      </div>
      <div class="section-intro">
        <p>
          Purpose-built platforms for the industries<br class="desktop-break" />
          shaping how we move, transact, and grow.
        </p>
        <NuxtLink class="text-link" to="/about-work"
          >Explore our work <ArrowUpRight :size="17"
        /></NuxtLink>
      </div>
    </div>
    <div class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        data-reveal
      />
    </div>
  </section>
  <section id="services" class="services-section">
    <div class="container section">
      <div class="section-heading" data-reveal>
        <div>
          <span class="eyebrow">02 / OUR EXPERTISE</span>
          <h2>
            Engineered for resilience.<br /><span class="muted"
              >Built for scale.</span
            >
          </h2>
        </div>
        <p class="section-intro">
          Deep technical expertise.<br />A relentless focus on your business.
        </p>
      </div>
      <div class="services-grid">
        <article
          v-for="(service, i) in services"
          :key="service.title"
          data-reveal
        >
          <div class="service-top">
            <component :is="service.icon" :size="28" :stroke-width="1.4" /><span
              class="mono"
              >0{{ i + 1 }}</span
            >
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <span class="service-tags mono">{{ service.tags }}</span>
        </article>
      </div>
    </div>
  </section>
  <ContactBanner />
</template>
