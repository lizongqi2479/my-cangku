/**
 * DeepSeek AI 服务
 * 用于智能生成名字
 * 兼容 OpenAI API 格式
 */

import axios from 'axios'

// 获取环境变量配置
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.deepseek.com/v1'

/**
 * 调用 DeepSeek API 生成名字
 * @param {Object} userInput - 用户输入信息
 * @param {Object} wuxingAnalysis - 五行分析结果
 * @param {Object} zodiac - 生肖信息
 * @returns {Promise<Array>} 生成的名字列表
 */
export async function generateNamesWithAI(userInput, wuxingAnalysis, zodiac) {
  if (!API_KEY) {
    console.warn('未配置API密钥，将使用本地名字库')
    return generateLocalNames(userInput, wuxingAnalysis, zodiac)
  }

  const prompt = buildPrompt(userInput, wuxingAnalysis, zodiac)

  try {
    const response = await axios.post(
      `${BASE_URL}/chat/completions`,
      {
        model: 'deepseek-chat', // DeepSeek 模型名称
        messages: [
          {
            role: 'system',
            content: '你是一位专业的取名大师，精通周易五行、生肖匹配和中华传统文化。请根据用户提供的出生信息，生成寓意美好、五行相合的名字。每个名字需要包含：名字、寓意解释、五行属性。请以JSON数组格式返回。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const content = response.data.choices[0]?.message?.content
    return parseAIResponse(content)
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error)
    // 如果API调用失败，回退到本地名字库
    return generateLocalNames(userInput, wuxingAnalysis, zodiac)
  }
}

/**
 * 格式化缺失的五行列表
 */
function formatMissingWuxing(missing) {
  if (!missing || !Array.isArray(missing) || missing.length === 0) {
    return ''
  }
  return missing.map(m => {
    if (typeof m === 'string') return m
    if (m && typeof m === 'object' && m.name) return m.name
    return ''
  }).filter(Boolean).join('、') || ''
}

/**
 * 构建提示词
 */
function buildPrompt(userInput, wuxingAnalysis, zodiac) {
  const { birthDate, birthTime, gender, surname } = userInput
  const genderText = gender === 'boy' ? '男孩' : '女孩'

  let prompt = `请为${genderText}宝宝取名，姓氏：${surname}，出生日期：${birthDate}`
  
  if (birthTime) {
    prompt += `，出生时辰：${birthTime}`
  }

  if (wuxingAnalysis) {
    prompt += `\n五行分析：${wuxingAnalysis.description || ''}`
    prompt += `\n建议补充五行：${formatMissingWuxing(wuxingAnalysis.missing)}`
  }

  if (zodiac) {
    prompt += `\n生肖：${zodiac.animal || ''}（${zodiac.description || ''}）`
  }

  prompt += `\n请生成3个寓意美好、五行相合的名字，以JSON数组格式返回，每个名字包含：name（姓名）、meaning（寓意解释）、wuxing（五行属性，格式：金/木/水/火/土）`

  return prompt
}

/**
 * 解析AI返回的结果
 */
function parseAIResponse(content) {
  try {
    // 尝试直接解析JSON
    const names = JSON.parse(content)
    return names.map((item, index) => ({
      fullName: item.name || item.fullName || `名字${index + 1}`,
      name: (item.name || item.fullName || `名字${index + 1}`).replace(/^\w+/, ''),
      meaning: item.meaning || item.description || '寓意美好，吉祥如意',
      wuxing: item.wuxing || '木',
      id: Date.now() + index,
      score: item.score || 85
    }))
  } catch {
    // 如果直接解析失败，尝试提取JSON数组
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      try {
        const names = JSON.parse(jsonMatch[0])
        return names.map((item, index) => ({
          fullName: item.name || item.fullName || `名字${index + 1}`,
          name: (item.name || item.fullName || `名字${index + 1}`).replace(/^\w+/, ''),
          meaning: item.meaning || item.description || '寓意美好，吉祥如意',
          wuxing: item.wuxing || '木',
          id: Date.now() + index,
          score: item.score || 85
        }))
      } catch {
        console.error('解析AI响应失败')
        return []
      }
    }
    return []
  }
}

/**
 * 本地名字库（备用方案）
 * 当API不可用时使用
 */
function generateLocalNames(userInput, wuxingAnalysis, zodiac) {
  const { surname, gender } = userInput
  const genderKey = gender === 'boy' ? 'male' : 'female'

  // 五行对应的常用名字库
  const nameLibrary = {
    metal: {
      male: ['锐铭', '锋鑫', '铎钧', '钟镇', '鉴铠', '锐锋', '铭铎', '鑫钧', '锋钟', '镇鉴'],
      female: ['钰玲', '锦钥', '钧铭', '银珍', '珠瑜', '玲锦', '钥银', '珍珠', '钰玲', '瑜珍']
    },
    wood: {
      male: ['林森', '柏松', '桐楠', '槐桂', '桓林', '森柏', '松桐', '楠槐', '桂桓', '林森'],
      female: ['琳桐', '桂芬', '芳芝', '花苗', '莉蓉', '桐桂', '芬芳', '芝花', '苗莉', '琳蓉']
    },
    water: {
      male: ['洋瀚', '涛波', '润澈', '涵泉', '渊沐', '瀚涛', '波润', '澈涵', '泉渊', '沐洋'],
      female: ['洁涵', '澜沁', '洋溪', '潇滢', '雯霏', '涵澜', '沁洋', '溪潇', '滢雯', '洁霏']
    },
    fire: {
      male: ['炎焰', '炜灿', '辉耀', '炫焕', '熠烨', '焰炜', '灿辉', '耀炫', '焕熠', '烨炎'],
      female: ['炎烟', '灿芳', '燕妮', '娜珍', '晶荧', '烟灿', '芳燕', '妮娜', '珍晶', '荧炎']
    },
    earth: {
      male: ['垚坤', '轩岚', '岩岳', '峰峻', '嵘垚', '坤轩', '岚岩', '岳峰', '峻嵘', '垚坤'],
      female: ['垚岚', '岩怡', '佳妮', '娅媱', '娴嫣', '岚岩', '怡佳', '妮娅', '媱娴', '嫣岚']
    }
  }

  // 根据五行推荐选择合适的名字
  let targetWuxing = 'wood' // 默认木
  if (wuxingAnalysis?.recommendedWuxing?.length > 0) {
    const recommended = wuxingAnalysis.recommendedWuxing[0]
    // recommended 可能是对象 { name, element } 或字符串
    if (recommended && typeof recommended === 'object' && recommended.element) {
      targetWuxing = recommended.element
    } else if (typeof recommended === 'string') {
      // 根据五行名称映射到 element
      const wuxingMap = {
        '金': 'metal',
        '木': 'wood',
        '水': 'water',
        '火': 'fire',
        '土': 'earth'
      }
      targetWuxing = wuxingMap[recommended] || 'wood'
    }
  }

  const names = nameLibrary[targetWuxing]?.[genderKey] || nameLibrary.wood[genderKey]
  
  // 随机选择3个名字
  const shuffled = [...names].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3).map((fullName, index) => ({
    fullName,
    name: fullName.replace(surname, ''),
    meaning: getMeaning(targetWuxing, index),
    wuxing: targetWuxing.charAt(0).toUpperCase() + targetWuxing.slice(1),
    id: Date.now() + index
  }))
}

/**
 * 获取名字寓意
 */
function getMeaning(wuxing, index) {
  const meanings = {
    metal: ['刚毅果断，气势磅礴', '锐意进取，前程似锦', '坚硬如铁，意志坚定'],
    wood: ['生机盎然，蓬勃发展', '栋梁之才，前途无量', '坚韧不拔，蒸蒸日上'],
    water: ['智慧如海，包容万物', '清澈透明，心灵纯净', '源源不断，财运亨通'],
    fire: ['热情洋溢，光明磊落', '红红火火，蒸蒸日上', '光彩照人，前程似锦'],
    earth: ['稳重厚道，踏实可靠', '承载万物，胸怀宽广', '坚韧不拔，屹立不倒']
  }
  return meanings[wuxing]?.[index] || '寓意美好，吉祥如意'
}

/**
 * DeepSeek AI 组合式函数
 */
export function useOpenAI() {
  return {
    generateNamesWithAI
  }
}
