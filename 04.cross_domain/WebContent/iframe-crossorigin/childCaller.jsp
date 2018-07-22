<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>
	<script type="text/javascript">
		parent.window.childFrame.fnChild();
	</script>  
	
	<h3>Child Caller(<%=request.getLocalAddr() + ":" + request.getLocalPort() %>)</h3>  
</body></html>