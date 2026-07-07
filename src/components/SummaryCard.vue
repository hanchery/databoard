<template>
  <div class="glass-card summary-card">
    <div class="card-icon" :style="{ color: iconColor }">
      <slot name="icon">{{ icon }}</slot>
    </div>
    <div class="card-body">
      <span class="card-label">{{ label }}</span>
      <span class="card-value">{{ formattedValue }}</span>
      <span v-if="unit" class="card-unit">{{ unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: number
  unit?: string
  icon?: string
  iconColor?: string
  format?: 'number' | 'percent'
}>()

const formattedValue = computed(() => {
  if (props.format === 'percent') return props.value
  if (props.value >= 10000) return (props.value / 10000).toFixed(1)
  return props.value.toLocaleString()
})
</script>

<style scoped>
.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
}

.card-icon {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
}

.card-unit {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 4px;
}
</style>
