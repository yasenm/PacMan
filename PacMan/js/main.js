/// <reference path="_reference.js" />
(function () {
    var level = levels.getLevelOne(),
        renderer = renderers.getSVGRenderer(200, 10, 560, 560),
        pacman = gameObjects.getPacMan({ x: 14, y: 22 }, 'pesho', 'up'),
        ghosts = [],
        game,
        menu,
        score = scores.getScore('score-container', 300, 200);

    ghosts.push(gameObjects.getGhost({ x: 11, y: 14 }, 'left', 1));
    ghosts.push(gameObjects.getGhost({ x: 12, y: 14 }, 'up', 1));
    ghosts.push(gameObjects.getGhost({ x: 13, y: 14 }, 'right', 1));
    ghosts.push(gameObjects.getGhost({ x: 14, y: 14 }, 'down', 1));
    ghosts.push(gameObjects.getGhost({ x: 15, y: 14 }, 'right', 1));
    ghosts.push(gameObjects.getGhost({ x: 16, y: 14 }, 'up', 1));
    ghosts.push(gameObjects.getGhost({ x: 11, y: 13 }, 'down', 1));
    ghosts.push(gameObjects.getGhost({ x: 12, y: 13 }, 'left', 1));
    ghosts.push(gameObjects.getGhost({ x: 13, y: 13 }, 'right', 1));
    ghosts.push(gameObjects.getGhost({ x: 14, y: 13 }, 'down', 1));
    ghosts.push(gameObjects.getGhost({ x: 15, y: 13 }, 'up', 1));
    ghosts.push(gameObjects.getGhost({ x: 16, y: 13 }, 'left', 1));

    game = games.get(renderer, level, pacman, ghosts, score);

    menu = menus.getMenu('menu-container', 200, 180, game);
    menu.draw();
    menu.bindEvents();
}());
