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

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration; 
                if(world.character.y >= 180) { 
                    this.speedY = 0; 
                }
            } 
        }, 1000 / 25);
    }

    isAboveGround(){
        if(this instanceof ThrowableObject) { // throwable Object should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    isNotMoving(){
        return this.speed == 0;
    }

    getReducedRectForCharacter(obj) {
        let frameWidth = obj.width * 0.8; 
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

    isCollidingWithEnemies(mo) {
        if (mo.energy > 0) {
            let characterRect = this.getReducedRectForCharacter(world.character);
    
            return characterRect.x + characterRect.frameWidth > mo.x &&
             characterRect.y +  characterRect.frameHeight > mo.y &&
             characterRect.x < mo.x + mo.width &&
             characterRect.y < mo.y + mo.height;
        }
    }

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

    isCollidingWithThrownBottle(mo, obj) {
        let thrownBottleRect = this.getReducedRectForThrownBottle(obj)

        return  thrownBottleRect.x + thrownBottleRect.frameWidth > mo.x &&
        thrownBottleRect.y +  thrownBottleRect.frameHeight > mo.y &&
        thrownBottleRect.x < mo.x + mo.width &&
        thrownBottleRect.y < mo.y + mo.height;
    }

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

    hitByChicken() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    hitByEndboss() {
        this.energy -= 50;
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    hitBySmallChicken(){
        this.energy -= 2;
        if(this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in Ms
        timePassed = timePassed / 1000; // Difference in S
        return timePassed < 0.75;
    }

    isDead() {
        return this.energy == 0;
    }

    increaseXCoordinate() {
        this.x += this.speed;
    }

    decreaseXCoordinate(){
        if(this.energy === 0) {
            this.x -= 0;
        }
        else {
            this.x -= this.speed;
        }
    }

    increaseYCoordinate(){
        this.speedY = 30;
    }

    screams() {
        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;
        this.hurt_sound.play();
    }
}