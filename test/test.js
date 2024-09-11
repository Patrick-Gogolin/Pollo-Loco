let d = false;
let dpressed = false;



window.addEventListener('keydown', (event) => {
    d = true;
    
    console.log(`Taste gedrückt: ${event.key}`);
});