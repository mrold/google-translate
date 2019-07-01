# 本地运行Google翻译接口

只是一个简单demo

## 安装
先克隆当前仓库，然后进入项目目录执行：
```
npm install
```

## 启动项目
会在本地3000端口启动一个http服务
```
node index.js
```
## 使用
在浏览器访问翻译接口，例如：
```
http://localhost:3000?text=hello world&to=cn
```
URL参数介绍：

text：要翻译的文本

to: 翻译结果的语言，中文是cn，英文是en，默认是cn