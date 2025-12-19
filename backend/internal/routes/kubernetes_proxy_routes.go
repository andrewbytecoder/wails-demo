package routes

import (
	"github.com/gin-gonic/gin"

	"github.com/andrewbytecoder/wailsapp/backend/internal/handlers"
)

func KubernetesProxyRoutes(router *gin.RouterGroup, handler *handlers.ProxyHandler) {
	proxyGroup := router.Group("/proxy")
	{
		proxyGroup.Any("/*act", handler.Proxy)
	}
}
