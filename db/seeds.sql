-- Use your database
USE techblog_db;

-- create tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    postId INT NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Inserting users
INSERT INTO users (username, email, password)
VALUES 
('user1', 'user1@example.com', 'hashed_password1'),
('user2', 'user2@example.com', 'hashed_password2'),
('user3', 'user3@example.com', 'hashed_password3');

-- Inserting posts
INSERT INTO posts (title, content, userId)
VALUES 
('First Post', 'This is the content of the first post', 1),
('Second Post', 'This is the content of the second post', 2),
('Third Post', 'This is the content of the third post', 3);

-- Inserting comments
INSERT INTO comments (content, postId, userId)
VALUES 
('Great post!', 1, 2),
('Thanks for sharing', 2, 3),
('Interesting read', 3, 1);
