<template>
  <div v-if="store.loading" class="loading-screen">
    <div class="glass-card loading-card">
      <div class="spinner"></div>
      <span>数据加载中...</span>
    </div>
  </div>
  <div v-else-if="store.data">
    <DashboardLayout :data="store.data" />
  </div>
  <div v-else class="loading-screen">
    <div class="glass-card error-card">
      <span class="error-msg">{{ store.error || '加载数据失败' }}</span>
      <button class="retry-btn glass-card" @click="store.loadData()">重试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const store = useDashboardStore()

onMounted(() => {
  store.loadData()
})
</script>

<style scoped>
.loading-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 50%, rgba(79, 195, 247, 0.08) 0%, transparent 60%),
              linear-gradient(135deg, #0a1628 0%, #132043 100%);
}

.loading-card,
.error-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px 60px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4fc3f7;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-msg {
  color: #e57373;
  font-size: 16px;
}

.retry-btn {
  padding: 8px 24px;
  color: #4fc3f7;
  cursor: pointer;
  border: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: rgba(79, 195, 247, 0.15);
}
</style>
