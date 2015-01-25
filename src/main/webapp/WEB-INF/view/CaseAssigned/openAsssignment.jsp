<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
     <%@ include file="../commonValue.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="<%=resourcesPath %>/js/caseAssigned/openCaseAssigned.js" type="text/javascript"></script>
<title>Insert title here</title>
<script type="text/x-kendo-template" id="opneTemplate">
	<tr>
        <td align="center"  onclick="OKRefer(#=userid#)">
			<div>#=loginname#</div>	
		</td>  	
   </tr>
</script>
</head>
<body>
<input type="hidden" id="userId" name="userId" value="${userId}">
	<div id="surveyorUserGrid"></div> 
</body>
</html>