CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_number VARCHAR(20) UNIQUE,
    password_hash TEXT NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 0, -- 0 = offline, 1 = online
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);