def on_hit_wall(sprite, location):
    if heading == "right":
        sprite.y += 16
        sprite.vx = -50
        f_ramp(10, 20)
scene.on_hit_wall(SpriteKind.enemy, on_hit_wall)

def f_ramp(current_position: number, desired_position: number):
    global position, change
    position = current_position
    while position != desired_position:
        change = abs(desired_position - current_position) / 2
        position = position + change
        print(position)
        pause(100)

change = 0
position = 0
heading = ""
tiles.set_current_tilemap(tilemap("""
    level1
"""))
mySprite = sprites.create(img("""
        . . . . . . . c d . . . . . . . 
            . . . . . . . c d . . . . . . . 
            . . . . . . . c d . . . . . . . 
            . . . . . . . c b . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . c 6 . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . 8 6 . . . . . . . 
            . . . . . . 8 8 9 8 . . . . . . 
            . . . . . . 8 6 9 8 . . . . . . 
            . . . . . c c c 8 8 8 . . . . . 
            . . . . 8 8 6 6 6 9 8 8 . . . . 
            . . 8 f f f c c e e f f 8 8 . . 
            . 8 8 8 8 8 8 6 6 6 6 9 6 8 8 . 
            8 8 8 8 8 8 8 8 6 6 6 9 6 6 8 8 
            8 8 8 8 8 8 8 8 6 6 6 6 9 6 8 8
    """),
    SpriteKind.player)
controller.move_sprite(mySprite, 100, 100)
mySprite.set_position(71, 105)
creature = sprites.create(img("""
        . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 4 5 5 5 5 4 e f . . . 
            . . f b 3 e 4 4 4 4 e 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 e b 3 e e 3 b e 3 3 f . 
            . f 3 3 f f e e e e f f 3 3 f . 
            . f b b f b f e e f b f b b f . 
            . f b b e 1 f 4 4 f 1 e b b f . 
            f f b b f 4 4 4 4 4 4 f b b f f 
            f b b f f f e e e e f f f b b f 
            . f e e f b d d d d b f e e f . 
            . . e 4 c d d d d d d c 4 e . . 
            . . e f b d b d b d b b f e . . 
            . . . f f 1 d 1 d 1 d f f . . . 
            . . . . . f f b b f f . . . . .
    """),
    SpriteKind.enemy)
creature.set_position(20, 10)
creature.set_velocity(50, 0)
heading = "right"

def on_update_interval():
    pass
game.on_update_interval(500, on_update_interval)
