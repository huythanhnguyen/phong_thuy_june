<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sử dụng component Header -->
    <Header />

    <!-- Hero Section -->
    <section class="hero-banner relative min-h-[95vh] flex items-center justify-center">
      <!-- Custom Background with I-Ching Pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <!-- Golden geometric lines pattern -->
        <div class="absolute inset-0 opacity-20">
          <!-- Circular patterns -->
          <div class="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-yellow-400"></div>
          <div class="absolute top-20 left-20 w-24 h-24 rounded-full border border-yellow-300"></div>
          <div class="absolute bottom-10 right-10 w-40 h-40 rounded-full border-2 border-yellow-400"></div>
          <div class="absolute bottom-20 right-20 w-28 h-28 rounded-full border border-yellow-300"></div>
          
          <!-- Diagonal lines -->
          <div class="absolute top-0 left-0 w-full h-full">
            <div class="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <div class="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
            <div class="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            
            <div class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
            <div class="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-300 to-transparent"></div>
            <div class="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
          </div>
          
          <!-- Hexagram-like patterns -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-2 h-12 bg-yellow-400 opacity-30 mx-auto mb-1"></div>
            <div class="w-2 h-6 bg-yellow-400 opacity-30 mx-auto mb-1"></div>
            <div class="w-2 h-12 bg-yellow-400 opacity-30 mx-auto mb-1"></div>
            <div class="w-2 h-6 bg-yellow-400 opacity-30 mx-auto mb-1"></div>
            <div class="w-2 h-12 bg-yellow-400 opacity-30 mx-auto mb-1"></div>
            <div class="w-2 h-6 bg-yellow-400 opacity-30 mx-auto"></div>
          </div>
        </div>
      </div>
      
      <!-- Subtle Overlay -->
      <div class="absolute inset-0 bg-slate-900 bg-opacity-30"></div>
      
      <!-- Content Container -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight text-shadow-lg">
            Giải Mã Vận Mệnh Qua Bát Cực Linh Số
          </h1>
          <p class="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed text-shadow-md max-w-3xl mx-auto">
            Số và người hấp dẫn nhau. Người có từ trường nào sẽ hấp dẫn dãy số tương ứng và ngược lại. 
            Bát Cực Linh Số giúp hiểu ý nghĩa của các con số trong cuộc sống qua số điện thoại, CCCD, số nhà, biển số xe, tài khoản ngân hàng...
          </p>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button @click="navigateTo('register')" class="btn-primary-hero py-4 px-8 text-lg font-semibold">
              Đăng ký ngay
            </button>
            <router-link to="/main-analysis" class="btn-outline-hero py-4 px-8 text-lg font-semibold">
              Phân Tích Tổng Hợp
            </router-link>
          </div>
        </div>
      </div>
    </section>



    <!-- Phân Tích Nhanh - nhúng UniversalAnalysis -->
    <section class="py-16 bg-gray-50" id="quick-analysis">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">Phân Tích Nhanh</h2>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <UniversalAnalysis />
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

    <!-- Features Grid - Cập nhật -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Tìm số phù hợp</h2>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <router-link to="/guides/chon-so-dien-thoai" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="mobile-alt" />
            </div>
            <h3 class="feature-title">Số Điện Thoại</h3>
            <p class="feature-description hidden sm:block">Phân tích từng cặp số để tìm ra sự cân bằng giữa các sao tốt xấu, giúp thu hút tài lộc, quý nhân và cơ hội nghề nghiệp.</p>
          </router-link>
          <router-link to="/guides/can-cuoc-cong-dan" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="id-card" />
            </div>
            <h3 class="feature-title">Căn Cước Công Dân</h3>
            <p class="feature-description hidden sm:block">Khám phá mã số định danh của bạn có ảnh hưởng gì đến vận mệnh, sự nghiệp và đường đời từ góc nhìn số học.</p>
          </router-link>
          <router-link to="/guides/mat-khau" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="key" />
            </div>
            <h3 class="feature-title">Mật Khẩu</h3>
            <p class="feature-description hidden sm:block">Tạo mật khẩu vừa bảo mật vừa mang lại may mắn theo nguyên lý phong thủy số học. 
              Áp dụng cho tài khoản ngân hàng, email, mạng xã hội.</p>
          </router-link>
          <router-link to="/guides/chon-so-ngan-hang" class="feature-card cursor-pointer">
            <div class="feature-icon">
              <font-awesome-icon icon="credit-card" />
            </div>
            <h3 class="feature-title">Số Tài Khoản</h3>
            <p class="feature-description hidden sm:block">Lựa chọn số tài khoản ngân hàng phù hợp để thu hút tài lộc, thịnh vượng và thuận lợi trong giao dịch tài chính.</p>
          </router-link>
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
import UniversalAnalysis from './UniversalAnalysis.vue'

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
    
    // Ý nghĩa từng số (chỉ 3 vị trí)
    if (analysisData.keyPositions) {
      const kp = analysisData.keyPositions;
      if (kp.lastDigit) {
        content += `<p class="mb-1">• Số cuối (<strong>${kp.lastDigit.value}</strong>): ${kp.lastDigit.meaning}</p>`;
      }
      if (kp.thirdFromEnd) {
        content += `<p class="mb-1">• Số thứ 3 từ cuối (<strong>${kp.thirdFromEnd.value}</strong>): ${kp.thirdFromEnd.meaning}</p>`;
      }
      if (kp.fifthFromEnd) {
        content += `<p class="mb-1">• Số thứ 5 từ cuối (<strong>${kp.fifthFromEnd.value}</strong>): ${kp.fifthFromEnd.meaning}</p>`;
      }
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

/* Hero Banner Styles */
.hero-banner {
  position: relative;
  overflow: hidden;
}

.text-shadow-lg {
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.8);
}

.text-shadow-md {
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.7);
}

.btn-primary-hero {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #1a1a1a;
  font-weight: 700;
  border-radius: 0.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.btn-primary-hero:hover {
  background: linear-gradient(135deg, #FFA500, #FFD700);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
}

.btn-outline-hero {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 700;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
  backdrop-filter: blur(10px);
}

.btn-outline-hero:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
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
  
  .hero-banner {
    min-height: 100vh;
  }
  
  .hero-banner h1 {
    font-size: 2.5rem !important;
    line-height: 1.2 !important;
    margin-bottom: 1.5rem !important;
  }
  
  .hero-banner p {
    font-size: 1.125rem !important;
    margin-bottom: 2rem !important;
  }
  
  .btn-primary-hero,
  .btn-outline-hero {
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.75rem 1.5rem !important;
    font-size: 1rem !important;
  }
}
</style>