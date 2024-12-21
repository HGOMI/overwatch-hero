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

            // 테이블 생성 추가
            const createTable = `
                CREATE TABLE IF NOT EXISTS posts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            db.query(createTable, (err) => {
                if (err) throw err;
                console.log('Table posts is ready');
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

app.listen(3000, () => {
    console.log('서버가 3000번 포트에서 실행 중');
});
