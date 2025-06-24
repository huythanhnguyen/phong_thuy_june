<template>
  <div class="min-h-screen flex flex-col">

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8 flex-grow max-w-4xl">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-gray-500 mb-6">
        <router-link to="/" class="hover:text-primary">Trang chủ</router-link>
        <span class="mx-2">/</span>
        <span class="text-gray-700">Căn Cước Công Dân</span>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ý Nghĩa Căn Cước Công Dân</h1>          
      
      <!-- Content -->
      <div class="prose prose-lg max-w-none">
        <p class="lead text-xl text-gray-600 mb-8">
          Căn cước công dân (CCCD) không chỉ là giấy tờ tùy thân mà còn ẩn chứa những ý nghĩa phong thủy 
          quan trọng thông qua các dãy số trên thẻ.
        </p>

        <div class="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Cấu trúc số Căn cước công dân</h2>
          <p class="mb-4">Theo Thông tư 07/2016/TT-BCA, mỗi số trên thẻ căn cước công dân đều mang một ý nghĩa nhất định:</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h3 class="font-semibold text-lg mb-2 flex items-center">
                <span class="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm mr-2">1</span>
                Ba chữ số đầu tiên
              </h3>
              <p>Là mã tỉnh, thành phố trực thuộc trung ương hoặc mã quốc gia nơi công dân đăng ký khai sinh.</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h3 class="font-semibold text-lg mb-2 flex items-center">
                <span class="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm mr-2">2</span>
                Một chữ số tiếp theo
              </h3>
              <p>Là mã giới tính của công dân.</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h3 class="font-semibold text-lg mb-2 flex items-center">
                <span class="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm mr-2">3</span>
                Hai chữ số tiếp theo
              </h3>
              <p>Là mã năm sinh của công dân.</p>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm">
              <h3 class="font-semibold text-lg mb-2 flex items-center">
                <span class="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm mr-2">4</span>
                Sáu chữ số cuối
              </h3>
              <p>Là dãy số ngẫu nhiên - đây là phần chúng ta sẽ phân tích theo phong thủy.</p>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">Phương pháp phân tích phong thủy</h2>
        
        <p class="mb-4">
          Trong phong thủy số học, chúng ta chỉ phân tích 6 số cuối của căn cước công dân vì đây là dãy số 
          ngẫu nhiên và có thể ảnh hưởng đến vận mệnh của người sở hữu.
        </p>
        
        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-8">
          <h3 class="font-semibold text-lg mb-3">Quy tắc phân tích:</h3>
          <ol class="list-decimal list-inside space-y-3">
            <li>Chỉ phân tích 6 chữ số cuối của căn cước công dân.</li>
            <li>Nếu gặp số 0, chúng ta sẽ sử dụng số kế trước bên tay trái.</li>
            <li>Nếu số kế trước cũng là 0, tiếp tục tiến về bên trái cho đến khi gặp số khác 0.</li>
            <li>Sau khi có dãy số đã được chuẩn hóa, chúng ta phân tích thành từng cặp số để xác định các cặp sao.</li>
            <li>Mỗi cặp sao sẽ được đánh giá là cát (tốt) hay hung (xấu) dựa trên nguyên lý Bát Cực Linh Số.</li>
          </ol>
        </div>
        
        <div class="bg-green-50 p-6 rounded-lg border border-green-200 mb-8">
          <h3 class="font-semibold text-lg mb-3">Ví dụ minh họa:</h3>
          <p class="mb-2">Giả sử 6 số cuối của CCCD là: <strong>120304</strong></p>
          <ul class="list-disc list-inside space-y-2 mb-4">
            <li>Các cặp số: <strong>12</strong>, <strong>03</strong>, <strong>04</strong></li>
            <li>Với cặp <strong>03</strong>: Gặp số 0 nên thay bằng số kế trước (3), thành <strong>33</strong></li>
            <li>Với cặp <strong>04</strong>: Gặp số 0 nên thay bằng số kế trước (4), thành <strong>44</strong></li>
            <li>Dãy số sau chuẩn hóa: <strong>12</strong>, <strong>33</strong>, <strong>44</strong></li>
          </ul>
          <p>Từ đây, chúng ta sẽ phân tích ý nghĩa phong thủy của các cặp số này tương tự như phân tích số điện thoại.</p>
        </div>
        
        <p class="mb-6">
          Việc phân tích số CCCD theo phong thủy có thể giúp bạn hiểu thêm về các yếu tố tác động đến vận mệnh 
          và ảnh hưởng tiềm ẩn của dãy số này đến các khía cạnh khác nhau trong cuộc sống như sự nghiệp, 
          tài lộc, sức khỏe hay các mối quan hệ.
        </p>
        
        <p>
          Tuy nhiên, cần lưu ý rằng phương pháp này chỉ mang tính chất tham khảo, dựa trên nguyên lý phong thủy cổ 
          truyền kết hợp với các phương pháp hiện đại.
        </p>
      </div>

      <!-- Analysis Input Section - MOVED TO BOTTOM -->
      <div class="mt-12 mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Phân Tích Số CCCD Của Bạn</h2>
        
        <!-- CCCD Input -->
        <div class="mb-4">
          <label for="cccd" class="block text-gray-700 text-sm font-bold mb-2">Nhập số Căn Cước Công Dân (12 số):</label>
          <input type="text" id="cccd" v-model="cccd" 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập 12 số CCCD" maxlength="12">
          <p v-if="cccdError" class="text-red-500 text-xs italic mt-1">{{ cccdError }}</p>
        </div>
      
        <!-- Analyze Button -->
        <div class="mb-4">
          <button @click="analyzeCCCD" :disabled="loading"
                  class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200">
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang phân tích...
            </span>
            <span v-else>Phân tích CCCD</span>
          </button>
        </div>
        
        <p class="text-sm text-gray-600">
          Nhập 12 số trong thẻ CCCD của bạn để nhận phân tích chi tiết theo phương pháp Bát Cực Linh Số.
          Chúng tôi chỉ phân tích 6 số cuối của CCCD và không lưu trữ thông tin cá nhân của bạn.
        </p>
      </div>
      
      <!-- Analysis Result Section - ĐẶT BÊN DƯỚI INPUT VỚI ID -->
      <div v-if="displayAnalysis" id="analysis-results" class="mb-12 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Kết Quả Phân Tích CCCD</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold mb-2 text-blue-800">Số CCCD gốc</h3>
            <p class="text-lg font-mono">{{ displayAnalysis.originalNumber }}</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold mb-2 text-blue-800">Sáu số cuối</h3>
            <p class="text-lg font-mono">{{ displayAnalysis.lastSixDigits }}</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold mb-2 text-blue-800">Chuỗi chuẩn hóa</h3>
            <p class="text-lg font-mono">{{ displayAnalysis.normalizedSequence }}</p>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-bold mb-4 text-gray-800">Các cặp số và ý nghĩa</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="pair in displayAnalysis.analysis.individualPairs" :key="pair.pairNumber"
                 :class="[
                  'p-4 rounded-lg shadow-sm border-l-4',
                  pair.nature.includes('Cát') ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                ]">
              <div class="flex justify-between items-center mb-2">
                <span class="text-lg font-bold">Cặp {{ pair.digits }}</span>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-semibold',
                  pair.nature.includes('Cát') ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                ]">
                  {{ pair.nature }}
                </span>
              </div>
              <p class="mb-1"><span class="font-semibold">Sao:</span> {{ pair.star }}</p>
              <p class="mb-1"><span class="font-semibold">Ý nghĩa:</span> {{ pair.meaning }}</p>
              <p><span class="font-semibold">Năng lượng:</span> 
                <span class="flex mt-1">
                  <span v-for="n in 5" :key="n" 
                        :class="[
                          'w-3 h-3 rounded-full mr-1', 
                          n <= pair.energyLevel ? 
                            (pair.nature.includes('Cát') ? 'bg-green-500' : 'bg-red-500') : 
                            'bg-gray-200'
                        ]">
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div class="mb-8">
          <h3 class="text-xl font-bold mb-4 text-gray-800">Tổ hợp sao</h3>
          <div class="space-y-4">
            <div v-for="(combination, index) in displayAnalysis.analysis.starCombinations" :key="index"
                class="bg-indigo-50 p-5 rounded-lg shadow-sm border border-indigo-200">
              <h4 class="font-bold text-lg mb-2 text-indigo-800">{{ combination.stars }}</h4>
              <p class="mb-3 text-gray-700">{{ combination.meaning }}</p>
              <div class="bg-white p-3 rounded-md">
                <h5 class="font-semibold mb-2 text-gray-700">Chi tiết:</h5>
                <ul class="list-disc pl-5 space-y-1 text-gray-600">
                  <li v-for="(detail, detailIndex) in combination.details" :key="detailIndex">
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold mb-2 text-gray-800">Tổng Quan</h3>
          <p>{{ displayAnalysis.analysis.overallSummary }}</p>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import DetailedAnalysis from '@/components/analysis/DetailedAnalysis.vue';

const router = useRouter();

const cccd = ref('');
const cccdError = ref('');
const analysisResults = ref(null);
const loading = ref(false);
const displayAnalysis = ref(null);

const validateCCCD = () => {
    cccdError.value = '';
    const cccdValue = cccd.value.trim();
    const isValid = /^\d{12}$/.test(cccdValue);
    if (!isValid) cccdError.value = 'Số CCCD phải là 12 chữ số.';
    return isValid;
};

const analyzeCCCD = async () => {
  if (!validateCCCD()) {
    return;
  }

  loading.value = true;
  analysisResults.value = null; 
  displayAnalysis.value = null;

  try {
    const response = await fetch('https://chatbotsdtapi.onrender.com/api/cccd/analyze-cccd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cccdNumber: cccd.value })
    });

    if (!response.ok) {
      const data = await response.json(); // Parse error response
      throw new Error('Failed to analyze CCCD: ' + data.message);
    }

    const data = await response.json();
    displayAnalysis.value = data.data;
    
    // Scroll to results after loading
    setTimeout(() => {
      const resultsElement = document.getElementById('analysis-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  } catch (error) {
      cccdError.value = error.message
  } finally {
    loading.value = false;
  }
}

// Navigation method
const navigateToLogin = () => {
  router.push({ name: 'login' })
}
</script>

<style scoped>
/* Các style bổ sung nếu cần */
.text-primary {
  color: var(--primary-color, #4361ee);
}

.hover\:text-primary:hover {
  color: var(--primary-color, #4361ee);
}

.bg-primary {
  background-color: var(--primary-color, #4361ee);
}

.bg-primary-dark {
  background-color: var(--primary-dark, #3a56d4);
}

/* Animation cho dots khi loading */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>