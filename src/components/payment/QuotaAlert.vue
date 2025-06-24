<template>
  <transition name="alert-fade">
    <div v-if="show" class="quota-alert">
      <div class="quota-alert-content">
        <div class="quota-alert-icon">
          <font-awesome-icon icon="exclamation-circle" size="lg" />
        </div>
        <div class="quota-alert-message">
          <h4>Bạn đã hết câu hỏi!</h4>
          <p>Để tiếp tục đặt câu hỏi và sử dụng dịch vụ, vui lòng nạp thêm câu hỏi.</p>
        </div>
        <button class="quota-alert-close" @click="hideAlert">
          <font-awesome-icon icon="times" />
        </button>
      </div>
      <div class="quota-alert-action">
        <router-link to="/payment" class="quota-alert-button">
          <font-awesome-icon icon="plus-circle" class="mr-2" />
          Nạp thêm câu hỏi ngay
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

function hideAlert() {
  emit('close');
}

onMounted(() => {
  // Tự động ẩn alert sau 7 ngày
  const alertShownTime = localStorage.getItem('quota_alert_shown_time');
  const now = new Date().getTime();
  
  if (alertShownTime) {
    const timeElapsed = now - parseInt(alertShownTime);
    const daysPassed = timeElapsed / (1000 * 60 * 60 * 24);
    
    if (daysPassed >= 7) {
      localStorage.removeItem('quota_alert_shown_time');
    }
  } else if (props.show) {
    localStorage.setItem('quota_alert_shown_time', now.toString());
  }
});
</script>

<style scoped>
.quota-alert {
  background-color: #fff3e0;
  border-left: 4px solid #f57c00;
  border-radius: 6px;
  margin: 16px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.quota-alert-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
}

.quota-alert-icon {
  color: #f57c00;
  margin-right: 12px;
  margin-top: 2px;
  flex-shrink: 0;
}

.quota-alert-message {
  flex: 1;
}

.quota-alert-message h4 {
  margin: 0 0 4px 0;
  font-weight: 600;
  color: #e65100;
  font-size: 1rem;
}

.quota-alert-message p {
  margin: 0;
  color: #795548;
  font-size: 0.9rem;
}

.quota-alert-close {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 4px;
  font-size: 0.8rem;
  transition: color 0.2s;
}

.quota-alert-close:hover {
  color: #666;
}

.quota-alert-action {
  padding: 0 16px 16px;
  display: flex;
  justify-content: flex-end;
}

.quota-alert-button {
  display: inline-flex;
  align-items: center;
  background-color: #f57c00;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.quota-alert-button:hover {
  background-color: #e65100;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

/* Hiệu ứng transition */
.alert-fade-enter-active {
  animation: fadeInDown 0.5s ease;
}

.alert-fade-leave-active {
  animation: fadeOut 0.3s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .quota-alert-content {
    padding: 12px;
  }
  
  .quota-alert-action {
    padding: 0 12px 12px;
  }
  
  .quota-alert-message h4 {
    font-size: 0.95rem;
  }
  
  .quota-alert-message p {
    font-size: 0.85rem;
  }
}
</style> 