<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <main class="flex-grow bg-gray-50">
  <div class="container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4 text-center">Bảng Giá Dịch Vụ</h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
          Tham khảo các gói dịch vụ của Phong Thủy Số để chọn gói phù hợp với nhu cầu tư vấn của bạn.
        </p>
        
        <!-- Questions Indicator -->
        <div class="flex justify-center mb-6">
          <div class="questions-indicator bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full inline-flex items-center">
            <i class="fas fa-question-circle mr-2"></i>
            <span>{{ remainingQuestions }} câu hỏi còn lại</span>
          </div>
        </div>
        
        <!-- Tabs cho các loại gói dịch vụ -->
        <div class="flex justify-center mb-10">
          <button 
            @click="activeTab = 'packages'" 
            class="tab-button"
            :class="{ 'active': activeTab === 'packages' }"
          >
            <i class="fas fa-shopping-cart mr-2"></i>
            <span>Gói dịch vụ</span>
          </button>
          <button 
            @click="activeTab = 'history'" 
            class="tab-button"
            :class="{ 'active': activeTab === 'history' }"
          >
            <i class="fas fa-history mr-2"></i>
            <span>Lịch sử thanh toán</span>
          </button>
        </div>
        
        <!-- Packages Tab -->
        <div v-if="activeTab === 'packages'">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Map through packages -->
            <div 
              v-for="pkg in paymentPackages" 
              :key="pkg.id"
              class="package-card relative overflow-hidden"
              :class="{ 'popular': pkg.popular }"
            >
              <div v-if="pkg.popular" class="package-popular-tag">
                Phổ biến nhất
              </div>
              
              <div class="package-header">
                <h3 class="package-name">{{ pkg.name }}</h3>
                <div class="package-price">
                  {{ formatCurrency(pkg.price) }}
                </div>
                <div v-if="pkg.discount > 0" class="package-discount">
                  Tiết kiệm {{ pkg.discount }}%
                </div>
              </div>
              
              <div class="package-body">
                <div class="package-questions">
                  <i class="fas fa-question-circle mr-2"></i>
                  <span>{{ pkg.questions }} câu hỏi</span>
                </div>
                <p class="package-description">{{ pkg.description }}</p>
                
                <ul class="package-features">
                  <li v-for="(feature, index) in pkg.features" :key="index" class="package-feature">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="package-footer">
                <button 
                  @click="openPaymentConfirm(pkg)" 
                  class="payment-button"
                  :class="{ 'payment-button-popular': pkg.popular }"
                >
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </div>
          
          <!-- Payment Info -->
          <div class="payment-info bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 class="text-xl font-semibold mb-4">Thông tin thanh toán</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium mb-2">Các bước thanh toán:</h4>
                <ol class="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Chọn gói câu hỏi phù hợp với nhu cầu của bạn</li>
                  <li>Nhấn vào nút "Thanh toán ngay"</li>
                  <li>Xác nhận thông tin thanh toán</li>
                  <li>Hoàn thành thanh toán theo hướng dẫn</li>
                  <li>Số câu hỏi sẽ được cộng vào tài khoản ngay sau khi thanh toán thành công</li>
                </ol>
              </div>
              <div>
                <h4 class="font-medium mb-2">Phương thức thanh toán:</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-center">
                    <i class="fas fa-credit-card text-primary mr-2"></i>
                    Thẻ tín dụng / ghi nợ quốc tế
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-money-bill text-primary mr-2"></i>
                    Ví điện tử (MoMo, ZaloPay, VNPay)
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-university text-primary mr-2"></i>
                    Chuyển khoản ngân hàng
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- FAQ Section -->
          <div class="mt-16 bg-white rounded-xl p-8 shadow-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Câu Hỏi Thường Gặp</h2>
            
            <div class="space-y-6 max-w-3xl mx-auto">
              <div @click="toggleFaq(1)" class="cursor-pointer">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-lg text-gray-800">Tôi sẽ nhận được gì sau khi thanh toán?</h3>
                  <i :class="openFaqs.includes(1) ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas text-gray-500"></i>
                </div>
                <div v-if="openFaqs.includes(1)" class="mt-2 text-gray-600">
                  <p>Sau khi thanh toán thành công, số câu hỏi sẽ được cộng vào tài khoản của bạn. Bạn có thể sử dụng số câu hỏi này để tư vấn phong thủy trong mục Chat. Mỗi câu hỏi tương ứng với một lần hỏi đáp.</p>
                </div>
              </div>
              
              <div @click="toggleFaq(2)" class="cursor-pointer">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-lg text-gray-800">Câu hỏi tôi mua có thời hạn sử dụng không?</h3>
                  <i :class="openFaqs.includes(2) ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas text-gray-500"></i>
                </div>
                <div v-if="openFaqs.includes(2)" class="mt-2 text-gray-600">
                  <p>Không, các câu hỏi bạn mua không có thời hạn sử dụng. Bạn có thể sử dụng số câu hỏi này bất cứ khi nào bạn muốn, không có giới hạn thời gian.</p>
                </div>
              </div>
              
              <div @click="toggleFaq(3)" class="cursor-pointer">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-lg text-gray-800">Các phương thức thanh toán được chấp nhận?</h3>
                  <i :class="openFaqs.includes(3) ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas text-gray-500"></i>
                </div>
                <div v-if="openFaqs.includes(3)" class="mt-2 text-gray-600">
                  <p>Chúng tôi chấp nhận thanh toán qua các phương thức sau: Thẻ tín dụng/ghi nợ, ví điện tử MoMo, ZaloPay, VNPay, và chuyển khoản ngân hàng. Tất cả các giao dịch đều được bảo mật theo tiêu chuẩn ngành.</p>
                </div>
              </div>
              
              <div @click="toggleFaq(4)" class="cursor-pointer">
                <div class="flex justify-between items-center">
                  <h3 class="font-semibold text-lg text-gray-800">Chính sách hoàn tiền như thế nào?</h3>
                  <i :class="openFaqs.includes(4) ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas text-gray-500"></i>
                </div>
                <div v-if="openFaqs.includes(4)" class="mt-2 text-gray-600">
                  <p>Chúng tôi cung cấp chính sách hoàn tiền trong vòng 7 ngày kể từ ngày thanh toán nếu bạn không hài lòng với dịch vụ. Sau khi sử dụng quá 30% số lượng câu hỏi được cấp, chúng tôi sẽ không hoàn tiền.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- History Tab -->
        <div v-else-if="activeTab === 'history'">
          <PaymentHistory />
        </div>
        
        <!-- Quota Alert -->
        <QuotaAlert v-if="showQuotaAlert" :remaining="remainingQuestions" @close="showQuotaAlert = false" />
        
        <!-- Success View -->
        <div v-if="showSuccessView" class="success-overlay">
          <PaymentSuccess :transaction="paymentTransaction" />
        </div>
    </div>
    </main>

    <!-- Footer -->
    <Footer />
    
    <!-- Payment Confirm Modal -->
    <PaymentConfirmModal 
      :is-visible="showPaymentConfirm" 
      :package-info="selectedPackage"
      @close="closePaymentConfirm"
      @confirm="handlePaymentConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import PaymentConfirmModal from '@/components/payment/PaymentConfirmModal.vue';
import PaymentHistory from '@/components/payment/PaymentHistory.vue';
import PaymentSuccess from '@/components/payment/PaymentSuccess.vue';
import QuotaAlert from '@/components/payment/QuotaAlert.vue';

// Mock của usePaymentStore và useChatStore
const usePaymentStore = () => {
  return {
    paymentPackages: [
      {
        id: 'basic',
        name: 'Gói Cơ Bản',
        price: 49000,
        discount: 0,
        questions: 20,
        description: 'Dành cho người mới bắt đầu tìm hiểu về phong thủy số học',
        popular: false,
        features: [
          'Phân tích phong thủy cơ bản',
          'Tư vấn chọn số điện thoại',
          'Tư vấn chọn mật khẩu',
          'Hỗ trợ trong giờ hành chính'
        ]
      },
      {
        id: 'standard',
        name: 'Gói Tiêu Chuẩn',
        price: 99000,
        discount: 10,
        questions: 100,
        description: 'Dành cho người dùng có nhu cầu tư vấn phong thủy thường xuyên',
        popular: true,
        features: [
          'Phân tích phong thủy nâng cao',
          'Tư vấn chọn số điện thoại',
          'Tư vấn chọn mật khẩu',
          'Phân tích căn cước cơ bản',
          'Tư vấn ứng dụng cơ bản'
        ]
      },
      {
        id: 'premium',
        name: 'Gói Cao Cấp',
        price: 199000,
        discount: 15,
        questions: 500,
        description: 'Dành cho người dùng chuyên nghiệp và doanh nghiệp',
        popular: false,
        features: [
          'Phân tích phong thủy chuyên sâu',
          'Tư vấn chọn số điện thoại VIP',
          'Tư vấn chọn mật khẩu cao cấp',
          'Phân tích căn cước toàn diện',
          'Tư vấn ứng dụng chuyên sâu',
          'Hỗ trợ ưu tiên 24/7'
        ]
      }
    ],
    fetchPaymentPackages: () => {},
    createPayment: (pkg) => {
      return Promise.resolve({
        redirectUrl: '#'
      });
    }
  };
};

const useChatStore = () => {
  return {
    remainingQuestions: 5
  };
};

const router = useRouter();
const route = useRoute();
const paymentStore = usePaymentStore();
const chatStore = useChatStore();

// State
const activeTab = ref('packages');
const showPaymentConfirm = ref(false);
const selectedPackage = ref(null);
const showSuccessView = ref(false);
const paymentTransaction = ref({});
const openFaqs = ref([1]); // Mặc định mở câu hỏi đầu tiên
const showQuotaAlert = ref(false);

// Computed properties
const paymentPackages = computed(() => paymentStore.paymentPackages);
const remainingQuestions = computed(() => chatStore.remainingQuestions);

// Check for payment status from URL (when redirected back from payment gateway)
onMounted(() => {
  // Kiểm tra query params để xác định trạng thái thanh toán
  const paymentStatus = route.query.status;
  const transactionId = route.query.transaction_id;
  
  if (paymentStatus === 'success' && transactionId) {
    // Lấy thông tin giao dịch từ server
    fetchTransactionDetails(transactionId);
  }
});

// Methods
const openPaymentConfirm = (pkg) => {
  selectedPackage.value = pkg;
  showPaymentConfirm.value = true;
};

const closePaymentConfirm = () => {
  showPaymentConfirm.value = false;
};

const handlePaymentConfirm = async (pkg) => {
  try {
    // Gọi API tạo thanh toán
    const result = await paymentStore.createPayment(pkg);
    
    // Redirect đến trang thanh toán
    if (result && result.redirectUrl) {
      window.location.href = result.redirectUrl;
    }
  } catch (error) {
    console.error('Payment error:', error);
    // Hiển thị thông báo lỗi
  }
};

const fetchTransactionDetails = async (transactionId) => {
  try {
    // Gọi API lấy thông tin giao dịch
    // Đây chỉ là mock
    paymentTransaction.value = {
      id: transactionId,
      package: {
        name: 'Gói Tiêu Chuẩn',
        questions: 100
      },
      amount: 99000,
      createdAt: new Date().toISOString(),
      status: 'success'
    };
    
    // Hiển thị màn hình thành công
    showSuccessView.value = true;
    
    // Xóa query params
    router.replace({ query: null });
  } catch (error) {
    console.error('Fetch transaction error:', error);
  }
};

// Toggle FAQ
const toggleFaq = (faqId) => {
  if (openFaqs.value.includes(faqId)) {
    openFaqs.value = openFaqs.value.filter(id => id !== faqId);
  } else {
    openFaqs.value.push(faqId);
  }
};

// Format currency to VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

// Thêm Font Awesome vào trang
onMounted(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  document.head.appendChild(link);
});
</script> 

<style scoped>
:root {
  --primary-color: #4361ee;
  --primary-light: #e7ecfd;
  --primary-dark: #3a50d8;
}

/* Tab styling */
.tab-button {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: var(--gray-700, #4a5568);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.tab-button:hover {
  color: var(--primary-color);
}

.tab-button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

/* Package card styling */
.package-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.package-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.package-card.popular {
  border: 2px solid var(--primary-color);
  transform: scale(1.05);
}

.package-popular-tag {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-bottom-left-radius: 0.5rem;
}

.package-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
  text-align: center;
}

.package-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-800, #2d3748);
  margin-bottom: 0.5rem;
}

.package-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.package-discount {
  font-size: 0.875rem;
  color: var(--green-600, #38a169);
  margin-top: 0.25rem;
}

.package-body {
  padding: 1.5rem;
}

.package-questions {
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--gray-700, #4a5568);
}

.package-description {
  color: var(--gray-600, #718096);
  margin-bottom: 1.5rem;
}

.package-features {
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.75rem;
}

.package-feature {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: var(--gray-700, #4a5568);
}

.package-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--gray-200, #e5e7eb);
}

.payment-button {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--gray-100, #f7fafc);
  color: var(--gray-800, #2d3748);
  font-weight: 500;
  text-align: center;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.payment-button:hover {
  background-color: var(--gray-200, #edf2f7);
}

.payment-button-popular {
  background-color: var(--primary-color);
  color: white;
}

.payment-button-popular:hover {
  background-color: var(--primary-dark);
}

/* Questions indicator */
.questions-indicator {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: rgba(var(--primary-color-rgb, 67, 97, 238), 0.1);
  color: var(--primary-color);
  border-radius: 9999px;
  font-weight: 500;
}

/* Success overlay */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 50;
  overflow-y: auto;
}

/* Responsive styles */
@media (max-width: 768px) {
  .package-card.popular {
    transform: none;
    order: -1;
  }
}
</style> 