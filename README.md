# 个人主页

一份单页个人网站，包含个人头像、关于我、技能、回忆录时间线、相册和联系方式等基础功能。

## 如何打开

直接双击 `index.html` 即可在浏览器中查看。

## 目录结构

```
personal-website/
├── index.html          # 页面主体，所有文字内容都在这里改
├── css/
│   └── style.css       # 样式，主题色改这里的 --primary / --accent
├── js/
│   └── main.js         # 交互逻辑，联系邮箱等配置在 SITE_CONFIG 里
└── assets/
    ├── avatar.svg      # 默认头像占位图
    ├── favicon.svg     # 站点小图标
    └── gallery-1~4.svg # 相册占位图
```

## 想改成自己的？

1. **名字 / 简介**：打开 `index.html`，搜“你的名字”“某城市”等字样直接替换。
2. **头像**：把 `assets/avatar.svg` 换成你自己的照片（方形即可，页面会裁成圆形），文件名保持 `avatar.svg` 或同步修改 `index.html` 里的引用。
3. **联系方式**：在 `index.html` 的「联系方式」区块替换邮箱、电话、微信、社交链接。
4. **回忆录**：在 `index.html` 的 `.timeline` 里复制粘贴 `<article class="timeline-item">` 结构，就能添加新的回忆条目。
5. **相册**：把 `assets/gallery-*.svg` 换成真实照片，并修改 `figcaption` 里的说明文字。
6. **发邮件**：打开 `js/main.js`，把 `SITE_CONFIG.email` 改成你的真实邮箱，留言表单就会调用系统邮件客户端发送；不改则只做前端校验提示。
7. **深色模式**：右上角月亮/太阳按钮一键切换，会自动记住你的选择。

## 部署上线（可选）

把 `personal-website` 文件夹里的内容推到任意静态托管即可：

- **GitHub Pages**：把内容提交到仓库，Settings → Pages → 选择分支发布。
- **Netlify / Vercel**：直接把文件夹拖进去，或从仓库导入。

## 技术说明

纯 HTML + CSS + JavaScript，无任何依赖，无需构建，双击即可运行。
