/**
 * 五行分析工具函数
 * 基于出生日期计算五行属性
 */

// 五行对应表
const WUXING = {
  METAL: { name: '金', element: 'metal', strong: ['金', '土'], weak: ['木', '火', '水'] },
  WOOD: { name: '木', element: 'wood', strong: ['木', '火'], weak: ['金', '土', '水'] },
  WATER: { name: '水', element: 'water', strong: ['水', '金'], weak: ['土', '木', '火'] },
  FIRE: { name: '火', element: 'fire', strong: ['火', '土'], weak: ['水', '金', '木'] },
  EARTH: { name: '土', element: 'earth', strong: ['土', '火'], weak: ['水', '木', '金'] }
}

// 天干对应的五行
const TIANGAN_WUXING = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
}

// 地支对应的五行
const DIZHI_WUXING = {
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
}

// 生肖对应表
const ZODIAC = {
  '鼠': '子', '牛': '丑', '虎': '寅',
  '兔': '卯', '龙': '辰', '蛇': '巳',
  '马': '午', '羊': '未', '猴': '申',
  '鸡': '酉', '狗': '戌', '猪': '亥'
}

// 生肖吉祥偏旁
const ZODIAC_LUCKY_RADICALS = {
  '鼠': ['米', '艹', '宀', '口'],
  '牛': ['艹', '田', '车', '土'],
  '虎': ['王', '林', '山', '艮'],
  '兔': ['艹', '玉', '月', '口'],
  '龙': ['王', '龙', '日', '月'],
  '蛇': ['虫', '衣', '辶', '弓'],
  '马': ['马', '艹', '足', '日'],
  '羊': ['艹', '土', '大', '口'],
  '猴': ['王', '申', '侯', '口'],
  '鸡': ['鸟', '隹', '米', '谷'],
  '狗': ['犭', '土', '口', '心'],
  '猪': ['氵', '豕', '艹', '口']
}

// 时辰对应表
const SHICHEN = [
  { name: '子时', time: '23:00-01:00', dizhi: '子' },
  { name: '丑时', time: '01:00-03:00', dizhi: '丑' },
  { name: '寅时', time: '03:00-05:00', dizhi: '寅' },
  { name: '卯时', time: '05:00-07:00', dizhi: '卯' },
  { name: '辰时', time: '07:00-09:00', dizhi: '辰' },
  { name: '巳时', time: '09:00-11:00', dizhi: '巳' },
  { name: '午时', time: '11:00-13:00', dizhi: '午' },
  { name: '未时', time: '13:00-15:00', dizhi: '未' },
  { name: '申时', time: '15:00-17:00', dizhi: '申' },
  { name: '酉时', time: '17:00-19:00', dizhi: '酉' },
  { name: '戌时', time: '19:00-21:00', dizhi: '戌' },
  { name: '亥时', time: '21:00-23:00', dizhi: '亥' }
]

// 获取农历年份天干地支
const getLunarYearHeavenlyStems = (year) => {
  const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const stemsIndex = (year - 4) % 10
  return stems[stemsIndex]
}

const getLunarYearEarthlyBranches = (year) => {
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const branchesIndex = (year - 4) % 12
  return branches[branchesIndex]
}

// 获取农历月份
const getLunarMonth = (month) => {
  const months = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
  return months[month - 1]
}

// 获取农历日期
const getLunarDay = (day) => {
  const days = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
  return days[day - 1]
}

/**
 * 分析出生日期的五行
 * @param {string} birthDate - 出生日期 (YYYY-MM-DD)
 * @param {string} birthTime - 出生时辰
 * @returns {Object} 五行分析结果
 */
export function analyzeBirthDate(birthDate, birthTime = '') {
  const date = new Date(birthDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 计算年柱
  const yearHeavenlyStem = getLunarYearHeavenlyStems(year)
  const yearEarthlyBranch = getLunarYearEarthlyBranches(year)
  
  // 计算月柱 (简化为农历月)
  const monthHeavenlyStem = getLunarMonth(month)
  
  // 计算日柱 (简化计算)
  const dayHeavenlyStem = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九'][day % 10]
  const dayEarthlyBranch = ['柱', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][day % 12]
  
  // 计算时柱
  let timeHeavenlyStem = ''
  let timeEarthlyBranch = ''
  if (birthTime) {
    const shichen = SHICHEN.find(s => s.name === birthTime)
    if (shichen) {
      timeEarthlyBranch = shichen.dizhi
      // 时干计算：日干对应时干
      const dayStemIndex = (day % 10)
      const timeStemIndex = (dayStemIndex * 2 + SHICHEN.indexOf(shichen)) % 10
      const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
      timeHeavenlyStem = stems[timeStemIndex]
    }
  }
  
  // 统计五行
  const wuxingCounts = {
    '金': 0,
    '木': 0,
    '水': 0,
    '火': 0,
    '土': 0
  }
  
  // 统计各柱五行
  wuxingCounts[TIANGAN_WUXING[yearHeavenlyStem]]++
  wuxingCounts[DIZHI_WUXING[yearEarthlyBranch]]++
  
  if (timeHeavenlyStem) {
    wuxingCounts[TIANGAN_WUXING[timeHeavenlyStem]]++
  }
  if (timeEarthlyBranch) {
    wuxingCounts[DIZHI_WUXING[timeEarthlyBranch]]++
  }
  
  // 计算缺失的五行
  const sortedWuxing = Object.entries(wuxingCounts)
    .sort((a, b) => a[1] - b[1])
  
  const missing = sortedWuxing.filter(([_, count]) => count === 0)
    .map(([wuxing, _]) => WUXING[wuxing.toUpperCase()])
  
  const strong = sortedWuxing.filter(([_, count]) => count >= 2)
    .map(([wuxing, _]) => WUXING[wuxing.toUpperCase()])
  
  const weak = sortedWuxing.filter(([_, count]) => count === 1)
    .map(([wuxing, _]) => WUXING[wuxing.toUpperCase()])
  
  return {
    yearHeavenlyStem,
    yearEarthlyBranch,
    monthHeavenlyStem,
    timeHeavenlyStem,
    timeEarthlyBranch,
    wuxingCounts,
    missing: missing.length > 0 ? missing : weak,
    strong,
    weak,
    // 建议的五行
    recommendedWuxing: missing.length > 0 ? missing : strong,
    description: generateWuxingDescription(wuxingCounts, missing, strong, weak)
  }
}

/**
 * 获取生肖
 */
export function getZodiac(birthDate) {
  const date = new Date(birthDate)
  const year = date.getFullYear()
  
  const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  const index = (year - 1900) % 12
  
  return {
    animal: zodiacs[index],
    year: year,
    luckyRadicals: ZODIAC_LUCKY_RADICALS[zodiacs[index]],
    description: generateZodiacDescription(zodiacs[index])
  }
}

/**
 * 获取所有时辰列表
 */
export function getTimePeriods() {
  return SHICHEN.map(s => s.name)
}

/**
 * 格式化五行名称列表
 */
function formatWuxingNames(list) {
  if (!list || !Array.isArray(list) || list.length === 0) {
    return ''
  }
  return list.map(m => {
    if (typeof m === 'string') return m
    if (m && typeof m === 'object' && m.name) return m.name
    return ''
  }).filter(Boolean).join('、') || ''
}

/**
 * 生成五行描述
 */
function generateWuxingDescription(counts, missing, strong, weak) {
  let description = '根据出生时间分析：\n'
  
  description += `金(${counts['金']}) 木(${counts['木']}) 水(${counts['水']}) 火(${counts['火']}) 土(${counts['土']})\n`
  
  if (missing.length > 0) {
    description += `建议补充五行：${formatWuxingNames(missing)}`
  } else {
    description += `八字五行较为平衡，建议：${formatWuxingNames(strong)}`
  }
  
  return description
}

/**
 * 生成生肖描述
 */
function generateZodiacDescription(zodiac) {
  const descriptions = {
    '鼠': '鼠年出生的宝宝聪明伶俐，反应敏捷。名字宜用带"米、艹、宀、口"的字，寓意衣食无忧。',
    '牛': '牛年出生的宝宝勤劳稳重，任劳任怨。名字宜用带"艹、田、车、土"的字，寓意生活富足。',
    '虎': '虎年出生的宝宝勇敢自信，气势磅礴。名字宜用带"王、林、山、艮"的字，寓意虎虎生威。',
    '兔': '兔年出生的宝宝温柔可爱，优雅灵动。名字宜用带"艹、玉、月、口"的字，寓意温润如玉。',
    '龙': '龙年出生的宝宝尊贵大气，有帝王之相。名字宜用带"王、龙、日、月"的字，寓意飞龙在天。',
    '蛇': '蛇年出生的宝宝聪明灵活，神秘莫测。名字宜用带"虫、衣、辶、弓"的字，寓意灵动飘逸。',
    '马': '马年出生的宝宝热情奔放，志向远大。名字宜用带"马、艹、足、日"的字，寓意马到成功。',
    '羊': '羊年出生的宝宝温顺善良，和蔼可亲。名字宜用带"艹、土、大、口"的字，寓意衣食丰足。',
    '猴': '猴年出生的宝宝聪明机智，活泼好动。名字宜用带"王、申、侯、口"的字，寓意封侯拜相。',
    '鸡': '鸡年出生的宝宝勤劳早起，乐观向上。名字宜用带"鸟、隹、米、谷"的字，寓意五谷丰登。',
    '狗': '狗年出生的宝宝忠诚正直，重情重义。名字宜用带"犭、土、口、心"的字，寓意忠诚可靠。',
    '猪': '猪年出生的宝宝憨厚可爱，心宽体胖。名字宜用带"氵、豕、艹、口"的字，寓意生活安逸。'
  }
  
  return descriptions[zodiac] || ''
}

/**
 * 根据五行获取推荐的名字用字
 */
export function getRecommendedCharacters(wuxing, gender) {
  // 五行对应的常用名字用字
  const characters = {
    '金': {
      male: ['锐', '铭', '锋', '鑫', '铎', '钧', '钟', '镇', '鉴', '铠'],
      female: ['钰', '玲', '锦', '钥', '钧', '铭', '银', '珍', '珠', '瑜']
    },
    '木': {
      male: ['林', '森', '柏', '松', '柏', '桐', '楠', '槐', '桂', '桓'],
      female: ['琳', '桐', '桂', '芬', '芳', '芝', '花', '苗', '莉', '蓉']
    },
    '水': {
      male: ['洋', '瀚', '涛', '波', '润', '澈', '涵', '泉', '渊', '沐'],
      female: ['洁', '涵', '澜', '沁', '洋', '溪', '潇', '滢', '雯', '霏']
    },
    '火': {
      male: ['炎', '焰', '炜', '灿', '辉', '耀', '炫', '焕', '熠', '烨'],
      female: ['炎', '烟', '灿', '芳', '燕', '妮', '娜', '珍', '晶', '荧']
    },
    '土': {
      male: ['垚', '坤', '轩', '岚', '岩', '岳', '峰', '峻', '岚', '嵘'],
      female: ['垚', '岚', '岩', '怡', '佳', '妮', '娅', '媱', '娴', '嫣']
    }
  }
  
  const genderKey = gender === 'boy' ? 'male' : 'female'
  return characters[wuxing]?.[genderKey] || []
}

/**
 * 名字评分算法
 * @param {string} name - 名字
 * @param {Object} analysis - 五行分析结果
 * @param {string} gender - 性别
 * @returns {Object} 评分结果
 */
export function scoreName(name, analysis, gender) {
  let score = 70 // 基础分
  
  // 五行评分 (0-10分)
  if (analysis?.recommendedWuxing) {
    const nameWuxing = getCharacterWuxing(name)
    if (analysis.recommendedWuxing.includes(nameWuxing)) {
      score += 10
    } else if (analysis.strong?.includes(nameWuxing)) {
      score += 5
    } else {
      score += 2
    }
  }
  
  // 笔画评分 (0-10分)
  const strokes = getStrokeCount(name)
  if (strokes >= 10 && strokes <= 25) {
    score += 5 // 笔画适中
  } else if (strokes >= 15 && strokes <= 20) {
    score += 10 // 笔画最佳
  }
  
  // 音韵评分 (0-10分)
  if (isHarmonious(name)) {
    score += 10
  }
  
  // 性别匹配评分 (0-10分)
  if (isGenderAppropriate(name, gender)) {
    score += 5
  }
  
  return {
    total: Math.min(100, Math.round(score)),
    wuxing: Math.min(10, score - 60),
    strokes: Math.min(10, Math.max(0, strokes >= 15 && strokes <= 20 ? 10 : 5)),
    harmony: isHarmonious(name) ? 10 : 5,
    gender: isGenderAppropriate(name, gender) ? 5 : 3
  }
}

/**
 * 获取单字五行
 */
function getCharacterWuxing(char) {
  // 简化的汉字五行判断
  const wuxingMap = {
    '金': '金', '银': '金', '铜': '金', '铁': '金', '钢': '金',
    '木': '木', '林': '木', '森': '木', '树': '木', '枝': '木',
    '水': '水', '江': '水', '河': '水', '海': '水', '洋': '水',
    '火': '火', '炎': '火', '焰': '火', '光': '火', '明': '火',
    '土': '土', '地': '土', '山': '土', '岩': '土', '峰': '土'
  }
  return wuxingMap[char] || '土' // 默认返回土
}

/**
 * 获取名字总笔画数
 */
function getStrokeCount(name) {
  // 简化的笔画计算 (实际应该使用笔画字典)
  return name.length * 10 // 简化处理
}

/**
 * 判断音韵是否和谐
 */
function isHarmonious(name) {
  if (name.length < 2) return true
  // 简单判断：首字声母和韵母
  return true // 简化处理
}

/**
 * 判断名字是否适合性别
 */
function isGenderAppropriate(name, gender) {
  // 简化的性别判断
  return true // 简化处理
}

export function useNameAnalysis() {
  return {
    analyzeBirthDate,
    getZodiac,
    getTimePeriods,
    getRecommendedCharacters,
    scoreName
  }
}
