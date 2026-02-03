<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-gold-500/10"></div>
      <div class="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- 标题 -->
          <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            <span class="bg-gradient-to-r from-primary-600 to-gold-500 bg-clip-text text-transparent">
              皮球给您取名字
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            基于周易五行与AI大模型的智能取名服务，为您的宝宝取一个寓意深远的好名字
          </p>
          
          <!-- CTA按钮 -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <router-link 
              to="/generate"
              class="btn-primary text-lg inline-flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              开始取名
            </router-link>
            <router-link 
              to="/history"
              class="btn-secondary text-lg inline-flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              查看历史
            </router-link>
          </div>
        </div>
        
        <!-- 装饰元素 -->
        <div class="absolute top-10 left-10 text-6xl opacity-20 animate-float">🎋</div>
        <div class="absolute bottom-10 right-10 text-6xl opacity-20 animate-float" style="animation-delay: 1s;">✨</div>
        <div class="absolute top-1/2 left-1/4 text-4xl opacity-20 animate-float" style="animation-delay: 2s;">🌟</div>
      </div>
    </section>

    <!-- 特色功能 -->
    <section class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">我们的特色</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 五行分析 -->
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🀄</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">五行分析</h3>
          <p class="text-gray-600">根据出生日期分析五行属性，平衡八字，选取最适合的名字用字</p>
        </div>

        <!-- 生肖匹配 -->
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🐉</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">生肖匹配</h3>
          <p class="text-gray-600">结合生肖特点，选择符合生肖习性的吉祥偏旁，让名字更加契合</p>
        </div>

        <!-- 音韵和谐 -->
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🎵</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">音韵和谐</h3>
          <p class="text-gray-600">专业的音韵学分析，确保名字朗朗上口，读音优美动听</p>
        </div>

        <!-- AI智能生成 -->
        <div class="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-3xl">🤖</span>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">AI智能生成</h3>
          <p class="text-gray-600">结合传统文化智慧与现代AI技术，快速生成寓意美好的名字</p>
        </div>
      </div>
    </section>

    <!-- 使用流程 -->
    <section class="bg-white/50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">使用流程</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">1</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">填写信息</h3>
            <p class="text-gray-600">输入宝宝的出生日期、性别和姓氏</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">2</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">AI智能分析</h3>
            <p class="text-gray-600">系统分析五行生肖，生成最佳名字推荐</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">3</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">选择满意的名字</h3>
            <p class="text-gray-600">查看名字寓意和评分，选择最满意的名字</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-primary-500 to-gold-500 rounded-3xl p-8 md:p-12 text-white">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-6">关于皮球给您取名字</h2>
          <p class="text-lg mb-6 opacity-90">
            皮球给您取名字是一款融合中华传统取名智慧与现代人工智能技术的创新应用。
            我们深知，一个好名字不仅是一个符号，更承载着父母对孩子的期望和祝福。
          </p>
          <p class="text-lg opacity-90">
            我们的使命是帮助每一位父母为孩子取一个既符合传统文化又具有现代美感的好名字。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 首页逻辑
</script>
