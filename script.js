//* reference speed
let speed = 15;

//* reference the bounds of the play area;
let playSpace = document.querySelector("#playSpace");
let playSpaceTop = playSpace.getBoundingClientRect().top;
let playSpaceLeft =playSpace.getBoundingClientRect().left;
let playSpaceBottom = playSpaceTop + playSpace.clientHeight;
let playSpaceRight = playSpaceLeft + playSpace.clientWidth;

//* reference the main character
let mainChar = document.querySelector("#mainChar");
charPos = mainChar.getBoundingClientRect();
let charTop = (playSpaceBottom - playSpaceTop)/2;
let charLeft = (playSpaceRight-playSpaceLeft)/2;
mainChar.style.top = `${charTop}px`;
mainChar.style.left = `${charLeft}px`;

//capture key presses
document.addEventListener("keydown", keyPressAction);
function moveDir(motionDir){
    newLeft = charLeft + (speed*motionDir.hs);
    newTop =  charTop + (speed*motionDir.vs);
    if(newLeft>playSpaceLeft && newLeft<playSpaceRight){
        charLeft = newLeft;
        gsap.to(mainChar, { left: charLeft, duration: .5 });
    }
    if(newTop>playSpaceTop && newTop<playSpaceBottom){
        charTop = newTop;
        gsap.to(mainChar, { top: charTop, duration: .5 });
    }
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
