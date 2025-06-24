<template>
  <div class="analysis-card bg-white rounded-lg shadow-md p-6">
    <!-- Card Header -->
    <div class="card-header flex items-center mb-4">
      <span class="icon text-2xl mr-3">{{ icon }}</span>
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
    </div>

    <!-- Card Content -->
    <div class="card-content">
      <!-- Pairs Analysis -->
      <div v-if="type === 'pairs'" class="pairs-analysis">
        <div v-for="(pair, index) in content" :key="index" class="pair-item mb-4 last:mb-0">
          <div class="flex items-center justify-between mb-2">
            <div class="pair-info flex items-center">
              <span class="pair-number bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium mr-3">
                {{ pair.pairNumber }}
              </span>
              <span class="pair-digits font-mono text-lg font-bold mr-3">{{ pair.digits }}</span>
              <span :class="[
                'star-name font-medium',
                pair.nature === 'Cát' ? 'text-green-600' : 
                pair.nature === 'Hung' ? 'text-red-600' : 'text-gray-600'
              ]">
                {{ pair.star }}
              </span>
            </div>
            <div v-if="pair.energyLevel" class="energy-level flex items-center">
              <span class="text-sm text-gray-500 mr-1">Năng lượng:</span>
              <div class="flex">
                <div 
                  v-for="n in 4" 
                  :key="n"
                  :class="[
                    'w-2 h-2 rounded-full mr-1',
                    n <= pair.energyLevel ? 'bg-blue-500' : 'bg-gray-200'
                  ]"
                ></div>
              </div>
            </div>
          </div>
          <p class="text-gray-600 text-sm">{{ pair.meaning }}</p>
          <div v-if="pair.detailedDescription" class="mt-2">
            <button 
              @click="toggleDetails(index)"
              class="text-blue-600 text-sm hover:text-blue-800 transition-colors"
            >
              {{ expandedItems.includes(index) ? 'Thu gọn' : 'Xem chi tiết' }}
            </button>
            <div v-if="expandedItems.includes(index)" class="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <div v-html="formatDetailedDescription(pair.detailedDescription)"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-else-if="type === 'summary'" class="summary">
        <p class="text-gray-700 leading-relaxed">{{ content }}</p>
      </div>

      <!-- Digit Meanings -->
      <div v-else-if="type === 'digits'" class="digit-meanings">
        <div v-for="(digit, index) in content" :key="index" class="digit-item mb-3 last:mb-0">
          <div class="flex items-start">
            <span class="digit-value bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono font-bold mr-3 mt-1">
              {{ digit.digit }}
            </span>
            <div class="flex-1">
              <div class="flex items-center mb-1">
                <span class="text-sm text-gray-500 mr-2">Vị trí {{ digit.position }}:</span>
                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {{ getPositionName(digit.significance) }}
                </span>
              </div>
              <p class="text-gray-700 text-sm">{{ digit.meaning }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Special Sequences -->
      <div v-else-if="type === 'special'" class="special-sequences">
        <div v-if="content.zeroPatterns?.length" class="pattern-group mb-4">
          <h4 class="font-medium text-gray-700 mb-2">🟡 Chuỗi có số 0:</h4>
          <div v-for="(pattern, index) in content.zeroPatterns" :key="'zero-' + index" class="pattern-item mb-2">
            <div class="flex items-center">
              <span class="pattern-value bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-mono mr-3">
                {{ pattern.pattern }}
              </span>
              <span class="text-sm text-gray-600">{{ pattern.description }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="content.fivePatterns?.length" class="pattern-group">
          <h4 class="font-medium text-gray-700 mb-2">🟠 Chuỗi có số 5:</h4>
          <div v-for="(pattern, index) in content.fivePatterns" :key="'five-' + index" class="pattern-item mb-2">
            <div class="flex items-center">
              <span class="pattern-value bg-orange-100 text-orange-800 px-2 py-1 rounded font-mono mr-3">
                {{ pattern.pattern }}
              </span>
              <span class="text-sm text-gray-600">{{ pattern.description }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="!content.zeroPatterns?.length && !content.fivePatterns?.length" class="text-gray-500 text-sm">
          Không có chuỗi đặc biệt nào được phát hiện.
        </div>
      </div>

      <!-- Recommendations -->
      <div v-else-if="type === 'recommendations'" class="recommendations">
        <div v-if="Array.isArray(content)" class="recommendation-list">
          <div v-for="(recommendation, index) in content" :key="index" class="recommendation-item mb-3 last:mb-0">
            <div class="flex items-start">
              <span class="recommendation-icon text-yellow-500 mr-3 mt-1">💡</span>
              <p class="text-gray-700 flex-1">{{ recommendation }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-700">
          {{ content }}
        </div>
      </div>

      <!-- Default text content -->
      <div v-else class="default-content">
        <p class="text-gray-700">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '📊'
  },
  content: {
    type: [String, Array, Object],
    required: true
  },
  type: {
    type: String,
    default: 'text'
  }
});

// Data
const expandedItems = ref([]);

// Methods
const toggleDetails = (index) => {
  const idx = expandedItems.value.indexOf(index);
  if (idx > -1) {
    expandedItems.value.splice(idx, 1);
  } else {
    expandedItems.value.push(index);
  }
};

const formatDetailedDescription = (description) => {
  if (typeof description === 'string') {
    return description.replace(/\n/g, '<br>');
  }
  return description;
};

const getPositionName = (significance) => {
  const names = {
    'single': 'Đơn lẻ',
    'third_from_end': 'Thứ 3 từ cuối',
    'fifth_from_end': 'Thứ 5 từ cuối'
  };
  return names[significance] || 'Không xác định';
};
</script>

<style scoped>
.analysis-card {
  min-height: 200px;
}

.pair-item {
  border-left: 4px solid transparent;
  padding-left: 12px;
  transition: all 0.3s ease;
}

.pair-item:hover {
  border-left-color: #3B82F6;
  background-color: #F8FAFC;
  margin-left: -16px;
  padding-left: 28px;
  border-radius: 0 8px 8px 0;
}

.energy-level {
  min-width: 80px;
}

.pattern-item {
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.pattern-item:hover {
  background-color: #F8FAFC;
}

.recommendation-item {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  transition: all 0.2s ease;
}

.recommendation-item:hover {
  border-color: #3B82F6;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.digit-item {
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.digit-item:hover {
  background-color: #F8FAFC;
}

/* Responsive */
@media (max-width: 768px) {
  .pair-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .pair-info > * {
    margin-bottom: 4px;
  }
  
  .energy-level {
    margin-top: 8px;
    align-self: flex-start;
  }
}
</style> 