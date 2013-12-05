"use strict";

var LabbyMezzage = {

	messages: [],
    
    init: function(){
    
        var button = document.getElementById("button");
        button.onclick = LabbyMezzage.createMessage; 

        document.getElementById("inlagg").onkeydown = function(e){
            if (!e) {
                e = window.event;
            }
            
            if (e.keyCode === 13 && e.shiftKey === false) {
                LabbyMezzage.createMessage();
                return false;
            }
        };
        
    },

    createMessage: function(){
        var text = document.getElementById("inlagg").value;
        var mess = new Message(text, new Date());
        LabbyMezzage.messages.push(mess);
        LabbyMezzage.renderMessages();
    },
    
    renderMessage: function(messageID){
        var div = document.getElementById("input");
        
        var p = document.createElement("p");
        p.className = "inlagg";
        p.innerHTML = LabbyMezzage.messages[messageID].getHTMLText();
        
        var text = document.createElement("div");
        
        text.appendChild(p);
        text.className = "nyttinlagg";
        div.appendChild(text);
        
        var knappDiv = document.createElement("div");
        knappDiv.className = "buttons";
        
        var tiden = document.createElement("p");
        tiden.className = "klockan";
        tiden.appendChild(document.createTextNode(LabbyMezzage.messages[messageID].getDateText()));
        
        var imageClose = document.createElement("img");
        imageClose.setAttribute("src", "delete.png");
        var linkClose = document.createElement("a");
        linkClose.setAttribute("href", "#");
        linkClose.className = "bilderna";
        linkClose.appendChild(imageClose);
        
        var imageClock = document.createElement("img");
        imageClock.setAttribute("src", "klocka.png");
        var linkClock = document.createElement("a");
        linkClock.setAttribute("href", "#");
        linkClock.className = "bilderna";
        linkClock.appendChild(imageClock);
        
        knappDiv.appendChild(linkClock);
        knappDiv.appendChild(linkClose);
        knappDiv.appendChild(tiden);
        
		text.appendChild(knappDiv);
        
        imageClose.alt = "Ta bort inlägg";
        imageClose.onclick = function(){
            LabbyMezzage.removeMessage(messageID);
        };
        
        imageClock.alt = "Tidpunkt för inlägg";
        imageClock.onclick = function(){
            LabbyMezzage.showTime(messageID);
        };        
    },    
    removeMessage: function(MessageID){
        LabbyMezzage.messages.splice(MessageID, 1);          
        LabbyMezzage.renderMessages();
        alert("Du har tagit bort inlägget");
    },
    
    showTime: function(messageID){
        alert("Din text skapades " + LabbyMezzage.messages[messageID].getDate().toLocaleDateString() + " klockan " + LabbyMezzage.messages[messageID].getDate().toLocaleTimeString());
    },
    
    renderMessages: function(){
        document.getElementById("inlagg").value = "";
        document.getElementById("input").innerHTML = "";
        document.getElementById("antalinlagg").innerHTML = LabbyMezzage.messages.length;
        
        for (var i = 0; i < LabbyMezzage.messages.length; ++i) {
            LabbyMezzage.renderMessage(i);
        }        
    }    
};

function Message(message, date){

    this.getText = function(){
        return message;
    };
    
    this.setText = function(_text){
        message = _text;
    };
    
    this.getDate = function(){
        return date;
    };
    
    this.setDate = function(_date){
        message = _date;
    };
}

Message.prototype.toString = function(){
    return this.getText() + " (" + this.getDate() + ")";
};

Message.prototype.getHTMLText = function(){

    return this.getText().replace(/[\n\r]/g, "<br>");
};

Message.prototype.getDateText = function(){
    return "(" + this.getDate().toLocaleTimeString() + ")";
    
};


window.onload = LabbyMezzage.init;