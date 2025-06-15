package route

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/middleware"
	"github.com/longkhan786/chat-app/bootstrap"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, timeout time.Duration, db *gorm.DB, gin *gin.Engine, jwtSecret []byte) {
	checkMiddleware(gin, jwtSecret)

	//gin.GET("ws", ws.Setup())
	
	NewUserRouter(env, timeout, db, gin.Group("/api/user"))
}

func checkMiddleware(gin *gin.Engine, jwtSecret []byte) {
	gin.Use(middleware.CORSMiddleware())
	//gin.Use(middleware.AuthMiddleware(jwtSecret))
}