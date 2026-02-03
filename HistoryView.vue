<template>
  <div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">历史记录</h1>
      <p class="text-gray-600">查看和管理您之前保存的名字</p>
    </div>

    <!-- 无记录状态 -->
    <div v-if="savedNames.length === 0" class="text-center py-16">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
        <div class="text-6xl mb-4">📝</div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">还没有保存的名字</h2>
        <p class="text-gray-600 mb-6">开始取名并保存您喜欢的名字吧！</p>
        <router-link to="/generate" class="btn-primary inline-block">
          开始取名
        </router-link>
      </div>
    </div>

    <!-- 名字列表 -->
    <div v-else class="space-y-6">
      <!-- 统计信息 -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="text-3xl mr-3">⭐</span>
            <div>
              <p class="text-2xl font-bold text-gray-800">{{ savedNames.length }}</p>
              <p class="text-gray-500 text-sm">已保存名字</p>
            </div>
          </div>
          <button 
            @click="clearAllHistory"
            class="text-red-500 hover:text-red-600 text-sm"
          >
            清空历史
          </button>
        </div>
      </div>

      <!-- 名字卡片 -->
      <div 
        v-for="name in savedNames" 
        :key="name.id"
        class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <!-- 名字和标签 -->
            <div class="flex items-center mb-3">
              <h2 class="text-2xl font-bold font-chinese text-gray-800 mr-4">
                {{ name.fullName || name.name }}
              </h2>
              <div class="flex space-x-2">
                <span class="tag tag-gold">{{ name.wuxing }}</span>
                <span v-if="name.score" class="tag tag-primary">评分 {{ name.score }}</span>
              </div>
            </div>

            <!-- 寓意 -->
            <p class="text-gray-600 mb-3">{{ name.meaning }}</p>

            <!-- 元信息 -->
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span v-if="name.gender">
                {{ name.gender === 'boy' ? '男孩' : '女孩' }}
              </span>
              <span v-if="name.birthDate">
                {{ formatDate(name.birthDate) }}
              </span>
              <span v-if="name.surname">
                姓：{{ name.surname }}
              </span>
              <span v-if="name.savedAt">
                保存于：{{ formatDateTime(name.savedAt) }}
              </span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex flex-col space-y-2 ml-4">
            <button
              @click="handleRemove(name.id)"
              class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="删除"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 评分显示 -->
        <div v-if="name.rating" class="mt-4 pt-4 border-t">
          <div class="flex items-center">
            <span class="text-yellow-400 mr-2">
              {{ '★'.repeat(name.rating) }}{{ '☆'.repeat(5 - name.rating) }}
            </span>
            <span class="text-gray-500 text-sm">
              {{ name.rating }}分
            </span>
            <span v-if="name.feedback" class="text-gray-400 text-sm ml-4">
              - {{ name.feedback }}
            </span>
          </div>
        </div>
      </div>

      <!-- 空状态占位 -->
      <div v-if="savedNames.length === 0" class="text-center py-12">
        <p class="text-gray-500">暂无记录</p>
      </div>
    </div>

    <!-- 确认删除弹窗 -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-sm w-full p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">确认删除</h3>
        <p class="text-gray-600 mb-6">确定要删除这个名字吗？此操作无法撤销。</p>
        <div class="flex space-x-4">
          <button
            @click="showDeleteModal = false"
            class="flex-1 btn-secondary"
          >
            取消
          </button>
          <button
            @click="confirmDelete"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-full transition-colors"
          >
            删除
          </button>
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
const { savedNames } = storeToRefs(store)

// 删除确认弹窗
const showDeleteModal = ref(false)
const deleteTargetId = ref(null)

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

// 格式化日期时间
const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

// 删除名字
const handleRemove = (id) => {
  deleteTargetId.value = id
  showDeleteModal.value = true
}

// 确认删除
const confirmDelete = () => {
  if (deleteTargetId.value) {
    store.unsaveName(deleteTargetId.value)
  }
  showDeleteModal.value = false
  deleteTargetId.value = null
}

// 清空所有历史
const clearAllHistory = () => {
  if (confirm('确定要清空所有历史记录吗？此操作无法撤销。')) {
    savedNames.value.forEach(name => {
      store.unsaveName(name.id)
    })
  }
}
</script>
