/// <reference path="_reference.js" />
var scores = (function () {
    function Score(container, width, height) {
        this.stage = new Kinetic.Stage({
            container: container,
            width: width,
            height: height
        });

        this.layer = new Kinetic.Layer();
        this.base = new Kinetic.Rect({
            fill: '#78236E',
            stroke: '#33082E',
            x: 0,
            y: 0,
            width: this.stage.width(),
            height: this.stage.height(),
            strokeWidth: 15
        });

        this.scoreBoard = new Kinetic.Text({
            x: this.base.x() + 15,
            y: this.base.y() + 20,
            text: 'Current score',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.scoreCount = new Kinetic.Text({
            x: this.scoreBoard.x(),
            y: this.scoreBoard.y() + 40,
            text: '0',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.livesText = new Kinetic.Text({
            x: this.scoreBoard.x(),
            y: this.scoreCount.y() + 60,
            text: 'Lives',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.dynamicLayer = new Kinetic.Layer();

        this.heartOne = new Kinetic.Text({
            x: 100,
            y: this.livesText.y(),
            text: '\u2665',
            fontSize: 30,
            fill: '#B52D1B',
            fontFamily: 'Fixedsys'
        });

        this.heartTwo = new Kinetic.Text({
            x: 150,
            y: this.livesText.y(),
            text: '\u2665',
            fontSize: 30,
            fill: '#B52D1B',
            fontFamily: 'Fixedsys'
        });

        this.heartThree = new Kinetic.Text({
            x: 200,
            y: this.livesText.y(),
            text: '\u2665',
            fontSize: 30,
            fill: '#B52D1B',
            fontFamily: 'Fixedsys'
        });

        this.hearts = [this.heartOne, this.heartTwo, this.heartThree];
    }

    Score.prototype.draw = function () {
        this.layer.add(this.base);
        this.layer.add(this.scoreBoard);
        this.layer.add(this.livesText);

        this.dynamicLayer.add(this.scoreCount);
        var i;
        for (i = 0; i < this.hearts.length; i++) {
            this.dynamicLayer.add(this.hearts[i]);
        }

        this.stage.add(this.layer);
        this.stage.add(this.dynamicLayer);
    };

    Score.prototype.deleteHeart = function () {
        this.dynamicLayer.clear();
        this.dynamicLayer.removeChildren();
        this.hearts.pop();
        var i;
        for (i = 0; i < this.hearts.length; i++) {
            this.dynamicLayer.add(this.hearts[i]);
        }

        this.dynamicLayer.add(this.scoreCount);
        this.stage.add(this.dynamicLayer);
    };

    Score.prototype.changeScore = function (points) {
        this.scoreCount.setText(String(points));
        this.stage.draw();
    };

    return {
        getScore: function (container, width, height) {
            return new Score(container, width, height);
        }
    };
}());