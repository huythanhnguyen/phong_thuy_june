<template>
  <div class="analysis-results">
    <!-- Overall Score Section -->
    <div class="overall-score bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex flex-col md:flex-row items-center justify-center gap-6">
        <!-- Score Circle -->
        <div class="score-circle relative">
          <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              stroke-width="8"
              fill="none"
              class="text-gray-200"
            />
            <!-- Progress circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              stroke-width="8"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="getCircleProgress()"
              :class="getScoreColor()"
              class="transition-all duration-1000 ease-out"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div :class="['text-3xl font-bold', getScoreColor()]">
                {{ result.overallScore }}
              </div>
              <div class="text-gray-500 text-sm">/100</div>
            </div>
          </div>
        </div>
        
        <!-- Score Description -->
        <div class="score-description text-center md:text-left">
          <h3 :class="['text-2xl font-bold mb-2', getScoreColor()]">
            {{ getScoreLevel(result.overallScore) }}
          </h3>
          <p class="text-gray-600 max-w-md">
            {{ getOverallDescription() }}
          </p>
          <div class="mt-3">
            <span class="inline-block px-3 py-1 rounded-full text-sm font-medium" 
                  :class="getScoreBadgeClass()">
              Điểm phong thủy: {{ result.overallScore }}/100
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Analysis Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Pairs Analysis -->
      <AnalysisCard 
        title="Phân Tích Cặp Số"
        icon="🔢"
        :content="result.pairsAnalysis"
        type="pairs"
      />

      <!-- Summary -->
      <AnalysisCard 
        title="Tóm Tắt"
        icon="📋"
        :content="result.summary"
        type="summary"
      />
    </div>

    <!-- Additional Analysis for Phone Numbers -->
    <div v-if="type === 'phone' && result.digitMeanings" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <AnalysisCard 
        title="Ý Nghĩa Từng Số"
        icon="🔤"
        :content="result.digitMeanings"
        type="digits"
      />

      <AnalysisCard 
        v-if="result.specialSequences"
        title="Chuỗi Đặc Biệt"
        icon="✨"
        :content="result.specialSequences"
        type="special"
      />
    </div>

    <!-- Recommendations -->
    <div class="recommendations">
      <AnalysisCard 
        title="Khuyến Nghị"
        icon="💡"
        :content="result.recommendations"
        type="recommendations"
      />
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons flex flex-wrap justify-center gap-4 mt-6">
      <button 
        @click="shareResult"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        📤 Chia Sẻ
      </button>
      <button 
        @click="downloadResult"
        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        💾 Tải Về
      </button>
      <button 
        @click="analyzeNew"
        class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        🔄 Phân Tích Mới
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AnalysisCard from './AnalysisCard.vue';

// Props
const props = defineProps({
  result: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  inputValue: {
    type: String,
    required: true
  }
});

// Emits
const emit = defineEmits(['analyze-new']);

// Computed
const getCircleProgress = () => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const progress = (props.result.overallScore / 100) * circumference;
  return `${progress} ${circumference}`;
};

const getScoreColor = () => {
  const score = props.result.overallScore;
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-blue-600';
  if (score >= 40) return 'text-yellow-600';
  if (score >= 20) return 'text-orange-600';
  return 'text-red-600';
};

const getScoreBadgeClass = () => {
  const score = props.result.overallScore;
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-blue-100 text-blue-800';
  if (score >= 40) return 'bg-yellow-100 text-yellow-800';
  if (score >= 20) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

// Methods
const getScoreLevel = (score) => {
  if (score >= 80) return "Xuất Sắc";
  if (score >= 60) return "Tốt";
  if (score >= 40) return "Trung Bình";
  if (score >= 20) return "Kém";
  return "Rất Kém";
};

const getOverallDescription = () => {
  const score = props.result.overallScore;
  if (score >= 80) return "Số này có năng lượng rất tích cực, mang lại may mắn và thành công.";
  if (score >= 60) return "Số này có năng lượng khá tốt, có thể mang lại những điều thuận lợi.";
  if (score >= 40) return "Số này có năng lượng trung bình, cần cân nhắc kỹ trước khi sử dụng.";
  if (score >= 20) return "Số này có năng lượng không tốt, có thể gặp một số khó khăn.";
  return "Số này có năng lượng rất kém, nên tránh sử dụng.";
};

const shareResult = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Kết Quả Phân Tích Phong Thủy Số Học',
      text: `Số ${props.inputValue} có điểm phong thủy ${props.result.overallScore}/100`,
      url: window.location.href
    });
  } else {
    // Fallback to clipboard
    const text = `Số ${props.inputValue} có điểm phong thủy ${props.result.overallScore}/100 - ${props.result.summary}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Đã sao chép kết quả vào clipboard!');
    });
  }
};

const downloadResult = () => {
  const data = {
    number: props.inputValue,
    type: props.type,
    score: props.result.overallScore,
    summary: props.result.summary,
    recommendations: props.result.recommendations,
    analyzedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `phan-tich-${props.inputValue}-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const analyzeNew = () => {
  emit('analyze-new');
};
</script>

<style scoped>
.score-circle {
  position: relative;
}

/* Animation for score circle */
.score-circle svg circle:last-child {
  stroke-dashoffset: 283; /* Full circumference */
  animation: progressAnimation 2s ease-out forwards;
}

@keyframes progressAnimation {
  from {
    stroke-dashoffset: 283;
  }
  to {
    stroke-dashoffset: calc(283 - (283 * var(--progress, 0) / 100));
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .score-circle svg {
    width: 120px;
    height: 120px;
  }
  
  .score-circle .text-3xl {
    font-size: 1.5rem;
  }
}
</style> 