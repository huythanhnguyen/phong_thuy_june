<template>
  <div class="star-list">
    <div 
      v-for="(star, index) in stars" 
      :key="index" 
      class="star-item"
      :class="getStarClass(star)"
    >
      <div class="star-header">
        <div class="star-name">{{ star.name }}</div>
        <div class="star-pair">{{ star.originalPair }}</div>
      </div>
      <div class="star-energy">
        <div class="energy-label">Năng lượng:</div>
        <div class="energy-indicator">
          <div 
            v-for="i in 4" 
            :key="i" 
            class="energy-dot" 
            :class="[getEnergyDotType(star), { active: i <= star.energyLevel }]"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stars: {
    type: Array,
    default: () => []
  }
})

// Methods
const getStarClass = (star) => {
  if (star.nature === 'Cát') return 'cat'
  if (star.nature === 'Hung') return 'hung'
  return ''
}

const getEnergyDotType = (star) => {
  if (star.nature === 'Cát') return 'cat'
  if (star.nature === 'Hung') return 'hung'
  if (star.nature === 'Cát hóa hung') return 'cat-hung'
  return 'neutral'
}
</script>

<style scoped>
.star-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.star-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.star-item.cat {
  border-left: 3px solid #4caf50;
}

.star-item.hung {
  border-left: 3px solid #f44336;
}

.star-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.star-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.star-item.cat .star-name {
  color: #4caf50;
}

.star-item.hung .star-name {
  color: #f44336;
}

.star-pair {
  background-color: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #555;
  font-weight: bold;
}

.star-energy {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
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
  width: 8px;
  height: 8px;
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

.energy-dot.cat-hung.active {
  background: linear-gradient(135deg, #4caf50, #f44336);
  box-shadow: 0 0 3px rgba(244, 67, 54, 0.5);
}

.energy-dot.neutral.active {
  background-color: #9e9e9e;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
</style>