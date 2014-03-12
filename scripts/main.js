$("#playButton").click(function(){
	$("#playButton").toggle();
	$(".dontDisplayYet").toggle();	
})
$("#buyButton").click(function(){
	$("#log #status").text(game.trade({tradeType:"buy",drug:$("#drugInput").val().toLowerCase(),quantity:parseInt($("#quantityInput").val())}))
	$("#log #money span").text(game.player.money)
})
$("#sellButton").click(function(){
	$("#log #status").text(game.trade({tradeType:"sell",drug:$("#drugInput").val().toLowerCase(),quantity:parseInt($("#quantityInput").val())}))
	$("#log #money span").text(game.player.money)
})
$("#moveButton").click(function(){
	game.move($("#locationInput").val())
	$("#location span").text(game.player.location)
})
//actually update money on debt
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