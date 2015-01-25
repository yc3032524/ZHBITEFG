<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../commonValue.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="<%=resourcesPath%>/js/maintenance/userAdd.js"
	type="text/javascript"></script>
<script src="<%=resourcesPath%>/js/maintenance/userUtil.js"
	type="text/javascript"></script>
<title>Insert title here</title>
</head>
<body>
	<form id="form">
		<div id="userAddDiv">
			<input id="userId" type="hidden" name="userId" value="${user.userid}">
			<input type="hidden" value="${user.userdesc}" id="userDesc">
			<input type="hidden" value="${user.status}" id="tstatus"> <input
				type="hidden" value="${user.isinspector}" id="tisinspector">
			<div id="addRoleDiv">
				<div id="example" class="k-content">
					<div id="forecast">
						<div id="tabstrip">
							<ul>
								<li class="k-state-active">用戶</li>
								<li>角色</li>
							</ul>
							<div style="height: 400px;">
								<div
									style="margin-top: 40px; text-align: center; vertical-align: middle;">
									<table width="100%" border="0" id="addpage">
										<tr>
											<td style="height: 35px" width="30%" align="right">登錄名：</td>
											<td align="left"><input type="text" id="cname"
												value="${user.loginname}" size="31" class="sh-inputborder">
												<!-- 												 <img --> <%-- 												src="<%=resourcesPath%>/img/search-input.gif" --%>
												<!-- 												class="k-button k-button-icontext k-cancel-button" -->
												<!-- 												onclick="changeLoginName()" /> <input type="button" -->
												<!-- 												id="synchroUser" onclick="UserSynchro()" class="k-button" -->
												<!-- 												style="display: none" value="同步用戶資料"> --></td>
										</tr>
										<tr>
											<td style="height: 35px" align="right">聯繫電話：</td>
											<td align="left"><input type="text" size="35" id="phone"
												value="${user.contactphone}" class="sh-inputborder"></td>
										</tr>
										<tr>
											<td style="height: 35px" align="right">職稱：</td>
											<td align="left"><input type="text" size="35"
												id="titlepost" value="${user.titlepost}"
												class="sh-inputborder"></td>
										</tr>
										<tr>
											<td style="height: 35px" align="right">狀態：</td>
											<td align="left"><input type="checkbox" id="status"
												checked="checked">有效</td>
										</tr>
<!-- 										<tr> -->
<!-- 											<td style="height: 35px" align="right">部門：</td> -->
<!-- 											<td align="left"><input type="text" size="31" -->
<%-- 												disabled="disabled" id="deptName" value="${user.deptName}" --%>
<!-- 												class="sh-inputborder"> <input type="hidden" -->
<%-- 												id="deptId" value="${user.deptid}"> <a href="#" --%>
<!-- 												class="k-icon k-i-search" onclick="changeDept()">&nbsp;</a> -->
												<!-- 												<img --> <%-- 												src="<%=resourcesPath%>/img/search-input.gif" --%>
												<!-- 												class="k-button k-button-icontext k-cancel-button" -->
												<!-- 												onclick="changeDept()" /> --></td>
<!-- 										</tr> -->
										<tr>
											<td style="height: 35px" align="right">繕立人：</td>
											<td align="left"><input type="checkbox" id="isinspector"
												checked="checked">是</td>
										</tr>
										<tr>
											<td style="height: 35px" align="right">繕立人編號：</td>
											<td align="left"><input type="text" size="35"
												id="inspectorcode" value="${user.inspectorcode}"
												class="sh-inputborder"></td>
										</tr>
										<tr>
											<td align="right">備註：</td>
											<td align="left"><textarea cols="28" id="remark"></textarea>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div style="height: 400px;">
								<table width="100%" border="0">
									<tr>
										<td>
											<table width="400" border="0">
												<tr>
													<td align="center">可選角色</td>
													<td align="center">已選角色</td>
												</tr>
											</table>
										</td>
									</tr>
									<tr>
										<td>
											<table>
												<tr>
													<td><select multiple size="5" id="listUser1"
														name="listUser1" style="width: 230px; height: 300px;"></select></td>
													<td><input type="button" class="k-button" value=" >> "
														onclick="move(this.form.listUser1,this.form.listUser2)"
														name="B1"> <br> <br> <input
														type="button" class="k-button" value=" << "
														onclick="move(this.form.listUser2,this.form.listUser1)"
														name="B2"></td>
													<td><select multiple size="5" id="listUser2"
														name="listUser2" style="width: 230px; height: 300px;"></select></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div style="text-align: center; margin-top: 5px;">
					<input type="button" value="確定" class="k-button"
						onclick="saveUser(this.form.listUser2)"> <input
						type="button" value="取消" class="k-button" onclick="WinClose()">
				</div>
			</div>
			<div id="ladpGrid" style="display: none">
				<div id="ladpGridDiv"></div>
				<div style="text-align: center;">
					<input type="button" value="返回" class="k-button"
						onclick="btnReturn2()">
				</div>
			</div>
			<div id="deptDivGrid" style="display: none">
				<div id="deptGridDiv"></div>
				<div style="text-align: center;">
					<input type="button" value="返回" class="k-button"
						onclick="btnReturn1()">
				</div>
			</div>
			
		</div>
	</form>

</body>
</html>