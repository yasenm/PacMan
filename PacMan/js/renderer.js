/// <reference path="_reference.js" />
var renderers = (function () {
    function SVGRenderer(x, y, width, height) {
        this.fieldLayer = Raphael(x, y, width, height);
        this.dotsLayer = Raphael(x, y, width, height);
        this.movingObjectsLayer = Raphael(x, y, width, height);

        this.fieldLayer.rect(0, 0, width, height)
            .attr({
                fill: 'black'
            });
    }

    SVGRenderer.prototype.renderGhost = function (ghost) {
        return this.movingObjectsLayer.image(
            ghost.appearance,
            20 * ghost.position.x,
            20 * ghost.position.y,
            ghost.size,
            ghost.size);
    };

    SVGRenderer.prototype.eraseMovingObjects = function () {
        this.movingObjectsLayer.clear();
    };

    SVGRenderer.prototype.erasePacDot = function (position) {
        this.dotsLayer.rect(
            20 * position.x,
            20 * position.y,
            20, 20
        ).attr({
            fill: 'black',
        });
    };

    function sector(paper, cx, cy, r, startAngle, endAngle) {
        var rad = Math.PI / 180;
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);

        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]);
    }

    SVGRenderer.prototype.renderPacMan = function (pacMan) {        
        return this.movingObjectsLayer.circle(
            20 * (pacMan.position.x + pacMan.radius),
            20 * (pacMan.position.y + pacMan.radius),
            20 * pacMan.radius).attr({
                stroke: 'red',
                fill: 'yellow'
            });
    };

    SVGRenderer.prototype.returnSectorPath = function (cx, cy, r, startAngle, endAngle) {
        this.returnStringPath(sector(this.movingObjectsLayer, cx, cy, r, startAngle, endAngle));
    };

    SVGRenderer.prototype.returnStringPath = function (svgForm) {
        var i,
            path = '';

        for (i = 0; i < svgForm.getPath().length; i++) {
            path += svgForm.getPath()[i].join(' ') + ' ';
        }

        return path;
    };

    SVGRenderer.prototype.renderLevel = function (level) {
        var step = 20,
            i,
            j;

        for (i = 0; i < level.length; i += 1) {
            for (j = 0; j < level[i].length; j += 1) {
                if (level[i][j] === 1) {
                    this.fieldLayer.rect(step * j, step * i, step, step)
                        .attr({
                            fill: 'purple'
                        });
                } else if (level[i][j] === 2) {
                    this.dotsLayer.circle(
                        step * j + step / 2,
                        step * i + step / 2,
                        3).attr({
                            fill: '#FF8991',
                        });
                } else if (level[i][j] === 3) {
                    this.dotsLayer.circle(
                        step * j + step / 2,
                        step * i + step / 2,
                        5).attr({
                            fill: 'orange',
                        });
                }
            }
        }
    };

    SVGRenderer.prototype.writeGameOver = function () {
        this.movingObjectsLayer.text(270, 270, 'Game Over').attr({
            'font-size': 60,
            fill: 'red'
        });
        var soundItem = document.getElementById('idsounds');
        soundItem.pause();
    };

    return {
        getSVGRenderer: function (x, y, width, height) {
            return new SVGRenderer(x, y, width, height);
        },
        getCanvasRenderer: function () {
            return new CanvasRenderer();
        }
    };
}());