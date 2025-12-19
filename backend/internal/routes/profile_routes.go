package routes

import (
	"github.com/andrewbytecoder/wailsapp/backend/internal/handlers"
	"github.com/andrewbytecoder/wailsapp/backend/internal/service"
	"github.com/andrewbytecoder/wailsapp/backend/pkg/auth"
	"github.com/gin-gonic/gin"
)

// RegisterProfileRoutes registers profile management routes
func RegisterProfileRoutes(router *gin.RouterGroup, authService *service.AuthService, roleService *service.RoleService) {
	profileHandler := handlers.NewProfileHandler(authService, roleService)

	// Apply JWT middleware to all profile routes
	profileRoutes := router.Group("/profile")
	profileRoutes.Use(auth.JWTAuthMiddleware())
	{
		// Profile management
		profileRoutes.GET("", profileHandler.GetProfile)
		profileRoutes.PUT("", profileHandler.UpdateProfile)

		// Password management
		profileRoutes.PUT("/password", profileHandler.ChangePassword)

		// Avatar management
		profileRoutes.POST("/avatar", profileHandler.UploadAvatar)
		profileRoutes.PUT("/avatar", profileHandler.UpdateAvatar)
		profileRoutes.DELETE("/avatar", profileHandler.DeleteAvatar)

		// Role and permission information
		profileRoutes.GET("/roles", profileHandler.GetUserRoles)
		profileRoutes.GET("/permissions", profileHandler.GetUserPermissions)

		// Activity log
		profileRoutes.GET("/activity", profileHandler.GetActivityLog)
	}
}
