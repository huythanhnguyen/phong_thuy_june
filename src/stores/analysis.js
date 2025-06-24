import { defineStore } from 'pinia'
import { ref } from 'vue'
import analysisService from '../services/analysisService'

export const useAnalysisStore = defineStore('analysis', () => {
  // State
  const currentAnalysis = ref(null)
  const analysisHistory = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  
  // Actions
  async function analyzePhoneNumber(phoneNumber) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await analysisService.analyzePhoneNumber(phoneNumber)
      console.log('Received response in analyzePhoneNumber store:', response)
      
      if (response.success) {
        // Lưu kết quả phân tích
        currentAnalysis.value = response.analysisData || response.data || {}
        
        // Xác định nội dung hiển thị
        let displayContent = 'Đã phân tích số điện thoại.'
        
        // Ưu tiên lấy geminiResponse từ phân tích
        if (response.analysisData && response.analysisData.geminiResponse) {
          displayContent = response.analysisData.geminiResponse
        } 
        // Nếu không có geminiResponse, sử dụng content từ response
        else if (response.content) {
          displayContent = response.content
        }
        
        // Xây dựng và trả về kết quả đã định dạng
        return { 
          success: true, 
          content: displayContent,
          analysisData: currentAnalysis.value
        }
      } else {
        error.value = response.message || response.error || 'Không thể phân tích số điện thoại'
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error analyzing phone number in store:', err)
      error.value = err.message || 'Đã xảy ra lỗi khi phân tích số điện thoại'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  async function fetchAnalysisHistory(page = 1, limit = 20) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await analysisService.getAnalysisHistory(limit, page)
      
      if (response.success && response.data) {
        analysisHistory.value = response.data
        return { success: true, data: response.data, pagination: response.pagination }
      } else {
        analysisHistory.value = []
        return { success: false, error: response.message || 'Không thể tải lịch sử phân tích' }
      }
    } catch (err) {
      console.error('Error fetching history:', err)
      error.value = err.message || 'Đã xảy ra lỗi khi tải lịch sử phân tích'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }
  
  async function clearAnalysisHistory() {
    try {
      const response = await analysisService.deleteAnalysisHistory()
      
      if (response.success) {
        analysisHistory.value = []
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Không thể xóa lịch sử phân tích' }
      }
    } catch (err) {
      console.error('Error clearing history:', err)
      return { success: false, error: err.message || 'Đã xảy ra lỗi khi xóa lịch sử phân tích' }
    }
  }
  
  async function askQuestion(payload) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await analysisService.askQuestion(payload)
      
      if (response.success) {
        return { success: true, data: response.data || response }
      } else {
        error.value = response.message || 'Không thể xử lý câu hỏi'
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error asking question:', err)
      error.value = err.message || 'Đã xảy ra lỗi khi xử lý câu hỏi'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentAnalysis,
    analysisHistory,
    isLoading,
    error,
    analyzePhoneNumber,
    fetchAnalysisHistory,
    clearAnalysisHistory,
    askQuestion
  }
})