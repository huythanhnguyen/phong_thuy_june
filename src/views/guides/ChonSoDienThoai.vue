<template>
  <div class="min-h-screen flex flex-col">
      <!-- Header -->
    <Header />

    <main class="flex-grow container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">Chọn Số Điện Thoại Hợp Phong Thủy</h1>
        
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p class="text-lg text-gray-700 mb-6">
            Số điện thoại không chỉ là một dãy số để liên lạc mà còn có thể ảnh hưởng đến năng lượng, vận mệnh và các khía cạnh trong cuộc sống của bạn theo quan điểm phong thủy.
          </p>
          
          <div class="border-l-4 border-primary p-4 bg-primary-light mb-8">
            <h3 class="font-bold text-lg mb-2">Lưu ý quan trọng</h3>
            <p>Hiện nay nhiều nhà mạng cho phép khách hàng chọn số điện thoại. Việc chọn một số điện thoại hợp phong thủy có thể mang lại nhiều may mắn, thuận lợi.</p>
          </div>
          
          <div class="border-l-4 border-yellow-500 p-4 bg-yellow-50 mb-8">
            <h3 class="font-bold text-lg text-yellow-700 mb-2">Các nguyên tắc chọn số điện thoại</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Phương pháp phân tích:</strong> Dãy số được phân tích từng cặp từ trái qua phải, đặc biệt quan trọng là cặp số cuối</li>
              <li><strong>Sinh Khí</strong> (14, 41, 39, 93) thích hợp cho sức khỏe, năng lượng tích cực</li>
              <li><strong>Thiên Y</strong> (13, 31) mang đến may mắn về tài lộc, tiền bạc</li>
              <li><strong>Diên Niên</strong> (19, 91, 34, 43) thích hợp cho sự nghiệp ổn định, bền vững</li>
              <li><strong>Lưu ý:</strong> Tránh kết thúc bằng số 0 hoặc các hung tinh (Ngũ Quỷ, Tuyệt Mệnh, Lục Sát, Họa Hại)</li>
              <li><strong>Đặc biệt:</strong> Nếu kết thúc bằng số 5, cặp số trước phải là cát tinh phù hợp với mục đích sử dụng</li>
              <li><strong>Cân bằng âm dương:</strong> Một số hung tinh khi kết hợp khéo léo với các cát tinh có thể tạo nên sự cân bằng âm dương tốt</li>
            </ul>
          </div>
          </div>
          
        <!-- Phần chọn đầu số -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Đầu số mong muốn</h2>
          <p class="mb-4">Chọn đầu số nhà mạng bạn mong muốn</p>
          
          <div class="grid md:grid-cols-4 gap-4 mb-6">
            <div 
              v-for="(provider, index) in providers" 
              :key="index"
              class="border rounded-lg p-4 cursor-pointer transition-all duration-300"
              :class="selectedProvider === provider.value ? 'border-primary bg-primary-light shadow-md' : 'border-gray-200 hover:border-primary hover:shadow'"
              @click="selectedProvider = provider.value"
            >
              <div class="flex items-center">
                <div class="w-5 h-5 rounded-full border mr-3 flex items-center justify-center" 
                     :class="selectedProvider === provider.value ? 'border-primary' : 'border-gray-400'">
                  <div v-if="selectedProvider === provider.value" class="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <span>{{ provider.label }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Phần chọn mục đích -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Mục tiêu mong muốn</h2>
          <p class="mb-4">Chọn mục tiêu bạn muốn số điện thoại hỗ trợ</p>
          
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div 
              v-for="(purpose, index) in purposes" 
              :key="index"
              class="border rounded-lg p-4 cursor-pointer transition-all duration-300"
              :class="selectedPurpose === purpose.value ? 'border-primary bg-primary-light shadow-md' : 'border-gray-200 hover:border-primary hover:shadow'"
              @click="selectedPurpose = purpose.value"
            >
              <div class="flex items-center">
                <div class="w-5 h-5 rounded-full border mr-3 flex items-center justify-center" 
                     :class="selectedPurpose === purpose.value ? 'border-primary' : 'border-gray-400'">
                  <div v-if="selectedPurpose === purpose.value" class="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <span>{{ purpose.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Phần tùy chọn nâng cao -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Tùy chọn nâng cao</h2>
          <div class="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="includeNegativeStar" 
              v-model="includeNegativeStar"
              class="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
            >
            <label for="includeNegativeStar" class="ml-2 block text-gray-700">
              Thêm một hung tinh để cân bằng âm dương (không ở vị trí cuối)
            </label>
          </div>
          <p class="text-sm text-gray-600 ml-7">
            Việc kết hợp khéo léo một hung tinh với các cát tinh có thể tạo nên sự cân bằng âm dương, tương sinh hỗ trợ cho mục đích của bạn:
            <br>• <strong>Ngũ Quỷ, Tuyệt Mệnh</strong> - Tăng cường năng lượng dương, khả năng quyết đoán
            <br>• <strong>Lục Sát</strong> (38, 83, 52, 25) - Tăng cường năng lượng âm (nữ tính)
            <br>• <strong>Họa Hại</strong> (47, 74) - Tăng cường khả năng biểu đạt, giao tiếp
            <br>Hung tinh sẽ không được đặt ở cặp số cuối cùng.
          </p>
                </div>

        <!-- Phần gợi ý số điện thoại -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Số điện thoại gợi ý</h2>
          
          <div v-if="!selectedPurpose || !selectedProvider" class="text-center py-6 text-gray-500">
            Vui lòng chọn đầu số và mục tiêu để nhận gợi ý
                  </div>
          
          <div v-else>
            <div class="mb-6">
              <p class="mb-2">Cặp sao tương ứng: <span class="font-semibold">{{ getStars() }}</span></p>
              <p class="mt-2 text-gray-600 text-sm">{{ getPurposeDescription() }}</p>
              <div class="mt-4 border-l-4 border-primary p-4 bg-primary-light">
                <h4 class="font-bold mb-2">Cặp số cuối phù hợp</h4>
                <p class="text-sm" v-if="selectedPurpose === 'wealth'">
                  Dùng <strong>Thiên Y</strong> (13, 31, 68, 86) ở cuối số điện thoại giúp thu hút tài lộc, thịnh vượng.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'health'">
                  Dùng <strong>Sinh Khí</strong> (14, 41, 39, 93) ở cuối số điện thoại giúp tăng cường sức khỏe, năng lượng.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'career'">
                  Dùng <strong>Diên Niên</strong> (19, 91, 34, 43) ở cuối số điện thoại giúp sự nghiệp ổn định, phát triển bền vững.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'relationship'">
                  Dùng <strong>Phục Vị</strong> (11, 33, 77, 99) ở cuối số điện thoại giúp các mối quan hệ, duyên phận tốt đẹp.
                </p>
                  </div>
                </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div v-for="(phone, index) in suggestedPhoneNumbers" :key="index" 
                class="border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow">
                <div class="text-xl font-mono mb-2 text-center">{{ phone }}</div>
                <div class="text-xs text-gray-500 text-center mb-2">{{ phoneExplanations[index] }}</div>
                <button 
                  @click="copyToClipboard(phone)" 
                  class="absolute top-2 right-2 text-gray-500 hover:text-primary"
                  title="Sao chép"
                >
                  <span>📋</span>
                </button>
              </div>
            </div>
            
            <div class="text-center">
              <button 
                @click="generatePhoneNumbers" 
                class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors shadow-md"
              >
                Gợi ý số khác
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

// Trạng thái
const selectedProvider = ref('')
const selectedPurpose = ref('')
const suggestedPhoneNumbers = ref([])
const phoneExplanations = ref([])
const includeNegativeStar = ref(false)

// Danh sách nhà mạng
const providers = [
  { value: '086', label: 'Viettel (086)' },
  { value: '088', label: 'Vinaphone (088)' },
  { value: '089', label: 'Mobifone (089)' },
  { value: '090', label: 'Mobifone (090)' },
  { value: '091', label: 'Vinaphone (091)' },
  { value: '094', label: 'Viettel (094)' },
  { value: '097', label: 'Viettel (097)' },
  { value: '098', label: 'Viettel (098)' },
]

// Danh sách mục tiêu
const purposes = [
  { value: 'wealth', label: 'Tài lộc' },
  { value: 'health', label: 'Sức khỏe' },
  { value: 'career', label: 'Sự nghiệp' },
  { value: 'relationship', label: 'Hôn nhân, Tình duyên' }
]

// Dữ liệu phong thủy
const fengShuiData = {
  wealth: {
    stars: 'Thiên Y',
    luckyNumbers: ['1', '3', '6', '8', '9'], 
    combinations: ['13', '31', '68', '86', '49', '94'],
    description: 'Số điện thoại có cặp số Thiên Y giúp thu hút tài lộc, tiền bạc dồi dào và cơ hội làm ăn.'
  },
  health: {
    stars: 'Sinh Khí',
    luckyNumbers: ['1', '4', '3', '9', '8', '2'], 
    combinations: ['14', '41', '39', '93', '67', '76'],
    description: 'Số điện thoại có cặp số Sinh Khí giúp tăng cường sức khỏe, năng lượng tích cực.'
  },
  career: {
    stars: 'Diên Niên',
    luckyNumbers: ['1', '9', '3', '4', '7', '8'], 
    combinations: ['19', '91', '34', '43', '78', '87'],
    description: 'Số điện thoại có cặp số Diên Niên giúp sự nghiệp ổn định, phát triển bền vững.'
  },
  relationship: {
    stars: 'Phục Vị + Sinh Khí',
    luckyNumbers: ['1', '3', '7', '9'], 
    combinations: ['11', '33', '77', '99', '14', '41'],
    description: 'Số điện thoại có cặp số Phục Vị hoặc Sinh Khí giúp các mối quan hệ, duyên phận tốt đẹp.'
  }
}

// Cặp số tương ứng với các sao
const starNumbers = {
  'SINH_KHI': ['14', '41', '67', '76', '39', '93', '28', '82'],
  'THIEN_Y': ['13', '31', '68', '86', '49', '94', '27', '72'],
  'DIEN_NIEN': ['19', '91', '78', '87', '34', '43', '26', '62'],
  'NGU_QUY': ['18', '81', '79', '97', '36', '63', '24', '42'],
  'TUYET_MENH': ['12', '21', '69', '96', '84', '48', '73', '37'],
  'PHUC_VI': ['11', '22', '33', '44', '55', '66', '77', '88', '99'],
  'LUC_SAT': ['38', '83', '52', '25', '61', '16'], // Thêm Lục Sát
  'HOA_HAI': ['47', '74', '29', '92', '56', '65'] // Thêm Họa Hại
}

// Phương thức
const getStars = () => {
  return selectedPurpose.value ? fengShuiData[selectedPurpose.value].stars : ''
}

const getPurposeDescription = () => {
  return selectedPurpose.value ? fengShuiData[selectedPurpose.value].description : ''
}

const getNegativeStarForBalance = (previousDigit, forbiddenPairs = []) => {
  // Danh sách các hung tinh
  const allNegativeStars = [
    ...starNumbers.NGU_QUY, 
    ...starNumbers.TUYET_MENH,
    ...starNumbers.LUC_SAT,
    ...starNumbers.HOA_HAI
  ];
  
  // Lọc ra các cặp hung tinh mà không nằm trong danh sách cấm
  const validNegativeStars = allNegativeStars.filter(pair => {
    // Kiểm tra pair không bắt đầu bằng previousDigit để không tạo thành 2 hung tinh liền kề
    if (pair.startsWith(previousDigit)) {
      for (const key of ['NGU_QUY', 'TUYET_MENH', 'LUC_SAT', 'HOA_HAI']) {
        if (starNumbers[key].some(p => p.endsWith(previousDigit))) {
          return false; // Nếu previousDigit là kết thúc của 1 hung tinh, không chọn
        }
      }
    }
    
    return !forbiddenPairs.includes(pair);
  });
  
  if (validNegativeStars.length > 0) {
    // Chọn ngẫu nhiên một cặp hung tinh
    const randomIndex = Math.floor(Math.random() * validNegativeStars.length);
    return validNegativeStars[randomIndex];
  }
  
  return null;
}

const generatePhoneExplanation = (phone) => {
  let explanation = "Phân tích: "
  const pairs = []
  
  // Phân tích dãy số từng cặp từ trái qua phải
  for (let i = 0; i < phone.length - 1; i++) {
    const pair = phone.substr(i, 2)
    let starType = ""
    
    // Xác định loại sao
    if (starNumbers.SINH_KHI.includes(pair)) {
      starType = "Sinh Khí"
    } else if (starNumbers.THIEN_Y.includes(pair)) {
      starType = "Thiên Y"
    } else if (starNumbers.DIEN_NIEN.includes(pair)) {
      starType = "Diên Niên"
    } else if (starNumbers.NGU_QUY.includes(pair)) {
      starType = "Ngũ Quỷ"
    } else if (starNumbers.TUYET_MENH.includes(pair)) {
      starType = "Tuyệt Mệnh"
    } else if (starNumbers.PHUC_VI.includes(pair)) {
      starType = "Phục Vị"
    } else if (starNumbers.LUC_SAT.includes(pair)) {
      starType = "Lục Sát"
    } else if (starNumbers.HOA_HAI.includes(pair)) {
      starType = "Họa Hại"
    } else {
      continue
    }
    
    pairs.push(`${pair}(${starType})`)
  }
  
  if (pairs.length > 0) {
    explanation += pairs.join(" + ")
  } else {
    explanation = "Số điện thoại phong thủy theo mục tiêu đã chọn"
  }
  
  // Kiểm tra hung tinh
  let hasNegativeStar = false;
  let negativeStarType = "";
  
  for (const pair of pairs) {
    if (pair.includes("Ngũ Quỷ") || pair.includes("Tuyệt Mệnh")) {
      hasNegativeStar = true;
      negativeStarType = pair.includes("Ngũ Quỷ") ? "Ngũ Quỷ" : "Tuyệt Mệnh";
      break;
    } else if (pair.includes("Lục Sát")) {
      hasNegativeStar = true;
      negativeStarType = "Lục Sát";
      break;
    } else if (pair.includes("Họa Hại")) {
      hasNegativeStar = true;
      negativeStarType = "Họa Hại";
      break;
    }
  }
  
  if (includeNegativeStar.value) {
    if (hasNegativeStar) {
      let explanation_add = " - Có hung tinh cân bằng âm dương";
      
      if (negativeStarType === "Lục Sát") {
        explanation_add += " (Lục Sát tăng cường năng lượng nữ tính)";
      } else if (negativeStarType === "Họa Hại") {
        explanation_add += " (Họa Hại tăng cường khả năng giao tiếp)";
      }
      
      explanation += explanation_add;
    } else {
      explanation += " - Chưa có hung tinh để cân bằng";
    }
  }
  
  // Kiểm tra số cuối cùng
  const lastDigit = phone.slice(-1)
  if (lastDigit === '0') {
    explanation += " - Lưu ý: Kết thúc bằng số 0 (không tốt)"
  }
  
  // Kiểm tra nếu số cuối là 5, kiểm tra cặp số trước
  if (lastDigit === '5') {
    const secondLastDigit = phone.slice(-2, -1)
    const prePair = phone.slice(-3, -1)
    let isAuspiciousPair = false
    
    for (const key of ['SINH_KHI', 'THIEN_Y', 'DIEN_NIEN', 'PHUC_VI']) {
      if (starNumbers[key].some(pair => pair.startsWith(secondLastDigit))) {
        isAuspiciousPair = true
        break
      }
    }
    
    if (!isAuspiciousPair) {
      explanation += " - Lưu ý: Số 5 ở cuối nhưng cặp số trước không phải cát tinh (không tốt)"
    } else {
      explanation += " - Số 5 ở cuối với cặp số trước là cát tinh (rất tốt)"
    }
  }
  
  // Kiểm tra nếu cặp cuối là hung tinh
  const lastPair = phone.slice(-2)
  if (isNegativeStar(lastPair)) {
    explanation += " - Lưu ý: Kết thúc bằng hung tinh (không tốt)"
  }
  
  // Kiểm tra nếu có 2 hung tinh liền kề
  let hasConsecutiveNegativeStars = false
  for (let i = 0; i < pairs.length - 1; i++) {
    const currentStarIsNegative = pairs[i].includes("Ngũ Quỷ") || pairs[i].includes("Tuyệt Mệnh") || 
                                  pairs[i].includes("Lục Sát") || pairs[i].includes("Họa Hại");
    
    const nextStarIsNegative = pairs[i+1].includes("Ngũ Quỷ") || pairs[i+1].includes("Tuyệt Mệnh") || 
                              pairs[i+1].includes("Lục Sát") || pairs[i+1].includes("Họa Hại");
    
    if (currentStarIsNegative && nextStarIsNegative) {
      hasConsecutiveNegativeStars = true;
      break;
    }
  }
  
  if (hasConsecutiveNegativeStars) {
    explanation += " - Lưu ý: Có hai hung tinh liền kề (không tốt)"
  }
  
  return explanation
}

const isNegativeStar = (pair) => {
  return starNumbers.NGU_QUY.includes(pair) || 
         starNumbers.TUYET_MENH.includes(pair) || 
         starNumbers.LUC_SAT.includes(pair) || 
         starNumbers.HOA_HAI.includes(pair);
}

const isValidLastDigit = (digit) => {
  // Số cuối không phải là 0
  return digit !== '0';
}

const isValidWithLastDigit5 = (secondLastDigit) => {
  // Nếu số cuối là 5, kiểm tra số kề trước có tạo thành cát tinh không
  for (const key of ['SINH_KHI', 'THIEN_Y', 'DIEN_NIEN', 'PHUC_VI']) {
    if (starNumbers[key].some(pair => pair.startsWith(secondLastDigit))) {
      return true;
    }
  }
  return false;
}

const generatePhoneNumbers = () => {
  if (!selectedPurpose.value || !selectedProvider.value) return
  
  const combinations = fengShuiData[selectedPurpose.value].combinations
  const luckyNumbers = fengShuiData[selectedPurpose.value].luckyNumbers
  
  suggestedPhoneNumbers.value = []
  phoneExplanations.value = []
  
  for (let i = 0; i < 4; i++) {
    let phone = '';
    let validPhone = false;
    let negativePairAdded = false;
    let attemptCount = 0;
    const maxAttempts = 100; // Giới hạn số lần thử để tránh vòng lặp vô hạn
    
    while (!validPhone && attemptCount < maxAttempts) {
      attemptCount++;
      
      // Đầu số
      phone = selectedProvider.value;
      negativePairAdded = false;
      
      // Thêm 7 chữ số tiếp theo
      let previousDigit = phone.charAt(phone.length - 1);
      
      // Tạo đủ 7 chữ số còn lại
      let isComplete = true;
      
      for (let j = 0; j < 7; j++) {
        // Chữ số cuối cùng cần kiểm tra đặc biệt
        if (j === 6) {
          let validLastDigits = luckyNumbers.filter(num => {
            // Kiểm tra số cuối không phải là 0
            if (num === '0') return false;
            
            // Kiểm tra nếu số cuối là 5 thì cặp số trước phải là cát tinh
            if (num === '5') {
              return isValidWithLastDigit5(previousDigit);
            }
            
            // Kiểm tra cặp cuối không phải là hung tinh
            const potentialPair = previousDigit + num;
            return !isNegativeStar(potentialPair);
          });
          
          if (validLastDigits.length > 0) {
            const randomIndex = Math.floor(Math.random() * validLastDigits.length);
            const safeNumber = validLastDigits[randomIndex];
            phone += safeNumber;
            previousDigit = safeNumber;
          } else {
            // Nếu không tìm được số hợp lệ, đánh dấu lần thử này không thành công
            isComplete = false;
            break;
          }
        } else {
          // Nếu bật tùy chọn thêm hung tinh và chưa thêm
          if (includeNegativeStar.value && !negativePairAdded && j >= 1 && j <= 4) {
            // Xác suất 30% để thêm hung tinh tại vị trí này (giảm từ 40% xuống 30%)
            if (Math.random() < 0.3) {
              // Kiểm tra để đảm bảo không có 2 hung tinh liền kề
              let canAddNegativeStar = true;
              
              // Kiểm tra xem chữ số trước có tạo thành hung tinh với chữ số tiếp theo không
              for (const key of ['NGU_QUY', 'TUYET_MENH', 'LUC_SAT', 'HOA_HAI']) {
                if (starNumbers[key].some(pair => pair.endsWith(previousDigit))) {
                  canAddNegativeStar = false;
                  break;
                }
              }
              
              if (canAddNegativeStar) {
                // Tìm một hung tinh phù hợp bắt đầu bằng previousDigit
                const negativePair = getNegativeStarForBalance(previousDigit);
                
                if (negativePair) {
                  // Thêm chữ số tiếp theo từ hung tinh
                  const nextDigit = negativePair.charAt(1);
                  phone += nextDigit;
                  previousDigit = nextDigit;
                  negativePairAdded = true;
                  continue;
                }
              }
            }
          }
          
          // Với các chữ số không phải cuối cùng
          // Kiểm tra không có hai hung tinh liền kề
          const availableNumbers = luckyNumbers.filter(num => {
            const potentialPair = previousDigit + num;
            return !isNegativeStar(potentialPair);
          });
          
          if (availableNumbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            const safeNumber = availableNumbers[randomIndex];
            phone += safeNumber;
            previousDigit = safeNumber;
          } else {
            // Nếu không tìm được số an toàn, dùng số ngẫu nhiên từ mảng may mắn
            const randomLuckyNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)];
            phone += randomLuckyNumber;
            previousDigit = randomLuckyNumber;
          }
        }
      }
      
      // Nếu không tạo đủ các chữ số, thử lại
      if (!isComplete) continue;
      
      // Kiểm tra độ dài đủ 10 số và không có hung tinh ở cuối
      if (phone.length === 10) {
        // Kiểm tra cuối cùng không có hung tinh và không phải số 0
        const lastDigit = phone.slice(-1);
        const lastPair = phone.slice(-2);
        
        if (isValidLastDigit(lastDigit) && !isNegativeStar(lastPair)) {
          // Nếu số cuối là 5, kiểm tra thêm cặp số trước
          if (lastDigit === '5') {
            const secondLastDigit = phone.slice(-2, -1);
            if (isValidWithLastDigit5(secondLastDigit)) {
              // Nếu yêu cầu có hung tinh nhưng chưa thêm được
              if (includeNegativeStar.value && !negativePairAdded) {
                // Nếu đã thử nhiều lần, bỏ qua yêu cầu hung tinh để tránh vòng lặp vô hạn
                if (attemptCount > maxAttempts / 2) {
                  validPhone = true;
                } else {
                  continue;
                }
              } else {
                validPhone = true;
              }
            }
          } else {
            // Nếu yêu cầu có hung tinh nhưng chưa thêm được
            if (includeNegativeStar.value && !negativePairAdded) {
              // Nếu đã thử nhiều lần, bỏ qua yêu cầu hung tinh để tránh vòng lặp vô hạn
              if (attemptCount > maxAttempts / 2) {
                validPhone = true;
              } else {
                continue;
              }
            } else {
              validPhone = true;
            }
          }
        }
      }
    }
    
    // Nếu không tìm được số hợp lệ sau số lần thử tối đa
    if (!validPhone) {
      // Tạo một số bất kỳ phù hợp, không quan tâm đến điều kiện hung tinh
      phone = selectedProvider.value;
      for (let j = 0; j < 7; j++) {
        const randomIndex = Math.floor(Math.random() * luckyNumbers.length);
        phone += luckyNumbers[randomIndex];
      }
    }
    
    // Định dạng số điện thoại thành dạng xxxx xxx xxx
    const formattedPhone = `${phone.substring(0, 4)} ${phone.substring(4, 7)} ${phone.substring(7, 10)}`;
    
    suggestedPhoneNumbers.value.push(formattedPhone);
    phoneExplanations.value.push(generatePhoneExplanation(phone));
  }
}

const copyToClipboard = (text) => {
  // Xóa dấu cách khi sao chép
  const cleanText = text.replace(/\s/g, '');
  
  // Tạo một text area tạm thời
  const textArea = document.createElement('textarea');
  textArea.value = cleanText;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  
  // Chọn và sao chép
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('Đã sao chép: ' + cleanText);
    } else {
      alert('Không thể sao chép số điện thoại');
    }
  } catch (err) {
    console.error('Lỗi khi sao chép: ', err);
    alert('Không thể sao chép: ' + err);
  }
  
  // Xóa text area
  document.body.removeChild(textArea);
}

// Theo dõi thay đổi và tạo gợi ý mới
watch([selectedPurpose, selectedProvider, includeNegativeStar], () => {
  if (selectedPurpose.value && selectedProvider.value) {
    generatePhoneNumbers()
  }
})

// Xử lý sự kiện điều hướng từ Header
const handleNavigate = (path) => {
  router.push(path)
}
</script>

<style scoped>
:root {
  --primary-color: #4361ee;
  --primary-light: #e7ecfd;
  --primary-dark: #3a50d8;
}

.text-primary { color: var(--primary-color); }
.bg-primary { background-color: var(--primary-color); }
.border-primary { border-color: var(--primary-color); }
.bg-primary-light { background-color: var(--primary-light); }
.bg-primary-dark { background-color: var(--primary-dark); }
.hover\:border-primary:hover { border-color: var(--primary-color); }
.hover\:bg-primary-dark:hover { background-color: var(--primary-dark); }

/* Tailwind CSS không tự động nhận biết CSS variables, nên chúng ta cần thêm một số class tùy chỉnh */
.bg-primary-color {
  background-color: var(--primary-color, #4361ee);
}

.bg-primary-dark {
  background-color: var(--primary-dark, #3a56d4);
}

.bg-primary-light {
  background-color: var(--primary-light, #e7ecfd);
}

.text-primary-color {
  color: var(--primary-color, #4361ee);
}
</style>