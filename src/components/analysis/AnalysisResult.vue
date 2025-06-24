<template>
  <div class="analysis-container">
    <div class="analysis-title">
      Phân tích số: <span class="phone-number">{{ formattedPhoneNumber }}</span>
    </div>
    <div class="analysis-content">
      <!-- Phần sao chính -->
      <div class="analysis-section">
        <h4>Các sao chủ đạo</h4>
        <star-list :stars="mainStars" />
      </div>
      
      <!-- Phần tổ hợp sao -->
      <div class="analysis-section star-combinations-section" v-if="starCombinations.length > 0">
        <h4>Tổ hợp sao</h4>
        <star-combinations :combinations="starCombinations" />
      </div>
      
      <!-- Phần cân bằng năng lượng -->
      <div class="analysis-section">
        <h4>Cân bằng năng lượng</h4>
        <energy-balance :energy-level="energyLevel" :balance="balance" />
      </div>
      
      <!-- Phần chi tiết phân tích (mặc định ẩn) -->
      <div class="analysis-details" v-if="showDetails">
        <detailed-analysis :data="analysisData" />
      </div>
      
      <!-- Nút hiển thị chi tiết -->
      <button class="details-toggle" @click="toggleDetails">
        {{ showDetails ? 'Ẩn chi tiết' : 'Xem chi tiết' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatPhoneNumber } from '@/utils'
import StarList from './StarList.vue'
import StarCombinations from './StarCombinations.vue'
import EnergyBalance from './EnergyBalance.vue'
import DetailedAnalysis from './DetailedAnalysis.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// State
const showDetails = ref(false)

// Computed
const analysisData = computed(() => {
  // Dữ liệu có thể nằm trực tiếp hoặc trong thuộc tính result
  return props.data.result || props.data
})

const formattedPhoneNumber = computed(() => {
  return formatPhoneNumber(props.data.phoneNumber)
})

const mainStars = computed(() => {
  if (!analysisData.value.starSequence) return []
  
  // Lấy các sao có năng lượng cao nhất (tối đa 3)
  return [...analysisData.value.starSequence]
    .sort((a, b) => b.energyLevel - a.energyLevel)
    .slice(0, 3)
})

const starCombinations = computed(() => {
  return analysisData.value.starCombinations || []
})

const balance = computed(() => {
  return analysisData.value.balance || 'UNKNOWN'
})

const energyLevel = computed(() => {
  return analysisData.value.energyLevel || {
    total: 0,
    cat: 0,
    hung: 0,
    ratio: 0
  }
})

// Methods
const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<style scoped>
.analysis-container {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-top: 10px;
  border-left: 3px solid var(--primary-color, #4361ee);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.analysis-title {
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--primary-color, #4361ee);
  font-size: 1.1rem;
}

.phone-number {
  font-weight: bold;
}

.analysis-section {
  margin-bottom: 16px;
}

.analysis-section h4 {
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.analysis-section h4::before {
  content: "";
  display: inline-block;
  width: 3px;
  height: 14px;
  background-color: var(--primary-color, #4361ee);
  margin-right: 7px;
  border-radius: 2px;
}

.analysis-details {
  border-top: 1px solid #eee;
  padding-top: 12px;
  margin-top: 10px;
}

.details-toggle {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
  transition: all 0.2s;
  display: block;
  width: 100%;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.details-toggle:hover {
  background-color: #e0e0e0;
  color: #333;
}

.details-toggle:active {
  transform: scale(0.98);
}
</style>