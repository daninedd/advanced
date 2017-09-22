define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (editor, topsales, products) {
    var columns = [
        {id:"id", header:"#"},
        {id:"amount", header:"充值金额", sort:"string"},
        {id:"platform", header:"平台", sort:"string"},
        {id:"delivery_mode", header:"类别", sort:"string"}
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
        url: '/Index/Rechargelists/GetData',
        "export": true,
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        }
    };

    var controls = [
        { view: "datepicker",timepicker: true,label: "开始时间",id:"start_time",stringResult:true,format:"%Y-%m-%d"},
        //{ view: "button", type: "iconButton", icon: "external-link", label: "Export", width: 120, popup: exports},
        { view: "datepicker",timepicker: true,label: "结束时间",id:"end_time",stringResult:true,format:"%Y-%m-%d"},

        {view: "button",
            type: "iconButton",
            icon: "search",
            width: 150,
            label: "查询",
            click: function () {
                var start_time = $$("start_time").getValue();
                var end_time = $$("end_time").getValue();
                var grid = $$("productsData");
                // var date = $$('date').getValue();
                grid.clearAll();
                grid.showProgress();
                webix.delay(function () {
                    grid.load('/Index/Rechargelists/GetData?start_time='+start_time+'&end_time='+end_time+'');
                    grid.hideProgress();
                }, null, null, 300);
            }}
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