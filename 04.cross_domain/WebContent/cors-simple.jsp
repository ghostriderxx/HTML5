<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>
	<script type="text/javascript">
		var url = "http://127.0.0.1:8181/crossdomain/HandleCORS"
	
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.withCredentials = true; 
		xhr.onload = function(){
			console.log(this.responseText);
		};
		xhr.send(); 
	</script>  
</body></html>