class CoinStatusBar extends DrawableObject{
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    coins = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 85;
        this.width = 200;
        this.height = 60;
        this.setCoinAmount(0);
    }

    setCoinAmount(coins) {
        this.coins = coins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.coins == 15) {
            return 5;
        } else if(this.coins > 10) {
            return 4;
        } else if(this.coins > 6) {
            return 3;
        } else if(this.coins > 4) {
            return 2;
        }  else if(this.coins > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}