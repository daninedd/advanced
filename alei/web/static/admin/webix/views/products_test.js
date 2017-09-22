define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (editor, topsales, products) {
    var columns = [
        {id: "id"},
        {id: "amount"},
        {id: "balance"},
        {id: "biz_status"},
        {id: "biz_type"},
        {id: "checkout"},
        {id: "closed_time"},
        {id: "creation_time"},
        {id: "description"}
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
        url: '/Index/Finance/getFinaceDatapage',
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
                    {
                        view: "button",
                        type: "iconButton",
                        icon: "file-excel-o",
                        width: 150,
                        label: "Export To Excel",
                        click: function () {
                            $$("productsData").exportToExcel();
                        }
                    }, {},
                    {view:"datepicker",label:"起始时间",value: new Date(),format:"%Y-%m-%d" },
                    {view:"datepicker",label:"结束时间",value: new Date(),format:"%Y-%m-%d"},
                    {
                        view: "search",
                        placeholder: "搜索你要收入的信息..",
                        width: 300,
                        align: 'right',
                        on: {
                            onSearchIconClick: function () {
                                var sear_val = this.getValue();
                                var grid = $$("productsData");
                                var biz_type = $$('biz_type').getValue();
                               // var date = $$('date').getValue();
                                grid.clearAll();
                                grid.showProgress();
                                webix.delay(function () {
                                    grid.load('/Index/Finance/getFinaceDatapage?sear='+sear_val+'&biz_type='+biz_type+'');
                                    grid.hideProgress();
                                }, null, null, 300);
                            }
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