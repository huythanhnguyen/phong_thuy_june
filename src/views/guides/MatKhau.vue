<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-grow container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center">Chọn Mật Khẩu Theo Phong Thủy</h1>
    
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <p class="text-lg text-gray-700 mb-6">
        Mật khẩu không chỉ là yếu tố bảo mật mà còn có thể mang lại may mắn và tài lộc nếu được chọn đúng theo nguyên lý phong thủy.
      </p>
      
          <div class="border-l-4 border-primary p-4 bg-primary-light mb-8">
            <h3 class="font-bold text-lg mb-2">Lưu ý quan trọng</h3>
            <p>Đây là bản demo chỉ tạo chuỗi số. Nếu bạn muốn thêm chữ cái hoặc ký tự đặc biệt, vui lòng đăng nhập để được tư vấn thêm.</p>
          </div>
          
          <div class="border-l-4 border-yellow-500 p-4 bg-yellow-50 mb-8">
            <h3 class="font-bold text-lg text-yellow-700 mb-2">Các nguyên tắc mật khẩu phong thủy</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Phương pháp phân tích:</strong> Dãy số được phân tích từng cặp từ trái qua phải, ví dụ: 918 = 91 + 18 = (Diên Niên + Ngũ Quỷ)</li>
              <li><strong>Trọng điểm tâm kinh:</strong> 2 số cuối cùng của mật khẩu đặc biệt quan trọng, nên là cặp sao tốt</li>
              <li>Dùng <strong>Diên Niên</strong> ở cuối dãy số cho hiệu năng lực, hiệu thử tài</li>
              <li>Dùng <strong>Thiên Y</strong> ở cuối dãy số cho hiệu kiếm tiền, hiệu tình cảm</li>
              <li>Dùng <strong>Sinh Khí</strong> ở cuối dãy số cho hiệu vui vẻ, hiệu bằng hữu</li>
              <li>Hoặc trước số thứ ba từ cuối thêm 5 (tiếp tục chỉnh năng lượng)</li>
              <li>Hoặc trước số thứ ba từ cuối thêm Phục Vị (tiếp tục chỉnh năng lượng)</li>
              <li><strong>Tuyệt đối tránh:</strong> Số 0 ở cuối dãy số (hợp thành sẽ biến không tượng)</li>
              <li><strong>Tuyệt đối tránh:</strong> Hung tinh ở cuối dãy số như Ngũ Quỷ, Tuyệt Mệnh (hợp thành sẽ chuyển biến xấu)</li>
              <li><strong>Tuyệt đối tránh:</strong> Hai hung tinh liền kề nhau (sẽ gây ra điềm xấu và rủi ro)</li>
            </ul>
          </div>
        </div>
        
        <!-- Phần chọn mục đích -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Mục đích sử dụng mật khẩu</h2>
          <p class="mb-4">Chọn mục đích sử dụng mật khẩu để nhận gợi ý phù hợp</p>
          
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
        
        <!-- Phần độ dài mật khẩu -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Độ dài mật khẩu</h2>
          <p class="mb-4">Chọn số lượng ký tự cho mật khẩu của bạn</p>
          
          <div class="flex items-center mb-6">
            <button 
              @click="decrementLength" 
              class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
              :disabled="passwordLength <= 4"
            >
              <span class="text-xl">-</span>
            </button>
            
            <div class="mx-4 px-6 py-2 border rounded-lg text-center min-w-[80px]">
              {{ passwordLength }}
            </div>
            
            <button 
              @click="incrementLength" 
              class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
              :disabled="passwordLength >= 12"
            >
              <span class="text-xl">+</span>
            </button>
          </div>
        </div>
        
        <!-- Phần gợi ý mật khẩu -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Mật khẩu gợi ý</h2>
          
          <div v-if="!selectedPurpose" class="text-center py-6 text-gray-500">
            Vui lòng chọn mục đích sử dụng để nhận gợi ý
          </div>
          
          <div v-else>
            <div class="mb-6">
              <p class="mb-2">Cặp sao tương ứng: <span class="font-semibold">{{ getStars() }}</span></p>
              <p class="mt-2 text-gray-600 text-sm">{{ getPurposeDescription() }}</p>
              <div class="mt-4 border-l-4 border-primary p-4 bg-primary-light">
                <h4 class="font-bold mb-2">Hướng dẫn cặp số cuối</h4>
                <p class="text-sm" v-if="selectedPurpose === 'wealth'">
                  Dùng <strong>Thiên Y</strong> (13, 31, 68, 86) ở cuối dãy số cho hiệu kiếm tiền.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'career'">
                  Dùng <strong>Diên Niên</strong> (19, 91, 34, 43) ở cuối dãy số cho hiệu năng lực, thử tài.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'health'">
                  Dùng <strong>Sinh Khí</strong> (39, 93, 14, 41) ở cuối dãy số cho hiệu sức khỏe, hoặc <strong>Thiên Y</strong> (13, 31) để cân bằng tinh thần.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'love'">
                  Tổ hợp <strong>Sinh Khí + Thiên Y</strong> hoặc <strong>Thiên Y + Thiên Y</strong> ở giữa hoặc cuối số đều mang đến hôn nhân và tình yêu.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'education'">
                  Dùng tổ hợp <strong>Sinh Khí + Diên Niên + Sinh Khí</strong> để tăng hiệu quả học tập, có quý nhân hỗ trợ.
                </p>
                <p class="text-sm" v-else-if="selectedPurpose === 'investment'">
                  Kết hợp <strong>Tuyệt Mệnh + Thiên Y</strong> (21, 31 hoặc 13) giúp tăng nỗ lực phấn đấu và có mạch suy nghĩ đầu tư tốt.
                </p>
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4 mb-6">
              <div v-for="(password, index) in suggestedPasswords" :key="index" 
                class="border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-shadow">
                <div class="text-xl font-mono mb-2 text-center">{{ password }}</div>
                <div class="text-xs text-gray-500 text-center mb-2">{{ passwordExplanations[index] }}</div>
                <button 
                  @click="copyToClipboard(password)" 
                  class="absolute top-2 right-2 text-gray-500 hover:text-primary"
                  title="Sao chép"
                >
                  <span>📋</span>
                </button>
              </div>
            </div>
            
            <div class="text-center">
              <button 
                @click="generatePasswords" 
                class="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors shadow-md"
              >
                Gợi ý mật khẩu khác
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
import { ref, computed, watch } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

// Trạng thái
const selectedPurpose = ref('')
const passwordLength = ref(6)
const suggestedPasswords = ref([])
const passwordExplanations = ref([])
const copyMessage = ref('')

// Danh sách mục đích
const purposes = [
  { value: 'wealth', label: 'Tài lộc' },
  { value: 'career', label: 'Sự nghiệp' },
  { value: 'health', label: 'Sức khỏe' },
  { value: 'love', label: 'Tình duyên' },
  { value: 'education', label: 'Học tập' },
  { value: 'investment', label: 'Đầu tư' }
]

// Dữ liệu phong thủy
const fengShuiData = {
  wealth: {
    stars: 'Thiên Y',
    luckyNumbers: ['1', '3', '9'], 
    combinations: ['13', '31', '39', '93', '18', '81', '19', '91'],
    description: 'Mật khẩu tài lộc giúp thu hút tiền bạc, mang tới vận may tài chính'
  },
  career: {
    stars: 'Diên Niên',
    luckyNumbers: ['1', '3', '9'], 
    combinations: ['91', '19', '31', '13', '93', '39'],
    description: 'Tăng cường năng lực chuyên nghiệp, hỗ trợ thăng tiến trong sự nghiệp'
  },
  health: {
    stars: 'Sinh Khí - Thiên Y',
    luckyNumbers: ['1', '3', '9'], 
    combinations: ['39', '93', '13', '31', '14', '41'],
    description: 'Giúp duy trì sức khỏe tốt, cân bằng tinh thần và thể chất'
  },
  love: {
    stars: 'Sinh Khí + Thiên Y, Thiên Y + Thiên Y',
    luckyNumbers: ['1', '3', '9'], 
    combinations: ['31', '13', '21', '12', '23', '32'],
    description: 'Tăng cường duyên phận, hỗ trợ tình cảm hòa hợp, ngọt ngào'
  },
  education: {
    stars: 'Sinh Khí + Diên Niên + Sinh Khí',
    luckyNumbers: ['1', '3', '9'], 
    combinations: ['81', '18', '36', '63', '38', '83'],
    description: 'Phát triển trí tuệ, tăng cường khả năng học tập và tư duy'
  },
  investment: {
    stars: 'Tuyệt Mệnh + Thiên Y',
    luckyNumbers: ['2', '1', '3'], 
    combinations: ['21', '12', '31', '13', '23', '32'],
    description: 'Hỗ trợ đưa ra quyết định đầu tư đúng đắn, giảm thiểu rủi ro'
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
  if (passwordLength.value > 4) {
    passwordLength.value--
  }
}

const incrementLength = () => {
  if (passwordLength.value < 12) {
    passwordLength.value++
  }
}

const getStars = () => {
  return selectedPurpose.value ? fengShuiData[selectedPurpose.value].stars : ''
}

const getPurposeDescription = () => {
  return selectedPurpose.value ? fengShuiData[selectedPurpose.value].description : ''
}

const generatePasswordExplanation = (password) => {
  let explanation = "Phân tích: "
  const pairs = []
  
  // Phân tích dãy số từng cặp từ trái qua phải
  for (let i = 0; i < password.length - 1; i++) {
    const pair = password.substr(i, 2)
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
    explanation = "Mật khẩu phong thủy theo mục đích đã chọn"
  }
  
  // Kiểm tra số cuối cùng
  const lastPair = password.slice(-2)
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

const generatePasswords = () => {
  if (!selectedPurpose.value) return
  
  const combinations = fengShuiData[selectedPurpose.value].combinations
  const luckyNumbers = fengShuiData[selectedPurpose.value].luckyNumbers
  
  suggestedPasswords.value = []
  passwordExplanations.value = []
  
  for (let i = 0; i < 4; i++) {
    // Chọn ngẫu nhiên một trong các chuỗi gốc
    const baseCombination = combinations[Math.floor(Math.random() * combinations.length)]
    let password = baseCombination
    
    // Kiểm tra xem chuỗi gốc có phải là hung tinh không
    const isNegativeStar = 
      starNumbers.NGU_QUY.includes(baseCombination) || 
      starNumbers.TUYET_MENH.includes(baseCombination)
    
    // Phương pháp tạo mật khẩu
    const method = Math.floor(Math.random() * 3)
    
    if (method === 0) {
      // Nếu chuỗi gốc là hung tinh, tiếp theo chỉ thêm cát tinh hoặc số ngẫu nhiên
      if (isNegativeStar) {
        // Chọn một cặp cát tinh để thêm vào
        const goodStarPairs = [...starNumbers.SINH_KHI, ...starNumbers.THIEN_Y, ...starNumbers.DIEN_NIEN]
        const nextPair = goodStarPairs[Math.floor(Math.random() * goodStarPairs.length)]
        password += nextPair.charAt(0)
      }
      
      // Thêm số ngẫu nhiên từ danh sách số may mắn đến khi đủ độ dài - 2
      while (password.length < passwordLength.value - 2) {
        // Kiểm tra xem số cuối hiện tại có thể tạo thành hung tinh với số tiếp theo không
        const lastDigit = password.charAt(password.length - 1)
        
        // Lọc ra các số may mắn không tạo thành hung tinh với số cuối
        const safeNumbers = luckyNumbers.filter(num => {
          const potentialPair = lastDigit + num
          return !(starNumbers.NGU_QUY.includes(potentialPair) || 
                 starNumbers.TUYET_MENH.includes(potentialPair))
        })
        
        // Nếu không có số an toàn, chọn số ngẫu nhiên từ danh sách gốc
        const numberPool = safeNumbers.length > 0 ? safeNumbers : luckyNumbers        
        const randomLuckyNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)]
        password += randomLuckyNumber
      }
      
      // Đảm bảo kết thúc bằng cặp số tốt (Sinh Khí hoặc Thiên Y hoặc Diên Niên)
      const goodEndingPairs = [...starNumbers.SINH_KHI, ...starNumbers.THIEN_Y, ...starNumbers.DIEN_NIEN]
      const endingPair = goodEndingPairs[Math.floor(Math.random() * goodEndingPairs.length)]
      
      // Kiểm tra xem số cuối cùng trước khi thêm cặp kết thúc có tạo thành hung tinh không
      const lastDigit = password.charAt(password.length - 1)
      const firstDigitOfEnding = endingPair.charAt(0)
      const potentialPair = lastDigit + firstDigitOfEnding
      
      if (starNumbers.NGU_QUY.includes(potentialPair) || starNumbers.TUYET_MENH.includes(potentialPair)) {
        // Nếu tạo thành hung tinh, chọn một cặp kết thúc khác hoặc thay đổi số cuối
        const safeEndingPairs = goodEndingPairs.filter(pair => 
          !starNumbers.NGU_QUY.includes(lastDigit + pair.charAt(0)) && 
          !starNumbers.TUYET_MENH.includes(lastDigit + pair.charAt(0))
        )
        
        if (safeEndingPairs.length > 0) {
          // Nếu có cặp an toàn, sử dụng cặp đó
          const safeEndingPair = safeEndingPairs[Math.floor(Math.random() * safeEndingPairs.length)]
          password += safeEndingPair
        } else {
          // Nếu không có cặp an toàn, thay đổi số cuối
          password = password.substring(0, password.length - 1) + '5' + endingPair
        }
      } else {
        password += endingPair
      }
    } else if (method === 1) {
      // Tương tự như trên, nếu chuỗi gốc là hung tinh, tiếp theo chỉ thêm cát tinh
      if (isNegativeStar) {
        const goodStarPairs = [...starNumbers.SINH_KHI, ...starNumbers.THIEN_Y, ...starNumbers.DIEN_NIEN]
        const nextPair = goodStarPairs[Math.floor(Math.random() * goodStarPairs.length)]
        password += nextPair.charAt(0)
      }
      
      // Thêm số 5 ở vị trí phù hợp
      while (password.length < passwordLength.value - 3) {
        // Tương tự, tránh tạo thành hung tinh liên tiếp
        const lastDigit = password.charAt(password.length - 1)
        const safeNumbers = luckyNumbers.filter(num => {
          const potentialPair = lastDigit + num
          return !(starNumbers.NGU_QUY.includes(potentialPair) || 
                 starNumbers.TUYET_MENH.includes(potentialPair))
        })
        
        const numberPool = safeNumbers.length > 0 ? safeNumbers : luckyNumbers
        const randomLuckyNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)]
        password += randomLuckyNumber
      }
      
      password += "5"
      
      // Đảm bảo kết thúc bằng cặp số tốt
      const goodEndingPairs = [...starNumbers.SINH_KHI, ...starNumbers.THIEN_Y, ...starNumbers.DIEN_NIEN]
      const endingPair = goodEndingPairs[Math.floor(Math.random() * goodEndingPairs.length)]
      
      // Kiểm tra số "5" có tạo thành hung tinh với số đầu tiên của cặp kết thúc không
      const potentialPair = "5" + endingPair.charAt(0)
      if (starNumbers.NGU_QUY.includes(potentialPair) || starNumbers.TUYET_MENH.includes(potentialPair)) {
        // Nếu tạo thành hung tinh, chọn cặp kết thúc khác
        const safeEndingPairs = goodEndingPairs.filter(pair => 
          !starNumbers.NGU_QUY.includes("5" + pair.charAt(0)) && 
          !starNumbers.TUYET_MENH.includes("5" + pair.charAt(0))
        )
        
        if (safeEndingPairs.length > 0) {
          const safeEndingPair = safeEndingPairs[Math.floor(Math.random() * safeEndingPairs.length)]
          password += safeEndingPair.charAt(0) + safeEndingPair.charAt(1)
        } else {
          // Nếu không có cặp an toàn, thay "5" bằng một số khác
          password = password.substring(0, password.length - 1) + "7" + endingPair.charAt(0) + endingPair.charAt(1)
        }
      } else {
        password += endingPair.charAt(0) + endingPair.charAt(1)
      }
    } else {
      // Tương tự, nếu chuỗi gốc là hung tinh, tiếp theo chỉ thêm cát tinh
      if (isNegativeStar) {
        const goodStarPairs = [...starNumbers.SINH_KHI, ...starNumbers.THIEN_Y, ...starNumbers.DIEN_NIEN]
        const nextPair = goodStarPairs[Math.floor(Math.random() * goodStarPairs.length)]
        password += nextPair.charAt(0)
      }
      
      // Thêm dãy Phục Vị 
      while (password.length < passwordLength.value - 4) {
        // Tương tự, tránh tạo thành hung tinh liên tiếp
        const lastDigit = password.charAt(password.length - 1)
        const safeNumbers = luckyNumbers.filter(num => {
          const potentialPair = lastDigit + num
          return !(starNumbers.NGU_QUY.includes(potentialPair) || 
                 starNumbers.TUYET_MENH.includes(potentialPair))
        })
        
        const numberPool = safeNumbers.length > 0 ? safeNumbers : luckyNumbers
        const randomLuckyNumber = luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)]
        password += randomLuckyNumber
      }
      
      const phucViSet = ['11', '22', '88', '99']
      const phucVi = phucViSet[Math.floor(Math.random() * phucViSet.length)]
      
      // Kiểm tra số cuối có tạo thành hung tinh với Phục Vị không
      const lastDigit = password.charAt(password.length - 1)
      const firstDigitOfPhucVi = phucVi.charAt(0)
      const potentialPair = lastDigit + firstDigitOfPhucVi
      
      if (starNumbers.NGU_QUY.includes(potentialPair) || starNumbers.TUYET_MENH.includes(potentialPair)) {
        // Nếu tạo thành hung tinh, chọn một Phục Vị khác
        const safePhucVi = phucViSet.filter(pv => 
          !starNumbers.NGU_QUY.includes(lastDigit + pv.charAt(0)) && 
          !starNumbers.TUYET_MENH.includes(lastDigit + pv.charAt(0))
        )
        
        if (safePhucVi.length > 0) {
          password += safePhucVi[Math.floor(Math.random() * safePhucVi.length)]
        } else {
          // Nếu không có Phục Vị an toàn, thay đổi số cuối
          password = password.substring(0, password.length - 1) + '5' + phucVi
        }
      } else {
        password += phucVi
      }
      
      // Đảm bảo kết thúc bằng cặp số tốt
      const goodEndingPairs = [...starNumbers.SINH_KHI, ...starNumbers.THIEN_Y, ...starNumbers.DIEN_NIEN]
      const endingPair = goodEndingPairs[Math.floor(Math.random() * goodEndingPairs.length)]
      
      // Kiểm tra số cuối của Phục Vị có tạo thành hung tinh với cặp kết thúc không
      const lastDigitOfPhucVi = password.charAt(password.length - 1)
      const firstDigitOfEnding = endingPair.charAt(0)
      const potentialPairWithEnding = lastDigitOfPhucVi + firstDigitOfEnding
      
      if (starNumbers.NGU_QUY.includes(potentialPairWithEnding) || 
          starNumbers.TUYET_MENH.includes(potentialPairWithEnding)) {
        // Nếu tạo thành hung tinh, chọn cặp kết thúc khác
        const safeEndingPairs = goodEndingPairs.filter(pair => 
          !starNumbers.NGU_QUY.includes(lastDigitOfPhucVi + pair.charAt(0)) && 
          !starNumbers.TUYET_MENH.includes(lastDigitOfPhucVi + pair.charAt(0))
        )
        
        if (safeEndingPairs.length > 0) {
          password += safeEndingPairs[Math.floor(Math.random() * safeEndingPairs.length)]
        } else {
          // Nếu không có cặp an toàn, thêm một số đệm
          password += '9' + endingPair
        }
      } else {
        password += endingPair
      }
    }
    
    // Cắt bớt nếu dài hơn yêu cầu, nhưng giữ nguyên 2 số cuối
    if (password.length > passwordLength.value) {
      const endingPair = password.slice(-2)
      password = password.substring(0, passwordLength.value - 2) + endingPair
    }
    
    suggestedPasswords.value.push(password)
    passwordExplanations.value.push(generatePasswordExplanation(password))
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

// Theo dõi thay đổi và tạo mật khẩu mới
watch([selectedPurpose, passwordLength], () => {
  if (selectedPurpose.value) {
    generatePasswords()
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