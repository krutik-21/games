var basket = $('#basket'),
    container = $('#container'),
    hen = $('.hen'),
    eggs = $('.egg'),
    egg1 = $('#egg1'),
    egg2 = $('#egg2'),
    egg3 = $('#egg3'),
    restart = $('#restart'),
    score_span = $('#score'),
    dish = $('#dish'),
    life_span = $('#life'),
    floor = $('#floor'),
    basket_height = basket.height(),
    container_height = container.height(),
    egg_height = eggs.height(),
    vals = [-10,-20,-35],
    egg_initial_position = parseInt(eggs.css('top')),
    score = 0,
    life = 5,
    speed = 2,
    max_speed = 10,
    counter = 0,
    score_updated = false,
    the_game = 0,
    anim_id = 0,
    egg_current_position = 0,
    egg_top = 0,
    basket_top = container_height - basket_height,
    bullseye_num = 0;
life_span.text(life);