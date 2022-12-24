$(basket).on('touchmove', function (e) {
    basket.css('left', e.pageX);
    // Object.keys(e).forEach((prop)=> console.log(prop + ' -> ' + e[prop]));
});

// const draggableElement = document.getElementById('basket');

// let isDragging = false;
// let currentX;
// let currentY;
// let initialX;
// let initialY;
// let xOffset = 0;
// let yOffset = 0;

// draggableElement.addEventListener('dragstart', function(event) {
//   initialX = event.clientX - xOffset;
//   initialY = event.clientY - yOffset;

//   if (event.target === draggableElement) {
//     isDragging = true;
//   }
// });

// draggableElement.addEventListener('drag', function(event) {
//   if (isDragging) {
//     event.preventDefault();
//     currentX = event.clientX + initialX;
//     currentY = initialY;

//     xOffset = currentX;
//     yOffset = currentY;

//     setTranslate(currentX, draggableElement);
//   }
// });

// draggableElement.addEventListener('dragend', function(event) {
//   initialX = currentX;
//   initialY = currentY;

//   isDragging = false;
// });

// function setTranslate(xPos, el) {
//   el.style.left = xPos + 'px';
// //   el.style.top = yPos + 'px';
// }


function egg_down(egg) {
    egg_current_position = parseInt(egg.css('top'));
    egg.css('top', egg_current_position + speed);
}

function check_egg_hits_floor(egg) {
    if (collision(egg, floor)) {
        show_bulls_eye(egg);
        decrement_life();
        return true;
    }
    return false;
}

function set_egg_to_initial_position(egg) {
    egg.css('top', egg_initial_position);
    if(egg.selector == '#egg1'){
        egg.css('left',(Math.random()*20)+'%')    
    }else if(egg.selector == '#egg2'){
        egg.css('left',((Math.random()*30)+30)+'%')
    }else{
        egg.css('left',((Math.random()*30)+60)+'%')
    }
    
}

function show_bulls_eye(egg) {
    bullseye_num = egg.attr('data-bullseye');
    $('#bullseye' + bullseye_num).show();
    hide_bulls_eye(bullseye_num);
}

function hide_bulls_eye(bullseye_num) {
    setTimeout(function () {
        $('#bullseye' + bullseye_num).hide();
    }, 800);
}

function decrement_life() {
    life--;
    life_span.text(life);
}

function check_egg_hits_basket(egg) {
    if (collision(egg, basket)) {
        egg_top = parseInt(egg.css('top'));
        if (egg_top < basket_top) {
            update_score();
            return true;
        }
    }
    return false;
}

function update_score() {
    score++;
    if (score % 10 === 0 && speed <= max_speed) {
        speed++;
    }
    score_span.text(score);
}

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
}

restart.click(function () {
    location.reload();
});