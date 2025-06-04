package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/bootstrap"
	"github.com/longkhan786/chat-app/model"
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

	userMessage := model.UserMessage{
		SenderID:  	1,
		ReceiverID: 2,
		Content:   	message,
	}

	db := uc.Db

	db.Create(&userMessage)
	db.Preload("Sender").Preload("Receiver").First(&userMessage, userMessage.ID)
	
	c.JSON(200, gin.H{
		"message": "Message sent successfully",
		"data":    userMessage,
	})
}