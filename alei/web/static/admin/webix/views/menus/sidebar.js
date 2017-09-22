define(function(){
	return {
		$ui:{
			width: 200,
			rows:[{
					view: "tree",
					id: "app:menu",
					type: "menuTree2",
					css: "menu",
					activeTitle: true,
					select: true,
					tooltip: {
						template: function(obj){
							return obj.$count?"":obj.details;
						}
					},
					on:{
						onBeforeSelect:function(id){
							if(this.getItem(id).$count){
								debugger;
								return false;
							}
							
						},
						onAfterSelect:function(id){
							this.$scope.show("./"+id);
							var item = this.getItem(id);
							webix.$$("title").parse({title: item.value, details: item.details});
						}
					},
					data:[
						{id: "main", value: "系统管理", open: 0, data:[
							{ id: "buied_lists", value: "购买记录", icon: "home", $css: "products", details:"reports and statistics"},
							{ id: "extract", value: "提现记录", icon: "check-square-o", $css: "orders", details:"order reports and editing"},
							{ id: "u_user_recharge", value: "充值记录", icon: "cube", $css: "products", details:"all products"},
							{ id: "u_user_bill", value: "实名认证扣费", icon: "pencil-square-o", details: "changing product data"}
						]},
						// {id: "components", open: true, value:"Components", data:[
						// 	{ id: "datatables", value: "Datatables", icon: "table", details: "datatable examples" },
						// 	{ id: "charts", value: "Charts", icon: "bar-chart-o", details: "charts examples"},
						// 	{ id: "forms", value: "Forms", icon: "list-alt", details: "forms examples"}
                        //
						// ]},
						{id: "uis", value:"财务统计", open:0, data:[
							{ id: "a_statistics", value: "财务报表", icon: "shopping-bag", details: "财务数据统计" }

						]},
						{id: "retailers", value:"电商统计", open:0, data:[
                            { id: "sale_cont", value: "销售报表", icon: "calendar", details: "calendar example" },
                            { id: "orderlists", value: "订单报表", icon: "folder-open-o", details: "file manager example" },
                            { id: "costlists", value: "成本报表", icon: "folder-open-o", details: "file manager example" },
                            { id: "rechargelists", value: "充值报表", icon: "folder-open-o", details: "file manager example" }

                        ]},
						{id: "orderquery", value:"订单查询", open:0, data:[
							{ id: "order", value: "订单查询", icon: "calendar", details: "calendar example" }

						]}
					]
				}
			]
		}
	};

});
