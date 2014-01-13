"use strict";

var init = {
    timer: 0,
    applications: 0,
    windowAmounts:0,
    init: function () {               
        var windowmanager = windowManager.util;   
        var galleryicon = document.getElementById("imgicon");
        var memoryicon = document.getElementById("memoryicon");
        var rssicon = document.getElementById("rssicon");
        
        //högerklick//

        //document.oncontextmenu = RightMouseDown;
        //document.onmousedown = mouseDown;

        //function mouseDown(e) {
        //    if (e.which == 3) {
        //        console.log("right mouse");
        //    }
        //}
        //function RightMouseDown() { return false; }

        galleryicon.onclick = function () {           
            init.windowAmounts++;
            var newGallery = new windowManager.util.createWindow("Bildgalleri", init.windowAmounts, true, true);
            initWindows.fetchImages("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", init.windowAmounts);
            return false;
        }

        memoryicon.onclick = function () {
            init.windowAmounts++;
            var newMemory = new windowManager.util.createWindow("Memory", init.windowAmounts, false, false);
            initWindows.loadMemory("memory" + init.windowAmounts);
            return false;
        }

        rssicon.onclick = function () {
            init.windowAmounts++;
            var newRss = new windowManager.util.createWindow("Rss", init.windowAmounts, true, true);
            initWindows.loadRss("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape("http://www.aftonbladet.se/nyheter/rss.xml"), init.windowAmounts);
           return false;
        }
            


        //window.onmousedown = windowmanager.onMouseDown;
        //window.onmouseup = windowmanager.onMouseUp;
    }
}

var initWindows = {
    currObject : {},
    init: function () {
    },
    fetchImages: function (url, number) {      
        var ajaxCon = new AjaxCon(url, function (data) {
            var jsonList = new Array();
            jsonList = JSON.parse(data);
            for (var i = 0; i < jsonList.length; i++) {
                var link = document.createElement("a");
                link.href = jsonList[i].URL;
                link.className = "imgLinks";
                initWindows.currObject = jsonList[i];
                var img = document.createElement("img");
                img.src = jsonList[i].thumbURL;
                img.className = "img-viewer";
                link.height = jsonList[i].thumbHeight;
                link.width = jsonList[i].thumbWidth;
                img.className = "imageList";
                link.onclick = function () {
                    document.body.style.background = "url(" + this.href + ")";
                    return false;
                }
                link.appendChild(img);
                document.getElementById("loaderIcon" + number).className = "hidden";
                document.getElementById("bilder"+number).appendChild(link);
            }     
        });
        return false;
    },
    loadRss: function (url, number) {
        var currRss = document.getElementById("rss" + number);
        var rssDiv = document.createElement("div");
        currRss.appendChild(rssDiv);
        var ajaxCon = new AjaxCon(url, function (data) {            
            rssDiv.innerHTML = data;
            document.getElementById("loaderIcon"+number).className="hidden";
        });
        
    },
    loadMemory: function (id) {
        var div = document.createElement("div");
        div.id = "game"+init.windowAmounts;
        var gameId = document.getElementById(id);
        gameId.appendChild(div);
        var newMemory = new createWindow.Memory();
        newMemory.init();
    }
}

var createWindow = createWindow || {};

createWindow.Gallery = function () {

}

createWindow.Memory = function () {
   this.imageArray= [];
   this.firstGuess = undefined;
   this.lastGuess = undefined;
   this.cols = 4;
   this.rows = 4;
   this.clicks = 0;
   this.antalPar = 0;
   this.totalClicks = 0;
   this.init = function () {
       this.imageArray = RandomGenerator.getPictureArray(this.cols, this.rows);       
        this.antalPar = this.cols * this.rows / 2;
        this.game();
    }
   this.game = function  () {
        for (var i = 0; i < this.imageArray.length; i++) {
            this.gameTable(this.imageArray[i]);
        }
    }
   this.gameTable = function  (id) {
        var that = this;
        var a = document.createElement("a");
        var gametable = document.getElementById("game"+init.windowAmounts);
        a.href = "#";
        a.className = "memory";
        var img = document.createElement("img");
        img.src = "pics/0.png";
        img.id = id;
        a.onclick = function (e) {
            that.turnCard(e.target);
        }
        gametable.appendChild(a);
        a.appendChild(img);
    }
   this.turnCard = function (target) {
       var that = this;
        this.clicks++;
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
            this.totalClicks++;
            this.antalPar--;
            this.clicks = 0;
            if (this.antalPar === 0) {
                console.log("Grattis du har klarat spelet! Du klarade det på " + this.totalClicks + " försök.");
            }
            return;
        } else if (this.clicks === 2) {
            this.totalClicks++;
            window.setTimeout(function () {
                that.firstGuess.src = "pics/0.png";
                that.lastGuess.src = "pics/0.png";
                that.clicks = 0;
            }, 1000);
        }
    }

   this.currCard = function (card) {
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

window.onload = initWindows.init();
window.onload = init.init();
