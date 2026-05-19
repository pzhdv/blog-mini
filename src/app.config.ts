export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/author/index',
    'pages/detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '晖途博文',
    navigationBarTextStyle: 'black'
  },
  "lazyCodeLoading": "requiredComponents",
  // 全局配置文件
  tabBar: {
    // custom: true, // 使用自定义custom-tab-bar
    color: '#111827',
    selectedColor: '#2563eb',
    backgroundColor: '#fff',
    borderStyle: 'black', // 底部的border颜色，只能是“black”或者“white”
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index', // 路由
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home_active.png',
      },
      {
        text: '分类',
        pagePath: 'pages/category/index',
        iconPath: 'assets/images/category.png',
        selectedIconPath: 'assets/images/category_active.png',
      },
      {
        text: '作者',
        pagePath: 'pages/author/index',
        iconPath: 'assets/images/author.png',
        selectedIconPath: 'assets/images/author_active.png',
      },
    ],
  },
})
