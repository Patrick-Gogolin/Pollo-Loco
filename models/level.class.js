class Level {
    chicken;
    endboss;
    smallChicken;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 7500; // Variable um den Charakter zu blockieren , wie lange er laufen kann

    constructor(chicken, endboss, smallChicken, clouds, backgroundObjects, coins, bottles) {
        this.chicken = chicken;
        this.endboss = endboss;
        this.smallChicken = smallChicken;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}