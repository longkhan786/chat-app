package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/longkhan786/chat-app/bootstrap"
	"gorm.io/gorm"
)

type AuthController struct {
	Env           *bootstrap.Env
	Db            *gorm.DB
	JWT           []byte
}


func generateToken(username string, jwtData string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 2).Unix(), // token expires in 2 hours
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtData)
}

func (uc *AuthController) LoginHandler(c *gin.Context) {
	username := c.Query("username")

	token, err := generateToken(username, string(uc.JWT))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}