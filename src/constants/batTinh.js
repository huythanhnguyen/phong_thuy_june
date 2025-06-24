// Bát Tinh constants - dựa từ chatbotsdtapi backend
export const BAT_TINH = {
    // Tứ cát tỉnh - Four Auspicious Stars
    SINH_KHI: {
        name: "Sinh Khí",
        description: "Vui vẻ, quý nhân, dẫn đạo lực",
        detailedDescription: `Tính cách lạc quan, nhìn mọi thứ rất thoáng, là người yên vui, lấy tâm bình tĩnh, bình thản để đối đãi, mọi thứ tuỳ duyên, không so đo cưỡng cầu.
- Thích trợ giúp người khác, có nhiều nhân duyên và bạn bè tốt, bằng hữu nhiều. Không thích so đo và cứng nhắc.
- Thường là người hoà giải, am hiểu giao tiếp tốt, kết nối giỏi. Dễ tiếp nhận thông tin mới.
- Quý nhân mang tiền tài đến, có rất nhiều khoản tiền bất ngờ, thậm chí trúng số.
- Tuy nhiên là người hơi lười thay đổi, an phận gặp sao yên vậy, không có chủ kiến.
- Sự nghiệp gặp được nhiều quý nhân, gặp gữ thì hoá lành. Thích hợp làm công tác xã hội, PR.
- Tình cảm không cưỡng cầu, tuỳ duyên, không so đo, mối quan hệ hài hoà, hôn nhân tương ứng ngọt ngào.
- Sức khỏe cần lưu ý về bệnh dạ dày, tai mắt mũi.
- Từ trường đem dữ hoá lành, trong nguy hiểm chắc chắn sẽ có hy vọng thoát khỏi.`,
        numbers: ["14", "41", "67", "76", "39", "93", "28", "82"],
        energy: {
            "14": 4, "41": 4,  // Mức năng lượng cao nhất
            "67": 3, "76": 3,  // Mức năng lượng cao
            "39": 2, "93": 2,  // Mức năng lượng trung bình
            "28": 1, "82": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["14", "41", "67", "76"], // Động số, đại quý nhân (năng lượng 3,4)
            LOW: ["39", "93", "28", "82"]   // Tĩnh số, tiểu quý nhân (năng lượng 1,2)
        },
        position: "Nên ở giữa",
        nature: "Cát"
    },
    
    THIEN_Y: {
        name: "Thiên Y",
        description: "Tiền tài, tình cảm, hồi báo",
        detailedDescription: `Là tin tức trọng yếu khi một người muốn cầu tài hoặc tiêu tai bệnh tật. Thông minh, thiện lương, hào phóng, thích giúp đỡ người khác.
- Tính tình rất giản đơn, không có tâm cơ thâm hiểm, hạnh phúc đôi lứa, hạnh phúc vợ chồng đều đoan chính.
- Tiền kiếm được chân chính nhưng vì quá thiện lương cũng không thích so đo nên rất dễ bị lừa và lợi dụng.
- Không màng danh lợi, không quá quan trọng đồng tiền, những khoản tiền nhỏ thường không chú ý nhiều.
- Tiền tài đổ về từ tứ phương tám hướng, được hưởng sự đầy đủ, hạnh phúc.
- Sự nghiệp có thể thành đại sự, lừng lẫy, trở thành ông chủ, lãnh đạo hoặc cánh tay đắc lực của doanh nghiệp.
- Tình cảm chân chính, dễ kết hôn và dễ gặp đối tượng lý tưởng, tình cảm ân ái, ngọt ngào và lãng mạn.
- Sức khỏe cần lưu ý vấn đề về huyết áp, tuần hoàn máu, bệnh tai mắt mũi.
- Nhiều quý nhân lớn tuổi hơn, các bậc chú bác anh chị giúp đỡ che chở, bạn bè nhiều.`,
        numbers: ["13", "31", "68", "86", "49", "94", "27", "72"],
        energy: {
            "13": 4, "31": 4,  // Mức năng lượng cao nhất
            "68": 3, "86": 3,  // Mức năng lượng cao
            "49": 2, "94": 2,  // Mức năng lượng trung bình
            "27": 1, "72": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["13", "31", "68", "86"], // Động số, đại tài (năng lượng 3,4)
            LOW: ["49", "94", "27", "72"]   // Tĩnh số, tiểu tài (năng lượng 1,2)
        },
        position: "Nên ở hậu phương",
        nature: "Cát"
    },
    
    DIEN_NIEN: {
        name: "Diên Niên",
        description: "Năng lực chuyên nghiệp, công việc",
        detailedDescription: `Thường là lãnh đạo, chúa tể một phương, không dễ thuyết phục, trừ khi ai đó năng lực cao hơn hẳn.
- Là người có trách nhiệm, tâm lý vững vàng, lập trường ổn định, có cam đảm và đảm đương được.
- Rất trọng chữ tín, đề cao trách nhiệm, đã nói là làm, tính tình kiên trì, nói 1 không 2.
- Tâm địa thiện lương, kĩ tính không ẩu, xử lý công việc theo chính nghĩa, bảo vệ chính nghĩa.
- Hay thích tiết kiệm tiền bạc, tính toán cẩn thận không ẩu, biết tiêu sài đúng nơi đúng chỗ.
- Tài vận: Vất vả kiếm tiền, giữ tiền tốt, thích tính toán chi tiết tỉ mỉ, kĩ lưỡng. Quản lý tài sản rất kĩ.
- Sự nghiệp: có năng lực chuyên nghiệp, làm lãnh đạo và kỹ thuật, mọi thứ tự thân, làm việc khá mệt nhọc.
- Tình cảm: yêu cầu cao, tìm kiếm đối tượng rất khó khăn kĩ tính, đặt rất nặng công việc, cực kì chung thuỷ.
- Sức khỏe: vất vả lâu ngày sinh bệnh tật, bệnh vai cổ gáy, giấc ngủ không tốt, tóc rụng nhiều, tinh thần áp lực.
- Khuyết điểm: Sĩ diện, cái tôi mạnh, hay ung dung tự đắc ý, lý lẽ cứng nhắc, cố chấp, cực khổ, lao lực.`,
        numbers: ["19", "91", "78", "87", "34", "43", "26", "62"],
        energy: {
            "19": 4, "91": 4,  // Mức năng lượng cao nhất
            "78": 3, "87": 3,  // Mức năng lượng cao
            "34": 2, "43": 2,  // Mức năng lượng trung bình
            "26": 1, "62": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["19", "91", "78", "87"], // Động số, đại lãnh đạo (năng lượng 3,4)
            LOW: ["34", "43", "26", "62"]   // Tĩnh số, tiểu lãnh đạo (năng lượng 1,2)
        },
        position: "Nên ở hậu phương",
        nature: "Cát"
    },
    
    PHUC_VI: {
        name: "Phục Vị",
        description: "Chịu đựng, khó thay đổi",
        detailedDescription: `Giỏi chịu đựng, có nghị lực hơn người, tiếng nói có sức ảnh hưởng, tiềm ẩn năng lực rất lớn.
- Lập trường vững vàng, không dễ biến động, không thích bị nói đạo lý, mà phải làm gương tốt.
- Thường lo lắng, không có cảm giác an toàn, khó đưa ra lựa chọn và rất cần sự cổ vũ động viên.
- Sợ mạo hiểm, sợ tổn thương, hay bị chờ đợi quá lâu mất cơ hội. Quá bảo thủ chờ đợi, không dám hành động.
- Tài vận: kiếm tiền khổ sở, phải đánh đổi nhiều vất vả, thích cầm tiền cố định và thu nhập ổn định.
- Sự nghiệp: gò bó theo khuôn phép, khó thay đổi, thích hợp với công việc có tính ổn định cao.
- Sức khỏe: bệnh về tim, não, lo nghĩ, hao tổn năng lượng ở 2 vùng này nhiều.
- Đặc điểm: theo hung thì thì hung, theo cát thì cát. Hoặc người có vận số tốt thì sẽ tốt, người có vận số xấu thì càng trở lên chậm trễ.
- Tình cảm: không tự ý chủ động yêu đương, cần có cảm giác yêu thương an toàn, tâm thái luôn đa nghi, thấp thỏm lo âu.
- Người nhà sẽ là quý nhân tốt nhất.`,
        numbers: ["11", "22", "33", "44", "66", "77", "88", "99"],
        energy: {
            "11": 4, "22": 4, "33": 1, "44": 1,
            "66": 2, "77": 2, "88": 3, "99": 3
        },
        level: {
            HIGH: ["11", "22", "88", "99"], // Động số (năng lượng 3,4)
            LOW: ["66", "77", "33", "44"]   // Tĩnh số (năng lượng 1,2)
        },
        position: "Không nên có",
        nature: "Cát/Hung"
    },
    
    // Tứ hung tỉnh - Four Inauspicious Stars
    HOA_HAI: {
        name: "Họa Hại",
        description: "Khẩu tiết, tranh chấp, ăn nói",
        detailedDescription: `Thông minh, khẩu tiết tốt, khiếu ăn nói lưu loát, có khiếu bán hàng và giao tiếp.
- Thường nhiều miệng, thích nói chuyện, thường để ý đến từng chữ, từng câu của người khác.
- Có khả năng hùng biện, thích tranh luận, đàm phán, thích hợp làm luật sư, MC, bán hàng.
- Tuy nhiên dễ gây hấn, dễ mắc lỗi về lời nói, thường xuyên có tranh chấp do ăn nói.
- Sự nghiệp: thích hợp với nghề cần ăn nói như sales, MC, giảng viên, luật sư.
- Tình cảm: dễ có tranh cãi trong tình cảm, cần học cách kiềm chế lời nói.
- Sức khỏe: cần chú ý bệnh về miệng, răng, họng, hô hấp.`,
        numbers: ["17", "71", "89", "98", "46", "64", "23", "32"],
        energy: {
            "17": 4, "71": 4,  // Mức năng lượng cao nhất
            "89": 3, "98": 3,  // Mức năng lượng cao
            "46": 2, "64": 2,  // Mức năng lượng trung bình
            "23": 1, "32": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["17", "71", "89", "98"], // Động số (năng lượng 3,4)
            LOW: ["46", "64", "23", "32"]   // Tĩnh số (năng lượng 1,2)
        },
        position: "Có thể ở đầu",
        nature: "Hung"
    },
    
    LUC_SAT: {
        name: "Lục Sát",
        description: "Thị phi, mất mát, người xấu",
        detailedDescription: `Dễ gặp tiểu nhân, thị phi, mất mát tài sản, rắc rối pháp lý.
- Thường gặp phải người có ý đồ xấu, bị lừa gạt, lợi dụng.
- Dễ có tranh chấp về tài sản, tiền bạc, hợp đồng.
- Hay gặp rắc rối với pháp luật, giấy tờ, thủ tục.
- Sự nghiệp: cần cẩn thận với đối tác, khách hàng, tránh bị lừa.
- Tình cảm: dễ gặp người không tốt, cần thận trọng khi yêu.
- Tài chính: dễ bị mất tiền, đầu tư thất bại, cần quản lý tài chính cẩn thận.`,
        numbers: ["16", "61", "38", "83", "47", "74", "29", "92"],
        energy: {
            "16": 4, "61": 4,  // Mức năng lượng cao nhất
            "38": 3, "83": 3,  // Mức năng lượng cao
            "47": 2, "74": 2,  // Mức năng lượng trung bình
            "29": 1, "92": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["16", "61", "38", "83"], // Động số (năng lượng 3,4)
            LOW: ["47", "74", "29", "92"]   // Tĩnh số (năng lượng 1,2)
        },
        position: "Không nên có",
        nature: "Hung"
    },
    
    NGU_QUY: {
        name: "Ngũ Quỷ",
        description: "Bất ổn, thay đổi, không kiên định",
        detailedDescription: `Tính cách hay thay đổi, không kiên định, khó dự đoán.
- Thường xuyên thay đổi ý kiến, quyết định, kế hoạch.
- Dễ bị người khác ảnh hưởng, thiếu chủ kiến vững vàng.
- Thích khám phá, tìm hiểu những điều mới lạ nhưng thiếu kiên trì.
- Sự nghiệp: hay thay đổi công việc, khó ổn định lâu dài.
- Tình cảm: dễ thay đổi cảm xúc, khó duy trì mối quan hệ lâu dài.
- Tài chính: thu nhập không ổn định, hay có những khoản chi bất ngờ.`,
        numbers: ["18", "81", "79", "97", "36", "63", "24", "42"],
        energy: {
            "18": 4, "81": 4,  // Mức năng lượng cao nhất
            "79": 3, "97": 3,  // Mức năng lượng cao
            "36": 2, "63": 2,  // Mức năng lượng trung bình
            "24": 1, "42": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["18", "81", "79", "97"], // Động số (năng lượng 3,4)
            LOW: ["36", "63", "24", "42"]   // Tĩnh số (năng lượng 1,2)
        },
        position: "Không nên có",
        nature: "Hung"
    },
    
    TUYET_MENH: {
        name: "Tuyệt Mệnh",
        description: "Khó khăn, thử thách, cực đoan",
        detailedDescription: `Gặp nhiều khó khăn, thử thách lớn trong cuộc sống.
- Thường phải đối mặt với những tình huống cực đoan, khó xử.
- Có sức chịu đựng tốt, vượt qua khó khăn nhờ ý chí mạnh mẽ.
- Dễ gặp tai nạn, bệnh tật, những biến cố bất ngờ.
- Tuy nhiên nếu vượt qua được thử thách sẽ có thành tựu lớn.
- Sự nghiệp: gặp nhiều trở ngại nhưng có thể đạt được thành công nhờ kiên trì.
- Sức khỏe: cần đặc biệt chú ý an toàn, tránh tai nạn.
- Tình cảm: mối quan hệ thường trải qua nhiều thăng trầm.`,
        numbers: ["12", "21", "69", "96", "37", "73", "48", "84"],
        energy: {
            "12": 4, "21": 4,  // Mức năng lượng cao nhất
            "69": 3, "96": 3,  // Mức năng lượng cao
            "37": 2, "73": 2,  // Mức năng lượng trung bình
            "48": 1, "84": 1   // Mức năng lượng thấp
        },
        level: {
            HIGH: ["12", "21", "69", "96"], // Động số (năng lượng 3,4)
            LOW: ["37", "73", "48", "84"]   // Tĩnh số (năng lượng 1,2)
        },
        position: "Không nên có",
        nature: "Hung"
    }
};

// Helper function to get star info by pair
export function getStarInfoForPair(pair) {
    for (const starKey in BAT_TINH) {
        const starData = BAT_TINH[starKey];
        if (starData.numbers && starData.numbers.includes(pair)) {
            return {
                key: starKey,
                name: starData.name,
                description: starData.description,
                detailedDescription: starData.detailedDescription,
                nature: starData.nature,
                energy: starData.energy[pair] || null,
                position: starData.position
            };
        }
    }
    return {
        key: "UNKNOWN",
        name: "Không xác định",
        description: "Không có thông tin",
        nature: "Không xác định",
        energy: null
    };
}

// Get all numbers for a specific star
export function getNumbersForStar(starKey) {
    return BAT_TINH[starKey]?.numbers || [];
} 