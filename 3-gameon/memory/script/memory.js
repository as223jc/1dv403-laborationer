"use strict";

var Memory = {
    imageArray: [],
    lastGuess: [],
    currGuess: undefined,
    cols: 4,
    rows: 4,
    clicks: 0,
    totalClicks: 0,
    init: function () {
        Memory.imageArray = RandomGenerator.getPictureArray(Memory.cols, Memory.rows);
        Memory.game();
    },
    game: function () {
        for (var i = 0; i < this.imageArray.length; i++) {
            this.gameTable(this.imageArray[i]);            
        }
    },
    gameTable: function (id) {
        var a = document.createElement("a");
        var gametable = document.getElementById("game");
        a.href = "#";        
        var img = document.createElement("img");
        img.src = "pics/0.png";
        img.id = id;
        a.onclick = function () {
            if (Memory.clicks === 0) {
                Memory.lastGuess[0] = this.firstElementChild;
            } else {
                Memory.lastGuess[1] = this.firstElementChild;
            }
            Memory.turnCard(id);
        }
        gametable.appendChild(a);
        a.appendChild(img);
    },
    turnCard: function (id) {
        var card = document.getElementById(id);
        if (this.clicks === 0) {
            this.lastGuess[0].src = "pics/" + id + ".png";
            this.clicks++;
            alert("clicks === 0: id: "+id+". clicks: "+this.clicks);
        } else {
            this.lastGuess[1].src = "pics/" + id + ".png";
            this.clicks++;
            alert("clicks > 0: id: " + id + ". clicks: " + this.clicks);
        }  
        if (this.clicks === 1 && Memory.lastGuess[0].src === Memory.lastGuess[1].src) {
            alert("par");
            this.clicks = 0;
        } else {
            this.clicks = 0;
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