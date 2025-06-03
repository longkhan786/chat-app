package model

import "time"

type User struct {
    ID           uint           `gorm:"primaryKey;autoIncrement"`
    Username     string         `gorm:"size:50;unique;not null"`
    Email        string         `gorm:"size:255;unique;not null"`
    MobileNumber string         `gorm:"size:20;unique"`
    PasswordHash string         `gorm:"type:text;not null"`
    DisplayName  string         `gorm:"size:100"`
    AvatarURL    string         `gorm:"type:text"`
    LastSeen     time.Time      `gorm:"default:CURRENT_TIMESTAMP"`
    Status       uint8          `gorm:"default:0"`
    CreatedAt    time.Time      `gorm:"autoCreateTime"`

    SentMessages     []UserMessage `gorm:"foreignKey:SenderID"`
    ReceivedMessages []UserMessage `gorm:"foreignKey:ReceiverID"`
}
