<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import type { RadarItem } from '@/types/dashboard'

const props = defineProps<{ data: RadarItem[] }>()
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption({
    tooltip: { trigger: 'item' },
    radar: {
      indicator: props.data.map((d) => ({ name: d.name, max: 100 })),
      radius: '70%',
      axisName: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 11,
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(79,195,247,0.05)', 'rgba(79,195,247,0.1)'],
        },
      },
      axisLine: {
        lineStyle: { color: 'rgba(255,255,255,0.15)' },
      },
      splitLine: {
        lineStyle: { color: 'rgba(255,255,255,0.12)' },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: props.data.map((d) => d.score),
            areaStyle: {
              color: 'rgba(79,195,247,0.25)',
            },
            lineStyle: {
              color: '#4fc3f7',
              width: 2,
            },
            itemStyle: {
              color: '#4fc3f7',
            },
          },
        ],
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
