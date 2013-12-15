"use strict";

var Memory = {
    imageArray: [],
    firstGuess: undefined,
    lastGuess: undefined,
    cols: 4,
    rows: 4,
    clicks: 0,
    antalPar: 0,
    totalClicks: 0,
    init: function () {
        Memory.imageArray = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);
        Memory.antalPar = Memory.cols * Memory.rows / 2;
        Memory.game();
    },
    game: function () {
        for (var i = 0; i < this.imageArray.length; i++) {
            this.gameTable(this.imageArray[i]);
        }
    },
    gameTable: function (id) {
        var that = this;
        var a = document.createElement("a");
        var gametable = document.getElementById("game");
        a.href = "#";
        var img = document.createElement("img");
        img.src = "pics/0.png";
        img.id = id;
        a.onclick = function (e) {
            var button = e.target;
            that.turnCard(button);
        }
        gametable.appendChild(a);
        a.appendChild(img);
    },
    turnCard: function (target) {
        console.log(target);
        this.clicks++;
        this.totalClicks++;
        console.log("antal klick: " + this.clicks);
        console.log("firstguess: " + this.firstGuess);
        console.log("lastguess: " + this.lastGuess);
        console.log();
        if (this.clicks === 1) {
            this.firstGuess = target;
            target.src = "pics/" + target.id + ".png";
            return;
        }

        if (this.clicks == 2) {
            this.lastGuess = target;
            target.src = "pics/" + target.id + ".png";
        }

        if (this.clicks === 2 && this.firstGuess.id === this.lastGuess.id) {
            console.log("par");
            this.antalPar--;
            console.log("antal par kvar: " + this.antalPar);
            this.clicks = 0;
            if (this.antalPar === 0) {
                alert("Grattis du har klarat spelet! Du klarade det på " + this.totalClicks / 2 + " försök.");
            }
            return;
        } else if (this.clicks === 2) {
            window.setTimeout(function () {
                Memory.firstGuess.src = "pics/0.png";
                Memory.lastGuess.src = "pics/0.png";
                Memory.clicks = 0;
            }, 1000);
        }
    },

    currCard: function (card) {
        this.currGuess = card;
    }
}

var RandomGenerator = {
    getPictureArray: function (rows, cols) {
        var numberOfImages = rows * cols;
        var maxImageNumber = numberOfImages / 2;

        var imgPlace = [];

        for (var i = 0; i < numberOfImages; i++)
            imgPlace[i] = 0;

        for (var currentImageNumber = 1; currentImageNumber <= maxImageNumber; currentImageNumber++) {
            var imageOneOK = false;
            var imageTwoOK = false;

            do {
                if (imageOneOK == false) {
                    var randomOne = Math.floor((Math.random() * (rows * cols - 0) + 0));
                    if (imgPlace[randomOne] == 0) {
                        imgPlace[randomOne] = currentImageNumber;
                        imageOneOK = true;
                    }
                }

                if (imageTwoOK == false) {
                    var randomTwo = Math.floor((Math.random() * (rows * cols - 0) + 0));

                    if (imgPlace[randomTwo] == 0) {
                        imgPlace[randomTwo] = currentImageNumber;
                        imageTwoOK = true;
                    }
                }
            }
            while (imageOneOK == false || imageTwoOK == false);
        }

        return imgPlace;
    }
}
window.onload = Memory.init;