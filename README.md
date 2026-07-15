# 半糖主义 PWA — iOS 安装指南

## 三步让 iPhone 用户安装

1. **打开 Safari**，访问这个链接（需要替换成你的实际链接）：
   ```
   https://你的域名/bantang/
   ```

2. **点击底部分享按钮** （↑ 方形带箭头图标）

3. **"添加到主屏幕"** → 点右上角"添加"

桌面上就会出现「半糖主义」的 App 图标，点击即可使用。

## 没有服务器？可以用这些免费托管：

### 方案 A: GitHub Pages (推荐，完全免费)
1. 注册 GitHub 账号
2. 创建一个名为 `bantang` 的公开仓库
3. 把 `BanTang PWA/` 文件夹里的所有文件上传
4. Settings → Pages → Source 选 main 分支 → Save
5. 等 2 分钟，链接就是 `https://你的用户名.github.io/bantang/`

### 方案 B: Netlify (拖拽上传)
1. 访问 netlify.com，用 GitHub 登录
2. 把 `BanTang PWA/` 文件夹直接拖到部署区
3. 自动生成链接，如 `https://xxx.netlify.app`

### 方案 C: Cloudflare Pages
1. 访问 pages.cloudflare.com
2. 连接 GitHub，选择仓库
3. 自动部署

## 本地文件也可直接传给 iPhone 用户

把 `BanTang_PWA.zip` 发给对方，解压后用 Safari 打开 `index.html`，同样可以添加到主屏幕使用。
