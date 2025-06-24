import { apiClient, API_CONFIG } from './api'

const authService = {
  /**
   * Đăng nhập với email và mật khẩu
   * @param {string} email - Email người dùng
   * @param {string} password - Mật khẩu
   * @returns {Promise} - Kết quả đăng nhập
   */
  async login(email, password) {
    try {
      const response = await apiClient.post(API_CONFIG.AUTH.LOGIN, { email, password })
      return response
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: error.message }
    }
  },
  
  /**
   * Đăng ký tài khoản mới
   * @param {string} name - Tên người dùng
   * @param {string} email - Email
   * @param {string} password - Mật khẩu
   * @returns {Promise} - Kết quả đăng ký
   */
  async register(name, email, password) {
    try {
      const response = await apiClient.post(API_CONFIG.AUTH.REGISTER, { name, email, password })
      return response
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, message: error.message }
    }
  },
  
  /**
   * Đăng xuất
   * @returns {Promise} - Kết quả đăng xuất
   */
  async logout() {
    try {
      try {
        // Thử gọi API, nhưng không báo lỗi nếu nó fail
        await apiClient.post(API_CONFIG.AUTH.LOGOUT)
      } catch (apiError) {
        // Bỏ qua lỗi API, chỉ log ra console
        console.log('API logout không khả dụng:', apiError.message)
      }
      
      // Luôn trả về success=true, vì chúng ta sẽ logout ở client side dù sao
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, message: error.message }
    }
  },
  
  /**
   * Thay đổi mật khẩu
   * @param {string} currentPassword - Mật khẩu hiện tại
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise} - Kết quả thay đổi mật khẩu
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.post(API_CONFIG.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword
      })
      return response
    } catch (error) {
      console.error('Change password error:', error)
      return { success: false, message: error.message }
    }
  },
  
  /**
   * Xác thực token
   * @returns {Promise} - Kết quả xác thực token
   */
  async verifyToken() {
    try {
      const response = await apiClient.get(API_CONFIG.AUTH.VERIFY_TOKEN)
      return { valid: true, user: response.user }
    } catch (error) {
      console.error('Verify token error:', error)
      return { valid: false, message: error.message }
    }
  },
  
  /**
   * Lấy thông tin người dùng hiện tại
   * @returns {Object|null} - Thông tin người dùng hoặc null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('phone_analysis_user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
    return null
  },
  
  /**
   * Kiểm tra xác thực
   * @returns {boolean} - true nếu đã đăng nhập, false nếu chưa
   */
  isAuthenticated() {
    return !!localStorage.getItem('phone_analysis_token')
  }
}

export default authService