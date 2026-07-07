<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import type { CenterNode, CenterLink } from '@/types/dashboard'

const props = defineProps<{ nodes: CenterNode[]; links: CenterLink[] }>()
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

function renderChart() {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)

  const categories = [
    { name: 'center', itemStyle: { color: '#4fc3f7' } },
    { name: 'business', itemStyle: { color: '#81c784' } },
  ]

  const graphNodes = props.nodes.map((n) => ({
    name: n.name,
    category: n.category === 'center' ? 0 : 1,
    symbolSize: n.symbolSize,
    label: {
      show: true,
      color: '#fff',
      fontSize: 12,
      fontWeight: n.category === 'center' ? 'bold' : 'normal',
    },
    itemStyle: {
      shadowBlur: 20,
      shadowColor: n.category === 'center' ? 'rgba(79,195,247,0.5)' : 'rgba(129,199,132,0.4)',
    },
  }))

  chart.setOption({
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 400,
          edgeLength: 150,
          gravity: 0.1,
        },
        roam: true,
        draggable: true,
        categories,
        data: graphNodes,
        links: props.links.map((l) => ({
          source: l.source,
          target: l.target,
          lineStyle: {
            color: 'rgba(255,255,255,0.25)',
            width: 2,
            curveness: 0.3,
          },
        })),
        lineStyle: {
          color: 'rgba(255,255,255,0.2)',
          width: 1.5,
        },
        label: { show: true, position: 'bottom', color: '#fff', fontSize: 12 },
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

watch(() => [props.nodes, props.links], renderChart)
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 240px;
}
</style>
