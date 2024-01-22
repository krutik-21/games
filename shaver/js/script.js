let gameInterval;
let points = 0;
let lives = 3;
var shaverHeight;

function createBall() {
    const ball = document.querySelector(".ballTemplate").cloneNode(true);
    ball.classList.add('ball');
    ball.classList.remove("ballTemplate");
    ball.style.left = `${Math.random() * (window.innerWidth - 70)}px`;
    document.querySelector('#gameContainer').appendChild(ball);
    animateBall(ball, ball.getBoundingClientRect().height);
}

function animateBall(ball, ballHeight) {
    const speed = Math.random() * 2 + 2;
    let top = 0;

    const moveBall = () => {
        if (top > window.innerHeight - shaverHeight - ballHeight) {
            if (isBallCaught(ball)) {
                points++;
                document.getElementById('points').textContent = points;
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

function isBallCaught(ball) {
    debugger;
    const basket = document.getElementById('basket');
    const ballRect = ball.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    return (
        ballRect.bottom >= basketRect.top &&
        ballRect.top <= basketRect.bottom &&
        ballRect.right >= basketRect.left &&
        ballRect.left <= basketRect.right
    );
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
    document.querySelector(".gameHeader").classList.add("hide");
    document.querySelector("#gameContainer").classList.add("hide");
    document.querySelector(".finalScore").classList.remove("hide");
    document.querySelector("#score").innerHTML = points;

    resetGame();
}

function resetGame() {
    points = 0;
    lives = 3;
    document.getElementById('points').textContent = points;
    document.getElementById('lives').textContent = lives;
    // document.querySelector('button').style.display = 'block';
    document.querySelectorAll('.ball').forEach(ball => ball.remove());
    // window.location = "/shaver/gameEnd.html";
}

var draggable = document.getElementById('basket');
draggable.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.targetTouches[0];
// Place element where the finger is
    newLeftVal = touch.pageX;
    // alert(newLeftVal);
    draggable.style.left = newLeftVal + "px";
}, false);


document.addEventListener('keydown', moveBasket);
function start(){
    document.querySelector(".defaultHeader").classList.add("hide");
    document.querySelector(".welcomeContainer").classList.add("hide");
    document.querySelector(".gameHeader").classList.remove("hide");
    document.querySelector("#gameContainer").classList.remove("hide");
    shaverHeight = parseInt(document.getElementById("basket").getBoundingClientRect().height);
    gameInterval = setInterval(createBall, 2000);
    document.addEventListener("DOMContentLoaded", function () {
        // Code to dynamically inject the image tag here
        console.log("Starting Game..")
    });
}