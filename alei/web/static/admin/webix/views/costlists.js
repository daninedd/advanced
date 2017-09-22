define([
    "jquery",
    "views/modules/editor",
    "views/modules/topsales",
    "views/modules/date"
], function (editor, topsales, products) {
    var columns = [
        { id:"name", header:"类目", template:"{common.treetable()} #name#",width:200},
        { id:"goods_name", header:"商品名称",width:200},
        { id:"grouping_cost", header:"拼团采购成本",width:200},
        { id:"shopping_cost", header:"购物金采购成本",width:200},
        { id:"recommend_cost", header:"推荐赚采购成本",width:200}
    ];

    var grid = {
        container: "testA",
        id: "productsData",
        view: "treetable",
        //select: true,
        columns: columns,
        resizeColumn: true,
        datatype: "json",
        url: '/Index/Costlists/GetFirstCategory',
        //"export": true,
        ready: function () {
            webix.extend(this, webix.ProgressBar);
        },
        on:{
            onItemClick:function(id){

                if(this.getItem(id).xxx){
                    return false;
                }

                var post_id = this.getItem(id).id;
                var name = this.getItem(id).name;

                var start_time = $$("dateTo").getValue().start;
                var end_time = $$("dateTo").getValue().end;
                var grid = $$("productsData");
                var property =  $$("property").getValue();
                var biz_type = $$("bizType").getValue();

                if(post_id == null ||　post_id == ''){
                    return false;

                }
                if(name == "商品统计" || name == "类别统计"){
                    return false;
                }

                $$('productsData').disable();
                var messagebox =  webix.modalbox({
                    id:'load',
                    title:"数据正在加载中...",
                    width:"500px",
                    text:"请不要离开页面,数据即将加载完成...."
                });
                webix.ajax("../../Index/Costlists/CountGoodsData",{id:post_id,start_time:start_time,end_time:end_time,
                    property:property,biz_type:biz_type},function(text){

                    text = JSON.parse(text);
                    for(var i in text ){
                        $$("productsData").add(text[i],0,post_id);
                    }
                    webix.ajax("../../Index/Costlists/CountTypeData",{id:post_id,start_time:start_time,end_time:end_time,
                        property:property,biz_type:biz_type}, function(text){

                        text = JSON.parse(text);
                        //for(var i in text ){
                        //    $$("productsData").add(text[i],0,post_id);
                        //}
                        $$("productsData").add(text[0],0,post_id);
                        $$("productsData").refresh();
                        webix.message("统计完成");
                        webix.modalbox.hide(messagebox);
                        $$('productsData').enable();
                        $($$('productsData').getItem(id)).attr("xxx","ccc");
                    })
                });

            }
        }

    };





    var controls = [
        { id:"property",view: "text",placeholder:'格式："属性名=值"',lable:"可筛选属性"},
        {
            view:"daterangepicker", id:"dateTo", name:"default", width:500, label:"日期区间",format:"%Y/%m/%d",labelAlign:"right", stringResult:true,
            value:{start: "", end: ""}
        },
        {
            id: "bizType", view: "multiselect", width: 240, labelAlign: "right", label: "商城",value:'Grouping,ShoppingGold,RecommendShopping',
            options: [{id:'Grouping',value:'拼团'},{id:'ShoppingGold',value:'购物金'},{id:'RecommendShopping',value:'推荐赚'}]
        },

        createMulticombo(categoryComboId, categoryTreeId),

        {view: "button",
            type: "iconButton",
            icon: "search",
            width: 150,
            label: "检索",
            click: function () {
                var start_time = $$("dateTo").getValue().start;
                var end_time = $$("dateTo").getValue().end;
                var grid = $$("productsData");
                var property =  $$("property").getValue();
                var biz_type = $$("bizType").getValue();
                var categoryids = getSelectedCategory(categoryTreeId);
                grid.clearAll();
                grid.showProgress();
                webix.delay(function () {
                    grid.load('../../Index/Costlists/Search?start_time='+start_time+'&end_time='+end_time+'&property='+property+'&biz_type='+biz_type+'&categoryids='+categoryids+'');
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
        labelWidth: 40, width: 200, tagMode: false, optionWidth: 210,
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
    webix.ajax("../../Index/Costlists/GetFirstCategory", query, function (data) {
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
