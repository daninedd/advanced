define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales"
], function (editor,topsales,products) {
    var columns = [
        {id: "id"},
        {id:'no',header:"支付流水号",minWidth:200},
        {id: "uid",header:'用户ID'},
        {id: "nickname",header:'用户昵称'},
        {id: "mobile",header:'手机'},
        {id: "amount",header:'充值金额'},
        {id: "fee_rate",header:'手续费'},
        {id: "trade_status",header:'交易状态'},
        {id: "biz_status",header:'业务状态'},
        {id: "biz_type",header:'行为类型'},
        {id: "vendor_type",header:'支付服务商类型'},
        {id: "recharge_status",header:'充值状态'},
        {id: "recharge_channel",header:'充值渠道'},
        {id: "refund_status",header:'退款状态'},
        {id: "refund_reason",header:'退款理由'},
        {id: "refund_mode",header:'退款模式'},
        {id: "creation_time",header:'创建时间'},
        {id: "recharged_time",header:'充值时间'},
        {id: "vendor_order_response",header:'请求结果'},
        {id: "vendor_order_notify_response",header:'回调结果'},
        {id: "description",header:'描述'}
    ];

    var grid = {
        container: "testA",
        id: "u_user_recharge",
        view: "datatable",
        select: true,
        columns: columns,
        pager: "pagerA",
        resizeColumn: true,
        navigation: true,
        datafetch: 15,
        datatype: "json",
        url: '/Index/Urecharge/Getlist',
        "export": true,
        on: {
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
                                            {id: "id", name: "id", view: "text", label: "id", labelWidth: 120,value:item.id},
                                            {id:'no',labelWidth: 120,value:item.no,view: "text",label:"支付流水号",minWidth:200},
                                            {id: "uid",labelWidth: 120,value:item.uid,view: "text",label:'用户ID'},
                                            {id: "nickname",labelWidth: 120,value:item.nickname,view: "text",label:'用户昵称'},
                                            {id: "mobile",labelWidth: 120,value:item.mobile,view: "text",label:'手机'},
                                            {id: "amount",labelWidth: 120,value:item.amount,view: "text",label:'充值金额'},
                                            {id: "fee_rate",labelWidth: 120,value:item.fee_rate,view: "text",label:'手续费'},
                                            {id: "trade_status",labelWidth: 120,value:item.trade_status,view: "text",label:'交易状态'},
                                            {id: "biz_status",labelWidth: 120,value:item.biz_status,view: "text",label:'业务状态'},
                                            {id: "biz_type",labelWidth: 120,value:item.biz_type,view: "text",label:'行为类型'},
                                            {id: "vendor_type",labelWidth: 120,value:item.vendor_type,view: "text",label:'支付服务商类型'},
                                            {id: "recharge_status",labelWidth: 120,value:item.recharge_status,view: "text",label:'充值状态'},
                                            {id: "recharge_channel",labelWidth: 120,value:item.recharge_channel,view: "text",label:'充值渠道'},
                                            {id: "refund_status",labelWidth: 120,value:item.refund_status,view: "text",label:'退款状态'},
                                            {id: "refund_reason",labelWidth: 120,value:item.refund_reason,view: "text",label:'退款理由'},
                                            {id: "refund_mode",labelWidth: 120,value:item.refund_mode,view: "text",label:'退款模式'},
                                            {id: "creation_time",labelWidth: 120,value:item.creation_time,view: "text",label:'创建时间'},
                                            {id: "recharged_time",labelWidth: 120,value:item.recharged_time,view: "text",label:'充值时间'},
                                            {id: "vendor_order_response",labelWidth: 120,value:item.vendor_order_response,view: "textarea",label:'请求结果',height:80},
                                            {id: "vendor_order_notify_response",labelWidth: 120,value:item.vendor_order_notify_response,view: "textarea",label:'回调结果',height:80},
                                            {id: "description",labelWidth: 120,value:item.description,view: "text",label:'描述'}

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

        },
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        }
    };

    var layout = {
        type: "space",
        rows: [

            {
                height: 40,
                cols: [
                   {},{
                        id:'start_money',
                        view:"text",
                        label:"",
                        placeholder:"起始金额",
                        width:150
                    },{
                        id:'end_money',
                        view:"text",
                        label:"",
                        placeholder:"结束金额",
                        width:150
                    },{
                        width:30
                    },
                    {id:'start_date',view:"datepicker",label:"起始时间",value: '',format:"%Y-%m-%d",stringResult:true,width:220},
                    {id:'end_date',view:"datepicker",label:"结束时间",value: '',format:"%Y-%m-%d",stringResult:true,width:220},{
                        width:30
                    },
                    {
                        id:'type',
                        view: "select",
                        label: "业务类型",
                        width:300,
                        value: 1,
                        options: [
                            {"id": 1, "value": "用户id"},
                            {"id": 2, "value": "昵称"},
                            {"id": 3, "value": "手机"},
                            {"id": 4, "value": "流水号"}
                        ]
                    },{
                        width:10
                    },
                    {
                        id:'sear',
                        view: "search",
                        placeholder: "搜索你要收入的信息..",
                        width: 300,
                        align: 'right',
                        icon:""
                    },{
                        width:10
                    },{
                        view:"button",
                        id:"my_button",
                        value:"搜索",
                        type:"form",
                        inputWidth:100,
                        click:function(){
                            var sear_val = $$('sear').getValue();
                            var grid = $$("u_user_recharge");
                            var type = $$('type').getValue();
                            var start_date = $$('start_date').getValue();
                            var end_date =$$('end_date').getValue();
                            var start_money = $$('start_money').getValue();
                            var end_money = $$('end_money').getValue();

                            grid.clearAll();
                            grid.showProgress();
                            webix.delay(function () {
                                grid.load('/Index/Urecharge/Getlist?sear='+sear_val+'&type='+type+'&date_start='+start_date+'&date_end='+end_date+'&smoney='+start_money+'&emoney='+end_money+'');
                                grid.hideProgress();
                            }, null, null, 300);
                        }

                    }
                ]


            },
            {
                height: 120,
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
                        html += "<div class='details'><div class='value'>"+t.value+" </div><div class='text'>"+t.text+"</div></div>";
                        html += "</div>";
                    }
                    html += "</div>";
                    return html;
                },
                datatype: "json",
                url:"/index/Urecharge/getCountNumber"
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