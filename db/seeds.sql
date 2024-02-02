-- Use your database
USE techblog_db;

-- create tables
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Post(id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Inserting users
INSERT INTO User (username, email, password)
VALUES 
('user1', 'user1@example.com', 'hashed_password1'),
('user2', 'user2@example.com', 'hashed_password2'),
('user3', 'user3@example.com', 'hashed_password3');

-- Inserting posts
INSERT INTO Post (title, content, user_id, created_at)
VALUES 
('First Post', 'This is the content of the first post', 1, NOW()),
('Second Post', 'This is the content of the second post', 2, NOW()),
('Third Post', 'This is the content of the third post', 3, NOW());

-- Inserting comments
INSERT INTO Comment (content, post_id, user_id, created_at)
VALUES 
('Great post!', 1, 2, NOW()),
('Thanks for sharing', 2, 3, NOW()),
('Interesting read', 3, 1, NOW());
