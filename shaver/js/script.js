let gameInterval;
let points = 0;
let lives = 3;
var shaverHeight, correction;
var timeout = 1700;
var acc = 4;

function createBall() {
    const ball = document.querySelector(".ballTemplate").cloneNode(true);
    ball.classList.add('ball');
    ball.classList.remove("ballTemplate");
    ball.style.left = `${Math.random() * (window.innerWidth - 70)}px`;
    document.querySelector('#gameContainer').appendChild(ball);
    animateBall(ball, ball.getBoundingClientRect().height);
}

function animateBall(ball, ballHeight) {
    const speed = Math.random() * acc + 2;
    let top = 0;
    
    const moveBall = () => {
        if (top > window.innerHeight - shaverHeight - ballHeight) {
            if (isBallCaught(ball)) {
                points++;
                document.getElementById('points').textContent = points;
                if(points%10 === 0){
                    acc += 2;
                    if(timeout >= 500){
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

function isBallCaught(ball) {
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
    newLeftVal = touch.pageX - correction;
    // alert(newLeftVal);
    draggable.style.left = newLeftVal + "px";
}, false);


document.addEventListener('keydown', moveBasket);
function start(){
    points = 0;
    lives = 3;
    document.querySelector(".defaultHeader").classList.add("hide");
    document.querySelector(".welcomeContainer").classList.add("hide");
    document.querySelector(".gameEndContainer").classList.add("hide");
    document.body.classList.add("animation");
    document.querySelector(".gameHeader").classList.remove("hide");
    document.querySelector("#gameContainer").classList.remove("hide");
    const basket = document.getElementById("basket").getBoundingClientRect();
    shaverHeight = parseInt(basket.height);
    correction = basket.width / 2;
    gameInterval = setInterval(createBall, timeout);

}