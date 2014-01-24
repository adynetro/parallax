(function(){

	$('.element').mouseenter(function(){
		$text = $(this).find('.portfolio-text');
		$img = $(this).find('.portfolio-image');
		var top_pos = 200 - ($text.height() - 40);
		$text.stop().animate({top:top_pos},200);
		$img.stop().animate({opacity: 0.4},200);
	}).mouseleave(function(){
		$text = $(this).find('.portfolio-text');
		$text.stop().animate({top:'200px'},200);
		$img.stop().animate({opacity: 1.0},200);
	});

})();

   
