define([
    "jquery",
    "views/modules/dashline_noview",
    "views/modules/orders",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (dashline, visitors) {
    var columns = [
        {id: "id", header: "商品ID", fillspace:true},
        {id: "name", header: "产品名称", fillspace:true},
        {id: "cat_one", header: "一级类目", fillspace:true},
        {id: "cat_two", header: "二级类目", fillspace:true},
        {id: "cat_three", header: "三级类目", fillspace:true},
        {id: "costs", header: "成本价", fillspace:true},
        {id: "group_count", header: "拼团数量", fillspace:true},
        {id: "group_amount", header: "拼团总额", fillspace:true},
        {id: "shop_count", header: "购物金数量", fillspace:true},
        {id: "shop_amount", header: "购物金总额", fillspace:true},
        {id: "recommend_count", header: "推荐赚数量", fillspace:true},
        {id: "recommend_amount", header: "推荐赚总额", fillspace:true},
        {id: "group_profit", header: "拼团预估利润", fillspace:true},
        {id: "shop_profit", header: "购物金预估利润", fillspace:true},
        {id: "recommend_profit", header: "推荐赚预估利润", fillspace:true},
        {id: "total_count", header: "总计销售数量", fillspace:true},
        {id: "total_amount", header: "总计销售金额", fillspace:true},
        {id: "total_profit", header: "预估总计销售利润", fillspace:true},
        {id: "seller", header: "供应商名称", fillspace:true}
    ];


    var postObj = {};

    var GetValues = function(){
        var dateTo = $$("dateTo").getValue();
        postObj = {
            start_date : dateTo.start ? dateTo.start : 0,
            end_date : dateTo.end ? dateTo.end : 0,
            goods_type : $$("treeType").getChecked() ? $$("treeType").getChecked() : "",
            shopType : $$("shopType").getValue() ? $$("shopType").getValue() : ""
        };
    };

    var Total = "";

    var AjaxLoad = function (page,count){

        var grid = $$("productsData");

        count = count ? count : 15;

        page = grid.getPage() ? grid.getPage() * count : 0 ;

        var url = '/Index/Salecont/getDataList?start='+page+'&count='+count;
        grid.clearAll();
        webix.ajax().post(url,postObj,function(jsonArr){
            jsonArr = JSON.parse(jsonArr);
            Total = jsonArr.length;
            grid.parse(jsonArr,"json");
            $$("pagerA").refresh();
        });
    };

    var grid = {
        container: "testA",
        id: "productsData",
        view: "datatable",
        select: true,
        columns: columns,
        pager: "pagerA",
        navigation: true,
        datafetch: 15,
        resizeColumn:true,
        data:[],
        ready: AjaxLoad
    };


    var layout = {
        type: "space",
        rows: [
            {
                // height: 40,
                cols: [
                    { 	view:"daterangepicker", id:"dateTo", name:"default", width:500, label:"日期区间",format:"%Y/%m/%d",labelAlign:"right", stringResult:true,
                        value:{start: "", end: ""}
                    },
                    {
                        view:"text",
                        label:"商品类型",
                        id:"goodsType",
                        popup:"my_pop"
                    },
                    {
                        view:"multiselect",label:"商城平台",id:"shopType", labelWidth:100,labelAlign:"right", value:"Group,ShoppingGold,RecommendShopping",
                        options:[
                            {"id":"Group", "value":"拼团商城"},
                            {"id":"ShoppingGold", "value":"购物金商城"},
                            {"id":"RecommendShopping", "value":"推荐专商城"}
                        ]
                    },
                    {
                        view: "button",
                        type: "iconButton",
                        icon: "search",
                        maxWidth: 80,
                        label: "查询",
                        click: function () {
                            GetValues();

                            AjaxLoad(0,15);

                        }
                    }
                ]
            }, {
                rows: [

                    {
                        height: 140,
                        type: "wide",
                        cols: [
                            dashline_noview("/Index/Salecont/Count")
                        ]
                    }
                ]
            },
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
                                'onAfterPageChange': function (id) {
                                    AjaxLoad(id,15);
                                }
                            }
                        }
                        ]
                    }
                ]
            }

        ]

    };

    webix.ui({
        view:"popup",
        id:"my_pop",
        width:300,
        height:400,
        body:{
            view:"tree",
            template:"{common.icon()} {common.checkbox()} {common.folder()} #value#",
            threeState: true,
            id:"treeType",
            height:200,
            url:'/Index/Salecont/getTypeListTwo',
            on:{
                onAfterLoad:function(e){
                    $$("treeType").checkAll();
                },
                onItemCheck: function(values){
                    $$("goodsType").setValue($$("treeType").getChecked().length+"个商品类型");
                }
            }

        }
    }).hide();



    return {$ui: layout};
});