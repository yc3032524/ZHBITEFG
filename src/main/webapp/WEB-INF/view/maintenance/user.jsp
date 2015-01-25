<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../index.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="<%=resourcesPath%>/js/maintenance/user.js"
	type="text/javascript"></script>
<title>用戶</title>
<style>
#newApproverGird td {
	text-align: left;
}
#approverDiv td {
	text-align: left;
}
</style>

</head>
<body>
	<div class="Basic">
	<div id="Conter">
		<div class="container con-container">
			<div class="conter-padding">
				<div class="table-list2">
					<div id="div-navi">
						<strong>系統維護&nbsp; <span class="k-icon k-i-arrow-e"></span>&nbsp;用戶
						</strong>
					</div>
					<br>
					<div id="userGrid" style="text-align: left:;"></div>
					<br>
					<div id="roleGrid"
						style="display: none; text-align: left; min-width:"></div>
					<br>
				</div>
				<div id="addUserDiv"></div>
			</div>
		</div>
			<!--footer-->
    <div id="footer"></div>
	</div>
	</div>
</body>
<script type="text/x-kendo-template" id="template">
                <div class="toolbar" style="text-align:right;">     
					 <label style="float:left;margin-top:5px;"><strong>用戶管理&nbsp;</strong></label> 
                     <input type="button" value="新增" onclick="addUser(1)" class="k-button"/>
					 <input type="button" value="修改" onclick="addUser(2)" class="k-button"/>
                </div>
</script>
</html>