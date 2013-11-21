"use strict";

var makePerson = function(persArr){
	var result = {};
	var ages = [];
	var names = [];
	var avgAge = 0;
	var namn = "";

	for (var i = 0; i < persArr.length; i++) {
		ages[i] = persArr[i].age;
		avgAge += persArr[i].age;
		names[i] = persArr[i].name;
	};	
	
	names.sort();
	for (var i = 0; i < names.length; i++) {
		namn += names[i];
		if(i < names.length - 1)
			namn += ", ";
	};
	
	avgAge = avgAge / persArr.length;
	
	avgAge = Math.round(avgAge);
	ages.sort();

	result = {minAge : ages[0], maxAge : ages[persArr.length-1], averageAge : avgAge, names : namn};

	return result;
}
