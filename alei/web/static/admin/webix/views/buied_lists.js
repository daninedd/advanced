define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (editor, topsales, products) {
    var columns = [
        {id:"id", header:"#"},
        {id:"user_id", header:"用户Id", sort:"string"},
        {id:"user_name", header:"用户昵称", sort:"string",width:130},

        {id:"user_mobile", header:"手机号", sort:"string",width:130},
        {id:"goods_id", header:"商品Id", sort:"string"},
        {id:"room_id", header:"房间号", sort:"string"} ,
        {id:"goods_name", header:"商品名称", sort:"string",width:300},
        {id:"shopping_gold_of_amount", header:"购物金消费", sort:"string"},
        {id:"amount", header:"消费金额", sort:"string"},
        {id:"balance_of_amount", header:"余额抵扣", sort:"string"},
        {id:"payment_time", header:"消费日期", sort:"string",width:200},
        {id:"biz_type", header:"消费类型", sort:"string"}
    ];

    var grid = {
        container: "testA",
        id: "productsData",
        view: "datatable",
        select: true,
        columns: columns,
        pager: "pagerA",
        resizeColumn:true,
        navigation: true,
        datafetch: 15,
        datatype: "json",
        url: '/Index/Buiedlists/getBuiedDatapage',
        "export": true,
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        }
    };

    var controls = [
        { view: "datepicker",timepicker: true,label: "开始时间",id:"start_time",stringResult:true,format:"%y-%m-%d"},
        //{ view: "button", type: "iconButton", icon: "external-link", label: "Export", width: 120, popup: exports},
        { view: "datepicker",timepicker: true,label: "结束时间",id:"end_time",stringResult:true,format:"%y-%m-%d"},
        { view: "text",label:"起始金额",id:"start_amount",maxwidth:200},
        { view: "text",label:"截止金额",id:"end_amount",maxwidth:200},
        {view:"richselect", id:"type", value: "user_id",vertical: true, options:[
            {id:"user_id", value:"用户id"},
            {id:"user_name", value:"昵称"},
            {id:"mobile", value:"手机"},
            {id:"roomid", value:"房间id"}
        ],  label:"类型", on:{
            onChange:function(){
                //var val = this.getValue();
                //if(val=="all")
                //    $$("order_filter").filter("#status#","");
                //else
                //    $$("order_filter").filter("#status#",val);
            }}
        },
        {
            id:"sear",
            view:"search",
            palceholder:"请输入要搜索的内容..",
            width:300
        },

        {view: "button",
            type: "iconButton",
            icon: "search",
            width: 150,
            label: "查询",
            click: function () {
                var start_time = $$("start_time").getValue();
                var end_time = $$("end_time").getValue();
                var start_amount = $$("start_amount").getValue();
                var end_amount = $$("end_amount").getValue();
                var type = $$("type").getValue();
                var grid = $$("productsData");
                var sear = $$("sear").getValue();
                // var date = $$('date').getValue();
                grid.clearAll();
                grid.showProgress();
                webix.delay(function () {
                    grid.load('/Index/Buiedlists/getBuiedDatapage?start_time='+start_time+'&end_time='+end_time+'&start_amount='+start_amount+'&end_amount='+end_amount+'&type='+type+'&sear='+sear+'');
                    grid.hideProgress();
                }, null, null, 300);
            }}
    ];


    var total_data = {
        height: 136,
        css: "tiles",
        template: function(data){
            var t = null;
            var items = data.items;
            var length = data.length;
            var html = "<div class='flex_tmp'>";
            for(var i=0; i < length; i++){
                t = items[i];
                html += "<div class='item "+t.css+"'>";
                html += "<div class='webix_icon icon fa-"+ t.icon+"'></div>";
                html += "<div class='details'><div class='value'>"+t.value+"</div><div class='text'>"+t.text+"</div></div>";
                html += "</div>";
            }
            html += "</div>";
            return html;
        },
        datatype:"json",
        url:"../Buiedlists/BuiedTotal"
    };

    var layout = {
        type: "space",
        rows: [
            {
                height: 40,
                cols:controls
            },
            total_data,
            {
                rows: [
                    grid,
                    {
                        view: "toolbar",
                        css: "highlighted_header header6",
                        paddingX: 5,
                        paddingY: 5,
                        height: 40,
                        cols: [{
                            view: "pager", id: "pagerA",
                            template: "{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
                            group: 10,
                            size: 15,
                            on: {
                                'onItemClick': function (id) {
                                }
                            }
                        }
                        ]
                    }
                ]
            }
        ]

    };
    return {$ui: layout};
});