package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/route"
	"github.com/longkhan786/chat-app/bootstrap"
)

func main()  {
	app := bootstrap.App()
	
 	env := app.Env
	db := app.DB

	defer db.Close()

	timeout := time.Duration(env.ContextTimeout) * time.Second

	gin := gin.Default()
	fmt.Println("Registering /api/v1/signup route") // 👈 add this

	route.Setup(env, timeout, db, gin)

	gin.Run(env.ServerAddress)
}