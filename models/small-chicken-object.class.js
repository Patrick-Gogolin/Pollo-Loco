/**
 * Represents a small chicken enemy in the game.
 * Extends the MovableObject class, inheriting its properties and methods.
 */
class SmallChicken extends MovableObject {
    y = 380;
    height = 50;
    width= 70;
    hurt_sound = new Audio('audio/smallChickenHurt.mp3');

     /**
     * Images used for the walking animation of the small chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    ];
    
    /**
     * Images used when the small chicken is dead.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Initializes a new instance of the SmallChicken class.
     * Loads images, sets initial position and speed, and starts animations.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 350 + Math.random() * 7150;
        this.speed = 1 + Math.random() * 0.55;
        this.animate();
    }

    /**
     * Starts the animation for the small chicken.
     * Decreases the X coordinate and switches between walking and dead animations based on energy.
     */
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

    /**
     * Reduces the energy of the small chicken when it is hit by the character.
    * The energy is decreased by 100. If the energy drops below 0, it is set to 0.
    */
    hitByCharacter() {
        this.energy -= 100;
        if(this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
    * Reduces the energy of the small chicken when it is hit by a bottle.
    * The energy is decreased by 100, but only if the chicken is not in a collision cooldown state.
    * If the energy drops below 0, it is set to 0.
    * The collision cooldown prevents multiple hits in quick succession.
    * 
   * @returns {void}
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
}