const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: '119.206.138.30',
    user: 'adminUser',
    password: '001520'
});

// 데이터베이스 생성 및 설정
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');

    db.query('CREATE DATABASE IF NOT EXISTS community_db', (err, result) => {
        if (err) throw err;
        console.log('Database created or already exists');

        // 데이터베이스 전환
        db.changeUser({ database: 'community_db' }, (err) => {
            if (err) throw err;
            console.log('Switched to community_db');

            // 게시글 테이블 생성
            const createPostsTable = `
                CREATE TABLE IF NOT EXISTS posts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            db.query(createPostsTable, (err) => {
                if (err) throw err;
                console.log('Table posts is ready');
            });

            // 사용자 테이블 생성
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            db.query(createUsersTable, (err) => {
                if (err) throw err;
                console.log('Table users is ready');
            });
        });
    });
});

// 게시글 가져오기
app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json(results);
    });
});

// 게시글 추가
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    db.query(query, [title, content], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// 회원가입 처리
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: '아이디와 비밀번호를 입력하세요.' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ success: false, message: '이미 존재하는 아이디입니다.' });
            }
            return res.status(500).json({ success: false, message: '서버 오류' });
        }
        res.json({ success: true });
    });
});

// 로그인 처리
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: '아이디와 비밀번호를 입력하세요.' });
    }

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: '서버 오류' });
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }
    });
});

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중');
});
