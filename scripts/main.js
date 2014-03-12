$("#playButton").click(function(){
	$("#playButton").toggle();
	$(".dontDisplayYet").toggle();	
})
$("#buyButton").click(function(){
	$("#log").text(game.trade({tradeType:"buy",drug:$("#drugInput").val().toLowerCase(),quantity:parseInt($("#quantityInput").val())}))
})
$("#sellButton").click(function(){
	$("#log").text(game.trade({tradeType:"sell",drug:$("#drugInput").val().toLowerCase(),quantity:parseInt($("#quantityInput").val())}))
})
$("#moveButton").click(function(){
	game.move($("#locationInput").val())
	$("#location span").text(game.player.location)
})