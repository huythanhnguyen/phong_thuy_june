import { validateCCCD } from './provinceCodes.js';

// Định nghĩa các loại số có thể phân tích
export const NUMBER_TYPES = {
    phone: {
        id: 'phone',
        name: 'Số Điện Thoại',
        description: 'Phân tích phong thủy số điện thoại',
        icon: 'phone',
        examples: ['0912 345 678', '0987 654 321', '0168 888 888'],
        inputType: 'tel',
        maxLength: 13,
        placeholder: 'Nhập số điện thoại của bạn...',
        validation: /^[0-9\s]{12,13}$/,
        format: (value) => value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
    },
    cccd: {
        id: 'cccd',
        name: 'Căn Cước Công Dân',
        description: 'Phân tích số CCCD/CMND',
        icon: 'id-card',
        examples: ['087 0 84 000999', '001 2 95 123456'],
        inputType: 'text',
        maxLength: 15,
        placeholder: 'Nhập số CCCD 12 chữ số...',
        validation: /^[0-9\s]{14,15}$/,
        format: (value) => value.replace(/(\d{3})(\d{1})(\d{2})(\d{6})/, '$1 $2 $3 $4')
    },
    birthdate: {
        id: 'birthdate',
        name: 'Ngày Sinh',
        description: 'Phân tích ngày sinh và vận mệnh',
        icon: 'calendar',
        examples: ['04/08/1984', '15/08/1990', '03/12/1985'],
        inputType: 'text',
        placeholder: 'dd/mm/yyyy',
        maxLength: 10,
        validation: /^\d{2}\/\d{2}\/\d{4}$/,
        format: (value) => value
    },
    bankAccount: {
        id: 'bankAccount',
        name: 'Số Tài Khoản',
        description: 'Phân tích số tài khoản ngân hàng',
        icon: 'bank',
        examples: ['1234 5678 90', '9876 5432 1012 3'],
        inputType: 'text',
        maxLength: 25,
        placeholder: 'Nhập số tài khoản...',
        validation: /^[0-9\s]{9,25}$/,
        format: (value) => value.replace(/(\d{4})/g, '$1 ').trim()
    },
    password: {
        id: 'password',
        name: 'Mật Khẩu Số',
        description: 'Tạo và phân tích mật khẩu số may mắn',
        icon: 'lock',
        examples: ['123456', '888999', '168168'],
        inputType: 'text',
        maxLength: 200,
        placeholder: 'Nhập mật khẩu...',
        validation: /^.*$/,
        format: (value) => value
    },
    random: {
        id: 'random',
        name: 'Số Ngẫu Nhiên',
        description: 'Phân tích chuỗi ký tự bất kỳ',
        icon: 'dice',
        examples: ['AB12CD', 'A1B2C3', '68XYZ56'],
        inputType: 'text',
        maxLength: 200,
        placeholder: 'Nhập chuỗi bất kỳ...',
        validation: /^.*$/,
        format: (value) => value
    }
};

// Lấy thông tin loại số theo ID
export function getNumberTypeInfo(typeId) {
    return NUMBER_TYPES[typeId] || null;
}

// Lấy tất cả loại số
export function getAllNumberTypes() {
    return Object.values(NUMBER_TYPES);
}

// Validate input theo loại số
export function validateNumberInput(value, typeId) {
    const typeInfo = getNumberTypeInfo(typeId);
    if (!typeInfo) return { valid: false, message: 'Loại số không hợp lệ' };
    
    if (!value || value.trim() === '') {
        return { valid: false, message: 'Vui lòng nhập số' };
    }
    
    // Đối với ngày sinh, validation đặc biệt
    if (typeId === 'birthdate') {
        return validateBirthdateInput(value.trim());
    }

    // Đối với mật khẩu, không giới hạn định dạng – chỉ cần không rỗng
    if (typeId === 'password' || typeId === 'random') {
        return { valid: true, cleanValue: value.trim() };
    }
    
    // Đối với CCCD, sử dụng validation đặc biệt
    if (typeId === 'cccd') {
        return validateCCCD(value.trim());
    }
    
    // Đối với các loại số có formatting khác, validate với format mới
    const formattedTypes = ['phone', 'bankAccount'];
    if (formattedTypes.includes(typeId)) {
        if (!typeInfo.validation.test(value.trim())) {
            return { 
                valid: false, 
                message: `${typeInfo.name} không hợp lệ. ${getValidationMessage(typeId)}` 
            };
        }
        return { valid: true, cleanValue: value.trim() };
    }
    
    // Các loại số khác, loại bỏ ký tự không phải số
    const cleanValue = value.replace(/\D/g, '');
    if (!typeInfo.validation.test(cleanValue)) {
        return { 
            valid: false, 
            message: `${typeInfo.name} không hợp lệ. ${getValidationMessage(typeId)}` 
        };
    }
    
    return { valid: true, cleanValue };
}

// Validation đặc biệt cho ngày sinh
export function validateBirthdateInput(value) {
    const numbers = value.replace(/[^0-9]/g, '');
    
    // Không có số nào
    if (numbers.length === 0) {
        return { valid: false, message: 'Vui lòng nhập ngày sinh' };
    }
    
    // Kiểm tra độ dài
    if (numbers.length < 8) {
        return { valid: false, message: 'Ngày sinh phải đủ 8 chữ số (DD/MM/YYYY)' };
    }
    
    if (numbers.length > 8) {
        return { valid: false, message: 'Ngày sinh không được quá 8 chữ số' };
    }
    
    // Kiểm tra format
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        return { valid: false, message: 'Định dạng phải là DD/MM/YYYY' };
    }
    
    // Parse ngày, tháng, năm
    const [dayStr, monthStr, yearStr] = value.split('/');
    const day = parseInt(dayStr);
    const month = parseInt(monthStr);
    const year = parseInt(yearStr);
    
    // Validate day
    if (day < 1 || day > 31) {
        return { valid: false, message: 'Ngày không hợp lệ (01-31)' };
    }
    
    // Validate month
    if (month < 1 || month > 12) {
        return { valid: false, message: 'Tháng không hợp lệ (01-12)' };
    }
    
    // Validate year (reasonable range)
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
        return { valid: false, message: `Năm phải từ 1900 đến ${currentYear}` };
    }
    
    // Validate actual date
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        return { valid: false, message: 'Ngày tháng không tồn tại' };
    }
    
    return { valid: true, cleanValue: value };
}

// Thông báo validation cho từng loại số
function getValidationMessage(typeId) {
    const messages = {
        phone: 'Số điện thoại phải có định dạng: 0912 345 678',
        cccd: 'Số CCCD phải có định dạng: 087 0 84 000999', 
        birthdate: 'Ngày sinh phải có định dạng dd/mm/yyyy',
        bankAccount: 'Số tài khoản phải có định dạng: 1234 5678 90',
        password: 'Mật khẩu số không hợp lệ',
        random: 'Chuỗi không hợp lệ'
    };
    return messages[typeId] || 'Định dạng không hợp lệ';
} 