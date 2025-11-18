package menu

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Menu struct {
	ctx context.Context
	mu  *menu.Menu
}

func New() *Menu {
	return &Menu{
		mu: menu.NewMenu(),
	}
}

func (m *Menu) SetCtx(ctx context.Context) {
	m.ctx = ctx
}

func (m *Menu) GetMenu() *menu.Menu {
	fileMenu := m.mu.AddSubmenu("File")
	fileMenu.AddText("Open", keys.Control("o"), func(data *menu.CallbackData) {
		fmt.Println("Open file")
		filePath, err := runtime.OpenFileDialog(m.ctx, runtime.OpenDialogOptions{
			Title: "Select a directory",
			Filters: []runtime.FileFilter{
				{
					DisplayName: "Images",
					Pattern:     "*.png;*.jpg",
				},
			},
		})
		if err != nil {
			return
		}
		fmt.Println(filePath)
	})
	fileMenu.AddText("Save", keys.CmdOrCtrl("s"), func(data *menu.CallbackData) {
		fmt.Println("Save file")
	})
	fileMenu.AddText("Save all file", &keys.Accelerator{
		Key:       "s",
		Modifiers: []keys.Modifier{keys.CmdOrCtrlKey, keys.ShiftKey},
	}, func(data *menu.CallbackData) {
		fmt.Println("Save all file")
	})
	fileMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(data *menu.CallbackData) {
		fmt.Println("Quit")
	})
	fileMenu.AddSeparator()
	moreMenu := m.mu.AddSubmenu("More")
	moreMenu.AddText("About", nil, func(data *menu.CallbackData) {
		fmt.Println("About")
	})

	return m.mu
}
