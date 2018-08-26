<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<script type="text/javascript" src="./jquery-1.12.4.js"></script>
		
		<!-- 引入 uploadify 组件 -->
		<script type="text/javascript" src="./uploadify/jquery.uploadify.js"></script>
		<link href="./uploadify/uploadify.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div id="myMultiFileUpload"></div>
	
		<script>
		$("#myMultiFileUpload").uploadify({
	        swf           	: './uploadify/uploadify.swf', 	// 指明flash插件路径
	        uploader      	: './HandleUpload_CommonsFileUpload', 			// 文件上传请求地址
	        width         	: 120,
	        height        	: 30,
	        fileObjName	  	: "myfile", 					// 相当于 <input type="file" name="myfile"
	        buttonText	  	: "选择文件",
	        removeCompleted : false,
	        fileTypeExts	: "*.png;*.jpg", 				// 限制可选的文件类型
	        onUploadComplete: function(file) {				// 每个文件上传成功的回调
	            console.log('[' + file.name + '] upload complete.');
	        }
	    });
		</script>
	</body>
</html>