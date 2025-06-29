<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <div class="main-analysis-page flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-4 py-8">
        <!-- Title -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">
            Phân Tích Phong Thủy Số Học Tổng Hợp
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Phân tích đầy đủ các yếu tố Tiên thiên và Hậu thiên theo phong thủy số học
          </p>
        </div>

        <!-- Tiên Thiên Section -->
        <div class="mb-12">
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 class="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"/>
              </svg>
              Tiên Thiên - Yếu tố bẩm sinh
            </h2>
            <p class="text-gray-600 mb-6">Các yếu tố được định sẵn từ khi sinh ra, không thể thay đổi</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Ngày sinh -->
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <h3 class="font-semibold text-purple-800 mb-3">Ngày Sinh</h3>
                <NumberInput 
                  type="birthdate"
                  v-model="tienThien.birthdate"
                  :validation="validations.birthdate"
                  @input="(value) => handleInput('birthdate', value)"
                />
                <div v-if="results.birthdate && !results.birthdate.error" class="mt-3">
                  <AnalysisResults :result="results.birthdate" :type="'birthdate'" :input-value="tienThien.birthdate" :show-score="false" compact />
                </div>
              </div>

              <!-- Căn cước công dân -->
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <h3 class="font-semibold text-blue-800 mb-3">Căn Cước Công Dân</h3>
                <NumberInput 
                  type="cccd"
                  v-model="tienThien.cccd"
                  :validation="validations.cccd"
                  @input="(value) => handleInput('cccd', value)"
                />
                <div v-if="results.cccd && !results.cccd.error" class="mt-3">
                  <AnalysisResults :result="results.cccd" :type="'cccd'" :input-value="tienThien.cccd" :show-score="false" compact />
                </div>
              </div>

              <!-- Họ và tên -->
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <h3 class="font-semibold text-green-800 mb-3">Họ và Tên</h3>
                <NumberInput 
                  type="random"
                  v-model="tienThien.name"
                  :validation="validations.name"
                  @input="(value) => handleInput('name', value)"
                  placeholder="Nhập họ và tên của bạn..."
                />
                <div v-if="results.name && !results.name.error" class="mt-3">
                  <AnalysisResults :result="results.name" :type="'random'" :input-value="tienThien.name" :show-score="false" compact />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hậu Thiên Section -->
        <div class="mb-12">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-orange-800 mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Hậu Thiên - Yếu tố có thể điều chỉnh
            </h2>
            <p class="text-gray-600 mb-6">Các yếu tố có thể lựa chọn và thay đổi để cải thiện vận may</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Số nhà -->
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                <h3 class="font-semibold text-yellow-800 mb-3">Số Nhà</h3>
                <NumberInput 
                  type="licensePlate"
                  v-model="hauThien.address"
                  :validation="validations.address"
                  @input="(value) => handleInput('address', value)"
                />
                <div v-if="results.address && !results.address.error" class="mt-3">
                  <AnalysisResults :result="results.address" :type="'licensePlate'" :input-value="hauThien.address" :show-score="false" compact />
                </div>
              </div>

              <!-- Số xe -->
              <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                <h3 class="font-semibold text-red-800 mb-3">Số Xe</h3>
                <NumberInput 
                  type="licensePlate"
                  v-model="hauThien.licensePlate"
                  :validation="validations.licensePlate"
                  @input="(value) => handleInput('licensePlate', value)"
                />
                <div v-if="results.licensePlate && !results.licensePlate.error" class="mt-3">
                  <AnalysisResults :result="results.licensePlate" :type="'licensePlate'" :input-value="hauThien.licensePlate" :show-score="false" compact />
                </div>
              </div>

              <!-- Số điện thoại -->
              <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
                <h3 class="font-semibold text-indigo-800 mb-3">Số Điện Thoại</h3>
                <NumberInput 
                  type="phone"
                  v-model="hauThien.phone"
                  :validation="validations.phone"
                  @input="(value) => handleInput('phone', value)"
                />
                <div v-if="results.phone && !results.phone.error" class="mt-3">
                  <AnalysisResults :result="results.phone" :type="'phone'" :input-value="hauThien.phone" :show-score="false" compact />
                </div>
              </div>

              <!-- Số ngẫu nhiên -->
              <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                <h3 class="font-semibold text-gray-800 mb-3">Số Ngẫu Nhiên</h3>
                <NumberInput 
                  type="random"
                  v-model="hauThien.random"
                  :validation="validations.random"
                  @input="(value) => handleInput('random', value)"
                />
                <div v-if="results.random && !results.random.error" class="mt-3">
                  <AnalysisResults :result="results.random" :type="'random'" :input-value="hauThien.random" :show-score="false" compact />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading States -->
        <div v-if="isAnalyzing" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div class="text-gray-600">Đang phân tích...</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { UniversalAnalysisEngine } from '../utils/analysisEngine.js';
import { validateNumberInput, validateBirthdateInput } from '../constants/numberTypes.js';
import NumberInput from '../components/analysis/NumberInput.vue';
import AnalysisResults from '../components/analysis/AnalysisResults.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import { useUniversalAnalysisStore } from '../stores/universalAnalysis.js';

// Stores
const uaStore = useUniversalAnalysisStore();

// Reactive data
const tienThien = reactive({
  birthdate: '',
  cccd: '',
  name: ''
});

const hauThien = reactive({
  address: '',
  licensePlate: '',
  phone: '',
  random: ''
});

const validations = reactive({
  birthdate: { valid: true, message: '' },
  cccd: { valid: true, message: '' },
  name: { valid: true, message: '' },
  address: { valid: true, message: '' },
  licensePlate: { valid: true, message: '' },
  phone: { valid: true, message: '' },
  random: { valid: true, message: '' }
});

const results = reactive({
  birthdate: null,
  cccd: null,
  name: null,
  address: null,
  licensePlate: null,
  phone: null,
  random: null
});

const isAnalyzing = ref(false);

// Methods
const handleInput = async (type, value) => {
  // Reset validation
  validations[type].valid = true;
  validations[type].message = '';
  results[type] = null;

  if (!value || value.trim() === '') return;

  // Map analysis types - name và address sử dụng validation giống cccd và licensePlate
  const analysisTypeMap = {
    'name': 'random',      // Họ tên sử dụng validation như random number
    'address': 'licensePlate'  // Số nhà sử dụng validation như biển số xe
  };

  const validationType = analysisTypeMap[type] || type;
  const validation = validateNumberInput(value, validationType);

  validations[type].valid = validation.valid;
  validations[type].message = validation.message || '';

  if (validation.valid) {
    debounceAnalysis(type, validation.cleanValue || value);
  }
};

// Validation functions - không cần nữa vì đã dùng validateNumberInput

// Convert name to numbers (A=a=1, B=b=2, etc.)
const convertNameToNumbers = (name) => {
  const cleanName = name.replace(/\s+/g, '').toLowerCase();
  let numbers = '';
  
  for (let char of cleanName) {
    if (char >= 'a' && char <= 'z') {
      numbers += (char.charCodeAt(0) - 96).toString();
    } else {
      // Xử lý ký tự tiếng Việt
      const vietnameseMap = {
        'à': 1, 'á': 1, 'ạ': 1, 'ả': 1, 'ã': 1, 'â': 1, 'ầ': 1, 'ấ': 1, 'ậ': 1, 'ẩ': 1, 'ẫ': 1, 'ă': 1, 'ằ': 1, 'ắ': 1, 'ặ': 1, 'ẳ': 1, 'ẵ': 1,
        'è': 5, 'é': 5, 'ẹ': 5, 'ẻ': 5, 'ẽ': 5, 'ê': 5, 'ề': 5, 'ế': 5, 'ệ': 5, 'ể': 5, 'ễ': 5,
        'ì': 9, 'í': 9, 'ị': 9, 'ỉ': 9, 'ĩ': 9,
        'ò': 15, 'ó': 15, 'ọ': 15, 'ỏ': 15, 'õ': 15, 'ô': 15, 'ồ': 15, 'ố': 15, 'ộ': 15, 'ổ': 15, 'ỗ': 15, 'ơ': 15, 'ờ': 15, 'ớ': 15, 'ợ': 15, 'ở': 15, 'ỡ': 15,
        'ù': 21, 'ú': 21, 'ụ': 21, 'ủ': 21, 'ũ': 21, 'ư': 21, 'ừ': 21, 'ứ': 21, 'ự': 21, 'ử': 21, 'ữ': 21,
        'ỳ': 25, 'ý': 25, 'ỵ': 25, 'ỷ': 25, 'ỹ': 25,
        'đ': 4
      };
      
      if (vietnameseMap[char]) {
        numbers += vietnameseMap[char].toString();
      }
    }
  }
  
  return numbers;
};

// Debounce analysis
let debounceTimers = {};
const debounceAnalysis = (type, value) => {
  clearTimeout(debounceTimers[type]);
  debounceTimers[type] = setTimeout(() => {
    performAnalysis(type, value);
  }, 500);
};

const performAnalysis = async (type, value) => {
  isAnalyzing.value = true;

  try {
    await new Promise(r => setTimeout(r, 200));

    // Map analysis types to match the logic
    const analysisTypeMap = {
      'name': 'random',      // Họ tên phân tích như random number
      'address': 'licensePlate'  // Số nhà phân tích như biển số xe
    };

    let analysisValue = value;
    let analysisType = analysisTypeMap[type] || type;

    // Special handling for name - convert to numbers first
    if (type === 'name') {
      analysisValue = convertNameToNumbers(value);
    }

    const result = await uaStore.analyzeNumber(analysisValue, analysisType);
    results[type] = result || uaStore.analysisResult;

    // Apply special logic for name (20->22 like CCCD)
    if (type === 'name' && results[type]) {
      results[type] = applySpecialLogic(results[type]);
    }

  } catch (error) {
    console.error('Analysis error:', error);
    results[type] = { error: 'Có lỗi xảy ra khi phân tích' };
  } finally {
    isAnalyzing.value = false;
  }
};

// Apply special logic for name and address (20->22)
const applySpecialLogic = (result) => {
  if (!result || !result.summary) return result;
  
  // Clone result to avoid mutation
  const newResult = JSON.parse(JSON.stringify(result));
  
  // Apply 20->22 transformation
  if (newResult.summary.totalSum === 20) {
    newResult.summary.totalSum = 22;
    newResult.summary.masterNumber = 22;
    // Update meanings accordingly
    if (newResult.meanings) {
      newResult.meanings.total = "Số chủ đạo 22: Con số kiến trúc sư, có khả năng biến ý tưởng thành hiện thực, lãnh đạo xuất sắc";
    }
  }
  
  return newResult;
};

// Initialize store
onMounted(() => {
  uaStore.init();
});
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.main-analysis-page {
  animation: fadeIn 0.6s ease-out;
}

/* Compact analysis styles for AnalysisResults */
:deep(.analysis-results.compact) {
  font-size: 0.875rem;
}

:deep(.analysis-results.compact .analysis-card) {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}
</style> 