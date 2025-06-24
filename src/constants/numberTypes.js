// Định nghĩa các loại số có thể phân tích
export const NUMBER_TYPES = {
    phone: {
        id: 'phone',
        name: 'Số Điện Thoại',
        description: 'Phân tích phong thủy số điện thoại',
        icon: 'phone',
        examples: ['0912345678', '0987654321', '0168888888'],
        inputType: 'tel',
        maxLength: 11,
        placeholder: 'Nhập số điện thoại của bạn...',
        validation: /^[0-9]{10,11}$/,
        format: (value) => value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
    },
    cccd: {
        id: 'cccd',
        name: 'Căn Cước Công Dân',
        description: 'Phân tích số CCCD/CMND',
        icon: 'id-card',
        examples: ['001234567890', '024567890123'],
        inputType: 'text',
        maxLength: 12,
        placeholder: 'Nhập số CCCD 12 chữ số...',
        validation: /^[0-9]{9,12}$/,
        format: (value) => value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')
    },
    birthdate: {
        id: 'birthdate',
        name: 'Ngày Sinh',
        description: 'Phân tích ngày sinh và vận mệnh',
        icon: 'calendar',
        examples: ['15/08/1990', '03/12/1985'],
        inputType: 'date',
        placeholder: 'Chọn ngày sinh của bạn...',
        validation: /^\d{2}\/\d{2}\/\d{4}$/,
        format: (value) => value
    },
    bankAccount: {
        id: 'bankAccount',
        name: 'Số Tài Khoản',
        description: 'Phân tích số tài khoản ngân hàng',
        icon: 'bank',
        examples: ['1234567890', '9876543210123'],
        inputType: 'text',
        maxLength: 20,
        placeholder: 'Nhập số tài khoản...',
        validation: /^[0-9]{8,20}$/,
        format: (value) => value.replace(/(\d{4})/g, '$1 ').trim()
    },
    password: {
        id: 'password',
        name: 'Mật Khẩu Số',
        description: 'Tạo và phân tích mật khẩu số may mắn',
        icon: 'lock',
        examples: ['123456', '888999', '168168'],
        inputType: 'text',
        maxLength: 10,
        placeholder: 'Nhập mật khẩu số...',
        validation: /^[0-9]{4,10}$/,
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
    
    // Clean input (remove spaces, special chars for validation)
    const cleanValue = value.replace(/\D/g, '');
    
    if (!typeInfo.validation.test(cleanValue)) {
        return { 
            valid: false, 
            message: `${typeInfo.name} không hợp lệ. ${getValidationMessage(typeId)}` 
        };
    }
    
    return { valid: true, cleanValue };
}

// Thông báo validation cho từng loại số
function getValidationMessage(typeId) {
    const messages = {
        phone: 'Số điện thoại phải có 10-11 chữ số',
        cccd: 'Số CCCD phải có 9-12 chữ số', 
        birthdate: 'Ngày sinh phải có định dạng dd/mm/yyyy',
        bankAccount: 'Số tài khoản phải có 8-20 chữ số',
        password: 'Mật khẩu số phải có 4-10 chữ số'
    };
    return messages[typeId] || 'Định dạng không hợp lệ';
} 