class CoinCollactableObject extends DrawableObject {
    
    COIN_IMAGES = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.x = 350 + Math.random() * 6500;
        this.y = 40 + Math.random() * 270;
        this.loadImages(this.COIN_IMAGES);
        this.animateCoins();
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES)
        }, 250);
    }
}