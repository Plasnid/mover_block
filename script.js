class Hero{
    constructor(moveSound, bonkSound, heroSpeed, heroIcon){
        //* reference for audio
        this.footsteps = document.querySelector(moveSound);
        this.bonkers = document.querySelector(bonkSound);
        //*hero speed referenc
        this.heroSpeed = heroSpeed;
        //* hero html Element
        this.heroIcon = document.querySelector(heroIcon);
    }
    //* random colours tool
    randoCol(){
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        let style = `color:${color}; font-weight: 400; font-style: normal;`;
        //console.log(`%c${color}`+"%c is the"+ "%c color", style, "font-size: 2em;",style);
        console.log(`%c${color}%c is the %c color! %c Woot!`, style, "font-size: 2em;",style,"font-size: 3em;");
    return color;
    }
}


class GameBoard{
    constructor(playSpace, gameHero){
        //* reference the bounds of the play area;
        this.playSpace = document.querySelector(playSpace);
        //* reference to the hero html element
        this.gameHero = gameHero;
        //* Hero Icon Bounding Rectangle
        this.heroPos = this.gameHero.heroIcon.getBoundingClientRect();
        this.startGame();
    }
    //* this is a no longer a function declaration
    moveDir(motionDir){
        let newLeft = this.heroLeft + (this.gameHero.heroSpeed*motionDir.hs);
        let newTop =  this.heroTop + (this.gameHero.heroSpeed*motionDir.vs);
        let playBonk = false;
        if(newLeft>=0 && newLeft<this.playSpace.clientWidth - (this.heroPos.width)){
            this.heroLeft = newLeft;
        }else if(newLeft<0){
            console.log("far left");
            this.heroLeft = 0;
            playBonk = true;
        }else{
            console.log("far right")
            this.heroLeft = this.playSpace.clientWidth-this.heroPos.width;
            playBonk = true;
        }
        console.log(this.heroLeft);
        if(newTop>=0 && newTop<playSpace.clientHeight - (this.heroPos.width/2)){
            this.heroTop = newTop;
        }else if(newTop<0){
            this.heroTop = 0;
            playBonk = true;
        }else{
            this.heroTop = playSpace.clientHeight-this.heroPos.height;
            playBonk = true;
        }

        if(playBonk==true){
            this.gameHero.bonkers.currentTime = 0;
            this.gameHero.bonkers.play();
        }else{
            this.gameHero.footsteps.currentTime = 0;
            this.gameHero.footsteps.play();
        }
        gsap.to(this.gameHero.heroIcon, { backgroundColor:this.gameHero.randoCol(), top: this.heroTop, left:this.heroLeft, duration: .5 });
    }
    //* keyboard commands
    keyPressAction(e){
        console.log(this);
        switch(e.keyCode){
            case 38:
                this.moveDir({hs:0, vs:-1});
                break;
            case 40:
                this.moveDir({hs:0, vs:1});
                break;
            case 37:
                this.moveDir({hs:-1, vs:0});
                break
            case 39:
                this.moveDir({hs:1, vs:0});
                break;
        }
    }
    startGame(){
        //* position the hero on the screen;
        this.heroTop = (this.playSpace.clientHeight)/2;
        this.heroLeft = (this.playSpace.clientWidth)/2;
        //console.log(this.playSpace.clientHeight)
        this.gameHero.heroIcon.style.top = `${this.heroTop}px`;
        this.gameHero.heroIcon.style.left = `${this.heroLeft}px`;
    
        //*self captures reference to the Gameboard class
        let self = this;
        //document.addEventListener("keydown", self.keyPressAction);
        //* whole window listens to the keydown event
        //* a closure is formed here where self is 
        window.addEventListener('keydown', function(event) {
            console.log(self);
            console.log(this);
            self.keyPressAction(event);
            // self is your Keyboard object. You can refer to all your properties from this
        });
    }
}

let gameHero = new Hero("#moveSound", "#bonkSound",50, "#hero");
let gameBoard = new GameBoard("#playSpace", gameHero);