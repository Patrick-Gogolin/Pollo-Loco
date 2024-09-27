/**
 * Represents a character in the game.
 * Extends the MovableObject class and includes properties and methods for character actions.
 */
class Character extends MovableObject {
    height = 250;
    y = 180;
    speed = 0;
    walkSpeed = 10;
    lastMoveTime = new Date().getTime();
    notMovedLong = false;
    wasAboveGround = false;
    hurtSoundPlayed = false;
    coins = 0;
    bottles = 0;
    isFalling = false;
    

    IMAGES_LONG_IDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_IDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;
    walking_sound = new Audio('audio/running.mp3');
    snorring_sound = new Audio('audio/snorring.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    coin_collect_sound = new Audio('audio/collectCoin.mp3');
    bottle_collect_sound = new Audio('audio/bottleCollect.mp3');
    dead_sound = new Audio('audio/characterDead.mp3');
    
     /**
     * Creates an instance of the Character class.
     */
    constructor() {
        super().loadImage('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.checkIfNotMoving();
        this.animate();
    }

    /**
     * Checks if the character has not moved for a long time and updates the state.
     */
    checkIfNotMoving() {
        setInterval(() => {
            let currentTime = new Date().getTime();

            if (currentTime - this.lastMoveTime > 5000) {
                this.notMovedLong = true;
            }
        }, 100);
    }

     /**
     * Updates the last move time and sets the notMovedLong state to false.
     */
    characterMoved() {
        this.lastMoveTime = new Date().getTime();
        this.notMovedLong = false;
    }

     /**
     * Animates the character by applying physics and updating animations.
     */
    animate(){
        this.applyCharacterPhysics();
        this.updateCharacterAnimation();
    }

     /**
     * Applies character movement physics based on keyboard input.
     */
    applyCharacterPhysics() {
        setInterval(() => {
            this.walking_sound.pause();
            if(this.energy > 0) {
                if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.characterMoveRight();
                }
                else if(this.world.keyboard.LEFT && this.x > 0) { 
                    this.characterMoveLeft();
                }
                else {
                    this.speed = 0;
                }
            
                if(this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.characterJump();
                }

                this.world.camera_x = -this.x + 100;
        }}, 1000 / 60);
        }
    
    /**
     * Updates the character's animation based on its state (e.g., jumping, idle, walking).
     */
    updateCharacterAnimation() {
        setInterval(() => { 
            if (this.isDead()) {
                this.playAnimationWhenDead(this.IMAGES_DEAD);
                stopGame();
                playSoundeffects(this.dead_sound);
            } else if (this.isHurt()) {
                this.playHurtAnimation();
            } else if (this.isAboveGround()) {
                this.playJumpAnimation();
            } else if (this.isNotMoving() && !this.notMovedLong) {
                this.playIdleAnimation();
            } else if (this.notMovedLong) {
                this.playSleepingAnimation();
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playWalkingAnimation();
                }
            }
        }, 100);
    }

    /**
    * Checks if the character is currently falling.
    * @returns {boolean} True if the character is falling (speedY < 0), otherwise false.
    */
    characterIsFalling(){
        return this.speedY < 0;
    }

    /**
    * Moves the character to the right.
    * Increases the character's speed to walk speed, updates the x-coordinate,
    * plays the walking sound, pauses the snoring sound, and marks the character as moved.
    */
    characterMoveRight() {
        this.speed = this.walkSpeed;
        this.increaseXCoordinate();
        this.otherDirection = false;
        playSoundeffects(this.walking_sound);
        this.snorring_sound.pause();
        this.characterMoved();
    }

    /**
    * Moves the character to the left.
    * Increases the character's speed to walk speed, updates the x-coordinate,
    * plays the walking sound, pauses the snoring sound, and marks the character as moved.
    */
    characterMoveLeft() {
        this.speed = this.walkSpeed;
        this.decreaseXCoordinate();
        this.otherDirection = true;
        playSoundeffects(this.walking_sound);
        this.snorring_sound.pause();
        this.characterMoved();
    }

    /**
    * Makes the character jump.
    * Increases the character's y-coordinate to simulate jumping,
    * marks the character as moved, resets the jump sound, and plays it.
    * Also pauses the snoring sound during the jump.
    */
    characterJump() {
        this.increaseYCoordinate();
        this.characterMoved();
        this.jump_sound.currentTime = 0;
        playSoundeffects(this.jump_sound);
        this.snorring_sound.pause();
    }

    /**
    * Plays the hurt animation for the character.
    * Displays the hurt images and plays the hurt sound if it hasn't been played already.
    */
    playHurtAnimation(){
        this.playAnimation(this.IMAGES_HURT);
        if(!this.hurtSoundPlayed) {
            playSoundeffects(this.hurt_sound);
            this.hurtSoundPlayed = true;
        }
    }

    /**
    * Plays the jump animation for the character.
    * Resets the current image if the character was not previously above ground,
    * and updates the state to indicate the character is now in the air.
    */
    playJumpAnimation() {
        if (!this.wasAboveGround) {
            this.currentImage = 0;
            this.wasAboveGround = true;
            this.hurtSoundPlayed = false;
        } 
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
    * Plays the idle animation for the character.
    * Resets the state to indicate the character is no longer above ground
    * and ensures that the hurt sound has not been played.
    */
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.wasAboveGround = false;
        this.hurtSoundPlayed = false;
    }

    /**
    * Plays the sleeping animation for the character.
    * This animation is displayed when the character has not moved for a while.
    * It plays the snoring sound, and resets the state to indicate the character
    * is no longer above ground and that the hurt sound has not been played.
    */
    playSleepingAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        playSoundeffects(this.snorring_sound);
        this.wasAboveGround = false;
        this.hurtSoundPlayed = false;
    }

    /**
    * Plays the walking animation for the character.
    * Sets the current image to the walking animation sequence.
    * Resets the flags indicating whether the character is above ground
    * and if a hurt sound has been played.
    */
    playWalkingAnimation(){
        this.playAnimation(this.IMAGES_WALKING);
        this.wasAboveGround = false;
        this.hurtSoundPlayed = false;
    }

    /**
    * Increments the coin count for the character by one.
    * Resets the coin collection sound to the beginning and plays it.
    */
    collectCoin() {
        this.coin_collect_sound.currentTime = 0;
        this.coins ++;
        playSoundeffects(this.coin_collect_sound);
    }

    /**
    * Increments the bottle count for the character by one.
    * Resets the bottle collection sound to the beginning and plays it.
    */
    collectBottle(){
        this.bottle_collect_sound.currentTime = 0;
        this.bottles ++;
        playSoundeffects(this.bottle_collect_sound);
    }
}