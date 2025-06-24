import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '../services/authService'
import router from '../router'


export const useAuthStore = defineStore('auth', () => {
  // State
  const currentUser = ref(null)
  const token = ref(localStorage.getItem('phone_analysis_token') || null)
  
  // Getters
  const isAuthenticated = computed(() => !!token.value)
  
  // Actions
  async function login(email, password) {
    try {
      const response = await authService.login(email, password)
      
      if (response.success) {
        token.value = response.token
        currentUser.value = response.user
        
        // Lưu trữ token và thông tin người dùng
        localStorage.setItem('phone_analysis_token', response.token)
        localStorage.setItem('phone_analysis_user', JSON.stringify(response.user))
        
        return { success: true }
      }
      
      return { success: false, error: response.message || 'Đăng nhập thất bại' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Đăng nhập thất bại' }
    }
  }
  
  async function register(name, email, password) {
    try {
      const response = await authService.register(name, email, password)
      
      if (response.success) {
        token.value = response.token
        currentUser.value = response.user
        
        // Lưu trữ token và thông tin người dùng
        localStorage.setItem('phone_analysis_token', response.token)
        localStorage.setItem('phone_analysis_user', JSON.stringify(response.user))
        
        return { success: true }
      }
      
      return { success: false, error: response.message || 'Đăng ký thất bại' }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, error: error.message || 'Đăng ký thất bại' }
    }
  }
  
  async function logout() {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = null
      currentUser.value = null
      localStorage.removeItem('phone_analysis_token')
      localStorage.removeItem('phone_analysis_user')
      router.push({ name: 'home' })
    }
  }
  
  function loadUserFromStorage() {
    try {
      const userStr = localStorage.getItem('phone_analysis_user')
      if (userStr) {
        currentUser.value = JSON.parse(userStr)
      }
    } catch (error) {
      console.error('Error loading user from storage:', error)
    }
  }
  
  // Gọi loadUserFromStorage ngay khi tạo store
  loadUserFromStorage()

  return {
    currentUser,
    token,
    isAuthenticated,
    login,
    register,
    logout
  }
})