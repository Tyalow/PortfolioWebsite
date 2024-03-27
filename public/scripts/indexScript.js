const movingImage = document.getElementById('moving-image');
const spriteImage = document.getElementById('sprite');
const doors = [document.getElementById('door1'), document.getElementById('door2'), document.getElementById('door3'), document.getElementById('door4')];

//Image positioning global variables
let xPosInit;
let yPosInit;
let sightRadius;
let xPos;
let yPos;
let xMoveAllowance;
let yMoveAllowance;
let viewportWidth;
let viewportHeight;
let viewportGreaterDimension;

//Sprite direction and step global trackers (Initialized as down)
let spriteDirection = 2;
let spriteStep = 0;

if(movingImage.complete) {
    establishPositioning();
    initializeMovement();
} else { 
    movingImage.onload = function () {
        establishPositioning();
        initializeMovement();
    }
}

window.onresize = establishPositioning;

function setMovingImagePosition() {
    let xOffset = -movingImage.clientWidth/2;
    let yOffset = -movingImage.clientHeight/2;
    xPosInit = viewportWidth/2 + xOffset;
    yPosInit = viewportHeight/2 + yOffset;
    movingImage.style.left = `${xPosInit}px`;
    movingImage.style.top = `${yPosInit}px`;   
}

function initializeMovement() {
    const moveSpeed = 10;

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                yPos -= moveSpeed;
                adjustSprite(0);
                break;
            case 'ArrowDown':
                yPos += moveSpeed;
                adjustSprite(2);
                break;
            case 'ArrowLeft':
                xPos -= moveSpeed;
                adjustSprite(3);
                break;
            case 'ArrowRight':
                xPos += moveSpeed;
                adjustSprite(1);
                break;
            case 'e':
                //Define variable to track top left position of sprite
                const rect = spriteImage.getBoundingClientRect();
                let spriteL = rect.left;
                let spriteR = rect.right;
                let spriteT = rect.top;
                let spriteB = rect.bottom;

                //Four corner cases for website movement (sprite touching door cases)
                if(spriteL < 4*doors[0].width) {
                    if(spriteT < 2*doors[0].width + doors[0].height) {
                        window.location.href = "";
                    }else if(spriteB > window.innerHeight - (2*doors[0].width + doors[0].height)) {
                        window.location.href = "webgl";
                    }
                }else if(spriteR > window.innerWidth - 4*doors[0].width) {
                    if(spriteT < 2*doors[0].width + doors[0].height) {
                        window.location.href = "pokemon";
                    }else if(spriteB > window.innerHeight - (2*doors[0].width + doors[0].height)) {
                        window.location.href = "links";
                    }
                }
                break;
            default:
                return; 
        }
        
        if(yPos < yPosInit - yMoveAllowance) {
            yPos = yPosInit - yMoveAllowance;
        }else if(yPos > yPosInit + yMoveAllowance) {
            yPos = yPosInit + yMoveAllowance;
        }
        if(xPos < xPosInit - xMoveAllowance) {
            xPos = xPosInit - xMoveAllowance;
        }else if(xPos > xPosInit + xMoveAllowance) {
            xPos = xPosInit + xMoveAllowance;
        }

        movingImage.style.top = `${yPos}px`;
        movingImage.style.left = `${xPos}px`;
        setSpritePosition();
    });
}

function establishPositioning() {
    setMovingImageDims();
    setDoorDims();
    setDoorPositions();
    setMovingImagePosition();
    setMovingImageBoundary();
    setSpriteDims();
    setSpritePosition();
}

function setMovingImageDims() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    viewportGreaterDimension = Math.max(viewportHeight, viewportWidth);
    movingImage.style.width = `${viewportGreaterDimension*2}px`;
    movingImage.style.height = `${viewportGreaterDimension*2}px`;
}

function setMovingImageBoundary() {
    sightRadius = viewportGreaterDimension/8;
    xPos = xPosInit;
    yPos = yPosInit;
    xMoveAllowance = viewportWidth/2-sightRadius;
    yMoveAllowance = viewportHeight/2-sightRadius;
}

function setDoorPositions() {
    function setDoorPosition(door, top, left) {
        door.style.top = `${top}px`;
        door.style.left = `${left}px`;
    }
    setDoorPosition(doors[0], 2*doors[0].width, 3*doors[0].width);
    setDoorPosition(doors[1], 2*doors[1].width, viewportWidth - (4*doors[1].width));
    setDoorPosition(doors[2], viewportHeight - (2*doors[2].width + doors[2].height), 3*doors[2].width);
    setDoorPosition(doors[3], viewportHeight - (2*doors[3].width + doors[3].height), viewportWidth - (4*doors[3].width));
}

function setDoorDims() {
    doors.forEach((door) => {
        door.style.height = `${viewportHeight/6}px`;
        door.style.width = `${(viewportHeight/6) * (627/1328)}px`;
    })
}

function setSpriteDims() {
    spriteImage.style.height = `${sightRadius * 0.5}px`;
    spriteImage.style.width = `${sightRadius * 0.5}px`;
}

function setSpritePosition() {
    spriteImage.style.top = `${yPos + (movingImage.height - spriteImage.height)/2}px`;
    spriteImage.style.left = `${xPos + (movingImage.width - spriteImage.width)/2}px`;
}

//Direction value is 0,1,2,3 for N,E,S,W (matched up with sprite naming convention)
function adjustSprite(direction) {
    let fileID = 'images/';
    switch(direction) {
        case 0:
            fileID += 'SpriteUp';
            break;
        case 1:
            fileID += 'SpriteRight';
            break;
        case 2:
            fileID += 'SpriteDown';
            break;
        case 3:
            fileID += 'SpriteLeft';
            break;
        default:
            return;
    }
    if(direction == spriteDirection) {
        spriteStep = (spriteStep + 1) % 4;
    } else {
        spriteDirection = direction;
        spriteStep = 0;
    }
    fileID = fileID + spriteStep + '.png';
    spriteImage.src = fileID;
}
