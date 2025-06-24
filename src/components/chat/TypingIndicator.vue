<template>
  <div class="typing-indicator" v-if="isTyping">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup>
defineProps({
  isTyping: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.typing-indicator {
  display: inline-flex;
  align-items: center;
  background-color: white;
  padding: 16px 24px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  margin: 0 2px;
  background-color: var(--primary-color, #4361ee);
  border-radius: 50%;
  display: inline-block;
  opacity: 0.6;
}

.typing-indicator span:nth-child(1) {
  animation: pulse 1s infinite;
}

.typing-indicator span:nth-child(2) {
  animation: pulse 1s infinite 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation: pulse 1s infinite 0.4s;
}

@keyframes pulse {
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.4; transform: scale(1); }
}
</style>