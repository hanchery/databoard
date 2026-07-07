import type {
  Summary,
  TrendItem,
  CategoryItem,
  CityRankItem,
  RadarItem,
  CenterNode,
  CenterLink,
  Activity,
} from '@/types/dashboard'

export const mockSummary: Summary = {
  dailyVisits: 12894,
  realtimeOrders: 356,
  activeUsers: 2105,
  systemHealth: 98,
}

export const mockTrends: TrendItem[] = [
  { date: '01/01', visits: 8200, orders: 320 },
  { date: '01/02', visits: 9100, orders: 380 },
  { date: '01/03', visits: 8500, orders: 340 },
  { date: '01/04', visits: 10200, orders: 410 },
  { date: '01/05', visits: 11500, orders: 460 },
  { date: '01/06', visits: 10800, orders: 430 },
  { date: '01/07', visits: 12894, orders: 356 },
]

export const mockCategories: CategoryItem[] = [
  { name: '课程学习', value: 45 },
  { name: '项目实战', value: 25 },
  { name: '资料下载', value: 18 },
  { name: '社区互动', value: 12 },
]

export const mockCityRanks: CityRankItem[] = [
  { city: '北京', visits: 3200 },
  { city: '上海', visits: 2800 },
  { city: '深圳', visits: 2400 },
  { city: '杭州', visits: 1900 },
  { city: '广州', visits: 1600 },
  { city: '成都', visits: 1300 },
  { city: '南京', visits: 1050 },
  { city: '武汉', visits: 880 },
]

export const mockRadar: RadarItem[] = [
  { name: '前端基础', score: 95 },
  { name: '图表配置', score: 88 },
  { name: '数据建模', score: 76 },
  { name: '交互设计', score: 82 },
  { name: '工程规范', score: 90 },
]

export const mockCenterNodes: CenterNode[] = [
  { name: '数据中心', category: 'center', symbolSize: 80 },
  { name: '课程服务', category: 'business', symbolSize: 50 },
  { name: '用户管理', category: 'business', symbolSize: 50 },
  { name: '监控告警', category: 'business', symbolSize: 50 },
  { name: '日志分析', category: 'business', symbolSize: 50 },
  { name: '数据仓库', category: 'business', symbolSize: 50 },
]

export const mockCenterLinks: CenterLink[] = [
  { source: '数据中心', target: '课程服务' },
  { source: '数据中心', target: '用户管理' },
  { source: '数据中心', target: '监控告警' },
  { source: '数据中心', target: '日志分析' },
  { source: '数据中心', target: '数据仓库' },
]

export const mockActivities: Activity[] = [
  { id: 1, type: 'info', message: '课程服务运行正常', time: '10:32:15' },
  { id: 2, type: 'info', message: '用户数据同步完成', time: '10:28:40' },
  { id: 3, type: 'warning', message: '日志存储空间使用率达 75%', time: '10:22:10' },
  { id: 4, type: 'info', message: '数据仓库备份任务启动', time: '10:15:00' },
  { id: 5, type: 'error', message: '监控告警短时延迟 2s', time: '10:08:30' },
  { id: 6, type: 'info', message: '课程服务版本更新完成', time: '09:55:20' },
]
