class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    currentImageDead = 0;
    currentImageHurt = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

     // loadImage('img/test.png')
     loadImage(path){
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    
    playAnimationWhenDead(images) { // Wenn Tot, dann führe die Animation nur einmal aus 
        if (this.currentImageDead < images.length) {
            let i = this.currentImageDead % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImageDead++;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if(this instanceof Chicken || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameCharacter(ctx) {
        if(this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            

            let frameWidth = this.width * 0.8;
            let frameHeight = this.height * 0.6;
            let offsetX = (this.width -  frameWidth) / 2;
            let offsetY = (this.height - frameHeight);
            
            ctx.rect(this.x + offsetX, this.y + offsetY, frameWidth, frameHeight);
            ctx.stroke();
        }
    }

    drawFrameEndboss(ctx) {
        if (this instanceof Endboss) {
            let height = 400;
            let width = 250;
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            

            let frameWidth = width * 0.8;
            let frameHeight = height * 0.75;
            let offsetX = width * 0.1;
            let offsetY = height * 0.2;
            
            ctx.rect(this.x + offsetX, this.y + offsetY, frameWidth, frameHeight);
            ctx.stroke();
        }
    }

    drawFrameCoin(ctx) {
        if(this instanceof CoinCollactableObject) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            

            let offsetX = this.width * 0.3;
            let offsetY = this.height * 0.3;
            let frameWidth = this.width * 0.4;
            let frameHeight = this.height * 0.4;
            
            ctx.rect(this.x + offsetX, this.y + offsetY, frameWidth, frameHeight);
            ctx.stroke();
        }
    }

    drawFrameBottle(ctx) {
        if(this instanceof BottleCollectableObject) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "yellow";
                
            let offsetX = this.width * 0.3;
            let offsetY = this.height * 0.2;
            let frameWidth = this.width * 0.4;
            let frameHeight = this.height * 0.7;
                
            ctx.rect(this.x + offsetX, this.y + offsetY, frameWidth, frameHeight);
            ctx.stroke();
        }
    }
}