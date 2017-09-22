define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (editor, topsales, products) {
    var columns = [
        {id: "id",},
        {id: "uid",header:'用户id'},
        {id: "nickname",header:'昵称',width:150},
        {id: "mobile",header:'手机号码',width:150},
        {id: "biz_type",header:'业务类型',width:150},
        {id: "subject",header:'主体对象'},
        {id: "amount_type",header:'金额类型'},
        {id: "biz_id",header:'业务ID'},
        {id: "original_amount",header:'原始金额'},
        {id: "change_amount",header:'变更金额'},
        {id: "after_changed_amount",header:'变更后金额'},
        {id: "description",header:'描述'},
        {id: "creation_time",header:'创建时间',width:200}
    ];

    var grid = {
        container: "testA",
        id: "u_user_bill",
        view: "datatable",
        select: true,
        columns: columns,
        pager: "pagerA",
        navigation: true,
        datafetch: 15,
        datatype: "json",
        resizeColumn: true,
        url: '/Index/Ubill/Getlist',
        "export": true,
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
                {},
                    {
                        width:10
                    },
                    {id:'start_date',view:"datepicker",label:"起始时间",value: '',format:"%Y-%m-%d",stringResult:true,width:220},
                    {
                        width:10
                    },
                    {id:'end_date',view:"datepicker",label:"结束时间",value: '',format:"%Y-%m-%d",stringResult:true,width:220},
                    {
                        width:10
                    },
                    {
                        id:"sear",
                        view: "search",
                        placeholder: "请输入信息进行查询(基于用户快照查询)",
                        width: 300,
                        align: 'right',
                        icon:''
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
                            var grid = $$("u_user_bill");
                            var start_date = $$('start_date').getValue();
                            var end_date =$$('end_date').getValue();

                            grid.clearAll();
                            grid.showProgress();
                            webix.delay(function () {
                                grid.load('/Index/Ubill/Getlist?sear='+sear_val+'&date_start='+start_date+'&date_end='+end_date+'');
                                grid.hideProgress();
                            }, null, null, 300);
                        }

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