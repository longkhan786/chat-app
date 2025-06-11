package route

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/controller"
	"github.com/longkhan786/chat-app/bootstrap"
	"gorm.io/gorm"
)

func NewAuthRouter(env *bootstrap.Env, timeout time.Duration, db *gorm.DB, gin *gin.Engine, jwtSecret []byte) {
	ac := controller.AuthController{
		Env: env,
		Db:  db,
		JWT: jwtSecret,
	}

	gin.GET("/login", ac.LoginHandler)
	
}