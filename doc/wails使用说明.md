## 命令行
### 初始化

wails init 用于生成项目

| 标志   | 描述                                         | 默认值   |
|------|--------------------------------------------|-------|
| -n   | 项目名称，必须填写                                  |       |
| -d   | 项目目录                                       | 项目名   |
| -g   | 初始化 git 存储库                                |       |
| -l   | 可用项目模版列表                                   |       |
| -q   | 静默模式                                       |       |
| -t   | 模版名称                                       |       |
| -ide | Generate IDE project file vscode or goland |       |
| -f   | 前置构建应用                                     | false |


### 使用远程模板

```bash
wails init -n test -t https://github.com/leaanthony/testtemplate[@v1.0.0]
```
全部模版参考 ： [wails模板](https://wails.io/zh-Hans/docs/community/templates)


#### vue 模版

- wails-template-vue - 基于 Vue 生态的 Wails 模板（集成 TypeScript、黑暗主题、国际化、单页路由、TailwindCSS）
- wails-template-quasar-js - 使用 JavaScript + Quasar V2（Vue 3, Vite, Sass, Pinia, ESLint, Prettier）的模板
- wails-template-quasar-ts - 使用 TypeScript + Quasar V2（Vue 3、Vite、Sass、Pinia、ESLint、Prettier、带 <script setup> 的Composition API）的模板
- wails-template-naive - 基于 Naive UI(一款 Vue 3 组件库)的 Wails 模板
- wails-template-tdesign-js - Wails template based on TDesign UI (a Vue 3 UI library by Tencent), using Vite, Pinia, Vue Router, ESLint, and Prettier.


### 构建

wails build 用于构建项目，将项目编译成可执行的二进制文件

| 标志           | 描述                                                         | 默认值                       |
| -------------- | ------------------------------------------------------------ | ---------------------------- |
| -clean         | 清理build/bin目录                                            |                              |
| -compiler      | 使用不同的go编译器来构建例如 go1.15                          | go                           |
| -debug         | 构建调试版本,保留调试窗口和console                           |                              |
| -devtools      | Allows the use of the devtools in the application window in production (when -debug is not used). Ctrl/Cmd+Shift+F12 may be used to open the devtools window. NOTE: This option will make your application FAIL Mac appstore guidelines. Use for debugging only. |                              |
| dryrun         | 运行构建，但只打印构建信息，不生成二进制文件                 | false                        |
| -f             | 强制构建                                                     |                              |
| -garbleargs    | 传输garble参数                                               | -literals -tiny -seed=random |
| -ldflags       | 传递给编译器额外的ldflags参数                                |                              |
| -m             | 编译器跳过 mod tidy                                          |                              |
| -nopackage     | 不打包应用程序                                               |                              |
| -nocolour      | 在输出中禁用颜色                                             |                              |
| -nosyncgomod   | 不同步go.mod 中的wails版本                                   |                              |
| -nsis          | 为windows生成nsis安装程序                                    |                              |
| -o 文件名      | 输出文件名                                                   |                              |
| -obfuscated    | 使用garble 混淆应用程序                                      |                              |
| -platform      | 为指定平台                                                   |                              |
| -race          | 使用Go的静态检测器构建                                       |                              |
| -s             | 跳过前端构建                                                 |                              |
| -skipbindings  | 跳过bindings生成                                             |                              |
| -tags          | 额外标签，构建传递给go编译器，必须引用。使用空格或逗号分割（但不能同时使用） |                              |
| -trimpath      | 从生成的可执行文件中删除所有的文件路径                       |                              |
| -u             | 更新项目的go.mod以使用与CLI相同版本的Wails                   |                              |
| -upx           | 使用upx压缩成最终二进制                                      |                              |
| -upxflags      | 传递给upx的标志                                              |                              |
| -v int         | 详细级别（0 - silent, 1 - default, 2 - verbose）             | 1                            |
| -webview       | WebView2安装策略（download, embed,browser,error）            | download                     |
| -windowconsole | 保留Windows构建控制台窗口                                    |                              |



### 诊断

`wails docker`将运行诊断程序以确保您的系统已经准备好进行开发

### 开发模式

`wails dev` 用以实时开发模式运行您的应用

- 应用程序的 `go.mod` 将被更新为与 Wails CLI 相同的版本
- 应用程序被编译并自动运行
- 一个观察者被启动，如果它检测到您的 go 文件的变化，它将触发您的开发应用程序的重新构建
- 启动一个网络服务器 `http://localhost:34115`，通过 http 为您的应用程序（不仅仅是前端）提供服务。 这允许您使用您喜欢的浏览器开发扩展
- 所有应用程序资源都从磁盘加载。 如果它们被更改，应用程序将自动重新加载（而不是重新构建）。 所有连接的浏览器也将重新加载
- 生成的 JS 模块提供以下内容：
- 带有自动生成的 JSDoc 的 Go 方法的 JavaScript 包装器，提供代码提示
- 您的 Go 结构的 TypeScript 版本，可以构建并传递给您的 go 方法
- 生成第二个 JS 模块，为运行时提供包装器 + TS 声明
- 在 macOS 上，它将应用程序捆绑到一个 `.app` 文件中并运行它。 开发模式将使用 `build/darwin/Info.dev.plist` 。

| 标志                         | 描述                                                         | 默认                |
| :--------------------------- | :----------------------------------------------------------- | :------------------ |
| -appargs "参数"              | 以 shell 样式传递给应用程序的参数                            |                     |
| -assetdir "./path/to/assets" | 从给定目录提供资产，而不是使用提供的资产 FS                  | `wails.json` 中的值 |
| -browser                     | 在启动时打开浏览器到 `http://localhost:34115`                |                     |
| -compiler "编译器"           | 使用不同的 go 编译器来构建，例如 go1.15beta1                 | go                  |
| -debounce                    | 检测到资产更改后等待重新加载的时间                           | 100 (毫秒)          |
| -devserver "host:port"       | 将 wails 开发服务器绑定到的地址                              | "localhost:34115"   |
| -extensions                  | 触发重新构建的扩展（逗号分隔）                               | go                  |
| -forcebuild                  | 强制构建应用程序                                             |                     |
| -frontenddevserverurl "url"  | 使用 3rd 方开发服务器 url 提供资产，例如：Vite               | ""                  |
| -ldflags "标志"              | 传递给编译器的额外 ldflags                                   |                     |
| -loglevel "日志级别"         | 要使用的日志级别 - Trace, Debug, Info, Warning, Error        | Debug（调试）       |
| -nocolour                    | 关闭彩色命令行输出                                           | false               |
| -noreload                    | 资产更改时禁用自动重新加载                                   |                     |
| -nosyncgomod                 | 不同步 go.mod 中的 Wails 版本                                | false               |
| -race                        | 使用 Go 的竞态检测器构建                                     | false               |
| -reloaddirs                  | 触发重新加载的附加目录（逗号分隔）                           | `wails.json` 中的值 |
| -s                           | 跳过前端构建                                                 | false               |
| -save                        | 将指定的 `assetdir`、 `reloaddirs`、 `wailsjsdir`、 `debounce` 、 `devserver` 和 `frontenddevserverurl` 标志的值保存到 `wails.json` 以成为后续调用的默认值。 |                     |
| -skipbindings                | 跳过 bindings 生成                                           |                     |
| -tags "额外标签"             | 传递给编译器的构建标签（引号和空格分隔）                     |                     |
| -v                           | 详细级别 (0 - silent, 1 - standard, 2 - verbose)             | 1                   |
| -wailsjsdir                  | 生成生成的Wails JS模块的目录                                 | `wails.json` 中的值 |



### 生成

#### 模板

wails使用模板来生成项目，`wails generate template` 命令用来构建模板，以使它可以生成项目

| 标志      | 描述         |
| --------- | ------------ |
| -name     | 模板名称     |
| -frontend | 前端项目路径 |

#### 模块

`wails generate module`命令允许您为应用程序手动生成wailsjs目录

| 标志      | 描述                                         | 默认 |
| --------- | -------------------------------------------- | ---- |
| -comoiler | 使用不同的go编译器来构建                     | go   |
| -tags     | 额外标签，传递给编译器构建标签引号和空格分割 |      |

#### 跟新

`wails update` 将更新wails cli的版本

| 标志     | 描述                   |
| -------- | ---------------------- |
| -pre     | 更新到最新的预发布版本 |
| -version | 安装指定的cli版本      |

#### 版本

`wails version`输出当前cli版本





