<template>
  <div class="clock">{{ timeString }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { padZero } from '@/utils/format'

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const timeString = ref('')

function updateTime() {
  const d = new Date()
  timeString.value = `${padZero(d.getHours())}:${padZero(d.getMinutes())}:${padZero(d.getSeconds())}`
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.clock {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 3px;
  font-variant-numeric: tabular-nums;
}
</style>
