<template>
  <div class="question-counter" :title="tooltipText">
    <font-awesome-icon icon="question-circle" />
    <span class="counter" :class="counterClass">{{ remainingQuestions }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  remainingQuestions: {
    type: Number,
    required: true,
    default: 0
  }
});

const counterClass = computed(() => {
  if (props.remainingQuestions > 10) return 'text-success';
  if (props.remainingQuestions >= 5) return 'text-warning';
  return 'text-danger';
});

const tooltipText = computed(() => {
  return `Còn lại ${props.remainingQuestions} câu hỏi trong hôm nay`;
});
</script>

<style scoped>
.question-counter {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background-color: #f8f9fa;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 0.85rem;
  cursor: help;
  border: 1px solid #e2e8f0;
}

.question-counter svg {
  margin-right: 6px;
  color: #4a5568;
  width: 16px;
  height: 16px;
}

.counter {
  font-weight: 600;
}

.text-success {
  color: #38a169;
}

.text-warning {
  color: #ed8936;
}

.text-danger {
  color: #e53e3e;
}
</style> 