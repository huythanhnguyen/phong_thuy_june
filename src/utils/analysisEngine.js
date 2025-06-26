// Analysis Engine - dựa từ logic backend chatbotsdtapi
import { BAT_TINH, getStarInfoForPair } from '../constants/batTinh.js';
import { DIGIT_MEANINGS, getDigitMeaning } from '../constants/digitMeanings.js';

export class UniversalAnalysisEngine {
    
    /**
     * Phân tích số điện thoại - dựa từ analysisService.js backend
     */
    static analyzePhoneNumber(phoneNumber) {
        try {
            // Normalize phone number
            const normalized = this.normalizePhoneNumber(phoneNumber);
            
            // Generate pairs using password pairing logic (handles 0/5 like backend)
            const pairs = this.generatePasswordPairs(normalized.normalizedNumber);
            
            // Analyze each pair (logic identical với analyzePassword)
            const pairsAnalysis = pairs.map((pair, index) => {
                const fiveCount = (pair.match(/5/g) || []).length;

                // Ưu tiên tra cứu sao với chuỗi gốc (để bắt *_ZERO)
                let starInfo = getStarInfoForPair(pair);
                let recordedPair = pair;

                // Nếu không tìm thấy, fallback bỏ 0/5 và cắt còn 2 ký tự đầu
                if (starInfo.key === 'UNKNOWN') {
                    let basePair = pair.replace(/[05]/g, '');
                    if (basePair.length > 2) basePair = basePair.substring(0, 2);
                    starInfo = getStarInfoForPair(basePair);
                    recordedPair = basePair;
                }

                let energyLevel = (starInfo.energy || 0) + fiveCount;
                energyLevel = Math.min(4, energyLevel);

                return {
                    pairNumber: index + 1,
                    digits: pair,
                    originalPair: recordedPair,
                    fiveBoost: fiveCount,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    detailedDescription: starInfo.detailedDescription,
                    nature: starInfo.nature,
                    energyLevel,
                    baseEnergyLevel: starInfo.energy || 0,
                    position: starInfo.position
                };
            });
            
            // Calculate overall score
            const overallScore = this.calculateOverallScore(pairsAnalysis);
            
            // Analyze digit meanings
            const digitMeanings = this.analyzeDigitMeanings(normalized.normalizedNumber);
            
            return {
                originalNumber: phoneNumber,
                normalizedNumber: normalized.normalizedNumber,
                pairs: pairs,
                pairsAnalysis: pairsAnalysis,
                overallScore: overallScore,
                digitMeanings: digitMeanings,
                specialSequences: normalized.specialSequences,
                summary: this.generateSummary(pairsAnalysis, overallScore),
                recommendations: this.generateRecommendations(pairsAnalysis, overallScore)
            };
        } catch (error) {
            console.error('Phone analysis error:', error);
            return { error: 'Lỗi khi phân tích số điện thoại' };
        }
    }
    
    /**
     * Phân tích số CCCD - dựa từ cccdAnalysisController.js backend
     */
    static analyzeCCCD(cccdNumber) {
        try {
            // Extract last 6 digits
            const lastSix = cccdNumber.slice(-6);
            
            // Xử lý quy tắc thay thế số 0 (giữ nguyên số 5)
            const processedSequence = this.replaceZeroDigits(lastSix);
            
            // Sinh các cặp số theo quy tắc đặc biệt (có 5)
            const pairs = this.generateCccdPairs(processedSequence);

            // Chuỗi chuẩn hoá để hiển thị (bỏ số 5)
            const normalizedSequence = processedSequence.replace(/5/g, "");
            
            // Tổng số 5 trong chuỗi gốc (dùng để hiển thị/ thống kê)
            const totalFiveCount = (processedSequence.match(/5/g) || []).length;

            // Phân tích từng cặp
            const pairsAnalysis = pairs.map((pair, index) => {
                const fiveCountInPair = (pair.match(/5/g) || []).length;
                const basePair = pair.replace(/5/g, ""); // 2 chữ số cơ sở để tra sao

                const starInfo = getStarInfoForPair(basePair);
                let energyLevel = starInfo.energy || 0;

                // Tăng năng lượng theo số 5 trong cặp (mỗi 5 +1, tối đa 4)
                energyLevel = Math.min(4, energyLevel + fiveCountInPair);

                return {
                    pairNumber: index + 1,
                    digits: pair,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    detailedDescription: starInfo.detailedDescription,
                    nature: starInfo.nature,
                    energyLevel,
                    fiveBoost: fiveCountInPair,
                    baseEnergyLevel: starInfo.energy || 0,
                    isInauspicious: starInfo.nature === "Hung"
                };
            });
            
            // Tính điểm tổng
            const overallScore = this.calculateOverallScore(pairsAnalysis);

            // Ghi chú hóa giải
            const remedyNotes = this.generateCCCDRemedyNotes(pairsAnalysis);
            
            return {
                originalNumber: cccdNumber,
                lastSixDigits: lastSix,
                processedSequence,
                normalizedSequence,
                fiveCount: totalFiveCount,
                pairs,
                pairsAnalysis,
                overallScore,
                characteristics: this.generateCCCDCharacteristics(pairsAnalysis),
                remedyNotes,
                summary: this.generateCCCDSummary(pairsAnalysis, normalizedSequence, pairs),
                recommendations: this.generateRecommendations(pairsAnalysis, overallScore)
            };
        } catch (error) {
            console.error("CCCD analysis error:", error);
            return { error: "Lỗi khi phân tích số CCCD" };
        }
    }
    
    /**
     * Phân tích số chung (ngân hàng, mật khẩu, v.v.)
     */
    static analyzeGenericNumber(number, type) {
        try {
            // Normalize number
            const cleanNumber = number.replace(/\D/g, '');
            
            // Generate pairs
            const pairs = this.generatePairs(cleanNumber);
            
            // Analyze pairs
            const pairsAnalysis = pairs.map((pair, index) => {
                const cleanPair = pair.replace(/5/g, ''); // Remove 5s to find base star
                const fiveCount = (pair.match(/5/g) || []).length; // Count 5s in pair
                
                const starInfo = getStarInfoForPair(cleanPair);
                let energyLevel = starInfo.energy || 0;
                
                // Boost energy by 1 level for each '5' in the pair
                energyLevel += fiveCount;
                
                // Cap energy level at 4 (max level)
                energyLevel = Math.min(energyLevel, 4);
                
                return {
                    pairNumber: index + 1,
                    digits: pair,
                    originalPair: cleanPair, // Store cleaned pair for reference
                    fiveBoost: fiveCount, // Store number of 5s for transparency
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    nature: starInfo.nature,
                    energyLevel: energyLevel,
                    baseEnergyLevel: starInfo.energy // Keep base level for reference
                };
            });
            
            // Calculate overall score
            const overallScore = this.calculateOverallScore(pairsAnalysis);
            
            return {
                originalNumber: number,
                normalizedNumber: cleanNumber,
                pairs: pairs,
                pairsAnalysis: pairsAnalysis,
                overallScore: overallScore,
                summary: this.generateGenericSummary(pairsAnalysis, type),
                recommendations: this.generateRecommendations(pairsAnalysis, overallScore)
            };
        } catch (error) {
            console.error('Generic number analysis error:', error);
            return { error: `Lỗi khi phân tích ${type}` };
        }
    }
    
    /**
     * Normalize phone number - dựa từ backend
     */
    static normalizePhoneNumber(phoneNumber) {
        let cleaned = phoneNumber.replace(/\D/g, '');
        
        // Remove leading 0
        if (cleaned.startsWith('0')) {
            cleaned = cleaned.substring(1);
        }
        
        // Normalize consecutive 0 and 5 digits
        let normalized = "";
        let prev = "";
        for (let i = 0; i < cleaned.length; i++) {
            const currentDigit = cleaned[i];
            
            // Skip if this is a repeat of 0 or 5
            if ((currentDigit === "0" || currentDigit === "5") && currentDigit === prev) {
                continue;
            }
            
            normalized += currentDigit;
            prev = currentDigit;
        }
        
        // Track special patterns
        const specialSequences = {
            zeroPatterns: this.findSpecialDigitPatterns(cleaned, '0'),
            fivePatterns: this.findSpecialDigitPatterns(cleaned, '5')
        };
        
        return {
            normalizedNumber: normalized,
            originalNumber: cleaned,
            specialSequences
        };
    }
    
    /**
     * Normalize CCCD sequence - dựa từ backend
     */
    static normalizeCccdSequence(digits) {
        let processedDigits = digits.split('');
        const lastOriginalDigit = digits[digits.length - 1];
        
        // Handle '0's
        for (let i = 0; i < processedDigits.length; i++) {
            if (processedDigits[i] === '0') {
                let j = i - 1;
                while (j >= 0 && processedDigits[j] === '0') {
                    j--;
                }
                processedDigits[i] = (j >= 0) ? processedDigits[j] : lastOriginalDigit;
            }
        }
        
        // Return both original processed digits (with 5s) and a version with 5s removed
        const withFives = processedDigits.join('');
        const withoutFives = withFives.replace(/5/g, '');
        
        // Return only the version without 5s (5s will boost energy in pair analysis)
        return withoutFives;
    }
    
    /**
     * Generate pairs - dựa từ backend
     */
    static generatePairs(digits) {
        digits = String(digits);
        
        // Remove leading 0 if present
        if (digits.startsWith('0')) {
            digits = digits.substring(1);
        }
        
        const pairs = [];
        let i = 0;
        
        while (i < digits.length - 1) {
            const current = digits[i];
            const next = digits[i + 1];
            
            // Skip if current digit is 0 (0 is still handled by replacement)
            if (current === '0') {
                i++;
                continue;
            }
            
            // Form pair including 5s (5s will boost energy, not be removed)
                pairs.push(current + next);
                i += 1; // Move by 1 for overlapping pairs
        }
        
        return pairs;
    }
    
    /**
     * Split into overlapping pairs
     */
    static splitIntoOverlappingPairs(sequence) {
        const pairs = [];
        if (!sequence || sequence.length < 2) {
            return pairs;
        }
        for (let i = 0; i < sequence.length - 1; i++) {
            pairs.push(sequence.substring(i, i + 2));
        }
        return pairs;
    }
    
    /**
     * Find special digit patterns
     */
    static findSpecialDigitPatterns(number, specialDigit) {
        const patterns = [];
        
        for (let i = 0; i < number.length - 2; i++) {
            const triplet = number.substring(i, i + 3);
            
            if (triplet.includes(specialDigit)) {
                let effect = specialDigit === '0' ? 'hoa_hung' : 'duoc_tang_cuong';
                let description = specialDigit === '0' 
                    ? "Làm giảm năng lượng" 
                    : "Tăng cường năng lượng";
                
                patterns.push({
                    pattern: triplet,
                    position: `${i + 1}-${i + 3}`,
                    type: effect,
                    description
                });
            }
        }
        
        return patterns;
    }
    
    /**
     * Calculate overall score
     */
    static calculateOverallScore(pairsAnalysis) {
        if (!pairsAnalysis || pairsAnalysis.length === 0) return 0;
        
        let totalScore = 0;
        let totalWeight = 0;
        
        pairsAnalysis.forEach(analysis => {
            let score = 50; // Base score
            
            // Adjust score based on star nature
            if (analysis.nature === 'Cát') {
                score += 30;
            } else if (analysis.nature === 'Hung') {
                score -= 30;
            }
            
            // Adjust score based on energy level
            if (analysis.energyLevel) {
                score += (analysis.energyLevel - 2) * 5; // Energy from 1-4, adjust ±10
            }
            
            // Weight by position (later pairs have more weight)
            const weight = 1 + (analysis.pairNumber - 1) * 0.1;
            
            totalScore += score * weight;
            totalWeight += weight;
        });
        
        const averageScore = totalWeight > 0 ? totalScore / totalWeight : 50;
        return Math.min(Math.max(Math.round(averageScore), 0), 100);
    }
    
    /**
     * Analyze digit meanings
     */
    static analyzeDigitMeanings(number) {
        const digits = number.split('');
        const meanings = [];

        // Define indices for the 3 key positions
        const lastIdx = digits.length - 1;
        const thirdFromEndIdx = digits.length - 3;
        const fifthFromEndIdx = digits.length - 5;

        const indicesToInclude = new Set([lastIdx, thirdFromEndIdx, fifthFromEndIdx]);
        
        digits.forEach((digit, index) => {
            if (!indicesToInclude.has(index)) return; // Skip non-target positions

            let positionKey = 'single';
            if (index === thirdFromEndIdx) positionKey = 'third_from_end';
            if (index === fifthFromEndIdx) positionKey = 'fifth_from_end';
            
            meanings.push({
                digit: digit,
                position: index + 1,
                meaning: getDigitMeaning(digit, positionKey),
                significance: positionKey
            });
        });
        
        return meanings;
    }
    
    /**
     * Calculate dominant stars based on total energy and frequency
     */
    static calculateDominantStars(pairsAnalysis) {
        if (!pairsAnalysis || pairsAnalysis.length === 0) {
            return [];
        }

        // Calculate total energy and frequency for each star
        const starStats = {};
        pairsAnalysis.forEach(pair => {
            const starKey = pair.starKey;
            if (!starStats[starKey]) {
                starStats[starKey] = {
                    starKey: starKey,
                    star: pair.star,
                    totalEnergy: 0,
                    frequency: 0,
                    detailedDescription: pair.detailedDescription
                };
            }
            starStats[starKey].totalEnergy += pair.energyLevel;
            starStats[starKey].frequency += 1;
        });

        const stars = Object.values(starStats);

        // Find star with highest total energy
        const maxEnergyStars = stars.filter(star => 
            star.totalEnergy === Math.max(...stars.map(s => s.totalEnergy))
        );

        // Find star with highest frequency
        const maxFrequencyStars = stars.filter(star => 
            star.frequency === Math.max(...stars.map(s => s.frequency))
        );

        // Determine dominant stars
        const dominantStars = [];
        
        // If same star has both highest energy and frequency, take only one
        const energyStar = maxEnergyStars[0];
        const frequencyStar = maxFrequencyStars[0];
        
        if (energyStar.starKey === frequencyStar.starKey) {
            dominantStars.push({
                ...energyStar,
                reason: `tổng năng lượng ${energyStar.totalEnergy} và lặp ${energyStar.frequency} lần`
            });
        } else {
            // Take both stars if different
            dominantStars.push({
                ...energyStar,
                reason: `tổng năng lượng ${energyStar.totalEnergy}`
            });
            dominantStars.push({
                ...frequencyStar,
                reason: `lặp ${frequencyStar.frequency} lần`
            });
        }

        return dominantStars;
    }

    /**
     * Generate summary
     */
    static generateSummary(pairsAnalysis, overallScore) {
        if (!pairsAnalysis || pairsAnalysis.length === 0) {
            return "Không thể phân tích được số này.";
        }
        
        const starSequence = pairsAnalysis.map(p => `${p.star} (${p.energyLevel}/4)`).join(' → ');
        const dominantStars = this.calculateDominantStars(pairsAnalysis);
        
        let summary = `Dãy số có ${pairsAnalysis.length} cặp số ứng với chuỗi sao: ${starSequence}.`;
        
        // Add dominant stars section
        if (dominantStars.length > 0) {
            const dominantStarTexts = dominantStars.map(star => `${star.star} (${star.reason})`);
            summary += `\n\nDãy số có chủ đạo là ${dominantStarTexts.join(' và ')}.`;
            
            // Add detailed descriptions
            dominantStars.forEach(star => {
                if (star.detailedDescription) {
                    summary += `\n\n**${star.star}**: ${star.detailedDescription}`;
                }
            });
        }
        
        return summary;
    }
    
    /**
     * Generate CCCD summary
     */
    static generateCCCDSummary(pairsAnalysis, normalized, pairs) {
        const starSequence = pairsAnalysis.map(p => `${p.star} (${p.energyLevel}/4)`).join(' → ');
        const totalFive = pairsAnalysis.reduce((acc,p)=>acc+p.fiveBoost,0);
        const fiveInfo = totalFive > 0 ? ` Có ${totalFive} số 5 tăng năng lượng.` : '';
        const dominantStars = this.calculateDominantStars(pairsAnalysis);
        
        let summary = `Dãy số có ${pairs.length} cặp số ứng với chuỗi sao: ${starSequence}.${fiveInfo}`;
        
        // Add dominant stars section
        if (dominantStars.length > 0) {
            const dominantStarTexts = dominantStars.map(star => `${star.star} (${star.reason})`);
            summary += `\n\nDãy số có chủ đạo là ${dominantStarTexts.join(' và ')}.`;
            
            // Add detailed descriptions
            dominantStars.forEach(star => {
                if (star.detailedDescription) {
                    summary += `\n\n**${star.star}**: ${star.detailedDescription}`;
                }
            });
        }
        
        return summary;
    }
    
    /**
     * Generate generic summary
     */
    static generateGenericSummary(pairsAnalysis, type) {
        const starSequence = pairsAnalysis.map(p => `${p.star} (${p.energyLevel}/4)`).join(' → ');
        const dominantStars = this.calculateDominantStars(pairsAnalysis);
        
        let summary = `Dãy số có ${pairsAnalysis.length} cặp số ứng với chuỗi sao: ${starSequence}.`;
        
        // Add dominant stars section
        if (dominantStars.length > 0) {
            const dominantStarTexts = dominantStars.map(star => `${star.star} (${star.reason})`);
            summary += `\n\nDãy số có chủ đạo là ${dominantStarTexts.join(' và ')}.`;
            
            // Add detailed descriptions
            dominantStars.forEach(star => {
                if (star.detailedDescription) {
                    summary += `\n\n**${star.star}**: ${star.detailedDescription}`;
                }
            });
        }
        
        return summary;
    }
    
    /**
     * Generate recommendations
     */
    static generateRecommendations(pairsAnalysis, overallScore) {
        const recommendations = [];
        
        // Count star types
        const starCounts = {};
        pairsAnalysis.forEach(analysis => {
            starCounts[analysis.nature] = (starCounts[analysis.nature] || 0) + 1;
        });
        
        // General recommendations based on score
        if (overallScore >= 80) {
            recommendations.push("Số này có năng lượng rất tốt, phù hợp sử dụng lâu dài.");
        } else if (overallScore >= 60) {
            recommendations.push("Số này có năng lượng khá tốt, có thể sử dụng.");
        } else if (overallScore >= 40) {
            recommendations.push("Số này có năng lượng trung bình, cần cân nhắc kỹ trước khi sử dụng.");
        } else {
            recommendations.push("Số này có năng lượng không tốt, nên tránh sử dụng.");
        }
        
        // Specific recommendations based on star distribution
        if (starCounts['Cát'] > starCounts['Hung']) {
            recommendations.push("Nhiều sao cát, mang lại may mắn và thuận lợi.");
        } else if (starCounts['Hung'] > starCounts['Cát']) {
            recommendations.push("Nhiều sao hung, cần thận trọng và có phương án dự phòng.");
        }
        
        return recommendations;
    }
    
    /**
     * Get score level description
     */
    static getScoreLevel(score) {
        if (score >= 80) return "Xuất sắc";
        if (score >= 60) return "Tốt";
        if (score >= 40) return "Trung bình";
        if (score >= 20) return "Kém";
        return "Rất kém";
    }
    
    // Removed analyzeZeroHandling method - no longer needed with new 5-boost logic
    
    /**
     * Tạo đặc tính cho CCCD (chỉ nêu đặc tính, không có lựa chọn)
     */
    static generateCCCDCharacteristics(pairsAnalysis) {
        const characteristics = [];
        const starCounts = {};
        
        // Đếm số lượng từng loại sao
        pairsAnalysis.forEach(analysis => {
            const starKey = analysis.starKey;
            starCounts[starKey] = (starCounts[starKey] || 0) + 1;
        });
        
        // Phân tích đặc tính tổng quát
        const totalPairs = pairsAnalysis.length;
        const auspiciousPairs = pairsAnalysis.filter(p => p.nature === 'Cát').length;
        const inauspiciousPairs = pairsAnalysis.filter(p => p.nature === 'Hung').length;
        
        characteristics.push({
            category: 'Tổng quan',
            description: `Có ${totalPairs} cặp số, trong đó ${auspiciousPairs} cặp cát tinh và ${inauspiciousPairs} cặp hung tinh.`
        });
        
        // Phân tích từng sao đặc biệt
        Object.keys(starCounts).forEach(starKey => {
            const count = starCounts[starKey];
            if (count > 0) {
                const starInfo = this.getStarCharacteristics(starKey);
                characteristics.push({
                    category: `${starInfo.name} (${count} cặp)`,
                    description: starInfo.characteristicDescription || starInfo.description
                });
            }
        });
        
        return characteristics;
    }
    
    /**
     * Tạo ghi chú hóa giải cho CCCD
     */
    static generateCCCDRemedyNotes(pairsAnalysis) {
        const remedyNotes = [];
        const inauspiciousStars = pairsAnalysis.filter(p => p.nature === 'Hung');
        
        if (inauspiciousStars.length === 0) {
            remedyNotes.push({
                type: 'info',
                title: 'Không cần hóa giải',
                content: 'Số CCCD này không có hung tinh, năng lượng tốt.'
            });
            return remedyNotes;
        }
        
        remedyNotes.push({
            type: 'warning',
            title: 'Lưu ý về tiên thiên hung tinh',
            content: 'Số CCCD này có hung tinh thuộc về tiên thiên (bẩm sinh). Cần sử dụng các số khác để hóa giải.'
        });
        
        // Phân tích từng hung tinh và cách hóa giải
        const starRemedies = {};
        inauspiciousStars.forEach(star => {
            if (!starRemedies[star.starKey]) {
                starRemedies[star.starKey] = {
                    star: star.star,
                    count: 0,
                    remedy: this.getRemedyForStar(star.starKey)
                };
            }
            starRemedies[star.starKey].count++;
        });
        
        Object.values(starRemedies).forEach(remedy => {
            remedyNotes.push({
                type: 'remedy',
                title: `Hóa giải ${remedy.star}`,
                content: remedy.remedy,
                starCount: remedy.count
            });
        });
        
        // Ghi chú tổng quát về hóa giải
        remedyNotes.push({
            type: 'general',
            title: 'Cách thức hóa giải',
            content: 'Sử dụng số điện thoại, mật khẩu hoặc các số khác có chứa sao hóa giải tương ứng. Ví dụ: chọn số điện thoại có chứa Thiên Y để khắc phục Tuyệt Mệnh trong CCCD.'
        });
        
        return remedyNotes;
    }
    
    /**
     * Lấy thông tin đặc tính của sao
     */
    static getStarCharacteristics(starKey) {
        const starMap = {
            'SINH_KHI': {
                name: 'Sinh Khí',
                characteristicDescription: 'Tính cách lạc quan, nhìn mọi thứ thoáng đãng. Thích giúp đỡ người khác, có nhiều bạn bè và quý nhân. Dễ tiếp nhận thông tin mới nhưng hơi lười thay đổi.'
            },
            'THIEN_Y': {
                name: 'Thiên Y', 
                characteristicDescription: 'Thông minh, thiện lương, hào phóng. Tính tình giản đơn, không có tâm cơ thâm hiểm. Tiền tài đổ về từ nhiều nguồn nhưng dễ bị lừa vì quá thiện lương.'
            },
            'DIEN_NIEN': {
                name: 'Diên Niên',
                characteristicDescription: 'Có tính lãnh đạo, không dễ thuyết phục. Trọng chữ tín, có trách nhiệm, kiên trì. Thích tiết kiệm, tính toán cẩn thận nhưng hơi cứng nhắc.'
            },
            'PHUC_VI': {
                name: 'Phục Vị',
                characteristicDescription: 'Giỏi chịu đựng, có nghị lực. Lập trường vững vàng nhưng thường lo lắng, thiếu cảm giác an toàn. Quá bảo thủ, sợ mạo hiểm.'
            },
            'HOA_HAI': {
                name: 'Họa Hại',
                characteristicDescription: 'Thông minh, khẩu tiết tốt, thích nói chuyện. Có khả năng hùng biện nhưng dễ gây hấn, dễ mắc lỗi về lời nói.'
            },
            'LUC_SAT': {
                name: 'Lục Sát',
                characteristicDescription: 'Dễ gặp tiểu nhân, thị phi, mất mát tài sản. Thường gặp rắc rối pháp lý, bị lừa gạt hoặc lợi dụng.'
            },
            'NGU_QUY': {
                name: 'Ngũ Quỷ',
                characteristicDescription: 'Tính cách hay thay đổi, không kiên định. Dễ bị ảnh hưởng, thiếu chủ kiến vững vàng. Thích khám phá nhưng thiếu kiên trì.'
            },
            'TUYET_MENH': {
                name: 'Tuyệt Mệnh',
                characteristicDescription: 'Gặp nhiều khó khăn, thử thách lớn. Dễ gặp tai nạn, bệnh tật. Tuy nhiên có sức chịu đựng tốt, nếu vượt qua sẽ có thành tựu lớn.'
            }
        };
        
        return starMap[starKey] || { name: starKey, characteristicDescription: 'Đặc tính chưa được định nghĩa' };
    }
    
    /**
     * Lấy cách hóa giải cho từng hung tinh
     */
    static getRemedyForStar(starKey) {
        const remedies = {
            'TUYET_MENH': 'Cần sử dụng Thiên Y để khắc phục. Chọn số điện thoại, mật khẩu có chứa các cặp: 13, 31, 68, 86, 49, 94, 27, 72.',
            'LUC_SAT': 'Cần sử dụng Diên Niên để khắc phục. Chọn số điện thoại, mật khẩu có chứa các cặp: 19, 91, 78, 87, 34, 43, 26, 62.',
            'HOA_HAI': 'Cần sử dụng Sinh Khí để khắc phục. Chọn số điện thoại, mật khẩu có chứa các cặp: 14, 41, 67, 76, 39, 93, 28, 82.',
            'NGU_QUY': 'Cần sử dụng ba sao cát (Sinh Khí, Thiên Y, Diên Niên) để khắc phục. Ưu tiên theo thứ tự: Sinh Khí → Thiên Y → Diên Niên. Chọn số có chứa nhiều cặp từ ba nhóm sao này.'
        };
        
        return remedies[starKey] || 'Cần tham khảo thêm để có phương án hóa giải phù hợp.';
    }
    
    /**
     * Main analysis function
     */
    static analyze(value, type) {
        switch (type) {
            case 'phone':
                return this.analyzePhoneNumber(value);
            case 'cccd':
                return this.analyzeCCCD(value);
            case 'birthdate':
                return this.analyzeBirthdate(value);
            case 'bankAccount':
                return this.analyzeBankAccount(value);
            case 'password':
                return this.analyzePassword(value);
            case 'random':
                return this.analyzePassword(value);
            default:
                return { error: 'Loại số không được hỗ trợ' };
        }
    }

    static replaceZeroDigits(digits) {
        const arr = digits.split('');
        const lastDigit = digits[digits.length - 1];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '0') {
                let j = i - 1;
                while (j >= 0 && arr[j] === '0') {
                    j--;
                }
                arr[i] = j >= 0 ? arr[j] : lastDigit;
            }
        }
        return arr.join('');
    }

    /**
     * Tạo cặp số cho CCCD theo quy tắc đặc biệt có số 5
     * Ví dụ:
     *  - 789457  => 78, 89, 94, 457
     *  - 7855    => 7855
     *  - 78557   => 78, 8557
     */
    static generateCccdPairs(seq) {
        const pairs = [];
        let i = 0;
        const n = seq.length;
        while (i < n - 1) {
            // Bỏ qua vị trí bắt đầu bằng số 5
            if (seq[i] === '5') {
                i++;
                continue;
            }
            const current = seq[i];
            const next = seq[i + 1];

            if (next === '5') {
                // Bắt đầu mở rộng tới sau dãy 5 liên tiếp
                let j = i + 1;
                while (j + 1 < n && seq[j + 1] === '5') {
                    j++;
                }

                if (j + 1 < n) {
                    // Có ký tự khác 5 phía sau, lấy cả ký tự đó
                    const pair = seq.substring(i, j + 2);
                    pairs.push(pair);
                } else {
                    // 5 kéo tới cuối chuỗi – ghép cả ký tự trước (i-1) nếu có để đủ cặp
                    const start = i > 0 ? i - 1 : 0;
                    const pair = seq.substring(start);
                    // Nếu cặp mới bao trùm cặp ngay trước thì bỏ cặp trước
                    if (pairs.length > 0 && pair.includes(pairs[pairs.length - 1])) {
                        pairs.pop();
                    }
                    pairs.push(pair);
                    break; // đã tới cuối
                }
            } else {
                // Cặp 2 ký tự chồng lấn bình thường
                const pair = seq.substring(i, i + 2);
                pairs.push(pair);
            }
            i++;
        }
        return pairs;
    }

    /**
     * Phân tích ngày sinh – chuyển dd/mm/yyyy → yyyymmdd rồi áp dụng quy tắc CCCD
     */
    static analyzeBirthdate(birthdateStr) {
        try {
            // Chấp nhận các dấu phân cách / hoặc - hoặc không có
            const cleaned = birthdateStr.trim();
            const delimiterMatch = cleaned.match(/[-/]/);

            let day, month, year;
            if (delimiterMatch) {
                // dd/mm/yyyy or dd-mm-yyyy
                const parts = cleaned.split(/[-/]/);
                if (parts.length !== 3) {
                    return { error: 'Ngày sinh không hợp lệ' };
                }
                [day, month, year] = parts;
            } else if (cleaned.length === 8) {
                // If already yyyymmdd (fallback)
                year = cleaned.substring(0, 4);
                month = cleaned.substring(4, 6);
                day = cleaned.substring(6, 8);
            } else {
                return { error: 'Ngày sinh không hợp lệ' };
            }

            // Pad values if needed
            day = day.padStart(2, '0');
            month = month.padStart(2, '0');
            year = year.padStart(4, '0');

            const yyyymmdd = `${year}${month}${day}`;

            // Áp dụng quy tắc CCCD
            const processedSequence = this.replaceZeroDigits(yyyymmdd);
            const pairs = this.generateCccdPairs(processedSequence);
            const normalizedSequence = processedSequence.replace(/5/g, '');
            const totalFiveCount = (processedSequence.match(/5/g) || []).length;

            // Phân tích từng cặp giống CCCD
            const pairsAnalysis = pairs.map((pair, index) => {
                const fiveCountInPair = (pair.match(/5/g) || []).length;
                const basePair = pair.replace(/5/g, '');

                const starInfo = getStarInfoForPair(basePair);
                let energyLevel = (starInfo.energy || 0) + fiveCountInPair;
                energyLevel = Math.min(4, energyLevel);

                return {
                    pairNumber: index + 1,
                    digits: pair,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    detailedDescription: starInfo.detailedDescription,
                    nature: starInfo.nature,
                    energyLevel,
                    fiveBoost: fiveCountInPair,
                    baseEnergyLevel: starInfo.energy || 0,
                    isInauspicious: starInfo.nature === 'Hung'
                };
            });

            const overallScore = this.calculateOverallScore(pairsAnalysis);

            return {
                originalDate: birthdateStr,
                numericDate: yyyymmdd,
                processedSequence,
                normalizedSequence,
                fiveCount: totalFiveCount,
                pairs,
                pairsAnalysis,
                overallScore,
                summary: this.generateCCCDSummary(pairsAnalysis, normalizedSequence, pairs),
                recommendations: this.generateRecommendations(pairsAnalysis, overallScore)
            };
        } catch (error) {
            console.error('Birthdate analysis error:', error);
            return { error: 'Lỗi khi phân tích ngày sinh' };
        }
    }

    /**
     * Phân tích số tài khoản – dùng cùng logic với CCCD (xử lý 0, 5, cặp đặc biệt)
     */
    static analyzeBankAccount(accountNumber) {
        try {
            const cleaned = accountNumber.replace(/\D/g, '');
            if (!cleaned) {
                return { error: 'Số tài khoản không hợp lệ' };
            }

            // Xử lý quy tắc 0 và 5
            const processedSequence = this.replaceZeroDigits(cleaned);
            const pairs = this.generateCccdPairs(processedSequence);
            const normalizedSequence = processedSequence.replace(/5/g, '');
            const totalFiveCount = (processedSequence.match(/5/g) || []).length;

            const pairsAnalysis = pairs.map((pair, index) => {
                const fiveCountInPair = (pair.match(/5/g) || []).length;
                const basePair = pair.replace(/5/g, '');

                const starInfo = getStarInfoForPair(basePair);
                let energyLevel = (starInfo.energy || 0) + fiveCountInPair;
                energyLevel = Math.min(4, energyLevel);

                return {
                    pairNumber: index + 1,
                    digits: pair,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    detailedDescription: starInfo.detailedDescription,
                    nature: starInfo.nature,
                    energyLevel,
                    fiveBoost: fiveCountInPair,
                    baseEnergyLevel: starInfo.energy || 0,
                    isInauspicious: starInfo.nature === 'Hung'
                };
            });

            const overallScore = this.calculateOverallScore(pairsAnalysis);

            return {
                originalNumber: accountNumber,
                cleanedNumber: cleaned,
                processedSequence,
                normalizedSequence,
                fiveCount: totalFiveCount,
                pairs,
                pairsAnalysis,
                overallScore,
                summary: this.generateCCCDSummary(pairsAnalysis, normalizedSequence, pairs),
                recommendations: this.generateRecommendations(pairsAnalysis, overallScore)
            };
        } catch (error) {
            console.error('Bank account analysis error:', error);
            return { error: 'Lỗi khi phân tích số tài khoản' };
        }
    }

    /**
     * Sinh cặp cho mật khẩu: tương tự điện thoại nhưng kéo dài qua 0 hoặc 5
     */
    static generatePasswordPairs(seq) {
        const pairs = [];
        const n = seq.length;
        let i = 0;
        while (i < n - 1) {
            const current = seq[i];

            // Handle starting digit is special (0 or 5)
            if ((current === '0' || current === '5')) {
                const end = Math.min(i + 3, n);
                pairs.push(seq.substring(i, end));
                i += (end - i - 1);
                continue;
            }

            let j = i + 1;
            let sawSpecial = false;

            while (j < n) {
                const curr = seq[j];

                if (curr === '0' || curr === '5') {
                    sawSpecial = true;
                    j++;
                    // Nếu special ở cuối chuỗi, dừng
                    if (j >= n) break;
                    continue;
                }

                // curr không phải special
                if (sawSpecial) {
                    // Đã đi qua ít nhất một special, lấy curr rồi dừng
                    j++;
                    break;
                }

                // Chưa gặp special, kiểm tra ký tự kế tiếp có special không
                const nextChar = j + 1 < n ? seq[j + 1] : null;
                if (nextChar === '0' || nextChar === '5') {
                    // Nếu special kế tiếp nằm ở cuối chuỗi (j+2 >= n) thì kéo tới cuối
                    if (j + 2 >= n) {
                        j += 2; // lấy luôn special cuối cùng
                    }
                    // Nếu sau special vẫn còn ký tự khác → không kéo, kết thúc tại curr
                    else {
                        j++;
                    }
                    break;
                }

                // Không có special liền kề, dừng sau khi có đủ 2 ký tự
                j++;
                break;
            }

            const groupStart = i;
            let group = seq.substring(i, Math.min(j, n));

            // Nếu đã gặp special và phần còn lại toàn special → gom hết
            if (sawSpecial && j < n) {
                let m = j;
                while (m < n && (seq[m] === '0' || seq[m] === '5')) {
                    m++;
                }
                if (m === n) {
                    group = seq.substring(groupStart, n);
                    j = n;
                }
            }
            pairs.push(group);
            i += group.length - 1;
        }
        return pairs;
    }

    /**
     * Phân tích mật khẩu số theo quy tắc mới (0/5 đặc biệt)
     */
    static analyzePassword(password) {
        try {
            // Chuyển chuỗi (có thể chứa chữ) thành số
            const cleaned = this.convertPasswordToDigits(password);
            if (!cleaned) {
                return { error: 'Mật khẩu không hợp lệ' };
            }

            const pairs = this.generatePasswordPairs(cleaned);

            const pairsAnalysis = pairs.map((pair, index) => {
                const fiveCount = (pair.match(/5/g) || []).length;

                // Ưu tiên tra cứu sao với chuỗi gốc (có số 0) để bắt biến thể _ZERO
                let starInfo = getStarInfoForPair(pair);
                let basePairForRecord = pair;

                // Nếu không tìm thấy, fallback: bỏ 0 & 5 và lấy 2 ký tự đầu
                if (starInfo.key === 'UNKNOWN') {
                    let basePair = pair.replace(/[05]/g, '');
                    if (basePair.length > 2) basePair = basePair.substring(0, 2);
                    starInfo = getStarInfoForPair(basePair);
                    basePairForRecord = basePair;
                }

                let energyLevel = (starInfo.energy || 0) + fiveCount;
                energyLevel = Math.min(4, energyLevel);

                return {
                    pairNumber: index + 1,
                    digits: pair,
                    originalPair: basePairForRecord,
                    fiveBoost: fiveCount,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    detailedDescription: starInfo.detailedDescription,
                    nature: starInfo.nature,
                    energyLevel,
                    baseEnergyLevel: starInfo.energy || 0
                };
            });

            const overallScore = this.calculateOverallScore(pairsAnalysis);

            return {
                originalNumber: password,
                cleanedNumber: cleaned,
                pairs,
                pairsAnalysis,
                overallScore,
                summary: this.generateSummary(pairsAnalysis, overallScore),
                recommendations: this.generateRecommendations(pairsAnalysis, overallScore)
            };
        } catch (error) {
            console.error('Password analysis error:', error);
            return { error: 'Lỗi khi phân tích mật khẩu' };
        }
    }

    /**
     * Chuyển mật khẩu có cả chữ và số thành chuỗi số theo quy tắc:
     *  - Bỏ dấu tiếng Việt, chuyển sang không dấu
     *  - a/A = 1, b/B = 2, ..., z/Z = 26
     *  - Số 0-9 giữ nguyên
     */
    static convertPasswordToDigits(raw) {
        if (!raw) return '';
        // 1. Remove accent
        const withoutAccent = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        let result = '';
        for (const ch of withoutAccent) {
            if (/^[a-zA-Z]$/.test(ch)) {
                const val = ch.toLowerCase().charCodeAt(0) - 96; // 1-26
                result += String(val);
            } else if (/^[0-9]$/.test(ch)) {
                result += ch;
            } else {
                // Skip other chars
            }
        }
        return result;
    }
} 