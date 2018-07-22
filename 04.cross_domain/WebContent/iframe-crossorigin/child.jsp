<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>
	<script type="text/javascript">  	
	function callParent(){
		var iframe = document.getElementById("execIframe");
		iframe.src = "http://192.168.124.10:8080/crossdomain/iframe-crossorigin/parentCaller.jsp?_=" + Math.random();
	}
	
	function fnChild(){
		alert('Child function executed!');
	}  
	</script>  
	
	<h2>Child(<%=request.getLocalAddr() + ":" + request.getLocalPort() %>)</h2>  
	
	<button onclick="callParent()">Call Parent</button>
	
	<iframe id="execIframe" src="" width="400" height="70"></iframe>
</body></html>