package main

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/route"
	"github.com/longkhan786/chat-app/bootstrap"
)

var jwtSecret = []byte("secret")
func main()  {
	app := bootstrap.App()
	
 	env := app.Env
	db := app.DB

	sqlDB, _ := db.DB()
	defer sqlDB.Close()
	
	timeout := time.Duration(env.ContextTimeout) * time.Second

	gin := gin.Default()

	route.Setup(env, timeout, db, gin, jwtSecret)

	gin.Run(env.ServerAddress)
}