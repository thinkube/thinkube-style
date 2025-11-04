<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Test Component</h2>
      <p>This is a test Vue component with DaisyUI classes</p>
      <div class="stat place-items-center">
        <div class="stat-title">CPU</div>
        <div class="stat-value text-primary">{{ cpuCores }}</div>
        <div class="stat-desc">cores</div>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="handleClick">Click Me</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cpuCores = ref(8)

function handleClick() {
  console.log('Button clicked')
}
</script>
