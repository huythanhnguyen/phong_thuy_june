<template>
  <!-- Header -->
  <header class="bg-white shadow-lg sticky top-0 z-20 border-b border-gray-200">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo và tên -->
      <div class="flex items-center space-x-4">
        <router-link to="/" class="flex items-center space-x-4">
          <div class="h-12 w-12 bg-primary-light flex items-center justify-center shadow-md">
            <font-awesome-icon icon="phone-alt" class="text-primary text-xl" />
          </div>
          <span class="font-bold text-2xl text-gray-800 tracking-wide">Phong Thủy Số</span>
        </router-link>
      </div>

      <!-- Menu desktop -->
      <nav class="hidden md:flex space-x-6">
        <router-link to="/" class="text-gray-700 hover:text-primary transition duration-300">Giới thiệu</router-link>
        <router-link to="/guides/bat-cuc-linh-so" class="text-gray-700 hover:text-primary transition duration-300">Bát cực linh số</router-link>
        <router-link to="/our-service" class="text-gray-700 hover:text-primary transition duration-300">Dịch vụ</router-link>
        <router-link to="/pricing" class="text-gray-700 hover:text-primary transition duration-300">Giá cả</router-link>
      </nav>

      <!-- Nút đăng nhập/đăng ký trên desktop -->
      <div class="hidden md:flex space-x-4">
        <button @click="navigateToLogin" class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300 shadow-md">
          Đăng nhập
        </button>
        <button @click="navigateToRegister" class="px-6 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 shadow-md">
          Đăng ký
        </button>
      </div>

      <!-- Nút hamburger mobile -->
      <button @click="toggleMobileMenu" class="md:hidden text-gray-700 focus:outline-none">
        <font-awesome-icon :icon="isMobileMenuOpen ? 'times' : 'bars'" class="text-2xl" />
      </button>
    </div>

    <!-- Menu mobile -->
    <transition name="slide-scale">
      <div v-show="isMobileMenuOpen" class="md:hidden fixed inset-0 bg-black bg-opacity-60 z-30" @click="toggleMobileMenu">
        <div class="absolute top-0 right-0 w-4/5 h-full bg-white shadow-2xl transform transition-all duration-300 ease-in-out" :class="{ 'translate-x-0': isMobileMenuOpen, 'translate-x-full': !isMobileMenuOpen }" @click.stop>
          <!-- Header của menu mobile -->
          <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <div class="flex items-center space-x-2">
              <div class="h-8 w-8 bg-primary-light flex items-center justify-center">
                <font-awesome-icon icon="phone-alt" class="text-primary text-sm" />
              </div>
              <span class="font-bold text-lg text-gray-800">Phong Thủy Số</span>
            </div>
            <button @click="toggleMobileMenu" class="w-8 h-8 bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition duration-300">
              <font-awesome-icon icon="times" class="text-gray-700" />
            </button>
          </div>

          <!-- Nội dung menu mobile -->
          <div class="px-6 py-6 space-y-6">
            <router-link to="/" @click="toggleMobileMenu" class="flex items-center space-x-3 py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-100 transition duration-300 text-xl shadow-sm">
              <font-awesome-icon icon="home" class="text-primary" />
              <span>Trang chủ</span>
            </router-link>
            <router-link to="/guides/bat-cuc-linh-so" @click="toggleMobileMenu" class="flex items-center space-x-3 py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-100 transition duration-300 text-xl shadow-sm">
              <font-awesome-icon icon="compass" class="text-primary" />
              <span>Bát cực linh số</span>
            </router-link>
            <router-link to="/our-service" @click="toggleMobileMenu" class="flex items-center space-x-3 py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-100 transition duration-300 text-xl shadow-sm">
              <font-awesome-icon icon="tools" class="text-primary" />
              <span>Dịch vụ</span>
            </router-link>
            <router-link to="/pricing" @click="toggleMobileMenu" class="flex items-center space-x-3 py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-100 transition duration-300 text-xl shadow-sm">
              <font-awesome-icon icon="tags" class="text-primary" />
              <span>Giá cả</span>
            </router-link>

            <!-- Nút đăng nhập/đăng ký trên mobile -->
            <div class="mt-8 space-y-4">
              <button @click="navigateToLogin" class="w-full py-3 px-5 bg-primary text-white font-medium hover:bg-primary-dark transition duration-300 text-lg shadow-md">
                Đăng nhập
              </button>
              <button @click="navigateToRegister" class="w-full py-3 px-5 bg-white text-gray-800 font-medium border border-gray-300 hover:bg-gray-100 transition duration-300 text-lg shadow-md">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateToLogin = () => {
  router.push({ name: 'login' })
  isMobileMenuOpen.value = false
}

const navigateToRegister = () => {
  router.push({ name: 'login', query: { tab: 'register' } })
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
:root {
  --primary-color: #4361ee;
  --primary-light: #e7ecfd;
  --primary-dark: #3a50d8;
}

.text-primary { color: var(--primary-color); }
.bg-primary { background-color: var(--primary-color); }
.bg-primary-light { background-color: var(--primary-light); }
.bg-primary-dark { background-color: var(--primary-dark); }
.hover\:text-primary:hover { color: var(--primary-color); }
.hover\:bg-primary-dark:hover { background-color: var(--primary-dark); }

/* Hiệu ứng slide-scale */
.slide-scale-enter-active, .slide-scale-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-scale-enter-from, .slide-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide-scale-enter-to, .slide-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>