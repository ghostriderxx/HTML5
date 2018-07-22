<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>
	<script type="text/javascript">  	
	function callParent(){
		parent.fnParent();  
	}
	
	function fnChild(){
		alert('Child function executed!');
	}  
	</script>  
	
	<h2>Child(<%=request.getLocalAddr() + ":" + request.getLocalPort() %>)</h2>  
	
	<button onclick="callParent()">Call Parent</button>
</body></html>