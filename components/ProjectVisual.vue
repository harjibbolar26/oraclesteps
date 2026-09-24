<script setup lang="ts">
import { projects } from '~/data/projects'
const props=defineProps<{kind:string}>()
const project=computed(()=>projects.find(p=>p.id===props.kind))
const screenshots:Record<string,string>={
  lamata:'/images/projects/lamata.png',
  securepay:'/images/projects/securepay.png',
  gxpanse:'/images/projects/gxpanse.png',
  chisquares:'/images/projects/chisquares.png'
}
const screenshot=computed(()=>screenshots[props.kind])
</script>
<template><figure v-if="screenshot" class="project-visual"><img :src="screenshot" :alt="`${project?.name} website screenshot`" width="1897" height="956" loading="lazy"></figure></template>
