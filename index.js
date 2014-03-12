"use strict";
var game = {};
game.player = {};
game.player.money = 2000;
game.player.debt = 5000;
game.player.stocks = {
	ludes: 0,
	weed: 0,
	heroin: 0,
	cocaine: 0,
	acid: 0,
	speed: 0,
};
game.day = 0;
game.deals = [];
game.player.location = "Bronx";
game.locations = ["Bronx","Central park","Manhattan","Coney Island"];
game.prices = {
	ludes: Math.floor(Math.random()*4+1)*10,
	weed: Math.floor(Math.random()*42+33)*10,
	heroin: Math.floor(Math.random()*7000+5000),
	cocaine: Math.floor(Math.random()*12000+16000),
	acid: Math.floor(Math.random()*34+10)*100,
	speed: Math.floor(Math.random()*15+7)*10,
};
game.newPrices = function(){
	game.prices = {
	ludes: Math.floor(Math.random()*4+1)*10,
	weed: Math.floor(Math.random()*42+33)*10,
	heroin: Math.floor(Math.random()*7000+5000),
	cocaine: Math.floor(Math.random()*12000+16000),
	acid: Math.floor(Math.random()*34+10)*100,
	speed: Math.floor(Math.random()*15+7)*10,
	};
};
game.getPrice = function(drug){
	return game.prices[drug];
};
game.payDebt = function(payment){
	if(game.player.location === "Bronx"){
	if(game.player.money >= payment){
		game.player.debt -= payment;
		game.player.money -= payment;
		return "Your debt: $"+game.player.debt;
	}
	else{
		return "You don't have enough money.";
	}
	}
	else{
		return "The loan shark is in Bronx.";
	}
};
game.getDebt = function(payment){
	if(game.player.location === "Bronx"){
		game.player.debt += payment;
		game.player.money += payment;
		return "Your debt: $"+game.player.debt;
	}
	else{
		return "The loan shark is in Bronx.";
	}
};
game.buy = function(options){
	var price = game.getPrice(options.drug);
	var moneyBefore = game.player.money;
	//if the total cost is greater than player money, subtract zero.
	game.player.money-= price*options.quantity > game.player.money ? 0 : price*options.quantity;
	//if no change in balance
	if(game.player.money === moneyBefore && options.quantity !== 0) return "You don't have enough money";
	game.player.stocks[options.drug]+=options.quantity;
	console.log("Trade complete. You have bought a total of",options.quantity,options.drug,"at $",price);
	console.log("You have $",game.player.money);
	game.deals.push({drug:options.drug,type:"buy",quantity:options.quantity,location:game.player.location,date:game.day, price: moneyBefore-game.player.money,drugPrice: game.getPrice(options.drug)});
	return "You currently have "+game.player.stocks[options.drug]+" "+options.drug;
};
game.sell = function(options){
	var price = game.getPrice(options.drug);
	var moneyBefore = game.player.money;
	var quantityBefore = game.player.stocks[options.drug];
	game.player.stocks[options.drug]-= options.quantity > game.player.stocks[options.drug] ? 0 : options.quantity;
	if(game.player.stocks[options.drug] === quantityBefore && options.quantity !== 0) return "You don't have enough of that drug.";
	game.player.money+= price*options.quantity;
	console.log("Trade complete. You have sold a total of",options.quantity,options.drug,"at $",price);
	console.log("You have $",game.player.money);
	game.deals.push({drug:options.drug,type:"sell",quantity:options.quantity,location:game.player.location,date:game.day, price: game.player.money-moneyBefore,drugPrice: game.getPrice(options.drug)});
	return "You currently have "+game.player.stocks[options.drug]+" "+options.drug
};
game.move = function(location){
		if(game.locations.indexOf(location) >= 0){
			game.player.location = location;
			game.day++;
			game.player.debt = Math.floor(game.player.debt * 1.1);
			game.newPrices();
		}
};
game.trade = function(options){
	if(typeof options.tradeType !== "string") return new Error("Trade type not specified");
	if(typeof options.drug !== "string") return new Error("Drug name not specified.");
	if(typeof options.quantity !== "number") return new Error("Drug quantity not specified.");
	if(options.tradeType === "buy"){
		return game.buy(options);
	}
	if(options.tradeType === "sell"){
		return game.sell(options);
	}
};
console.log(game.trade({tradeType:"buy",drug:"speed",quantity:5}));
game.move("Central park");
console.log(game.player.location);
console.log(game.trade({tradeType:"sell",drug:"speed",quantity:5}));
console.log(game.getPrice("cocaine"));
game.move("Bronx");
console.log(game.payDebt(game.player.money));
game.move("Central park");
console.log(game.player.debt);
console.log(game.deals);