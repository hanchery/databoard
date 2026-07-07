<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import type { CityRankItem } from '@/types/dashboard'

const props = defineProps<{ data: CityRankItem[] }>()
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  const cities = props.data.map((d) => d.city).reverse()
  const values = props.data.map((d) => d.visits).reverse()
  chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '60', right: '30', top: '10', bottom: '20' },
    xAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(255,255,255,0.6)' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    yAxis: {
      type: 'category',
      data: cities,
      axisLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11 },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
    },
    series: [
      {
        type: 'bar',
        data: values.map((v, i) => ({
          value: v,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: i >= values.length - 2 ? 'rgba(255,183,77,0.8)' : 'rgba(79,195,247,0.4)' },
              { offset: 1, color: i >= values.length - 2 ? 'rgba(255,87,34,0.9)' : 'rgba(79,195,247,0.8)' },
            ]),
            borderRadius: [0, 6, 6, 0],
          },
        })),
        barWidth: 16,
      },
    ],
  })
}

function handleResize() {
  chart?.resize()
}

onMounted(() => {
  renderChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})

watch(() => props.data, renderChart)
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
