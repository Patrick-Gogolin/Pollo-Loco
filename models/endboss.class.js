/**
 * Represents the end boss character in the game.
 * Extends the MovableObject class.
 */
class Endboss extends MovableObject {

    height = 400;
    width = 250;
    speed = 2.5;
    y = 50;
    hadFirstContact = false;
    beginToMove = false;
    movementInterval = null;
    i = 0;
    attacking_sound = new Audio('audio/chickenAttack.mp3');
    dead_sound = new Audio('audio/endbossDied.mp3');
    hurt_sound = new Audio('audio/endbossHurt.mp3');
    win_sound = new Audio('audio/winGame.mp3');
    hasPlayedDeadSound = false;

    /**
     * Images for the alert state of the end boss.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Images for the walking state of the end boss.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    /**
     * Images for the attack state of the end boss.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Images for the hurt state of the end boss.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Images for the dead state of the end boss.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * Initializes the end boss and loads necessary images and sounds.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 7500;
    }

     /**
     * Starts the animation loop for the end boss.
     */
    animate() {
        setInterval(() => {
            this.i++;
            this.handleFirstContact();
            this.handleMovementAnimations();
        }, 100);
    }
    
    /**
     * Checks for the first contact with the character and sets movement state.
     */
    handleFirstContact() {
        if (world.character.x > 7000 && !this.hadFirstContact) {
            this.i = 0;
            this.hadFirstContact = true;
            this.beginToMove = true;
        }
    }

    /**
     * Handles animations based on the end boss's state (hurt, dead, moving).
     */
    handleMovementAnimations() {
        if(this.isHurt() && this.energy > 0) {
            this.hurtAnimaton();
            playSoundeffects(this.hurt_sound);
        }
        else if(this.isDead()) {
            this.playAnimationWhenDead(this.IMAGES_DEAD);
            if(!this.hasPlayedDeadSound) {
                playSoundeffects(this.dead_sound);
                this.hasPlayedDeadSound = true;
                playSoundeffects(this.win_sound);
                stopGame();
            }
        }
        else if (this.beginToMove) {
          this.beginToMoveAnimations();
        }
    }

    /**
     * Manages animations for the movement of the end boss.
     */
    beginToMoveAnimations(){
        if (this.i < 10) {
            this.firstContactAnimation();
            playSoundeffects(this.attacking_sound);
        } else {
            if (this.characterCloseToEndboss()) {
                this.attackAnimation();
            } else {
                this.walkingAnimation();
            }
            this.startWalking();
        }
    }

     /**
     * Starts the walking movement of the end boss.
     */
    startWalking() {
        if (this.beginToMove && !this.movementInterval && !this.isPaused) {
            this.movementInterval = setInterval(() => {
                this.decreaseXCoordinate();
            }, 1000 / 120);
        }
    }

    /**
     * Stops the walking movement of the end boss.
     */
    stopWalking() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    };

    /**
     * Checks if the character is close to the end boss.
     * @returns {boolean} True if close, false otherwise.
     */
    characterCloseToEndboss() {
        let distance = this.x - world.character.x;
        return distance < 375;
    }

    /**
     * Plays the first contact animation.
     */
    firstContactAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
    }

     /**
     * Plays the attack animation.
     */
    attackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    /**
     * Plays the walking animation.
     */
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }

     /**
     * Plays the hurt animation.
     */
    hurtAnimaton() {
        this.playAnimation(this.IMAGES_HURT);
    }

     /**
     * Plays the hurt animation.
     */
    hitByBottle(){
        if(!this.isInCollisionCooldown) {
            this.isInCollisionCooldown = true;
            this.lastHit = new Date().getTime();
            this.energy -= 30;
            if (this.energy < 0) {
                this.energy = 0;
            }
        }
        setTimeout(() => {
            this.isInCollisionCooldown = false;
        }, 250);
    }
}