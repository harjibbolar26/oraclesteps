<script setup lang="ts">
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  Layers3,
  Activity,
} from "lucide-vue-next";
import { projects } from "~/data/projects";
useSeoMeta({
  title: "Our Work & Impact | OracleSteps",
  ogTitle: "Engineering Track Record | OracleSteps",
  description:
    "Deep dive into how OracleSteps engineers solution architectures for transport authorities, fintech startups, data platforms, and logistics systems.",
});
const principles = [
  {
    icon: Activity,
    title: "Zero-downtime reliability",
    text: "Engineered for maximum operational uptime.",
  },
  {
    icon: Layers3,
    title: "Modular scalability",
    text: "Clean microservices and modular frontend structures.",
  },
  {
    icon: ShieldCheck,
    title: "Security first",
    text: "Built-in compliance and encryption protocols from day one.",
  },
];
</script>
<template>
  <div>
    <section class="page-hero container">
      <span class="eyebrow">WORK & IMPACT / ORACLESTEPS</span>
      <h1>
        Technical excellence.<br /><span class="gradient-text"
          >Real-world impact.</span
        >
      </h1>
      <div class="about-intro">
        <h2>Complex software problems.<br />Refined, scalable engineering.</h2>
        <p>
          OracleSteps was founded on a singular premise: complex software
          problems require refined, scalable engineering. We operate at the
          intersection of enterprise architecture, modern web frameworks, and
          artificial intelligence. From modernizing metropolitan transit portals
          to protecting financial ecosystems with artificial intelligence, our
          engineered solutions handle millions in traffic and revenue.
        </p>
      </div>
      <div class="principles">
        <article v-for="(p, i) in principles" :key="p.title">
          <component :is="p.icon" :size="23" /><span class="mono"
            >0{{ i + 1 }}</span
          >
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </article>
      </div>
    </section>
    <section class="container case-studies">
      <div class="section-heading">
        <div>
          <span class="eyebrow">THE ENGINEERING BEHIND THE IMPACT</span>
          <h2>
            Four platforms.<br /><span class="muted"
              >A world of possibilities.</span
            >
          </h2>
        </div>
      </div>
      <article
        v-for="project in projects"
        :id="project.id"
        :key="project.id"
        class="case-study"
      >
        <div class="case-visual">
          <ProjectVisual :kind="project.id" />
          <div class="case-links">
            <a :href="project.url" target="_blank" rel="noopener noreferrer"
              >Visit {{ project.short }} <ArrowUpRight :size="16" /></a
            ><a
              v-if="project.extra"
              :href="project.extra"
              target="_blank"
              rel="noopener noreferrer"
              >Tenant portal <ArrowUpRight :size="16"
            /></a>
          </div>
        </div>
        <div class="case-copy">
          <span class="eyebrow"
            >{{ project.number }} / {{ project.category }}</span
          >
          <h2>{{ project.name }}</h2>
          <h3>{{ project.headline }}</h3>
          <p>{{ project.description }}</p>
          <ul>
            <li v-for="feature in project.features" :key="feature">
              <Check :size="16" /><span>{{ feature }}</span>
            </li>
          </ul>
          <span class="eyebrow">BUILT WITH</span>
          <div class="tags">
            <span v-for="tag in project.stack" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </section>
    <ContactBanner />
  </div>
</template>
