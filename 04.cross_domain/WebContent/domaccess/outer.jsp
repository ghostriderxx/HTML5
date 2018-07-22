<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
	</head>
	<body>
		<h2>Outer</h2>
		
		<iframe id="innerIframe" src="http://127.0.0.1:8181/crossdomain/domaccess/inner.jsp"></iframe>
		
		<button onclick="accessInnerDom()">Access Inner Dom</button>
		
		<script>
			function accessInnerDom(){
				var iframe = document.getElementById("innerIframe");
				var iframeContentWnd = iframe.contentWindow;
				var iframeDoc = iframeContentWnd.document;
				var innerDiv = iframeDoc.getElementById("innerDiv");
			}
		</script>
	</body>
</html>