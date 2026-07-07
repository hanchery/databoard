<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import type { CategoryItem } from '@/types/dashboard'

const props = defineProps<{ data: CategoryItem[] }>()
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        padAngle: 3,
        itemStyle: {
          borderRadius: 6,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 2,
        },
        label: {
          show: true,
          color: 'rgba(255,255,255,0.85)',
          formatter: '{b}\n{d}%',
          fontSize: 11,
        },
        labelLine: {
          lineStyle: { color: 'rgba(255,255,255,0.3)' },
        },
        data: props.data.map((item) => ({
          ...item,
          itemStyle: {
            color: getColor(item.name),
          },
        })),
      },
    ],
  })
}

function getColor(name: string): string {
  const colorMap: Record<string, string> = {
    '课程学习': '#4fc3f7',
    '项目实战': '#81c784',
    '资料下载': '#ffb74d',
    '社区互动': '#e57373',
  }
  return colorMap[name] || '#aaa'
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
