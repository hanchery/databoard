<template>
  <div class="dashboard-bg">
    <div class="dashboard-container">
      <!-- Top Bar -->
      <header class="top-bar glass-card">
        <div class="logo-area">
          <h1 class="title">数据大屏</h1>
          <span class="subtitle">DataBoard</span>
        </div>
        <ClockDisplay />
      </header>

      <!-- Main Content -->
      <main class="main-grid">
        <!-- Top Row: Summary Cards -->
        <section class="grid-row summary-row">
          <div
            v-for="(card, idx) in summaryCards"
            :key="idx"
            class="grid-item col-3"
          >
            <SummaryCard
              :label="card.label"
              :value="card.value"
              :unit="card.unit"
              :icon="card.icon"
              :icon-color="card.iconColor"
              :format="card.format"
            />
          </div>
        </section>

        <!-- Second Row: Trend + Category -->
        <section class="grid-row two-col-row">
          <div class="grid-item col-8 chart-panel glass-card">
            <PanelTitle title="访问趋势" />
            <div class="chart-wrapper">
              <TrendChart :data="data.trends" />
            </div>
          </div>
          <div class="grid-item col-4 chart-panel glass-card">
            <PanelTitle title="分类占比" />
            <div class="chart-wrapper">
              <CategoryChart :data="data.categories" />
            </div>
          </div>
        </section>

        <!-- Third Row: Center + CityRank + Radar -->
        <section class="grid-row three-col-row">
          <div class="grid-item col-5 chart-panel glass-card">
            <PanelTitle title="中心态势总览" />
            <div class="chart-wrapper">
              <CenterGraph :nodes="data.centerNodes" :links="data.centerLinks" />
            </div>
          </div>
          <div class="grid-item col-3 chart-panel glass-card">
            <PanelTitle title="城市访问排名" />
            <div class="chart-wrapper">
              <CityRankChart :data="data.cityRanks" />
            </div>
          </div>
          <div class="grid-item col-4 chart-panel glass-card">
            <PanelTitle title="能力雷达模型" />
            <div class="chart-wrapper">
              <RadarChart :data="data.radar" />
            </div>
          </div>
        </section>

        <!-- Fourth Row: Activities -->
        <section class="grid-row">
          <div class="grid-item col-12 chart-panel glass-card">
            <PanelTitle title="实时动态与告警" />
            <ActivityPanel :data="data.activities" />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardData } from '@/types/dashboard'
import { formatNumber } from '@/utils/format'

import SummaryCard from '@/components/SummaryCard.vue'
import PanelTitle from '@/components/PanelTitle.vue'
import ClockDisplay from '@/components/ClockDisplay.vue'
import ActivityPanel from '@/components/ActivityPanel.vue'
import TrendChart from '@/charts/TrendChart.vue'
import CategoryChart from '@/charts/CategoryChart.vue'
import CenterGraph from '@/charts/CenterGraph.vue'
import CityRankChart from '@/charts/CityRankChart.vue'
import RadarChart from '@/charts/RadarChart.vue'

const props = defineProps<{ data: DashboardData }>()

const summaryCards = computed(() => [
  { label: '今日访问量', value: props.data.summary.dailyVisits, icon: '👁', iconColor: '#4fc3f7' },
  { label: '实时订单数', value: props.data.summary.realtimeOrders, icon: '📦', iconColor: '#81c784' },
  { label: '活跃用户数', value: props.data.summary.activeUsers, icon: '👤', iconColor: '#ffb74d' },
  { label: '系统健康度', value: props.data.summary.systemHealth, unit: '%', icon: '❤', iconColor: '#e57373', format: 'percent' as const },
])
</script>

<style scoped>
.dashboard-bg {
  width: 100vw;
  min-height: 100vh;
  background: radial-gradient(ellipse at 20% 20%, rgba(79, 195, 247, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(129, 199, 132, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, #0a1628 0%, #132043 30%, #0f1d3a 60%, #0a1628 100%);
  display: flex;
  justify-content: center;
  padding: 16px;
}

.dashboard-container {
  width: 1920px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Top Bar */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
}

.logo-area {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 4px;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
}

/* Grid System */
.main-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid-row {
  display: flex;
  gap: 16px;
}

.summary-row {
  flex-wrap: wrap;
}

.two-col-row {
  flex-wrap: wrap;
}

.three-col-row {
  flex-wrap: wrap;
}

.grid-item {
  flex: 1;
  min-width: 0;
}

.col-3 {
  flex: 0 0 calc(25% - 12px);
  min-width: 200px;
}

.col-4 {
  flex: 0 0 calc(33.333% - 11px);
}

.col-5 {
  flex: 0 0 calc(41.667% - 10px);
}

.col-8 {
  flex: 0 0 calc(66.667% - 6px);
}

.col-12 {
  flex: 0 0 100%;
}

/* Chart Panels */
.chart-panel {
  padding: 20px;
}

.chart-wrapper {
  width: 100%;
  height: 220px;
}

@media (max-width: 1400px) {
  .col-3 { flex: 0 0 calc(50% - 8px); }
  .col-4, .col-5, .col-8 { flex: 0 0 100%; }
}
</style>
