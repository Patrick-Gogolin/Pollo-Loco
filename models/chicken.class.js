class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    hurt_sound = new Audio('audio/chickenHurt.mp3');

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.spawnRandomlyOnMap();
        this.defineSpeedRandomly();

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
            else{
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }


    hitByCharacter() {
        this.energy -= 50;
        console.log(this.energy);
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

    spawnRandomlyOnMap(){
        this.x = 350 + Math.random() * 6500;
    }

    defineSpeedRandomly(){
        this.speed = 0.15 + Math.random() * 0.35;
    }

}