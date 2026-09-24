<script setup lang="ts">
import type {projects} from '~/data/projects'
defineProps<{project:typeof projects[number]}>()
</script>
<template><article class="project-card"><NuxtLink :to="'/about-work#'+project.id" class="visual-link" :aria-label="`Read about ${project.name}`"><ProjectVisual :kind="project.id"/></NuxtLink><div class="project-copy"><span class="project-kicker">{{project.category}}</span><h3><NuxtLink :to="'/about-work#'+project.id">{{project.name}}</NuxtLink></h3><p>{{project.description}}</p><div class="project-actions"><NuxtLink :to="'/about-work#'+project.id">Read case study</NuxtLink><a :href="project.url" target="_blank" rel="noopener noreferrer">Visit website</a></div></div></article></template>
