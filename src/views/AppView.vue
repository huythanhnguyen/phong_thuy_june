<template>
  <div id="app-container">
    <!-- Sidebar -->
    <Sidebar 
      :is-active="sidebarActive" 
      @close="closeSidebar"
    />
    
    <!-- Mobile overlay -->
    <div class="mobile-overlay" :class="{ active: sidebarActive }" @click="closeSidebar"></div>
    
    <!-- Main Content -->
    <div class="main-content">
      <!-- App Header -->
      <AppHeader 
        @toggle-sidebar="toggleSidebar"
        @show-password-modal="showPasswordModal = true"
      />
      
      <!-- Chat Container -->
      <div class="chat-container">
        <!-- Welcome Banner -->
        <div class="welcome-banner" v-if="messages.length === 0">
          <div class="user-welcome">
            <h2>Xin chào, {{ userName }}</h2>
            <p>Hãy nhập số điện thoại để phân tích hoặc đặt câu hỏi.</p>
          </div>
        </div>
        
        <!-- Chat Messages -->
        <div class="chat-messages" ref="messagesRef">
          <ChatMessage 
            v-for="(message, index) in messages" 
            :key="message.id" 
            :message="message"
            :is-last-message="index === messages.length - 1"
            @question-select="handleQuestionSelect"
            @category-select="handleCategorySelect"
          />
        </div>
        
        <!-- Typing Indicator -->
        <TypingIndicator :is-typing="isTyping" />
        
        <!-- Chat Input Area -->
        <div class="chat-input-area">
          <QuestionCounter :remaining-questions="remainingQuestions" />
          <ChatInput 
            :is-disabled="isTyping"
            @send="handleSendMessage"
          />
        </div>
      </div>
    </div>
    
    <!-- Password change modal -->
    <ModalDialog 
      v-model="showPasswordModal"
      title="Đổi Mật Khẩu"
    >
      <PasswordChangeForm 
        @close="showPasswordModal = false"
        @success="handlePasswordChangeSuccess"
      />
    </ModalDialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

// Components
import Sidebar from '@/components/layout/Sidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import TypingIndicator from '@/components/chat/TypingIndicator.vue'
import QuestionCounter from '@/components/chat/QuestionCounter.vue'
import ModalDialog from '@/components/layout/ModalDialog.vue'
import PasswordChangeForm from '@/components/auth/PasswordChangeForm.vue'

const router = useRouter()
const authStore = useAuthStore()
const chatStore = useChatStore()

// Refs
const messagesRef = ref(null)

// State
const sidebarActive = ref(false)
const showPasswordModal = ref(false)

// Computed from stores
const userName = computed(() => {
  return authStore.currentUser?.name || 'Người dùng'
})

const messages = computed(() => chatStore.messages)
const isTyping = computed(() => chatStore.isTyping)
const remainingQuestions = computed(() => chatStore.remainingQuestions)

// Methods
const toggleSidebar = () => {
  sidebarActive.value = !sidebarActive.value
}

const closeSidebar = () => {
  sidebarActive.value = false
}

const handleSendMessage = (text) => {
  chatStore.processUserInput(text)
}

const handleQuestionSelect = (question) => {
  chatStore.processUserInput(question)
}

const handleCategorySelect = (question) => {
  chatStore.processUserInput(question)
}

const handlePasswordChangeSuccess = () => {
  showPasswordModal.value = false
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

// Watch for changes to scroll to bottom
watch(() => messages.value.length, scrollToBottom)
watch(() => isTyping.value, scrollToBottom)

// Initialization
onMounted(() => {
  // Check if authenticated
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login' })
    return
  }
  
  // Initialize chat
  chatStore.clearChat()
  
  // Scroll to bottom on initial load
  scrollToBottom()
})
</script>

<style scoped>
#app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background-color, #f5f7fa);
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.chat-input-area {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: white;
  border-top: 1px solid var(--border-color, #e1e4e8);
}

.welcome-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  text-align: center;
  background-color: white;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.user-welcome h2 {
  color: var(--primary-color, #4361ee);
  font-weight: 600;
  margin-bottom: 16px;
}

.user-welcome p {
  color: var(--text-secondary, #6c757d);
  max-width: 600px;
  margin-bottom: 24px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.mobile-overlay.active {
  display: block;
}

/* Responsive */
@media (max-width: 768px) {
  .welcome-banner {
    margin: 10px;
  }
  
  .user-welcome h2 {
    font-size: 1.3rem;
  }
  
  .user-welcome p {
    font-size: 0.95rem;
  }
  
  .chat-input-area {
    padding: 8px 12px;
  }
}
</style>