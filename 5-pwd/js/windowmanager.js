"use strict";



var windowManager = windowManager || {};
windowManager.util = windowManager.util || {};

var _startX = 0;   
var _startY = 0;
var _offsetX = 0;   
var _offsetY = 0;
var _dragElement;   
var newZindex = 100;
var offHeight;
var offWidth;

windowManager.util.createWindow = function (type, number, loader, resize) {
    this.bg = document.createElement("div");
    this.exitButton = document.createElement("a");
    this.menu = document.createElement("div");
    this.arkivLink = document.createElement("a");
    this.loadImg = document.createElement("img");
    this.status = document.createElement("div");
    this.resize = document.createElement("a");
    this.statusMsg = document.createElement("p");
    this.thisWindow;
    this.bg.className = "windowz";
    this.wrapDiv = document.createElement("div");
    this.wrapDiv.className = "wrapDiv";
    this.wrapDiv.id = "wrapDiv" + number;    
    this.wrapDiv.style.zIndex = number;
    switch (type) {
        case "Bildgalleri":
            this.bg.id = "bilder" + number;
            this.thisWindow = document.getElementById("bilder" + number);
            break;
        case "Memory":
            this.bg.id = "memory" + number;
            this.thisWindow = document.getElementById("memory" + number);
            break;
        case "Rss":
            this.bg.id = "rss" + number;
            this.thisWindow = document.getElementById("rss" + number);
            break;
        default:
            this.bg.id = "bilder" + number;
            this.thisWindow = document.getElementById("bilder" + number);
    }
    if (number > 0) {
        this.wrapDiv.style.top += (windowManager.util.ExtractNumber(this.wrapDiv.style.top) + number * 25) + "px";
        this.wrapDiv.style.left += (windowManager.util.ExtractNumber(this.wrapDiv.style.left) + number * 25) + "px";
    }
    this.menu.className = "titlez";    
    this.menu.onmousedown = windowManager.util.onMouseDown;

    this.arkivLink.innerHTML = type;
    this.arkivLink.href = "#";
    this.arkivLink.id = "exit" + number;
    this.arkivLink.className = "arkivLink";
    this.arkivLink.onclick = function () {
        return false;
    }

    this.exitButton.id = "exit" + number;
    this.exitButton.href = "#";
    this.exitButton.className = "exitButton";
    this.exitButton.innerHTML = "X";
    this.exitButton.onclick = function (e) {
        var currId = document.getElementById(this.parentElement.parentElement.id);
        currId.remove();
        return false;
    }

    this.menu.appendChild(this.arkivLink);
    this.menu.appendChild(this.exitButton);

    this.wrapDiv.appendChild(this.menu);

    this.loadImg.src = "img/ajax-loader.gif";
    this.loadImg.className = "loaderimage";
    this.loadImg.id = "loaderIcon" + number;
    if (loader) {
        this.bg.appendChild(this.loadImg);
    }
    this.status.className = "statusDiv";
    this.statusMsg.innerHTML = "Laddades på 12 ms";
    this.statusMsg.className = "statusMsg";
    this.resize.innerHTML = "o";
    this.resize.href = "#";
    this.resize.className = "resizeButton";
    this.resize.onmousedown = windowManager.util.onMouseDown;

    this.resize.onmouseup = windowManager.util.onMouseUp;
    this.status.appendChild(this.statusMsg);
    if (resize) {
        this.status.appendChild(this.resize);
    }
    this.wrapDiv.appendChild(this.status);
    this.wrapDiv.appendChild(this.bg);
    if (document.body != null) { document.body.appendChild(this.wrapDiv); }
    return false;
};


windowManager.util.onMouseDown = function (e) {
    this.windowmanager = windowManager.util;
    this.target = e.target;

    if (e.button === 0 && (this.target.className === "titlez" || this.target.className === "statusDiv")) {
        this.target.parentNode.style.zIndex = newZindex++;
    } else {
        if (this.target.className === "windowz") {
            this.target.style.zIndex = newZindex++;
        }
    }
    if (e.button === 0 && this.target.className === "titlez") {       
        _startX = e.clientX;
        _startY = e.clientY;
        _offsetX = this.windowmanager.ExtractNumber(this.target.parentNode.style.left);
        _offsetY = this.windowmanager.ExtractNumber(this.target.parentNode.style.top);
        _dragElement = this.target.parentNode;
        document.onmousemove = windowManager.util.onMouseMove;
        document.onmouseup = windowManager.util.onMouseUp;
        return false;
    }
    if (e.button === 0 && e.target.className === "resizeButton") {
        _startX = e.clientX;
        _startY = e.clientY;
        _offsetX = this.windowmanager.ExtractNumber(e.target.parentNode.parentNode.style.left);
        _offsetY = this.windowmanager.ExtractNumber(e.target.parentNode.parentNode.style.top);
        offHeight = document.getElementById(e.target.parentNode.parentNode.id).offsetHeight;
        offWidth = document.getElementById(e.target.parentNode.parentNode.id).offsetWidth;
        _dragElement = e.target.parentNode.parentNode;
        document.onmousemove = windowManager.util.resizeWindow;
        document.onmouseup = windowManager.util.onMouseUp;
        return false;
    }

};


windowManager.util.onMouseMove = function (e) {    
    this.windowmanager = windowManager.util;
    if (this.windowmanager.ExtractNumber(_dragElement.style.left) >= 0 && this.windowmanager.ExtractNumber(_dragElement.style.left) <= 1640) {
        _dragElement.style.left = (_offsetX + e.clientX - _startX) + "px";
        if (this.windowmanager.ExtractNumber(_dragElement.style.top) >= 0 && this.windowmanager.ExtractNumber(_dragElement.style.top) <= 535) {
            _dragElement.style.top = (_offsetY + e.clientY - _startY) + "px";
        }
    }
    if (this.windowmanager.ExtractNumber(_dragElement.style.left) < 0) {
        _dragElement.style.left = "0px";
    }
    if (this.windowmanager.ExtractNumber(_dragElement.style.left) > 1640) {
        _dragElement.style.left = "1640px";
    }
    if (this.windowmanager.ExtractNumber(_dragElement.style.top) < 0) {
        _dragElement.style.top = "0px";
    }
    if (this.windowmanager.ExtractNumber(_dragElement.style.top) > 535) {
        _dragElement.style.top = "535px";
    }


};

windowManager.util.resizeWindow = function (e) {
    _dragElement.style.width = ( e.clientX - _startX) + (offWidth) + "px";
    _dragElement.style.height = ( e.clientY - _startY) + (offHeight) + "px";

    //debugging//
    //document.getElementById("data").innerHTML = "" +
        //"(style-left x:" + _dragElement.style.left + ", y:" + _dragElement.style.top + ")" + " <br><br>" + 
        //"clientX: " + e.clientX + "px, clientY: " + e.clientY + "px<br><br>" +
        //"offsetx: " + _offsetX + ". offsety: " +_offsetY + "<br><br>Width: " + offWidth + ". Height: "+ offHeight ;
}

windowManager.util.onMouseUp = function (e) {
    document.onmousemove = null;
    document.onselectstart = null;
    _dragElement.ondragstart = null;
    _dragElement = null;

};

windowManager.util.ExtractNumber = function (value) {
    var n = parseInt(value);
    return n == null || isNaN(n) ? 0 : n;
};
