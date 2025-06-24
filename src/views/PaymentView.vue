<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow bg-gray-50">
      <div class="container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4 text-center">Thanh Toán</h1>
        
        <!-- Questions Indicator -->
        <div class="flex justify-center mb-6">
          <div class="questions-indicator bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full inline-flex items-center">
            <font-awesome-icon icon="question-circle" class="mr-2" />
            <span>{{ remainingQuestions }} câu hỏi còn lại</span>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200 mb-8 justify-center">
          <button 
            class="tab-button" 
            :class="{ 'active': activeTab === 'packages' }"
            @click="activeTab = 'packages'"
          >
            <font-awesome-icon icon="shopping-cart" />
            <span>Gói câu hỏi</span>
          </button>
          <button 
            class="tab-button" 
            :class="{ 'active': activeTab === 'history' }"
            @click="activeTab = 'history'"
          >
            <font-awesome-icon icon="history" />
            <span>Lịch sử thanh toán</span>
          </button>
        </div>

        <!-- Packages -->
        <div v-if="activeTab === 'packages'">
          <h2 class="text-2xl font-bold mb-6 text-center">Chọn Gói Câu Hỏi</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="pkg in paymentPackages" :key="pkg.id" 
                class="package-card relative overflow-hidden" 
                :class="{ 'popular': pkg.popular }">
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
                  <font-awesome-icon icon="question-circle" />
                  <span>{{ pkg.questions }} câu hỏi</span>
                </div>
                <p class="package-description">{{ pkg.description }}</p>
                
                <ul class="package-features">
                  <li v-for="(feature, index) in pkg.features" :key="index" class="package-feature">
                    <font-awesome-icon icon="check" class="text-green-500 mr-2" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>
              <div class="package-footer">
                <button @click="openPaymentConfirm(pkg)" 
                        class="payment-button"
                        :class="{ 'payment-button-popular': pkg.popular }">
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
                    <font-awesome-icon icon="credit-card" class="text-primary mr-2" />
                    Thẻ tín dụng / ghi nợ quốc tế
                  </li>
                  <li class="flex items-center">
                    <font-awesome-icon icon="money-bill" class="text-primary mr-2" />
                    Ví điện tử (MoMo, ZaloPay, VNPay)
                  </li>
                  <li class="flex items-center">
                    <font-awesome-icon icon="university" class="text-primary mr-2" />
                    Chuyển khoản ngân hàng
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- History Tab -->
        <div v-else-if="activeTab === 'history'">
          <PaymentHistory />
        </div>

        <!-- Payment Success View -->
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
import { usePaymentStore } from '@/stores/paymentStore';
import { useChatStore } from '@/stores/chat';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import PaymentConfirmModal from '@/components/payment/PaymentConfirmModal.vue';
import PaymentHistory from '@/components/payment/PaymentHistory.vue';
import PaymentSuccess from '@/components/payment/PaymentSuccess.vue';

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

// Computed properties
const remainingQuestions = computed(() => chatStore.remainingQuestions);

// Danh sách gói thanh toán tạm thời - sẽ được lấy từ store trong thực tế
const paymentPackages = computed(() => [
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
]);

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
    const result = await paymentStore.createPayment(pkg.id);
    if (!result.success) {
      alert(result.error || 'Không thể tạo giao dịch thanh toán');
    }
    // Redirect sẽ được xử lý trong action createPayment
    closePaymentConfirm();
  } catch (error) {
    console.error('Payment error:', error);
    alert('Đã xảy ra lỗi khi xử lý thanh toán');
  }
};

const fetchTransactionDetails = async (transactionId) => {
  try {
    const result = await paymentStore.getTransactionDetails(transactionId);
    if (result.success) {
      // Hiển thị màn hình thanh toán thành công
      paymentTransaction.value = result.transaction;
      showSuccessView.value = true;
      
      // Cập nhật số câu hỏi trong chatStore
      chatStore.updateRemainingQuestions(result.transaction.newTotal);
      
      // Xóa query params khỏi URL để tránh reload lại trang hiển thị thông báo thành công
      router.replace({ path: route.path });
      
      // Chuyển hướng đến trang app sau 3 giây
      setTimeout(() => {
        router.push('/app');
      }, 3000);
    }
  } catch (error) {
    console.error('Error fetching transaction details:', error);
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

// Đóng màn hình success sau khi người dùng xem
watch(showSuccessView, (newVal) => {
  if (newVal) {
    // Tự động chuyển đến tab lịch sử thanh toán sau khi hiển thị thành công
    setTimeout(() => {
      activeTab.value = 'history';
    }, 500);
  }
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
  gap: 8px;
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
  gap: 8px;
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
  
  .tab-button {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}
</style> 