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
            
            // Generate pairs 
            const pairs = this.generatePairs(normalized.normalizedNumber);
            
            // Analyze each pair
            const pairsAnalysis = pairs.map((pair, index) => {
                const starInfo = getStarInfoForPair(pair);
                return {
                    pairNumber: index + 1,
                    digits: pair,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    detailedDescription: starInfo.detailedDescription,
                    nature: starInfo.nature,
                    energyLevel: starInfo.energy,
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
            
            // Normalize the sequence (handles '0' and removes '5')
            const normalized = this.normalizeCccdSequence(lastSix);
            
            // Split into overlapping pairs
            const pairs = this.splitIntoOverlappingPairs(normalized);
            
            // Analyze pairs
            const pairsAnalysis = pairs.map((pair, index) => {
                const starInfo = getStarInfoForPair(pair);
                return {
                    pairNumber: index + 1,
                    digits: pair,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    nature: starInfo.nature,
                    energyLevel: starInfo.energy
                };
            });
            
            // Calculate overall score
            const overallScore = this.calculateOverallScore(pairsAnalysis);
            
            return {
                originalNumber: cccdNumber,
                lastSixDigits: lastSix,
                normalizedSequence: normalized,
                pairs: pairs,
                pairsAnalysis: pairsAnalysis,
                overallScore: overallScore,
                summary: this.generateCCCDSummary(pairsAnalysis, normalized, pairs),
                recommendations: this.generateRecommendations(pairsAnalysis, overallScore)
            };
        } catch (error) {
            console.error('CCCD analysis error:', error);
            return { error: 'Lỗi khi phân tích số CCCD' };
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
                const starInfo = getStarInfoForPair(pair);
                return {
                    pairNumber: index + 1,
                    digits: pair,
                    starKey: starInfo.key,
                    star: starInfo.name,
                    meaning: starInfo.description,
                    nature: starInfo.nature,
                    energyLevel: starInfo.energy
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
        
        // Remove '5's
        const normalized = processedDigits.filter(digit => digit !== '5').join('');
        
        return normalized;
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
            // Skip if current digit is 0 or 5
            if (digits[i] === '0' || digits[i] === '5') {
                i++;
                continue;
            }
            
            const current = digits[i];
            const next = digits[i + 1];
            
            // Form regular pair (next digit is not 0 or 5)
            if (next !== '0' && next !== '5') {
                pairs.push(current + next);
                i += 1; // Move by 1 for overlapping pairs
            } else {
                let j = i + 1;
                let group = current;
                
                // Collect all consecutive 0s and 5s
                while (j < digits.length && (digits[j] === '0' || digits[j] === '5')) {
                    group += digits[j];
                    j++;
                }
                
                // Add next non-0/5 digit if available
                if (j < digits.length) {
                    group += digits[j];
                    j++;
                }
                
                pairs.push(group);
                i = j - 1;
            }
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
        
        digits.forEach((digit, index) => {
            let position = 'single';
            if (index === digits.length - 3) position = 'third_from_end';
            if (index === digits.length - 5) position = 'fifth_from_end';
            
            meanings.push({
                digit: digit,
                position: index + 1,
                meaning: getDigitMeaning(digit, position),
                significance: position
            });
        });
        
        return meanings;
    }
    
    /**
     * Generate summary
     */
    static generateSummary(pairsAnalysis, overallScore) {
        if (!pairsAnalysis || pairsAnalysis.length === 0) {
            return "Không thể phân tích được số này.";
        }
        
        const starSequence = pairsAnalysis.map(p => p.star).join(' → ');
        const scoreLevel = this.getScoreLevel(overallScore);
        
        return `Phân tích ${pairsAnalysis.length} cặp số với điểm tổng thể ${overallScore}/100 (${scoreLevel}). Chuỗi sao: ${starSequence}.`;
    }
    
    /**
     * Generate CCCD summary
     */
    static generateCCCDSummary(pairsAnalysis, normalized, pairs) {
        const starSequence = pairsAnalysis.map(p => p.star).join(' → ');
        return `Phân tích dựa trên chuỗi số chuẩn hóa '${normalized}' (${pairs.length} cặp số). Chuỗi sao: ${starSequence}.`;
    }
    
    /**
     * Generate generic summary
     */
    static generateGenericSummary(pairsAnalysis, type) {
        const starSequence = pairsAnalysis.map(p => p.star).join(' → ');
        return `Phân tích ${type} với ${pairsAnalysis.length} cặp số. Chuỗi sao: ${starSequence}.`;
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
                // Convert date to number for analysis
                const dateNumbers = value.replace(/\D/g, '');
                return this.analyzeGenericNumber(dateNumbers, 'ngày sinh');
            case 'bankAccount':
                return this.analyzeGenericNumber(value, 'số tài khoản');
            case 'password':
                return this.analyzeGenericNumber(value, 'mật khẩu số');
            default:
                return { error: 'Loại số không được hỗ trợ' };
        }
    }
} 