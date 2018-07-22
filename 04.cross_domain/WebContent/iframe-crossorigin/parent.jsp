<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>

  <script type="text/javascript">  
  function fnParent(){
	  alert('Parent function executed!');
  }  
  
  function callChild(){
	  var iframe = document.getElementById("execIframe");
	  iframe.src = "http://127.0.0.1:8181/crossdomain/iframe-crossorigin/childCaller.jsp?_=" + Math.random();
  }  
  </script>  
  
  <h2>Parent(<%=request.getLocalAddr() + ":" + request.getLocalPort() %>)</h2>
  <p>
  	<button onclick="callChild()">Call Child</button>
  </p>
  
  <iframe src="http://127.0.0.1:8181/crossdomain/iframe-crossorigin/child.jsp" 
  			id="childFrame" name="childFrame" 
  			width="500" height="200"></iframe>
  
  <iframe id="execIframe" src="" width="500" height="70"></iframe>
</body></html>