var roleData = null;
var roleId=null;
var roleName="";

$(document).ready(function() {
	    roleData = new kendo.data.DataSource({			
			transport : {
				read : {
					url : contextPath + "/role/QueryAllRole2",
					dataType : 'json',
					type : "POST"
				}
			},
			pageSize : 10,
			pageable : true
			
		})
	    
	   
	
	//所有角色
	$("#roleGrid").kendoGrid({
		dataSource : roleData,
		selectable : "row",
		pageable: true,	
		pageable: defaultPageable,
        toolbar: kendo.template($("#template").html()),	
	    pageSize: 10,
	    scrollable: false,       	
		change : function() {
		    $("#userGrid").show();
		    $("#authGrid").show();		    
			var gr1 = $("#roleGrid").data("kendoGrid");
			var $selectedItem = $(gr1.select()[0]); // 獲取第一列
			var viewGrid = $("#roleGrid").data("kendoGrid").dataItem($selectedItem);
			roleId = viewGrid.roleid;
			roleName=viewGrid.rolename;			
		},
		columns : [ {
			field : "rolename",
			width : "100px",
			title : "所有角色",
			template : '#=kendo.toString(replaceValue(rolename))#'
		},{
			field : "username",
			title : "擁有用戶",
			width : "100px",
			template:'#=replaceValue(username)#',
		},{
			field : "authname",
			title : "擁有權限",
			width : "600px",
			template:'#=replaceValue(authname)#',
		}
		
		]
	});
	    
		
});	

function addRole(type){
	var id="";
	var name="";
	if(type=="2"){//修改
		id=roleId;
		name=roleName;
		if(name=="" || name==null){
			alert("請選中需要修改的數據");
			return false;
		}
	}
	
	var url=encodeURI(contextPath + "/role/roleAddJSP?roleId="+id+"&roleName="+name);
	var window = $("#addRoleDiv").kendoWindow({
		title : "角色維護",
		width : "900px",
		content: url
	}).data("kendoWindow");

	window.center();
	window.open();
}

function refurbishData(){
	roleData.read();
}


