"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		try{
			console.log(str[0]);
			var stringen = "";
			//toLowerCase() 
			//toUpperCase()
			if(!str)
				throw "Du måste skicka en mening.";
			for (var i = 0; i < str.length; i++) {
				var character = str.charAt(i);
				console.log(character);
				if (character == character.toUpperCase()) {
					console.log("här inne");
			 		//stringen = stringen + character.toLowerCase();
			 		stringen += character.toLowerCase();
				}
				else if (character == character.toLowerCase()){
			 		// stringen = stringen + character.toUpperCase();
			 		stringen += character.toUpperCase();
				}
			}			
			var newString = stringen.replace(/a/gi,"#");
			return newString;
		}			

		catch (err){
			console.log(err);
			return err;
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
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};