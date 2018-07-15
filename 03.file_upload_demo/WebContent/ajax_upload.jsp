<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<script type="text/javascript" src="./jquery-1.12.4.js"></script>
		<style> *{ font-family:"Consolas"; }</style>
	</head>
	<body>
		<form>
			<div>select a file to upload.</div><br/>
			
			<div>
				<input type="file" 
					id="myfile" 
					multiple="multiple" 
					accept="image/*" 
					onchange="onFileSelected()"
					/>
			</div><br/>
			
			<fieldset>
				<legend>selected files info</legend>
				<pre id="selectedFilesInfo">
				</pre>
			</fieldset><br/>
			
			<input type="button" onclick="uploadFile()" value="Upload"/>
		</form>
		<script type="text/javascript">
			function onFileSelected() {
				var files = document.getElementById('myfile').files; 
	        
				var selectedFilesInfo = "";
				for(var i=0; i<files.length; i++){
					var file = files[i];
					var name = file.name;
					var contentType = file.type;
					var size = file.size;
					selectedFilesInfo += name+": "+contentType+", "+size/1000 + "K" + "\n";
				}
				
				$("#selectedFilesInfo").text(selectedFilesInfo);
	        }
	      
	      function uploadFile() {
	    	  // 1. 获取用户选取的文件
	    	  var files = document.getElementById('myfile').files; 
	    	  
	    	  // 2. 用 FormData 组装 Multipart 型请求
	    	  var fd = new FormData();
	    	  for(var i=0; i<files.length; i++){
	    		  fd.append("myfile", files[i], files[i].name);
	    	  }
	    	  
	    	  // 3. 使用XMLHttpRequest Level 2发送请求 
	    	  // 注：推荐使用 Fetch API 替代 XMLHttpRequest
	    	  var xhr = new XMLHttpRequest();
	    	  xhr.addEventListener("load", function(e) { // 请求完成
	    		  alert("上传完成!");
	          }, false);
	    	  
	    	  xhr.open("POST", "./HandleUpload");
	    	  xhr.send(fd);
	      }
		</script>
	</body>
</html>