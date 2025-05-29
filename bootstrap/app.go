package bootstrap

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/spf13/viper"
)

type Application struct {
	Env  *Env
	DB   *sql.DB
}

type Env struct {
	AppEnv                 string `mapstructure:"APP_ENV"`
	ServerAddress          string `mapstructure:"SERVER_ADDRESS"`
	ContextTimeout         int    `mapstructure:"CONTEXT_TIMEOUT"`
	DBHost                 string `mapstructure:"DB_HOST"`
	DBPort                 string `mapstructure:"DB_PORT"`
	DBUser                 string `mapstructure:"DB_USER"`
	DBPass                 string `mapstructure:"DB_PASS"`
	DBName                 string `mapstructure:"DB_NAME"`
	AccessTokenExpiryHour  int    `mapstructure:"ACCESS_TOKEN_EXPIRY_HOUR"`
	RefreshTokenExpiryHour int    `mapstructure:"REFRESH_TOKEN_EXPIRY_HOUR"`
	AccessTokenSecret      string `mapstructure:"ACCESS_TOKEN_SECRET"`
	RefreshTokenSecret     string `mapstructure:"REFRESH_TOKEN_SECRET"`
}

func newEnv() *Env {
	env := Env{}
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatal("Can't find the file .env : ", err)
	}

	err = viper.Unmarshal(&env)
	if err != nil {
		log.Fatal("Environment can't be loaded: ", err)
	}

	if env.AppEnv == "development" {
		log.Println("The App is running in development env")
	}

	return &env
}

func newDatabase(Env *Env) *sql.DB {

	db, err := sql.Open("mysql", Env.DBUser+":"+Env.DBPass+"@tcp("+Env.DBHost+":"+Env.DBPort+")/"+Env.DBName)
	if err != nil {
		log.Fatal("Database connection error: ", err)
	}
	
	err = db.Ping()
	if err != nil {
		log.Fatal("Database ping error: ", err)
	}
	
	return db
}

func App() Application {
	app := &Application{}
	app.Env = newEnv()
	app.DB = newDatabase(app.Env)
	return *app
}

