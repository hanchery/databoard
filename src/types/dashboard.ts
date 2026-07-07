export interface Summary {
  dailyVisits: number
  realtimeOrders: number
  activeUsers: number
  systemHealth: number
}

export interface TrendItem {
  date: string
  visits: number
  orders: number
}

export interface CategoryItem {
  name: string
  value: number
}

export interface CityRankItem {
  city: string
  visits: number
}

export interface RadarItem {
  name: string
  score: number
}

export interface CenterNode {
  name: string
  category: 'center' | 'business'
  symbolSize: number
  x?: number
  y?: number
}

export interface CenterLink {
  source: string
  target: string
}

export interface Activity {
  id: number
  type: 'info' | 'warning' | 'error'
  message: string
  time: string
}

export interface DashboardData {
  summary: Summary
  trends: TrendItem[]
  categories: CategoryItem[]
  cityRanks: CityRankItem[]
  radar: RadarItem[]
  centerNodes: CenterNode[]
  centerLinks: CenterLink[]
  activities: Activity[]
}
