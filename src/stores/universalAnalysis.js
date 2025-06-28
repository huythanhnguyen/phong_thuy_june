import { defineStore } from 'pinia';
import { UniversalAnalysisEngine } from '@/utils/analysisEngine';
import { validateNumberInput } from '@/constants/numberTypes';

export const useUniversalAnalysisStore = defineStore('universalAnalysis', {
  state: () => ({
    selectedType: 'phone',
    inputValue: '',
    analysisResult: null,
    isAnalyzing: false,
    comparisonNumbers: [],
    history: [],
    validation: {
      error: false,
      message: ''
    }
  }),

  getters: {
    hasValidInput: (state) => {
      return state.inputValue.trim().length > 0 && !state.validation.error;
    },

    canCompare: (state) => {
      return state.analysisResult && state.comparisonNumbers.length < 5;
    },

    analysisHistory: (state) => {
      return state.history.slice().reverse(); // Latest first
    },

    comparisonResults: (state) => {
      return state.comparisonNumbers.map(item => ({
        ...item,
        typeName: state.getTypeName(item.type)
      }));
    }
  },

  actions: {
    setSelectedType(type) {
      this.selectedType = type;
      this.clearInput();
    },

    setInputValue(value) {
      this.inputValue = value;
      this.validateInput();
    },

    validateInput() {
      // Reset validation
      this.validation.error = false;
      this.validation.message = '';

      if (!this.inputValue.trim()) {
        return;
      }

      try {
        const validation = validateNumberInput(this.inputValue, this.selectedType);
        
        if (!validation.valid) {
          this.validation.error = true;
          this.validation.message = validation.message;
        }
      } catch (error) {
        this.validation.error = true;
        this.validation.message = 'Lỗi xác thực đầu vào';
      }
    },

    async analyzeNumber(value = null, type = null) {
      const inputValue = value || this.inputValue;
      const inputType = type || this.selectedType;

      if (!inputValue.trim()) {
        return;
      }

      this.isAnalyzing = true;
      
      try {
        const result = UniversalAnalysisEngine.analyze(inputValue, inputType);
        this.analysisResult = result;
        this.addToHistory(inputValue, inputType, result);
        
        // Clear validation errors on successful analysis
        this.validation.error = false;
        this.validation.message = '';
        
        return result;
      } catch (error) {
        console.error('Analysis error:', error);
        this.validation.error = true;
        this.validation.message = error.message || 'Có lỗi xảy ra khi phân tích';
        throw error;
      } finally {
        this.isAnalyzing = false;
      }
    },

    addToHistory(value, type, result) {
      const historyItem = {
        id: Date.now(),
        value,
        type,
        typeName: this.getTypeName(type),
        score: result.overallScore,
        timestamp: new Date(),
        result: result
      };

      this.history.unshift(historyItem);
      
      // Keep only last 50 items
      if (this.history.length > 50) {
        this.history = this.history.slice(0, 50);
      }

      // Save to localStorage
      this.saveHistoryToLocalStorage();
    },

    addToComparison(value = null, type = null, result = null) {
      const inputValue = value || this.inputValue;
      const inputType = type || this.selectedType;
      const inputResult = result || this.analysisResult;

      if (!inputValue || !inputResult || this.comparisonNumbers.length >= 5) {
        return false;
      }

      // Check if already exists
      const exists = this.comparisonNumbers.some(item => 
        item.value === inputValue && item.type === inputType
      );

      if (exists) {
        return false;
      }

      this.comparisonNumbers.push({
        id: Date.now(),
        value: inputValue,
        type: inputType,
        score: inputResult.overallScore,
        result: inputResult,
        timestamp: Date.now()
      });

      return true;
    },

    removeFromComparison(id) {
      this.comparisonNumbers = this.comparisonNumbers.filter(item => item.id !== id);
    },

    clearComparison() {
      this.comparisonNumbers = [];
    },

    clearInput() {
      this.inputValue = '';
      this.analysisResult = null;
      this.validation.error = false;
      this.validation.message = '';
    },

    clearAll() {
      this.clearInput();
      this.clearComparison();
    },

    clearHistory() {
      this.history = [];
      this.removeHistoryFromLocalStorage();
    },

    loadHistoryFromLocalStorage() {
      try {
        const saved = localStorage.getItem('universal-analysis-history');
        if (saved) {
          const parsed = JSON.parse(saved);
          this.history = parsed.map(item => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }));
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    },

    saveHistoryToLocalStorage() {
      try {
        localStorage.setItem('universal-analysis-history', JSON.stringify(this.history));
      } catch (error) {
        console.error('Error saving history:', error);
      }
    },

    removeHistoryFromLocalStorage() {
      try {
        localStorage.removeItem('universal-analysis-history');
      } catch (error) {
        console.error('Error removing history:', error);
      }
    },

    getTypeName(type) {
      const typeNames = {
        phone: 'Số Điện Thoại',
        cccd: 'Căn Cước Công Dân',
        birthdate: 'Ngày Sinh',
        bankAccount: 'Số Tài Khoản',
        password: 'Mật Khẩu Số',
        licensePlate: 'Biển Số Xe'
      };
      return typeNames[type] || type;
    },

    shareResult(result = null, value = null) {
      const shareResult = result || this.analysisResult;
      const shareValue = value || this.inputValue;

      if (!shareResult || !shareValue) return false;

      const text = `Phân tích phong thủy số ${shareValue}: ${shareResult.overallScore}/100 điểm\n${shareResult.overallDescription}`;
      const url = window.location.href;

      if (navigator.share) {
        navigator.share({
          title: 'Kết quả phân tích phong thủy số',
          text: text,
          url: url
        }).catch(console.error);
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
          // Could emit an event or show notification here
          console.log('Copied to clipboard');
        }).catch(console.error);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = `${text}\n${url}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      return true;
    },

    exportResults(format = 'json') {
      const data = {
        history: this.history,
        comparison: this.comparisonNumbers,
        exportDate: new Date().toISOString()
      };

      let content, mimeType, extension;

      switch (format) {
        case 'csv':
          content = this.convertToCSV(data);
          mimeType = 'text/csv';
          extension = 'csv';
          break;
        case 'json':
        default:
          content = JSON.stringify(data, null, 2);
          mimeType = 'application/json';
          extension = 'json';
          break;
      }

      // Create download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `phong-thuy-so-analysis.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    convertToCSV(data) {
      const headers = ['Timestamp', 'Value', 'Type', 'Score', 'Description'];
      const rows = [headers.join(',')];

      data.history.forEach(item => {
        const row = [
          new Date(item.timestamp).toISOString(),
          item.value,
          item.typeName,
          item.score,
          `"${item.result.overallDescription}"`
        ];
        rows.push(row.join(','));
      });

      return rows.join('\n');
    },

    // Initialize store
    init() {
      this.loadHistoryFromLocalStorage();
    }
  }
}); 