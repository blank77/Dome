$(function(){
	$('.Button li').mouseover(function(){
		var index = $(this).index();
//		$('.Button li a').eq(index)
		$(this).find('a').css({
			transform: 'translateY(-50%) scale(3)',
            opacity: '1'
		})
		$(this).find('a').find('img').css({
            opacity: '1'
		})
		$('.introduce dd').eq(index).stop().animate({
			opacity: '1'
		})
	})
	$('.Button li').mouseout(function(){
		var index = $(this).index();
//		$('.Button li a').eq(index)
		$(this).find('a').css({
			transform: 'translateY(-50%) scale(1)',
            opacity: '.1'
		})
		$(this).find('a').find('img').css({
            opacity: '0'
		})
		$('.introduce dd').eq(index).stop().animate({
			opacity: '0'
		})
	})
	$('.Button li').click(function(){
		var l =$(this).index();
		$('.conter_').stop().animate({top: -l * 100+'%' },300);
		$('.Button li a').removeClass('in');
		$(this).find('a').addClass('in');
		$('.in img').removeClass('active');
		$(this).find('a').find('img').addClass('active');
	})
	$('.conter_ dt').on('mousewheel', function(event,delta) {
    	var l =$(this).index();
    	var dir = delta>0?l-=1:l+=1;
    	if(l<0){
    		l=4;
		$('.conter_').stop().animate({top:  -l * 100+'%' },300);
    	}else{
    		if(l>4)
    		l=0;
    		$('.conter_').stop().animate({top:  -l * 100+'%' },300);
    	}
    	$('.Button li a').removeClass('in');
		$('.Button li').eq(l).find('a').addClass('in');
		$('.in img').removeClass('active');
		$('.Button li').eq(l).find('a').find('img').addClass('active');
        });
})