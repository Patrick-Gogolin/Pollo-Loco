class SmallChicken extends MovableObject {
    y = 380;
    height = 50;
    width= 70;
    hurt_sound = new Audio('audio/smallChickenHurt.mp3');

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    ];
    
    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        sounds.push(this.hurt_sound);

        this.x = 350 + Math.random() * 6500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate(){
        setInterval(() => {
            this.decreaseXCoordinate();
        }, 1000 / 60);

        setInterval(() => {
            if(this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING); 
            }
            else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }

    hitByCharacter() {
        this.energy -= 100;
        if(this.energy < 0) {
            this.energy = 0;
        }
    }

    hitByBottle(){
        if(!this.isInCollisionCooldown) {
            this.isInCollisionCooldown = true;
            this.energy -= 100;
            if (this.energy < 0) {
                this.energy = 0;
            }
        }
        setTimeout(() => {
            this.isInCollisionCooldown = false;
        }, 100);
    }
}