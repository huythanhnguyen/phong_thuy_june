<template>
  <header class="app-header">
    <!-- Header bên trái (mobile) -->
    <div class="header-left">
      <button class="toggle-sidebar-btn" @click="toggleSidebar">
        <font-awesome-icon icon="bars" />
      </button>
      
      <!-- Home button -->
      <router-link to="/" class="home-btn" title="Trang chủ">
        <font-awesome-icon icon="home" />
      </router-link>
      
      <!-- Dropdown menu cho các dịch vụ -->
      <div class="service-selector" :class="{ active: serviceDropdownOpen }">
        <div class="current-service" @click="toggleServiceDropdown">
          <span>Phân Tích Số Điện Thoại</span>
          <font-awesome-icon icon="chevron-down" />
        </div>
        <div class="service-dropdown" v-if="serviceDropdownOpen">
          <router-link to="/universal-analysis" class="service-item">
            <font-awesome-icon icon="calculator" /> Phân Tích Tổng Hợp
          </router-link>
          <a href="#" class="service-item active">
            <font-awesome-icon icon="phone" /> Số Điện Thoại
          </a>
          <a href="#" class="service-item">
            <font-awesome-icon icon="id-card" /> Căn Cước Công Dân
          </a>
          <a href="#" class="service-item">
            <font-awesome-icon icon="credit-card" /> Thẻ Ngân Hàng
          </a>
        </div>
      </div>
    </div>
    
    <!-- Header bên phải -->
    <div class="header-right">
      <!-- Universal Analysis Button -->
      <router-link to="/universal-analysis" class="universal-analysis-btn">
        <font-awesome-icon icon="calculator" />
        <span>Phân Tích Tổng Hợp</span>
      </router-link>
      
      <!-- Hiển thị số câu hỏi còn lại -->
      <div class="remaining-questions-display" :title="`Bạn còn ${remainingQuestions} câu hỏi`">
        <font-awesome-icon icon="question-circle" />
        <span class="question-count" :class="questionCountClass">{{ remainingQuestions }}</span>
      </div>
      
      <button class="clear-button-mobile" title="Xóa cuộc trò chuyện" @click="confirmClearChat">
        <font-awesome-icon icon="trash-alt" />
      </button>
      
      <!-- User account dropdown -->
      <div class="user-account-dropdown" :class="{ active: userDropdownOpen }">
        <button class="user-avatar" @click="toggleUserDropdown">
          <font-awesome-icon icon="user-circle" />
        </button>
        <div class="account-dropdown-menu" v-if="userDropdownOpen">
          <div class="account-info">
            <p><strong>Tên:</strong> <span>{{ user?.name || 'Người dùng' }}</span></p>
            <p><strong>Email:</strong> <span>{{ user?.email || '' }}</span></p>
            <p><strong>Ngày tạo:</strong> <span>{{ formatCreatedDate }}</span></p>
            
            <!-- Hiển thị thông tin quota -->
            <div class="quota-info">
              <div class="quota-label">Câu hỏi còn lại:</div>
              <div class="quota-value" :class="questionCountClass">
                <font-awesome-icon icon="question-circle" />
                {{ remainingQuestions }}
              </div>
            </div>
          </div>
          
          <div class="account-actions">
            <router-link to="/payment" class="dropdown-btn payment-btn">
              <font-awesome-icon icon="plus-circle" /> Nạp thêm câu hỏi
            </router-link>
            
            <button class="dropdown-btn" @click="showPasswordModal">
              <font-awesome-icon icon="key" /> Đổi Mật Khẩu
            </button>
            
            <button class="dropdown-btn danger" @click="confirmLogout">
              <font-awesome-icon icon="sign-out-alt" /> Đăng Xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'  
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'
import { formatDate } from '@/utils'

const authStore = useAuthStore()
const chatStore = useChatStore()
const router = useRouter()  

// User state
const user = computed(() => authStore.currentUser)
const formatCreatedDate = computed(() => {
  return user.value?.createdAt ? formatDate(user.value.createdAt) : ''
})

// Remaining questions
const remainingQuestions = computed(() => chatStore.remainingQuestions)
const questionCountClass = computed(() => {
  if (remainingQuestions.value > 10) return 'count-high'
  if (remainingQuestions.value >= 5) return 'count-medium'
  return 'count-low'
})

// Dropdown states
const serviceDropdownOpen = ref(false)
const userDropdownOpen = ref(false)

// Methods
const toggleSidebar = () => {
  // Emit event để component cha xử lý
  emit('toggle-sidebar')
}

const toggleServiceDropdown = () => {
  serviceDropdownOpen.value = !serviceDropdownOpen.value
  // Đóng dropdown khác nếu mở
  if (serviceDropdownOpen.value) userDropdownOpen.value = false
}

const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
  // Đóng dropdown khác nếu mở
  if (userDropdownOpen.value) serviceDropdownOpen.value = false
}

const confirmClearChat = () => {
  if (confirm('Bạn có chắc muốn xóa cuộc trò chuyện hiện tại?')) {
    chatStore.clearChat()
  }
}

const confirmLogout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    authStore.logout()
   // Sau khi logout, điều hướng về trang chủ
   router.push({ name: 'home' })
  }
}

const showPasswordModal = () => {
  // Emit event để component cha xử lý
  emit('show-password-modal')
  userDropdownOpen.value = false
}

// Define emits
const emit = defineEmits(['toggle-sidebar', 'show-password-modal'])

// Handle click outside to close dropdowns
const handleClickOutside = (event) => {
  const serviceSelector = document.querySelector('.service-selector')
  const userDropdown = document.querySelector('.user-account-dropdown')
  
  if (serviceSelector && !serviceSelector.contains(event.target)) {
    serviceDropdownOpen.value = false
  }
  
  if (userDropdown && !userDropdown.contains(event.target)) {
    userDropdownOpen.value = false
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  // Make sure we have the latest remaining questions
  await chatStore.fetchRemainingQuestions()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: var(--primary-color);
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Universal Analysis Button */
.universal-analysis-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.universal-analysis-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.universal-analysis-btn span {
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .universal-analysis-btn span {
    display: none;
  }
  
  .universal-analysis-btn {
    padding: 8px 10px;
  }
}

/* Remaining Questions Display */
.remaining-questions-display {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 10px;
  border-radius: 16px;
  font-size: 0.9rem;
  cursor: help;
}

.question-count {
  font-weight: 600;
}

.count-high {
  color: #c8f7c5;
}

.count-medium {
  color: #ffecb5;
}

.count-low {
  color: #ffcdd2;
}

/* Toggle Sidebar Button (mobile) */
.toggle-sidebar-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-sidebar-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Home Button */
.home-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.home-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

/* Quota info in dropdown */
.quota-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--border-color, #e0e0e0);
}

.quota-label {
  font-size: 0.9rem;
  color: var(--text-secondary, #6c757d);
}

.quota-value {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 1rem;
}

/* Payment button */
.payment-btn {
  background-color: var(--primary-light, #e7ecfd);
  color: var(--primary-color, #4361ee);
  border-color: var(--primary-color, #4361ee);
  font-weight: 600;
}

.payment-btn:hover {
  background-color: var(--primary-color, #4361ee);
  color: white;
}

/* Service Selector Dropdown */
.service-selector {
  position: relative;
}

.current-service {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: var(--radius-md, 8px);
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
}

.current-service:hover {
  background: rgba(255, 255, 255, 0.3);
}

.current-service span {
  font-weight: 600;
  font-size: 1rem;
}

.service-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 220px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 8px 8px;
  z-index: 100;
  margin-top: 4px;
  padding: 8px 0;
  animation: fadeInDown 0.2s ease-out;
}

.service-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: var(--text-primary, #212529);
  text-decoration: none;
  gap: 10px;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.service-item:hover {
  background-color: var(--primary-light, #e7ecfd);
  color: var(--primary-color, #4361ee);
}

.service-item.active {
  background-color: var(--primary-light, #e7ecfd);
  color: var(--primary-color, #4361ee);
  font-weight: 600;
}

/* User Account Dropdown */
.user-account-dropdown {
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.user-avatar:hover {
  background: rgba(255, 255, 255, 0.3);
}

.account-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 240px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  z-index: 100;
  margin-top: 8px;
  padding: 16px;
  animation: fadeInDown 0.2s ease-out;
}

.account-info {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  margin-bottom: 12px;
}

.account-info p {
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--text-primary, #212529);
}

.account-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dropdown-btn {
  background: none;
  border: 1px solid var(--border-color, #e0e0e0);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  color: var(--text-primary, #212529);
}

.dropdown-btn:hover {
  background-color: var(--primary-light, #e7ecfd);
  color: var(--primary-color, #4361ee);
  border-color: var(--primary-color, #4361ee);
}

.dropdown-btn.danger {
  color: var(--danger-color, #f44336);
}

.dropdown-btn.danger:hover {
  background-color: var(--danger-light, #ffebee);
  border-color: var(--danger-color, #f44336);
}

/* Clear Chat Button */
.clear-button-mobile {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-button-mobile:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animations */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .current-service span {
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>