var MessageApp = {

    // Skapar Arrayen
	messages: [],
    
    init: function(){
    
        var button = document.getElementById("button");
        button.onclick = MessageApp.createMessage; //Ropar p� funktionen createMessage
        
        // skapar funktionen f�r entertangenten
        document.getElementById("comment").onkeydown = function(e){
            if (!e) {
                e = window.event;
            }
            
            if (e.keyCode === 13 && e.shiftKey === false) {
                MessageApp.createMessage();
                return false;
            }
        };
        
    },
    
    // Funktionen h�mtar kommentarerna och skapar nytt meddelande
    createMessage: function(){
        var text = document.getElementById("comment").value;
        var mess = new Message(text, new Date());
        MessageApp.messages.push(mess);
        MessageApp.renderMessages();
    },
    
    renderMessage: function(messageID){
        var div = document.getElementById("inmatat");
        
        //Skapar p-taggen f�r inmatad text
        var p = document.createElement("p");
        p.className = "texterna";
        p.innerHTML = MessageApp.messages[messageID].getHTMLText();
        
        // Skapar div-taggen
        var text = document.createElement("div");
        
        //l�gger in text i p-taggen
        text.appendChild(p);
        // ger texten klasssen
        text.className = "newmessage";
        
        // l�gger in p-taggen i div-taggen
        div.appendChild(text);
        
        var knappDiv = document.createElement("div");
        knappDiv.className = "buttons";
        
        //Skapar p-taggen f�r tidsst�mpeln
        var tiden = document.createElement("p");
        tiden.className = "klockan";
        tiden.appendChild(document.createTextNode(MessageApp.messages[messageID].getDateText()));
        
        // skapar "tabort-knappen"
        var imageClose = document.createElement("img");
        imageClose.setAttribute("src", "pics/delete2.png");
        // skapar l�nken p� tabort-knappen
        var linkClose = document.createElement("a");
        linkClose.setAttribute("href", "#");
        linkClose.className = "bilderna";
        linkClose.appendChild(imageClose);
        
        // skapar "klock-knappen"
        var imageClock = document.createElement("img");
        imageClock.setAttribute("src", "pics/clock.png");
        // skapar l�nken p� klock-knappen
        var linkClock = document.createElement("a");
        linkClock.setAttribute("href", "#");
        linkClock.className = "bilderna";
        linkClock.appendChild(imageClock);
        
        // l�gger in bilderna
        knappDiv.appendChild(linkClock);
        knappDiv.appendChild(linkClose);
        // l�gger in tidsst�mpeln
        knappDiv.appendChild(tiden);
        
        // l�gger in texten i divven
		text.appendChild(knappDiv);
        
        //Anropar funktionen "removeMessage" som ska ta bort meddelande
        imageClose.alt = "Radera!";
        imageClose.onclick = function(){
            MessageApp.removeMessage(messageID);
        };
        
        //Anropar funktionen "ShowTime" som ska ta visa tiden
        imageClock.alt = "Tiden";
        imageClock.onclick = function(){
            MessageApp.showTime(messageID);
        };
        
    },
    
    // Raderar meddelandet
    removeMessage: function(MessageID){
    
        var confa = confirm("Vill Ni verkligen radera detta fina meddelande?");
        if (confa === true) {
            MessageApp.messages.splice(MessageID, 1);
        }
        else {
            alert("Ej borttaget!");
        }
        MessageApp.renderMessages();
        
    },
    
    // Visar tiden
    showTime: function(messageID){
        alert("Din text skapades " + MessageApp.messages[messageID].getDate().toLocaleDateString() + " klockan " + MessageApp.messages[messageID].getDate().toLocaleTimeString());
    },
    
    renderMessages: function(){
        document.getElementById("comment").value = "";
        document.getElementById("inmatat").innerHTML = "";
        document.getElementById("nrInlagg").innerHTML = MessageApp.messages.length;
        
        for (var i = 0; i < MessageApp.messages.length; ++i) {
            MessageApp.renderMessage(i);
        }
        
    }
      
    
};

window.onload = MessageApp.init;

