define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date",
    "models/spreadsheet_data",
], function (jquery,editor, topsales, products) {


    var grid = {
        id:"a_statistic",
        view:"spreadsheet",
        css: "webix_ssheet_toolbar webix_layout_toolbar",
        data: {
            "styles": [
                ["top", "#0000;#ffff;center;'PT Sans', Tahoma;17px;"],
                ["subtop", "#818181;#EAEAEA;center;'PT Sans', Tahoma;15px;;;bold;top;;0-0-0-0,;"],
                ["sales", "#818181;;center;'PT Sans', Tahoma;15px;;;bold;top;;0-0-0-0,;"],
                ["total", "#818181;;right;'PT Sans', Tahoma;15px;;;bold;top;;0-0-0-0,;"],
                ["count", "#000;#fff;center;'PT Sans', Tahoma;15px;;;;top;;0-0-0-0,;"],
                ["calc-top", "#818181;#EAEAEA;;'PT Sans', Tahoma;15px;;;bold;top;;0-0-0-0,;"],
                ["calc-other", "#818181;#EAEAEA;;'PT Sans', Tahoma;15px;;;bold;middle;;0-0-0-0,;"],
                ["values", "#000;#fff;right;'PT Sans', Tahoma;15px;;;;top;;0-0-0-0,;int"]
            ],
            "sizes": [
                [0, 1, 220],
                [0, 2, 200],
                [0, 3, 200],
                [0, 4, 200],
                [0, 5, 200],
                [0, 6, 200]
            ],"data": [
                    [2,1,"选择日期，点击搜索加载数据...","top"]
                ],"spans": [
                    [1,1,6,1],
                    [2,1,6,1],
                    [4,1,1,6],
                    [10,1,1,4],
                    [14,1,6,1],
                    [17,1,5,1],
                    [18,1,5,1],
            ]
    }, readonly:true
    };
    var  curDate = new Date();
    var layout = {
        type: "space",
        rows: [
            {
                height: 40,
                cols: [
                    {id:'start_date',width:'220',
                        view:"datepicker",
                        label:"日期",
                        value: '',
                        format:"%Y-%m-%d",
                        stringResult:true,
                        align:"right",
                        suggest: {
                            type:"calendar",
                            body: {
                                minDate:"2017-01-01",
                                maxDate: new Date((curDate/1000-86400)*1000)
                            }
                        }

                    },
                    {
                        view:"button",
                        id:"my_button",
                        value:"搜索",
                        type:"form",
                        inputWidth:100,
                        click:function(){
                            var grid = $$("a_statistic");
                            var start_date = $$('start_date').getValue();
                            grid.clearSheet();
                         var messagebox =  webix.modalbox({
                                id:'load',
                                title:"数据正在加载中...",
                                width:"500px",
                                text:"请不要离开页面,数据即将加载完成...."
                            });
                            webix.delay(function () {
                                grid.load('/Index/Statistics/Handle?date='+start_date+'',function(){
                                    webix.modalbox.hide(messagebox);
                                });
                            }, null, null, 300);
                        }
                    },{
                        view:"button",
                        id:"exploer",
                        value:"导出EXCEL",
                        type:"form",
                        align:'right',
                        inputWidth:100,
                        click:function(){
                            webix.toExcel("a_statistic");
                        }
                    }
                ]
            },
            {
                rows: [
                    grid,  {
                        view: "toolbar",
                        css: "highlighted_header header6",
                        paddingX: 5,
                        paddingY: 5,
                        height: 80, cols:[
                            {  view:"textarea",
                                value:'注：A1+A2+A3+A4+推荐赚购买 小计值与报表中A5小计值不一定一致的原因是按A1 A2 A3 A4和推荐赚购买统计的需求计算出的结果，会存在一部分数据不在对应条件内。例如充值单4139091，揭团时间在次日，充值时间在当日，且是参团性质，\n' +
                                '所以该充值单即不属于A1 A2(揭团时间不是当日)，也不属于A3（A3是开团性质）,也不属于A4（参团失败退款性质）',
                                label:""
                            }
                        ]
                    }

                ]
            }
        ]

    };
    return {$ui: layout};
});