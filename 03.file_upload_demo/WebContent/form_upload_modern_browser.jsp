<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<script type="text/javascript" src="./jquery-1.12.4.js"></script>
	</head>
	<body>
		<form action="./HandleUploadWithJSPCallback?callbackFnName=fileUploadSuccess" 
				enctype="multipart/form-data" 
				method="POST"
				target="formSubmitResult"
				>
			<input type="file" 
					multiple="multiple" 
					accept="image/*" 
					name="myfile"
					/>
			<input type="submit" value="submit"/>
			<input type="reset" value="reset"/>
		</form>
		
		<iframe name="formSubmitResult" style="width:450px; height:200px;"></iframe>
		
		<script>
			function fileUploadSuccess(params){
				alert("fileUploadSuccess called!\n"+params);
			}
		</script>
	</body>
</html>