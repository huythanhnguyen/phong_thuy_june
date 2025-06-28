<template>
  <div v-if="decodedInfo" class="cccd-info mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
    <h4 class="text-sm font-semibold text-blue-800 mb-3">Thông tin giải mã CCCD:</h4>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
      <!-- Mã tỉnh -->
      <div class="info-item">
        <span class="font-medium text-gray-700">Mã tỉnh:</span>
        <span class="ml-2 text-blue-700 font-mono">{{ decodedInfo.provinceCode }}</span>
        <span class="ml-1 text-gray-600">({{ decodedInfo.province }})</span>
      </div>
      
      <!-- Giới tính -->
      <div class="info-item">
        <span class="font-medium text-gray-700">Giới tính:</span>
        <span class="ml-2 text-blue-700 font-mono">{{ decodedInfo.genderCode }}</span>
        <span class="ml-1 text-gray-600">({{ decodedInfo.gender }})</span>
      </div>
      
      <!-- Năm sinh -->
      <div class="info-item">
        <span class="font-medium text-gray-700">Năm sinh:</span>
        <span class="ml-2 text-blue-700 font-mono">{{ decodedInfo.yearCode }}</span>
        <span class="ml-1 text-gray-600">({{ decodedInfo.birthYear }})</span>
      </div>
      
      <!-- Số ngẫu nhiên -->
      <div class="info-item">
        <span class="font-medium text-gray-700">Số ngẫu nhiên:</span>
        <span class="ml-2 text-blue-700 font-mono">{{ decodedInfo.randomCode }}</span>
      </div>
    </div>
    
    <!-- Ghi chú thế kỷ -->
    <div class="mt-3 text-xs text-gray-500 border-t border-blue-100 pt-2">
      <span class="font-medium">Ghi chú:</span>
      <span v-if="decodedInfo.century === 20" class="ml-1">
        Thế kỷ 20 (1900-1999): Nam = 0, Nữ = 1
      </span>
      <span v-else-if="decodedInfo.century === 21" class="ml-1">
        Thế kỷ 21 (2000-2099): Nam = 2, Nữ = 3
      </span>
      <span v-else-if="decodedInfo.century === 22" class="ml-1">
        Thế kỷ 22 (2100-2199): Nam = 4, Nữ = 5
      </span>
      <span v-else-if="decodedInfo.century === 23" class="ml-1">
        Thế kỷ 23 (2200-2299): Nam = 6, Nữ = 7
      </span>
      <span v-else-if="decodedInfo.century === 24" class="ml-1">
        Thế kỷ 24 (2300-2399): Nam = 8, Nữ = 9
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { decodeCCCD } from '../../constants/provinceCodes.js';

// Props
const props = defineProps({
  cccdValue: {
    type: String,
    default: ''
  },
  isValid: {
    type: Boolean,
    default: false
  }
});

// Computed
const decodedInfo = computed(() => {
  if (!props.cccdValue || !props.isValid) {
    return null;
  }
  
  const decoded = decodeCCCD(props.cccdValue);
  return decoded?.isValid ? decoded : null;
});
</script>

<style scoped>
.cccd-info {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.info-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* Responsive design */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .info-item {
    margin-bottom: 8px;
  }
}
</style> 