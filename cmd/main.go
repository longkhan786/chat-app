package main

import (
	"fmt"

	"github.com/longkhan786/chat-app/bootstrap"
)

func main()  {
	app := bootstrap.App()
	
 	env := app.Env
	db := app.DB
	
	fmt.Println("App Environment:", env.AppEnv)
	fmt.Println("Database Connection:", db)
}