//define([
//	"views/modules/form_user",
//	"views/modules/form_project",
//	"views/modules/form_event",
//	"views/modules/form_style"
//],function(user, project, event, style){
//
//
//
//	var layout = {
//		type: "space",
//		cols:[
//			{type: "wide",
//				rows: [
//					user,
//					event
//				]
//			},
//			{type: "wide",
//				rows: [
//					style,
//					project
//				]
//			}
//		]
//
//	};
//
//	return { $ui:layout };
//
//});
webix.ui({
    view:"form",
    id:"log_form",
    url:"index/login",
    width:300,
    elements:[
        { view:"text", label:"Email", name:"email"},
        { view:"text", type:"password", label:"Password", name:"password"},
        { margin:5, cols:[
            { view:"button", value:"Login" , type:"form"},
            { view:"button", value:"Cancel"}
        ]}
    ]
});
