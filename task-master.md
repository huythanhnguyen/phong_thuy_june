# Task Master: Phong Thủy Số

## Giới thiệu
Tài liệu này chứa danh sách các nhiệm vụ cần thực hiện để phát triển dự án Phong Thủy Số. Mỗi task được phân loại theo chức năng, độ ưu tiên, và trạng thái hiện tại.

## Quy trình quản lý task
1. Mỗi task được đánh dấu với các thông tin: ID, tiêu đề, mô tả, độ ưu tiên (P0-P3), trạng thái, người được phân công, ngày bắt đầu dự kiến và deadline
2. Các trạng thái task: `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`, `BLOCKED`
3. Cập nhật tiến độ hàng ngày vào progress log

## Tính năng/trang đã hoàn thành

### Trang cơ bản
- [x] Trang chủ (HomeView.vue)
- [x] Trang đăng nhập (LoginView.vue)
- [x] Trang ứng dụng chính (AppView.vue)
- [x] Trang thanh toán (PaymentView.vue - Giả lập)
- [x] Trang điều khoản sử dụng (TC.vue)

### Các trang hướng dẫn
- [x] Bát Cục Linh Số (BatCucLinhSo.vue)
- [x] Chọn số điện thoại (ChonSoDienThoai.vue - Phiên bản cơ bản)
- [x] Chọn số ngân hàng (ChonSoNganHang.vue - Phiên bản cơ bản)
- [x] Căn cước công dân (CanCuocCongDan.vue)
- [x] Mật khẩu (MatKhau.vue - Phiên bản cơ bản)

### Tính năng đã hoàn thành
- [x] Xác thực người dùng (đăng nhập, đăng ký)
- [x] Phân tích số điện thoại cơ bản
- [x] Hiển thị kết quả phân tích
- [x] Lưu lịch sử phân tích
- [x] Chat với AI
- [x] Quản lý số câu hỏi còn lại
- [x] Giả lập thanh toán
- [x] Hiển thị lịch sử thanh toán
- [x] Hiển thị bảng giá các gói dịch vụ
- [x] Xác nhận thanh toán (Modal)
- [x] Thông báo thanh toán thành công

## Giai đoạn 1: Tích hợp thanh toán và nâng cấp công cụ chọn số điện thoại

### 1. Tích hợp thanh toán thực tế

#### 1.1. Tích hợp PayOS
- ID: `PAY-001`
- Mô tả: Tích hợp cổng thanh toán PayOS vào hệ thống
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Đăng ký tài khoản merchant PayOS
  - [ ] Triển khai SDK/API của PayOS vào backend
  - [ ] Xây dựng endpoint xử lý callback
  - [ ] Thiết kế UI flow thanh toán
  - [ ] Kiểm thử quá trình thanh toán end-to-end
  - [ ] Xử lý edge cases và tình huống lỗi

#### 1.2. Quản lý giao dịch
- ID: `PAY-002`
- Mô tả: Xây dựng hệ thống quản lý giao dịch toàn diện
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Nâng cấp database schema để lưu thông tin giao dịch đầy đủ
  - [ ] Xây dựng API quản lý giao dịch
  - [x] Cải tiến UI lịch sử thanh toán
  - [ ] Tạo tính năng xuất hóa đơn điện tử
  - [ ] Thêm chức năng thông báo email/SMS sau giao dịch

#### 1.3. Gói thanh toán
- ID: `PAY-003`
- Mô tả: Nâng cấp hệ thống gói thanh toán, cho phép tùy chỉnh
- Độ ưu tiên: P2
- Trạng thái: `IN_PROGRESS`
- Người được giao: Dev Team
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Tạo trang quản lý gói thanh toán cho admin
  - [x] Cập nhật UI hiển thị các gói thanh toán
  - [ ] Thêm tính năng gói thanh toán theo subscription
  - [ ] Thêm hệ thống khuyến mãi và mã giảm giá

### 2. Nâng cấp công cụ chọn số điện thoại

#### 2.1. Công cụ tìm kiếm nâng cao
- ID: `PHONE-001`
- Mô tả: Phát triển công cụ tìm kiếm và đánh giá số điện thoại nâng cao
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Xây dựng thuật toán đánh giá số điện thoại theo thông tin cá nhân
  - [ ] Tạo giao diện tìm kiếm với các bộ lọc nâng cao
  - [ ] Thiết kế hiển thị kết quả phân tích
  - [ ] Tích hợp các tham số phong thủy (ngũ hành, bản mệnh, năm sinh)

#### 2.2. So sánh số điện thoại
- ID: `PHONE-002`
- Mô tả: Công cụ so sánh nhiều số điện thoại với nhau
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế giao diện so sánh
  - [ ] Xây dựng logic so sánh chi tiết theo các tham số phong thủy
  - [ ] Hiển thị kết quả so sánh dạng biểu đồ trực quan
  - [ ] Thêm tính năng xuất báo cáo so sánh dạng PDF

#### 2.3. Tính năng cá nhân hóa
- ID: `PHONE-003`
- Mô tả: Thêm tính năng cá nhân hóa cho việc quản lý số điện thoại đã xem
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Tạo tính năng lưu số yêu thích
  - [ ] Xây dựng lịch sử tìm kiếm
  - [ ] Tạo danh sách mong muốn (wishlist)
  - [ ] Thêm tính năng đánh giá (rating) số điện thoại

## Giai đoạn 2: Phát triển công cụ mật khẩu

### 3. Công cụ tạo mật khẩu phong thủy

#### 3.1. Công cụ tạo mật khẩu
- ID: `PWD-001`
- Mô tả: Xây dựng công cụ tạo mật khẩu theo phong thủy cá nhân
- Độ ưu tiên: P1
- Trạng thái: `DONE`
- Người được giao: Dev Team
- Ngày hoàn thành: 05/06/2024
- Công việc chi tiết:
  - [x] Phát triển thuật toán tạo mật khẩu theo phong thủy
  - [x] Tạo giao diện người dùng cho công cụ
  - [x] Đảm bảo mật khẩu phù hợp theo nguyên tắc phong thủy
  - [x] Thêm tùy chọn cấu hình mật khẩu (độ dài, mục đích sử dụng)

#### 3.2. Kiểm tra mật khẩu hiện tại
- ID: `PWD-002`
- Mô tả: Công cụ phân tích phong thủy của mật khẩu hiện có
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY

## Giai đoạn 3: Phát triển công cụ chọn số tài khoản ngân hàng

### 4. Công cụ chọn số tài khoản ngân hàng

#### 4.1. Phân tích số tài khoản
- ID: `BANK-001`
- Mô tả: Xây dựng công cụ phân tích số tài khoản ngân hàng hiện có
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY

#### 4.2. Gợi ý số tài khoản
- ID: `BANK-002`
- Mô tả: Công cụ gợi ý số tài khoản phù hợp với phong thủy cá nhân
- Độ ưu tiên: P2
- Trạng thái: `DONE`
- Người được giao: Dev Team
- Ngày hoàn thành: 05/06/2024
- Công việc chi tiết: 
  - [x] Phát triển thuật toán gợi ý dựa trên phong thủy
  - [x] Thiết kế giao diện chọn mục đích sử dụng tài khoản
  - [x] Tính năng phân tích số tài khoản theo cặp số cuối
  - [x] Thực hiện tính năng tạo số tài khoản phù hợp với tiêu chí

## Trang/tính năng cần xây dựng mới

### 5. Trang quản trị và trang thông tin

#### 5.1. Trang quản trị admin
- ID: `PAGE-001`
- Mô tả: Xây dựng trang quản trị cho admin
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế giao diện quản trị
  - [ ] Tạo chức năng quản lý người dùng
  - [ ] Tạo chức năng quản lý gói thanh toán
  - [ ] Tạo chức năng thống kê và báo cáo

#### 5.2. Trang dịch vụ
- ID: `PAGE-002`
- Mô tả: Hoàn thiện trang dịch vụ (OurService.vue)
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY

#### 5.3. Trang bảng giá
- ID: `PAGE-003`
- Mô tả: Hoàn thiện trang bảng giá (Pricing.vue) 
- Độ ưu tiên: P2
- Trạng thái: `DONE`
- Người được giao: Dev Team
- Ngày hoàn thành: 15/06/2024
- Công việc chi tiết:
  - [x] Thiết kế giao diện hiển thị các gói thanh toán
  - [x] Tạo hệ thống tab chuyển đổi giữa phần gói dịch vụ và lịch sử thanh toán
  - [x] Hiển thị thông tin chi tiết của từng gói thanh toán
  - [x] Thêm phần FAQ về dịch vụ

#### 5.4. Trang chính sách bảo mật
- ID: `PAGE-004`
- Mô tả: Xây dựng trang chính sách bảo mật
- Độ ưu tiên: P3
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY

### 6. Nhiệm vụ kỹ thuật

#### 6.1. Tối ưu hóa hiệu suất
- ID: `TECH-001`
- Mô tả: Tối ưu hóa hiệu suất hệ thống, đặc biệt là phần phân tích số
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY

#### 6.2. Cải thiện bảo mật
- ID: `TECH-002`
- Mô tả: Tăng cường bảo mật cho hệ thống
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY

#### 6.3. Monitoring và logging
- ID: `TECH-003`
- Mô tả: Triển khai hệ thống giám sát và ghi log
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY

### 7. Khác

#### 7.1. Cải thiện UX/UI
- ID: `UX-001`
- Mô tả: Cải thiện trải nghiệm người dùng và giao diện
- Độ ưu tiên: P2
- Trạng thái: `IN_PROGRESS`
- Người được giao: Dev Team
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [x] Đồng bộ hóa Header và Footer trong toàn bộ ứng dụng
  - [x] Thiết kế giao diện thanh toán và bảng giá thân thiện người dùng
  - [ ] Cải thiện hiệu ứng chuyển trang và animation
  - [ ] Tối ưu hóa tốc độ tải trang

#### 7.2. Tích hợp với backend mới
- ID: `TECH-004`
- Mô tả: Cập nhật frontend để làm việc với các API backend mới
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Cập nhật các endpoint API
  - [ ] Tích hợp với hệ thống kiểm tra quota
  - [ ] Tích hợp với API quản lý giao dịch
  - [ ] Tích hợp với API phân tích nâng cao

#### 7.3. Responsive Design
- ID: `UX-002`
- Mô tả: Đảm bảo trang web hoạt động tốt trên các thiết bị di động
- Độ ưu tiên: P1
- Trạng thái: `IN_PROGRESS`
- Người được giao: Dev Team
- Deadline: DD/MM/YYYY 
- Công việc chi tiết:
  - [x] Tối ưu hóa giao diện thanh toán cho thiết bị di động
  - [ ] Cải thiện trải nghiệm người dùng trên màn hình nhỏ
  - [ ] Kiểm thử trên nhiều loại thiết bị khác nhau
  - [ ] Đảm bảo tính năng chính hoạt động đầy đủ trên di động

## Giai đoạn 4: Nâng cấp AppView với Dropdown và Chatbot Thông Minh

### 8. Nâng cấp AppView với tính năng đa công cụ

#### 8.1. UI Dropdown chuyển đổi công cụ
- ID: `APP-001`
- Mô tả: Thiết kế và triển khai dropdown cho phép chuyển đổi giữa các công cụ khác nhau
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế UI dropdown menu tích hợp vào AppHeader
  - [ ] Thêm các tùy chọn: Phân tích số điện thoại, Chọn mật khẩu, Phân tích tài khoản ngân hàng, Phân tích CCCD
  - [ ] Tạo các icon phù hợp cho mỗi loại công cụ
  - [ ] Thêm animation chuyển đổi giữa các công cụ

#### 8.2. State Management cho đa công cụ
- ID: `APP-002`
- Mô tả: Nâng cấp state management để xử lý nhiều loại công cụ phân tích
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Cập nhật Pinia store để lưu trữ loại công cụ hiện tại
  - [ ] Tạo các store riêng cho từng loại công cụ nếu cần
  - [ ] Xử lý persistence cho lịch sử sử dụng các công cụ
  - [ ] Đảm bảo chuyển đổi mượt mà giữa các context khác nhau

#### 8.3. Hiển thị tùy chỉnh theo loại công cụ
- ID: `APP-003`
- Mô tả: Tùy chỉnh giao diện và trải nghiệm người dùng theo loại công cụ đang chọn
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Tạo templates UI khác nhau cho mỗi loại công cụ
  - [ ] Thiết kế components chung có thể tái sử dụng giữa các công cụ
  - [ ] Tạo các placeholder và hướng dẫn phù hợp với từng loại công cụ
  - [ ] Thiết kế chế độ chuyển đổi theme theo loại công cụ nếu cần

### 9. Nâng cấp Chatbot để thu thập thông tin người dùng

#### 9.1. Flow thu thập thông tin
- ID: `CHAT-001`
- Mô tả: Xây dựng flow chatbot thông minh để thu thập thông tin người dùng
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế flow hội thoại thu thập thông tin cơ bản (tên, ngày sinh)
  - [ ] Tạo flow hỏi mục tiêu sử dụng (tài lộc, tình duyên, sự nghiệp, sức khỏe)
  - [ ] Xây dựng cơ chế thu thập CCCD một cách an toàn và tuân thủ GDPR
  - [ ] Cài đặt cơ chế nhắc nhở người dùng cung cấp thông tin còn thiếu

#### 9.2. Validate và xử lý thông tin đầu vào
- ID: `CHAT-002`
- Mô tả: Xây dựng hệ thống validate và xử lý thông tin người dùng nhập vào
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Xây dựng bộ validator cho ngày sinh (đúng định dạng, hợp lệ)
  - [ ] Xây dựng bộ validator cho CCCD (đúng định dạng, checksum)
  - [ ] Tạo hệ thống phản hồi lỗi thân thiện khi thông tin không hợp lệ
  - [ ] Cài đặt cơ chế gợi ý điền thông tin đúng

#### 9.3. Lưu trữ thông tin người dùng an toàn
- ID: `CHAT-003`
- Mô tả: Xây dựng hệ thống lưu trữ thông tin người dùng an toàn và tuân thủ quy định
- Độ ưu tiên: P0
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế schema database để lưu thông tin người dùng
  - [ ] Triển khai mã hóa dữ liệu nhạy cảm (CCCD, thông tin cá nhân)
  - [ ] Xây dựng cơ chế quản lý quyền truy cập dữ liệu
  - [ ] Tạo chính sách xóa dữ liệu khi không còn cần thiết

#### 9.4. Giao diện chatbot thông minh
- ID: `CHAT-004`
- Mô tả: Cải tiến giao diện chatbot để tối ưu trải nghiệm người dùng
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế UI chatbot thân thiện và hấp dẫn
  - [ ] Thêm các thành phần tương tác như buttons, datepicker, dropdowns
  - [ ] Tạo hiệu ứng typing và loading khi chatbot đang xử lý
  - [ ] Thiết kế các templates tin nhắn khác nhau cho từng loại nội dung

### 10. Thuật toán tối ưu hóa và luận giải kết quả

#### 10.1. Thuật toán tối ưu cho mỗi loại công cụ
- ID: `ALGO-001`
- Mô tả: Phát triển các thuật toán tối ưu hóa cho từng loại công cụ
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Phát triển thuật toán chọn số điện thoại tối ưu dựa trên thông tin cá nhân
  - [ ] Phát triển thuật toán tạo mật khẩu phù hợp theo mục tiêu
  - [ ] Phát triển thuật toán chọn số tài khoản ngân hàng tối ưu
  - [ ] Tích hợp yếu tố phong thủy vào các thuật toán

#### 10.2. Engine luận giải kết quả
- ID: `ALGO-002`
- Mô tả: Xây dựng engine luận giải kết quả chi tiết cho người dùng
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Xây dựng hệ thống template luận giải cho từng loại phân tích
  - [ ] Tạo cơ chế đưa ra lời khuyên cá nhân hóa dựa trên thông tin người dùng
  - [ ] Thêm tính năng so sánh chi tiết giữa các lựa chọn tối ưu
  - [ ] Thiết kế UI hiển thị kết quả luận giải thân thiện với người dùng

#### 10.3. Lưu trữ và tái sử dụng kết quả
- ID: `ALGO-003`
- Mô tả: Xây dựng hệ thống lưu trữ và tái sử dụng kết quả phân tích
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thiết kế schema database để lưu kết quả phân tích
  - [ ] Tạo cơ chế cache kết quả để tăng tốc độ phân tích
  - [ ] Xây dựng API để lấy lịch sử phân tích
  - [ ] Tạo tính năng chia sẻ kết quả phân tích (nếu người dùng muốn)

#### 10.4. Các mô hình dự đoán
- ID: `ALGO-004`
- Mô tả: Phát triển các mô hình dự đoán phong thủy dựa trên machine learning
- Độ ưu tiên: P2
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Thu thập và chuẩn bị dữ liệu huấn luyện
  - [ ] Xây dựng mô hình dự đoán số điện thoại phù hợp
  - [ ] Xây dựng mô hình khuyến nghị mật khẩu
  - [ ] Đánh giá và tối ưu hóa độ chính xác của mô hình

### 11. Tích hợp và kiểm thử

#### 11.1. Tích hợp các công cụ mới
- ID: `INT-001`
- Mô tả: Tích hợp tất cả các công cụ mới vào hệ thống hiện tại
- Độ ưu tiên: P1
- Trạng thái: `TODO`
- Người được giao: TBD
- Deadline: DD/MM/YYYY
- Công việc chi tiết:
  - [ ] Đảm bảo tính tương thích giữa các công cụ mới và cũ
  - [ ] Kiểm thử tích hợp giữa frontend và backend
  - [ ] Tối ưu hóa luồng dữ liệu giữa các thành phần
  - [ ] Tạo tài liệu API cho từng điểm tích hợp

