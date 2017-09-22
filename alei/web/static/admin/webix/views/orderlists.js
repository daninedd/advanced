define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (editor, topsales, products) {
    var columns = [
        { id:"name", header:"类目", template:"{common.treetable()} #name#",width:200},
        { id:"goods_name", header:"商品名称",width:200},
        { id:"province", header:"省",width:200},
        { id:"city", header:"市",width:200},
        { id:"district", header:"区",width:200},
        { id:"GroupingNum", header:"拼团订单数",width:200},
        { id:"ShoppingGoldNum", header:"购物金订单数",width:200},
        { id:"RecommendShoppingNum", header:"推荐赚订单数",width:200}
    ];

    var grid = {
        container: "testA",
        id: "productsData",
        view: "treetable",
        //select: true,
        columns: columns,
        resizeColumn: true,
        datatype: "json",
        url: '/Index/Orderlists/GetFirstCategory',
        //"export": true,
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        },
        on:{
            onItemClick:function(id){
                if(this.getItem(id).xxxs){
                    return false;
                }
                var post_id = this.getItem(id).id;
                var name = this.getItem(id).name;

                var start_time = $$("dateTo").getValue().start;
                var end_time = $$("dateTo").getValue().end;
                var grid = $$("productsData");
                var property =  $$("property").getValue();
                var biz_type = $$("bizType").getValue();
                var address = $$("address").getValue();

                if(post_id == null ||　post_id == ''){
                    return false;

                }
                console.log(name);
                if(name =="订单统计" || name =="类别统计"){
                    return false;
                }
                var messagebox =  webix.modalbox({
                    id:'load',
                    title:"数据正在加载中...",
                    width:"500px",
                    text:"请不要离开页面,数据即将加载完成...."
                });
                webix.ajax("../../Index/Orderlists/CountGoodsData",{id:post_id,start_time:start_time,end_time:end_time,
                    property:property,biz_type:biz_type,address:address},function(text){
                    text = JSON.parse(text);
                    for(var i in text ){
                        $$("productsData").add(text[i],0,post_id);
                    }
                    webix.ajax("../../Index/Orderlists/CountTypeData",{id:post_id,start_time:start_time,end_time:end_time,
                        property:property,biz_type:biz_type,address:address}, function(text){
                        text = JSON.parse(text);
                        for(var i in text ){
                            $$("productsData").add(text[i],0,post_id);
                        }
                        $$("productsData").refresh();
                        $$('productsData').enable();
                        $($$('productsData').getItem(id)).attr("xxxs","ccc");
                        webix.modalbox.hide(messagebox);
                    });
                });
            }
        }

    };



    var controls = [
        { id:"property",view: "text",placeholder:'格式："属性名1=值1|值2,属性名2=值3"',label:"属性",width:300},
        {
            view:"daterangepicker", id:"dateTo", name:"default", width:300, label:"日期区间",format:"%Y/%m/%d",labelAlign:"right", stringResult:true,
            value:{start: "", end: ""}
        },
        {
            id: "bizType", view: "multiselect", width: 300, labelAlign: "right", label: "商城",value:'Grouping,ShoppingGold,RecommendShopping',
            options: [{id:'Grouping',value:'拼团'},{id:'ShoppingGold',value:'购物金'},{id:'RecommendShopping',value:'推荐赚'}]
        },

        { id:"address",view: "text",placeholder:'格式：“province=四川省,city=成都市,district=高新区”',label:"区域",width:300},

        createMulticombo(categoryComboId, categoryTreeId),

        {view: "button",
            type: "iconButton",
            icon: "search",
            width: 100,
            label: "检索",
            click: function () {
                var start_time = $$("dateTo").getValue().start;
                var end_time = $$("dateTo").getValue().end;
                var grid = $$("productsData");
                var property =  $$("property").getValue();
                var biz_type = $$("bizType").getValue();
                var categoryids = getSelectedCategory(categoryTreeId);
                var address = $$("address").getValue();
                grid.clearAll();
                grid.showProgress();
                webix.delay(function () {
                    grid.load('../../Index/Orderlists/Search?start_time='+start_time+'&end_time='+end_time+'&property='+property+'&biz_type='+biz_type+'&categoryids='+categoryids+'&address='+address);
                    grid.hideProgress();
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
                    grid
                ]
            }
        ]

    };


    return {$ui: layout};


});

var id = "gCompletedOrdersId";
var windowId = id + "windowId";
var categoryComboId = id + "categoryComboId";
var categoryTreeId = id + "categoryTreeId";

var createMulticombo = function (comboId, treeId) {
    // var treeId = webix.uid();
    var thisObj = this;
    return {
        view: "multicombo",
        id: comboId, label: "分类", labelAlign: "right",
        width: 250, tagMode: false, optionWidth: 210,
        tagTemplate: function (values) {
            return (values.length ? values.length + "种分类已选择" : "");
        },
        suggest: {
            body: {
                view: "tree", threeState: true, id: treeId, data: [],
                template: "{common.icon()} {common.checkbox()} {common.folder()} #value#",
                ready: function () {
                    parseCategoryTreeData(treeId)
                },
                on: {
                    onItemCheck: function (id) {
                        onCategoryTreeItemCheck(treeId, comboId)
                    }
                }
            }
        }
    }
};

var parseCategoryTreeData = function (treeId) {
    if(this.data){
        $$(treeId).parse(this.data)
        return
    }
    this.getRawData({}, function (data) {

        var _data = JSON.stringify(data);
        //_data = _data.replace(/__children/g, "data");
        _data = _data.replace(/name/g, "value");
        _data = JSON.parse(_data);
        _data = JSON.parse(_data);
        console.log(_data);
        if (!_data) {
            _data = {data: []}
        }
        _data.push({id: "-1", value: "未分类"})
        if ($$(treeId)) {
            $$(treeId).clearAll();
            $$(treeId).parse(_data);
        }
    })
};

var getRawData = function (query, callback) {
    query = query || {};
    webix.ajax("../../Index/Orderlists/GetFirstCategory", query, function (data) {
        this.data = data;
        if (callback) {
            callback(data)
        }
    }.bind(this))
};

var onCategoryTreeItemCheck =  function (treeId, multiComboId) {
    var ids = [];
    $$(treeId).data.eachLeaf(0, function (each) {
        if (each.checked) {
            ids.push(each.id)
        }
    });
    $$(multiComboId).setValue(ids)
};

var getSelectedCategory = function (treeId) {
    var retVal = [];
    if (!$$(treeId)) {
        return retVal
    }
    $$(treeId).data.eachLeaf(0, function (eachLeaf) {
        if (eachLeaf.checked) retVal.push(eachLeaf.id)
    });
    return retVal
};
