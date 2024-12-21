const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // 비밀번호 변경 필요
    database: 'community_db'
});

db.connect(err => {
    if (err) {
        console.error('DB 연결 실패:', err);
    } else {
        console.log('DB 연결 성공');
    }
});

// 게시글 가져오기
app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) throw err;
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
