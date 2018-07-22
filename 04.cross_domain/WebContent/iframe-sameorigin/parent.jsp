<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head><body>

  <script type="text/javascript">  
  function fnParent(){
	  alert('Parent function executed!');
  }  
  
  function callChild(){
	  var iframe = document.getElementById("childFrame");
	  iframe.contentWindow.fnChild();
  }  
  </script>  
  
  <h2>Parent(<%=request.getLocalAddr() + ":" + request.getLocalPort() %>)</h2>  
  
  <p>
  	<button onclick="callChild()">Call Child</button>
  </p>
  
  <iframe src="child.jsp" id="childFrame" 
  			width="500" height="150"></iframe>  

</body></html>