<template>
  <div class="min-h-screen">
    <div class="universal-analysis-page bg-gradient-to-br from-blue-50 to-indigo-100">
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

    <!-- Floating Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
        @click="navigateToMainAnalysis"
        class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        title="Phân tích tổng hợp"
      >
        <svg class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
          <!-- I-Ching Bagua Symbol -->
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1" fill="none"/>
          <!-- Yin Yang center -->
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
          <path d="M12 9 A1.5 1.5 0 0 1 12 15 A1.5 1.5 0 0 0 12 9" fill="white"/>
          <circle cx="12" cy="10.5" r="0.5" fill="white"/>
          <circle cx="12" cy="13.5" r="0.5" fill="currentColor"/>
          <!-- Trigram lines -->
          <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <!-- Top trigram -->
            <line x1="12" y1="3" x2="12" y2="5"/>
            <line x1="10.5" y1="4" x2="13.5" y2="4"/>
            <!-- Bottom trigram -->  
            <line x1="12" y1="19" x2="12" y2="21"/>
            <line x1="10.5" y1="20" x2="13.5" y2="20"/>
            <!-- Left trigram -->
            <line x1="3" y1="12" x2="5" y2="12"/>
            <line x1="4" y1="10.5" x2="4" y2="13.5"/>
            <!-- Right trigram -->
            <line x1="19" y1="12" x2="21" y2="12"/>
            <line x1="20" y1="10.5" x2="20" y2="13.5"/>
          </g>
        </svg>
        <span class="ml-2 text-sm font-medium hidden group-hover:inline-block">Tổng hợp</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UniversalAnalysisEngine } from '../utils/analysisEngine.js';
import { validateNumberInput, getNumberTypeInfo, validateBirthdateInput } from '../constants/numberTypes.js';
import NumberTypeSelector from '../components/analysis/NumberTypeSelector.vue';
import NumberInput from '../components/analysis/NumberInput.vue';
import AnalysisResults from '../components/analysis/AnalysisResults.vue';
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

// Router
const router = useRouter();

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

// Navigation
const navigateToMainAnalysis = () => {
  router.push('/main-analysis');
};

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