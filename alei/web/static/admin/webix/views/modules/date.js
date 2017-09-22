/**
 * ajax函数
 */
!(function(window,document) {
	var _init = {};
    _init.getDatetime = (fmt,date)=>{
            var newDate = date || new Date();
            var o = {
                "M+" : newDate.getMonth()+1,                 //月份
                "d+" : newDate.getDate(),                    //日
                "h+" : newDate.getHours(),                   //小时
                "m+" : newDate.getMinutes(),                 //分
                "s+" : newDate.getSeconds(),                 //秒
                "q+" : Math.floor((newDate.getMonth()+3)/3), //季度
                "S"  : newDate.getMilliseconds()             //毫秒
            };

            if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (newDate.getFullYear()+"").substr(4 - RegExp.$1.length));
            }

             for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                     fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                 }
             }
            return fmt;

        };

  _init.getDate = function() {
    return new Date();
  };
	//module.exports = _init;  //导出初始化函数

})(window,document);
