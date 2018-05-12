var modelIndex = {
	userName: '',
	isdaka001: 'no',
	lxday_: '',
	iid: null,
	//主入口
	initMain: function() {
		var that = this;
		that.leftBarFixed();
		that.leftSubCatInit();
		that.leftToolQR();
		that.slickSlider();
		that.homeUserQR();
		that.loadDakaInfo();
	},
	//左侧固定
	leftBarFixed: function() {
		$("#right_sliding").scrollFollow({
			bottomObj: '.main-footer',
			marginTop: 0,
			marginBottom: 40
		});
	},
	//分类自适应
	leftSubCatInit: function() {
		$('.sub-nav li').hover(function() {
			$(this).addClass('hover');
			var catTop, catBottom;
			var sideMenuTop = $(this).find('dl').offset().top;
			var sideMenuBootom = $(this).find('dl').offset().top + $(this).find('dl').height() + 20;
			if ($(this).find('dd').length > 10) {
				$(this).find('dl').addClass('col-three');
			} else if ($(this).find('dd').length <= 10 && $(this).find('dd').length > 3) {
				$(this).find('dl').addClass('col-two');
			} else {
				$(this).find('dl').addClass('col-two');
			}
			if ($(document).scrollTop() && $(document).scrollTop() > ($('.menu-title').offset().top + $('.menu-title').height())) {
				if ($(this).find('dl').height() < $(window).height()) {
					if ((sideMenuTop + $(this).height() - $(document).scrollTop()) < $(this).find('dl').height()) {
						catTop = '-' + (sideMenuTop - $(document).scrollTop() + 1) + 'px';
						catBottom = 'auto';
					} else {
						catTop = '-1px';
						catBottom = 'auto';
					}
				} else {
					if (sideMenuTop - $(document).scrollTop() < $(this).find('dl').height()) {
						catTop = '-' + (sideMenuTop - $(document).scrollTop() + 1) + 'px';
						catBottom = 'auto';
					} else {
						catTop = '-1px';
						catBottom = 'auto';
					}
				}
			} else {
				if ($(this).find('dl').height() < ($(window).height() - $('.menu-title').offset().top - $('.menu-title').height())) {
					if (sideMenuBootom > $(window).height()) {
						if ($(this).find('dl').height() < sideMenuTop - $('.menu-title').offset().top - $('.menu-title').height()) {
							catTop = 'auto';
							catBottom = '-1px';
						} else {
							catTop = '-' + ($(this).offset().top - $('.menu-title').offset().top - $('.menu-title').height() + 1) + 'px';
							catBottom = 'auto';
						}
					}
				} else {
					if (sideMenuTop - $('.menu-title').offset().top - $('.menu-title').height() < $(this).find('dl').height()) {
						catTop = '-' + ($(this).offset().top - $('.menu-title').offset().top - $('.menu-title').height() + 1) + 'px';
						catBottom = 'auto';
					} else {
						catTop = '-1px';
						catBottom = 'auto';
					}
				}
			}
			$(this).find('dl').css({
				'top': catTop,
				'bottom': catBottom
			});
		}, function() {
			$(this).removeClass('hover');
			$(this).find('dl').removeAttr('style');
		})
	},
	leftToolQR: function() {
		$('.tools-box .info').each(function() {
			$(this).mouseenter(function() {
				$(this).find('.qrbox').stop().css('visibility', 'visible');
				$(this).find('.qrbox').stop().animate({
					left: '195px',
					opacity: '1'
				}, 300);
			}).mouseleave(function() {
				$(this).find('.qrbox').stop().animate({
					left: '225px',
					opacity: '0'
				}, 300, function() {
					$(this).css('visibility', 'hidden');
				});
			});
		})
	},
	//焦点图
	slickSlider: function() {
		$('.slick-slider').hover(function() {
			$(this).find('.prev,.next').stop(true, true).fadeTo('show', 0.2)
		}, function() {
			$(this).find('.prev,.next').fadeOut()
		});
		$('.slick-slider').slide({
			titCell: '.hd ul',
			mainCell: '.bd ul',
			effect: 'leftLoop',
			autoPlay: true,
			delayTime: 500,
			trigger: 'click',
			interTime: 5000,
			autoPage: true
		});
	},
	homeUserQR: function() {
		$('.home-user .o li').hover(function() {
			$(this).addClass('hover');
		}, function() {
			$(this).removeClass('hover');
		});
	},
	//打开初始化
	loadDakaInfo: function() {
		var that = this;
		$('.a_sign').removeAttr('onclick');
		if (this.userName == '') { //如果用户没有登录
			$('.a_sign').attr('href', 'http://taobao.com/login.aspx?tourl=http%3a%2f%2fwww.manmanbuy.com');
			return;
		}
		//绑定事件
		that.getLXDay(this.userName);
	},
	//获取签到天数
	getLXDay: function(u) {
		var that = this;
		$.ajax({
			url: 'chart.aspx?DA=' + new Date(),
			type: 'post',
			dataType: 'html',
			data: {
				action: 'getlxday',
				u: u
			},
			success: function(ret) {
				if (ret == 'f') {
					$('.a_sign').text('请刷新后再试');
				} else {
					var islx = ret.split('|')[0];
					var lxday = ret.split('|')[1];
					if (islx == '1') { //已打卡
						that.isdaka001 = '2';
						that.yidaka();
						$('.a_sign').addClass('a_signed').text('连续' + lxday + '天签到');
						if (parseInt(lxday) < 8) {
							$('#divqd').html('今日已领积分：<span>' + lxday + '</span>');
						} else {
							$('#divqd').html('今日已领积分：<span>7</span>');
						}
						$('.a_sign').removeAttr('onclick');
						return;
					}
					that.lxday_ = lxday;
					if (lxday.indexOf('-') == -1) {
						$('.a_sign').text('连续' + lxday + '天签到');
					} else {
						$('.a_sign').text('签到领积分');
					}
					$('.a_sign').attr('onclick', 'modelIndex.actionDaka();');
				}
			}
		});
		return true;
	},
	//打卡操作
	actionDaka: function(u) {
		var that = this;
		u = this.userName;
		$('a.a_sign').css('cursor', 'wait');
		$.ajax({
			url: 'chart.aspx?DA=' + new Date(),
			type: 'post',
			dataType: 'html',
			data: {
				action: 'daka',
				u: u
			},
			success: function(ret) {
				if (ret == 'f' || ret == '0') {
					$(this).addClass('a_signed').text('请刷新后再试');
				} else {
					that.yidaka();
					$('.a_sign').addClass('a_signed').text("连续" + ret + "天签到");
					if (parseInt(ret) < 8) {
						$('#divqd').html('今日已领积分：<span>' + ret + '</span>');
						$('.home-user .u .i a').eq(1).find('strong').text(parseInt($('.home-user .u .i a').eq(1).find('strong').text()) + parseInt(ret));
					} else {
						$('#divqd').html('今日已领积分：<span>7</span>');
						$('.home-user .u .i a').eq(1).find('strong').text(parseInt($('.home-user .u .i a').eq(1).find('strong').text()) + 7);
					}
					that.lxday_ = ret;
					//弹出层
					that.modelDaka();
				}
				$('a.a_sign').css('cursor', '');
				//移除点击
				$('.a_sign').removeAttr('onclick');
			}
		});
		return true;
	},
	yidaka: function() {
		var that = this;
		if (that.isdaka001 == 'no') { //打卡后提示+分 不然提示已打卡
			that.isdaka001 = '1';
		} else {
			that.isdaka001 = '2';
		}
	},
	modelDaka: function() {
		var that = this;
		var lxday = parseInt(that.lxday_);
		if (lxday > 0 && lxday < 7) {
			if (that.isdaka001 == '1') {
				$('#dkmsg').html('<font style="color:red;">恭喜你</font>，获得' + lxday + '积分！');
				that.isdaka001 = '2';
			} else if (that.isdaka001 == '2') {
				$('#dkmsg').html('<font style="color:red;">你已签到</font>，<a href="http://taobao.com" style="font-size:12px;">去积分商城看看</font>');
			}
		} else {
			$('#dkmsg').html('恭喜你，签到成功！');
		}
		$('#disleftdown').html('<a href="http://taobao.com/jifenHistory.aspx" target="_blank" style="color: #5183C0;">查看积分明细</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		$('#disWydp').show();
		var pageWidth = $(document).width();
		$('#disWydp').css('left', pageWidth / 2 - 135 + 'px');
		that.iid = setTimeout(function() {
			$('#disWydp').hide('1000');
		}, 2000);
	},
	//评价
	pingJia: function(itemID, pjType) {
		var that = this;
		$.ajax({
			url: 'chart.aspx?DA=' + new Date(),
			type: 'post',
			dataType: 'html',
			data: {
				action: 'pj',
				id: itemID,
				p: pjType
			},
			success: function(ret) {
				if (ret == '1') {
					if (pjType == 'zhi') {
						$('#span_pj_' + itemID + '_zhi span').html(parseInt($('#span_pj_' + itemID + '_zhi span').html()) + 1);
					} else if (pjType == 'buzhi') {
						$('#span_pj_' + itemID + '_buzhi span').html(parseInt($('#span_pj_' + itemID + '_buzhi span').html()) + 1);
					} else {}
					$('#dkmsg').html('<font style="font-size:12px;">感谢你的打分！</font>');
				} else if (ret == '0') {
					$('#dkmsg').html('<font style="font-size:12px;">请不要重复打分！</font>');
				} else if (ret == '-1') {
					$('#dkmsg').html('<font style="font-size:12px;">发表评价失败，请稍后再试！</font>');
				} else {}
				$('#disleftdown').html('<a href="http://taobao.com" target="_blank" style="color: #5183C0;">查看更多促销</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
				$('#disWydp').show();
				var pageWidth = $(document).width();
				$('#disWydp').css('left', pageWidth / 2 - 135 + 'px');
				that.iid = setTimeout(function() {
					$('#disWydp').hide('1000');
				}, 2000);
			}
		});
		return true;
	},
	stayModel: function() {
		var that = this;
		clearTimeout(that.iid);
	},
	hideModel: function() {
		var that = this;
		that.iid = setTimeout(function() {
			$('#disWydp').hide('1000');
		}, 500);
	}
}

$(function() {
	modelIndex.userName = u_____n;
	modelIndex.initMain();
})

function pingJia(itemID, pjType) {
	modelIndex.pingJia(itemID, pjType);
}

function show1() {
	modelIndex.stayModel();
}

function hide1() {
	modelIndex.hideModel();
}