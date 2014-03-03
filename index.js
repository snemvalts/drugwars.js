var game = {};
game.player = {};
game.player.money = 2000;
game.player.stocks = {
	ludes: 0,
	weed: 0,
	heroin: 0,
	cocaine: 0,
	acid: 0,
	speed: 0,
}
game.prices = {
	ludes: Math.floor(Math.random()*4+1)*10,
	weed: Math.floor(Math.random()*42+33)*10,
	heroin: Math.floor(Math.random()*7000+5000),
	cocaine: Math.floor(Math.random()*12000+16000),
	acid: Math.floor(Math.random()*34+10)*100,
	speed: Math.floor(Math.random()*15+7)*10,
}
game.buy = function(options){
	var price = game.prices[options.drug];
	var moneyBefore = game.player.money
	game.player.money-= price*options.quantity > game.player.money ? 0 : price*options.quantity;
	if(game.player.money === moneyBefore) return "You don't have enough money";
	game.player.stocks[options.drug]+=options.quantity
	console.log("Trade complete. You have bought a total of",options.quantity,options.drug,"at $",price);
	console.log("You have $",game.player.money)
	return "You currently have "+game.player.stocks[options.drug]+" "+options.drug
}
game.sell = function(options){
	var price = game.prices[options.drug];
	var quantityBefore = game.player.stocks[options.drug];
	game.player.stocks[options.drug]-= options.quantity > game.player.stocks[options.drug] ? 0 : options.quantity;
	if(game.player.stocks[options.drug] === quantityBefore) return "You don't have enough of that drug.";
	game.player.money+= price*options.quantity;
	console.log("Trade complete. You have sold a total of",options.quantity,options.drug,"at $",price);
	console.log("You have $",game.player.money)
	return "You currently have "+game.player.stocks[options.drug]+" "+options.drug
}
game.trade = function(options){
	if(typeof options.tradeType !== "string") return new Error("Trade type not specified");
	if(typeof options.drug !== "string") return new Error("Drug name not specified.")
	if(typeof options.quantity !== "number") return new Error("Drug quantity not specified.");
	//store reference of that number so that it doesn't change when accessing
	if(options.tradeType === "buy"){
		return game.buy(options)
	}
	if(options.tradeType === "sell"){
		return game.sell(options)
	}
}
console.log(game.trade({tradeType:"buy",drug:"heroin",quantity:10}))
console.log(game.trade({tradeType:"sell",drug:"heroin",quantity:20}))
console.log(game.trade({tradeType:"buy",drug:"speed",quantity:1}))
console.log(game.trade({tradeType:"sell",drug:"speed",quantity:1}))
