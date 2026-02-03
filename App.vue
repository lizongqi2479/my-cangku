<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    <!-- 导航栏 -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-2">
            <span class="text-3xl">🎋</span>
            <span class="text-xl font-bold text-gray-800">皮球给您取名字</span>
          </router-link>
          
          <!-- 导航链接 -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link 
              to="/" 
              class="text-gray-600 hover:text-primary-500 transition-colors"
              active-class="text-primary-500 font-bold"
            >
              首页
            </router-link>
            <router-link 
              to="/generate" 
              class="text-gray-600 hover:text-primary-500 transition-colors"
              active-class="text-primary-500 font-bold"
            >
              开始取名
            </router-link>
            <router-link 
              to="/history" 
              class="text-gray-600 hover:text-primary-500 transition-colors"
              active-class="text-primary-500 font-bold"
            >
              历史记录
            </router-link>
            <router-link 
              to="/feedback" 
              class="text-gray-600 hover:text-primary-500 transition-colors"
              active-class="text-primary-500 font-bold"
            >
              反馈建议
            </router-link>
          </div>
          
          <!-- 移动端菜单按钮 -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-4 py-3 space-y-2">
          <router-link 
            to="/" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-2 text-gray-600 hover:bg-primary-50 rounded-lg"
          >
            首页
          </router-link>
          <router-link 
            to="/generate" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-2 text-gray-600 hover:bg-primary-50 rounded-lg"
          >
            开始取名
          </router-link>
          <router-link 
            to="/history" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-2 text-gray-600 hover:bg-primary-50 rounded-lg"
          >
            历史记录
          </router-link>
          <router-link 
            to="/feedback" 
            @click="mobileMenuOpen = false"
            class="block px-4 py-2 text-gray-600 hover:bg-primary-50 rounded-lg"
          >
            反馈建议
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="bg-white/50 backdrop-blur-sm mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 text-center text-gray-500">
        <p>© 2025 皮球给您取名字 - 智能取名应用</p>
        <p class="mt-2 text-sm">基于周易五行与AI大模型的智能取名服务</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
