let level1;

/**
 * Initializes level 1 by creating a new Level object with various game elements,
 * including chickens, an end boss, small chickens, clouds, background objects,
 * and collectible items like coins and bottles.
 *
 * This function populates the level with predefined quantities and types of objects,
 * setting up the game environment for the player.
 *
 * @returns {void} This function does not return a value.
 */
function initLevel() {

    
level1 = new Level( // in die Variable level 1 wird ein neues Objekt level gespeichert, dass drei Parameter bekommt
    [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken()
    ],
    [
    new Endboss()
    ],
    [
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken()
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),

      
    ],
    [
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', -719),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 6),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 7),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 7),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 7),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 7),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 8),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 8),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 8),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 8),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 9),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 9),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 9),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 9),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 10),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 719 * 10),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 719 * 10),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 719 * 10),

        new BackgroundObject('img_pollo_locco/img/5_background/layers/air.png', 719 * 11),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 719 * 11),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 719 * 11),
        new BackgroundObject('img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 719 * 11)
    ],

    [
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject(),
        new CoinCollactableObject()
    ],
    [
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject(),
        new BottleCollectableObject()
    ],      
);
}