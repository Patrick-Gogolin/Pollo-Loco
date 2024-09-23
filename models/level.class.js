/**
 * Represents a game level containing various objects and enemies.
 */
class Level {
    chicken;
    endboss;
    smallChicken;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 7500; // Variable um den Charakter zu blockieren , wie lange er laufen kann

    /**
     * Creates an instance of Level.
     * @param {Chicken} chicken - The main chicken enemy.
     * @param {Endboss} endboss - The end boss of the level.
     * @param {Array<SmallChicken>} smallChicken - The small chicken enemies.
     * @param {Array<Cloud>} clouds - The clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects.
     * @param {Array<CoinCollactableObject>} coins - The collectible coins.
     * @param {Array<CoinCollactableObject>} bottles - The collectible bottles.
     */
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