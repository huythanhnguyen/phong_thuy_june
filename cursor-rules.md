# Cursor Rules: Quy tắc phát triển dự án Phong Thủy Số

## Giới thiệu
Tài liệu này chứa các quy tắc, tiêu chuẩn và hướng dẫn để phát triển dự án Phong Thủy Số một cách nhất quán và chất lượng. Mọi thành viên tham gia dự án cần tuân thủ các quy tắc này để đảm bảo sự đồng bộ và dễ bảo trì của codebase.

## Quy tắc chung

### Quy trình làm việc
1. **Quy trình Git Flow**:
   - Branch `main`: Chỉ chứa code sẵn sàng cho production
   - Branch `develop`: Branch phát triển chính
   - Branch tính năng: Đặt tên theo format `feature/[ID-TASK]_tên-ngắn-gọn`
   - Branch sửa lỗi: Đặt tên theo format `bugfix/[ID-TASK]_mô-tả-lỗi`

2. **Cập nhật task-master**:
   - Cập nhật trạng thái task khi bắt đầu/hoàn thành công việc
   - Thêm các ghi chú liên quan đến trở ngại hay giải pháp

3. **Code review**:
   - Mọi pull request phải được review bởi ít nhất 1 thành viên khác
   - Tuân thủ checklist review (được mô tả bên dưới)
   - Yêu cầu tất cả kiểm tra tự động (linting, testing) phải pass

4. **Triển khai**:
   - Chỉ triển khai từ branch `main`
   - Môi trường staging sử dụng branch `develop`
   - Luôn thực hiện kiểm tra sau khi triển khai

### Kiểm thử
1. **Bắt buộc viết unit test** cho:
   - Logic phân tích số điện thoại
   - Xử lý thanh toán
   - API endpoints chính

2. **Khuyến khích viết integration test** cho:
   - Quy trình thanh toán end-to-end
   - Quy trình đăng nhập và phân quyền

3. **Phạm vi kiểm thử** (Code coverage):
   - Tối thiểu 70% cho các module core
   - Tối thiểu 50% cho toàn bộ codebase

## Coding conventions

### JavaScript/Vue.js

1. **Định dạng code**:
   - Sử dụng ESLint với cấu hình được cung cấp
   - Sử dụng Prettier để định dạng code
   - Khoảng trắng: 2 spaces
   - Dấu chấm phẩy ở cuối câu lệnh
   - Sử dụng dấu ngoặc nhọn cho tất cả các khối lệnh

2. **Đặt tên**:
   - Biến và hàm: camelCase (vd: `getUserInfo`)
   - Components Vue: PascalCase (vd: `PaymentHistory`)
   - Files: kebab-case (vd: `payment-history.vue`)
   - Enum/Constants: UPPER_CASE (vd: `MAX_RETRY_COUNT`)

3. **Cấu trúc Vue component**:
   - Sử dụng Composition API
   - Thứ tự trong template: v-if/v-show > v-for > v-model > sự kiện (@click) > binding (:prop)
   - Thứ tự trong script: imports > props > setup > state > computed > methods > watch > lifecycle hooks

4. **Xử lý trạng thái**:
   - Sử dụng Pinia cho state management
   - Mỗi tính năng chính sử dụng một store riêng

5. **Xử lý API Calls**:
   - Tất cả API calls phải được thực hiện thông qua service
   - Luôn xử lý lỗi (try/catch)
   - Sử dụng async/await thay vì Promise chains
   - Luôn hiển thị loading state và error message

### CSS/Styling

1. **Sử dụng Tailwind CSS**:
   - Ưu tiên sử dụng utility classes của Tailwind
   - Chỉ tạo custom CSS khi cần thiết

2. **Responsive Design**:
   - Mobile-first approach
   - Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

3. **Theming**:
   - Sử dụng CSS variables cho màu sắc chính
   - Tuân thủ palette màu đã định nghĩa

### Backend

1. **Cấu trúc API**:
   - RESTful API design
   - API versioning (v1, v2)
   - JSON response format
   - HTTP status codes phù hợp

2. **Bảo mật**:
   - Sử dụng JWT cho xác thực
   - Rate limiting cho tất cả API endpoints
   - Input validation
   - Phòng chống các lỗ hổng phổ biến (SQL injection, XSS)

3. **Performance**:
   - Caching kết quả phân tích số điện thoại
   - Pagination cho tất cả endpoints trả về list
   - Avoid N+1 queries trong database

## Checklist code review

### Chung
- [ ] Code có dễ đọc và dễ hiểu không?
- [ ] Có tên biến/hàm/component mô tả rõ mục đích không?
- [ ] Có bị duplicate code không?
- [ ] Code có tuân thủ style guide không?
- [ ] Có comments cho các logic phức tạp không?

### Frontend
- [ ] UI có đáp ứng được thiết kế không?
- [ ] UI có hoạt động tốt trên các kích thước màn hình khác nhau không?
- [ ] Components có tái sử dụng khi cần thiết không?
- [ ] Có xử lý các trạng thái (loading, error, empty) không?
- [ ] Performance có được tối ưu không? (không render không cần thiết, lazy loading)

### Backend
- [ ] API có thiết kế phù hợp không?
- [ ] Có validation đầy đủ cho inputs không?
- [ ] Có xử lý lỗi và trả về thông báo lỗi phù hợp không?
- [ ] Database queries có được tối ưu không?
- [ ] Bảo mật có được đảm bảo không?

## Thư viện và công nghệ

### Frontend
- Vue.js 3
- Tailwind CSS
- Pinia
- Vue Router
- Axios
- VueUse
- Font Awesome
- Vitest

### Backend
- Node.js
- Express
- MongoDB
- JWT
- Joi (validation)
- Winston (logging)
- Jest (testing)

## Phụ lục

### Quy ước commit message
- `feat:` Thêm tính năng mới
- `fix:` Sửa lỗi
- `docs:` Thay đổi tài liệu
- `style:` Thay đổi về style (không ảnh hưởng đến code)
- `refactor:` Refactor code
- `perf:` Cải thiện performance
- `test:` Thêm hoặc sửa tests
- `chore:` Các thay đổi khác (build, tooling, etc)

### Ví dụ commit message
```
feat(payment): add MomoPay integration

- Add API endpoint for MomoPay callback
- Add MomoPay service
- Update payment confirmation modal to include MomoPay
```

### Quy trình tạo Pull Request
1. Tạo branch từ `develop`
2. Commit thay đổi theo quy ước commit
3. Push branch và tạo Pull Request
4. Điền template Pull Request
5. Chỉ định reviewer
6. Sau khi review và approval, merge vào `develop` 