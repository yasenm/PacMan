/// <reference path="_reference.js" />
var menus = (function myfunction() {
    function Menu(container, width, height, game) {
        this.game = game;
        this.stage = new Kinetic.Stage({
            container: container,
            width: width,
            height: height
        });

        this.layer = new Kinetic.Layer();
        this.group = new Kinetic.Group();

        this.base = new Kinetic.Rect({
            fill: '#78236E',
            stroke: '#33082E',
            x: 0,
            y: 0,
            width: this.stage.width(),
            height: this.stage.height(),
            strokeWidth: 15
        });

        this.newGameButton = new Kinetic.Text({
            x: 20,
            y: 30,
            text: 'NEW GAME',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.startButton = new Kinetic.Text({
            x: 20,
            y: 80,
            text: 'RESUME',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });

        this.pauseButton = new Kinetic.Text({
            x: 20,
            y: 130,
            text: 'PAUSE',
            fontSize: 30,
            fill: '#A3A000',
            fontFamily: 'Fixedsys'
        });
    }

    Menu.prototype.draw = function () {
        this.group.add(this.base);
        this.group.add(this.newGameButton);
        this.group.add(this.startButton);
        this.group.add(this.pauseButton);
        this.layer.add(this.group);
        this.stage.add(this.layer);
    };

    Menu.prototype.bindEvents = function () {
        var self = this;

        this.newGameButton.on('mouseover', function () {
            this.fill('black');
            self.stage.draw();
        });

        this.newGameButton.on('mouseout', function () {
            this.fill('#A3A000');
            self.stage.draw();
        });

        this.newGameButton.on('click', function () {
            self.game.start();
        });

        this.startButton.on('mouseover', function () {
            this.fill('black');
            self.stage.draw();
        });

        this.startButton.on('mouseout', function () {
            this.fill('#A3A000');
            self.stage.draw();
        });

        this.startButton.on('click', function () {
            self.game.run();
        });

        this.pauseButton.on('mouseover', function () {
            this.fill('black');
            self.stage.draw();
        });

        this.pauseButton.on('mouseout', function () {
            this.fill('#A3A000');
            self.stage.draw();
        });

        this.pauseButton.on('click', function () {
            self.game.stop();
        });
    };

    return {
        getMenu: function (container, width, height, game) {
            return new Menu(container, width, height, game);
        }
    };
}());