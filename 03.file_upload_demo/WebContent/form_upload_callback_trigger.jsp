<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
	</head>
	<body>
		<fieldset>
			<legend>submitted files info</legend>
			<pre>
${submittedFilesInfo}
			</pre>
		</fieldset>
		<script>
			parent.${callbackFnName}("${callbackParams}");
		</script>
	</body>
</html>