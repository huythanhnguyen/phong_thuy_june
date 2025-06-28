<template>
  <div class="number-type-selector">
    <h2 class="text-xl font-semibold text-gray-700 mb-4 text-center">Chọn loại số cần phân tích</h2>
    <!-- Mobile: 3 cột, Desktop: 6 cột -->
    <div class="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
      <div 
        v-for="type in numberTypes" 
        :key="type.id"
        :class="[
          'type-card cursor-pointer p-3 md:p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105',
          selectedType === type.id 
            ? 'border-blue-500 bg-blue-50 shadow-md' 
            : 'border-gray-200 bg-white hover:border-blue-300'
        ]"
        @click="selectType(type.id)"
      >
        <div class="text-center">
          <!-- Icon -->
          <div class="type-icon mb-3">
            <div :class="[
              'mx-auto w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl',
              selectedType === type.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            ]">
              {{ getIconForType(type.icon) }}
            </div>
          </div>
          
          <!-- Title -->
          <h3 :class="[
            'font-semibold mb-2 text-sm md:text-base',
            selectedType === type.id ? 'text-blue-700' : 'text-gray-700'
          ]">
            {{ type.name }}
          </h3>
          
          <!-- Description (hidden on mobile) -->
          <p
            :class="[
              'text-sm mb-3 hidden md:block',
            selectedType === type.id ? 'text-blue-600' : 'text-gray-500'
            ]"
          >
            {{ type.description }}
          </p>
          
          <!-- Examples (hidden on mobile) -->
          <div class="type-examples space-y-1 hidden md:block">
            <div class="text-xs text-gray-400 mb-1">Ví dụ:</div>
            <div class="flex flex-wrap gap-1 justify-center">
              <span 
                v-for="example in type.examples.slice(0, 2)" 
                :key="example"
                :class="[
                  'inline-block px-2 py-1 rounded text-xs',
                  selectedType === type.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ formatExample(example) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getAllNumberTypes } from '../../constants/numberTypes.js';

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: 'phone'
  }
});

// Emits
const emit = defineEmits(['update:modelValue', 'change']);

// Data
const numberTypes = getAllNumberTypes();

// Computed
const selectedType = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    emit('change', value);
  }
});

// Methods
const selectType = (typeId) => {
  selectedType.value = typeId;
};

const getIconForType = (iconType) => {
  const icons = {
    phone: '📱',
    'id-card': '🆔', 
    calendar: '📅',
    bank: '🏦',
    lock: '🔐',
    dice: '🎲',
    car: '🚗'
  };
  return icons[iconType] || '📊';
};

const formatExample = (example) => {
  // Shorten long examples for display
  if (example.length > 8) {
    return example.substring(0, 6) + '...';
  }
  return example;
};
</script>

<style scoped>
.type-card {
  min-height: 120px;
  display: flex;
  align-items: center;
}

/* Desktop styling */
@media (min-width: 768px) {
  .type-card {
    min-height: 180px;
  }
}

.type-card:hover {
  transform: translateY(-2px);
}

.type-card.active {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}
</style> 