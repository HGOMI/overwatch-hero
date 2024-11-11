function processHeroData(data) {
    const heroPlays = {};
    data.forEach((record) => {
        const hero = record.hero;
        const plays = record.plays;
        if (heroPlays[hero]) {
            heroPlays[hero] += plays;
        } else {
            heroPlays[hero] = plays;
        }
    });
    return heroPlays;
}
