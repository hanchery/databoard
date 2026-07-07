import type { DashboardData } from '@/types/dashboard'
import {
  mockSummary,
  mockTrends,
  mockCategories,
  mockCityRanks,
  mockRadar,
  mockCenterNodes,
  mockCenterLinks,
  mockActivities,
} from '@/mocks/data/dashboard'

const dataSource = import.meta.env.VITE_DATA_SOURCE || 'mock'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchDashboardData(): Promise<DashboardData> {
  if (dataSource === 'api') {
    const { default: axios } = await import('axios')
    const baseURL = import.meta.env.VITE_API_BASE_URL || ''
    const response = await axios.get<DashboardData>(`${baseURL}/dashboard`)
    return response.data
  }

  await delay(300)
  return {
    summary: mockSummary,
    trends: mockTrends,
    categories: mockCategories,
    cityRanks: mockCityRanks,
    radar: mockRadar,
    centerNodes: mockCenterNodes,
    centerLinks: mockCenterLinks,
    activities: mockActivities,
  }
}
