/**
 * Represents a collectible bottle object in the game, extending the DrawableObject class.
 *
 * @class
 * @extends DrawableObject
 */
class BottleCollectableObject extends DrawableObject {

    /** 
     * Array of image paths for the bottle animations.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    /**
     * Creates an instance of BottleCollectableObject.
     * Initializes the object's position and loads the initial image.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 350 + Math.random() * 6500;
        this.y = 340;
        this.height = 80;
        this.width = 60;
        this.loadImages(this.BOTTLE_IMAGES);
        this.animateBottles();
    }
    
     /**
     * Animates the bottle by cycling through the bottle images at set intervals.
     * @returns {void} This function does not return a value.
     */
    animateBottles() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGES)
        }, 250);
    }
}