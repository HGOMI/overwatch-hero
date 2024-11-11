async function initialize() {
    const rawData = await fetchData();
    const heroData = processHeroData(rawData);
    drawChart(heroData);
}

window.onload = initialize;
