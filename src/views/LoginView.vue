<template>
  <div class="login-container">
    <router-link to="/" class="back-to-home">
      <font-awesome-icon icon="arrow-left" /> Quay lại trang chủ
    </router-link>
    
    <div class="auth-box">
      <div class="auth-header">
        <h3>{{ activeTab === 'login' ? 'Đăng Nhập' : 'Đăng Ký' }}</h3>
        <div class="auth-toggle">
          <button 
            class="auth-tab" 
            :class="{ active: activeTab === 'login' }"
            @click="setActiveTab('login')"
          >
            Đăng Nhập
          </button>
          <button 
            class="auth-tab" 
            :class="{ active: activeTab === 'register' }"
            @click="setActiveTab('register')"
          >
            Đăng Ký
          </button>
        </div>
      </div>
      
      <!-- Form đăng nhập -->
      <div class="auth-form" :class="{ active: activeTab === 'login' }">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input 
            type="email" 
            id="login-email" 
            v-model="loginForm.email"
            placeholder="Email của bạn"
          >
        </div>
        <div class="form-group">
          <label for="login-password">Mật khẩu</label>
          <input 
            type="password" 
            id="login-password" 
            v-model="loginForm.password"
            placeholder="Mật khẩu"
            @keyup.enter="handleLogin"
          >
        </div>
        <div class="form-action">
          <button 
            class="btn-primary" 
            @click="handleLogin"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Đang xử lý...' : 'Đăng Nhập' }}
          </button>
        </div>
        <div class="auth-message" :class="messageType" v-if="message">
          {{ message }}
        </div>
      </div>

      <!-- Form đăng ký -->
      <div class="auth-form" :class="{ active: activeTab === 'register' }">
        <div class="form-group">
          <label for="register-name">Họ tên</label>
          <input 
            type="text" 
            id="register-name" 
            v-model="registerForm.name"
            placeholder="Họ tên của bạn"
          >
        </div>
        <div class="form-group">
          <label for="register-email">Email</label>
          <input 
            type="email" 
            id="register-email" 
            v-model="registerForm.email"
            placeholder="Email của bạn"
          >
        </div>
        <div class="form-group">
          <label for="register-password">Mật khẩu</label>
          <input 
            type="password" 
            id="register-password" 
            v-model="registerForm.password"
            placeholder="Mật khẩu (ít nhất 6 ký tự)"
            @keyup.enter="handleRegister"
          >
        </div>
        <div class="form-action">
          <button 
            class="btn-primary" 
            @click="handleRegister"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Đang xử lý...' : 'Đăng Ký' }}
          </button>
        </div>
        <div class="auth-message" :class="messageType" v-if="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// State
const activeTab = ref('login')
const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

// Form state
const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: ''
})

// Methods - Chuyển phần này lên trước watch
const setActiveTab = (tab) => {
  activeTab.value = tab
  message.value = ''
  
  // Update URL query
  router.replace({ query: { tab } })
}

// Watch route to set active tab - Đặt phần này sau khi định nghĩa setActiveTab
watch(() => route.query.tab, (newTab) => {
  if (newTab === 'register') {
    setActiveTab('register')
  } else {
    setActiveTab('login')
  }
}, { immediate: true })

// Handle login and register

const handleLogin = async () => {
  // Validate form
  if (!loginForm.value.email || !loginForm.value.password) {
    message.value = 'Vui lòng điền đầy đủ thông tin'
    messageType.value = 'error'
    return
  }
  
  isLoading.value = true
  message.value = 'Đang đăng nhập...'
  messageType.value = ''
  
  try {
    const result = await authStore.login(loginForm.value.email, loginForm.value.password)
    
    if (result.success) {
      message.value = 'Đăng nhập thành công! Đang chuyển hướng...'
      messageType.value = 'success'
      
      // Redirect to app
      setTimeout(() => {
        router.push({ name: 'app' })
      }, 1000)
    } else {
      message.value = result.error || 'Đăng nhập thất bại'
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = error.message || 'Đăng nhập thất bại'
    messageType.value = 'error'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  // Validate form
  if (!registerForm.value.name || !registerForm.value.email || !registerForm.value.password) {
    message.value = 'Vui lòng điền đầy đủ thông tin'
    messageType.value = 'error'
    return
  }
  
  if (registerForm.value.password.length < 6) {
    message.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    messageType.value = 'error'
    return
  }
  
  isLoading.value = true
  message.value = 'Đang đăng ký...'
  messageType.value = ''
  
  try {
    const result = await authStore.register(
      registerForm.value.name,
      registerForm.value.email,
      registerForm.value.password
    )
    
    if (result.success) {
      message.value = 'Đăng ký thành công! Đang chuyển hướng...'
      messageType.value = 'success'
      
      // Redirect to app
      setTimeout(() => {
        router.push({ name: 'app' })
      }, 1000)
    } else {
      message.value = result.error || 'Đăng ký thất bại'
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = error.message || 'Đăng ký thất bại'
    messageType.value = 'error'
    console.error('Register error:', error)
  } finally {
    isLoading.value = false
  }
}

// Redirect to app if already logged in
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push({ name: 'app' })
  }
})
</script>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  background-color: var(--background-color, #f5f7fa);
}

.back-to-home {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  color: var(--text-secondary, #6c757d);
  text-decoration: none;
  font-size: 0.9rem;
  gap: 5px;
  transition: color 0.2s;
}

.back-to-home:hover {
  color: var(--primary-color, #4361ee);
}

.auth-box {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  overflow: hidden;
}

.auth-header {
  padding: 16px 24px;
  background-color: var(--primary-color, #4361ee);
  color: white;
}

.auth-header h3 {
  margin-bottom: 16px;
  font-size: 1.3rem;
}

.auth-toggle {
  display: flex;
  gap: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.auth-tab {
  flex: 1;
  padding: 8px 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.auth-tab.active {
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--primary-color, #4361ee);
  font-weight: 600;
}

.auth-form {
  display: none;
  padding: 24px;
}

.auth-form.active {
  display: block;
  animation: fadeIn 0.3s ease-out;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: var(--text-secondary, #6c757d);
}

.form-group input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  border-radius: 6px;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color, #4361ee);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.form-action {
  margin-top: 24px;
}

.btn-primary {
  width: 100%;
  background-color: var(--primary-color, #4361ee);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-dark, #3a56d4);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-message {
  margin-top: 16px;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.auth-message.success {
  background-color: var(--success-light, #e8f5e9);
  color: var(--success-color, #4caf50);
}

.auth-message.error {
  background-color: var(--danger-light, #ffebee);
  color: var(--danger-color, #f44336);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 500px) {
  .auth-box {
    max-width: 100%;
  }
  
  .back-to-home {
    top: 10px;
    left: 10px;
  }
}
</style>