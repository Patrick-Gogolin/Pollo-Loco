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
    endScreen = new Endscreen();
    winningScreen = new Winningscreen();
    throwableObjects = [];
    thrownObjects = [];
    main_music = new Audio('audio/mainMusic.mp3');

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.main_music.loop = true;
        this.main_music.play();
    }

    setWorld(){
        this.character.world = this;
    }

    run() {
        setInterval(() => {

         this.processCollisionWithChicken();
         this.processCollisionWithSmallChicken();
         this.checkCollisionEndboss();
         this.checkCollisionWithCoins();
         this.checkCollisionWithBottles();
         this.checkIfNormalChickenOrSmallChickenIsDead();
         this.checkCollisionsOfEnemiesWithThrowableObjects();
         this.throwableObjectHitsGround();
         this.checkThrowObjects();
        }, 75);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.throwableObjects.length > 0) {
            let bottleFromInventory = this.throwableObjects[this.throwableObjects.length - 1];
            this.character.bottles -= 1;
            this.updateBottleStatusBar();
            this.thrownObjects.push(bottleFromInventory); 
            this.throwableObjects.splice(this.throwableObjects.length - 1, 1);
    
            if (!bottleFromInventory.isThrown) {
                bottleFromInventory.throw(this.character.x + 100, this.character.y + 100);
                bottleFromInventory.isThrown = true;
            }

            this.keyboard.D = false;
            console.log(this.keyboard.D);
        }
    }

    throwableObjectHitsGround() {
        let groundLevel = 320;
        this.thrownObjects.forEach(bottle => {
            if(bottle.y > groundLevel) {
                bottle.broken = true;
                if(soundeffectsOn){
                    bottle.break_sound.play();
                }
                this.removeThrowableBottleFromWorld(bottle);
            }
        });
    }

    checkCollisionsOfEnemiesWithThrowableObjects() {
        this.thrownObjects.forEach(bottle => {
            this.handleCollisionOfEnemiesWithThrowableObject(bottle, this.level.chicken);
            this.handleCollisionOfEnemiesWithThrowableObject(bottle, this.level.smallChicken);
            this.handleCollisionOfEndbossWithThrowableObject(bottle, this.level.endboss);
        });
    }

    handleCollisionOfEnemiesWithThrowableObject(bottle, enemiesArray) {
        enemiesArray.forEach(enemy => {
            if(enemy.isCollidingWithThrownBottle(enemy, bottle)) {
                enemy.hitByBottle();
                bottle.broken = true;
                if(soundeffectsOn){
                    bottle.break_sound.play();
                }
                enemy.screams();   
                this.removeThrowableBottleFromWorld(bottle);
            }
        });
    }

    handleCollisionOfEndbossWithThrowableObject(bottle, endbossArray) {
        endbossArray.forEach(endboss => {
            if(endboss.thrownBottleIsCollidingWithEndboss(endboss, bottle)) {
                endboss.hitByBottle();
                console.log(endboss.energy);
                bottle.broken = true;
                if(soundeffectsOn){ // HIER WEITER
                    bottle.break_sound.play();
                }
                this.removeThrowableBottleFromWorld(bottle);
            }
        });
    }

    removeThrowableBottleFromWorld(bottle) {
        if(!bottle.isMarkedForRemoval) {
            bottle.isMarkedForRemoval = true
            setTimeout(() => {
                let index = this.thrownObjects.indexOf(bottle)
                this.thrownObjects.splice(index, 1);
            }, 100);
        }
    }

    removeDeadEnemiesFromWorld(enemiesArray, removalDelay) {
        enemiesArray.forEach((enemy, index)=> {
            if(enemy.energy === 0 && !enemy.isMarkedForRemoval) {
                enemy.isMarkedForRemoval = true;
                setTimeout(() => {
                    enemiesArray.splice(index, 1);
                }, removalDelay);
            }
        });
    }

    checkIfNormalChickenOrSmallChickenIsDead() {
        this.removeDeadEnemiesFromWorld(this.level.chicken, 750);
        this.removeDeadEnemiesFromWorld(this.level.smallChicken, 750);
    }

    handleCharacterCollisionsWithNormalAndSmallChicken(enemiesArray, hitByEnemy) {
        enemiesArray.forEach(enemy => {
            if(this.character.isCollidingWithEnemies(enemy)) {
                if(this.character.characterIsFalling()) {
                    if(enemy.energy > 0) {
                        this.character.characterJump();
                        enemy.hitByCharacter();
                        enemy.screams();
                    }
                }
                else {
                    hitByEnemy.call(this.character);
                    this.updateHealthStatusBar();
                }
            }
        })
    }

    processCollisionWithChicken() {
        this.handleCharacterCollisionsWithNormalAndSmallChicken(this.level.chicken, this.character.hitByChicken);
    }

    processCollisionWithSmallChicken() {
        this.handleCharacterCollisionsWithNormalAndSmallChicken(this.level.smallChicken, this.character.hitBySmallChicken);
    }

    checkCollisionEndboss() {
        this.level.endboss.forEach(endboss => {
            if(this.character.isCollidingWithEndboss(endboss)) {
                this.character.hitByEndboss();
                this.updateHealthStatusBar();
            }
        })
    }

    checkCollisionWithCollectableObject(itemsArray, characterIsCollidingWithItem, collectItem, updateStatusbar) {
        itemsArray.forEach(item => {
            if(characterIsCollidingWithItem.call(this.character, item)) {
                collectItem.call(this.character);
                updateStatusbar.call(this);
            }
        });
    }

    storeBottleForThrowing() {
        this.level.bottles.forEach((bottle, index) => {
            if(this.character.isCollidingWithCollectableBottle(bottle)) {
                let bottleToStore = new ThrowableObject();
                this.throwableObjects.push(bottleToStore);
                this.removeBottleFromWorld(index);
            }
        });
    }

    storeCoinInInventory() {
        this.level.coins.forEach((coin, index) => {
            if(this.character.isCollidingWithCoin(coin)) {
                this.removeCoinFromWorld(index)
            }
        })
    }

    checkCollisionWithCoins() {
        this.checkCollisionWithCollectableObject(this.level.coins, this.character.isCollidingWithCoin, this.character.collectCoin, this.updateCoinStatusBar);
        this.storeCoinInInventory();
    }

    checkCollisionWithBottles() {
        this.checkCollisionWithCollectableObject(this.level.bottles, this.character.isCollidingWithCollectableBottle, this.character.collectBottle, this.updateBottleStatusBar);
        this.storeBottleForThrowing();
    }

    updateHealthStatusBar() {
        this.healthStatusBar.setPercentage(this.character.energy);
    }

    updateCoinStatusBar() {
        this.coinStatusBar.setCoinAmount(this.character.coins);
    }

    updateBottleStatusBar(){
        this.bottleStatusBar.setBottleAmount(this.character.bottles);
    }

    removeCoinFromWorld(index) {
        this.level.coins.splice(index, 1)
    }

    removeBottleFromWorld(index) {
        this.level.bottles.splice(index,1)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Zeichne den Hintergrund und verschiebe die Kamera
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
    
        this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen
    
        // Zeichne alle festen Objekte (wie Statusleisten, etc.)
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.coinStatusBar);
    
        // Kamera wieder nach vorne schieben für bewegliche Objekte
        this.ctx.translate(this.camera_x, 0);
        
        // Zeichne alle Spielobjekte, die sich mit der Kamera bewegen
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.chicken);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.thrownObjects);
    
        // Kamera zurücksetzen
        this.ctx.translate(-this.camera_x, 0);
    
        // Zeichne den Win- oder Lose-Screen ganz oben
        if (this.character.energy <= 0) {
            this.addToMap(this.endScreen); // Lose-Screen zeichnen
        } else {
            this.level.endboss.forEach((endboss) => {
                if (endboss.energy <= 0) {
                    this.addToMap(this.winningScreen); // Win-Screen zeichnen
                }
            });
        }
    
        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
    

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
          this.flipImage(mo);
        }

       mo.draw(this.ctx);
       mo.drawFrame(this.ctx);
       mo.drawFrameCoin(this.ctx);
       mo.drawFrameBottle(this.ctx);
       mo.drawFrameCharacter(this.ctx);
       mo.drawFrameEndboss(this.ctx);


        if(mo.otherDirection) {
           this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width,0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}