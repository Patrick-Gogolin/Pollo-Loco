/**
 * Represents a cloud in the game background.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 150;
    speed = 0.5;

    /**
     * Creates a new Cloud instance.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 7500;
        this.animate();
    }

     /**
     * Animates the cloud's movement across the screen.
     */
    animate() {
        setInterval(() => {
            this.decreaseXCoordinate(); 
        }, 50);
    }
}