let soundeffectsOn = true;

let sounds = [
    
]
let walking_sound = new Audio('audio/running.mp3');
let snorring_sound = new Audio('audio/snorring.mp3');
let jump_sound = new Audio('audio/jump.mp3');
let hurt_sound_character = new Audio('audio/hurt.mp3');
let coin_collect_sound = new Audio('audio/collectCoin.mp3');
let bottle_collect_sound = new Audio('audio/bottleCollect.mp3');
let hurt_sound_chicken = new Audio('audio/chickenHurt.mp3');
let hurt_sound_small_chicken = new Audio('audio/smallChickenHurt.mp3');
let attacking_sound_endboss = new Audio('audio/chickenAttack.mp3');
let dead_sound_endboss = new Audio('audio/endbossDied.mp3');
let hurt_sound_endboss = new Audio('audio/endbossHurt.mp3');
let break_sound = new Audio('audio/bottleBroken.mp3');


document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('pause-soundeffects-button');
    button.addEventListener('click', (event) => {
        button.innerText = "Turn Soundeffects on";
    });
});