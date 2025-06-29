<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view />
    
    <!-- PWA update notification -->
    <div v-if="needRefresh" class="pwa-update-notification">
      <div class="pwa-update-content">
        <p><strong>Có phiên bản mới!</strong></p>
        <p>Vui lòng cập nhật để trải nghiệm các tính năng mới nhất.</p>
        <div class="pwa-button-group">
          <button @click="updateServiceWorker()" class="pwa-update-button">Cập nhật</button>
          <button @click="closeNotification()" class="pwa-close-button">Sau này</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerSW } from 'virtual:pwa-register'

const needRefresh = ref(false)
const updateServiceWorker = registerSW({
  onNeedRefresh() {
    needRefresh.value = true
  },
  onOfflineReady() {
    console.log('Ứng dụng đã sẵn sàng sử dụng offline')
  }
})

const closeNotification = () => {
  needRefresh.value = false
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Global styles that apply to entire app */
#app {
  width: 100%;
  min-height: 100vh; /* Thay height: 100vh bằng min-height: 100vh */
  overflow: auto; /* Thay overflow: hidden bằng overflow: auto */
}



/* PWA update notification styles */
.pwa-update-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  max-width: 320px;
  animation: slide-in 0.3s ease-out;
}

.pwa-update-content {
  padding: 16px;
}

.pwa-button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  gap: 8px;
}

.pwa-update-button {
  background-color: var(--primary-color, #4361ee);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.pwa-close-button {
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

@keyframes slide-in {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>