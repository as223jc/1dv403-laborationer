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
	}	
	
	result.names = names.sort(function(a, b){
        return a.localeCompare(b)});
        
	for (i = 0; i < names.length; i++) {
		namn += names[i];
		if(i < names.length - 1)
			namn += ", ";
	}
	
	avgAge = avgAge / persArr.length;
	
	avgAge = Math.round(avgAge);
	ages.sort();
	
   
        
	result = {minAge : ages[0], maxAge : ages[persArr.length-1], averageAge : avgAge, names : namn};
    
	return result;
};


var data = [{name: "Öohn Häggerud", age: 37}, {name: "Åohan Leitet", age: 36}, {name: "Äats Loock", age: 46}];

var result = makePerson(data);

console.log(result);