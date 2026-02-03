<template>
  <div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">反馈建议</h1>
      <p class="text-gray-600">帮助我们改进产品，您的意见对我们很重要</p>
    </div>

    <!-- 反馈统计 -->
    <div v-if="feedbackHistory.length > 0" class="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800">您的反馈记录</h2>
        <span class="text-gray-500 text-sm">共 {{ feedbackHistory.length }} 条反馈</span>
      </div>
      
      <div class="space-y-4">
        <div 
          v-for="(feedback, index) in feedbackHistory" 
          :key="index"
          class="bg-gray-50 rounded-xl p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-gray-800">{{ feedback.name }}</span>
            <div class="flex items-center">
              <span class="text-yellow-400">{{ '★'.repeat(feedback.rating) }}</span>
              <span class="text-gray-300">{{ '☆'.repeat(5 - feedback.rating) }}</span>
              <span class="ml-2 text-gray-500 text-sm">{{ feedback.rating }}分</span>
            </div>
          </div>
          <p v-if="feedback.comment" class="text-gray-600 text-sm">{{ feedback.comment }}</p>
          <p class="text-gray-400 text-xs mt-2">{{ formatDateTime(feedback.createdAt) }}</p>
        </div>
      </div>
    </div>

    <!-- 反馈表单 -->
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-xl font-bold text-gray-800 mb-6">提交您的反馈</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 反馈类型 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-3">反馈类型</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label 
              v-for="type in feedbackTypes" 
              :key="type.value"
              class="cursor-pointer"
              :class="formData.type === type.value ? 'ring-2 ring-primary-500' : ''"
            >
              <input 
                type="radio" 
                v-model="formData.type" 
                :value="type.value" 
                class="sr-only"
              />
              <div 
                class="border-2 rounded-xl p-3 text-center transition-all"
                :class="formData.type === type.value 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-gray-200 hover:border-primary-200'"
              >
                <span class="text-2xl mb-1 block">{{ type.icon }}</span>
                <span class="text-sm">{{ type.label }}</span>
              </div>
            </label>
          </div>
        </div>

        <!-- 名字评分 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-3">
            为应用评分
            <span class="text-gray-400 text-sm font-normal">(1-5分)</span>
          </label>
          <div class="flex space-x-3">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="formData.rating = star"
              class="text-4xl transition-transform hover:scale-110 focus:outline-none"
              :class="star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'"
            >
              ★
            </button>
          </div>
        </div>

        <!-- 名字输入（可选） -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">
            相关名字 <span class="text-gray-400 text-sm">(如果有的话)</span>
          </label>
          <input
            v-model="formData.relatedName"
            type="text"
            maxlength="4"
            placeholder="您评论的名字（可选）"
            class="input-field"
          />
        </div>

        <!-- 反馈内容 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">
            您的建议或意见
          </label>
          <textarea
            v-model="formData.content"
            rows="5"
            placeholder="请告诉我们您的想法、建议或遇到的问题..."
            class="input-field resize-none"
            required
          ></textarea>
        </div>

        <!-- 联系方式 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">
            联系方式 <span class="text-gray-400 text-sm">(可选)</span>
          </label>
          <input
            v-model="formData.contact"
            type="text"
            placeholder="邮箱或微信（方便我们回复您）"
            class="input-field"
          />
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {{ error }}
        </div>

        <!-- 成功提示 -->
        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          {{ success }}
        </div>

        <!-- 提交按钮 -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full btn-primary text-lg flex items-center justify-center"
          >
            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? '提交中...' : '提交反馈' }}
          </button>
        </div>
      </form>
    </div>

    <!-- 常见问题 -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">常见问题</h2>
      <div class="space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 text-left flex items-center justify-between"
          >
            <span class="font-medium text-gray-800">{{ faq.question }}</span>
            <svg 
              class="w-5 h-5 text-gray-500 transition-transform"
              :class="openFaqIndex === index ? 'rotate-180' : ''"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div 
            v-show="openFaqIndex === index"
            class="px-6 pb-4 text-gray-600"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useNameStore } from '@/stores/nameStore'

const store = useNameStore()
const { feedbackHistory } = storeToRefs(store)

// 表单数据
const formData = ref({
  type: 'suggestion',
  rating: 5,
  relatedName: '',
  content: '',
  contact: ''
})

// 状态
const error = ref('')
const success = ref('')
const isSubmitting = ref(false)
const openFaqIndex = ref(null)

// 反馈类型
const feedbackTypes = [
  { value: 'suggestion', label: '建议意见', icon: '💡' },
  { value: 'bug', label: '问题反馈', icon: '🐛' },
  { value: 'praise', label: '好评点赞', icon: '👍' },
  { value: 'other', label: '其他', icon: '📝' }
]

// 常见问题
const faqs = [
  {
    question: '名字生成需要多长时间？',
    answer: '一般情况下，名字生成需要3-5秒。如果遇到AI服务繁忙，可能需要稍等片刻。系统会在本地缓存名字库，确保即使网络不稳定也能快速生成名字。'
  },
  {
    question: '为什么生成的名字是重复的？',
    answer: '名字生成结合了AI分析和本地名字库。每次生成都会尝试从不同维度选择名字。如果您希望获得更多选择，可以尝试修改出生时辰等条件重新生成。'
  },
  {
    question: '五行分析准确吗？',
    answer: '我们的五行分析基于传统周易理论，但请注意，五行学说属于传统文化范畴，仅供参考。一个好名字还需要考虑音韵美感、书写美观等多个因素。'
  },
  {
    question: '如何查看历史记录？',
    answer: '您可以通过导航栏的"历史记录"查看所有保存的名字。所有数据都存储在您的本地设备中，不会上传到服务器，保护您的隐私安全。'
  }
]

// 格式化日期时间
const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

// 切换FAQ展开
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// 提交反馈
const handleSubmit = async () => {
  // 验证
  if (!formData.value.content.trim()) {
    error.value = '请输入反馈内容'
    return
  }
  
  if (formData.value.rating === 0) {
    error.value = '请为应用评分'
    return
  }
  
  error.value = ''
  isSubmitting.value = true
  
  try {
    // 模拟提交到服务器
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 保存到本地历史
    if (formData.value.relatedName) {
      store.submitFeedback(
        Date.now(),
        formData.value.rating,
        `${formData.value.type}: ${formData.value.content}`
      )
    }
    
    success.value = '感谢您的反馈！我们会认真阅读并不断改进。'
    
    // 重置表单
    formData.value = {
      type: 'suggestion',
      rating: 5,
      relatedName: '',
      content: '',
      contact: ''
    }
    
    // 3秒后清除成功提示
    setTimeout(() => {
      success.value = ''
    }, 5000)
    
  } catch (e) {
    error.value = '提交失败，请稍后重试'
  } finally {
    isSubmitting.value = false
  }
}
</script>
