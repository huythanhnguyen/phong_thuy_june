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
        inputType: 'text',
        placeholder: 'Nhập ngày sinh (dd/mm/yyyy)...',
        maxLength: 10,
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
    
    // Đối với ngày sinh, cần giữ nguyên định dạng dd/mm/yyyy để kiểm tra
    if (typeId === 'birthdate') {
        if (!typeInfo.validation.test(value.trim())) {
            return {
                valid: false,
                message: `${typeInfo.name} không hợp lệ. ${getValidationMessage(typeId)}`
            };
        }
        return { valid: true, cleanValue: value.trim() };
    }

    const cleanValue = value.replace(/\D/g, '');

    // Đối với mật khẩu, không giới hạn định dạng – chỉ cần không rỗng
    if (typeId === 'password' || typeId === 'random') {
        return { valid: true, cleanValue: value.trim() };
    }
    
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
        password: 'Mật khẩu số không hợp lệ',
        random: 'Chuỗi không hợp lệ'
    };
    return messages[typeId] || 'Định dạng không hợp lệ';
} 