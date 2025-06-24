<template>
  <div class="chat-input-container">
    <!-- Nút mua thêm câu hỏi -->
    <div v-if="remainingQuestions === 0" class="buy-more-container">
      <div class="buy-more-message">
        <font-awesome-icon icon="exclamation-circle" />
        <span>Bạn đã hết câu hỏi!</span>
      </div>
      <router-link to="/payment" class="buy-more-button">
        <font-awesome-icon icon="plus-circle" />
        Mua thêm câu hỏi
      </router-link>
    </div>
  
    <div class="chat-input" :class="{ 'quota-exceeded': remainingQuestions === 0 }">
      <div v-if="remainingQuestions === 0" class="quota-warning-icon" 
           title="Bạn đã hết câu hỏi. Vui lòng nạp thêm để tiếp tục trải nghiệm.">
        <font-awesome-icon icon="exclamation-triangle" />
      </div>
      <textarea 
        ref="inputRef"
        v-model="inputText"
        placeholder="Nhập số điện thoại hoặc đặt câu hỏi..."
        @keydown.enter.prevent="handleEnterKey"
        @input="autoResize"
        rows="1"
        :disabled="isDisabled || remainingQuestions === 0"
        :class="{ 'textarea-warning': remainingQuestions === 0 }"
      ></textarea>
      <button @click="sendMessage" 
              :disabled="isDisabled || !inputText.trim() || remainingQuestions === 0"
              :title="remainingQuestions === 0 ? 'Bạn cần nạp thêm câu hỏi để tiếp tục' : ''"
              :class="{ 'button-warning': remainingQuestions === 0 }">
        <font-awesome-icon icon="paper-plane" />
      </button>
    </div>
    <div class="input-info" v-if="remainingQuestions > 0">
      Nhập số điện thoại để phân tích hoặc đặt câu hỏi về ý nghĩa các con số
    </div>
    <div class="input-info remaining-questions" v-else>
      <router-link to="/payment">Mua thêm câu hỏi</router-link> để tiếp tục trải nghiệm dịch vụ
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useChatStore } from '@/stores/chat'

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send'])
const chatStore = useChatStore()

const inputText = ref('')
const inputRef = ref(null)

// Computed
const remainingQuestions = computed(() => chatStore.remainingQuestions)

// Watch for changes to automatically resize the textarea
watch(inputText, () => {
  autoResize()
})

// Methods
const sendMessage = () => {
  if (inputText.value.trim() && !props.isDisabled && remainingQuestions.value > 0) {
    emit('send', inputText.value)
    inputText.value = ''
    autoResize()
    
    // Focus back on input after sending
    if (inputRef.value) {
      inputRef.value.focus()
    }
  }
}

const handleEnterKey = (event) => {
  // Send on Enter, unless Shift is pressed (for multiline)
  if (!event.shiftKey) {
    sendMessage()
  }
}

const autoResize = () => {
  if (!inputRef.value) return
  
  // Reset height to auto to properly calculate scrollHeight
  inputRef.value.style.height = 'auto'
  
  // Set new height based on content (with max height of 200px)
  const newHeight = Math.min(inputRef.value.scrollHeight, 200)
  inputRef.value.style.height = `${newHeight}px`
}

// Focus on input when mounted
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
    autoResize()
  }
})
</script>

<style scoped>
.chat-input-container {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color, #e0e0e0);
  background-color: white;
  position: relative;
  z-index: 5;
}

.chat-input {
  display: flex;
  align-items: flex-end;
  background-color: white;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 16px;
  padding: 10px 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
}

.chat-input.quota-exceeded {
  border-color: #f57c00;
  background-color: #fff8f1;
  box-shadow: 0 2px 8px rgba(245, 124, 0, 0.15);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 8px rgba(245, 124, 0, 0.15);
  }
  50% {
    box-shadow: 0 2px 12px rgba(245, 124, 0, 0.3);
  }
  100% {
    box-shadow: 0 2px 8px rgba(245, 124, 0, 0.15);
  }
}

.quota-warning-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #f57c00;
  z-index: 10;
}

.chat-input textarea {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px 40px 8px 8px;
  resize: none;
  font-size: 1rem;
  line-height: 1.5;
  max-height: 200px;
  background-color: transparent;
  font-family: inherit;
  transition: all 0.3s ease;
}

.chat-input textarea.textarea-warning {
  padding-left: 32px;
  color: #e65100;
}

.chat-input textarea:disabled {
  background-color: transparent;
  cursor: not-allowed;
}

.chat-input button {
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 32px;
  height: 32px;
  background-color: var(--primary-color, #4361ee);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chat-input button.button-warning {
  background-color: #f57c00;
}

.chat-input button:hover:not(:disabled) {
  background-color: var(--primary-dark, #3a56d4);
  transform: scale(1.05);
}

.chat-input button.button-warning:hover:not(:disabled) {
  background-color: #e65100;
}

.chat-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.input-info {
  font-size: 0.8rem;
  color: var(--text-secondary, #6c757d);
  text-align: center;
  margin-top: 8px;
}

.input-info.remaining-questions {
  color: #e53e3e;
}

.input-info a {
  color: var(--primary-color, #4361ee);
  font-weight: 600;
  text-decoration: none;
}

.input-info a:hover {
  text-decoration: underline;
}

/* Buy More Button */
.buy-more-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff8f1;
  border: 1px solid #fed7aa;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
}

.buy-more-message {
  display: flex;
  align-items: center;
  color: #c2410c;
  font-weight: 500;
}

.buy-more-message svg {
  margin-right: 8px;
}

.buy-more-button {
  display: flex;
  align-items: center;
  background-color: var(--primary-color, #4361ee);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.buy-more-button:hover {
  background-color: var(--primary-dark, #3a56d4);
  transform: scale(1.02);
}

.buy-more-button svg {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .chat-input-container {
    padding: 8px 12px;
  }
  
  .chat-input textarea {
    font-size: 16px; /* Prevent zoom on iOS */
  }
  
  .buy-more-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .buy-more-message {
    margin-bottom: 8px;
  }
  
  .buy-more-button {
    justify-content: center;
  }
}
</style>