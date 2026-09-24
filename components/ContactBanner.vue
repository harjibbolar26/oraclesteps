<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";
</script>
<template>
  <section class="contact-banner container">
    <div class="banner-inner">
      <div>
        <span class="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>
          Complex challenges.<br /><span class="muted"
            >Extraordinary possibilities.</span
          >
        </h2>
        <p>
          Partner with OracleSteps to build scalable software that stands out.
        </p>
      </div>
      <NuxtLink class="button primary" to="/contact"
        >Start your project <ArrowUpRight :size="18"
      /></NuxtLink>
    </div>
  </section>
</template>
