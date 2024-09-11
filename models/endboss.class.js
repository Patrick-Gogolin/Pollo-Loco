class Endboss extends MovableObject {

    height = 400;
    width = 250;
    speed = 1;
    y = 50;
    hadFirstContact = false;
    beginToMove = false;
    movementInterval = null;
    i = 0;
    attacking_sound = new Audio('audio/chickenAttack.mp3');
    dead_sound = new Audio('audio/endbossDied.mp3');
    hurt_sound = new Audio('audio/endbossHurt.mp3');
    hasPlayedDeadSound = false;

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

    IMAGES_WALKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

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

    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        sounds.push(this.attacking_sound);
        sounds.push(this.dead_sound);
        sounds.push(this.hurt_sound);
        this.animate();
        this.x = 7500;
    }

    animate() {

        setInterval(() => {
            this.i++;
            this.handleFirstContact();
            this.handleMovementAnimations();
        }, 150);
    }

    handleFirstContact() {
        if (world.character.x > 7000 && !this.hadFirstContact) {
            this.i = 0;
            this.hadFirstContact = true;
            this.beginToMove = true;
        }
    }

    handleMovementAnimations() {
        if(this.isHurt()) {
            this.hurtAnimaton();
            this.hurt_sound.play();
        }
        else if(this.isDead()) {
            this.playAnimationWhenDead(this.IMAGES_DEAD);
            if(!this.hasPlayedDeadSound) {
                this.dead_sound.play();
                this.hasPlayedDeadSound = true;
            }
        }
        else if (this.beginToMove) {
          this.beginToMoveAnimations();
        }
    }

    beginToMoveAnimations(){
        if (this.i < 10) {
            this.firstContactAnimation();
            this.attacking_sound.play();
        } else {
            if (this.characterCloseToEndboss()) {
                this.attackAnimation();
            } else {
                this.walkingAnimation();
            }
            this.startWalking();
        }
    }

    startWalking() {
        if (this.beginToMove && !this.movementInterval) {
            this.movementInterval = setInterval(() => {
                this.decreaseXCoordinate();
            }, 1000 / 60);
        }
    }

    stopWalking() { // lassen wir erstmal drinne, vielleicht brauchen wir das zum Beenden des intervalles, wird aktuell nirgendwo benutzt
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    };

    characterCloseToEndboss() {
        let distance = this.x - world.character.x;
        return distance < 375;
    }

    firstContactAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    attackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    hurtAnimaton() {
        this.playAnimation(this.IMAGES_HURT);
    }

    hitByBottle(){
        if(!this.isInCollisionCooldown) {
            this.isInCollisionCooldown = true;
            this.lastHit = new Date().getTime();
            this.energy -= 30;
            console.log(this.energy);
            if (this.energy < 0) {
                this.energy = 0;
            }
        }
        setTimeout(() => {
            this.isInCollisionCooldown = false;
        }, 100);
    }
}