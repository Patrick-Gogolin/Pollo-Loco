/**
 * The World class manages the game environment, including characters, levels, and game objects. It handles rendering, game mechanics, collisions, and interactions between the character and objects in the world.
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleStatusBar = new BottleStatusBar();
    healthStatusBar = new HealthStatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObjects = [];
    thrownObjects = [];
    main_music = new Audio('audio/mainMusic.mp3');
    lastThrowTime = 0;
    throwCooldown = 1000;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.main_music.loop = true;
        this.main_music.play();
    }

    /**
     * Sets the world property of the character to this instance of World.
     */

    setWorld() {
        this.character.world = this;
    }

    /**
     * Main game loop, executed at a fixed interval. Handles collisions, status checks, and updates.
     */
    run() {
        setInterval(() => {
            this.handleCharacterCollisionsWithSmallChicken(this.level.smallChicken);
            this.handleCharacterCollisionsWithChicken(this.level.chicken)
            this.checkCollisionEndboss();
            this.checkCollisionWithCoins();
            this.checkCollisionWithBottles();
            this.checkIfNormalChickenOrSmallChickenIsDead();
            this.checkCollisionsOfEnemiesWithThrowableObjects();
            this.throwableObjectHitsGround();
            this.checkThrowObjects();
            this.stopMainMusicIfCharacterIsDeadOrWinGame();
        }, 40);
    }

    /**
     * Stops the background music if the character dies or if the endboss is defeated.
     */
    stopMainMusicIfCharacterIsDeadOrWinGame() {
        if (this.character.energy <= 0 || this.endbossDead()) {
            this.main_music.pause();
            this.main_music.currentTime = 0;
        }
    }

     /**
     * Checks if all endbosses in the level are dead.
     * @returns {boolean} - True if all endbosses are dead, false otherwise.
     */
    endbossDead() {
        for (let i = 0; i < this.level.endboss.length; i++) {
            const endboss = this.level.endboss[i];
            if (endboss.energy > 0) {
                return false;
            }
        }
        return true;
    }

     /**
     * Handles throwing objects, checking for cooldown and updating the throwable object list.
     */
    checkThrowObjects() {
        const now = new Date().getTime();
        if (this.keyboard.D && this.throwableObjects.length > 0 && now - this.lastThrowTime >= this.throwCooldown) {
            let bottleFromInventory = this.throwableObjects[this.throwableObjects.length - 1];
            this.character.bottles -= 1;
            this.updateBottleStatusBar();
            this.thrownObjects.push(bottleFromInventory);
            this.throwableObjects.splice(this.throwableObjects.length - 1, 1);

            if (!bottleFromInventory.isThrown) {
                bottleFromInventory.throw(this.character.x + 100, this.character.y + 100);
                bottleFromInventory.isThrown = true;
            }

            this.lastThrowTime = now;
            this.keyboard.D = false;
        }
    }

    /**
     * Checks if thrown objects (bottles) hit the ground and handles their removal.
     */
    throwableObjectHitsGround() {
        let groundLevel = 380;
        this.thrownObjects.forEach(bottle => {
            if (bottle.y > groundLevel) {
                bottle.broken = true;
                if (soundeffectsOn) {
                    bottle.break_sound.play();
                }
                this.removeThrowableBottleFromWorld(bottle);
            }
        });
    }

     /**
     * Checks if thrown objects collide with enemies and handles their removal.
     */
    checkCollisionsOfEnemiesWithThrowableObjects() {
        this.thrownObjects.forEach(bottle => {
            this.handleCollisionOfEnemiesWithThrowableObject(bottle, this.level.chicken);
            this.handleCollisionOfEnemiesWithThrowableObject(bottle, this.level.smallChicken);
            this.handleCollisionOfEndbossWithThrowableObject(bottle, this.level.endboss);
        });
    }

    /**
     * Handles collisions between a thrown bottle and an array of enemies. If a collision is detected, the enemy is hit by the bottle and screams, the bottle is marked as broken and then removed from the world. 
     *
     * @param {ThrowableObject} bottle - The thrown bottle object.
     * @param {Array.<Enemy>} enemiesArray - The array of enemies to check for collisions.
     */
    handleCollisionOfEnemiesWithThrowableObject(bottle, enemiesArray) {
        enemiesArray.forEach(enemy => {
            if (enemy.isCollidingWithThrownBottle(enemy, bottle)) {
                enemy.hitByBottle();
                bottle.broken = true;
                if (soundeffectsOn) {
                    bottle.break_sound.play();
                }
                enemy.screams();
                this.removeThrowableBottleFromWorld(bottle);
            }
        });
    }

    /**
    * Handles collisions between a thrown bottle and an array of endboss enemies. If a collision is detected, the endboss is hit by the bottle and screams, the bottle is marked as broken and then removed from the world
    *
    * @param {ThrowableObject} bottle - The thrown bottle object.
    * @param {Array.<Endboss>} endbossArray - The array of endboss enemies to check for collisions.
    */
    handleCollisionOfEndbossWithThrowableObject(bottle, endbossArray) {
        endbossArray.forEach(endboss => {
            if (endboss.thrownBottleIsCollidingWithEndboss(endboss, bottle)) {
                endboss.hitByBottle();
                bottle.broken = true;
                if (soundeffectsOn) {
                    bottle.break_sound.play();
                }
                this.removeThrowableBottleFromWorld(bottle);
            }
        });
    }

    /**
    * Removes a thrown bottle from the game world after a short delay, ensuring it is not removed more than once.
    *
    * @param {ThrowableObject} bottle - The thrown bottle object to be removed from the game world.
    */
    removeThrowableBottleFromWorld(bottle) {
        if (!bottle.isMarkedForRemoval) {
            bottle.isMarkedForRemoval = true
            setTimeout(() => {
                let index = this.thrownObjects.indexOf(bottle)
                this.thrownObjects.splice(index, 1);
            }, 100);
        }
    }

    /**
    * Removes dead enemies from the game world after a specified delay. Once an enemy's energy is depleted and it is marked for removal, the enemy is removed from the `enemiesArray` after the delay.
    *
    * @param {Array<Enemy>} enemiesArray - Array of enemy objects to check and remove from.
    * @param {number} removalDelay - The delay in milliseconds before the dead enemy is removed from the array.
    */
    removeDeadEnemiesFromWorld(enemiesArray, removalDelay) {
        enemiesArray.forEach((enemy, index) => {
            if (enemy.energy === 0 && !enemy.isMarkedForRemoval) {
                enemy.isMarkedForRemoval = true;
                setTimeout(() => {
                    enemiesArray.splice(index, 1);
                }, removalDelay);
            }
        });
    }

    /**
    * Checks if any normal chickens or small chickens are dead and removes them from the game world.
    */
    checkIfNormalChickenOrSmallChickenIsDead() {
        this.removeDeadEnemiesFromWorld(this.level.chicken, 750);
        this.removeDeadEnemiesFromWorld(this.level.smallChicken, 750);
    }

    /**
    * Handles collisions between the character and small chickens.
    *
    * @param {Array} enemiesArray - An array of small chicken enemies to check for collisions.
    */
    handleCharacterCollisionsWithSmallChicken(enemiesArray) {
        enemiesArray.forEach(enemy => {
            if (!this.character.isCollidingWithSmallChicken(enemy)) return;
    
            if (this.character.characterIsFalling() && enemy.energy > 0) {
                this.character.characterJump();
                enemy.hitByCharacter();
                enemy.screams();
            } else {
                this.character.hitBySmallChicken();
                this.updateHealthStatusBar();
            }
        });
    }

    /**
    * Handles collisions between the character and normal chicken enemies.
    * 
    * @param {Array} enemiesArray - An array of normal chicken enemies to check for collisions.
    */
    handleCharacterCollisionsWithChicken(enemiesArray) {
        enemiesArray.forEach(enemy => {
            if (!this.character.isCollidingWithNormalChicken(enemy)) return;
    
            if (this.character.characterIsFalling() && enemy.energy > 0) {
                this.character.characterJump();
                enemy.hitByCharacter();
                enemy.screams();
            } else {
                this.character.hitByChicken();
                this.updateHealthStatusBar();
            }
        });
    }

    /**
    * Checks for collisions between the character and the endboss enemies.
    * If the character collides with an endboss, the character takes damage from the endboss, and the health status bar is updated.
    */
    checkCollisionEndboss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.isCollidingWithEndboss(endboss)) {
                this.character.hitByEndboss();
                this.updateHealthStatusBar();
            }
        })
    }

    /**
    * Checks for collisions between the character and collectible items. If a collision is detected, the item is collected and the relevant status bar is updated.
    *
    * @param {Array} itemsArray - The array of collectible items to check for collisions.
    * @param {function} characterIsCollidingWithItem - A function that determines if the character is colliding with an item.
    * @param {function} collectItem - A function that defines the action taken to collect the item.
    * @param {function} updateStatusbar - A function that updates the status bar after an item is collected.
    */
    checkCollisionWithCollectableObject(itemsArray, characterIsCollidingWithItem, collectItem, updateStatusbar) {
        itemsArray.forEach(item => {
            if (characterIsCollidingWithItem.call(this.character, item)) {
                collectItem.call(this.character);
                updateStatusbar.call(this);
            }
        });
    }

    /**
    * Checks for collisions between the character and collectible bottles. If a collision is detected, the bottle is stored in the throwableObjects array and removed from the level.
    */
    storeBottleForThrowing() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isCollidingWithCollectableBottle(bottle)) {
                let bottleToStore = new ThrowableObject();
                this.throwableObjects.push(bottleToStore);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    /**
    * Checks for collisions between the character and collectible coins. If a collision is detected, the coin is removed from the level, effectively adding it to the character's inventory.
    */
    storeCoinInInventory() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isCollidingWithCoin(coin)) {
                this.level.coins.splice(index, 1);
            }
        })
    }

    /**
    * Checks for collisions between the character and collectible coins. If a collision is detected, the coin is collected and the coin status bar is updated.
    */
    checkCollisionWithCoins() {
        this.checkCollisionWithCollectableObject(this.level.coins, this.character.isCollidingWithCoin, this.character.collectCoin, this.updateCoinStatusBar);
        this.storeCoinInInventory();
    }

    /**
    * If a collision is detected, the bottle is collected and the bottle status bar is updated.
    */
    checkCollisionWithBottles() {
        this.checkCollisionWithCollectableObject(this.level.bottles, this.character.isCollidingWithCollectableBottle, this.character.collectBottle, this.updateBottleStatusBar);
        this.storeBottleForThrowing();
    }

    /**
    * Updates the health status bar to reflect the current energy level of the character. Sets the health status bar's percentage based on the character's energy.
    */
    updateHealthStatusBar() {
        this.healthStatusBar.setPercentage(this.character.energy);
    }

    /**
    * Updates the coin status bar to reflect the current number of coins collected by the character. Sets the coin status bar's amount based on the character's coins.
    */
    updateCoinStatusBar() {
        this.coinStatusBar.setCoinAmount(this.character.coins);
    }

    /**
    * Updates the bottle status bar to reflect the current number of bottles collected by the character. Sets the bottle status bar's amount based on the character's bottles.
    */
    updateBottleStatusBar() {
        this.bottleStatusBar.setBottleAmount(this.character.bottles);
    }

    /**
    * Clears the canvas and redraws the game elements.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();
        this.drawStatusBars();
        this.drawMovableObjects();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * Draws the background of the game scene by translating the canvas context according to the camera's position.
    */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    * Draws the game's status bars on the canvas. This includes the bottle statusbar, health status bar, and coin status bar.
    */
    drawStatusBars() {
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
    }

    /**
    * Draws all movable objects in the game on the canvas. This includes the main character, various enemy types (chickens, endboss, small chickens), collectable items (coins and bottles), and thrown objects. 
    * The function translates the context to account for camera movement.
    */
    drawMovableObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.chicken);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.thrownObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    * Adds an array of objects to the map by iterating through each object and calling the `addToMap` method on it.
    *
    * @param {Array} objects - An array of objects to be added to the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * Adds a single object to the map. If the object is facing the other direction, it flips the image before drawing it and then flips it back after drawing.
    *
    * @param {Object} mo - The object to be added to the map, which should have properties `otherDirection` and a `draw` method.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips the specified object horizontally in the canvas context.
    *
    * @param {Object} mo - The object to be flipped, which should have a `width` property.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the canvas state and flips the specified object back to its original orientation.
    *
    * @param {Object} mo - The object to be flipped back, which should have an `x` property representing its position.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}