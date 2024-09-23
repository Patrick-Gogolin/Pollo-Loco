/**
 * Represents a chicken enemy in the game.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    
    y = 360;
    height = 60;
    width = 80;
    hurt_sound = new Audio('audio/chickenHurt.mp3');

    /**
     * Array of images representing the chicken's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ];
    
    /**
     * Array of images representing the chicken's dead state.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    /**
     * Creates a new Chicken instance.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        sounds.push(this.hurt_sound);
        this.spawnRandomlyOnMap();
        this.defineSpeedRandomly();
        this.animate();
    }

     /**
     * Animates the chicken's movement and state.
     */
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

    /**
     * Handles the logic when the chicken is hit by the character.
     */
    hitByCharacter() {
        this.energy -= 50;
        if(this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * Handles the logic when the chicken is hit by a bottle.
     */
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

     /**
     * Spawns the chicken at a random position on the map.
     */
    spawnRandomlyOnMap(){
        this.x = 350 + Math.random() * 7150;
    }

    /**
     * Defines the chicken's speed randomly.
     */
    defineSpeedRandomly(){
        this.speed = 0.25 + Math.random() * 1;
    }

}