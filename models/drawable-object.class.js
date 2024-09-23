/**
 * Represents a drawable object that can be rendered on a canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    currentImageDead = 0;
    currentImageHurt = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image.
     */
     loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

     /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

     /**
     * Plays the animation by cycling through the given images.
     * @param {string[]} images - An array of image paths for animation.
     */
    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the animation for the dead state.
     * @param {string[]} images - An array of image paths for dead state.
     */
    playAnimationWhenDead(images) { 
        if (this.currentImageDead < images.length) {
            let i = this.currentImageDead % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImageDead++;
        }
    }

    /**
     * Draws the object on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}