<template>
  <div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">开始取名</h1>
      <p class="text-gray-600">填写以下信息，我们将为您生成最合适的名字</p>
    </div>

    <!-- 表单 -->
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 姓氏输入 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">
            <span class="text-red-500">*</span> 姓氏
          </label>
          <input
            v-model="formData.surname"
            type="text"
            maxlength="4"
            placeholder="请输入姓氏，如：张、李、王"
            class="input-field text-lg"
            required
          />
          <p class="mt-2 text-sm text-gray-500">支持单姓和复姓</p>
        </div>

        <!-- 性别选择 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-3">
            <span class="text-red-500">*</span> 宝宝性别
          </label>
          <div class="flex space-x-4">
            <label 
              class="flex-1 cursor-pointer"
              :class="formData.gender === 'boy' ? 'ring-2 ring-primary-500' : ''"
            >
              <input 
                type="radio" 
                v-model="formData.gender" 
                value="boy" 
                class="sr-only"
              />
              <div 
                class="border-2 rounded-xl p-4 text-center transition-all"
                :class="formData.gender === 'boy' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-gray-200 hover:border-primary-200'"
              >
                <span class="text-3xl mb-2 block">👦</span>
                <span class="font-medium">男孩</span>
              </div>
            </label>
            <label 
              class="flex-1 cursor-pointer"
              :class="formData.gender === 'girl' ? 'ring-2 ring-primary-500' : ''"
            >
              <input 
                type="radio" 
                v-model="formData.gender" 
                value="girl" 
                class="sr-only"
              />
              <div 
                class="border-2 rounded-xl p-4 text-center transition-all"
                :class="formData.gender === 'girl' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-gray-200 hover:border-primary-200'"
              >
                <span class="text-3xl mb-2 block">👧</span>
                <span class="font-medium">女孩</span>
              </div>
            </label>
          </div>
        </div>

        <!-- 出生日期 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">
            <span class="text-red-500">*</span> 出生日期
          </label>
          <input
            v-model="formData.birthDate"
            type="date"
            class="input-field text-lg"
            :max="maxDate"
            required
          />
        </div>

        <!-- 出生时辰 -->
        <div>
          <label class="block text-lg font-medium text-gray-700 mb-2">
            出生时辰 <span class="text-gray-400 text-sm">(可选)
            <el-tooltip content="中国传统把一天分为12个时辰" placement="top">
              <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </el-tooltip>
            </span>
          </label>
          <select
            v-model="formData.birthTime"
            class="input-field text-lg"
          >
            <option value="">请选择时辰（可选）</option>
            <option v-for="time in timePeriods" :key="time" :value="time">
              {{ time }} ({{ getTimeDescription(time) }})
            </option>
          </select>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {{ error }}
        </div>

        <!-- 提交按钮 -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="isGenerating"
            class="w-full btn-primary text-lg flex items-center justify-center"
          >
            <svg v-if="isGenerating" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isGenerating ? '正在生成名字...' : '生成名字' }}
          </button>
        </div>
      </form>
    </div>

    <!-- 分析结果预览 -->
    <div v-if="wuxingAnalysis || zodiac" class="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">五行生肖分析</h2>
      
      <!-- 五行分析 -->
      <div v-if="wuxingAnalysis" class="mb-6">
        <h3 class="font-medium text-gray-700 mb-3">五行分析结果</h3>
        <div class="grid grid-cols-5 gap-4 mb-4">
          <div 
            v-for="(count, wuxing) in wuxingAnalysis.wuxingCounts" 
            :key="wuxing"
            class="text-center p-3 rounded-lg"
            :class="getWuxingBgClass(wuxing)"
          >
            <div class="text-2xl mb-1">{{ getWuxingEmoji(wuxing) }}</div>
            <div class="font-medium">{{ wuxing }}</div>
            <div class="text-sm text-gray-500">{{ count }}个</div>
          </div>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-gray-600">
            <span class="font-medium">建议补充：</span>
            <span class="text-primary-600">
              {{ formatMissing(wuxingAnalysis?.missing) || '五行平衡' }}
            </span>
          </p>
        </div>
      </div>

      <!-- 生肖分析 -->
      <div v-if="zodiac">
        <h3 class="font-medium text-gray-700 mb-3">生肖分析结果</h3>
        <div class="flex items-center space-x-4">
          <div class="text-5xl">{{ getZodiacEmoji(zodiac.animal) }}</div>
          <div>
            <p class="font-medium text-lg">{{ zodiac.animal }}年</p>
            <p class="text-gray-600 text-sm">{{ zodiac.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成结果 -->
    <div v-if="generatedNames.length > 0" class="mt-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">推荐名字</h2>
        <router-link 
          to="/result" 
          class="btn-primary"
        >
          查看详情
        </router-link>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="name in generatedNames.slice(0, 3)" 
          :key="name.id"
          class="name-card text-center"
        >
          <div class="text-3xl font-bold text-gray-800 mb-2">{{ name.name }}</div>
          <div class="flex justify-center space-x-2 mb-3">
            <span class="tag tag-gold">{{ name.wuxing }}</span>
            <span class="tag tag-primary">评分 {{ name.score }}</span>
          </div>
          <p class="text-gray-600 text-sm line-clamp-2">{{ name.meaning }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useNameStore } from '@/stores/nameStore'
import { useNameAnalysis } from '@/utils/nameAnalysis'

const router = useRouter()
const store = useNameStore()
const { generatedNames, isGenerating, error, wuxingAnalysis, zodiac } = storeToRefs(store)
const { getTimePeriods } = useNameAnalysis()

// 表单数据
const formData = ref({
  surname: '',
  gender: 'boy',
  birthDate: '',
  birthTime: ''
})

// 时辰列表
const timePeriods = getTimePeriods()

// 最大日期（今天）
const maxDate = new Date().toISOString().split('T')[0]

// 获取时辰描述
const getTimeDescription = (time) => {
  const descriptions = {
    '子时': '23:00-01:00',
    '丑时': '01:00-03:00',
    '寅时': '03:00-05:00',
    '卯时': '05:00-07:00',
    '辰时': '07:00-09:00',
    '巳时': '09:00-11:00',
    '午时': '11:00-13:00',
    '未时': '13:00-15:00',
    '申时': '15:00-17:00',
    '酉时': '17:00-19:00',
    '戌时': '19:00-21:00',
    '亥时': '21:00-23:00'
  }
  return descriptions[time] || ''
}

// 获取五行背景色
const getWuxingBgClass = (wuxing) => {
  const classes = {
    '金': 'bg-gradient-to-br from-gray-100 to-gray-200',
    '木': 'bg-gradient-to-br from-green-100 to-green-200',
    '水': 'bg-gradient-to-br from-blue-100 to-blue-200',
    '火': 'bg-gradient-to-br from-red-100 to-red-200',
    '土': 'bg-gradient-to-br from-yellow-100 to-yellow-200'
  }
  return classes[wuxing] || 'bg-gray-100'
}

// 获取五行emoji
const getWuxingEmoji = (wuxing) => {
  const emojis = {
    '金': '⚔️',
    '木': '🌳',
    '水': '💧',
    '火': '🔥',
    '土': '🏔️'
  }
  return emojis[wuxing] || '❓'
}

// 获取生肖emoji
const getZodiacEmoji = (animal) => {
  const emojis = {
    '鼠': '🐭', '牛': '🐮', '虎': '🐯', '兔': '🐰',
    '龙': '🐉', '蛇': '🐍', '马': '🐴', '羊': '🐑',
    '猴': '🐵', '鸡': '🐔', '狗': '🐶', '猪': '🐷'
  }
  return emojis[animal] || '🐾'
}

// 格式化缺失的五行（修复响应式问题）
const formatMissing = (missing) => {
  if (!missing || !Array.isArray(missing) || missing.length === 0) {
    return ''
  }
  return missing.map(m => {
    if (typeof m === 'string') return m
    if (m && typeof m === 'object' && m.name) return m.name
    return ''
  }).filter(Boolean).join('、') || ''
}

// 提交表单
const handleSubmit = async () => {
  // 验证输入
  if (!formData.value.surname.trim()) {
    store.error = '请输入姓氏'
    return
  }
  
  if (!formData.value.birthDate) {
    store.error = '请选择出生日期'
    return
  }
  
  // 更新store中的用户输入
  store.userInput = { ...formData.value }
  
  // 生成名字
  await store.generateNames()
  
  // 如果生成成功，跳转到结果页面
  if (generatedNames.value.length > 0) {
    router.push('/result')
  }
}

// 页面加载时恢复之前的数据
onMounted(() => {
  if (store.userInput.surname) {
    formData.value = { ...store.userInput }
  }
})
</script>
