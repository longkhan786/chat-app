package route

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/middleware"
	"github.com/longkhan786/chat-app/api/ws"
	"github.com/longkhan786/chat-app/bootstrap"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, timeout time.Duration, db *gorm.DB, gin *gin.Engine) {
	checkMiddleware(gin)

	gin.GET("ws", ws.Setup())
	
	NewUserRouter(env, timeout, db, gin.Group("/api/user"))
}

func checkMiddleware(gin *gin.Engine) {
	gin.Use(middleware.CORSMiddleware())
}