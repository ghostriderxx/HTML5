<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>
	<script type="text/javascript">
    function jsonp(url, params, callbackName) {
    	var src = url + "?callbackName=" + callbackName;
    	for(var key in params){
    		var val = encodeURIComponent(params[key]);
    		src += ("&" + key + "=" + val);
        }
    	
        var script = document.createElement("script");
        	script.src = src;
        
        document.getElementsByTagName("head")[0].appendChild(script);  
    }
    
    function mycallback(params){
    	alert(params);
    }
	
    jsonp("http://127.0.0.1:8181/crossdomain/HandleJSONP", {
    	xm: "John",
    	age: 18,
    	idno: "37020320081206129X"
    }, "mycallback");
	</script>
</body></html>