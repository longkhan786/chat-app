package model

import "time"

type UserMessage struct {
    ID         uint      `gorm:"primaryKey;autoIncrement"`
    SenderID   uint      `gorm:"not null"`
    ReceiverID uint      `gorm:"not null"`
    Content    string    `gorm:"type:text;not null"`
    CreatedAt  time.Time `gorm:"autoCreateTime"`
    UpdatedAt  time.Time `gorm:"autoUpdateTime"`

    Sender   User `gorm:"foreignKey:SenderID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
    Receiver User `gorm:"foreignKey:ReceiverID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}
