//* reference speed
let speed = 50;

//* reference for audio
let footsteps = document.querySelector("#moveSound");

//* reference the bounds of the play area;
let playSpace = document.querySelector("#playSpace");

//* reference the main character
let mainChar = document.querySelector("#mainChar");
charPos = mainChar.getBoundingClientRect();
console.log(charPos.width);
let charTop = (playSpace.clientHeight)/2;
let charLeft = (playSpace.clientWidth)/2;
mainChar.style.top = `${charTop}px`;
mainChar.style.left = `${charLeft}px`;

//capture key presses
document.addEventListener("keydown", keyPressAction);
function moveDir(motionDir){
    newLeft = charLeft + (speed*motionDir.hs);
    newTop =  charTop + (speed*motionDir.vs);
    if(newLeft>0 && newLeft<playSpace.clientWidth - (charPos.width)){
        charLeft = newLeft;
    }else if(newLeft<=0){
        charLeft = 0;
    }else{
        charLeft = playSpace.clientWidth-charPos.width;
    }
    if(newTop>0 && newTop<playSpace.clientHeight - (charPos.width/2)){
        charTop = newTop;
    }else if(newTop<=0){
        charTop = 0;
    }else{
        charTop = playSpace.clientHeight-charPos.height;
    }
    footsteps.play();
    gsap.to(mainChar, { top: charTop, left:charLeft, duration: .5 });
}
function keyPressAction(e){
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