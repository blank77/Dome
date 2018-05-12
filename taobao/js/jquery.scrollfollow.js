$.fn.extend({
	scrollFollow: function (d) {
		d = d || {};
		d.container = d.container || $(this).parent();
		d.bottomObj = d.bottomObj || '';
		d.bottomMargin = d.bottomMargin || 0;
		d.marginTop = d.marginTop || 0;
		d.marginBottom = d.marginBottom || 0;
		d.zindex = d.zindex || 99;
		var e = $(window);
		var f = $(this);
		if (f.length <= 0) {
			return false
		}
		var g = f.position().top;
		var h = d.container.height();
		var i = f.css("position");
		if (d.bottomObj == '' || $(d.bottomObj).length <= 0) {
			var j = false
		} else {
			var j = true
		}
		e.scroll(function (a) {
			var b = f.height();
			if (f.css("position") == i) {
				g = f.position().top
			}
			scrollTop = e.scrollTop();
			topPosition = Math.max(0, g - scrollTop);
			if (j == true) {
				var c = $(d.bottomObj).position().top - d.marginBottom - d.marginTop;
				topPosition = Math.min(topPosition, (c - scrollTop) - b)
			}
			if (scrollTop > g) {
				if (j == true && (g + b > c)) {
					f.css({
						position: i,
						top: g
					})
				} else {
					if (window.XMLHttpRequest) {
						f.css({
							position: "fixed",
							top: topPosition + d.marginTop,
							'z-index': d.zindex
						})
					} else {
						f.css({
							position: "absolute",
							top: scrollTop + topPosition + d.marginTop + 'px',
							'z-index': d.zindex
						})
					}
				}
			} else {
				f.css({
					position: i,
					top: g
				})
			}
		});
		return this
	}
});