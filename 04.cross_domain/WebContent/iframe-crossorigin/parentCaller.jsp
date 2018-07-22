<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>
	<script type="text/javascript">
		parent.parent.fnParent();
	</script>  
	
	<h3>Parent Caller(<%=request.getLocalAddr() + ":" + request.getLocalPort() %>)</h3>  
</body></html>