var gameObjects = (function () {
    var direction = {
        up: {
            dx: 0,
            dy: -1
        },
        down: {
            dx: 0,
            dy: 1
        },
        left: {
            dx: -1,
            dy: 0
        },
        right: {
            dx: 1,
            dy: 0
        }
    };

    function GameObject(position) {
        this.position = position;
        this.size = 20;
    }

    function MovingObject(position, direction) {
        GameObject.call(this, position);
        this.name = name;
        this.direction = direction;
        this.speed = 1;
        this.svgForm = null;
    }

    MovingObject.prototype = new GameObject();
    MovingObject.prototype.constructor = MovingObject;

    MovingObject.prototype.move = function (speed) {
        this.position.x += speed * direction[this.direction].dx;
        this.position.y += speed * direction[this.direction].dy;
    };

    function Ghost(position, direction, imgNumber) {
        MovingObject.call(this, position, direction);
        this.appearance = 'images/ghost-' + imgNumber + '.png';
        this.possibleDirections = null;
    }

    Ghost.prototype = new MovingObject();
    Ghost.prototype.constructor = Ghost;

    Ghost.prototype.getRandomOtherDirection = function () {
        this.direction = this.possibleDirections[
            Math.floor(Math.random() * this.possibleDirections.length)
        ];
    };

    Ghost.prototype.canSeePacMan = function (pacman, level) {
        var i, min, max;

        if (this.position.x !== pacman.position.x && this.position.y !== pacman.position.y) {
            return false;
        }

        if (this.position.y === pacman.position.y) {
            min = Math.min(this.position.x, pacman.position.x);
            max = Math.max(this.position.x, pacman.position.x);
            for (i = min + 1; i < max; i += 1) {
                if (level[this.position.y][i] === 1) {
                    return false;
                }
            }
        }

        if (this.position.x === pacman.position.x) {
            min = Math.min(this.position.y, pacman.position.y);
            max = Math.max(this.position.y, pacman.position.y);
            for (i = min + 1; i < max; i += 1) {
                if (level[i][this.position.x] === 1) {
                    return false;
                }
            }
        }

        return true;
    };

    Ghost.prototype.chasePacMan = function (pacman) {
        if (this.position.x === pacman.position.x) {
            if (this.position.y < pacman.position.y) {
                this.direction = 'down';
            } else {
                this.direction = 'up';
            }
        } else if (this.position.y === pacman.position.y) {
            if (this.position.x < pacman.position.x) {
                this.direction = 'right';
            } else {
                this.direction = 'left';
            }
        }
    };

    Ghost.prototype.isRunningAgainsPacman = function (pacman) {
        if (this.position.y === pacman.position.y &&
            this.position.x < pacman.position.x &&
            this.direction === 'right') {
            return true;
        } else if (this.position.y == pacman.position.y &&
            this.position.x > pacman.position.x &&
            this.direction === 'left') {
            return true;
        } else if (this.position.x == pacman.position.x &&
            this.position.y < pacman.position.y &&
            this.direction === 'down') {
            return true;
        } else if (this.position.x == pacman.position.x &&
            this.position.y > pacman.position.y &&
            this.direction === 'up') {
            return true;
        }

        return false;
    };

    Ghost.prototype.escapePacMan = function (pacman) {
        var escapeDirection,
            getCaughtDirection;

        if (this.position.x === pacman.position.x) {
            if (this.position.y < pacman.position.y) {
                escapeDirectiondirection = 'up';
                getCaughtDirection = 'down';
            } else {
                escapeDirectiondirection = 'down';
                getCaughtDirection = 'up';
            }
        } else if (this.position.y === pacman.position.y) {
            if (this.position.x < pacman.position.x) {
                escapeDirection = 'left';
                getCaughtDirection = 'right';
            } else {
                escapeDirection = 'right';
                getCaughtDirection = 'left';
            }
        }

        if (this.possibleDirections.indexOf(escapeDirection) !== -1) {
            this.direction = escapeDirection;
        } else {
            if (this.possibleDirections.length > 1) {
                this.possibleDirections.splice(this.possibleDirections.indexOf(getCaughtDirection), 1);
            }

            this.direction = this.possibleDirections[
                Math.floor(Math.random() * this.possibleDirections.length)
            ];
        }
    };

    Ghost.prototype.checkPossibleDirections = function (level) {
        this.possibleDirections = [];

        if (level[this.position.y][this.position.x - this.speed] !== 1) {
            this.possibleDirections.push('left');
        }

        if (level[this.position.y][this.position.x + this.speed] !== 1) {
            this.possibleDirections.push('right');
        }

        if (level[this.position.y + this.speed][this.position.x] !== 1) {
            this.possibleDirections.push('down');
        }

        if (level[this.position.y - this.speed][this.position.x] !== 1) {
            this.possibleDirections.push('up');
        }
    };

    Ghost.prototype.checkPossibleTurns = function (level) {
        this.possibleDirections = [this.direction];

        if (level[this.position.y][this.position.x - this.speed] !== 1) {
            if (this.direction !== 'right') {
                this.possibleDirections.push('left');
            }
        }

        if (level[this.position.y][this.position.x + this.speed] !== 1) {
            if (this.direction !== 'left') {
                this.possibleDirections.push('right');
            }
        }

        if (level[this.position.y + this.speed][this.position.x] !== 1) {
            if (this.direction !== 'up') {
                this.possibleDirections.push('down');
            }
        }

        if (level[this.position.y - this.speed][this.position.x] !== 1) {
            if (this.direction !== 'down') {
                this.possibleDirections.push('up');
            }
        }
    };

    function PacMan(position, name, direction) {
        MovingObject.call(this, position, direction);
        this.name = name;
        this.radius = 0.5;
        this.lives = 3;
    }

    PacMan.prototype = new MovingObject();
    PacMan.prototype.constructor = PacMan;

    return {
        getPacMan: function (position, name, direction) {
            return new PacMan(position, name, direction);
        },
        getGhost: function (position, direction, imgNumber) {
            return new Ghost(position, direction, imgNumber);
        },
        getDirections: function () {
            return direction;
        }
    };
}());
