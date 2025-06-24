import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAnalysisStore } from './analysis'
import analysisService from '@/services/analysisService'

export const useChatStore = defineStore('chat', () => {
  // State
  const messages = ref([])
  const isTyping = ref(false)
  const remainingQuestions = ref(0)
  const showQuotaAlert = ref(false)
  const context = ref({
    lastInputType: null,  // 'phone', 'question', 'followup', 'general'
    lastPhoneNumber: null,
    questionCount: 0
  })
  
  // Actions
  function addUserMessage(text) {
    const messageId = `msg_user_${Date.now()}`
    messages.value.push({
      id: messageId,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    })
    return messageId
  }
  
  function addBotMessage(text, analysisData = null) {
    const messageId = `msg_bot_${Date.now()}`
    messages.value.push({
      id: messageId,
      role: 'assistant',
      content: text,
      analysisData,
      timestamp: new Date().toISOString()
    })
    return messageId
  }
  
  function clearChat() {
    messages.value = []
    context.value = {
      lastInputType: null,
      lastPhoneNumber: null,
      questionCount: 0
    }
    
    // Thêm tin nhắn chào mừng khi xóa chat
    addBotMessage('Xin chào! Tôi là trợ lý phân tích số điện thoại theo phương pháp Tứ Cát Tứ Hung. Bạn có thể nhập số điện thoại để tôi phân tích hoặc đặt câu hỏi về ý nghĩa các con số.')
  }
  
  function setShowQuotaAlert(value) {
    showQuotaAlert.value = value
  }
  
  function updateRemainingQuestions(newValue) {
    if (typeof newValue === 'number') {
      remainingQuestions.value = newValue
    }
  }
  
  async function fetchRemainingQuestions() {
    try {
      const response = await analysisService.getRemainingQuestions()
      if (response.success) {
        // Xử lý cả trường hợp data là object hoặc số trực tiếp
        if (response.data !== undefined) {
          if (typeof response.data === 'object' && response.data !== null) {
            // Trường hợp data là object có chứa remainingQuestions
            remainingQuestions.value = response.data.remainingQuestions || 0
          } else {
            // Trường hợp data là số trực tiếp
            remainingQuestions.value = parseInt(response.data) || 0
          }
        }
        
        // Hiển thị cảnh báo nếu hết câu hỏi và chưa hiển thị
        if (remainingQuestions.value === 0 && !showQuotaAlert.value) {
          const lastAlertTime = localStorage.getItem('quota_alert_shown_time')
          const now = new Date().getTime()
          
          // Chỉ hiển thị lại nếu đã qua 7 ngày kể từ lần cuối
          if (!lastAlertTime || (now - parseInt(lastAlertTime)) / (1000 * 60 * 60 * 24) >= 7) {
            showQuotaAlert.value = true
          }
        }
      }
      return response
    } catch (error) {
      console.error('Error fetching remaining questions:', error)
      return { success: false, error: error.message }
    }
  }
  
  // Phát hiện loại đầu vào: số điện thoại, câu hỏi, hoặc follow-up
  function detectInputType(text) {
    // Xử lý text trước khi phân tích
    const input = text.trim()
    const types = []
    
    // Kiểm tra nếu là số điện thoại
    const phoneRegex = /^(0|\+84)(\d{9,10})$/  // Mẫu số điện thoại VN
    const hasPhoneNumber = phoneRegex.test(input.replace(/\s+/g, '')) || /^\d{10,11}$/.test(input.replace(/\s+/g, ''))
    
    if (hasPhoneNumber) {
      types.push('phone')
    }
    
    // Kiểm tra nếu là câu hỏi
    const isQuestion = input.includes('?') || 
                       input.toLowerCase().startsWith('tại sao') ||
                       input.toLowerCase().startsWith('làm sao') ||
                       input.toLowerCase().startsWith('như thế nào') ||
                       input.toLowerCase().startsWith('có phải') ||
                       input.toLowerCase().startsWith('ý nghĩa') ||
                       input.toLowerCase().includes('nghĩa là gì')
    
    if (isQuestion) {
      types.push('question')
      
      // Kiểm tra thêm nếu là follow-up question
      if (context.value.lastInputType && 
          (context.value.lastInputType === 'phone' || 
           context.value.lastInputType === 'question' ||
           context.value.lastInputType === 'followup')) {
        types.push('followup')
      }
    }
    
    // Nếu không phát hiện được loại cụ thể, coi là trò chuyện chung
    if (types.length === 0) {
      types.push('general')
    }
    
    return types
  }
  
  async function processUserInput(input) {
    if (isTyping.value) return
    
    // Kiểm tra nếu hết câu hỏi và không phải input số điện thoại
    if (remainingQuestions.value === 0 && !detectInputType(input).includes('phone')) {
      addUserMessage(input)
      addBotMessage('Bạn đã hết số lượng câu hỏi. Vui lòng nạp thêm câu hỏi để tiếp tục sử dụng dịch vụ.')
      
      // Hiển thị cảnh báo nếu chưa hiển thị
      if (!showQuotaAlert.value) {
        showQuotaAlert.value = true
      }
      
      return
    }
    
    // Thêm tin nhắn người dùng
    addUserMessage(input)
    
    // Phát hiện loại đầu vào
    const inputType = detectInputType(input)
    
    // Hiển thị trạng thái đang nhập
    isTyping.value = true
    
    // Xử lý theo loại đầu vào
    const analysisStore = useAnalysisStore()
    
    try {
      // Nếu là số điện thoại
      if (inputType.includes('phone')) {
        // Cập nhật context
        context.value.lastInputType = 'phone'
        context.value.lastPhoneNumber = input.replace(/\s+/g, '')
        
        try {
          // Gọi API để phân tích số điện thoại
          const phoneNumberString = context.value.lastPhoneNumber.toString()
          console.log('Sending phone number for analysis:', phoneNumberString)
          
          // Hiển thị trạng thái đang xử lý
          isTyping.value = true
          
          const result = await analysisStore.analyzePhoneNumber(phoneNumberString)
          console.log('Analysis result:', result)
          
          if (result.success) {
            // Hiển thị kết quả phân tích
            if (result.analysisData && result.analysisData.geminiResponse) {
              // Nếu có geminiResponse trong kết quả, hiển thị nó thay vì content mặc định
              addBotMessage(result.analysisData.geminiResponse, result.analysisData)
            } else {
              // Nếu không có geminiResponse, sử dụng content từ result
              addBotMessage(result.content || 'Đã phân tích số điện thoại.', result.analysisData || null)
            }
          } else {
            addBotMessage(result.error || 'Không thể phân tích số điện thoại. Vui lòng thử lại sau.')
          }
        } catch (error) {
          console.error('Error analyzing phone number in chat:', error)
          addBotMessage('Đã xảy ra lỗi khi phân tích số điện thoại. Vui lòng thử lại sau.')
        } finally {
          isTyping.value = false
        }
      } else {
        // Cập nhật context
        if (inputType.includes('question') || inputType.includes('followup')) {
          context.value.questionCount++
        }
        context.value.lastInputType = inputType.includes('followup') ? 'followup' : 'question'
        
        // Tạo payload cho câu hỏi
        const questionPayload = {
          question: input,
          phoneNumber: context.value.lastPhoneNumber || '',
          type: inputType.includes('followup') ? 'followup' : 'question',
          questionNumber: context.value.questionCount
        }
        
        try {
          // Gọi API để xử lý câu hỏi
          const questionResult = await analysisStore.askQuestion(questionPayload)
          
          if (questionResult.success && questionResult.data) {
            // Xác định nội dung phản hồi từ API
            let response = ''
            const data = questionResult.data
            
            if (data.geminiResponse) {
              response = data.geminiResponse
            } else if (data.answer) {
              response = data.answer
            } else if (typeof data === 'string') {
              response = data
            } else {
              response = 'Đã xử lý câu hỏi của bạn.'
            }
            
            // Thêm tin nhắn bot với dữ liệu phân tích nếu có
            addBotMessage(response, data.analysis || null)
          } else {
            // Kiểm tra nếu lỗi liên quan đến hết quota
            if (questionResult.statusCode === 402 || 
                (questionResult.error && questionResult.error.toLowerCase().includes('hết') && 
                questionResult.error.toLowerCase().includes('câu hỏi'))) {
              
              // Cập nhật số câu hỏi còn lại
              remainingQuestions.value = 0
              
              // Hiển thị thông báo hết quota
              showQuotaAlert.value = true
              
              // Thêm thông báo bot
              addBotMessage('Bạn đã hết số lượng câu hỏi. Vui lòng nạp thêm câu hỏi để tiếp tục sử dụng dịch vụ.')
            } else {
              // Hiển thị lỗi thông thường từ API
              addBotMessage(questionResult.error || 'Không thể xử lý câu hỏi của bạn. Vui lòng thử lại sau.')
            }
          }
        } catch (error) {
          // Kiểm tra nếu lỗi liên quan đến hết quota từ response
          if (error.response && error.response.status === 402) {
            remainingQuestions.value = 0
            showQuotaAlert.value = true
            addBotMessage('Bạn đã hết số lượng câu hỏi. Vui lòng nạp thêm câu hỏi để tiếp tục sử dụng dịch vụ.')
          } else {
            console.error('Error processing question:', error)
            addBotMessage('Đã xảy ra lỗi khi xử lý câu hỏi. Vui lòng thử lại sau.')
          }
        } finally {
          isTyping.value = false
        }
      }
      
      // Cập nhật số câu hỏi còn lại sau khi chat
      await fetchRemainingQuestions()
      
    } catch (e) {
      console.error('General error in processUserInput:', e)
      addBotMessage('Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.')
      isTyping.value = false
    }
  }

  return {
    // State
    messages,
    isTyping,
    remainingQuestions,
    showQuotaAlert,
    context,
    
    // Actions
    addUserMessage,
    addBotMessage,
    clearChat,
    processUserInput,
    fetchRemainingQuestions,
    setShowQuotaAlert,
    updateRemainingQuestions
  }
})