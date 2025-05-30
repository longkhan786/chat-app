package repository

import (
	"database/sql"

	"github.com/longkhan786/chat-app/domain"
)

type userRepository struct {
	database   *sql.DB
	collection string
}

func NewUserRepository(db *sql.DB, collection string) domain.UserRepository {
	return &userRepository{
		database:   db,
		collection: collection,
	}
}