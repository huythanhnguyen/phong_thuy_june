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
          @keydown="handleKeydown"
          @keyup.enter="$emit('analyze')"
          :class="[
            'w-full px-4 py-3 text-lg border-2 rounded-lg transition-colors focus:outline-none',
            ['birthdate', 'phone', 'cccd', 'bankAccount'].includes(type) ? 'font-mono tracking-wider' : '',
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
      
      <!-- CCCD Info Display -->
      <CCCDInfo 
        v-if="type === 'cccd'"
        :cccd-value="modelValue"
        :is-valid="validation.valid"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getNumberTypeInfo } from '../../constants/numberTypes.js';
import CCCDInfo from './CCCDInfo.vue';

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
  let value = event.target.value;
  let formatted = value;
  
  // Xử lý formatting theo từng loại số
  switch (props.type) {
    case 'birthdate':
      // Chỉ cho phép số và dấu /
      value = value.replace(/[^0-9/]/g, '');
      formatted = formatBirthdate(value);
      break;
      
    case 'phone':
      // Chỉ cho phép số và khoảng trắng
      value = value.replace(/[^0-9\s]/g, '');
      formatted = formatPhoneNumber(value);
      break;
      
    case 'cccd':
      // Chỉ cho phép số và khoảng trắng
      value = value.replace(/[^0-9\s]/g, '');
      formatted = formatCCCD(value);
      break;
      
    case 'bankAccount':
      // Chỉ cho phép số và khoảng trắng
      value = value.replace(/[^0-9\s]/g, '');
      formatted = formatBankAccount(value);
      break;
      
    default:
      // Các loại khác giữ nguyên
      formatted = value;
      break;
  }
  
  // Cập nhật giá trị hiển thị nếu có formatting
  if (formatted !== value) {
    event.target.value = formatted;
  }
  
  emit('update:modelValue', formatted);
  emit('input', formatted);
};

const handleKeydown = (event) => {
  // Áp dụng cho các loại số có formatting
  const formattedTypes = ['birthdate', 'phone', 'cccd', 'bankAccount'];
  if (!formattedTypes.includes(props.type)) return;
  
  const key = event.key;
  
  // Cho phép các phím điều hướng và xóa
  if ([
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 
    'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab'
  ].includes(key)) {
    return;
  }
  
  // Cho phép Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(key.toLowerCase())) {
    return;
  }
  
  // Chỉ cho phép số
  if (!/^[0-9]$/.test(key)) {
    event.preventDefault();
  }
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
  switch (props.type) {
    case 'birthdate': return 10; // DD/MM/YYYY
    case 'phone': return 13; // 0912 345 678 (bao gồm spaces)
    case 'cccd': return 15; // 087 0 84 000999 (bao gồm spaces)
    case 'bankAccount': return 25; // Cho phép nhiều nhóm 4 số
    default: return typeInfo.value?.maxLength || 20;
  }
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

// Format functions cho từng loại số
const formatBirthdate = (value) => {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length === 0) return '';
  
  let formatted = '';
  
  // Day (2 digits)
  if (numbers.length >= 1) {
    formatted += numbers.substring(0, Math.min(2, numbers.length));
  }
  
  // Add slash after day
  if (numbers.length >= 3) {
    formatted += '/';
    formatted += numbers.substring(2, Math.min(4, numbers.length));
  }
  
  // Add slash after month
  if (numbers.length >= 5) {
    formatted += '/';
    formatted += numbers.substring(4, Math.min(8, numbers.length));
  }
  
  return formatted;
};

// Format số điện thoại: 0912345678 → 0912 345 678
const formatPhoneNumber = (value) => {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length === 0) return '';
  
  let formatted = '';
  
  // 4 số đầu
  if (numbers.length >= 1) {
    formatted += numbers.substring(0, Math.min(4, numbers.length));
  }
  
  // Khoảng trắng + 3 số tiếp theo
  if (numbers.length >= 5) {
    formatted += ' ' + numbers.substring(4, Math.min(7, numbers.length));
  }
  
  // Khoảng trắng + 3 số cuối
  if (numbers.length >= 8) {
    formatted += ' ' + numbers.substring(7, Math.min(11, numbers.length));
  }
  
  return formatted;
};

// Format CCCD: 087084000999 → 087 0 84 000999 (3-1-2-6)
const formatCCCD = (value) => {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length === 0) return '';
  
  let formatted = '';
  
  // 3 số đầu (mã tỉnh)
  if (numbers.length >= 1) {
    formatted += numbers.substring(0, Math.min(3, numbers.length));
  }
  
  // Khoảng trắng + 1 số (mã giới tính)
  if (numbers.length >= 4) {
    formatted += ' ' + numbers.substring(3, Math.min(4, numbers.length));
  }
  
  // Khoảng trắng + 2 số (mã năm sinh)
  if (numbers.length >= 5) {
    formatted += ' ' + numbers.substring(4, Math.min(6, numbers.length));
  }
  
  // Khoảng trắng + 6 số cuối (số ngẫu nhiên)
  if (numbers.length >= 7) {
    formatted += ' ' + numbers.substring(6, Math.min(12, numbers.length));
  }
  
  return formatted;
};

// Format số tài khoản: 001232151234 → 0012 3215 1234 2 (sau mỗi 4 số)
const formatBankAccount = (value) => {
  const numbers = value.replace(/[^0-9]/g, '');
  if (numbers.length === 0) return '';
  
  let formatted = '';
  let pos = 0;
  
  while (pos < numbers.length) {
    if (pos > 0) formatted += ' ';
    formatted += numbers.substring(pos, Math.min(pos + 4, numbers.length));
    pos += 4;
  }
  
  return formatted;
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