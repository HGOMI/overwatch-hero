CREATE DATABASE overwatch_portal;
USE overwatch_portal;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 샘플 데이터 추가
INSERT INTO users (username, password) VALUES ('admin', '1234');
