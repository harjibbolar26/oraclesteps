<script setup lang="ts">
import {
  ShieldCheck,
  Globe2,
  BarChart3,
  TrainFront,
  ArrowUpRight,
  Check,
} from "lucide-vue-next";
defineProps<{ kind: string }>();
</script>
<template>
  <div
    class="project-visual"
    :class="kind"
    role="img"
    :aria-label="`${kind} illustrative product dashboard, sample data`"
  >
    <div class="visual-grid" />
    <div class="mini-window">
      <div class="window-top">
        <div class="window-dots"><i /><i /><i /></div>
        <span>{{
          kind === "lamata"
            ? "LAMATA / OPERATIONS"
            : kind === "securepay"
              ? "SECUREPAY / INTELLIGENCE"
              : kind === "gxpanse"
                ? "GXPANSE / GLOBAL NETWORK"
                : "CHISQUARES / WORKSPACE"
        }}</span
        ><span>↗</span>
      </div>
      <div class="window-content">
        <template v-if="kind === 'lamata'"
          ><div class="mini-heading">
            <TrainFront :size="20" /><b>Connected infrastructure</b
            ><span class="tiny-pill">LIVE</span>
          </div>
          <div class="transit-map">
            <svg viewBox="0 0 460 150" aria-hidden="true">
              <path
                class="map-road"
                d="M0 35H460M0 85H460M80 0V150M180 0V150M280 0V150M380 0V150"
              />
              <path class="route-blue" d="M25 110H125L205 35H420" />
              <path class="route-green" d="M80 15V65L160 125H400" />
              <g
                v-for="(p, i) in [
                  [25, 110],
                  [125, 110],
                  [205, 35],
                  [310, 35],
                  [420, 35],
                  [80, 15],
                  [160, 125],
                  [280, 125],
                  [400, 125],
                ]"
                :key="i"
              >
                <circle
                  :cx="p[0]"
                  :cy="p[1]"
                  r="5"
                  fill="#0b1627"
                  stroke="currentColor"
                  stroke-width="3"
                />
              </g></svg
            ><span class="map-label">LAGOS TRANSIT NETWORK</span>
          </div>
          <div class="mini-stats">
            <span>Tenant management<b>Connected</b></span
            ><span
              >Digital leases<b>Automated <Check :size="13" /></b></span
            ><span>Operations<b>One platform</b></span>
          </div></template
        >
        <template v-else-if="kind === 'securepay'"
          ><div class="mini-heading">
            <ShieldCheck :size="20" /><b>Transaction intelligence</b
            ><span class="tiny-pill">PROTECTED</span>
          </div>
          <div class="payment-chart">
            <div class="shield-orbit"><ShieldCheck :size="48" /></div>
            <div>
              <span class="eyebrow">RISK ASSESSMENT</span
              ><b class="risk-label">Intelligence in every<br />transaction.</b
              ><span class="signal"><i />Real-time verification</span>
            </div>
          </div>
          <div
            class="transaction-row"
            v-for="(label, i) in [
              'Risk scoring',
              'Payment routing',
              'Chargeback protection',
            ]"
            :key="label"
          >
            <span
              >0{{ i + 1 }} <b>{{ label }}</b></span
            ><Check :size="14" /></div
        ></template>
        <template v-else-if="kind === 'gxpanse'"
          ><div class="mini-heading">
            <Globe2 :size="20" /><b>Borderless operations</b
            ><span class="tiny-pill">CONNECTED</span>
          </div>
          <svg class="network-diagram" viewBox="0 0 460 180" aria-hidden="true">
            <g stroke="currentColor" fill="none" opacity=".4">
              <ellipse cx="230" cy="90" rx="160" ry="70" />
              <ellipse cx="230" cy="90" rx="90" ry="70" />
              <ellipse cx="230" cy="90" rx="30" ry="70" />
              <path
                d="M70 90H390M90 55H370M90 125H370M115 135Q220 -50 355 70M130 60Q215 190 345 120"
              />
            </g>
            <g
              v-for="(p, i) in [
                [130, 60],
                [200, 95],
                [270, 45],
                [345, 120],
                [300, 100],
              ]"
              :key="i"
            >
              <circle
                :cx="p[0]"
                :cy="p[1]"
                r="12"
                fill="currentColor"
                opacity=".12"
              />
              <circle :cx="p[0]" :cy="p[1]" r="4" fill="currentColor" />
            </g>
          </svg>
          <div class="network-tags">
            <span>Compliance <Check :size="12" /></span
            ><span>Supply chain <Check :size="12" /></span
            ><span>ERP integrations <Check :size="12" /></span></div
        ></template>
        <template v-else
          ><div class="mini-heading">
            <BarChart3 :size="20" /><b>From data to discovery</b
            ><span class="tiny-pill">ANALYSIS</span>
          </div>
          <div class="analytics-display">
            <div class="bar-chart">
              <div
                v-for="(n, i) in [34, 48, 39, 68, 52, 82, 66, 93, 78, 100]"
                :key="i"
                :style="{ height: n + '%' }"
              />
            </div>
            <div class="analysis-side">
              <span>STATISTICAL MODELS</span><b>χ²</b
              ><span>Chi-Square · ANOVA<br />Regression</span>
            </div>
          </div>
          <div class="mini-stats">
            <span>Explore<b>No-code analysis</b></span
            ><span
              >Discover<b>Clear insights <ArrowUpRight :size="12" /></b
            ></span></div
        ></template>
      </div>
    </div>
    <span class="visual-caption">ILLUSTRATIVE PRODUCT VIEW</span>
  </div>
</template>
