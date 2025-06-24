<template>
    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 py-12 mt-auto">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Phong Thủy Số</h3>
            <p class="text-sm opacity-75">
              Giải mã ý nghĩa con số trong cuộc sống của bạn. Chúng tôi giúp bạn hiểu và tận dụng năng lượng của các con số.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Liên kết</h3>
            <ul class="space-y-2">
              <li><router-link to="/" class="hover:text-white">Giới thiệu</router-link></li>
              <li><router-link to="/guides/bat-cuc-linh-so" class="hover:text-white">Bát Cực Linh Số</router-link></li>
              <li><router-link to="/pricing" class="hover:text-white">Giá cả</router-link></li>
              <li><router-link to="/tc" class="hover:text-white">Điều khoản sử dụng</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul class="space-y-2">
              <li><router-link to="/guides/chon-so-dien-thoai" class="hover:text-white">Chọn Số Điện Thoại</router-link></li>
              <li><router-link to="/guides/mat-khau" class="hover:text-white">Tư Vấn Chọn Mật Khẩu</router-link></li>
              <li><router-link to="/guides/can-cuoc-cong-dan" class="hover:text-white">Phân Tích Căn Cước Công Dân</router-link></li>
              <li><router-link to="/guides/chon-so-ngan-hang" class="hover:text-white">Phân Tích Số Tài Khoản</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <font-awesome-icon icon="envelope" class="mr-2" />
                <a href="mailto:contact@phongthuyso.vn" class="hover:text-white">contact@phongthuyso.vn</a>
              </li>
              <li class="flex items-center">
                <font-awesome-icon icon="phone" class="mr-2" />
                <a href="tel:+84123456789" class="hover:text-white">0123 456 789</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-10 pt-6 text-sm text-center">
          &copy; {{ currentYear }} Phong Thủy Số - Mọi quyền được bảo lưu
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Computed property cho năm hiện tại
  const currentYear = computed(() => new Date().getFullYear())
  </script>
  
  <style scoped>
  /* Thêm CSS tùy chỉnh nếu cần */
  </style>