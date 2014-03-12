$("#playButton").click(function(){
	$("#playButton").toggle();
	$(".dontDisplayYet").toggle();	
})
$("#buyButton").click(function(){
	$("#log").text(game.trade({tradeType:"buy",drug:$("#drugInput").val().toLowerCase(),quantity:parseInt($("#quantityInput").val())}))
})