!(function() {
    function install(Vue, options) {
        // 3. 添加实例方法
        var _this=Vue.prototype;
        Vue.prototype.utils = {
        	validate:{
				phone :function (rule, value, callback) {
			        if (value != '') {
			        	if(/^(((1[3578][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(value)){
			        		callback()
			        	}else{
			        		callback(new Error('您输入的手机号码格式不正确'));
			        	}
			        } else {
			          	callback();
			        }
			    },
			    remote:function (rule, value, callback,source,opts){
			    	if(rule.url){
						if (value != '') {
							_this.$ajax({
								type:"POST",
								url:rule.url,
								data:{params:value},
								success:function(res){
									if(res.data===true){
										callback();
									}else{
										callback(new Error(res.data));
									}
								},
								error:function(res){
									_this.$message.error(res.meta.message);
								}
							})
						} else {
							callback();
						}
					}else{
						callback(new Error('必须传入url参数'));
					}
			    }
			}
		}
    }
    if (typeof exports == "object") {
        module.exports = install
    } else if (typeof define == "function" && define.amd) {
        define([], function() {
            return install
        })
    } else if (window.Vue) {
        Vue.use(install)
    }

})();