package route

import (
	"database/sql"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/bootstrap"
)

func Setup(env *bootstrap.Env, timeout time.Duration, db *sql.DB, gin *gin.Engine) {
	
}