"use strict";

window.onload = function(){

	var birthday = function(date){
		try{
			if(!date)
				throw "Du måste ange ett födelsedatum";										
			//dagens datum
			var dagensDatum = new Date();
			var month = dagensDatum.getMonth()+1;
			var day = dagensDatum.getDate();
			var year = dagensDatum.getFullYear();
			
			//skapa ett date-objekt som inneåller personens födelsedag(årets)
			var bmon = parseInt(date.substring(5,7));
			var bday = parseInt(date.substring(8,10));
			var fodelsedag = new Date(year, bmon-1, bday);
			//delar tiden mellan dagnes datum och födelsedagne med antal ms på en dag för att få resultatet i dagar
			var ms = (fodelsedag.getTime() - dagensDatum.getTime()) / 86400000;
			//runda uppåt
			ms = Math.ceil(ms);

			//om personen har fyllt år lägger vi på ett år och subtraherar dagarna som gått sedan födelsedagen
			if(ms<0){
			 	ms = 365 + ms;
			 }
			return Math.ceil(ms);
		}
		catch(ex){
			console.log(ex);
		}	
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};