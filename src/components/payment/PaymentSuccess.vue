<template>
  <div class="success-container">
    <div class="success-card">
      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      
      <div class="success-title">Thanh toán thành công!</div>
      <div class="success-message">Cảm ơn bạn đã thanh toán. Gói dịch vụ của bạn đã được kích hoạt.</div>
      
      <div class="transaction-details" v-if="transactionData">
        <div class="transaction-row">
          <div class="detail-label">Gói:</div>
          <div class="detail-value">{{ transactionData.packageName }}</div>
        </div>
        
        <div class="transaction-row">
          <div class="detail-label">Số tiền:</div>
          <div class="detail-value">{{ formatCurrency(transactionData.amount) }}</div>
        </div>
        
        <div class="transaction-row">
          <div class="detail-label">Câu hỏi cộng thêm:</div>
          <div class="detail-value">+{{ transactionData.questionsAdded }} câu</div>
        </div>
        
        <div class="transaction-row">
          <div class="detail-label">Câu hỏi hiện có:</div>
          <div class="detail-value">{{ remainingQuestions }} câu</div>
        </div>
        
        <div class="transaction-row">
          <div class="detail-label">Mã giao dịch:</div>
          <div class="detail-value transaction-id">{{ transactionData.transactionId }}</div>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="back-to-chat" @click="navigateToChat">
          <i class="fas fa-comments"></i>
          Quay lại trò chuyện
        </button>
        
        <button class="view-history" @click="navigateToHistory">
          <i class="fas fa-history"></i>
          Xem lịch sử thanh toán
        </button>
      </div>
    </div>
    
    <div class="confetti-container">
      <div v-for="i in 20" :key="i" :class="'confetti-' + i"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useChatStore } from '@/stores/chat';

const props = defineProps({
  transactionData: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const chatStore = useChatStore();
const remainingQuestions = computed(() => chatStore.remainingQuestions);

function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(amount);
}

function navigateToChat() {
  router.push('/app');
}

function navigateToHistory() {
  router.push('/payment?tab=history');
}

onMounted(async () => {
  // Cập nhật số câu hỏi còn lại sau khi thanh toán thành công
  if (props.transactionData?.questionsAdded) {
    await chatStore.fetchRemainingQuestions();
  }
});
</script>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  min-height: 60vh;
}

.success-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.success-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #38b2ac;
  margin-top: 1rem;
}

.success-message {
  margin: 1rem 0 1.5rem;
  color: #4a5568;
}

.transaction-details {
  background-color: #f7fafc;
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  text-align: left;
}

.transaction-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.transaction-row:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: #718096;
  font-weight: 500;
}

.detail-value {
  font-weight: 600;
  color: #2d3748;
}

.transaction-id {
  font-family: monospace;
  font-size: 0.9rem;
  word-break: break-all;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.back-to-chat, .view-history {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.back-to-chat {
  background-color: #38b2ac;
  color: white;
  border: none;
}

.back-to-chat:hover {
  background-color: #319795;
}

.view-history {
  background-color: transparent;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.view-history:hover {
  background-color: #f7fafc;
}

/* Success Checkmark Animation */
.success-checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #38b2ac;
}

.check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}

.check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}

.check-icon::before, .check-icon::after {
  content: '';
  height: 100px;
  position: absolute;
  background: #FFFFFF;
  transform: rotate(-45deg);
}

.check-icon .icon-line {
  height: 5px;
  background-color: #38b2ac;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}

.check-icon .icon-line.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}

.check-icon .icon-line.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}

.check-icon .icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(56, 178, 172, 0.3);
}

.check-icon .icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: #FFFFFF;
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}

/* Confetti Animation */
.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

@keyframes confetti-slow {
  0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
  100% { transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg); }
}

@keyframes confetti-medium {
  0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
  100% { transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg); }
}

@keyframes confetti-fast {
  0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
  100% { transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg); }
}

.confetti-container div {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: var(--bg);
  top: -10px;
  left: var(--left);
  opacity: var(--opacity);
  transform-origin: 0px 0px;
  animation: var(--animation) var(--duration) ease-in infinite;
  animation-delay: var(--delay);
}

/* Generate 20 confetti pieces with random properties */
.confetti-container div:nth-child(1) { --left: 7%; --bg: #38b2ac; --animation: confetti-medium; --duration: 2.5s; --delay: 0s; --opacity: 0.7; }
.confetti-container div:nth-child(2) { --left: 20%; --bg: #4299e1; --animation: confetti-slow; --duration: 2.7s; --delay: 0.2s; --opacity: 0.6; }
.confetti-container div:nth-child(3) { --left: 10%; --bg: #ed8936; --animation: confetti-fast; --duration: 2.9s; --delay: 0.4s; --opacity: 0.8; }
.confetti-container div:nth-child(4) { --left: 30%; --bg: #38b2ac; --animation: confetti-slow; --duration: 3.1s; --delay: 0.6s; --opacity: 0.7; }
.confetti-container div:nth-child(5) { --left: 40%; --bg: #9f7aea; --animation: confetti-medium; --duration: 3.3s; --delay: 0.8s; --opacity: 0.9; }
.confetti-container div:nth-child(6) { --left: 60%; --bg: #ed64a6; --animation: confetti-fast; --duration: 3.5s; --delay: 1s; --opacity: 0.8; }
.confetti-container div:nth-child(7) { --left: 80%; --bg: #38b2ac; --animation: confetti-slow; --duration: 3.7s; --delay: 1.2s; --opacity: 0.6; }
.confetti-container div:nth-child(8) { --left: 90%; --bg: #4299e1; --animation: confetti-medium; --duration: 3.9s; --delay: 1.4s; --opacity: 0.7; }
.confetti-container div:nth-child(9) { --left: 25%; --bg: #f6ad55; --animation: confetti-fast; --duration: 4.1s; --delay: 1.6s; --opacity: 0.8; }
.confetti-container div:nth-child(10) { --left: 50%; --bg: #38b2ac; --animation: confetti-slow; --duration: 4.3s; --delay: 1.8s; --opacity: 0.9; }
.confetti-container div:nth-child(11) { --left: 15%; --bg: #ed64a6; --animation: confetti-medium; --duration: 4.5s; --delay: 2s; --opacity: 0.7; }
.confetti-container div:nth-child(12) { --left: 35%; --bg: #4299e1; --animation: confetti-fast; --duration: 4.7s; --delay: 2.2s; --opacity: 0.8; }
.confetti-container div:nth-child(13) { --left: 55%; --bg: #f6ad55; --animation: confetti-slow; --duration: 4.9s; --delay: 2.4s; --opacity: 0.6; }
.confetti-container div:nth-child(14) { --left: 70%; --bg: #38b2ac; --animation: confetti-medium; --duration: 5.1s; --delay: 2.6s; --opacity: 0.9; }
.confetti-container div:nth-child(15) { --left: 85%; --bg: #9f7aea; --animation: confetti-fast; --duration: 5.3s; --delay: 2.8s; --opacity: 0.7; }
.confetti-container div:nth-child(16) { --left: 95%; --bg: #ed64a6; --animation: confetti-slow; --duration: 5.5s; --delay: 3s; --opacity: 0.8; }
.confetti-container div:nth-child(17) { --left: 5%; --bg: #38b2ac; --animation: confetti-medium; --duration: 5.7s; --delay: 3.2s; --opacity: 0.7; }
.confetti-container div:nth-child(18) { --left: 45%; --bg: #4299e1; --animation: confetti-fast; --duration: 5.9s; --delay: 3.4s; --opacity: 0.9; }
.confetti-container div:nth-child(19) { --left: 75%; --bg: #f6ad55; --animation: confetti-slow; --duration: 6.1s; --delay: 3.6s; --opacity: 0.6; }
.confetti-container div:nth-child(20) { --left: 65%; --bg: #9f7aea; --animation: confetti-medium; --duration: 6.3s; --delay: 3.8s; --opacity: 0.8; }

@media (max-width: 768px) {
  .success-card {
    padding: 1.5rem;
  }
  
  .transaction-details {
    padding: 1rem;
  }
  
  .success-title {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>