<template>
  <div class="number-input bg-white rounded-lg shadow-md p-6">
    <div class="max-w-md mx-auto">
      <!-- Label -->
      <label :for="type" class="block text-lg font-semibold text-gray-700 mb-4 text-center">
        {{ getLabel() }}
      </label>
      
      <!-- Input Group -->
      <div class="input-group mb-4">
        <input 
          :id="type"
          :value="modelValue"
          :type="getInputType()"
          :placeholder="getPlaceholder()"
          :maxlength="getMaxLength()"
          @input="handleInput"
          @keyup.enter="$emit('analyze')"
          :class="[
            'w-full px-4 py-3 text-lg border-2 rounded-lg transition-colors focus:outline-none',
            validation.valid 
              ? 'border-gray-300 focus:border-blue-500' 
              : 'border-red-300 focus:border-red-500'
          ]"
        />
        
        <!-- Clear Button -->
        <div v-if="modelValue" class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <button 
            @click="clearInput"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        </div>
      </div>
      
      <!-- Error Message -->
      <div v-if="!validation.valid && validation.message" class="error-message mb-4">
        <div class="text-red-600 text-sm text-center bg-red-50 px-3 py-2 rounded-lg">
          {{ validation.message }}
        </div>
      </div>
      
      <!-- Format Display -->
      <div v-if="modelValue && validation.valid" class="format-display mb-4">
        <div class="text-center text-gray-600 text-sm">
          <span class="font-medium">Định dạng:</span> {{ getFormattedValue() }}
        </div>
      </div>
      
      <!-- Quick Examples -->
      <div v-if="!modelValue" class="quick-examples">
        <div class="text-center mb-2">
          <span class="text-sm text-gray-500">Ví dụ:</span>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <button 
            v-for="example in getExamples()"
            :key="example"
            @click="useExample(example)"
            class="example-btn px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            {{ example }}
          </button>
        </div>
      </div>
      
      <!-- Analyze Button -->
      <div v-if="modelValue && validation.valid" class="text-center mt-4">
        <button 
          @click="$emit('analyze')"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Phân Tích Ngay
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getNumberTypeInfo } from '../../constants/numberTypes.js';

// Props
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  validation: {
    type: Object,
    default: () => ({ valid: true, message: '' })
  }
});

// Emits
const emit = defineEmits(['update:modelValue', 'input', 'analyze']);

// Computed
const typeInfo = computed(() => getNumberTypeInfo(props.type));

// Methods
const handleInput = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);
  emit('input', value);
};

const clearInput = () => {
  emit('update:modelValue', '');
  emit('input', '');
};

const useExample = (example) => {
  emit('update:modelValue', example);
  emit('input', example);
};

const getLabel = () => {
  return typeInfo.value?.name || 'Nhập số';
};

const getPlaceholder = () => {
  return typeInfo.value?.placeholder || 'Nhập số của bạn...';
};

const getMaxLength = () => {
  return typeInfo.value?.maxLength || 20;
};

const getInputType = () => {
  // Always use text for better control, even for numbers
  return 'text';
};

const getExamples = () => {
  return typeInfo.value?.examples || [];
};

const getFormattedValue = () => {
  if (!props.modelValue || !typeInfo.value?.format) return props.modelValue;
  try {
    return typeInfo.value.format(props.modelValue);
  } catch (error) {
    return props.modelValue;
  }
};
</script>

<style scoped>
.input-group {
  position: relative;
}

.example-btn {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

/* Input focus effect */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .number-input {
    padding: 1rem;
  }
  
  input {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
</style> 