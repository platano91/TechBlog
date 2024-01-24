-- Use your database
USE your_database_name;

-- Reset the data
TRUNCATE TABLE comments;
TRUNCATE TABLE posts;
TRUNCATE TABLE users;

-- Inserting users
INSERT INTO users (username, email, password)
VALUES 
('user1', 'user1@example.com', 'hashed_password1'),
('user2', 'user2@example.com', 'hashed_password2'),
('user3', 'user3@example.com', 'hashed_password3');

-- Inserting posts
INSERT INTO posts (title, content, user_id, created_at)
VALUES 
('First Post', 'This is the content of the first post', 1, NOW()),
('Second Post', 'This is the content of the second post', 2, NOW()),
('Third Post', 'This is the content of the third post', 3, NOW());

-- Inserting comments
INSERT INTO comments (content, post_id, user_id, created_at)
VALUES 
('Great post!', 1, 2, NOW()),
('Thanks for sharing', 2, 3, NOW()),
('Interesting read', 3, 1, NOW());
