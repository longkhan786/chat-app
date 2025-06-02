package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/bootstrap"
)

type SignupController struct {
	Env           *bootstrap.Env
}

func (sc *SignupController) Signup(c *gin.Context) {

	c.JSON(200, gin.H{
		"message": "Signup successful",
	})
}