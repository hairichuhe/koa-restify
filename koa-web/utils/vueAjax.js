function json2url(json) {
    // json.t=Math.random();
    if (!json) {
        json = {}
    }
    var arr = [];
    for (var name in json) {
        arr.push(name + '=' + json[name]);
    }
    return arr.join('&');
};

!(function() {
    function install(Vue, options) {

        // 3. 添加实例方法
        Vue.prototype.$ajax = function(json) {
            var _this = this;
            json = json || {};
            if (!json.url) {
                console.log('url Not Null');
                return;
            };
            json.type = json.type || 'get';

            //ajax
            if (global.XMLHttpRequest) {
                var oAjax = new XMLHttpRequest();
            } else {
                var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
            }

            switch (json.type.toLowerCase()) {
                case 'get':
                    var str = "";
                    if (json.data) {
                        str = '?' + json2url(json.data)
                    }
                    oAjax.open('GET', json.url + str, true);
                    oAjax.send();
                    break;
                case 'post':
                    oAjax.open('POST', json.url, true);
                    oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    oAjax.send(json2url(json.data));
                    break;
            }

            // fnLoading()
            json.fnLoading && json.fnLoading();

            oAjax.onreadystatechange = function() {
                if (oAjax.readyState == 4) {
                    json.complete && json.complete();
                    if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
                        if (json.dataType == 'xml') {
                            json.success && json.success(oAjax.responseXML);
                        } else if (!json.dataType || json.dataType == 'json') {
                            var res = JSON.parse(oAjax.responseText);
                            if (res.meta.success) {
                                if (json.success) {
                                    json.success(res);
                                } else {
                                    _this.$message({
                                        message: '操作成功！',
                                        type: 'success'
                                    });
                                }
                            } else {
                                _this.$message.error(res.meta.message);
                            }
                        } else {
                            json.success && json.success(oAjax.responseText);
                        }
                    } else {
                        if (oAjax.status == 400 || oAjax.status == 403) {
                            _this.$alert('权限错误，请重新登录！', '操作提示', {
                                confirmButtonText: '确定',
                                callback: function(action) {
                                    sessionStorage.removeItem('access_token');
                                    _this.$router.push('/login');
                                }
                            });
                        } else {
                        	var res=JSON.parse(oAjax.responseText)
                        	if(json.error){
                            	json.error(res);
                        	}else{
                        		_this.$message.error(res.meta.message);
                        	}
                        }
                    }
                }
            };
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