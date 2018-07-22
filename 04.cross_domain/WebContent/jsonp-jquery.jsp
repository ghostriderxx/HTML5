<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>
	<script type="text/javascript" src="jquery-1.12.4.js"></script>
	<script type="text/javascript"> 
    function mycallback(params){
    	alert(params);
    }
    
    $.ajax({
        url: 'http://127.0.0.1:8181/crossdomain/HandleJSONP',
        dataType: "jsonp",
        data: {
        	xm: "John",
        	age: 18,
        	idno: "37020320081206129X"
        },
        jsonp: "callbackName",
        jsonpCallback: "mycallback"
    })
	</script>
</body></html>