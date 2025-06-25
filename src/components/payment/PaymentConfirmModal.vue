<template>
  <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
    <div class="modal-container" :class="{ 'modal-active': isVisible }">
      <div class="modal-header">
        <h3>Xác nhận thanh toán</h3>
        <button class="close-btn" @click="closeModal">
          <font-awesome-icon icon="times" />
        </button>
      </div>
      
      <div class="modal-body">
        <div class="payment-package-info">
          <div class="package-name">{{ packageInfo.name }}</div>
          <div class="package-description">{{ packageInfo.description }}</div>
          
          <div class="package-details">
            <div class="detail-item">
              <div class="detail-label">Số câu hỏi:</div>
              <div class="detail-value question-count">
                <font-awesome-icon icon="question-circle" />
                {{ packageInfo.questions }} câu hỏi
              </div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Đơn giá:</div>
              <div class="detail-value">{{ formatCurrency(packageInfo.price) }}</div>
            </div>
            
            <div class="detail-item total">
              <div class="detail-label">Tổng thanh toán:</div>
              <div class="detail-value price">{{ formatCurrency(packageInfo.price) }}</div>
            </div>
          </div>
        </div>
        
        <div class="payment-method-info">
          <h4>
            <font-awesome-icon icon="credit-card" />
            Phương thức thanh toán
          </h4>
          
          <div class="payment-provider">
            <div class="provider-logo">
              <font-awesome-icon icon="credit-card" size="2x" />
            </div>
            <div class="provider-info">
              <div class="provider-name">PayOS</div>
              <div class="provider-desc">Thanh toán an toàn qua cổng thanh toán PayOS</div>
              <div class="payment-options">
                <span class="payment-option">VISA</span>
                <span class="payment-option">MasterCard</span>
                <span class="payment-option">ATM</span>
                <span class="payment-option">MoMo</span>
                <span class="payment-option">ZaloPay</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="errorMessage" class="error-message">
          <font-awesome-icon icon="exclamation-triangle" />
          {{ errorMessage }}
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="cancel-btn" @click="closeModal" :disabled="isLoading">Hủy</button>
        <button class="confirm-btn" @click="confirmPayment" :disabled="isLoading">
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-else>Tiếp tục thanh toán</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  packageInfo: {
    type: Object,
    default: () => ({
      id: '',
      name: '',
      description: '',
      questions: 0,
      price: 0
    })
  }
});

const emit = defineEmits(['close', 'confirm']);

const isLoading = ref(false);
const errorMessage = ref('');

// Format currency to VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

const closeModal = () => {
  if (isLoading.value) return; // Prevent closing while loading
  emit('close');
};

const confirmPayment = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    
    // Emit confirm event with package info
    emit('confirm', props.packageInfo);
  } catch (error) {
    errorMessage.value = error.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
  } finally {
    isLoading.value = false;
  }
};

// Reset error message when modal opens
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    errorMessage.value = '';
  }
});
</script>

<style scoped>
.provider-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 40px;
  color: var(--primary-color, #4361ee);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-container {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: modal-appear 0.3s ease-out forwards;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-active {
  animation: modal-appear 0.3s ease-out forwards;
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-primary, #212529);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-secondary, #6c757d);
  transition: all 0.2s;
}

.close-btn:hover {
  color: var(--danger-color, #f44336);
}

.modal-body {
  padding: 20px;
}

.payment-package-info {
  background-color: var(--primary-light, #e7ecfd);
  border: 1px solid var(--primary-color, #4361ee);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.package-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color, #4361ee);
  margin-bottom: 4px;
}

.package-description {
  font-size: 0.9rem;
  color: var(--text-secondary, #6c757d);
  margin-bottom: 16px;
}

.package-details {
  border-top: 1px dashed var(--border-color, #e0e0e0);
  padding-top: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.detail-item.total {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-color, #e0e0e0);
  font-weight: 600;
  font-size: 1.05rem;
}

.detail-label {
  color: var(--text-secondary, #6c757d);
}

.detail-value {
  color: var(--text-primary, #212529);
}

.detail-value.question-count {
  color: var(--primary-color, #4361ee);
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-value.price {
  color: var(--primary-color, #4361ee);
}

.payment-method-info {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.payment-method-info h4 {
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 12px;
  color: var(--text-primary, #212529);
  display: flex;
  align-items: center;
  gap: 8px;
}

.payment-provider {
  display: flex;
  gap: 16px;
  align-items: center;
}

.provider-info {
  flex: 1;
}

.provider-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.provider-desc {
  font-size: 0.85rem;
  color: var(--text-secondary, #6c757d);
  margin-bottom: 8px;
}

.payment-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.payment-option {
  font-size: 0.8rem;
  padding: 2px 6px;
  background-color: #f0f0f0;
  border-radius: 4px;
  color: var(--text-secondary, #6c757d);
}

.error-message {
  margin-top: 16px;
  padding: 10px;
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.2);
  border-radius: 4px;
  color: var(--danger-color, #f44336);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color, #e0e0e0);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn, .confirm-btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  background-color: white;
  border: 1px solid var(--border-color, #e0e0e0);
  color: var(--text-secondary, #6c757d);
}

.cancel-btn:hover {
  background-color: #f5f5f5;
}

.confirm-btn {
  background-color: var(--primary-color, #4361ee);
  border: none;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
}

.confirm-btn:hover {
  background-color: var(--primary-dark, #3a56d4);
}

.confirm-btn:disabled, .cancel-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .payment-provider {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .provider-logo {
    margin-bottom: 8px;
  }
}
</style> 