class BottleCollectableObject extends DrawableObject {

    BOTTLE_IMAGES = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 350 + Math.random() * 6500;
        this.y = 340;
        this.height = 80;
        this.width = 60;
        this.loadImages(this.BOTTLE_IMAGES);
        this.animateBottles();
    }
    
    animateBottles() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGES)
        }, 250);
    }
}