<script setup lang="ts">
import { projects } from "~/data/projects";
useSeoMeta({
  title: "Our Work & Impact | OracleSteps",
  ogTitle: "Engineering Track Record | OracleSteps",
  description:
    "Deep dive into how OracleSteps engineers solution architectures for transport authorities, fintech startups, data platforms, and logistics systems.",
});
const principles = [
  {

    title: "Zero-downtime reliability",
    text: "Engineered for maximum operational uptime.",
  },
  {

    title: "Modular scalability",
    text: "Clean microservices and modular frontend structures.",
  },
  {

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
          to protecting financial ecosystems with artificial intelligence, we help organisations turn demanding workflows into clear, usable digital experiences.
        </p>
      </div>
      <div class="principles">
        <article v-for="(p, i) in principles" :key="p.title">
          <span class="mono"
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
          <ProjectVisual :kind="project.id" /><figure v-if="project.id === 'chisquares'" class="case-detail-image"><img src="/images/projects/chisquares-features.png" alt="Chisquares survey builder and feature overview" width="1897" height="956" loading="lazy"><figcaption>Survey design on the Chisquares platform.</figcaption></figure>
          <p class="case-audience"><span class="eyebrow">WHO IT SERVES</span>{{ project.audience }}</p><div class="case-links">
            <a :href="project.url" target="_blank" rel="noopener noreferrer"
              >Visit {{ project.short }} </a
            ><a
              v-if="project.extra"
              :href="project.extra"
              target="_blank"
              rel="noopener noreferrer"
              >Tenant portal </a>
          </div>
        </div>
        <div class="case-copy">
          <span class="eyebrow"
            >{{ project.number }} / {{ project.category }}</span
          >
          <h2>{{ project.name }}</h2>
          <h3>{{ project.headline }}</h3>
          <p>{{ project.description }}</p><p class="case-context">{{ project.context }}</p><h4 class="eyebrow case-label">Platform capabilities</h4>
          <ul>
            <li v-for="feature in project.features" :key="feature">
              <span>{{ feature }}</span>
            </li>
          </ul>
          <div class="case-value"><span class="eyebrow">WHY IT MATTERS</span><p>{{ project.value }}</p></div>
        </div>
      </article>
    </section>
    <StackApproach />
    <ContactBanner />
  </div>
</template>
