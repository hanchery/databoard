import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardData } from '@/types/dashboard'
import { fetchDashboardData } from '@/services/dashboardService'

export const useDashboardStore = defineStore('dashboard', () => {
  const data = ref<DashboardData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadData() {
    loading.value = true
    error.value = null
    try {
      data.value = await fetchDashboardData()
    } catch (e) {
      error.value = e instanceof Error ? e.message : '加载数据失败'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, loadData }
})
