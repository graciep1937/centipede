namespace SpriteKind {
    export const dropper = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Projectile, sprites.dungeon.hazardHole, function (sprite, location) {
    sprites.destroy(sprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (missilesinplay < 2) {
        missilesinplay += 1
        missile = sprites.create(assets.image`missle`, SpriteKind.Projectile)
        missile.setPosition(mySprite.x, 103)
        missile.vy += -50
        pause(500)
    }
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (sprite.vx > 0) {
        sprite.vx = -50
    } else {
        sprite.vx = 50
    }
    sprite.y += 16
})
function f_ramp (current_position: number, desired_position: number, this_sprite: Sprite) {
    position = current_position
    the_difference = Math.abs(position - desired_position)
    while (the_difference > 1) {
        the_difference = Math.abs(position - desired_position)
        change = the_difference / 2
        position = position + change
        this_sprite.y = position
    }
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite)
    tiles.setTileAt(location, assets.tile`transparency16`)
    tiles.setWallAt(location, false)
})
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    missilesinplay += -1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 200)
    segments += -1
    if (segments == 0) {
        centipedealive = false
    }
})
let creature: Sprite = null
let change = 0
let the_difference = 0
let position = 0
let missile: Sprite = null
let centipedealive = false
let missilesinplay = 0
let segments = 0
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
mySprite = sprites.create(img`
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
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setPosition(71, 105)
segments = 0
missilesinplay = 0
centipedealive = false
game.onUpdate(function () {
    if (mySprite.x > 140) {
        scene.centerCameraAt(140, 0)
    }
    if (mySprite.x > 210) {
        scene.centerCameraAt(210, 0)
    }
    if (mySprite.x < 160) {
        scene.centerCameraAt(0, 0)
    }
})
game.onUpdateInterval(200, function () {
    if (segments < 10 && !(centipedealive)) {
        segments += 1
        creature = sprites.create(img`
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
            `, SpriteKind.Enemy)
        creature.setPosition(20, 10)
        creature.setVelocity(70, 0)
    } else {
        centipedealive = true
    }
})
