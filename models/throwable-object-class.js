class ThrowableObject extends MovableObject {

    isThrown = false;
    broken = false;
    break_sound = new Audio('audio/bottleBroken.mp3');

    THROWN_BOTTLE_IMAGES = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    THROWN_BOTTLE_IMAGES_SPLASH = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor() {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.THROWN_BOTTLE_IMAGES);
        this.loadImages(this.THROWN_BOTTLE_IMAGES_SPLASH);
    }

    applyGravityForBottle() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
            } 
        }, 1000 / 25);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.speedY = 30;
      
        this.updateBottleAnimation();
        this.applyBottlePhysics();
    }

    updateBottleAnimation() {
        setInterval(() => {
            if(!this.broken) {
                this.playAnimation(this.THROWN_BOTTLE_IMAGES);
            }
            else {
                this.playAnimation(this.THROWN_BOTTLE_IMAGES_SPLASH);
                this.speedY = 0;
                
            }
        }, 1000 / 60);
    }

    applyBottlePhysics() {
        this.applyGravityForBottle();
        let movementInterval = setInterval(() => {
            if (!this.broken) {  
            this.x += 15;
            } 
            else {
                clearInterval(movementInterval);
            }
    }, 1000 / 25);
    }
}