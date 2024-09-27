/**
 * Represents an object in the game that can move and interact with other objects.
 * Extends from DrawableObject.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isMarkedForRemoval = false;
    hurt_sound;
    isInCollisionColldown = false;
    canBeHit = true;

    /**
     * Applies gravity to the object, adjusting its position over time.
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
                if(world.character.y >= 180) {
                    this.y = 180;
                    this.speedY = 0; 
                }
            } 
        }, 1000 / 25);
    }

      /**
     * Checks if the object is above ground.
     * @returns {boolean} True if above ground; otherwise, false.
     */
    isAboveGround(){
        if(this instanceof ThrowableObject) { // throwable Object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

     /**
     * Checks if the object is not moving.
     * @returns {boolean} True if not moving; otherwise, false.
     */
    isNotMoving(){
        return this.speed == 0;
    }

    /**
     * Gets a reduced rectangle for the character to handle collision detection.
     * @param {Object} obj - The object for which to get the rectangle.
     * @returns {Object} The reduced rectangle for collision detection.
     */

    getReducedRectForCharacter(obj) {
        let frameWidth = obj.width * 0.5; 
        let frameHeight = obj.height * 0.6;
        let offsetX = (obj.width - frameWidth) / 2;
        let offsetY = (obj.height - frameHeight);
        
        let thisRectX = obj.x + offsetX;
        let thisRectY = obj.y + offsetY;
        
        return {
            x: thisRectX,
            y: thisRectY,
            frameWidth: frameWidth,
            frameHeight: frameHeight
        };
    }

    /**
     * Gets a reduced rectangle for a thrown bottle for collision detection.
     * @param {Object} obj - The thrown bottle object.
     * @returns {Object} The reduced rectangle for the thrown bottle.
     */
    getReducedRectForThrownBottle(obj) {
        let offsetX = obj.width * 0.3;
        let offsetY = obj.height * 0.2;
        let frameWidth = obj.width * 0.4;
        let frameHeight = obj.height * 0.7;

        let thisRectX = obj.x + offsetX;
        let thisRectY = obj.y + offsetY;

        return {
            x: thisRectX,
            y: thisRectY,
            frameWidth: frameWidth,
            frameHeight: frameHeight    
        };
        
    }

    /**
     * Checks if this object is colliding with a normal chicken.
     * @param {MovableObject} mo - The chicken object to check against.
     * @returns {boolean} True if colliding; otherwise, false.
     */

    isCollidingWithNormalChicken(mo) {
        if (mo.energy > 0) {
            let characterRect = this.getReducedRectForCharacter(world.character);
    
            return characterRect.x + characterRect.frameWidth > mo.x &&
                characterRect.y + characterRect.frameHeight > mo.y &&
                characterRect.x < mo.x + mo.width &&
                characterRect.y < mo.y + mo.height;
        }
    }
    
    /**
    * Checks if the character is colliding with a small chicken.
    * 
    * @param {MovableObject} mo - The small chicken object to check against.
    * @returns {boolean} True if the character is colliding with the small chicken; otherwise, false.
    */
    isCollidingWithSmallChicken(mo) {
        if (mo.energy > 0) {
            let characterRect = this.getReducedRectForCharacter(world.character);

            let frameWidth = mo.width * 0.7;
            let frameHeight = mo.height * 0.95;
            let offsetX = (mo.width -  frameWidth) / 2;
            let offsetY = (mo.height - frameHeight);
    
            return characterRect.x + characterRect.frameWidth > mo.x + offsetX && 
            characterRect.y +  characterRect.frameHeight > mo.y + offsetY &&
            characterRect.x < mo.x + offsetX + frameWidth &&
            characterRect.y < mo.y + frameHeight ;
        }
    }

    /**
    * Checks if the character is colliding with the end boss.
    * 
    * @param {MovableObject} mo - The end boss object to check against.
    * @returns {boolean} True if the character is colliding with the end boss; otherwise, false.
    */
    isCollidingWithEndboss(mo) {
        if(mo.energy > 0) {
            let characterRect = this.getReducedRectForCharacter(world.character);

            let frameWidth = mo.width * 0.8;
            let frameHeight = mo.height * 0.75;
            let offsetX = mo.width * 0.1;
            let offsetY = mo.height * 0.2;
    
            return characterRect.x + characterRect.frameWidth > mo.x + offsetX &&
            characterRect.y +  characterRect.frameHeight > mo.y + offsetY &&
            characterRect.x < mo.x + offsetX + frameWidth &&
            characterRect.y < mo.y + frameHeight ;
        }
    }

    /**
    * Checks if the character is colliding with a coin.
    * 
    * @param {CoinCollectableObject} mo - The coin object to check against.
    * @returns {boolean} True if the character is colliding with the coin; otherwise, false.
    */
    isCollidingWithCoin(mo) {
        let characterRect = this.getReducedRectForCharacter(world.character);

        let offsetX = this.width * 0.3; 
        let offsetY = this.height * 0.3;
        let frameWidth = this.width * 0.4;
        let frameHeight = this.height * 0.4;

        return characterRect.x + characterRect.frameWidth > mo.x + offsetX &&
        characterRect.y +  characterRect.frameHeight > mo.y + offsetY &&
        characterRect.x < mo.x + offsetX + frameWidth &&
        characterRect.y < mo.y + frameHeight ;
    }

    /**
    * Checks if the character is colliding with a collectible bottle.
    * 
    * @param {CollectableBottle} mo - The collectible bottle object to check against.
    * @returns {boolean} True if the character is colliding with the bottle; otherwise, false.
    */
    isCollidingWithCollectableBottle(mo) {
        let characterRect = this.getReducedRectForCharacter(world.character);
         
        let offsetX = this.width * 0.3; // Beispielhaft 20% kleiner
        let offsetY = this.height * 0.2;
        let frameWidth = this.width * 0.4; // 60% der ursprünglichen Breite
        let frameHeight = this.height * 0.7; // 60% der ursprünglichen Höhe

        return characterRect.x + characterRect.frameWidth > mo.x + offsetX &&
        characterRect.y +  characterRect.frameHeight > mo.y + offsetY &&
        characterRect.x < mo.x + offsetX + frameWidth &&
        characterRect.y < mo.y + frameHeight ;
    }

    /**
    * Checks if a thrown bottle is colliding with a movable object.
    *
    * @param {MovableObject} mo - The movable object to check against.
    * @param {ThrowableObject} obj - The thrown bottle object.
    * @returns {boolean} True if the thrown bottle is colliding with the movable object; otherwise, false.
    */
    isCollidingWithThrownBottle(mo, obj) {
        let thrownBottleRect = this.getReducedRectForThrownBottle(obj)

        return  thrownBottleRect.x + thrownBottleRect.frameWidth > mo.x &&
        thrownBottleRect.y +  thrownBottleRect.frameHeight > mo.y &&
        thrownBottleRect.x < mo.x + mo.width &&
        thrownBottleRect.y < mo.y + mo.height;
    }

    /**
    * Checks if a thrown bottle is colliding with the end boss.
    *
    * @param {Endboss} mo - The end boss object to check against.
    * @param {ThrowableObject} obj - The thrown bottle object.
    * @returns {boolean} True if the thrown bottle is colliding with the end boss; otherwise, false.
    */
    thrownBottleIsCollidingWithEndboss(mo, obj) {
        let thrownBottleRect = this.getReducedRectForThrownBottle(obj)

        let frameWidth = mo.width * 0.8;
        let frameHeight = mo.height * 0.75;
        let offsetX = mo.width * 0.1;
        let offsetY = mo.height * 0.2;

        return thrownBottleRect.x + thrownBottleRect.frameWidth > mo.x + offsetX &&
        thrownBottleRect.y +  thrownBottleRect.frameHeight > mo.y + offsetY &&
        thrownBottleRect.x < mo.x + offsetX + frameWidth &&
        thrownBottleRect.y < mo.y + frameHeight ;
    }

    /**
    * Handles the logic when the object is hit by a chicken.
    * Decreases the energy by 5 if the object can be hit.
    * Sets a cooldown period during which the object cannot be hit again.
    * Updates the last hit timestamp and ensures energy does not drop below zero.
    */
    hitByChicken() {
        if(this.canBeHit) {
            this.energy -= 5;
            this.canBeHit = false;
            setTimeout(() => {
                this.canBeHit = true;
            }, 100);
            if(this.energy < 0) {
                this.energy = 0;
            }
            else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
    * Reduces the energy of the object when hit by the endboss.
    * The energy is decreased by 50 points. If the resulting energy
    * is less than 0, it is set to 0. The timestamp of the last hit 
    * is recorded for later use.
    */
    hitByEndboss() {
        this.energy -= 50;
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Reduces the energy of the object when hit by a small chicken.
    * The energy is decreased by 2 points. The object can only be hit 
    * once every 100 milliseconds. If the resulting energy is less than 
    * 0, it is set to 0. The timestamp of the last hit is recorded for later use.
    */
    hitBySmallChicken(){
        if(this.canBeHit) {
        this.energy -= 2;
        this.canBeHit = false;
        setTimeout(() => {
            this.canBeHit = true;
        }, 100);
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
        }
    }

    /**
    * Checks if the object is currently in a hurt state.
    * A hurt state is defined as being hit within the last 0.75 seconds.
    * 
    * @returns {boolean} True if the object is still hurt, false otherwise.
    */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in Ms
        timePassed = timePassed / 1000; // Difference in S
        return timePassed < 0.75;
    }

    /**
    * Checks if the object is dead.
    * An object is considered dead if its energy is equal to zero.
    * 
    * @returns {boolean} True if the object is dead, false otherwise.
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Increases the x-coordinate of the object by its speed.
    * This method moves the object to the right in the game world.
    */
    increaseXCoordinate() {
        this.x += this.speed;
    }

    /**
    * Decreases the x-coordinate of the object by its speed.
    * This method moves the object to the left in the game world.
    * If the object's energy is zero, the position remains unchanged.
    */
    decreaseXCoordinate(){
        if(this.energy === 0) {
            this.x -= 0;
        }
        else {
            this.x -= this.speed;
        }
    }

    /**
    * Sets the vertical speed (speedY) of the object to 30.
    * This method is typically used to make the object jump or move upwards.
    */
    increaseYCoordinate(){
        this.speedY = 30;
    }

    /**
    * Plays the hurt sound effect.
    * Pauses the current sound if it's playing, resets the playback time to the beginning,
    * and then plays the hurt sound from the start.
    */
    screams() {
        let savedSoundEffectState = localStorage.getItem('soundEffectState');
        if(savedSoundEffectState === "on") {
            this.hurt_sound.pause();
            this.hurt_sound.currentTime = 0;
            this.hurt_sound.play();
        }
    }
}