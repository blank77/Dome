$(function () {
    $("#skey").autocomplete({
        source: function (val, parse) {
            jQuery.support.cors = true;
			eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('3 4=\'2://0.1.8.9/7/5.6\'',10,10,'so|m|http|var|url|searchSuggestion|action|ware|jd|com'.split('|'),0,{}))

            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    'keyword': val,
                    '_format_': 'json'
                },
                dataType: 'text',
                crossDomain: true,
                success: function (r) {
                    parse(eval('(' + r + ')'));
                },
                error: function (a, b, c) {
                }
            });
        },
        format: function (value, item) {
            var itemText = item[0].replace(value, "<b class='orange'>" + value + "</b>"),
                li = $("<li/>").html(itemText).data("value", item[0]);
            return li;
        },
        isResult: function (data) {
            return eval('(' + data.searchTipList + ')').length;

        },
        dealData: function (data) {
            var n = eval('(' + data.searchTipList + ')');
            var dataArr = [];
            for (var i = 0; i < n.length; i++) {
                dataArr[i] = new Array();
				dataArr[i][0] = n[i].text;
                dataArr[i][1] = n[i].otherAttr.tipNumber;
            }
            if (dataArr[0][0].indexOf('店铺') > -1 || dataArr[0][0].indexOf('搴楅摵') > -1) {
                dataArr.splice(0, 1);
            }
            return dataArr;
        },
        onselect: function (val) {
        },
        onchange: function (val) {
        }
    });
})