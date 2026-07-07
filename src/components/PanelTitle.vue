<template>
  <div class="panel-title">
    <span class="title-bar"></span>
    <span class="title-text">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style scoped>
.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.title-bar {
  width: 4px;
  height: 18px;
  background: linear-gradient(to bottom, #4fc3f7, #81c784);
  border-radius: 2px;
}

.title-text {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
}
</style>
