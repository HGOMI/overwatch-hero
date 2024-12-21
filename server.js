const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// DB 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // 본인의 비밀번호로 변경
    database: 'overwatch_portal',
});

// 로그인 처리 API
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: '잘못된 아이디 또는 비밀번호입니다.' });
        }
    });
});

// 서버 실행
app.listen(3000, () => {
    console.log('서버가 3000 포트에서 실행 중...');
});
