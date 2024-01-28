let gameInterval;
let points = 0;
let lives = 3;
var shaverTop, correction;
var timeout = 2000;
var acc = 4;
var reloadTimeout;

function createBall() {
    const ball = document.querySelector(".ballTemplate").cloneNode(true);
    ball.classList.add('ball');
    ball.classList.remove("ballTemplate");
    ball.style.left = `${Math.random() * (window.innerWidth -132)}px`;
    document.querySelector('#gameContainer').appendChild(ball);
    animateBall(ball, ball.getBoundingClientRect().height);
}

function animateBall(ball, ballHeight) {
    const speed = Math.random() * acc + 2;
    let top = 0;
    
    const moveBall = () => {
        // if (top > window.innerHeight - shaverTop - ballHeight) {
        if (ball.getBoundingClientRect().bottom >= shaverTop) {
            if (isBallCaught(ball)) {
                points++;
                document.getElementById('points').textContent = points;
                if(points%10 === 0){
                    acc += 5;
                    if(timeout > 1000){
                        timeout -= 500;
                    }
                    clearInterval(gameInterval);
                    gameInterval = setInterval(createBall,timeout);
                }
            } else {
                lives--;
                document.getElementById('lives').textContent = lives;
                if (lives === 0) endGame();
            }

            clearInterval(ballInterval);
            ball.remove();
        } else {
            top += speed;
            ball.style.top = `${top}px`;
        }
    };

    const ballInterval = setInterval(moveBall, 20);
}

function isInBetween(val, min, max){
    return val > min && val < max;
}

function isBallCaught(ball) {
    const basket = document.getElementById('basket');
    const ballRect = ball.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    const rightVal = basketRect.right - basketRect.width * 0.13793103448275862;
    const leftVal = basketRect.left + basketRect.width * 0.3793103448275862;

    return ( 
        isInBetween(ballRect.right, leftVal, rightVal) || isInBetween(ballRect.left, leftVal, rightVal) ||
        (isInBetween(leftVal,ballRect.left, ballRect.right) && isInBetween(rightVal,ballRect.left, ballRect.right))
    );
    // return (
    //     ballRect.bottom >= basketRect.top &&
    //     ballRect.top <= basketRect.bottom &&
    //     ballRect.right >= basketRect.left &&
    //     ballRect.left <= basketRect.right
    // );
}

function moveBasket(event) {
    const basket = document.getElementById('basket');
    const basketRect = basket.getBoundingClientRect();

    if (event.key === 'ArrowLeft' && basketRect.left > 0) {
        basket.style.left = `${basketRect.left - 10}px`;
    } else if (event.key === 'ArrowRight' && basketRect.right < window.innerWidth) {
        basket.style.left = `${basketRect.left + 10}px`;
    }
}

function endGame() {
    clearInterval(gameInterval);
    document.removeEventListener('keydown', moveBasket);
    // alert(`Game Over! Your score: ${points}`);
    document.querySelector(".defaultHeader").classList.remove("hide");
    document.querySelector(".gameEndContainer").classList.remove("hide");
    document.querySelector(".finalScore").classList.remove("hide");
    document.body.classList.remove("animation");
    document.querySelector(".gameHeader").classList.add("hide");
    document.querySelector("#gameContainer").classList.add("hide");
    document.querySelector("#score").innerHTML = points;
    document.querySelector(".discountAmount").innerHTML = "Rs " + points;

    resetGame();
}

function resetGame() {
    points = 0;
    lives = 3;
    timeout = 2000;
    document.getElementById('points').textContent = points;
    document.getElementById('lives').textContent = lives;
    // document.querySelector('button').style.display = 'block';
    document.querySelectorAll('.ball').forEach(ball => ball.remove());
    clearInterval(gameInterval);
    reloadTimeout = setTimeout(()=>{
        location.reload();
    },10000);
    // window.location = "/shaver/gameEnd.html";
}

var draggable = document.getElementById('basket');
draggable.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.targetTouches[0];
    // Place element where the finger is
    newLeftVal = touch.pageX - correction;
    // alert(newLeftVal);
    draggable.style.left = newLeftVal + "px";
}, false);


document.addEventListener('keydown', moveBasket);
function start(){
    if(reloadTimeout){
        clearTimeout(reloadTimeout);
        reloadTimeout = undefined;
    }
    points = 0;
    lives = 3;
    document.querySelector(".defaultHeader").classList.add("hide");
    document.querySelector(".welcomeContainer").classList.add("hide");
    document.querySelector(".gameEndContainer").classList.add("hide");
    document.body.classList.add("animation");
    document.querySelector(".gameHeader").classList.remove("hide");
    document.querySelector("#gameContainer").classList.remove("hide");
    const basket = document.getElementById("basket").getBoundingClientRect();
    shaverTop = parseInt(basket.top) + 20;
    correction = basket.width / 2;
    gameInterval = setInterval(createBall, timeout);

}