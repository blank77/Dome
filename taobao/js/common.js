var modelCommon = {
    initMain: function() {
        var that = this;
        that.initMenu();
        that.initTopBar();
        that.initHeader();
        that.initCommonScroll();
        that.initSearchForm();
    },
    //菜单
    initMenu: function() {
        $('.menu-nav li').hover(function() {
            if ($(this).find('.sub')) {
                $(this).addClass('on');
                $(this).find('.sub').show();
                $(this).find('.mmb-iconfont').html('&#xe62b;');
            }
        }, function() {
            if ($(this).find('.sub')) {
                $(this).removeClass('on');
                $(this).find('.sub').hide();
                $(this).find('.mmb-iconfont').html('&#xe62a;');
            }
        })
    },
    initTopBar: function() {
        $('.main-topbar .topnav li').not('.navpipe').each(function() {
            $(this).hover(function() {
                if ($(this).find('.bd')) {
                    $(this).addClass('hover');
                }
                if ($(this).find('.hd .ic-arr')) {
                    $(this).find('.hd .ic-arr').html('&#xe63a;');
                }
            }, function() {
                if ($(this).find('.bd')) {
                    $(this).removeClass('hover');
                }
                if ($(this).find('.hd .ic-arr')) {
                    $(this).find('.hd .ic-arr').html('&#xe639;');
                }
            })
        });
    },
    initHeader: function() {
        $('.main-header .downapp').hover(function() {
            $('.main-header .downapp .b-down').stop(true, true).fadeIn();
        }, function() {
            $('.main-header .downapp .b-down').stop(true, true).fadeOut();
        })
    },
    initCommonScroll: function() {
        $(window).scroll(function() {
            document.documentElement.scrollTop + document.body.scrollTop > 400 ? $('.com-back .forward').fadeIn() : $('.com-back .forward').fadeOut();
        });
        document.documentElement.scrollTop + document.body.scrollTop > 400 ? $('.com-back .forward').fadeIn() : $('.com-back .forward').fadeOut();
        $('.com-back .forward').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    },
    initSearchForm: function() {;
        (function($) {
            $.searchHolder = function(searchTip) {
                $.event.special.valuechange = {
                    teardown: function(namespaces) {
                        $(this).unbind('.valuechange');
                    },
                    handler: function(e) {
                        $.event.special.valuechange.triggerChanged($(this));
                    },
                    add: function(obj) {
                        $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
                    },
                    triggerChanged: function(element) {
                        var current = element[0].contentEditable === 'true' ? element.html() : element.val(),
                            previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous')
                        if (current !== previous) {
                            element.trigger('valuechange', [element.data('previous')])
                            element.data('previous', current)
                        }
                    }
                }
                $('.head-search .panel .sInput .skey').on('valuechange', function(e, previous) {
                    if ($(this).val() != '' && $(this).val()) {
                        $('.head-search .panel .sInput label').text('');
                    } else {
                        $('.head-search .panel .sInput label').text(searchTip);
                    }
                });
                if ($('.head-search .panel .sInput .skey').val() != '') {
                    return;
                } else {
                    $('.head-search .panel .sInput label').text(searchTip);
                }
            }
        })(jQuery);

        $.searchHolder($('.head-search .panel form .skey').attr('data-bijia'));
        $('.head-search .tabs ul li').each(function(eq) {
            $(this).click(function() {
                $('.head-search .panel form').removeAttr('action');
                if (eq == 0) {
                    $('.head-search .panel form').attr('action', 'http://taobao.com/Default.aspx');
                    $.searchHolder($('.head-search .panel form .skey').attr('data-bijia'));
                    $('.head-search').removeClass('head-search-zhekou').addClass('head-search-bijia');
                } else {
                    $('.head-search .panel form').attr('action', 'http://taobao.com/searchnew.aspx');
                    $.searchHolder($('.head-search .panel form .skey').attr('data-zekou'));
                    $('.head-search').removeClass('head-search-bijia').addClass('head-search-zhekou');
                }
            });
        });
        $('.panel form').submit(function(e) {
            if ($('.head-search .panel .sInput .skey').val() == '') {
                if ($('.head-search').hasClass('head-search-bijia')) {
                    $('.head-search .panel .sInput .skey').val($('.head-search .panel form .skey').attr('data-bijia'));
                }
            }
            return true;
        });
    }
}

$(function() {
    modelCommon.initMain();
})