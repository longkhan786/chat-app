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

type MessageRequest struct {
	Message string `json:"message"`
}

func (uc *UserController) Signup(c *gin.Context) {

	c.JSON(200, gin.H{
		"message": "Signup successful",
	})
}

func (uc *UserController) SendMessage(c *gin.Context) {
	
	var req MessageRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	message := req.Message

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

func (uc *UserController) FetchMessages(c *gin.Context) {
	
	var messages []model.UserMessage
	db := uc.Db

	if err := db.Preload("Sender").Preload("Receiver").Find(&messages).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch messages"})
		return
	}

	c.JSON(200, gin.H{
		"status": true,
		"data": messages,
	})
}