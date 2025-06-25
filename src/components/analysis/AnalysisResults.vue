<template>
  <div class="analysis-results">
    <!-- Overall Score Section -->
    <div class="overall-score bg-white rounded-lg shadow-md p-6 mb-6" v-if="showScore">
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

    <!-- Additional Analysis for CCCD -->
    <div v-if="type === 'cccd'" class="grid grid-cols-1 gap-6 mb-6">


      <!-- Characteristics -->
      <AnalysisCard 
        v-if="result.characteristics"
        title="Đặc Tính Bẩm Sinh"
        icon="🧬"
        :content="result.characteristics"
        type="characteristics"
      />

      <!-- Remedy Notes -->
      <AnalysisCard 
        v-if="result.remedyNotes"
        title="Ghi Chú Hóa Giải"
        icon="🛡️"
        :content="result.remedyNotes"
        type="remedy-notes"
      />
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
  },
  showScore: {
    type: Boolean,
    default: true
  }
});

// Emits - không còn cần thiết
// const emit = defineEmits(['analyze-new']);

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

// Removed shareResult, downloadResult, analyzeNew methods
// No longer needed after removing action buttons
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