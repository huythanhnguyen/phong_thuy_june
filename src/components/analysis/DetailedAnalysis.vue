<template>
  <div class="detailed-analysis">
    <!-- Chi tiết sao -->
    <div class="detail-section" v-if="allStars.length > 0">
      <h4>Chi tiết các sao</h4>
      <div class="detail-list">
        <div 
          v-for="(star, index) in allStars" 
          :key="index"
          class="detail-item"
          :class="getStarClass(star)"
        >
          <div class="detail-name">{{ star.name || 'Không xác định' }}</div>
          <div class="detail-meta">
            <span>Cặp số: {{ star.originalPair || '' }}</span>
            <span>Tính chất: {{ star.nature || '' }}</span>
            <span>Năng lượng: {{ star.energyLevel || 0 }}/4</span>
          </div>
          <div class="detail-description" v-if="star.description">{{ star.description }}</div>
          <div class="detail-full" v-if="star.detailedDescription">{{ star.detailedDescription }}</div>
        </div>
      </div>
    </div>
    
    <!-- Chi tiết tổ hợp sao -->
    <div class="detail-section" v-if="data.starCombinations && data.starCombinations.length > 0">
      <h4>Tổ hợp sao</h4>
      <div class="detail-list">
        <div 
          v-for="(combo, index) in data.starCombinations" 
          :key="index"
          class="detail-item"
          :class="getComboClass(combo)"
        >
          <div class="detail-name">
            {{ combo.firstStar ? combo.firstStar.name : '' }} + 
            {{ combo.secondStar ? combo.secondStar.name : '' }}
          </div>
          <div class="detail-meta">
            <span>Năng lượng: {{ combo.totalEnergy || getComboEnergy(combo) }}</span>
            <span v-if="combo.position">Vị trí: {{ combo.position }}</span>
          </div>
          <div class="detail-description" v-if="combo.description">{{ combo.description }}</div>
          <div class="detail-full" v-if="hasDetailedDescription(combo)">
            <p v-if="typeof combo.detailedDescription === 'string'">
              {{ combo.detailedDescription }}
            </p>
            <template v-else-if="Array.isArray(combo.detailedDescription)">
              <p v-for="(desc, i) in combo.detailedDescription" :key="i">
                {{ typeof desc === 'string' ? desc : (Array.isArray(desc) ? desc.join(' ') : '') }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Key Combinations -->
    <div class="detail-section" v-if="data.keyCombinations && data.keyCombinations.length > 0">
      <h4>Tổ hợp số đặc biệt</h4>
      <div class="detail-list">
        <div 
          v-for="(key, index) in data.keyCombinations" 
          :key="index"
          class="detail-item"
        >
          <div class="detail-name">{{ key.value || '' }}</div>
          <div class="detail-meta">
            <span v-if="key.type">{{ key.type }}</span>
            <span v-if="key.position">Vị trí: {{ key.position }}</span>
          </div>
          <div class="detail-description" v-if="key.description">{{ key.description }}</div>
        </div>
      </div>
    </div>
    
    <!-- Key Positions -->
    <div class="detail-section" v-if="data.keyPositions">
      <h4>Vị trí số quan trọng</h4>
      <div class="detail-list">
        <div class="detail-item" v-if="data.keyPositions.lastDigit">
          <div class="detail-name">Số cuối: {{ data.keyPositions.lastDigit.value }}</div>
          <div class="detail-description">{{ data.keyPositions.lastDigit.meaning || '' }}</div>
        </div>
        <div class="detail-item" v-if="data.keyPositions.thirdFromEnd">
          <div class="detail-name">Số thứ 3 từ cuối: {{ data.keyPositions.thirdFromEnd.value }}</div>
          <div class="detail-description">{{ data.keyPositions.thirdFromEnd.meaning || '' }}</div>
        </div>
        <div class="detail-item" v-if="data.keyPositions.fifthFromEnd">
          <div class="detail-name">Số thứ 5 từ cuối: {{ data.keyPositions.fifthFromEnd.value }}</div>
          <div class="detail-description">{{ data.keyPositions.fifthFromEnd.meaning || '' }}</div>
        </div>
      </div>
    </div>
    
    <!-- Last 3 Digits Analysis -->
    <div class="detail-section" v-if="data.last3DigitsAnalysis">
      <h4>Phân tích 3 số cuối</h4>
      <div class="detail-item">
        <div class="detail-name">3 số cuối: {{ data.last3DigitsAnalysis.lastThreeDigits }}</div>
        <div class="detail-description" v-if="data.last3DigitsAnalysis.firstPair && data.last3DigitsAnalysis.firstPair.starInfo">
          <strong>Cặp đầu:</strong> {{ data.last3DigitsAnalysis.firstPair.pair }} - 
          {{ data.last3DigitsAnalysis.firstPair.starInfo.name }} 
          ({{ data.last3DigitsAnalysis.firstPair.starInfo.nature }})
        </div>
        <div class="detail-description" v-if="data.last3DigitsAnalysis.secondPair && data.last3DigitsAnalysis.secondPair.starInfo">
          <strong>Cặp sau:</strong> {{ data.last3DigitsAnalysis.secondPair.pair }} - 
          {{ data.last3DigitsAnalysis.secondPair.starInfo.name }} 
          ({{ data.last3DigitsAnalysis.secondPair.starInfo.nature }})
        </div>
        <div class="detail-description" v-if="data.last3DigitsAnalysis.specialCombination">
          <strong>Tổ hợp đặc biệt:</strong> {{ data.last3DigitsAnalysis.specialCombination }}
        </div>
      </div>
    </div>
    
    <!-- Dangerous Combinations -->
    <div class="detail-section warnings" v-if="data.dangerousCombinations && data.dangerousCombinations.length > 0">
      <h4>Cảnh báo</h4>
      <div class="detail-list">
        <div 
          v-for="(warning, index) in data.dangerousCombinations" 
          :key="index"
          class="detail-item hung"
        >
          <div class="detail-name">{{ warning.combination || '' }}</div>
          <div class="detail-meta" v-if="warning.position">
            <span>Vị trí: {{ warning.position }}</span>
          </div>
          <div class="detail-description" v-if="warning.description">{{ warning.description }}</div>
          <div class="detail-full" v-if="warning.meanings">{{ warning.meanings }}</div>
        </div>
      </div>
    </div>
    
    <!-- Special Attribute -->
    <div class="detail-section" v-if="data.specialAttribute">
      <h4>Thuộc tính đặc biệt</h4>
      <div class="detail-item">
        <div class="detail-name">{{ data.specialAttribute }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Computed
const allStars = computed(() => {
  if (!props.data.starSequence) return []
  
  // Lấy tất cả các sao và sắp xếp theo năng lượng
  return [...props.data.starSequence].sort((a, b) => b.energyLevel - a.energyLevel)
})

// Methods
const getStarClass = (star) => {
  if (star.nature === 'Cát') return 'cat'
  if (star.nature === 'Hung') return 'hung'
  return ''
}

const getComboClass = (combo) => {
  // Xác định tính chất của tổ hợp
  const isPositive = combo.isPositive || 
    (combo.firstStar && combo.secondStar && 
     combo.firstStar.nature === 'Cát' && 
     combo.secondStar.nature === 'Cát')
  
  const isNegative = combo.isNegative || 
    (combo.firstStar && combo.secondStar && 
     combo.firstStar.nature === 'Hung' && 
     combo.secondStar.nature === 'Hung')
  
  if (isPositive) return 'cat'
  if (isNegative) return 'hung'
  return ''
}

const getComboEnergy = (combo) => {
  // Tính tổng năng lượng nếu không có sẵn
  if (combo.totalEnergy !== undefined) return combo.totalEnergy
  
  const firstStarEnergy = combo.firstStar ? combo.firstStar.energyLevel || 0 : 0
  const secondStarEnergy = combo.secondStar ? combo.secondStar.energyLevel || 0 : 0
  return firstStarEnergy + secondStarEnergy
}

const hasDetailedDescription = (combo) => {
  if (!combo.detailedDescription) return false
  
  if (typeof combo.detailedDescription === 'string') {
    return combo.detailedDescription.trim() !== ''
  }
  
  if (Array.isArray(combo.detailedDescription)) {
    return combo.detailedDescription.length > 0
  }
  
  return false
}
</script>

<style scoped>
.detailed-analysis {
  margin-top: 16px;
}

.detail-section {
  margin-bottom: 20px;
  background-color: #f9f9fa;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.detail-section h4 {
  font-weight: 600;
  margin-bottom: 12px;
  color: #4361ee;
  font-size: 1.1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  background-color: white;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.detail-item.cat {
  border-left: 3px solid #4caf50;
}

.detail-item.hung {
  border-left: 3px solid #f44336;
}

.detail-name {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.05rem;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #555;
}

.detail-description {
  color: #444;
  margin-top: 8px;
  font-size: 0.95rem;
}

.detail-full {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #eee;
  color: #333;
  font-size: 0.95rem;
}
</style>