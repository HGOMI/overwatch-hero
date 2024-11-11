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
