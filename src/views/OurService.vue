<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <main class="flex-grow">
  <div class="container mx-auto px-6 py-12">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Dịch Vụ Của Chúng Tôi</h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Phong Thủy Số cung cấp nhiều dịch vụ hỗ trợ bạn áp dụng nguyên lý phong thủy vào cuộc sống hàng ngày, từ việc chọn số điện thoại, số tài khoản đến phân tích thông tin cá nhân.
        </p>
        
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Chọn Số Điện Thoại -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-blue-100 to-blue-50 p-8 flex justify-center">
              <div class="text-6xl text-primary">
                <i class="fas fa-mobile-alt"></i>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-3">Chọn Số Điện Thoại</h2>
              <p class="text-gray-600 mb-4">
                Chọn số điện thoại hợp phong thủy mang lại may mắn và thuận lợi cho công việc, sức khỏe và các mối quan hệ.
              </p>
              <div class="flex justify-between items-center">
                <router-link to="/guides/chon-so-dien-thoai" class="text-primary font-medium flex items-center group">
                  <span>Khám phá ngay</span>
                  <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </router-link>
                <span class="px-3 py-1 rounded-full bg-teal-100 text-teal-600 text-sm font-medium">Miễn phí</span>
              </div>
            </div>
          </div>
          
          <!-- Chọn Mật Khẩu -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-green-100 to-green-50 p-8 flex justify-center">
              <div class="text-6xl text-primary">
                <i class="fas fa-key"></i>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-3">Chọn Mật Khẩu</h2>
              <p class="text-gray-600 mb-4">
                Tạo mật khẩu vừa an toàn vừa hợp phong thủy để thu hút năng lượng tích cực mỗi khi đăng nhập.
              </p>
              <div class="flex justify-between items-center">
                <router-link to="/guides/mat-khau" class="text-primary font-medium flex items-center group">
                  <span>Khám phá ngay</span>
                  <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </router-link>
                <span class="px-3 py-1 rounded-full bg-teal-100 text-teal-600 text-sm font-medium">Miễn phí</span>
              </div>
            </div>
          </div>
          
          <!-- Chọn Số Tài Khoản -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-yellow-100 to-yellow-50 p-8 flex justify-center">
              <div class="text-6xl text-primary">
                <i class="fas fa-credit-card"></i>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-3">Chọn Số Tài Khoản</h2>
              <p class="text-gray-600 mb-4">
                Lựa chọn số tài khoản ngân hàng phù hợp với mệnh và mục đích sử dụng để thu hút tài lộc, tiền bạc.
              </p>
              <div class="flex justify-between items-center">
                <router-link to="/guides/chon-so-ngan-hang" class="text-primary font-medium flex items-center group">
                  <span>Khám phá ngay</span>
                  <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </router-link>
                <span class="px-3 py-1 rounded-full bg-teal-100 text-teal-600 text-sm font-medium">Miễn phí</span>
              </div>
            </div>
          </div>
          
          <!-- Phân Tích Căn Cước Công Dân -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-red-100 to-red-50 p-8 flex justify-center">
              <div class="text-6xl text-primary">
                <i class="fas fa-id-card"></i>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-3">Căn Cước Công Dân</h2>
              <p class="text-gray-600 mb-4">
                Phân tích số căn cước công dân theo phong thủy và ý nghĩa các con số trong đó đối với cuộc sống của bạn.
              </p>
              <div class="flex justify-between items-center">
                <router-link to="/guides/can-cuoc-cong-dan" class="text-primary font-medium flex items-center group">
                  <span>Khám phá ngay</span>
                  <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </router-link>
                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">Cao cấp</span>
              </div>
            </div>
          </div>
          
          <!-- Bát Cực Linh Số -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-purple-100 to-purple-50 p-8 flex justify-center">
              <div class="text-6xl text-primary">
                <i class="fas fa-yin-yang"></i>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-3">Bát Cực Linh Số</h2>
              <p class="text-gray-600 mb-4">
                Tìm hiểu ý nghĩa sâu sắc về Bát Cực Linh Số - 8 hướng năng lượng và cách các con số tương ứng ảnh hưởng đến cuộc sống.
              </p>
              <div class="flex justify-between items-center">
                <router-link to="/guides/bat-cuc-linh-so" class="text-primary font-medium flex items-center group">
                  <span>Khám phá ngay</span>
                  <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </router-link>
                <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">Chuyên sâu</span>
              </div>
            </div>
          </div>
          
          <!-- Tư Vấn Phong Thủy -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="bg-gradient-to-r from-indigo-100 to-indigo-50 p-8 flex justify-center">
              <div class="text-6xl text-primary">
                <i class="fas fa-comments"></i>
              </div>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-3">Tư Vấn Phong Thủy</h2>
              <p class="text-gray-600 mb-4">
                Trò chuyện trực tiếp với trí tuệ nhân tạo được huấn luyện chuyên sâu về phong thủy để nhận lời khuyên cá nhân hóa.
              </p>
              <div class="flex justify-between items-center">
                <router-link to="/app" class="text-primary font-medium flex items-center group">
                  <span>Bắt đầu tư vấn</span>
                  <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </router-link>
                <span class="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-medium">Có phí</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Phần liên hệ -->
        <div class="mt-16 bg-primary-light rounded-xl p-8 text-center">
          <div class="text-5xl text-primary mb-4">
            <i class="fas fa-headset"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Cần hỗ trợ thêm?</h2>
          <p class="text-gray-600 mb-6">
            Nếu bạn muốn được tư vấn sâu hơn về phong thủy hoặc có nhu cầu đặc biệt, đừng ngại liên hệ với chúng tôi.
          </p>
          <router-link to="/contact" class="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors">
            <i class="fas fa-envelope mr-2"></i>
            Liên hệ ngay
          </router-link>
        </div>
    </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

// Thêm Font Awesome vào trang
onMounted(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  document.head.appendChild(link);
})

// Các đường dẫn cho trang dịch vụ
const services = ref([
  {
    title: 'Chọn Số Điện Thoại',
    description: 'Chọn số điện thoại hợp phong thủy mang lại may mắn và thuận lợi cho công việc, sức khỏe và các mối quan hệ.',
    path: '/guides/chon-so-dien-thoai',
    icon: 'fa-mobile-alt',
    type: 'Miễn phí',
    color: 'blue'
  },
  {
    title: 'Chọn Mật Khẩu',
    description: 'Tạo mật khẩu vừa an toàn vừa hợp phong thủy để thu hút năng lượng tích cực mỗi khi đăng nhập.',
    path: '/guides/mat-khau',
    icon: 'fa-key',
    type: 'Miễn phí',
    color: 'green'
  },
  {
    title: 'Chọn Số Tài Khoản',
    description: 'Lựa chọn số tài khoản ngân hàng phù hợp với mệnh và mục đích sử dụng để thu hút tài lộc, tiền bạc.',
    path: '/guides/chon-so-ngan-hang',
    icon: 'fa-credit-card',
    type: 'Miễn phí',
    color: 'yellow'
  },
  {
    title: 'Căn Cước Công Dân',
    description: 'Phân tích số căn cước công dân theo phong thủy và ý nghĩa các con số trong đó đối với cuộc sống của bạn.',
    path: '/guides/can-cuoc-cong-dan',
    icon: 'fa-id-card',
    type: 'Cao cấp',
    color: 'red'
  },
  {
    title: 'Bát Cực Linh Số',
    description: 'Tìm hiểu ý nghĩa sâu sắc về Bát Cực Linh Số - 8 hướng năng lượng và cách các con số tương ứng ảnh hưởng đến cuộc sống.',
    path: '/guides/bat-cuc-linh-so',
    icon: 'fa-yin-yang',
    type: 'Chuyên sâu',
    color: 'purple'
  },
  {
    title: 'Tư Vấn Phong Thủy',
    description: 'Trò chuyện trực tiếp với trí tuệ nhân tạo được huấn luyện chuyên sâu về phong thủy để nhận lời khuyên cá nhân hóa.',
    path: '/app',
    icon: 'fa-comments',
    type: 'Có phí',
    color: 'indigo'
  }
])
</script> 

<style scoped>
:root {
  --primary-color: #4361ee;
  --primary-light: #e7ecfd;
  --primary-dark: #3a50d8;
}

.text-primary { color: var(--primary-color); }
.bg-primary { background-color: var(--primary-color); }
.border-primary { border-color: var(--primary-color); }
.bg-primary-light { background-color: var(--primary-light); }
.bg-primary-dark { background-color: var(--primary-dark); }
.hover\:border-primary:hover { border-color: var(--primary-color); }
.hover\:bg-primary-dark:hover { background-color: var(--primary-dark); }

/* Hiệu ứng hover cho các thẻ dịch vụ */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}
</style> 