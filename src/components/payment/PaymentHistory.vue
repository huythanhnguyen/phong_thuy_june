<template>
  <div class="payment-history-container">
    <h3 class="payment-history-title">Lịch sử thanh toán</h3>
    
    <div v-if="isLoading" class="payment-loading">
      <div class="loading-spinner"></div>
      <span>Đang tải lịch sử thanh toán...</span>
    </div>
    
    <div v-else-if="paymentHistory.length === 0" class="payment-empty">
      <font-awesome-icon icon="credit-card" size="2x" class="empty-icon" />
      <p>Chưa có giao dịch thanh toán nào</p>
    </div>
    
    <div v-else class="payment-list">
      <div v-for="payment in paymentHistory" :key="payment.id" class="payment-item">
        <div class="payment-header">
          <div class="payment-date">
            <font-awesome-icon icon="calendar-alt" />
            {{ formatDate(payment.createdAt) }}
          </div>
          <div class="payment-badge" :class="getStatusClass(payment.status)">
            {{ getStatusText(payment.status) }}
          </div>
        </div>
        
        <div class="payment-details">
          <div class="payment-amount-questions">
            <div class="payment-amount">
              <font-awesome-icon icon="money-bill" />
              {{ formatCurrency(payment.amount) }}
            </div>
            <div class="payment-questions">
              <font-awesome-icon icon="question-circle" />
              {{ payment.questionsAdded }} câu hỏi
            </div>
          </div>
          
          <div class="payment-package">
            {{ payment.packageName || payment.description || 'Gói thanh toán' }}
          </div>
        </div>
        
        <div class="payment-method" v-if="payment.paymentMethod">
          <font-awesome-icon :icon="getPaymentMethodIcon(payment.paymentMethod)" />
          {{ getPaymentMethodName(payment.paymentMethod) }}
        </div>
      </div>
      
      <!-- Phân trang -->
      <div class="payment-pagination" v-if="totalPages > 1">
        <button 
          class="pagination-btn" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>
        
        <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
        
        <button 
          class="pagination-btn" 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePaymentStore } from '@/stores/paymentStore';
import { formatDate } from '@/utils';

const paymentStore = usePaymentStore();

// State
const isLoading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);

// Computed properties
const paymentHistory = computed(() => paymentStore.paymentHistory);

// Methods
const loadPaymentHistory = async (page = 1) => {
  isLoading.value = true;
  try {
    const result = await paymentStore.getPaymentHistory(page);
    
    // Kiểm tra kết quả trả về
    if (!result || !result.success) {
      console.error('Không thể tải lịch sử thanh toán:', result?.message || 'Lỗi không xác định');
      return;
    }
    
    // Cập nhật state từ dữ liệu trả về
    if (result.pagination) {
      totalPages.value = result.pagination.totalPages || 1;
      currentPage.value = result.pagination.currentPage || page;
    }
  } catch (error) {
    console.error('Lỗi khi tải lịch sử thanh toán:', error);
  } finally {
    isLoading.value = false;
  }
};

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  loadPaymentHistory(page);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'success':
      return 'status-success';
    case 'pending':
    case 'processing':
      return 'status-pending';
    case 'failed':
    case 'cancelled':
      return 'status-failed';
    default:
      return 'status-default';
  }
};

const getStatusText = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'success':
      return 'Hoàn thành';
    case 'pending':
    case 'processing':
      return 'Đang xử lý';
    case 'failed':
      return 'Thất bại';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

const getPaymentMethodIcon = (method) => {
  switch (method.toLowerCase()) {
    case 'card':
    case 'credit_card':
      return 'credit-card';
    case 'bank':
    case 'transfer':
      return 'university';
    case 'momo':
    case 'zalopay':
    case 'vnpay':
      return 'mobile-alt';
    default:
      return 'money-bill';
  }
};

const getPaymentMethodName = (method) => {
  switch (method.toLowerCase()) {
    case 'card':
    case 'credit_card':
      return 'Thẻ tín dụng';
    case 'bank':
    case 'transfer':
      return 'Chuyển khoản';
    case 'momo':
      return 'Ví MoMo';
    case 'zalopay':
      return 'ZaloPay';
    case 'vnpay':
      return 'VNPay';
    default:
      return method;
  }
};

// Fetch payment history on mount
onMounted(() => {
  loadPaymentHistory();
});
</script>

<style scoped>
.payment-history-container {
  width: 100%;
}

.payment-history-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary, #212529);
}

.payment-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  color: var(--text-secondary, #6c757d);
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--primary-light, #e7ecfd);
  border-top: 3px solid var(--primary-color, #4361ee);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.payment-empty {
  text-align: center;
  padding: 32px 16px;
  color: var(--text-secondary, #6c757d);
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px dashed #e0e0e0;
}

.empty-icon {
  color: #cbd5e0;
  margin-bottom: 16px;
}

.payment-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: 16px;
  border: 1px solid var(--border-color, #e0e0e0);
  transition: all 0.2s ease;
}

.payment-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.payment-date {
  color: var(--text-secondary, #6c757d);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.payment-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-success {
  background-color: rgba(76, 175, 80, 0.1);
  color: #2e7d32;
}

.status-pending {
  background-color: rgba(255, 193, 7, 0.1);
  color: #f57f17;
}

.status-failed {
  background-color: rgba(244, 67, 54, 0.1);
  color: #d32f2f;
}

.status-default {
  background-color: rgba(158, 158, 158, 0.1);
  color: #757575;
}

.payment-details {
  margin-bottom: 12px;
}

.payment-amount-questions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.payment-amount {
  font-weight: 600;
  color: var(--primary-color, #4361ee);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.payment-questions {
  color: var(--text-primary, #212529);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.payment-package {
  font-size: 0.9rem;
  color: var(--text-secondary, #6c757d);
}

.payment-method {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary, #6c757d);
  padding-top: 8px;
  border-top: 1px solid var(--border-color, #e0e0e0);
}

.payment-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid var(--border-color, #e0e0e0);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--primary-color, #4361ee);
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--primary-light, #e7ecfd);
  border-color: var(--primary-color, #4361ee);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.9rem;
  color: var(--text-secondary, #6c757d);
}

@media (max-width: 768px) {
  .payment-amount-questions {
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }
  
  .payment-item {
    padding: 12px;
  }
}
</style> 