define(['jquery'],function(){
	var data =  $.post('/Index/Finance/getFinaceData',{},function(result,status){});
    return {
        getAll:data
    };
});