package app

import (
	"context"
	"fmt"

	"github.com/andrewbytecoder/wailsapp/pkg/menu"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx  context.Context
	menu *menu.Menu
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		menu: menu.New(),
	}
}

func (a *App) Menu() *menu.Menu {
	return a.menu
}

// Startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.menu.SetCtx(ctx)
	// js to go
	runtime.EventsOn(a.ctx, "showVersion", func(events ...any) {
		fmt.Sprintln("Version: ", events[0])
		runtime.LogInfo(a.ctx, "Version: "+events[0].(string))
		// 使用go调用js中注册的事件
		runtime.EventsEmit(a.ctx, "showUser", "root")
	})
	// 使用js 到 go 然后再 go 到js 就能实现异步调用，避免阻塞，要是同步调用可以直接使用js实现
}

type Person struct {
	Name    string   `json:"name"`
	Age     uint8    `json:"age"`
	Address *Address `json:"address"`
}

type Address struct {
	Street   string `json:"street"`
	Postcode string `json:"postcode"`
}

// Greet returns a greeting for the given name
func (a *App) Greet(p Person) string {
	return fmt.Sprintf("Hello %s (Age: %d)!", p.Name, p.Age)
}
