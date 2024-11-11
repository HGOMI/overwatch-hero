const url = "https://overfast-api.tekrop.fr/stats/players?region=asia"; // 예시 URL

async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data; // JSON 형식의 아시아 서버 플레이 횟수 데이터
    } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
    }
}
