/**
 * 弹窗函数
 */
!(function(window,document) {
	var _init = {};
	_init.modalWindow = (winId, title, body, width, height, onReady, onClose, onDestruct) => {
        if (!winId || '' == winId) {
            winId = webix.uid() + '';
        }
        var uiObj = webix.ui({
            view: "window", id: winId, position: 'center', resize: true, css: 'collectModalWindow',
            padding: {
                top: 6, left: 10, bottom: 10
            },
            width: width,
            height: height,
            move: true, type: 'material', modal: true,
            on: {
                onShow: function () {
                    // $('.webix_modal').attr('style', 'opacity:0.2');
                    var elements = document.getElementsByClassName("webix_modal");
                    /*_.each(elements, function (ele) {
                        ele.style.opacity = 0.2;
                    });*/
                    if (onReady) {
                        onReady();
                    }
                }, onDestruct: function () {
                    // $('.webix_modal').attr('style', 'opacity:0');
                    if (onDestruct) {
                        onDestruct();
                    }
                }
            },
            head: {
                view: "toolbar", css: "win_title", cols: [{
                    view: "label", gravity: 1, align: 'center', template: function () {
                        return "<div style='font-size: 14px; padding: 0 0 0 2px; font-weight: 800;color: white'>" + title + "</div>";
                    }
                }, {
                    view: "icon", icon: "times-circle", gravity: 1, align: 'right',
                    click: function () {
                      if(onClose){
                        onClose()
                      }
                      $$(winId).close();
                        // if (onClose) {
                        //     var ret = onClose();
                        //     /*if(_.isUndefined(ret) || ret != false){
                        //         $$(winId).close();
                        //     }*/
                        // }else{
                        //     $$(winId).close();
                        // }
                    }
                }
                ]
            },
            body: body
        });
        uiObj.show();
    };
	//module.exports = _init;  //导出初始化函数

})(window,document);
