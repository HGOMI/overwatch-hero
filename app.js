async function fetchData() {
    try {
        const url = "https://overfast-api.tekrop.fr/..."; // 실제 API URL
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // 데이터 확인용
        return data;
    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
}

function processHeroData(data) {
    const heroPlays = {};
    data.forEach(record => {
        const hero = record.hero;
        const plays = record.plays;
        heroPlays[hero] = (heroPlays[hero] || 0) + plays;
    });
    return heroPlays;
}

function drawChart(heroData) {
    const ctx = document.getElementById("heroChart").getContext("2d");
    const labels = Object.keys(heroData);
    const data = Object.values(heroData);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "영웅별 판수",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function initialize() {
    const rawData = await fetchData();
    const heroData = processHeroData(rawData);
    drawChart(heroData);
}

window.onload = initialize;
