<template>
  <div class="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <!-- 返回按钮 -->
    <div class="mb-6">
      <button 
        @click="goBack"
        class="flex items-center text-gray-600 hover:text-primary-500 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        返回修改
      </button>
    </div>

    <!-- 标题 -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">名字推荐</h1>
      <p class="text-gray-600">以下是根据您提供的信息生成的名字推荐</p>
    </div>

    <!-- 用户信息摘要 -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div class="flex flex-wrap items-center justify-center gap-6">
        <div class="flex items-center">
          <span class="text-2xl mr-2">👤</span>
          <span class="text-gray-600">姓：</span>
          <span class="font-medium ml-1">{{ userInput.surname }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-2xl mr-2">{{ userInput.gender === 'boy' ? '👦' : '👧' }}</span>
          <span class="text-gray-600">性别：</span>
          <span class="font-medium ml-1">{{ userInput.gender === 'boy' ? '男孩' : '女孩' }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-2xl mr-2">📅</span>
          <span class="text-gray-600">出生：</span>
          <span class="font-medium ml-1">{{ formatDate(userInput.birthDate) }}</span>
        </div>
        <div v-if="userInput.birthTime" class="flex items-center">
          <span class="text-2xl mr-2">🕐</span>
          <span class="text-gray-600">时辰：</span>
          <span class="font-medium ml-1">{{ userInput.birthTime }}</span>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isGenerating" class="text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
        <svg class="animate-spin w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p class="text-gray-600">正在分析五行和生成名字...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl inline-block">
        <p class="text-lg font-medium">{{ error }}</p>
        <p class="text-sm mt-2">请返回上一页重新填写信息</p>
      </div>
    </div>

    <!-- 无数据状态 -->
    <div v-else-if="generatedNames.length === 0" class="text-center py-12">
      <div class="bg-gray-50 border border-gray-200 px-6 py-4 rounded-xl inline-block">
        <p class="text-lg text-gray-600">还没有生成名字</p>
        <router-link to="/generate" class="btn-primary mt-4 inline-block">
          立即取名
        </router-link>
      </div>
    </div>

    <!-- 名字列表 -->
    <div v-else class="space-y-6">
      <div 
        v-for="(name, index) in generatedNames" 
        :key="name.id"
        class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
      >
        <!-- 名字头部 -->
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold font-chinese mb-2">{{ name.name }}</h2>
              <div class="flex items-center space-x-4 text-sm">
                <span class="bg-white/20 px-3 py-1 rounded-full">
                  {{ name.wuxing }}属性
                </span>
                <span class="bg-white/20 px-3 py-1 rounded-full">
                  评分: {{ name.score }}分
                </span>
              </div>
            </div>
            <div class="text-6xl opacity-20">
              {{ getGenderEmoji(userInput.gender) }}
            </div>
          </div>
        </div>

        <!-- 名字详情 -->
        <div class="p-6">
          <!-- 名字寓意 -->
          <div class="mb-6">
            <h3 class="flex items-center text-lg font-bold text-gray-800 mb-3">
              <span class="text-2xl mr-2">📖</span> 名字寓意
            </h3>
            <p class="text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
              {{ name.meaning }}
            </p>
          </div>

          <!-- 五行生肖建议 -->
          <div v-if="name.zodiacAdvice" class="mb-6">
            <h3 class="flex items-center text-lg font-bold text-gray-800 mb-3">
              <span class="text-2xl mr-2">🐉</span> 生肖建议
            </h3>
            <p class="text-gray-600 bg-gold-50 rounded-xl p-4">
              {{ name.zodiacAdvice }}
            </p>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-wrap gap-4">
            <button
              @click="handleSave(name)"
              :class="name.saved ? 'bg-green-500' : 'btn-primary'"
              class="flex items-center"
            >
              <svg v-if="!name.saved" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ name.saved ? '已保存' : '保存名字' }}
            </button>
            
            <button
              @click="handleFeedback(name)"
              class="btn-secondary flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
              </svg>
              评分反馈
            </button>
            
            <button
              @click="handleShare(name)"
              class="btn-secondary flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              分享名字
            </button>
          </div>
        </div>
      </div>

      <!-- 重新生成 -->
      <div class="text-center mt-8">
        <button
          @click="regenerateNames"
          :disabled="isGenerating"
          class="btn-primary text-lg"
        >
          <svg class="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          重新生成
        </button>
      </div>
    </div>

    <!-- 反馈弹窗 -->
    <div v-if="showFeedbackModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">评分反馈</h3>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">为这个名字评分</label>
          <div class="flex space-x-2">
            <button
              v-for="star in 5"
              :key="star"
              @click="feedbackData.rating = star"
              class="text-3xl transition-transform hover:scale-110"
              :class="star <= feedbackData.rating ? 'text-yellow-400' : 'text-gray-300'"
            >
              ★
            </button>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">您的建议（可选）</label>
          <textarea
            v-model="feedbackData.comment"
            class="input-field"
            rows="3"
            placeholder="请告诉我们您的想法..."
          ></textarea>
        </div>
        
        <div class="flex space-x-4">
          <button
            @click="showFeedbackModal = false"
            class="flex-1 btn-secondary"
          >
            取消
          </button>
          <button
            @click="submitFeedback"
            class="flex-1 btn-primary"
          >
            提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNameStore } from '@/stores/nameStore'

const router = useRouter()
const store = useNameStore()
const { generatedNames, isGenerating, error, userInput } = storeToRefs(store)

// 反馈弹窗
const showFeedbackModal = ref(false)
const feedbackData = ref({
  nameId: null,
  rating: 0,
  comment: ''
})

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

// 获取性别emoji
const getGenderEmoji = (gender) => {
  return gender === 'boy' ? '👦' : '👧'
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 保存名字
const handleSave = (name) => {
  if (name.saved) {
    store.unsaveName(name.id)
  } else {
    store.saveName(name.id)
  }
}

// 打开反馈弹窗
const handleFeedback = (name) => {
  feedbackData.value = {
    nameId: name.id,
    rating: name.rating || 0,
    comment: name.feedback || ''
  }
  showFeedbackModal.value = true
}

// 提交反馈
const submitFeedback = () => {
  if (feedbackData.value.rating > 0) {
    store.submitFeedback(
      feedbackData.value.nameId,
      feedbackData.value.rating,
      feedbackData.value.comment
    )
    showFeedbackModal.value = false
  }
}

// 分享名字
const handleShare = (name) => {
  const text = `我通过皮球给您取名字为宝宝取的名字：${name.name}\n寓意：${name.meaning}\n五行：${name.wuxing}`
  
  // 尝试使用Web Share API
  if (navigator.share) {
    navigator.share({
      title: '皮球给您取名字 - 推荐名字',
      text: text,
      url: window.location.href
    }).catch(console.error)
  } else {
    // 复制到剪贴板
    navigator.clipboard.writeText(text).then(() => {
      alert('名字已复制到剪贴板！')
    }).catch(console.error)
  }
}

// 重新生成
const regenerateNames = async () => {
  await store.generateNames()
}
</script>
