/**
 * Created by Administrator on 2017/9/7.
 */
/**
 * Created by Administrator on 2017/6/7 0007.
 */
/**
 * ajax函数
 */


    var getRawData = function (query, callback) {
        query = query || {};
        Network.ajax("/user.goods.category.GoodsCategoryView.queryAll.query", query, function (data) {
            this.data = data;
            if (callback) {
                callback(data)
            }
        }.bind(this))
    };

    var parseCategoryTreeData = function (treeId) {
        if(this.data){
            $$(treeId).parse(this.data)
            return
        }
        this.getRawData({}, function (data) {
            var _data = JSON.stringify(data);
            _data = _data.replace(/__children/g, "data");
            _data = _data.replace(/name/g, "value");
            _data = JSON.parse(_data);
            if (!_data) {
                _data = {data: []}
            }
            _data.data.push({id: "-1", value: "未分类"})
            if ($$(treeId)) {
                $$(treeId).clearAll();
                $$(treeId).parse(_data.data)
            }
        })
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

    var createMulticombo = function (comboId, treeId) {
        // var treeId = webix.uid();
        var thisObj = this;
        console.log(this);return;
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
                        thisObj.parseCategoryTreeData(treeId)
                    },
                    on: {
                        onItemCheck: function (id) {
                            thisObj.onCategoryTreeItemCheck(treeId, comboId)
                        }
                    }
                }
            }
        }
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

    var getDataForSelection =  function () {
        if (!this.data) {
            return
        }
        return this.formatRawData(this.data)
    };

    var refreshWebixViewAsCombo = function (viewId) {
        this.getRawData({}, function (data) {
            $$(viewId).define("options", {
                data: this.formatRawData(data),
                filter: function (item, value) {
                    if (item.value.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1)return true;
                    return false;
                }
            })
            $$(viewId).refresh()
        }.bind(this));
        return []
    };

    var formatRawData = function (data) {
        var sortedItems = [];
        _.each(data.data, function (each1stItem) {
            _.each(each1stItem.__children, function (each2ndItem) {
                _.each(each2ndItem.__children, function (each3rdItem) {
                    var val = each3rdItem.name + '(' + [each1stItem.code, each2ndItem.code, each3rdItem.code].join('-') + ')';
                    sortedItems.push({id: each3rdItem.id, value: val, data: each3rdItem})
                })
            })
        });
        return sortedItems
    };

    var saveData = function (id, action, data, callback) {
        var url;
        var obj = {
            data: {
                code: data.code || "",
                name: data.name || "",
                description: data.description || "",
                thumbnailUrl: data.thumbnailUrl || "",
                parentId:data.parentId||"",
                seq: 1,
            }
        };
        action = action || "create";
        if (action === "create") {
            obj.data.parentId = id || 0;
            url = "/user.GoodsCategoryTransactor.create.command";
        } else if (action === "update") {
            obj.data.id = id || 0;
            url = "/user.GoodsCategoryTransactor.update.command";
        } else {
            return
        }

        Network.ajax(url, obj, function (data) {
            if (callback) {
                callback(data)
            }
        })

    };




