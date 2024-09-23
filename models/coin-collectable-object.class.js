/**
 * Represents a collectible coin in the game.
 * @extends DrawableObject
 */
class CoinCollactableObject extends DrawableObject {
    
    /**
     * The images used for the coin animation.
     * @type {string[]}
     */
    COIN_IMAGES = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png'
    ]

    /**
     * Creates a new CoinCollectableObject instance.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.x = 350 + Math.random() * 6500;
        this.y = 40 + Math.random() * 270;
        this.loadImages(this.COIN_IMAGES);
        this.animateCoins();
    }

    /**
     * Animates the coin by cycling through its images.
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES)
        }, 250);
    }
}