import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNameAnalysis } from '@/utils/nameAnalysis'
import { useOpenAI } from '@/services/openai'

export const useNameStore = defineStore('name', () => {
  // 状态
  const userInput = ref({
    birthDate: '',
    birthTime: '', // 子时、丑时、寅时等
    gender: 'boy', // 'boy' 或 'girl'
    surname: ''
  })
  
  const generatedNames = ref([])
  const currentBatch = ref(0) // 当前生成批次
  const isGenerating = ref(false)
  const error = ref(null)
  const savedNames = ref([])
  const feedbackHistory = ref([])
  
  // 加载本地数据
  const loadLocalData = () => {
    try {
      const saved = localStorage.getItem('aiName_savedNames')
      if (saved) savedNames.value = JSON.parse(saved)
      
      const feedback = localStorage.getItem('aiName_feedbackHistory')
      if (feedback) feedbackHistory.value = JSON.parse(feedback)
    } catch (e) {
      console.error('加载本地数据失败:', e)
    }
  }
  
  // 保存到本地
  const saveToLocal = () => {
    try {
      localStorage.setItem('aiName_savedNames', JSON.stringify(savedNames.value))
      localStorage.setItem('aiName_feedbackHistory', JSON.stringify(feedbackHistory.value))
    } catch (e) {
      console.error('保存本地数据失败:', e)
    }
  }
  
  // 计算用户的五行分析结果
  const wuxingAnalysis = computed(() => {
    if (!userInput.value.birthDate) return null
    const { analyzeBirthDate } = useNameAnalysis()
    return analyzeBirthDate(userInput.value.birthDate, userInput.value.birthTime)
  })
  
  // 计算生肖
  const zodiac = computed(() => {
    if (!userInput.value.birthDate) return null
    const { getZodiac } = useNameAnalysis()
    return getZodiac(userInput.value.birthDate)
  })
  
  // 生成名字
  const generateNames = async () => {
    if (!validateInput()) {
      error.value = '请填写完整的取名信息'
      return []
    }
    
    isGenerating.value = true
    error.value = null
    
    try {
      const { generateNamesWithAI } = useOpenAI()
      
      const names = await generateNamesWithAI(
        userInput.value,
        wuxingAnalysis.value,
        zodiac.value
      )
      
      generatedNames.value = names.map((name, index) => ({
        ...name,
        id: Date.now() + index,
        saved: false,
        rating: 0,
        feedback: ''
      }))
      
      currentBatch.value++
      return names
    } catch (e) {
      error.value = e.message || '生成名字时出错'
      console.error('生成名字失败:', e)
      return []
    } finally {
      isGenerating.value = false
    }
  }
  
  // 验证输入
  const validateInput = () => {
    return userInput.value.birthDate && 
           userInput.value.gender && 
           userInput.value.surname.length > 0
  }
  
  // 保存名字
  const saveName = (nameId) => {
    const name = generatedNames.value.find(n => n.id === nameId)
    if (name && !name.saved) {
      name.saved = true
      savedNames.value.push({
        ...name,
        savedAt: new Date().toISOString()
      })
      saveToLocal()
    }
  }
  
  // 取消保存
  const unsaveName = (nameId) => {
    const index = savedNames.value.findIndex(n => n.id === nameId)
    if (index !== -1) {
      savedNames.value.splice(index, 1)
      const name = generatedNames.value.find(n => n.id === nameId)
      if (name) name.saved = false
      saveToLocal()
    }
  }
  
  // 提交反馈
  const submitFeedback = (nameId, rating, comment) => {
    const name = generatedNames.value.find(n => n.id === nameId)
    if (name) {
      name.rating = rating
      name.feedback = comment
      feedbackHistory.value.push({
        nameId,
        name: name.fullName || name.name || '未命名',
        rating,
        comment,
        createdAt: new Date().toISOString()
      })
      saveToLocal()
    }
  }
  
  // 重置表单
  const resetForm = () => {
    userInput.value = {
      birthDate: '',
      birthTime: '',
      gender: 'boy',
      surname: ''
    }
    generatedNames.value = []
    error.value = null
  }
  
  // 初始化
  loadLocalData()
  
  return {
    // 状态
    userInput,
    generatedNames,
    currentBatch,
    isGenerating,
    error,
    savedNames,
    feedbackHistory,
    wuxingAnalysis,
    zodiac,
    
    // 方法
    generateNames,
    saveName,
    unsaveName,
    submitFeedback,
    resetForm,
    validateInput,
    loadLocalData
  }
})
