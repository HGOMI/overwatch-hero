document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 서버로 로그인 요청 보내기
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
        // 로그인 성공 시 카테고리 화면 표시
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('categorySection').style.display = 'block';
    } else {
        alert('로그인 실패: ' + result.message);
    }
});

document.getElementById('showRegister').addEventListener('click', () => {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('showRegister').style.display = 'none';
    document.getElementById('showLogin').style.display = 'inline-block';
});

document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('showRegister').style.display = 'inline-block';
    document.getElementById('showLogin').style.display = 'none';
});

// 회원가입 처리
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    const response = await fetch('https://overwatch-hero-api.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
        alert('회원가입 성공! 로그인 해주세요.');
        document.getElementById('showLogin').click();
    } else {
        alert('회원가입 실패: ' + result.message);
    }
});


// 카테고리 이동 처리
document.getElementById('heroes').addEventListener('click', () => {
    window.location.href = 'heroes.html'; // 영웅 정보 페이지로 이동
});

document.getElementById('community').addEventListener('click', () => {
    window.location.href = 'community.html'; // 커뮤니티 페이지로 이동
});

document.getElementById('patchNotes').addEventListener('click', () => {
    window.location.href = 'patch_notes.html'; // 패치 노트 페이지로 이동
});
