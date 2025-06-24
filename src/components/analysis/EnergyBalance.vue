<template>
  <div class="energy-balance">
    <div :class="['balance-text', getBalanceClass]">
      {{ getBalanceText }}
    </div>
    
    <div class="energy-levels">
      <div class="energy-item">
        <span class="energy-label">Tổng:</span>
        <span class="energy-value">{{ energyLevel.total || 0 }}</span>
      </div>
      <div class="energy-item">
        <span class="energy-label">Cát:</span>
        <span class="energy-value positive">{{ energyLevel.cat || 0 }}</span>
      </div>
      <div class="energy-item">
        <span class="energy-label">Hung:</span>
        <span class="energy-value negative">{{ Math.abs(energyLevel.hung || 0) }}</span>
      </div>
      <div class="energy-item" v-if="energyLevel.ratio !== undefined">
        <span class="energy-label">Tỷ lệ:</span>
        <span class="energy-value">{{ energyLevel.ratio.toFixed(2) }}</span>
      </div>
    </div>
    
    <!-- Energy Chart -->
    <div class="energy-chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted,onUnmounted } from 'vue'

const props = defineProps({
  energyLevel: {
    type: Object,
    required: true
  },
  balance: {
    type: String,
    default: 'UNKNOWN'
  }
})

// Refs for chart
const chartRef = ref(null)

// Computed
const getBalanceClass = computed(() => {
  switch(props.balance) {
    case 'BALANCED': return 'balanced'
    case 'CAT_HEAVY': return 'cat-heavy'
    case 'HUNG_HEAVY': return 'hung-heavy'
    default: return 'unknown'
  }
})

const getBalanceText = computed(() => {
  switch(props.balance) {
    case 'BALANCED': return 'Cân bằng tốt giữa sao cát và hung'
    case 'CAT_HEAVY': return 'Thiên về sao cát (>70%)'
    case 'HUNG_HEAVY': return 'Thiên về sao hung (>70%)'
    default: return 'Cân bằng không xác định'
  }
})

// Draw energy chart
const drawChart = () => {
  if (!chartRef.value) return
  
  const canvas = document.createElement('canvas')
  canvas.width = chartRef.value.clientWidth
  canvas.height = 50
  chartRef.value.innerHTML = ''
  chartRef.value.appendChild(canvas)
  
  const ctx = canvas.getContext('2d')
  const totalWidth = canvas.width
  const height = 30
  const y = 10
  
  // Calculate ratio
  const total = (props.energyLevel.cat || 0) + Math.abs(props.energyLevel.hung || 0)
  const catWidth = total > 0 ? ((props.energyLevel.cat || 0) / total) * totalWidth : 0
  
  // Draw Cat bar (green)
  ctx.fillStyle = '#4caf50'
  ctx.fillRect(0, y, catWidth, height)
  
  // Draw Hung bar (red)
  ctx.fillStyle = '#f44336'
  ctx.fillRect(catWidth, y, totalWidth - catWidth, height)
  
  // Add labels
  ctx.fillStyle = '#333'
  ctx.font = '12px Arial'
  ctx.fillText(`Cát: ${props.energyLevel.cat || 0}`, 10, y - 5)
  ctx.fillText(`Hung: ${Math.abs(props.energyLevel.hung || 0)}`, totalWidth - 80, y - 5)
  
  // Add divider line
  ctx.strokeStyle = '#333'
  ctx.beginPath()
  ctx.moveTo(catWidth, y - 10)
  ctx.lineTo(catWidth, y + height + 10)
  ctx.stroke()
  
  // Add percentage labels
  const catPercent = total > 0 ? Math.round(((props.energyLevel.cat || 0) / total) * 100) : 0
  const hungPercent = 100 - catPercent
  
  ctx.font = 'bold 14px Arial'
  ctx.fillStyle = '#fff'
  if (catWidth > 30) {
    ctx.fillText(`${catPercent}%`, catWidth / 2 - 15, y + height / 2 + 5)
  }
  if (totalWidth - catWidth > 30) {
    ctx.fillText(`${hungPercent}%`, catWidth + (totalWidth - catWidth) / 2 - 15, y + height / 2 + 5)
  }
}

// Draw chart when mounted and when the component updates
onMounted(() => {
  drawChart()
  
  // Add resize listener
  window.addEventListener('resize', drawChart)
  
  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', drawChart)
  })
})
</script>

<style scoped>
.energy-balance {
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.balance-text {
  padding: 6px 10px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 8px;
  display: inline-block;
}

.balance-text.balanced {
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196f3;
  border-left: 3px solid #2196f3;
}

.balance-text.cat-heavy {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border-left: 3px solid #4caf50;
}

.balance-text.hung-heavy {
  background-color: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border-left: 3px solid #f44336;
}

.energy-levels {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.energy-item {
  flex: 1;
  min-width: 70px;
  text-align: center;
  padding: 6px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.energy-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
  display: block;
}

.energy-value {
  font-weight: bold;
  font-size: 1.2rem;
}

.energy-value.positive {
  color: #4caf50;
}

.energy-value.negative {
  color: #f44336;
}

.energy-chart {
  margin-top: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  background: white;
  height: 70px;
}
</style>