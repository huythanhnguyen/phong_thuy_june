<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <main class="flex-grow container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">Chọn Số Tài Khoản Ngân Hàng Hợp Phong Thủy</h1>
        
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p class="text-lg text-gray-700 mb-6">
            Số tài khoản ngân hàng không chỉ là một dãy số thông thường mà còn có thể ảnh hưởng đến năng lượng tài chính của bạn theo quan điểm phong thủy.
          </p>
          
          <div class="border-l-4 border-primary p-4 bg-primary-light mb-8">
            <h3 class="font-bold text-lg mb-2">Lưu ý quan trọng</h3>
            <p>Hiện nay một số ngân hàng cho phép khách hàng chọn số tài khoản. Việc chọn một số tài khoản hợp lý sẽ giúp giữ tiền hoặc tiêu dùng thông minh hơn.</p>
          </div>
          
          <div class="border-l-4 border-yellow-500 p-4 bg-yellow-50 mb-8">
            <h3 class="font-bold text-lg text-yellow-700 mb-2">Các nguyên tắc chọn số tài khoản</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Phương pháp phân tích:</strong> Dãy số được phân tích từng cặp từ trái qua phải, đặc biệt quan trọng là cặp số cuối</li>
              <li><strong>Trọng điểm:</strong> 2-4 số cuối của mã tài khoản có ảnh hưởng lớn đến năng lượng tài chính</li>
              <li><strong>Diên Niên</strong> (19, 91, 34, 43) thích hợp cho tiết kiệm, giữ tiền lâu dài</li>
              <li><strong>Thiên Y</strong> (13, 31) mang đến may mắn về tài lộc, kiếm tiền</li>
              <li><strong>Sinh Khí</strong> (14, 41, 39, 93) hỗ trợ cho sức khỏe tài chính</li>
              <li><strong>Tuyệt đối tránh:</strong> Số 0 ở cuối dãy số hoặc các hung tinh (Ngũ Quỷ, Tuyệt Mệnh) ở cuối</li>
            </ul>
          </div>
        </div>

        <!-- Phần chọn mục đích -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Mục đích sử dụng tài khoản</h2>
          <p class="mb-4">Chọn mục đích sử dụng tài khoản để nhận gợi ý số phù hợp</p>
          
          <div class="grid md:grid-cols-3 gap-4 mb-6">
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

        <!-- Phần độ dài số tài khoản -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Độ dài số tài khoản</h2>
          <p class="mb-4">Chọn độ dài mong muốn cho số tài khoản của bạn</p>
          
          <div class="flex items-center mb-6">
            <button 
              @click="decrementLength" 
              class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
              :disabled="accountLength <= 6"
            >
              <span class="text-xl">-</span>
            </button>
            
            <div class="mx-4 px-6 py-2 border rounded-lg text-center min-w-[80px]">
              {{ accountLength }}
            </div>
            
            <button 
              @click="incrementLength" 
              class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
              :disabled="accountLength >= 12"
            >
              <span class="text-xl">+</span>
            </button>
          </div>
        </div>

        <!-- Phần gợi ý số tài khoản -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Số tài khoản gợi ý</h2>
          
          <div v-if="!selectedPurpose" class="text-center py-6 text-gray-500">
            Vui lòng chọn mục đích sử dụng để nhận gợi ý
          </div>
          
          <div v-else>
            <div class="mb-6">
              <p class="mb-2">Cặp sao tương ứng: <span class="font-semibold">{{ getStars() }}</span></p>
              <p class="mt-2 text-gray-600 text-sm">{{ getPurposeDescription() }}</p>
              <div class="mt-4 border-l-4 border-primary p-4 bg-primary-light">
                <h4 class="font-bold mb-2">Hướng dẫn cặp số cuối</h4>
                <p class="text-sm" v-if="selectedPurpose === 'saving'">
                  Dùng <strong>Diên Niên</strong> (19, 91, 34, 43) ở cuối tài khoản tiết kiệm giúp thu hút tiền bạc, giữ tiền tốt.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'investment'">
                  Kết hợp <strong>Tuyệt Mệnh + Thiên Y</strong> (21 + 13) giúp thức tỉnh nỗ lực phấn đấu, hiểu được tính toán, kế hoạch dùng tiền.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'spending'">
                  Mã số tài khoản có cặp số cuối thuộc <strong>Thiên Y</strong> (13, 31, 68, 86) sẽ giúp thu hút tài lộc và tiêu dùng thông minh.
                </p>
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div v-for="(account, index) in suggestedAccounts" :key="index" 
                class="border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow">
                <div class="text-xl font-mono mb-2 text-center">{{ account }}</div>
                <div class="text-xs text-gray-500 text-center mb-2">{{ accountExplanations[index] }}</div>
                <button 
                  @click="copyToClipboard(account)" 
                  class="absolute top-2 right-2 text-gray-500 hover:text-primary"
                  title="Sao chép"
                >
                  <span>📋</span>
                </button>
              </div>
            </div>
            
            <div class="text-center">
              <button 
                @click="generateAccounts" 
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
const selectedPurpose = ref('')
const accountLength = ref(10)
const suggestedAccounts = ref([])
const accountExplanations = ref([])

// Danh sách mục đích
const purposes = [
  { value: 'saving', label: 'Tiết kiệm' },
  { value: 'investment', label: 'Đầu tư' },
  { value: 'spending', label: 'Tiêu dùng' }
]

// Dữ liệu phong thủy
const fengShuiData = {
  saving: {
    stars: 'Diên Niên',
    luckyNumbers: ['1', '3', '9', '4'], 
    combinations: ['19', '91', '34', '43', '78', '87'],
    description: 'Số tài khoản Diên Niên thử tài hào, hiểu được tính toán, kế hoạch dùng tiền. Tiết kiệm tiền!'
  },
  investment: {
    stars: 'Tuyệt Mệnh + Thiên Y',
    luckyNumbers: ['2', '1', '3'], 
    combinations: ['21', '12', '31', '13', '23', '32'],
    description: 'Mặt mã thẻ ngân hàng, số tài khoản, ứng lấy thử Tài là tốt. Đầu tư hiệu quả, sinh lời.'
  },
  spending: {
    stars: 'Thiên Y',
    luckyNumbers: ['1', '3', '9'], 
    combinations: ['13', '31', '68', '86', '49', '94'],
    description: 'Thiên Y thử Tài giúp tiêu dùng thông minh, chi tiêu hợp lý và thu hút tài lộc.'
  }
}

// Cặp số tương ứng với các sao
const starNumbers = {
  'SINH_KHI': ['14', '41', '67', '76', '39', '93', '28', '82'],
  'THIEN_Y': ['13', '31', '68', '86', '49', '94', '27', '72'],
  'DIEN_NIEN': ['19', '91', '78', '87', '34', '43', '26', '62'],
  'NGU_QUY': ['18', '81', '79', '97', '36', '63', '24', '42'],
  'TUYET_MENH': ['12', '21', '69', '96', '84', '48', '73', '37']
}

// Phương thức
const decrementLength = () => {
  if (accountLength.value > 6) {
    accountLength.value--
  }
}

const incrementLength = () => {
  if (accountLength.value < 12) {
    accountLength.value++
  }
}

const getStars = () => {
  return selectedPurpose.value ? fengShuiData[selectedPurpose.value].stars : ''
}

const getPurposeDescription = () => {
  return selectedPurpose.value ? fengShuiData[selectedPurpose.value].description : ''
}

const generateAccountExplanation = (account) => {
  let explanation = "Phân tích: "
  const pairs = []
  
  // Phân tích dãy số từng cặp từ trái qua phải
  for (let i = 0; i < account.length - 1; i++) {
    const pair = account.substr(i, 2)
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
    } else if (['11', '22', '33', '44', '66', '77', '88', '99'].includes(pair)) {
      starType = "Phục Vị"
    } else {
      continue
    }
    
    pairs.push(`${pair}(${starType})`)
  }
  
  if (pairs.length > 0) {
    explanation += pairs.join(" + ")
  } else {
    explanation = "Số tài khoản phong thủy theo mục đích đã chọn"
  }
  
  // Kiểm tra số cuối cùng
  const lastPair = account.slice(-2)
  if (lastPair.includes('0')) {
    explanation += " - Lưu ý: Có số 0 ở cuối (không tốt)"
  }
  
  // Kiểm tra nếu cặp cuối là hung tinh
  if (starNumbers.NGU_QUY.includes(lastPair) || starNumbers.TUYET_MENH.includes(lastPair)) {
    explanation += " - Lưu ý: Kết thúc bằng hung tinh (không tốt)"
  }
  
  // Kiểm tra nếu có 2 hung tinh liền kề
  let hasConsecutiveNegativeStars = false
  for (let i = 0; i < pairs.length - 1; i++) {
    const currentStarType = pairs[i].includes("Ngũ Quỷ") || pairs[i].includes("Tuyệt Mệnh")
    const nextStarType = pairs[i+1].includes("Ngũ Quỷ") || pairs[i+1].includes("Tuyệt Mệnh")
    
    if (currentStarType && nextStarType) {
      hasConsecutiveNegativeStars = true
      break
    }
  }
  
  if (hasConsecutiveNegativeStars) {
    explanation += " - Lưu ý: Có hai hung tinh liền kề (không tốt)"
  }
  
  return explanation
}

const isNegativeStar = (pair) => {
  return starNumbers.NGU_QUY.includes(pair) || starNumbers.TUYET_MENH.includes(pair);
}

const generateAccounts = () => {
  if (!selectedPurpose.value) return
  
  const combinations = fengShuiData[selectedPurpose.value].combinations
  const luckyNumbers = fengShuiData[selectedPurpose.value].luckyNumbers
  
  suggestedAccounts.value = []
  accountExplanations.value = []
  
  for (let i = 0; i < 4; i++) {
    let account = '';
    let validAccount = false;
    
    // Thử tạo tài khoản cho đến khi có một tài khoản hợp lệ
    while (!validAccount) {
      // Chọn ngẫu nhiên một trong các chuỗi gốc cho phần cuối
      const endingPair = combinations[Math.floor(Math.random() * combinations.length)]
      
      // Số tài khoản ngân hàng thường có định dạng cố định, tạo phần prefix
      let prefix = '';
      let previousDigit = '';
      let currentPair = '';
      
      for (let j = 0; j < accountLength.value - 2; j++) {
        // Nếu đã có ít nhất một chữ số, kiểm tra xem có thể tạo thành cặp hung tinh không
        if (j > 0) {
          const availableNumbers = luckyNumbers.filter(num => {
            const potentialPair = previousDigit + num;
            return !isNegativeStar(potentialPair);
          });
          
          if (availableNumbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            const safeNumber = availableNumbers[randomIndex];
            prefix += safeNumber;
            previousDigit = safeNumber;
          } else {
            // Nếu không có số an toàn, sử dụng một số ngẫu nhiên từ danh sách gốc
            const randomLuckyNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)];
            prefix += randomLuckyNumber;
            previousDigit = randomLuckyNumber;
          }
        } else {
          // Số đầu tiên có thể là bất kỳ số may mắn nào
          const randomLuckyNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)];
          prefix += randomLuckyNumber;
          previousDigit = randomLuckyNumber;
        }
      }
      
      // Kiểm tra xem chữ số cuối cùng của prefix và chữ số đầu tiên của endingPair có tạo thành cặp hung tinh không
      const lastDigitOfPrefix = prefix.charAt(prefix.length - 1);
      const firstDigitOfEnding = endingPair.charAt(0);
      const potentialPair = lastDigitOfPrefix + firstDigitOfEnding;
      
      if (!isNegativeStar(potentialPair)) {
        // Nếu không tạo thành hung tinh, tài khoản hợp lệ
        account = prefix + endingPair;
        
        // Kiểm tra thêm một lần nữa toàn bộ tài khoản để đảm bảo không có cặp hung tinh nào
        let hasNegativePair = false;
        for (let k = 0; k < account.length - 1; k++) {
          const pair = account.substr(k, 2);
          if (isNegativeStar(pair)) {
            hasNegativePair = true;
            break;
          }
        }
        
        if (!hasNegativePair) {
          validAccount = true;
        }
      }
    }
    
    suggestedAccounts.value.push(account)
    accountExplanations.value.push(generateAccountExplanation(account))
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Đã sao chép: ' + text)
    })
    .catch(err => {
      console.error('Lỗi khi sao chép: ', err)
    })
}

// Theo dõi thay đổi và tạo gợi ý mới
watch([selectedPurpose, accountLength], () => {
  if (selectedPurpose.value) {
    generateAccounts()
  }
})
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
</style>