$(function(){
				var j = 0;
				var l = 0;
				$('.weix').hover(function(){
					$('.er').show();
				},function(){
					$('.er').hide();
				})
				$('.weix1').hover(function(){
					$('.er1').show();
				},function(){
					$('.er1').hide();
				})
				var time = setInterval(function(){
					j++;
						$('.img li').eq(j).addClass('active').siblings().removeClass('active');
						if(j == $('.img li').length-1){
							j=0;
						}
				},4000);
				$('.c_r li').mouseover(function(){
						var i = $(this).index();
						$('.bo_1 dl').eq(i).addClass('on').siblings().removeClass('on');
					})
				$('.m_r li').mouseover(function(){
						var e = $(this).index();
						$('.bo_2 dl').eq(e).addClass('on').siblings().removeClass('on');
					})
				var first = $('.about_our li').first().clone();
				$('.about_our').append(first).width($('.about_our li').length * ($('.about_our li').width()));
				$('.right').click(function(){
					l++;
					if(l == $('.about_our li').length){
						l=1;
						$('.about_our').css({left:0});
					}
					$('.about_our').stop().animate({left: -l * 1200},500);
				});
				$('.left').click(function(){
					l--;
					if(l == -1){
						l=$('.about_our li').length-2;
						$('.about_our').css({left:-($('.about_our li').length-1) * 1200});
					}
					$('.about_our').stop().animate({left: -l * 1200},500);
				});
				var timer = setInterval(function(){
					l++;
					if(l == $('.about_our li').length){
						l=1;
						$('.about_our').css({left:0});
					}
					$('.about_our').stop().animate({left: -l * 1200},500);
				},4000);
				$('.transition').hover(function(){
					clearInterval(timer);
				},function(){
					timer = setInterval(function(){
					l++;
					if(l == $('.about_our li').length){
						l=1;
						$('.about_our').css({left:0});
					}
					$('.about_our').stop().animate({left: -l * 1200},500);
				},4000)
				});
				$('.a_top li').mouseover(function(){
					var o = $(this).index();
					$('.a_top li').eq(o).addClass('in').siblings().removeClass('in');
					$('.a_cc li').eq(o).addClass('effect').siblings().removeClass('effect');
				})
				$(".i_top li img").hover(function(){
    	           $(this).stop().animate({marginTop:-10},300)
		           },function(){
        	       $(this).stop().animate({marginTop:0},300)
                })
				function scrollTo(ele, speed){
	                if(!speed) speed = 300;
	                if(!ele){
		            $("html,body").animate({scrollTop:0},speed);
	                }else{
		            if(ele.length>0) $("html,body").animate({scrollTop:$(ele).offset().top+ -180 +'px'},speed);
	                }
	                return false;
                    }
				$('.slippage li').click(function(){
					var q = $(this).index();
					switch(q){
						case 0:
						scrollTo('.our')
						break;
						case 1:
						scrollTo('.consultation')
						break;
						case 2:
						scrollTo('.major')
						break;
						case 3:
						scrollTo('.assessment')
						break;
						case 4:
						scrollTo('.experience')
						break;
						case 5:
						scrollTo('.footer')
						break;
					}
				})
			})