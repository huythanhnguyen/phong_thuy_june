// Test new logic: 5 boosts energy instead of being removed
import { UniversalAnalysisEngine } from './src/utils/analysisEngine.js';

console.log('=== TEST NEW LOGIC: 5 BOOSTS ENERGY ===\n');

// Test case 1: CCCD với số 5
console.log('1. Test CCCD: 123456789457 (có số 5 trong chuỗi gốc)');
const result1 = UniversalAnalysisEngine.analyze('123456789457', 'cccd');
console.log('Chuỗi gốc (6 số cuối):', result1.lastSixDigits);
console.log('Chuỗi đã chuẩn hóa (đã bỏ số 5):', result1.normalizedSequence);
console.log('Các cặp số:', result1.pairs.join(', '));
console.log('Phân tích cặp số:');
result1.pairsAnalysis.forEach(pair => {
    console.log(`- ${pair.digits}: ${pair.star} (${pair.nature}), Năng lượng: ${pair.energyLevel}`);
});
console.log('Điểm tổng thể:', result1.overallScore);
console.log('Tóm tắt:', result1.summary);
console.log('\n');

// Test case 2: So sánh CCCD với và không có số 5
console.log('2. So sánh CCCD với và không có số 5:');
const cccdWithout5 = UniversalAnalysisEngine.analyze('123456789467', 'cccd');
const cccdWith5 = UniversalAnalysisEngine.analyze('123456789457', 'cccd');

console.log('a) CCCD không có số 5 (789467):');
console.log('   Chuỗi chuẩn hóa:', cccdWithout5.normalizedSequence);
console.log('   Điểm tổng thể:', cccdWithout5.overallScore);

console.log('\nb) CCCD có số 5 (789457):');
console.log('   Chuỗi chuẩn hóa:', cccdWith5.normalizedSequence);
console.log('   Điểm tổng thể:', cccdWith5.overallScore);

console.log('\n=== TEST COMPLETED ==='); 