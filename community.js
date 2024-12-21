// DOM 요소 가져오기
const postForm = document.getElementById('postForm');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const postsList = document.getElementById('posts');

// 서버에서 데이터 불러오기
async function loadPosts() {
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();

    posts.forEach(post => addPostToList(post.title, post.content));
}

// 게시글 추가 함수
function addPostToList(title, content) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${title}</strong><p>${content}</p>`;
    postsList.appendChild(li);
}

// 폼 제출 처리
postForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // 기본 동작 막기

    const title = postTitle.value.trim();
    const content = postContent.value.trim();

    if (title && content) {
        // DB에 데이터 저장 요청
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });

        const result = await response.json();
        if (result.success) {
            addPostToList(title, content); // 목록에 추가
            postTitle.value = '';
            postContent.value = '';
        } else {
            alert('게시글 저장 실패');
        }
    } else {
        alert('제목과 내용을 입력해주세요.');
    }
});

// 페이지 로드 시 DB 데이터 불러오기
document.addEventListener('DOMContentLoaded', loadPosts);
