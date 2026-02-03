# 皮球给您取名字 - 智能取名应用

## 项目介绍

皮球给您取名字是一款融合中华传统取名智慧与现代人工智能技术的创新应用。基于周易五行、生肖匹配等传统文化理论，结合**DeepSeek**大模型，为用户提供智能取名服务。

## 功能特性

### 🎯 核心功能
- **智能取名**：根据用户提供的出生日期、性别、姓氏等信息，AI智能生成寓意美好的名字
- **五行分析**：基于出生日期进行五行分析，计算八字五行缺失，推荐合适的名字
- **生肖匹配**：根据出生年份判断生肖，结合生肖特点推荐吉祥偏旁
- **音韵和谐**：专业的音韵学分析，确保名字朗朗上口
- **名字评分**：从五行、音韵、笔画等多维度对名字进行评分

### 📱 用户功能
- **取名表单**：输入姓氏、性别、出生日期、时辰等信息
- **结果展示**：展示推荐名字、寓意解释、五行属性、评分等详细信息
- **名字收藏**：保存喜欢的名字到历史记录
- **评分反馈**：为生成的名字评分并提供反馈意见
- **分享功能**：将喜欢的名字分享给好友
- **历史记录**：查看和管理之前保存的所有名字

## 技术架构

### 前端技术
- **Vue 3**：使用Composition API和setup语法糖
- **Vue Router**：页面路由管理
- **Pinia**：状态管理
- **Axios**：HTTP请求
- **Tailwind CSS**：样式框架
- **Vite**：构建工具

### 核心模块
```
src/
├── assets/          # 静态资源
├── components/      # 可复用组件
├── router/          # 路由配置
├── services/        # API服务
│   └── openai.js    # DeepSeek AI集成
├── stores/          # Pinia状态管理
│   └── nameStore.js # 名字状态管理
├── utils/           # 工具函数
│   └── nameAnalysis.js # 五行分析算法
└── views/           # 页面视图
    ├── HomeView.vue        # 首页
    ├── GenerateView.vue    # 取名表单
    ├── ResultView.vue      # 结果展示
    ├── HistoryView.vue     # 历史记录
    └── FeedbackView.vue    # 反馈建议
```

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
复制 `.env.example` 文件为 `.env`，并填入你的DeepSeek API密钥：
```bash
cp .env.example .env
```

然后编辑 `.env` 文件：
```
VITE_OPENAI_API_KEY=your_api_key_here
```

> **注意**：如果没有配置API密钥，应用将使用本地名字库进行生成。

### 3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本
```bash
npm run build
```

## 使用说明

### 开始取名
1. 点击"开始取名"或导航栏"开始取名"
2. 输入姓氏（必填）
3. 选择宝宝性别（男孩/女孩）
4. 选择出生日期（必填）
5. 可选：选择出生时辰
6. 点击"生成名字"

### 查看结果
- 系统会展示3个推荐名字
- 每个名字包含：
  - 全名
  - 寓意解释
  - 五行属性
  - 综合评分
- 可以保存喜欢的名字

### 历史记录
- 保存的名字会显示在历史记录中
- 可以查看名字详情
- 支持删除不需要的名字

## DeepSeek API配置

### 获取API密钥
1. 访问 [DeepSeek Platform](https://platform.deepseek.com)
2. 注册账号并登录
3. 进入API Keys页面创建新的API密钥
4. 复制密钥并填入 `.env` 文件

### 费用说明
- 使用DeepSeek API会产生费用
- 具体费用请参考 [DeepSeek定价](https://www.deepseek.com/pricing)
- 如果不使用API密钥，将使用本地名字库生成名字（免费）

## 项目结构说明

```
name123/
├── public/              # 公共资源
│   └── favicon.svg      # 网站图标
├── src/
│   ├── assets/          # 样式文件
│   │   └── main.css     # 全局样式
│   ├── router/          # 路由配置
│   │   └── index.js     # 路由定义
│   ├── services/        # API服务
│   │   └── openai.js    # DeepSeek AI集成
│   ├── stores/          # 状态管理
│   │   └── nameStore.js # 名字状态
│   ├── utils/           # 工具函数
│   │   └── nameAnalysis.js # 五行分析
│   ├── views/           # 页面视图
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── index.html           # HTML模板
├── package.json         # 项目配置
├── vite.config.js       # Vite配置
├── tailwind.config.js   # Tailwind配置
└── .env.example         # 环境变量示例
```

## 响应式设计

应用支持以下屏幕尺寸：
- 📱 手机 (< 640px)
- 📱 平板 (640px - 1024px)
- 🖥️ 桌面 (> 1024px)

## 数据存储

- 所有用户数据存储在本地浏览器
- 使用 localStorage 保存：
  - 已保存的名字列表
  - 反馈历史记录
- 数据不会上传到服务器，保护用户隐私

## 扩展功能

- [ ] 支持多语言
- [ ] 更多生成模型
- [ ] 社交媒体分享
- [ ] 个性化推荐
- [ ] 名字对比功能
- [ ] 批量导出

## 贡献指南

欢迎提交Issue和Pull Request！

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过反馈页面联系我们。

---

**皮球给您取名字** - 让每个孩子都有一个好名字 🎀
"# my-cangku" 
"# my-cangku" 
