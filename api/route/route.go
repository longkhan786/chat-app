package route

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/bootstrap"
	"gorm.io/gorm"
)

func Setup(env *bootstrap.Env, timeout time.Duration, db *gorm.DB, gin *gin.Engine) {
	NewUserRouter(env, timeout, db, gin.Group("/api/user"))
}