<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
         <%@ include file="../commonValue.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=resourcesPath %>/css/jquery-ui-1.8.17.custom.css" />
<script src="<%=resourcesPath %>/js/maintenance/roleAdd.js"	type="text/javascript"></script>
<script src="<%=resourcesPath %>/js/maintenance/userUtil.js"	type="text/javascript"></script>
<title>Insert title here</title>
</head>
<body>
<form id="form">
<input type="hidden" id="roleId" name="roleId" value="${roleId}">
<div id="addRoleDiv" >
		    <div class="weather"  style="margin-bottom: 10px;" >
                   		<b>角色名稱:</b>&nbsp;&nbsp;<input style="width: 200px;" class="sh-inputborder" type="text" value="${roleName}" id="roleName">
            </div>
	 <div id="example" class="k-content" >
			<div id="forecast" >
				<div id="tabstrip">
					<ul>					
						<li class="k-state-active">
							用戶
						</li>		
						<li>
							權限
						</li>				
					</ul>				
					<div style="height: 400px;">
                        <table width="100%" border="0">
							<tr>
								<td>
									<table style="width: 800px" border="0">
										<tr>
											<td align="center" style="width: 400px">可選用戶</td>
											<td align="center" style="width: 400px">已選用戶</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<table>
										<tr>
											<td><select multiple   id="listUser1" name="listUser1" style="width: 400px; height: 300px;"></select></td>
											<td>
												<input type="button" class="k-button" value=" >> " onclick="move(this.form.listUser1,this.form.listUser2)" name="B1">
												<br>
												<br>
												<input type="button" class="k-button" value=" << " onclick="move(this.form.listUser2,this.form.listUser1)" name="B2">
											</td>
											<td><select multiple   id="listUser2" name="listUser2" style="width: 400px; height: 300px;"></select></td>
										</tr>
									</table>									
								</td>
							</tr>
						</table>
					</div>	
					<div style="height: 400px;">
                        <table width="100%" border="0">
							<tr>
								<td>
									<table style="width: 800px" border="0">
										<tr>
											<td align="center" style="width: 400px">可選權限</td>
											<td align="center" style="width: 400px">已選權限</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<table>
										<tr>
											<td><select multiple  size="5" id="listUser3" name="listUser3" style="width: 400px; height: 300px;"></select></td>
											<td>
												<input type="button" class="k-button" value=" >> " onclick="move(this.form.listUser3,this.form.listUser4)" name="B3">
												<br>
												<br>
												<input type="button" class="k-button" value=" << " onclick="move(this.form.listUser4,this.form.listUser3)" name="B4">
											</td>
											<td>
												<select multiple  size="5" id="listUser4" name="listUser4" style="width: 400px; height: 300px;"></select>
											</td>
										</tr>
									</table>									
								</td>
							</tr>
						</table>
					</div>					
				</div>
			</div>
	 </div>
	 
	 <div style="text-align: center;margin-top: 5px;">
	 <input  type="button" value="確定" class="k-button" onclick="saveRole(this.form.listUser2,this.form.listUser4)">
	 <input  type="button" value="取消" class="k-button" onclick="WinClose()" >
	 </div>
</div>
</form>
        <!--footer-->
        <div id="footer"></div>

</body>
</html>