<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
const open = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => open.value = false)
</script>
<template>
 <div class="site-shell">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="header"><div class="container nav-wrap">
   <NuxtLink to="/" class="logo" aria-label="OracleSteps home"><span class="logo-mark"><i/><i/><i/></span>Oracle<span>Steps</span><span class="logo-period">.</span></NuxtLink>
   <nav class="desktop-nav" aria-label="Main navigation"><NuxtLink to="/">Home</NuxtLink><NuxtLink to="/about-work">Work & Impact</NuxtLink><NuxtLink to="/#services">Services</NuxtLink></nav>
   <NuxtLink class="nav-contact" to="/contact">Let’s talk </NuxtLink>
   <button class="menu-toggle" :aria-expanded="open" aria-controls="mobile-nav" :aria-label="open ? 'Close navigation' : 'Open navigation'" @click="open=!open"><X v-if="open"/><Menu v-else/></button>
  </div><nav v-if="open" id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation"><NuxtLink to="/">Home</NuxtLink><NuxtLink to="/about-work">Work & Impact</NuxtLink><NuxtLink to="/#services">Services</NuxtLink><NuxtLink to="/contact">Contact</NuxtLink></nav></header>
  <main id="main"><NuxtPage/></main>
  <footer id="site-footer" class="footer"><div class="container footer-inner"><div class="footer-top"><div><NuxtLink to="/" class="logo">Oracle<span>Steps</span><span class="logo-period">.</span></NuxtLink><p>Enterprise Software Solutions.<br>Engineering what comes next.</p></div><div><span class="eyebrow">EXPLORE</span><NuxtLink to="/">Home</NuxtLink><NuxtLink to="/about-work">Work & Impact</NuxtLink><NuxtLink to="/#services">Services</NuxtLink><NuxtLink to="/contact">Contact</NuxtLink></div><div><span class="eyebrow">SELECTED WORK</span><NuxtLink to="/about-work#lamata">LAMATA</NuxtLink><NuxtLink to="/about-work#securepay">GetSecurePay AI</NuxtLink><NuxtLink to="/about-work#gxpanse">Gxpanse</NuxtLink><NuxtLink to="/about-work#chisquares">ChiSquares</NuxtLink></div><div><span class="eyebrow">START A CONVERSATION</span><a href="mailto:contact@oraclesteps.com">contact@oraclesteps.com </a><a href="tel:+2348105986225">+234 810 598 6225</a><a href="https://wa.me/2348105986225" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a><p>Based in Nigeria. Working globally.</p></div></div><div class="footer-bottom"><span>© 2026 OracleSteps. All rights reserved.</span><div><NuxtLink to="/privacy">Privacy Policy</NuxtLink><NuxtLink to="/terms">Terms of Service</NuxtLink></div></div></div></footer>
 </div>
</template>
