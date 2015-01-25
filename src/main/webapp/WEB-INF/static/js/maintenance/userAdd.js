var deptData = null;

$(document).ready(function() {

	$("#tabstrip").kendoTabStrip({
		animation : {
			open : {
				effects : "fadeIn"
			}
		}
	});

//	deptData = new kendo.data.DataSource({
//		transport : {
//			read : {
//				url : contextPath + "/dept/QueryDeptList",
//				dataType : 'json',
//				type : "POST"
//			}
//		}
//	}),

	// ladpData = new kendo.data.DataSource({
	// transport : {
	// read : {
	// url : contextPath + "/user/QueryLadpUser",
	// dataType : 'json',
	// type : "POST"
	// }
	// },
	// pageSize : 10,
	// pageable : true
	// });

	document.getElementById("remark").value = $("#userDesc").val();

	var userId = $("#userId").val();
	if (userId != "") {
		var status = $("#tstatus").val();
		if (status == 1) {
			$("#status").attr("checked", true);
		} else {
			$("#status").attr("checked", false);
		}
		// $("#synchroUser").show();
		var isinspector = $("#isinspector").val();
		if (isinspector != "") {
			var isinspector = $("#tisinspector").val();
			if (isinspector == 1) {
				$("#isinspector").attr("checked", true);
			} else {
				$("#isinspector").attr("checked", false);
			}
		}
	}
});

function saveUser(box) {
	var ids = "";

	for (var i = 0; i < box.options.length; i++) {
		ids += box.options[i].value + ",";
	}

	var userId = $("#userId").val();
	var deptId = $("#deptId").val();
	var loginname = $("#cname").val();
	var phone = $("#phone").val();
	var titlepost = $("#titlepost").val();
	var remark = $("#remark").val();
	var status = 0;
	var isinspector=0;
	var inspectorcode=$("#inspectorcode").val();
	if (loginname == "") {
		alert("登陸名不能為空");
		return false;
	} 
//	else if (deptId == "") {
//		alert("部門不能為空");
//		return false;
//	}

	if ($("#status").attr("checked")) {
		status = 1;
	}
	if ($("#isinspector").attr("checked")) {
		isinspector = 1;
	}

	var param = {
		strRoleIds : ids,
//		deptid : deptId,
		userid : userId,
		loginname : loginname,
		contactphone : phone,
		titlepost : titlepost,
		userdesc : remark,
		status : status,
		isinspector:isinspector,
		inspectorcode:inspectorcode
	};

	var url = encodeURI(contextPath + '/user/SaveUser');
	jQuery.ajax({
		type : 'POST',
		url : url,
		data : param,
		dataType : 'json',
		success : function(data) {
			refurbishData();
			$("#addUserDiv").data("kendoWindow").close();
		},
		error : function(data) {
			alert("Error");
		}
	});

}

var btndept = 0;

//// 帶出部門
//function changeDept() {
//	$("#addRoleDiv").hide();
//	$("#deptDivGrid").show();
//	if (btndept == 0) {
//		// 部門
//		$("#deptGridDiv").kendoGrid(
//				{
//					dataSource : deptData,
//					scrollable : false,
//					selectable : "row",
//					change : function() {
//						var gr1 = $("#deptGridDiv").data("kendoGrid");
//						var $selectedItem = $(gr1.select()[0]); // 獲取第一列
//						var viewGrid = $("#deptGridDiv").data("kendoGrid")
//								.dataItem($selectedItem);
//						$("#deptName").val(viewGrid.cname);
//						$("#deptId").val(viewGrid.issuedeptid);
//						btnReturn1();
//					},
//					columns : [ {
//						field : "cname",
//						title : "部門名稱",
//						template : '#=kendo.toString(replaceValue(cname))#'
//					} ]
//				});
//	} else {
//		deptData.read();
//	}
//	btndept = 1;
//
//}

function btnReturn1() {
	$("#addRoleDiv").show();
	$("#deptDivGrid").hide();
}

var btnUser = 0;
// 帶出人員
// function changeLoginName(){
// $("#addRoleDiv").hide();
// $("#ladpGrid").show();
//	
// if(btnUser!=0){
// ladpData.read();
// }else{
// //從ladp帶入的人員
// $("#ladpGridDiv").kendoGrid({
// dataSource : ladpData,
// selectable : "row",
// pageSize: 10,
// pageable: true,
// scrollable: false,
// change : function() {
// var gr1 = $("#ladpGridDiv").data("kendoGrid");
// var $selectedItem = $(gr1.select()[0]); //獲取第一列
// var viewGrid=$("#ladpGridDiv").data("kendoGrid").dataItem($selectedItem);
// $("#cname").val(viewGrid.loginname);
// $("#fullname").val(viewGrid.fullname);
// $("#code").val(viewGrid.code);
// $("#phone").val(viewGrid.contactphone);
// $("#email").val(viewGrid.email);
// $("#titlepost").val(viewGrid.titlepost);
// $("#code").val(viewGrid.code);
//		    	    
// btnReturn2();
// },
// columns : [ {
// field : "loginname",
// title : "登錄名",
// template : '#=kendo.toString(replaceValue(loginname))#'
// }]
// });
//		
// }
// btnUser=1;
//	
// }

function btnReturn2() {
	$("#addRoleDiv").show();
	$("#ladpGrid").hide();
}

function WinClose() {
	$("#addUserDiv").data("kendoWindow").close();
}

// 同步當前用戶資料
// function UserSynchro(){
// if(confirm("確定同步當前用戶資料")){
// var loginName=$("#cname").val();
// jQuery.ajax({
// type : 'POST',
// url : contextPath+'/user/UpdateLadpUser?loginName='+loginName,
// dataType:'json',
// success : function(data){
// $("#fullname").val(data.fullname);
// $("#code").val(data.code);
// $("#phone").val(data.contactphone);
// $("#email").val(data.email);
// $("#titlepost").val(data.titlepost);
//		    	    
// $.growlUI('同步當前用戶資料', "同步成功！");
// },
// error : function(data){
// alert("Error");
// }
// });
// }
// }

var userId = $("#userId").val();
if (userId == "") {// 新增user
	jQuery.ajax({
		type : 'POST',
		url : contextPath + '/role/QueryAllRole',
		dataType : 'json',
		success : function(data) {
			var listm = "";
			$.each(data, function(i, val) {
				listm += "<option value=" + val.roleid + ">" + val.rolename
						+ "</option>";
			});
			$("#listUser1").html(listm);

		},
		error : function(data) {
			alert("Error");
		}
	});

} else {// 修改

	jQuery.ajax({
		type : 'POST',
		url : contextPath + '/user/QueryUserRoleByUserId?userId=' + userId,
		dataType : 'json',
		success : function(data) {
			var listm = "";
			$.each(data.notRoleList, function(i, val) {
				listm += "<option value=" + val.roleid + ">" + val.rolename
						+ "</option>";
			});
			$("#listUser1").html(listm);

			var listm2 = "";
			$.each(data.hasRoleList, function(i, val) {
				listm2 += "<option value=" + val.roleid + ">" + val.rolename
						+ "</option>";
			});
			$("#listUser2").html(listm2);

		},
		error : function(data) {
			alert("Error");
		}
	});
}
