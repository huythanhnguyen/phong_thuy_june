<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view />
    
    <!-- Floating Token Button -->
    <div 
      v-if="!isAuthenticated"
      class="fixed bottom-6 right-6 z-50"
    >
      <router-link 
        to="/universal-analysis"
        class="floating-token-btn group relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
      >
        <!-- Coin Icon -->
        <div class="text-white text-2xl font-bold">
          🪙
        </div>
        
        <!-- Token Counter Badge -->
        <div class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {{ tokensUsed }}
        </div>
        
        <!-- Tooltip -->
        <div class="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div class="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
            {{ tokenInfo }} lượt hôm nay
            <div class="text-xs text-gray-300 mt-1">Nhấn để phân tích</div>
          </div>
          <!-- Arrow -->
          <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </router-link>
    </div>
    
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
import { ref, computed, onMounted } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import { useAuthStore } from '@/stores/auth'
import { useUniversalAnalysisStore } from '@/stores/universalAnalysis'

// Stores
const authStore = useAuthStore()
const uaStore = useUniversalAnalysisStore()

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)
const tokensUsed = computed(() => uaStore.tokensUsed)
const tokenInfo = computed(() => uaStore.tokenInfo)

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

// Initialize token tracking on app load
onMounted(() => {
  uaStore.init()
})
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

/* Floating Token Button */
.floating-token-btn {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.floating-token-btn:hover {
  animation-play-state: paused;
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