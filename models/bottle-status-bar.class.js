/**
 * Represents a status bar for bottles in the game, extending the DrawableObject class.
 *
 * @class
 * @extends DrawableObject
 */
class BottleStatusBar extends DrawableObject {

    /**
     * Array of image paths for the bottle status bar representations.
     * @type {string[]}
     */
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

     /**
     * The current number of bottles.
     * @type {number}
     */
    bottles = 0;

    /**
     * Creates an instance of BottleStatusBar.
     * Initializes the status bar's images and position.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setBottleAmount(0);
    }

    /**
    * Sets the amount of bottles displayed in the status bar.
    *
    * @param {number} bottles - The number of bottles to display.Should be a value between 0 and 10.
    */
    setBottleAmount(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current number of bottles.
     *
     * @returns {number} The index of the image to be used.
     */
    resolveImageIndex() {
        if(this.bottles == 10) {
            return 5;
        } else if(this.bottles > 7) {
            return 4;
        } else if(this.bottles > 4) {
            return 3;
        } else if(this.bottles > 2) {
            return 2;
        }  else if(this.bottles > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}