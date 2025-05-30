package route

import (
	"database/sql"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/longkhan786/chat-app/api/controller"
	"github.com/longkhan786/chat-app/bootstrap"
	"github.com/longkhan786/chat-app/domain"
	"github.com/longkhan786/chat-app/repository"
	"github.com/longkhan786/chat-app/usecase"
)

func NewSignupRouter(env *bootstrap.Env, timeout time.Duration, db *sql.DB, group *gin.RouterGroup) {

	ur := repository.NewUserRepository(db, domain.CollectionUser)
	sc := controller.SignupController{
		SignupUsecase: usecase.NewSignupUsecase(ur, timeout),
		Env:           env,
	}
	group.POST("/signup", sc.Signup)
}