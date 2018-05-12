
$(function(){
			var l = 0;
			for(var i = 0; i < $('.Broadcastimg li').length;i++){
				$('.hinge').append('<li></li>')
			}
			$('.hinge li').first().addClass('active');
			var firstimg = $('.Broadcastimg li').first().clone();
			var lastimg = $('.Broadcastimg li').last().clone();
			var towimg = $('.tow').clone();
			$('.Broadcastimg').prepend(lastimg).append(firstimg).append(towimg).width($('.Broadcastimg li').length * ($('.Broadcastimg li').width()));
			$('.Broadcastimg').css({left:-520});
			$('.next').click(function(){
				l++;
				if(l == $('.Broadcastimg li').length-3){
			     l=0;
			     $('.Broadcastimg').css({left:0});
		        }
		        $('.Broadcastimg').stop().animate(
			     {left:-520 + -l * 665}
			     ,300);
			    $('.hinge li').eq(l).addClass('active').siblings().removeClass();
			});
			$('.prve').click(function(){
				l--;
				if(l == -1){
			     l=$('.Broadcastimg li').length-4;
			     $('.Broadcastimg').css({left:-($('.Broadcastimg li').length-2)*665});
		        }
		        $('.Broadcastimg').stop().animate(
			     {left:-520 + -l * 665}
			     ,300);
		        
			    $('.hinge li').eq(l).addClass('active').siblings().removeClass();  
			});
			$('.hinge li').mouseover(function(){
				var index = $(this).index();
				 $('.Broadcastimg').stop().animate(
			     {left:-520 + -index * 665}
			     ,150);
			     $('.hinge li').eq(index).addClass('active').siblings().removeClass();
			});
			var timer = setInterval(function(){
				l++;
				if(l == $('.Broadcastimg li').length-3){
			     l=0;
			     $('.Broadcastimg').css({left:0});
		        }
		        $('.Broadcastimg').stop().animate(
			     {left:-520 + -l * 665}
			     ,300);
			    $('.hinge li').eq(l).addClass('active').siblings().removeClass();
			},1000);
			$('.Broadcast').hover(function(){
					clearInterval(timer);
			},function() {	
			timer = setInterval(function(){
				l++;
				if(l == $('.Broadcastimg li').length-3){
			     l=0;
			     $('.Broadcastimg').css({left:0});
		        }
		        $('.Broadcastimg').stop().animate(
			     {left:-520 + -l * 665}
			     ,300);
			    $('.hinge li').eq(l).addClass('active').siblings().removeClass();
			},1000);})
			var j = 0;
			$('.spot li').first().addClass('active');
			var bigimg = $('.content_top_i dd').first().clone();
			$('.content_top_i').append(bigimg).width($('.content_top_i dd').length * ($('.content_top_i dd').width()));
			$('.right').click(function(){
				j++;
				if(j == $('.content_top_i dd').length){
					j = 1;
					$('.content_top_i').css({left:0});
				}
				$('.content_top_i').stop().animate(
					{left: -j * 958}
					,500);
					if(j == $('.content_top_i dd').length-1){
						$('.spot li').eq(0).addClass('active').siblings().removeClass();
					}else{
						$('.spot li').eq(j).addClass('active').siblings().removeClass();
					}
			});
			$('.left').click(function(){
				j--;
				if(j == -1){
					j = 1;
					$('.content_top_i').css({left:-($('.content_top_i dd').length-1)*958});
				}
				$('.content_top_i').stop().animate(
					{left: -j * 958}
					,500);
					if(j == $('.content_top_i dd').length-1){
						$('.spot li').eq(0).addClass('active').siblings().removeClass();
					}else{
						$('.spot li').eq(j).addClass('active').siblings().removeClass();
					}
			});
			$('.spot li').mouseover(function(){
				var index = $(this).index();
				 $('.content_top_i').stop().animate(
			     {left: -index * 958}
			     ,250);
			     $('.spot li').eq(index).addClass('active').siblings().removeClass();
			});
			var timei = setInterval(function(){
				j++;
				if(j == $('.content_top_i dd').length){
					j = 1;
					$('.content_top_i').css({left:0});
				}
				$('.content_top_i').stop().animate(
					{left: -j * 958}
					,500);
					if(j == $('.content_top_i dd').length-1){
						$('.spot li').eq(0).addClass('active').siblings().removeClass();
					}else{
						$('.spot li').eq(j).addClass('active').siblings().removeClass();
					};
			},2000);
			$('.content_top').hover(function(){
					clearInterval(timei);
			},function() {
				timei = setInterval(function(){
				j++;
				if(j == $('.content_top_i dd').length){
					j = 1;
					$('.content_top_i').css({left:0});
				}
				$('.content_top_i').stop().animate(
					{left: -j * 958}
					,500);
					if(j == $('.content_top_i dd').length-1){
						$('.spot li').eq(0).addClass('active').siblings().removeClass();
					}else{
						$('.spot li').eq(j).addClass('active').siblings().removeClass();
					};
			},2000);
			});
		})