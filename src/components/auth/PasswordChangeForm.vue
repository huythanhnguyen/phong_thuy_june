<template>
  <div class="password-form">
    <div class="form-group">
      <label for="current-password">Mật khẩu hiện tại</label>
      <input 
        type="password" 
        id="current-password" 
        v-model="currentPassword"
        placeholder="Nhập mật khẩu hiện tại"
      />
    </div>
    <div class="form-group">
      <label for="new-password">Mật khẩu mới</label>
      <input 
        type="password" 
        id="new-password" 
        v-model="newPassword"
        placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
      />
    </div>
    <div class="form-group">
      <label for="confirm-password">Xác nhận mật khẩu</label>
      <input 
        type="password" 
        id="confirm-password" 
        v-model="confirmPassword"
        placeholder="Nhập lại mật khẩu mới"
        @keyup.enter="submitForm"
      />
    </div>
    <div :class="['password-message', messageType]" v-if="message">
      {{ message }}
    </div>
    <div class="form-actions">
      <button class="btn-primary" @click="submitForm" :disabled="isSubmitting">
        {{ isSubmitting ? 'Đang xử lý...' : 'Cập Nhật' }}
      </button>
      <button class="btn-outline" @click="cancel">Hủy Bỏ</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import authService from '@/services/authService'

const emit = defineEmits(['close', 'success'])

// Form state
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const messageType = ref('') // 'success' or 'error'
const isSubmitting = ref(false)

// Methods
const submitForm = async () => {
  // Validate form
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    message.value = 'Vui lòng điền đầy đủ thông tin'
    messageType.value = 'error'
    return
  }
  
  if (newPassword.value.length < 6) {
    message.value = 'Mật khẩu mới phải có ít nhất 6 ký tự'
    messageType.value = 'error'
    return
  }
  
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Mật khẩu xác nhận không khớp'
    messageType.value = 'error'
    return
  }
  
  // Submit form
  isSubmitting.value = true
  message.value = 'Đang xử lý...'
  messageType.value = ''
  
  try {
    const result = await authService.changePassword(currentPassword.value, newPassword.value)
    
    if (result.success) {
      message.value = 'Đổi mật khẩu thành công'
      messageType.value = 'success'
      
      // Clear form
      currentPassword.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
      
      // Notify parent and close modal after a delay
      setTimeout(() => {
        emit('success')
        emit('close')
      }, 1500)
    } else {
      message.value = result.message || 'Không thể thay đổi mật khẩu'
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = error.message || 'Đã xảy ra lỗi khi thay đổi mật khẩu'
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const cancel = () => {
  emit('close')
}
</script>

<style scoped>
.password-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9rem;
  color: var(--text-secondary, #6c757d);
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color, #4361ee);
  box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1);
}

.password-message {
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.password-message.success {
  background-color: var(--success-light, #e8f5e9);
  color: var(--success-color, #4caf50);
}

.password-message.error {
  background-color: var(--danger-light, #ffebee);
  color: var(--danger-color, #f44336);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.btn-primary {
  background-color: var(--primary-color, #4361ee);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-dark, #3a56d4);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-outline {
  background: none;
  color: var(--text-secondary, #6c757d);
  border: 1px solid var(--border-color, #e0e0e0);
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background-color: var(--background-color, #f5f7fa);
  border-color: var(--text-secondary, #6c757d);
}
</style>