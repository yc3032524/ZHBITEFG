var userData = null;
var roleData = null;
var userId = null;
$(document).ready(function() {
	initKendoGrid();
});
function initKendoGrid() {
	userData = new kendo.data.DataSource({
		transport : {
			read : {
				url : contextPath + "/user/QueryUserSource",
				dataType : 'json',
				type : "POST"
			}
		},
		pageSize : 10,
		pageable : true
	}), roleData = new kendo.data.DataSource({
		transport : {
			read : {
				url : contextPath + "/user/QueryRoleByUserId",
				dataType : 'json',
				type : "POST",
				data : function() {
					var param = {
						userId : userId
					};
					return param;
				}
			}
		},
		pageSize : 10,
		pageable : true
	});
	$("#userGrid")
			.kendoGrid(
					{
						dataSource : userData,
						selectable : "row",
						toolbar : kendo.template($("#template").html()),
						pageSize : 10,
						pageable : true,
						pageable : defaultPageable,
						scrollable : false,
						change : function() {
							$("#roleGrid").show();
							var gr1 = $("#userGrid").data("kendoGrid");
							var $selectedItem = $(gr1.select()[0]); // 獲取第一列
							var viewGrid = $("#userGrid").data("kendoGrid")
									.dataItem($selectedItem);
							userId = viewGrid.userid;
							roleData.read();
						},
						columns : [
								{
									field : "loginname",
									title : "登錄名",
									width : "80px",
									template : '#=kendo.toString(replaceValue(loginname))#'
								},
//								{
//									field : "loginname",
//									title : "用戶名",
//									width : "80px",
//									template : '#=kendo.toString(replaceValue(loginname))#'
//								},
								{
									field : "contactphone",
									width : "100px",
									title : "聯繫電話",
									template : '#=kendo.toString(replaceValue(contactphone))#'
								},
								{
									field : "titlepost",
									width : "100px",
									title : "職稱",
									template : '#=kendo.toString(replaceValue(titlepost))#'
								},
//								{
//									field : "cname",
//									width : "100px",
//									title : "部門",
//									template : '#=kendo.toString(replaceValue(tissuedept.cname))#'
//								},
								{
									field : "status",
									width : "60px",
									title : "狀態",
									template : '#=kendo.toString(returnStatus(status))#'
								},
								{
									field : "userdesc",
									width : "120px",
									title : "備註",
									template : '#=kendo.toString(replaceValue(userdesc))#'
								},
								{
									field : "creator",
									title : "創建人",
									width : "110px",
									template : '#=kendo.toString(replaceValue(creator))#'
								},
								{
									field : "createtime",
									title : "創建日期",
									width : "90px",
									template : '#=kendo.toString(getFormatDateByLong(createtime))#'
								},
								{
									field : "modifier",
									title : "更新人",
									width : "120px",
									template : '#=kendo.toString(replaceValue(modifier))#'
								},
								{
									field : "modifiedtime",
									title : "更新日期",
									width : "90px",
									template : '#=kendo.toString(getFormatDateByLong(modifiedtime))#'
								},
								{
									field : "isinspector",
									title : "繕立人",
									width : "90px",
									template : '#=kendo.toString(returnIsinspector(isinspector))#'
								},
								{
									field : "inspectorcode",
									title : "繕立人編號",
									width : "90px",
									template : '#=kendo.toString(replaceValue(inspectorcode))#'
								} ]
					});
	$("#roleGrid").kendoGrid({
		dataSource : roleData,
		selectable : "row",
		pageSize : 10,
		pageable : true,
		pageable : defaultPageable,
		scrollable : false,
		columns : [ {
			field : "rolename",
			title : "擁有的角色",
			template : '#=kendo.toString(replaceValue(trole.rolename))#'
		}, {
			field : "authName",
			title : "擁有的權限",
			template : '#=replaceValue(authname)#'
		} ]
	});
}
function returnStatus(type) {
	if (type == 0 || type == null) {
		return "無效";
	}
	return "有效";
}
function returnIsinspector(isinspector) {
	if (isinspector == 0 || isinspector == null) {
		return "否";
	}
	return "是";
}
function addUser(type) {
	var userid = "";
	var loginname = "";
	var userdesc = "";
	var contactphone = "";
	var titlepost = "";
	var status = "";
	var deptid = "";
	var deptName = "";
	var isinspector = "";
	var inspectorcode = "";
	if (type == "2") {// 修改
		var gr1 = $("#userGrid").data("kendoGrid");
		var $selectedItem = $(gr1.select()[0]); // 獲取第一列
		var vg = $("#userGrid").data("kendoGrid").dataItem($selectedItem);
		if (vg != undefined) {
			userid = vg.userid;
			loginname = vg.loginname;
			userdesc = vg.userdesc;
			contactphone = vg.contactphone;
			titlepost = vg.titlepost;
			status = vg.status;
			deptid = vg.deptid;
			isinspector = vg.isinspector;
			inspectorcode = vg.inspectorcode;
		} else {
			alert("請選中需要修改的數據");
			return false;
		}
	}
	var param = {
		userid : userid,
		loginname : loginname,
		userdesc : userdesc,
		contactphone : contactphone,
		titlepost : titlepost,
		status : status,
		deptid : deptid,
		isinspector : isinspector,
		inspectorcode : inspectorcode
	};
	var url = encodeURI(contextPath + "/user/userAddJSP?param="
			+ JSON.stringify(param) + "&type=" + type);
	var window = $("#addUserDiv").kendoWindow({
		title : "用戶管理",
		width : "565px",
		content : url
	}).data("kendoWindow");
	window.center();
	window.open();
}
//刷新
function refurbishData(){
	userData.read();
	roleData.read();
}