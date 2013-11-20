"use strict";

window.onload = function(){
	
	var secret = Math.floor((Math.random()*100)+1);
	var NumberOfGuesses = 0;
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number){
		try{
			console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
			NumberOfGuesses++;
			if(isNaN(number) || number === "") 
				throw "Du kan enbart ange siffror.";
			if(number>100 || number<0)
				return [false, "Talet är utanför intervallet 0 - 100"];	
			if(number==secret)
				return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + NumberOfGuesses + " gissningar för att hitta det."];
			if(number<secret)
				return [false, "Det hemliga talet är högre!"];
			if(number>secret)
				return [false, "Det hemliga talet är lägre!"];	
			}
			catch (err)
			 {
			 	return [false, err];
			 }

	};
	
	// ------------------------------------------------------------------------------




	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};