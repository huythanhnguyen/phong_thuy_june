/**
 * Định dạng số điện thoại cho hiển thị
 * @param {string} phoneNumber - Số điện thoại gốc
 * @returns {string} - Số điện thoại đã định dạng
 */
export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    
    const cleaned = String(phoneNumber).replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{5})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    
    return cleaned;
  }
  
  /**
   * Định dạng ngày tháng
   * @param {string|Date} date - Ngày cần định dạng
   * @returns {string} - Chuỗi ngày đã định dạng
   */
  export function formatDate(date) {
    if (!date) return '';
    
    const dateObj = new Date(date);
    
    // Lấy ngày hiện tại và hôm qua để so sánh
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Định dạng giờ
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    
    // Định dạng ngày
    if (dateObj.toDateString() === today.toDateString()) {
      return `Hôm nay, ${time}`;
    } else if (dateObj.toDateString() === yesterday.toDateString()) {
      return `Hôm qua, ${time}`;
    } else {
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
  
  /**
   * Định dạng tin nhắn bot để hiển thị đẹp hơn
   * @param {string} text - Nội dung tin nhắn
   * @returns {string} - Nội dung đã định dạng
   */
  export function formatBotMessage(text) {
    if (!text) return '';
    
    // Thay thế định dạng đậm **text** bằng thẻ <strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Thêm class cho các đoạn có chứa tiêu đề in đậm để tạo khoảng cách
    formattedText = formattedText.replace(/(<strong>.*?<\/strong>)/g, '<span class="section-title">$1</span>');
    
    // Chia thành các đoạn và thêm class cho đoạn đầu tiên
    let paragraphs = formattedText.split('\n\n');
    
    // Xử lý từng đoạn
    paragraphs = paragraphs.map((paragraph, index) => {
      if (!paragraph.trim()) return '';
      
      // Kiểm tra nếu đoạn bắt đầu bằng tiêu đề
      if (paragraph.includes('<span class="section-title">')) {
        return `<p class="section-paragraph">${paragraph}</p>`;
      }
      
      return `<p>${paragraph}</p>`;
    });
    
    formattedText = paragraphs.join('');
    
    // Xử lý danh sách nếu có
    formattedText = formattedText.replace(/<p>- (.*?)<\/p>/g, '<li>$1</li>');
    formattedText = formattedText.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
    formattedText = formattedText.replace(/<\/ul><ul>/g, '');
    
    return formattedText;
  }