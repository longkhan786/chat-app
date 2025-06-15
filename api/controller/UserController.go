package controller

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/longkhan786/chat-app/bootstrap"
	"github.com/longkhan786/chat-app/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserController struct {
	Env           *bootstrap.Env
	Db            *gorm.DB
}

type MessageRequest struct {
	Message string `json:"message"`
}

type SignupRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	MobileNumber string `json:"mobileNumber" binding:"required,min=6"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}


func (uc *UserController) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid input"})
		return
	}

	var user model.User
	if err := uc.Db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(401, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // 3 days
	})

	tokenString, err := token.SignedString([]byte(uc.Env.JWTSecret))
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to create token"})
		return
	}

	// Set token as HTTP-only cookie
	c.SetCookie("token", tokenString, 3600*24*3, "/", "", false, true)

	c.JSON(200, gin.H{
		"message": "Login successful",
		"user":    user,
		"token":   tokenString,
	})
}


func (uc *UserController) Signup(c *gin.Context) {
	var req SignupRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user := model.User{
		Username: req.Username,
		Email:    req.Email,
		PasswordHash: string(hashedPassword),
		Status: 1,
		MobileNumber: req.MobileNumber,
	}

	if err := uc.Db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Email or username already taken"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString([]byte(uc.Env.JWTSecret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create token"})
		return
	}

	c.SetCookie("token", tokenString, 3600*24*3, "/", "", false, true)

	c.JSON(200, gin.H{
		"message": "Signup successful",
		"user":    user,
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

func (uc *UserController) FetchUsers(c *gin.Context) {

	db := uc.Db
	var users []model.User
	db.Find(&users)

	c.JSON(200, gin.H{
		"status": true,
		"data": users,
	})
}