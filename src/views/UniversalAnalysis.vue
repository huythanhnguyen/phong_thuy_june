<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sử dụng component Header -->
    <Header />

    <div class="universal-analysis-page flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- Header Section -->
      <div class="container mx-auto px-4 py-8">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            Phân Tích Phong Thủy Số Học Tổng Hợp
          </h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Chọn loại số và nhận kết quả phân tích chi tiết ngay lập tức
          </p>
        </div>

        <!-- Number Type Selector -->
        <div class="mb-8">
          <NumberTypeSelector 
            v-model="selectedType" 
            @change="handleTypeChange"
          />
        </div>

        <!-- Input Section -->
        <div class="mb-8">
          <NumberInput 
            :type="selectedType"
            v-model="inputValue"
            :validation="validation"
            @input="handleInput"
            @analyze="performAnalysis"
          />
          <!-- Token usage for guest -->
          <div v-if="!isAuthenticated" class="text-sm text-gray-600 mt-2 text-center">
            Bạn đã sử dụng {{ tokenInfo }} lượt phân tích hôm nay.
          </div>
        </div>

        <!-- Analysis Results -->
        <div v-if="analysisResult && !analysisResult.error" class="mb-8">
          <AnalysisResults 
            :result="analysisResult"
            :type="selectedType"
            :input-value="inputValue"
            :show-score="false"
          />
        </div>

        <!-- Error Display -->
        <div v-if="analysisResult && analysisResult.error" class="mb-8">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div class="text-red-600 font-medium">{{ analysisResult.error }}</div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isAnalyzing" class="mb-8">
          <div class="bg-white rounded-lg shadow-md p-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div class="text-gray-600">Đang phân tích...</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sử dụng component Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import { UniversalAnalysisEngine } from '../utils/analysisEngine.js';
import { validateNumberInput, getNumberTypeInfo, validateBirthdateInput } from '../constants/numberTypes.js';
import NumberTypeSelector from '../components/analysis/NumberTypeSelector.vue';
import NumberInput from '../components/analysis/NumberInput.vue';
import AnalysisResults from '../components/analysis/AnalysisResults.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import { useAuthStore } from '../stores/auth.js';
import { useUniversalAnalysisStore } from '../stores/universalAnalysis.js';

// Reactive data
const selectedType = ref('phone');
const inputValue = ref('');
const analysisResult = ref(null);
const isAnalyzing = ref(false);
const validation = reactive({
  valid: true,
  message: ''
});

// Stores
const authStore = useAuthStore();
const uaStore = useUniversalAnalysisStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const tokenInfo = computed(() => uaStore.tokenInfo);

// Methods
const handleTypeChange = (newType) => {
  selectedType.value = newType;
  inputValue.value = '';
  analysisResult.value = null;
  resetValidation();
};

const handleInput = (value) => {
  inputValue.value = value;
  
  // Real-time validation
  if (value.trim() === '') {
    resetValidation();
    analysisResult.value = null;
    return;
  }
  
  const validationResult = validateNumberInput(value, selectedType.value);
  validation.valid = validationResult.valid;
  validation.message = validationResult.message || '';
  
  // Auto-analyze if valid and sufficient length
  if (validationResult.valid) {
    debounceAnalysis();
  } else {
    analysisResult.value = null;
  }
};

const resetValidation = () => {
  validation.valid = true;
  validation.message = '';
};

let debounceTimer = null;
const debounceAnalysis = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    performAnalysis();
  }, 500);
};

const performAnalysis = async () => {
  if (!inputValue.value.trim() || !validation.valid) {
    return;
  }

  isAnalyzing.value = true;

  try {
    // small UX delay
    await new Promise(r => setTimeout(r, 200));

    const result = await uaStore.analyzeNumber(inputValue.value, selectedType.value);

    analysisResult.value = result || uaStore.analysisResult;

  } catch (error) {
    console.error('Analysis error:', error);
    analysisResult.value = { error: 'Có lỗi xảy ra khi phân tích' };
  } finally {
    isAnalyzing.value = false;
  }
};

// Watch for type changes
watch(selectedType, () => {
  resetValidation();
});

onMounted(() => {
  uaStore.init();
});
</script>

<style scoped>
.universal-analysis-page {
  min-height: 100vh;
}

/* Smooth transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 