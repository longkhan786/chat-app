package route

import (
	"database/sql"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/controller"
	"github.com/longkhan786/chat-app/bootstrap"
)

func NewSignupRouter(env *bootstrap.Env, timeout time.Duration, db *sql.DB, group *gin.RouterGroup) {
	group.GET("/", func (c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome",
		})
	})
	sc := controller.SignupController{Env: env}
	group.POST("/signup", sc.Signup)
}