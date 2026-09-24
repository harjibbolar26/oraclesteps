<script setup lang="ts">
import { ArrowUpRight } from "lucide-vue-next";
import type { projects } from "~/data/projects";
defineProps<{ project: (typeof projects)[number] }>();
</script>
<template>
  <article class="project-card">
    <NuxtLink
      :to="'/about-work#' + project.id"
      class="visual-link"
      :aria-label="`Explore ${project.name}`"
      ><ProjectVisual :kind="project.id"
    /></NuxtLink>
    <div class="project-copy">
      <div class="project-kicker">
        <span>{{ project.category }}</span
        ><span>/ {{ project.number }}</span>
      </div>
      <div class="project-title">
        <h3>{{ project.name }}</h3>
        <NuxtLink
          :to="'/about-work#' + project.id"
          :aria-label="`Read ${project.name} case study`"
          ><ArrowUpRight :size="22"
        /></NuxtLink>
      </div>
      <p>{{ project.title }}</p>
      <div class="tags">
        <span v-for="tag in project.stack.slice(0, 3)" :key="tag">{{
          tag
        }}</span>
      </div>
    </div>
  </article>
</template>
