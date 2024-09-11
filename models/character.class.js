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
    
    constructor() {
        super().loadImage('img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING); 
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        sounds.push(this.walking_sound);
        sounds.push(this.snorring_sound);
        sounds.push(this.jump_sound);
        sounds.push(this.hurt_sound);
        sounds.push(this.coin_collect_sound);
        sounds.push(this.bottle_collect_sound);
        this.applyGravity();
        this.checkIfNotMoving();
        this.animate();
    }

    checkIfNotMoving() {
        setInterval(() => {
            let currentTime = new Date().getTime();

            if (currentTime - this.lastMoveTime > 5000) {
                this.notMovedLong = true;
            }
        }, 100);
    }

    characterMoved() {
        this.lastMoveTime = new Date().getTime();
        this.notMovedLong = false;
    }

    animate(){
        this.applyCharacterPhysics();
        this.updateCharacterAnimation();
    }

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

    updateCharacterAnimation() {
        setInterval(() => { 
            if (this.isDead()) {
                this.playAnimationWhenDead(this.IMAGES_DEAD);
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

    characterIsFalling(){
        return this.speedY < 0;
    }

    characterMoveRight() {
        this.speed = this.walkSpeed;
        this.increaseXCoordinate();
        this.otherDirection = false;
        this.walking_sound.play();
        this.snorring_sound.pause();
        this.characterMoved();
    }

    characterMoveLeft() {
        this.speed = this.walkSpeed;
        this.decreaseXCoordinate();
        this.otherDirection = true;
        this.walking_sound.play();
        this.snorring_sound.pause();
        this.characterMoved();
    }

    characterJump() {
        this.increaseYCoordinate();
        this.characterMoved();
        this.jump_sound.currentTime = 0;
        this.jump_sound.play();
        this.snorring_sound.pause();
    }

    playHurtAnimation(){
        this.playAnimation(this.IMAGES_HURT);
        if(!this.hurtSoundPlayed) {
            this.hurt_sound.play();
            this.hurtSoundPlayed = true;
        }
    }

    playJumpAnimation() {
        if (!this.wasAboveGround) {
            this.currentImage = 0;
            this.wasAboveGround = true;
            this.hurtSoundPlayed = false;
        } 
        this.playAnimation(this.IMAGES_JUMPING);
    }

    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.wasAboveGround = false;
        this.hurtSoundPlayed = false;
    }

    playSleepingAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.snorring_sound.play();
        this.wasAboveGround = false;
        this.hurtSoundPlayed = false;
    }

    playWalkingAnimation(){
        this.playAnimation(this.IMAGES_WALKING);
        this.wasAboveGround = false;
        this.hurtSoundPlayed = false;
    }

    collectCoin() {
        this.coin_collect_sound.currentTime = 0;
        this.coins ++;
        this.coin_collect_sound.play();
    }

    collectBottle(){
        this.bottle_collect_sound.currentTime = 0;
        this.bottles ++;
        this.bottle_collect_sound.play();
    }
}