<template>
  <div class="star-combinations-list">
    <div 
      v-for="(combo, index) in combinations.slice(0, 2)" 
      :key="index" 
      class="star-combo-item"
    >
      <div class="star-combo-header">
        <span 
          class="star-name" 
          :class="getStarClass(combo.firstStar)"
        >
          {{ combo.firstStar ? combo.firstStar.name : '' }}
        </span>
        <span class="combo-plus">+</span>
        <span 
          class="star-name" 
          :class="getStarClass(combo.secondStar)"
        >
          {{ combo.secondStar ? combo.secondStar.name : '' }}
        </span>
      </div>
      <div class="star-combo-energy">
        <div class="energy-label">Tổng năng lượng: {{ getTotalEnergy(combo) }}</div>
        <div class="energy-indicator">
          <div 
            v-for="i in 8" 
            :key="i" 
            class="energy-dot" 
            :class="[getComboType(combo), { active: i <= getTotalEnergy(combo) }]"
          ></div>
        </div>
      </div>
      <div class="star-combo-desc" v-if="combo.description">{{ combo.description }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  combinations: {
    type: Array,
    default: () => []
  }
})

// Methods
const getStarClass = (star) => {
  if (!star) return ''
  if (star.nature === 'Cát') return 'auspicious'
  if (star.nature === 'Hung') return 'inauspicious'
  return ''
}

const getTotalEnergy = (combo) => {
  // Tính tổng năng lượng từ combo trực tiếp hoặc từ các star
  if (combo.totalEnergy !== undefined) return combo.totalEnergy
  
  // Cách tính dự phòng
  const firstStarEnergy = combo.firstStar ? combo.firstStar.energyLevel || 0 : 0
  const secondStarEnergy = combo.secondStar ? combo.secondStar.energyLevel || 0 : 0
  return firstStarEnergy + secondStarEnergy
}

const getComboType = (combo) => {
  // Xác định loại tổ hợp dựa vào các star
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
  return 'mixed'
}
</script>

<style scoped>
.star-combinations-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.star-combo-item {
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.star-combo-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  flex-wrap: wrap;
  gap: 5px;
}

.star-name {
  font-weight: 600;
  font-size: 1rem;
}

.star-name.auspicious {
  color: #4caf50;
}

.star-name.inauspicious {
  color: #f44336;
}

.combo-plus {
  margin: 0 5px;
  font-weight: bold;
}

.star-combo-energy {
  display: flex;
  flex-direction: column;
  margin: 8px 0;
}

.energy-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 4px;
}

.energy-indicator {
  display: flex;
  gap: 3px;
  align-items: center;
}

.energy-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #e0e0e0;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.energy-dot.active {
  transform: scale(1.1);
}

.energy-dot.cat.active {
  background-color: #4caf50;
  box-shadow: 0 0 3px rgba(76, 175, 80, 0.5);
}

.energy-dot.hung.active {
  background-color: #f44336;
  box-shadow: 0 0 3px rgba(244, 67, 54, 0.5);
}

.energy-dot.mixed.active {
  background: linear-gradient(135deg, #4caf50, #f44336);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.star-combo-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}
</style>