function dashline_noview(url){
    return {
        $ui:{
            height: 136,
            css: "tiles",
            datatype: "json",
            url: url,
            template: function(data){
                var t = null;
                var items = data.items;
                var length = data.length;
                var html = "<div class='flex_tmp'>";
                // console.log(items.length);
                for(var i=0; i < length; i++){
                    t = items[i];
                    html += "<div class='item' style='background: "+ t.color +"'>";
                    html += "<div class='webix_icon icon fa-"+ t.icon+"'></div>";
                    html += "<div class='details'><div class='value'>"+t.value+"</div><div class='text'>"+t.text+"</div></div>";
                    // html +=  "<div class='footer'>View more <span class='webix_icon fa-angle-double-right'></span></div>";
                    html += "</div>";
                }
                html += "</div>";
                return html;
            }
        }
    };

}