# wails-demo
wails-demo


## Install

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

## 检查 wails是否安装成功以及依赖是否全部ok

```bash
wails doctor
```

## 创建 wials vue TS 项目

```bash
wails init -n myproject -t vue-ts
```


## 编译

### 仅仅编译
编译之后需要进入到二进制文件包进行运行

```bash
wails build
```
### 编译并运行应用

```bash
wails dev
```
使用 wails dev 命令在开发模式下运行时，资源会从磁盘加载，任何更改都会导致“实时重新加载”。资源的位置将从 embed.FS 推断出来。

