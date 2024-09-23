//* reference speed
let speed = 50;

//* reference for audio
let footsteps = document.querySelector("#moveSound");
let bonkers = document.querySelector("#bonk");

//* reference the bounds of the play area;
let playSpace = document.querySelector("#playSpace");

//* reference the main character
let hero = document.querySelector("#hero");
heroPos = hero.getBoundingClientRect();
console.log(heroPos.width);
let heroTop = (playSpace.clientHeight)/2;
let heroLeft = (playSpace.clientWidth)/2;
hero.style.top = `${heroTop}px`;
hero.style.left = `${heroLeft}px`;

//* keyboard commands - this is a function expression
//* it does not get hoisted to the top of the function
//* but it can be used as an IIFE(immediately invoked function expression)!
let keyPressAction = (e) => {
    switch(e.keyCode){
        case 38:
            moveDir({hs:0, vs:-1});
            break;
        case 40:
            moveDir({hs:0, vs:1});
            break;
        case 37:
            moveDir({hs:-1, vs:0});
            break
        case 39:
            moveDir({hs:1, vs:0});
            break;
    }
}

//*capture key presses
document.addEventListener("keydown", keyPressAction);
//* this is a function declaration, it gets hoisted to the top
function moveDir(motionDir){
    newLeft = heroLeft + (speed*motionDir.hs);
    newTop =  heroTop + (speed*motionDir.vs);
    let playBonk = false;
    bonkers.currentTime = 0;
    footsteps.currentTime = 0;
    if(newLeft>0 && newLeft<playSpace.clientWidth - (heroPos.width)){
        heroLeft = newLeft;
    }else if(newLeft<=0){
        heroLeft = 0;
        playBonk = true;
    }else{
        heroLeft = playSpace.clientWidth-heroPos.width;
        playBonk = true;
    }
    if(newTop>0 && newTop<playSpace.clientHeight - (heroPos.width/2)){
        heroTop = newTop;
    }else if(newTop<=0){
        heroTop = 0;
        playBonk = true;
    }else{
        heroTop = playSpace.clientHeight-heroPos.height;
        playBonk = true;
    }
    if(playBonk==true){
        bonkers.play();
    }else{
        footsteps.play();
    }
    gsap.to(hero, { backgroundColor:randoCol(), top: heroTop, left:heroLeft, duration: .5 });
}
//* random colours tool
let randoCol = function(){
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
