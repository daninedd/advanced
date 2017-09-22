define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (editor, topsales, products) {
    var columns = [
        { id:"id", header:"订单id",width:100},
        { id:"user_id", header:"用户id",width:80},
        { id:"username", header:"用户姓名",width:150},
        { id:"usermobile", header:"用户手机",width:150},
        //{ id:"goods_name", header:"商品名称",width:150},
        { id:"oamount", header:"订单金额",width:100},
        { id:"recharge_of_amount", header:"三方支付",width:80},
        { id:"balance_of_amount", header:"余额支付",width:80},
        { id:"shopping_gold_of_amount", header:"购物金支付",width:80},
        { id:"ono", header:"平台订单号",width:180},
        { id:"obiz_status", header:"平台订单状态",width:100},
        //{ id:"obiz_type", header:"平台订单类型",width:60},
        { id:"rno", header:"充值订单号",width:200},
        { id:"rbiz_status", header:"充值订单状态",width:100},
        //{ id:"rbiz_type", header:"充值订单类型",width:60},
        { id:"vendor_recharge_no", header:"三方流水号",width:280},
        //{ id:"winning", header:"是否赢得拼团",width:50}

    ];

    var grid = {
        container: "testA",
        id: "productsData",
        view: "treetable",
        select: true,
        pager: "pagerA",
        columns: columns,
        resizeColumn: true,
        datatype: "json",
        url: '/Index/Orderquery/Query',
        //"export": true,
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        }
    };





    var controls = [
        {
            id: "biztype", view: "select", labelAlign: "right", label: "用户类型",value:'userid',
            options: [{id:'userid',value:'用户Id'},{id:'username',value:'用户昵称'},{id:'usermobile',value:'手机号'}]
        },
        { id:"bizvalue",view: "text",label:""},
        { id:"order_no",view: "text",label:"平台订单号"},
        { id:"recharge_no",view: "text",label:"充值订单号"},
        { id:"vendor_no",view: "text",label:"三方流水号"},
        {view: "button",
            type: "iconButton",
            icon: "search",
            width: 100,
            label: "检索",
            click: function () {
                var biztype = $$("biztype").getValue();
                var bizvalue = $$("bizvalue").getValue();
                var order_no = $$("order_no").getValue();
                var recharge_no = $$("recharge_no").getValue();
                var grid = $$("productsData");
                grid.clearAll();
                //grid.showProgress();
                webix.delay(function () {
                    grid.load('../../Index/Orderquery/Query?order_no='+order_no+'&recharge_no='+recharge_no+'&biztype='+biztype+'&bizvalue='+bizvalue);
                    //grid.hideProgress();
                }, null, null, 300);
            }
        }
    ];

    var layout = {
        type: "space",
        rows: [
            {
                height: 40,
                cols:controls
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
