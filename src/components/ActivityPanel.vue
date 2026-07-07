<template>
  <div class="activity-list">
    <div
      v-for="activity in data"
      :key="activity.id"
      class="activity-item glass-card"
    >
      <span class="activity-dot" :class="activity.type"></span>
      <span class="activity-msg">{{ activity.message }}</span>
      <span class="activity-time">{{ activity.time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '@/types/dashboard'

defineProps<{ data: Activity[] }>()
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 240px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  font-size: 13px;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.activity-dot.info {
  background-color: #4fc3f7;
  box-shadow: 0 0 8px rgba(79, 195, 247, 0.5);
}

.activity-dot.warning {
  background-color: #ffb74d;
  box-shadow: 0 0 8px rgba(255, 183, 77, 0.5);
}

.activity-dot.error {
  background-color: #e57373;
  box-shadow: 0 0 8px rgba(229, 115, 115, 0.5);
}

.activity-msg {
  flex: 1;
  color: rgba(255, 255, 255, 0.85);
}

.activity-time {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  flex-shrink: 0;
}
</style>
