const WATER_HEIGHT = 70;
const SWIM_HEIGHT = 30;
const JUMP_FORCE = 600;
const SPEED = 400;
const MOVEMENTSPEED = 380;

// initialize context
kaboom({
  width: 1280,
  height: 720,
})

// load assets
loadSprite("menuScreen", "sprites/menuScreen.svg");
loadSprite("factory", "sprites/factory.svg");
loadSprite("industrialPlane", "sprites/industrialPlane.svg");
loadSprite("stars", "sprites/stars.svg");
loadSprite("water", "sprites/water.svg", {
    anims: {
        sliceX: 8,
        sliceY: 1,
        wave: {
            from: 0,
            to: 7,
            speed: 16,
            loop: true
        }
    }
});


loadSprite("bear1", "sprites/happy.svg");
loadSprite("bear2", "sprites/happyJump.svg");

// spawning ice
function spawnIce() {

    // add ice obj
    add([
        rect(rand(300, 600), rand(30, 50)),
        area(),
        outline(4),
        pos(width(), height() - WATER_HEIGHT),
        anchor("botleft"),
        body({ isStatic: true }),
        color(255, 255, 255),
        move(LEFT, SPEED),
        "ice",
    ]);

    // wait a random amount of time to spawn next ice
    wait(rand(1,2), spawnIce);

}

scene("menu", () => {
    add([
        sprite("menuScreen"),
        pos(0, 0)
    ])
    // display start text
    add([
        text("Press [SPACE] to start"),
        pos(width() / 2, height() / 2-80),
        scale(1),
        anchor("center"),
    ]);
    
    // go to game with space is pressed
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
});
      
scene("game", () => {

    // define gravity
    setGravity(1600);

    // set background colour and add stars
    setBackground(54, 54, 107);
    add([
        sprite("stars"),
        pos(0, 0),
        area()
    ])

    let currentSprite = "bear1";

    // swap sprites
    function swapSprites() {
        if (currentSprite === "bear1") {
            currentSprite = "bear2";
        } else {
            currentSprite = "bear1";
        }
        player.use(sprite(currentSprite))
    }

    // add player sprite
    const player = add([
        // list of components
        sprite("bear1"),
        pos(100, 100),
        scale(0.25),
        body(),
        area()
    ]);

    // call every 0.5 seconds to create animation
    loop(0.1, () => {
        swapSprites();
    });
    
    // water
    add([
        sprite("water"),
        pos(0, height()),
        anchor("botleft"),
        area(),
        //move(LEFT, SPEED),
    ]);

    //  swimming height
    add([
        rect(width(), SWIM_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(0,0,0,),
        opacity(0),
        "swim"
    ])

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    // jump when user press space
    onKeyPress("w", jump);

    // movement left and right
    onKeyDown("d", () => {
        player.move(MOVEMENTSPEED, 0)
    })

    onKeyDown("a", () => {
        player.move(-MOVEMENTSPEED, 0)
    })
    
    onClick(jump);

    // start spawning ice
    spawnIce();

    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
        if (score == 600){
            go("industrialEra");
        }
    });
});


scene("industrialEra", () => {
    add([
        sprite("factory"),
        pos(0, 0)
    ])
    
    add([
        text("Climate change is getting worse.")
    ])

    // add([
    //     sprite("industrialPlane"),
    //     pos(300, 300),
    //     anchor("topleft"),
    //     scale(2),
    //     area(),
    //     body({ isStatic: true }),
    //     move(LEFT, SPEED),
    //     "plane",
    // ]);
  
    
    // add a game object to screen

    const player = add([
        // list of components
        sprite("bear1"),
        scale(0.15),
        pos(100, 600),
        area(),
        body(),
    ])
    
    // water
    add([
        sprite("water"),
        pos(0, height()),
        anchor("botleft"),
        area(),
        //move(LEFT, SPEED),
    ]);

    //  swimming height
    add([
        rect(width(), SWIM_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(0,0,0,),
        opacity(0),
        "swim"
    ])

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    // jump when user press space
    onKeyPress("w", jump);

    // movement left and right
    onKeyDown("d", () => {
        player.move(MOVEMENTSPEED, 0)
    })

    onKeyDown("a", () => {
        player.move(-MOVEMENTSPEED, 0)
    })
    
    onClick(jump);

    // start spawning ice
    spawnIce();

    // keep track of score
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
        if (score == 600){
            go ("2050");
        }
    });
});
scene ("2050"), ()=> {
add([
    sprite("factory2"),
    pos(0, 0)
])
add([
    text(["Life is getting harder for all living being"])
])
}
scene("lose", (score) => {

    add([
        sprite("ha"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);

    // display score
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center"),
    ]);

    // go back to game with space is pressed
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));

});


go("menu");