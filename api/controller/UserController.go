package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/bootstrap"
	"gorm.io/gorm"
)

type UserController struct {
	Env           *bootstrap.Env
	Db            *gorm.DB
}

func (uc *UserController) Signup(c *gin.Context) {

	c.JSON(200, gin.H{
		"message": "Signup successful",
	})
}

func (uc *UserController) SendMessage(c *gin.Context) {

	message := c.PostForm("message")
	c.JSON(200, gin.H{
		"message": "Message sent: " + message,
	})
}