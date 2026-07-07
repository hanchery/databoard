<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import type { TrendItem } from '@/types/dashboard'

const props = defineProps<{ data: TrendItem[] }>()
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  const dates = props.data.map((d) => d.date)
  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['访问量', '订单数'],
      textStyle: { color: 'rgba(255,255,255,0.8)' },
    },
    grid: { left: '40', right: '20', bottom: '30', top: '40' },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: { color: 'rgba(255,255,255,0.6)' },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
    },
    yAxis: [
      {
        type: 'value',
        name: '访问量',
        nameTextStyle: { color: 'rgba(255,255,255,0.6)' },
        axisLabel: { color: 'rgba(255,255,255,0.6)' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      },
      {
        type: 'value',
        name: '订单数',
        nameTextStyle: { color: 'rgba(255,255,255,0.6)' },
        axisLabel: { color: 'rgba(255,255,255,0.6)' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        data: props.data.map((d) => d.visits),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3, color: '#4fc3f7' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(79, 195, 247, 0.3)' },
            { offset: 1, color: 'rgba(79, 195, 247, 0.02)' },
          ]),
        },
      },
      {
        name: '订单数',
        type: 'line',
        yAxisIndex: 1,
        data: props.data.map((d) => d.orders),
        smooth: true,
        symbol: 'diamond',
        symbolSize: 8,
        lineStyle: { width: 3, color: '#ffb74d' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 183, 77, 0.25)' },
            { offset: 1, color: 'rgba(255, 183, 77, 0.02)' },
          ]),
        },
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
