async function fetchHeroes() {
    try {
        const response = await fetch('https://overfast-api.tekrop.fr/heroes'); // API URL 확인 필요
        const heroes = await response.json();
        displayHeroList(heroes);
    } catch (error) {
        console.error("영웅 데이터를 가져오는 중 오류 발생:", error);
    }
}

function displayHeroList(heroes) {
    const heroList = document.getElementById('heroList');
    heroList.innerHTML = ''; // 초기화

    heroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.className = 'hero-card';
        heroCard.innerHTML = `
            <img src="${hero.portrait}" alt="${hero.name}">
            <h3>${hero.name}</h3>
            <p>${hero.role}</p>
        `;
        heroCard.addEventListener('click', () => displayHeroDetails(hero));
        heroList.appendChild(heroCard);
    });
}

function displayHeroDetails(hero) {
    const heroDetails = document.getElementById('heroDetails');
    heroDetails.innerHTML = `
        <h2>${hero.name}</h2>
        <img src="${hero.portrait}" alt="${hero.name}">
        <p>${hero.description}</p>
        <p><strong>역할:</strong> ${hero.role}</p>
        <p><strong>출생지:</strong> ${hero.location}</p>
        <p><strong>나이:</strong> ${hero.age}</p>
        <p><strong>생일:</strong> ${hero.birthday}</p>
        <p><strong>체력:</strong> ${hero.hitpoints.total} (체력: ${hero.hitpoints.health}, 방어: ${hero.hitpoints.armor}, 실드: ${hero.hitpoints.shields})</p>
        <h3>능력</h3>
        ${hero.abilities.map(ability => `
            <div class="ability">
                <h4>${ability.name}</h4>
                <img src="${ability.icon}" alt="${ability.name}">
                <p>${ability.description}</p>
            </div>
        `).join('')}
        <h3>이야기</h3>
        <p>${hero.story.summary}</p>
        ${hero.story.chapters.map(chapter => `
            <h4>${chapter.title}</h4>
            <p>${chapter.content}</p>
            <img src="${chapter.picture}" alt="${chapter.title}">
        `).join('')}
    `;
}

fetchHeroes();
