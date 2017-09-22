define([
    "jquery",
    "views/modules/dashline_noview",
    "views/modules/orders",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (dashline, visitors) {
    var columns = [
        {id: "id", header: "ID", fillspace:true},
        {id: "no", header: "订单号", fillspace:true},
        {id: "user_id",header:"用户id", fillspace:true},
        {id: "account",header:"支付宝",fillspace:true},
        {id: "nickname",header:"用户昵称", fillspace:true},
        {id: "mobile",header:"手机", fillspace:true},
        {id: "amount", header: "提现金额", fillspace:true},
        {id: "feeRate", header: "费率", fillspace:true},
        {id: "fee", header: "手续费", fillspace:true},
        {id: "checkout", header: "最终提现", fillspace:true},
        {id: "balance", header: "提现后账余", fillspace:true},
        {id: "vendor_withdraw_no", header: "提现流水号", fillspace:true},
        {id: "biz_type", header: "提现类型", fillspace:true},
        {id: "creation_time", header: "提现时间", fillspace:true},
        {id: "status", header: "提现状态", fillspace:true},
        {id: "vendor_withdraw_response", header: "请求结果", fillspace:true, hidden:true},
        {id: "vendor_confirm_withdrawing_response", header: "查询结果", fillspace:true, hidden:true}
    ];

    var grid = {
        container: "testA",
        id: "productsData",
        view: "datatable",
        select: true,
        columns: columns,
        pager: "pagerA",
        navigation: true,
        datafetch: 15,
        datatype: "json",
        resizeColumn:true,
        url: '/Index/Withdraw/WithdrawList',
        "export": true,
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        },
        on:{
            onItemDblClick: function (id) {
                var item = this.getItem(id);
                if(!item) return;
                webix.ui({
                    view:"window",
                    id:"my_win",
                    width: 650,
                    height: 800,
                    position: 'center', resize: true, css: 'collectModalWindow',
                    move: true, type: 'material', modal: true,
                    head: {
                        view: "toolbar", css: "win_title", cols: [{
                            view: "label", gravity: 1, align: 'center', template: function () {
                                return "<div style='font-size: 14px; padding: 0 0 0 2px; font-weight: 800;color: white'>详细</div>";
                            }
                        }, {
                            view: "icon", icon: "times-circle", gravity: 1, align: 'right',
                            click: function () {
                                $$('my_win').close();
                            }
                        }
                        ]
                    },
                    body:{
                        rows: [
                            {
                                body: {
                                    view: "scrollview", scroll: "y", id: "bindUserDialog",
                                    body: {
                                        view: "form", id: 'form3',
                                        elements: [
                                            {id:'no',labelWidth: 120,value:item.no,view: "text",label:"订单号",minWidth:200},
                                            {id: "uid",labelWidth: 120,value:item.user_id,view: "text",label:'用户ID'},
                                            {id: "nickname",labelWidth: 120,value:item.nickname,view: "text",label:'用户昵称'},
                                            {id: "account",labelWidth: 120,value:item.account,view: "text",label:'支付宝'},
                                            {id: "mobile",labelWidth: 120,value:item.mobile,view: "text",label:'手机'},
                                            {id: "amount",labelWidth: 120,value:item.amount,view: "text",label:'提现金额'},
                                            {id: "feeRate",labelWidth: 120,value:item.feeRate,view: "text",label:'费率'},
                                            {id: "fee",labelWidth: 120,value:item.fee,view: "text",label:'手续费'},
                                            {id: "checkout",labelWidth: 120,value:item.fee,checkout: "text",label:'最终提现'},
                                            {id: "balance",labelWidth: 120,value:item.balance,view: "text",label:'提现后账余'},
                                            {id: "vendor_withdraw_no",labelWidth: 120,value:item.vendor_withdraw_no,view: "text",label:'提现流水号'},
                                            {id: "biz_type",labelWidth: 120,value:item.biz_type,view: "text",label:'提现类型'},
                                            {id: "creation_time",labelWidth: 120,value:item.creation_time,view: "text",label:'提现时间'},
                                            {id: "status",labelWidth: 120,value:item.status,view: "text",label:'提现状态'},
                                            {id: "vendor_withdraw_response",labelWidth: 120,value:item.vendor_withdraw_response,view: "textarea",label:'提现状态'},
                                            {id: "vendor_confirm_withdrawing_response",labelWidth: 120,value:item.vendor_confirm_withdrawing_response,view: "textarea",label:'查询结果'},
                                        ]
                                    }
                                }
                            },
                            {
                                cols: [
                                    { view: "label", label: "" },
                                    { view: "button", label: "确定", width: 90, click: function () {
                                        $$('my_win').close();
                                    }
                                    }
                                ]
                            }
                        ]

                    }
                }).show();
            }
        }
    };

    var layout = {
        type: "space",
        rows: [
            {
                height: 40,
                cols: [
                    {view: "text", id: "minAmount", label: "最小金额", value:  ""},
                    {view: "text", id: "maxAmount", label: "最大金额", value:  ""},
                    {view: "datepicker", id: "startDate", label: "起始时间", value:  "",stringResult:true , format: "%Y-%m-%d"},
                    {view: "datepicker", id: "endDate", label: "结束时间", value:  "",stringResult:true , format: "%Y-%m-%d"},
                    {
                        id: 'biz_type',
                        view: "select",
                        label: "搜索类型",
                        value: 0,
                        options: [
                            {"id": "", "value": "请选择"},
                            {"id": "user_id", "value": "用户ID"},
                            {"id": "nickname", "value": "用户昵称"},
                            {"id": "mobile", "value": "手机号"},
                            {"id": "no", "value": "订单号"},
                            {"id": "vendorWithdrawNo", "value": "流水号"}
                        ]
                    },
                    {
                        id: 'biz_search',
                        view: "text",
                        placeholder: "搜索你要收入的信息..",
                        align: 'right'
                    },
                    {
                        view: "button",
                        type: "iconButton",
                        icon: "search",
                        maxWidth: 80,
                        label: "查询",
                        click: function () {
                            var sear_val = $$("biz_search").getValue();
                            var grid = $$("productsData");
                            var biz_type = $$('biz_type').getValue();
                            var start_date = $$('startDate').getValue();
                            var end_date = $$('endDate').getValue();
                            var min_amount = $$('minAmount').getValue();
                            var max_amount = $$('maxAmount').getValue();

                            getStr = 'sear=' + sear_val + '&biz_type=' + biz_type + '&date_start=' + start_date + '&date_end=' + end_date + '&minAmount=' + min_amount + '&maxAmount=' + max_amount;

                            var url = '/Index/Withdraw/WithdrawList';
                            grid.clearAll();
                            grid.showProgress();
                            webix.delay(function () {
                                grid.load(url + "?" + getStr);
                                grid.hideProgress();
                            }, null, null, 300);
                        }
                    }
                ]
            }, {
                rows: [

                    {
                        height: 140,
                        type: "wide",
                        cols: [
                            dashline_noview("/Index/Withdraw/Count")
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