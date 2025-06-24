<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sử dụng component Header -->
    <Header />

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-light to-blue-50 py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Giải Mã Vận Mệnh Qua Bát Cực Linh Số
            </h1>
            <p class="text-lg text-gray-700 mb-6">
              Phương pháp kết hợp Kinh Dịch và Số Học giúp hiểu ý nghĩa của các con số trong cuộc sống. 
              Áp dụng cho số điện thoại, CCCD, số nhà, biển số xe, tài khoản ngân hàng...
            </p>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button @click="navigateTo('register')" class="btn-primary py-3 px-6 text-center">
                Đăng ký ngay
              </button>
              <router-link to="/universal-analysis" class="btn-outline py-3 px-6 text-center">
                Phân Tích Tổng Hợp
              </router-link>
            </div>
          </div>
          <div class="lg:w-1/2">
            <img src="/img/numbers-illustration.svg" alt="Phong thủy số" class="w-full max-w-md mx-auto object-contain" 
            onerror="this.onerror=null; this.src='https://via.placeholder.com/500x400?text=Phong+Thuy+So'"/>
      </div>
        </div>
      </div>
    </section>

    <section class="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-6">Bát Cực Linh Số là gì?</h2>
    <p class="text-center text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
      Trong thời đại số, con số ảnh hưởng sâu sắc đến cuộc sống hàng ngày
    </p>
    
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-bold mb-3 text-primary">Con Số Trong Cuộc Sống</h3>
        <p class="text-gray-700 mb-3">
          Số và người hấp dẫn nhau. Người có từ trường nào sẽ hấp dẫn dãy số tương ứng và ngược lại.
        </p>
        <div class="bg-blue-50 p-3 rounded-lg">
          <p class="italic text-gray-600">
            "Năng Lượng Số Học là môn học giải thích năng lượng từ trường trong cuộc sống nhân sinh."
          </p>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-xl font-bold mb-3 text-primary">Minh Chứng Thực Tế</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <div class="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
              <font-awesome-icon icon="check" class="text-green-600 text-xs" />
            </div>
            <div class="ml-2">
              <p class="text-gray-700">
                <span class="font-semibold">Thành công tài chính:</span> Nhiều người thành công nhờ dãy số vượng Tài, vượng Quan.
              </p>
            </div>
          </li>
          <li class="flex items-start">
            <div class="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
              <font-awesome-icon icon="check" class="text-green-600 text-xs" />
            </div>
            <div class="ml-2">
              <p class="text-gray-700">
                <span class="font-semibold">Cải thiện quan hệ:</span> Dãy số thúc đào hoa, lợi hôn nhân giúp tìm được hạnh phúc.
              </p>
            </div>
          </li>
          <li class="flex items-start">
            <div class="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
              <font-awesome-icon icon="check" class="text-green-600 text-xs" />
            </div>
            <div class="ml-2">
              <p class="text-gray-700">
                <span class="font-semibold">Tránh tai ương:</span> Hiểu ý nghĩa số điện thoại, biển số xe để tránh ảnh hưởng xấu.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</section>

    <!-- Features Grid - Cập nhật -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Ứng Dụng Trong Cuộc Sống</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link to="/guides/chon-so-dien-thoai" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="mobile-alt" />
            </div>
            <h3 class="feature-title">Số Điện Thoại</h3>
            <p class="feature-description">Phân tích từng cặp số để tìm ra sự cân bằng giữa các sao tốt xấu, giúp thu hút tài lộc, quý nhân và cơ hội nghề nghiệp.</p>
          </router-link>
          <router-link to="/guides/can-cuoc-cong-dan" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="id-card" />
            </div>
            <h3 class="feature-title">Căn Cước Công Dân</h3>
            <p class="feature-description">Khám phá mã số định danh của bạn có ảnh hưởng gì đến vận mệnh, sự nghiệp và đường đời từ góc nhìn số học.</p>
          </router-link>
          <router-link to="/guides/mat-khau" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="key" />
            </div>
            <h3 class="feature-title">Mật Khẩu</h3>
            <p class="feature-description">Tạo mật khẩu vừa bảo mật vừa mang lại may mắn theo nguyên lý phong thủy số học. 
              Áp dụng cho tài khoản ngân hàng, email, mạng xã hội.</p>
          </router-link>
          <router-link to="/guides/chon-so-ngan-hang" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="credit-card" />
            </div>
            <h3 class="feature-title">Số Tài Khoản</h3>
            <p class="feature-description">Lựa chọn số tài khoản ngân hàng phù hợp để thu hút tài lộc, thịnh vượng và thuận lợi trong giao dịch tài chính.</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Những Điều Bạn Nên Biết Section - MỚI -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Những Điều Bạn Nên Biết</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-primary-light p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4 text-primary">Các cặp số quan trọng</h3>
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="bg-white p-3 rounded shadow-sm">
                <span class="font-bold text-green-600 block">Thiên Y (Cát): </span>
                <span class="text-sm text-gray-600">13, 31, 68, 86, 49, 94, 27, 72</span>
              </div>
              <div class="bg-white p-3 rounded shadow-sm">
                <span class="font-bold text-green-600 block">Sinh Khí (Cát): </span>
                <span class="text-sm text-gray-600">14, 41, 67, 76, 39, 93, 28, 82</span>
              </div>
              <div class="bg-white p-3 rounded shadow-sm">
                <span class="font-bold text-red-600 block">Tuyệt Mệnh (Hung): </span>
                <span class="text-sm text-gray-600">12, 21, 69, 96, 48, 84, 37, 73</span>
              </div>
              <div class="bg-white p-3 rounded shadow-sm">
                <span class="font-bold text-red-600 block">Ngũ Quỷ (Hung): </span>
                <span class="text-sm text-gray-600">18, 81, 79, 97, 36, 63, 24, 42</span>
              </div>
            </div>
            <p class="text-sm text-gray-700">
              * Đây chỉ là một phần trong hệ thống 8 sao (Tứ Cát Tứ Hung)
            </p>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">Cách Phân Tích Dãy Số</h3>
            <ol class="list-decimal pl-6 space-y-3">
              <li class="text-gray-700">
                <span class="font-semibold">Chia dãy số thành các cặp liền kề</span>
                <p class="text-sm text-gray-600">Ví dụ: 0912345678 → 09, 91, 12, 23, 34, 45, 56, 67, 78</p>
              </li>
              <li class="text-gray-700">
                <span class="font-semibold">Xác định mỗi cặp thuộc loại sao nào</span>
                <p class="text-sm text-gray-600">Dựa vào bảng đối chiếu 64 cặp số với 8 loại sao</p>
              </li>
              <li class="text-gray-700">
                <span class="font-semibold">Đánh giá tỷ lệ cát/hung</span>
                <p class="text-sm text-gray-600">Tốt nhất là cân bằng (50/50) hoặc thiên về cát</p>
              </li>
              <li class="text-gray-700">
                <span class="font-semibold">Xem xét vị trí trong dãy số</span>
                <p class="text-sm text-gray-600">3 số cuối quan trọng nhất, ảnh hưởng trực tiếp đến hiện tại</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

<!-- Demo Chat Section -->
<section id="demo-chat" class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-4">Phân Tích Tổng Hợp</h2>
    <p class="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
      Trải nghiệm công cụ phân tích đa dạng - từ số điện thoại, CCCD đến ngày sinh và mật khẩu số!
    </p>
    
    <div class="text-center mb-10">
      <router-link to="/universal-analysis" class="btn-primary inline-block py-3 px-8 text-lg font-semibold">
        Khám Phá Ngay →
      </router-link>
    </div>
    
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Chat Messages -->
        <div class="h-80 overflow-y-auto p-4 bg-gray-50" ref="chatContainer">
          <div class="mb-4 max-w-[80%] rounded-lg p-3 bg-white shadow-sm ml-0 mr-auto">
            Xin chào! Tôi là trợ lý phân tích Bát Cục Linh Số. Bạn có thể nhập số điện thoại để phân tích ngay.
          </div>
          
          <div v-for="(message, index) in chatMessages" :key="index" 
            :class="['mb-4 max-w-[80%] rounded-lg p-3', 
              message.isUser ? 'bg-primary-light mr-0 ml-auto' : 'bg-white shadow-sm ml-0 mr-auto'
            ]">
            <div v-if="message.isUser">{{ message.content }}</div>
            <div v-else v-html="message.content"></div>
          </div>
          
          <div v-if="isTyping" class="flex space-x-2 p-3 bg-white shadow-sm rounded-lg ml-0 mr-auto mb-4 w-16">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
          </div>
        </div>
        
        <!-- Chat Input -->
        <div class="border-t border-gray-200 p-4">
          <div class="flex">
            <input
              type="text"
              v-model="userInput"
              class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nhập số điện thoại để phân tích..."
              @keyup.enter="sendMessage"
              :disabled="isTyping || hasAnalyzed"
            />
            <button
              @click="sendMessage"
              class="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark"
              :disabled="!userInput.trim() || isTyping || hasAnalyzed"
            >
              <font-awesome-icon icon="paper-plane" />
            </button>
          </div>
          <p v-if="hasAnalyzed" class="text-xs text-red-500 mt-2">
            Bạn đã sử dụng lượt phân tích miễn phí. Vui lòng đăng nhập để tiếp tục!
          </p>
          <p v-else class="text-xs text-gray-500 mt-2">
            Nhập số điện thoại của bạn (VD: 0912345678) để nhận phân tích cơ bản.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- FAQ Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Câu hỏi thường gặp</h2>
        
        <div class="max-w-3xl mx-auto space-y-4">
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex justify-between items-center cursor-pointer">
              <h3 class="text-lg font-semibold">Phương pháp Tứ Cát Tứ Hung là gì?</h3>
              <font-awesome-icon icon="chevron-down" class="text-gray-500" />
            </div>
            <div class="mt-4 text-gray-600">
              Phương pháp Tứ Cát Tứ Hung là cách phân tích số học dựa trên Kinh Dịch cổ đại, phân chia 64 cặp số thành 8 loại sao (4 cát tinh mang năng lượng tích cực và 4 hung tinh mang năng lượng thách thức). Mỗi cặp số tạo nên rung động năng lượng riêng, ảnh hưởng đến vận mệnh của người sử dụng.
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex justify-between items-center cursor-pointer">
              <h3 class="text-lg font-semibold">Làm thế nào để chọn số điện thoại hợp phong thủy?</h3>
              <font-awesome-icon icon="chevron-down" class="text-gray-500" />
            </div>
            <div class="mt-4 text-gray-600">
              Để chọn số điện thoại hợp phong thủy, cần phân tích dãy số thành các cặp số liền kề và đánh giá theo nguyên lý Tứ Cát Tứ Hung. Một số điện thoại tốt nên có tỷ lệ cân bằng giữa cát hung (50/50) hoặc thiên về cát. Đặc biệt chú ý đến 3 số cuối cùng, vì chúng ảnh hưởng trực tiếp đến hiện tại. Nên có các cặp số thuộc sao Thiên Y, Sinh Khí và tránh các cặp thuộc Tuyệt Mệnh, Ngũ Quỷ.
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex justify-between items-center cursor-pointer">
              <h3 class="text-lg font-semibold">Tại sao biển số xe lại quan trọng trong Bát Cục Linh Số?</h3>
              <font-awesome-icon icon="chevron-down" class="text-gray-500" />
            </div>
            <div class="mt-4 text-gray-600">
              Biển số xe đặc biệt quan trọng vì nó là con số bạn tiếp xúc hàng ngày trong suốt thời gian sở hữu xe. Theo Bát Cục Linh Số, biển số xe phù hợp có thể giúp tránh tai nạn, sự cố và mang lại may mắn trong di chuyển. Đặc biệt đối với người thường xuyên lái xe, biển số có thể tạo lá chắn bảo vệ hoặc ngược lại, làm tăng nguy cơ rủi ro. Một biển số tốt cũng có thể hỗ trợ sự nghiệp và tài lộc cho chủ xe.
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex justify-between items-center cursor-pointer">
              <h3 class="text-lg font-semibold">Số CCCD có thực sự ảnh hưởng đến vận mệnh không?</h3>
              <font-awesome-icon icon="chevron-down" class="text-gray-500" />
            </div>
            <div class="mt-4 text-gray-600">
              Số CCCD ảnh hưởng đến vận mệnh vì đây là dãy số định danh gắn liền với bạn trong suốt cuộc đời. Trong Bát Cục Linh Số, mỗi dãy số đều mang năng lượng riêng và tương tác với từ trường của chủ nhân. Số CCCD tạo một "dấu ấn số học" đặc trưng, có thể hỗ trợ hoặc cản trở trong các khía cạnh cuộc sống như sự nghiệp, tài chính, các mối quan hệ. Dù không thể thay đổi số CCCD, nhưng hiểu được ý nghĩa của nó giúp bạn điều chỉnh các yếu tố khác để cân bằng.
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex justify-between items-center cursor-pointer">
              <h3 class="text-lg font-semibold">Tôi có thể thay đổi số nào để cải thiện vận mệnh?</h3>
              <font-awesome-icon icon="chevron-down" class="text-gray-500" />
            </div>
            <div class="mt-4 text-gray-600">
              Bạn có thể thay đổi số điện thoại, số tài khoản ngân hàng và biển số xe (trong khả năng cho phép) để cải thiện vận mệnh. Đây là những dãy số bạn có quyền lựa chọn và thường xuyên sử dụng. Số điện thoại đặc biệt quan trọng vì bạn tiếp xúc với nó hàng ngày, ảnh hưởng trực tiếp đến công việc, mối quan hệ. Số tài khoản ngân hàng có thể tác động đến tài lộc, còn biển số xe ảnh hưởng đến sự an toàn và vận may trong di chuyển. Ngoài ra, bạn cũng nên chú ý đến số nhà, căn hộ khi có điều kiện chọn lựa.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-primary text-white text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-6">Sẵn sàng cải thiện vận mệnh qua Bát Cục Linh Số?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Đăng ký ngay hôm nay để phân tích chi tiết số điện thoại, biển số xe, CCCD và nhiều hơn nữa!
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button @click="navigateTo('register')" class="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Bắt đầu ngay
          </button>
          <button @click="navigateTo('bat-cuc-linh-so')" class="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>

    <!-- Sử dụng component Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faMobileAlt,
  faIdCard,
  faCar,
  faCreditCard,
  faCheck,
  faQuoteLeft,
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
  faChevronDown,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

// Thêm các icon cần thiết
library.add(
  faMobileAlt,
  faIdCard,
  faCar,
  faCreditCard,
  faCheck,
  faQuoteLeft,
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
  faChevronDown,
  faInfoCircle
)

const router = useRouter()
const API_URL = 'https://chatbotsdtapi.onrender.com/api/demo'

// Computed properties
const currentYear = computed(() => new Date().getFullYear())

// Navigation functions
const navigateTo = (route) => {
  router.push({ name: route })
}

const scrollToChat = () => {
  const chatSection = document.getElementById('demo-chat')
  if (chatSection) {
    chatSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Chat variables
const userInput = ref('')
const isTyping = ref(false)
const chatMessages = ref([])
const chatContainer = ref(null)
const sessionKey = 'demo_analysis_done'
const hasAnalyzed = ref(localStorage.getItem(sessionKey) === 'true')

// Scroll to bottom of chat
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(chatMessages, scrollToBottom)
watch(isTyping, scrollToBottom)

// Add a message from user
const addUserMessage = (text) => {
  chatMessages.value.push({
    isUser: true,
    content: text
  })
  scrollToBottom()
}

// Add a message from bot
const addBotMessage = (html) => {
  chatMessages.value.push({
    isUser: false,
    content: html
  })
  scrollToBottom()
}

// Check if input is a phone number
const isPhoneNumber = (text) => {
  const cleaned = text.replace(/\D/g, '')
  return /^0\d{9,10}$/.test(cleaned)
}

// Format phone number analysis for display
const formatAnalysisResult = (data) => {
  try {
    // Lấy dữ liệu từ response API
    const analysisData = data.analysisData || {};
    const phoneNumber = data.phoneNumber || '';
    
    let content = `<p class="mb-2"><strong>Phân tích sơ bộ số ${phoneNumber}:</strong></p>`;
    
    // Thông tin tổng quan
    if (analysisData.energyLevel) {
      const catCount = analysisData.energyLevel.cat || 0;
      const hungCount = Math.abs(analysisData.energyLevel.hung || 0);
      const total = catCount + hungCount;
      const catPercent = total > 0 ? Math.round((catCount / total) * 100) : 0;
      const hungPercent = 100 - catPercent;
      
      content += `<p class="mb-1">• Tổng: ${total} cặp số (${catCount} cát tinh, ${hungCount} hung tinh)</p>`;
      content += `<p class="mb-1">• Tỷ lệ: ${catPercent}% cát - ${hungPercent}% hung</p>`;
      content += `<p class="mb-1">• Năng lượng: ${
        catPercent >= 70 ? '<span class="text-green-600 font-semibold">Thiên về cát</span>' :
        (hungPercent >= 70 ? '<span class="text-red-600 font-semibold">Thiên về hung</span>' :
        '<span class="text-blue-600 font-semibold">Cân bằng</span>')
      }</p>`;
    }
    
    // Phân tích cặp số cuối
    if (analysisData.starSequence && analysisData.starSequence.length > 0) {
      // Lấy cặp số cuối cùng để phân tích
      const lastStar = analysisData.starSequence[analysisData.starSequence.length - 1];
      const starClass = lastStar.nature === 'Cát' ? 'text-green-600' : 'text-red-600';
      
      content += `<p class="mb-1">• Cặp số cuối: <span class="font-medium">${lastStar.originalPair || ''}</span> - 
        <span class="${starClass} font-semibold">${lastStar.name || ''}</span> 
        (${lastStar.nature === 'Cát' ? 'Cát tinh' : 'Hung tinh'})</p>`;
    }
    
    // Thêm một phần trích dẫn từ phân tích (nếu có)
    if (data.analysis) {
      const shortAnalysis = data.analysis.split('.').slice(0, 2).join('.') + '.';
      content += `<p class="my-2 italic text-gray-600">"${shortAnalysis}"</p>`;
    }
    
    // Thêm thông báo demo nếu có
    if (data.demoResult) {
      content += `<p class="my-2 text-amber-600 font-medium">
        <font-awesome-icon icon="info-circle" class="mr-1" /> 
        Đây là kết quả phân tích demo, chỉ hiển thị một phần thông tin.
      </p>`;
    }
    
    // Call to action
    content += `<p class="mt-4 pt-2 border-t border-gray-200">
      <span class="text-primary font-semibold">Đăng ký để xem phân tích chi tiết và ý nghĩa từng cặp số!</span>
    </p>`;
    
    return content;
  } catch (error) {
    console.error('Error formatting analysis:', error);
    return 'Có lỗi xảy ra khi phân tích số. Vui lòng thử lại sau!';
  }
}

// Send user message and get response
const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value || hasAnalyzed.value) return;
  
  const text = userInput.value.trim();
  userInput.value = '';
  addUserMessage(text);
  
  // Chỉ xử lý input là số điện thoại
  if (isPhoneNumber(text)) {
    isTyping.value = true;
    
    try {
      // Gọi API để phân tích số
      const cleanedNumber = text.replace(/\D/g, '');
      const response = await axios.post(`${API_URL}/analyze`, {
        phoneNumber: cleanedNumber
      });
      
      // Xử lý phản hồi từ API
      if (response.data && response.data.success) {
        // Hiển thị kết quả phân tích
        addBotMessage(formatAnalysisResult(response.data));
        
        // Đánh dấu đã phân tích trong session này
        localStorage.setItem(sessionKey, 'true');
        hasAnalyzed.value = true;
      } else {
        // Xử lý lỗi từ API
        addBotMessage(`Rất tiếc, tôi không thể phân tích số này. ${response.data.error || 'Vui lòng thử lại sau.'}`);
      }
    } catch (error) {
      console.error('Error analyzing phone number:', error);
      
      // Hiển thị thông tin lỗi chi tiết hơn
      if (error.response) {
        // Server trả về lỗi với status code
        const serverErrorData = error.response.data || {};
        console.error('Server error status:', error.response.status);        
        console.error('Server error data:', serverErrorData);
        addBotMessage(`
          <p class="mb-2">Có lỗi xảy ra: ${error.response.status}. ${serverErrorData.error || 'Lỗi không xác định.'}</p>
          <p>Vui lòng thử lại sau hoặc đăng nhập để sử dụng đầy đủ chức năng.</p>
        `);
      } else if (error.request) {
        // Request được gửi nhưng không nhận được phản hồi
        console.error('No response received:', error.request);
        addBotMessage(`
          <p class="mb-2">Không nhận được phản hồi từ máy chủ. Máy chủ có thể đang bảo trì.</p>
          <p>Vui lòng thử lại sau.</p>
        `);
      } else {
        // Lỗi khi cấu hình request
        console.error('Error message:', error.message);
        addBotMessage(`
          <p class="mb-2">Lỗi kết nối: ${error.message}</p>
          <p>Vui lòng kiểm tra kết nối và thử lại.</p>
        `);
      }
    } finally {
      isTyping.value = false;
    }
  } else {
    // Xử lý khi input không phải số điện thoại
    isTyping.value = true;
    
    setTimeout(() => {
      addBotMessage(`
        <p class="mb-2">Vui lòng nhập số điện thoại hợp lệ (VD: 0912345678) để tôi phân tích.</p>
        <p>Ở chế độ dùng thử, tôi chỉ có thể phân tích số điện thoại.</p>
      `);
      isTyping.value = false;
    }, 1000);
  }
}

// Kiểm tra xem đã phân tích chưa khi trang load
onMounted(() => {
  // Scroll xuống dưới khi mở trang
  scrollToBottom();
})
</script>

<style scoped>
/* Base Styling */
.auth-btn {
  padding: 0.5rem 1rem;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.login-btn {
  background-color: #2d2d2d;
  color: white;
}

.signup-btn {
  background-color: white;
  color: #2d2d2d;
  border: 1px solid rgba(0,0,0,0.2);
}

.btn-primary {
  background-color: #4361ee;
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.btn-primary:hover {
  background-color: #3a56d4;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: #4361ee;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 2px solid #4361ee;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.btn-outline:hover {
  background-color: rgba(67, 97, 238, 0.1);
  transform: translateY(-2px);
}

/* Feature Card */
.feature-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.05);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.feature-icon {
  width: 3rem;
  height: 3rem;
  background-color: rgba(67, 97, 238, 0.1);
  color: #4361ee;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  transition: all 0.3s;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
  background-color: #4361ee;
  color: white;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
}

.feature-description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(0.95); }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem !important;
  }
  
  h2 {
    font-size: 1.75rem !important;
  }
  
  .feature-card {
    padding: 1.25rem !important;
  }
}
</style>