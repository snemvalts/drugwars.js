$("#playButton").click(function(){
	$("#playButton").toggle();
	$(".dontDisplayYet").toggle();	
})
$("#buyButton").click(function(){
	if(parseInt($("#quantityInput").val()) > 0){
	$("#log #status").text(game.trade({tradeType:"buy",drug:$("#drugInput").val().toLowerCase(),quantity:parseInt($("#quantityInput").val())}))
	$("#stock span").text(getInventory())
	$("#log #money span").text(game.player.money)
}
})
$("#sellButton").click(function(){
	if(parseInt($("#quantityInput").val()) > 0){
	$("#log #status").text(game.trade({tradeType:"sell",drug:$("#drugInput").val().toLowerCase(),quantity:parseInt($("#quantityInput").val())}))
	$("#stock span").text(getInventory())
	$("#log #money span").text(game.player.money)
}
})
$("#moveButton").click(function(){
	game.move($("#locationInput").val())
	$("#location span").text(game.player.location)
})
$("#getDebtButton").click(function(){
	$("#log #status").text(game.getDebt(parseInt($("#debtInput").val())))
	$("#log #money span").text(game.player.money)
})
$("#payDebtButton").click(function(){
	$("#log #status").text(game.payDebt(parseInt($("#debtInput").val())))
	$("#log #money span").text(game.player.money)
})
$("#getQuotesButton").click(function(){
	$("#log #status").text("The drug "+$("#drugInput").val()+" costs $"+game.prices[$("#drugInput").val()])
})

function getInventory(){
	var stringToSend = "";
	for(var i in game.player.stocks){
		stringToSend+=i+": "+game.player.stocks[i]+", ";
	}
	return stringToSend.substring(0,stringToSend.length-2);
}