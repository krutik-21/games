// $(document).on('touchmove', function (e) {
//     basket.css('left', e.touches[0].clientX);
//     Object.keys(e).forEach((prop)=> console.log(prop + ' -> ' + e[prop]));
// });

var draggable = document.getElementById('basket');
draggable.addEventListener('touchmove', function(event) {
  var touch = event.targetTouches[0];
  
  // Place element where the finger is
  draggable.style.left = touch.pageX - 105;
  event.preventDefault();
}, false);


function egg_down(egg) {
    egg_current_position = parseInt(egg.css('top'));
    egg.css('top', egg_current_position + speed);
}

function check_egg_hits_floor(egg) {
    if (collision(egg, floor)) {
        // show_bulls_eye(egg);
        decrement_life();
        return true;
    }
    return false;
}

function set_egg_to_initial_position(egg) {
    egg.css('top', egg_initial_position);
    // console.log(vals[parseInt0(Math.random()*3)])
    
}

// function show_bulls_eye(egg) {
//     bullseye_num = egg.attr('data-bullseye');
//     $('#bullseye' + bullseye_num).show();
//     hide_bulls_eye(bullseye_num);
// }

// function hide_bulls_eye(bullseye_num) {
//     setTimeout(function () {
//         $('#bullseye' + bullseye_num).hide();
//     }, 800);
// }

function decrement_life() {
    life--;
    life_span.text(life);
}

function check_egg_hits_basket(egg) {
    if (collision(egg, dish)) {
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
    if (score % 25 === 0 && speed <= max_speed) {
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
