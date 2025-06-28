// Mã tỉnh thành theo Thông tư 07/2016/TT-BCA
export const PROVINCE_CODES = {
    '001': 'Hà Nội',
    '002': 'Hà Giang',
    '004': 'Cao Bằng',
    '006': 'Bắc Kạn',
    '008': 'Tuyên Quang',
    '010': 'Lào Cai',
    '011': 'Điện Biên',
    '012': 'Lai Châu',
    '014': 'Sơn La',
    '015': 'Yên Bái',
    '017': 'Hòa Bình',
    '019': 'Thái Nguyên',
    '020': 'Lạng Sơn',
    '022': 'Quảng Ninh',
    '024': 'Bắc Giang',
    '025': 'Phú Thọ',
    '026': 'Vĩnh Phúc',
    '027': 'Bắc Ninh',
    '030': 'Hải Dương',
    '031': 'Hải Phòng',
    '033': 'Hưng Yên',
    '034': 'Thái Bình',
    '035': 'Hà Nam',
    '036': 'Nam Định',
    '037': 'Ninh Bình',
    '038': 'Thanh Hóa',
    '040': 'Nghệ An',
    '042': 'Hà Tĩnh',
    '044': 'Quảng Bình',
    '045': 'Quảng Trị',
    '046': 'Thừa Thiên Huế',
    '048': 'Đà Nẵng',
    '049': 'Quảng Nam',
    '051': 'Quảng Ngãi',
    '052': 'Bình Định',
    '054': 'Phú Yên',
    '056': 'Khánh Hòa',
    '058': 'Ninh Thuận',
    '060': 'Bình Thuận',
    '062': 'Kon Tum',
    '064': 'Gia Lai',
    '066': 'Đắk Lắk',
    '067': 'Đắk Nông',
    '068': 'Lâm Đồng',
    '070': 'Bình Phước',
    '072': 'Tây Ninh',
    '074': 'Bình Dương',
    '075': 'Đồng Nai',
    '077': 'Bà Rịa - Vũng Tàu',
    '079': 'Hồ Chí Minh',
    '080': 'Long An',
    '082': 'Tiền Giang',
    '083': 'Bến Tre',
    '084': 'Trà Vinh',
    '086': 'Vĩnh Long',
    '087': 'Đồng Tháp',
    '089': 'An Giang',
    '091': 'Kiên Giang',
    '092': 'Cần Thơ',
    '093': 'Hậu Giang',
    '094': 'Sóc Trăng',
    '095': 'Bạc Liêu',
    '096': 'Cà Mau'
};

// Giải mã thông tin từ số CCCD
export function decodeCCCD(cccdNumber) {
    // Loại bỏ khoảng trắng và ký tự không phải số
    const cleanNumber = cccdNumber.replace(/\D/g, '');
    
    if (cleanNumber.length !== 12) {
        return null;
    }
    
    // Tách các phần
    const provinceCode = cleanNumber.substring(0, 3);
    const genderCode = cleanNumber.substring(3, 4);
    const yearCode = cleanNumber.substring(4, 6);
    const randomCode = cleanNumber.substring(6, 12);
    
    // Giải mã tỉnh thành
    const province = PROVINCE_CODES[provinceCode] || 'Không xác định';
    
    // Giải mã giới tính và thế kỷ
    const genderCodeNum = parseInt(genderCode);
    let gender, century, birthYear;
    
    if (genderCodeNum === 0 || genderCodeNum === 1) {
        // Thế kỷ 20 (1900-1999)
        century = 20;
        gender = genderCodeNum === 0 ? 'Nam' : 'Nữ';
        birthYear = 1900 + parseInt(yearCode);
    } else if (genderCodeNum === 2 || genderCodeNum === 3) {
        // Thế kỷ 21 (2000-2099)
        century = 21;
        gender = genderCodeNum === 2 ? 'Nam' : 'Nữ';
        birthYear = 2000 + parseInt(yearCode);
    } else if (genderCodeNum === 4 || genderCodeNum === 5) {
        // Thế kỷ 22 (2100-2199)
        century = 22;
        gender = genderCodeNum === 4 ? 'Nam' : 'Nữ';
        birthYear = 2100 + parseInt(yearCode);
    } else if (genderCodeNum === 6 || genderCodeNum === 7) {
        // Thế kỷ 23 (2200-2299)
        century = 23;
        gender = genderCodeNum === 6 ? 'Nam' : 'Nữ';
        birthYear = 2200 + parseInt(yearCode);
    } else if (genderCodeNum === 8 || genderCodeNum === 9) {
        // Thế kỷ 24 (2300-2399)
        century = 24;
        gender = genderCodeNum === 8 ? 'Nam' : 'Nữ';
        birthYear = 2300 + parseInt(yearCode);
    } else {
        gender = 'Không xác định';
        birthYear = null;
    }
    
    return {
        provinceCode,
        province,
        genderCode,
        gender,
        yearCode,
        birthYear,
        randomCode,
        century,
        isValid: true
    };
}

// Validate số CCCD
export function validateCCCD(cccdNumber) {
    const cleanNumber = cccdNumber.replace(/\D/g, '');
    
    if (cleanNumber.length !== 12) {
        return {
            valid: false,
            message: 'Số CCCD phải có đúng 12 chữ số'
        };
    }
    
    const provinceCode = cleanNumber.substring(0, 3);
    const genderCode = parseInt(cleanNumber.substring(3, 4));
    const yearCode = parseInt(cleanNumber.substring(4, 6));
    
    // Kiểm tra mã tỉnh
    if (!PROVINCE_CODES[provinceCode]) {
        return {
            valid: false,
            message: 'Mã tỉnh không hợp lệ'
        };
    }
    
    // Kiểm tra mã giới tính (0-9)
    if (genderCode < 0 || genderCode > 9) {
        return {
            valid: false,
            message: 'Mã giới tính không hợp lệ'
        };
    }
    
    // Kiểm tra mã năm sinh (00-99)
    if (yearCode < 0 || yearCode > 99) {
        return {
            valid: false,
            message: 'Mã năm sinh không hợp lệ'
        };
    }
    
    return {
        valid: true,
        message: ''
    };
} 