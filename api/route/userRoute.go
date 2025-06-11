package route

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/controller"
	"github.com/longkhan786/chat-app/bootstrap"
	"gorm.io/gorm"
)

func NewUserRouter(env *bootstrap.Env, timeout time.Duration, db *gorm.DB, group *gin.RouterGroup) {
	group.GET("/", func (c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome",
		})
	})
	
	uc := controller.UserController{
		Env: env,
		Db:  db,
	}
	
	group.POST("/signup", uc.Signup)
	group.POST("/sendMessage", uc.SendMessage)
	group.GET("/fetchMessages", uc.FetchMessages)
}