// 기본 영웅 목록을 가져오는 함수
async function fetchHeroes() {
    try {
        const tankHeroes = await fetchHeroesByRole('tank');
        const damageHeroes = await fetchHeroesByRole('damage');
        const supportHeroes = await fetchHeroesByRole('support');

        displayHeroList(tankHeroes, 'tankHeroes');
        displayHeroList(damageHeroes, 'damageHeroes');
        displayHeroList(supportHeroes, 'supportHeroes');
    } catch (error) {
        console.error("영웅 목록을 가져오는 중 오류 발생:", error);
    }
}

// 역할별로 영웅을 가져오는 함수
async function fetchHeroesByRole(role) {
    const response = await fetch(`https://overfast-api.tekrop.fr/heroes?role=${role}&locale=ko-kr`);
    return response.json();
}

// 영웅 목록을 역할별 컨테이너에 표시하는 함수
function displayHeroList(heroes, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // 초기화

    heroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.className = 'hero-card';
        heroCard.innerHTML = `
            <img src="${hero.portrait}" alt="${hero.name}">
            <h3>${hero.name}</h3>
            <p>${hero.role}</p>
        `;
        heroCard.addEventListener('click', () => fetchHeroDetails(hero.key));
        container.appendChild(heroCard);
    });
}

// 선택된 영웅의 세부 정보를 가져오는 함수
async function fetchHeroDetails(heroKey) {
    try {
        const response = await fetch(`https://overfast-api.tekrop.fr/heroes/${heroKey}?locale=ko-kr`);
        const hero = await response.json();
        displayHeroDetails(hero);
    } catch (error) {
        console.error("영웅 세부 정보를 가져오는 중 오류 발생:", error);
    }
}

// 선택된 영웅의 세부 정보를 화면에 표시하는 함수
function displayHeroDetails(hero) {
    const heroContainer = document.getElementById('heroContainer');
    const heroDetails = document.getElementById('heroDetails');
    heroContainer.style.display = 'none'; // 영웅 목록 숨기기
    heroDetails.style.display = 'block'; // 세부 정보 화면 보이기

    const hitpoints = hero.hitpoints || { health: 0, armor: 0, shields: 0, total: 0 };

    heroDetails.innerHTML = `
        <button onclick="returnToHeroList()">뒤로가기</button>
        <h2>${hero.name}</h2>
        <img src="${hero.portrait}" alt="${hero.name}">
        <p>${hero.description || "설명이 없습니다."}</p>
        <p><strong>역할:</strong> ${hero.role}</p>
        <p><strong>출생지:</strong> ${hero.location || "알 수 없음"}</p>
        <p><strong>나이:</strong> ${hero.age || "알 수 없음"}</p>
        <p><strong>생일:</strong> ${hero.birthday || "알 수 없음"}</p>
        <p><strong>체력:</strong> ${hitpoints.total} (체력: ${hitpoints.health}, 방어: ${hitpoints.armor}, 실드: ${hitpoints.shields})</p>
        <h3>능력</h3>
        ${hero.abilities.map(ability => `
            <div class="ability">
                <h4>${ability.name}</h4>
                <img src="${ability.icon}" alt="${ability.name}">
                <p>${ability.description}</p>
            </div>
        `).join('')}
        <h3>이야기</h3>
        <p>${hero.story?.summary || "이야기 정보가 없습니다."}</p>
        ${hero.story?.chapters ? hero.story.chapters.map(chapter => `
            <h4>${chapter.title}</h4>
            <p>${chapter.content}</p>
            <img src="${chapter.picture}" alt="${chapter.title}">
        `).join('') : ""}
    `;
}

// 뒤로가기 버튼 기능
function returnToHeroList() {
    const heroContainer = document.getElementById('heroContainer');
    heroContainer.style.display = 'flex';
    heroContainer.style.flexDirection = 'row'; // 가로 정렬
    heroContainer.style.flexWrap = 'wrap'; // 여러 줄로 정렬 가능
    document.getElementById('heroDetails').style.display = 'none';
}

// 초기화 함수
fetchHeroes();
