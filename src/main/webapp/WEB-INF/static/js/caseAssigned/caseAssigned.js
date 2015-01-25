var assignmentVm = "";
var param="";
var leftchoose=-2;
jQuery(document).ready(function($) {
	
	$('#cancelAsssignment').hide();
	assignmentVm = kendo.observable({
		caseAssigned : null,
		reportNumSelect:null,
		
		
		reportNumSource:[{
			text : '全部',
			id : '0'
		},{
			text : '≠',
			id : '1'
		},{
			text : '≤',
			id : '2'
		},{
			text : '≥',
			id : '3'
		},{
			text : '<',
			id : '4'
		},{
			text : '>',
			id : '5'
		},{
			text : '=',
			id : '6'
		}], 
		
		reportNumMarkChange:function(e) {
			this.caseAssigned.reportNumMark = this.reportNumSelect.id;
		},
		
		search : function() {
			this.getSupportTypes();
			this.gridSource.read({
				page : 1
			});
	
		},
		// 查詢結果數據集合
		gridSource : new kendo.data.DataSource({
			transport : {
				read : {
					url : contextPath + '/CaseAssigned/getCaseAssigned',
					dataType : 'json',
					type : "POST",
					data : function() {
	
  				        //alert(JSON.stringify(assignmentVm.offsupportTypeSelect));
						if(assignmentVm.caseAssigned.querytmp==null){
							searchTmp(1);
						}
						param = assignmentVm.caseAssigned;
						return param;
					}
				}
			},
			pageSize : 20,
			serverPaging : true,
			serverSorting : true,
			serverFiltering : true,
			schema : {
				data : function(d) {
					return d.data;
				},
				total : function(d) {
					return d.totalCount;
				}
			}
		}),
		
		clear : function(){
			isSelect = false;
			$("table[name='paramTable'] input:text").each(function () {
				$(this).val("");
			});
			$.each($("input[name='supportType']"), function(key, value) {
				
				$(this).attr('checked',false);
			});
			
			this.set("reportNumSelect", this.reportNumSource[0]);
			this.caseAssigned.supportTypes='';
			this.caseAssigned.reportNum = '';
			this.caseAssigned.reportNumMark=0;
		},
		//分派個案
		openAsssignment : function(){
		    var ids = new Array();
			  $.each($("input[name='editBatchAddr']"), function(k, v) {
		          if ($(v).attr("checked") != undefined) {
		              ids[ids.length] = $(v).attr("id");
		          }
		      });
			   parameterCaseIds="";
			   parameterCaseIds = ids.join(",");	
			
			if (ids.length>0) {
				var windowAs = $("#openAsssignmentDiv").kendoWindow({
					title : "分派個案",
					width : "500px",
					content : contextPath + "/CaseAssigned/openAsssignmentJsp",
					modal:true
				}).data("kendoWindow");
				windowAs.center();
				windowAs.open();
			} else {
				alert("請選擇需要指派的個案");
			}
			leftchoose=-2;
		},
		//獲取所有選中的存放到數組checked
		getSupportTypes:function (){
			var str="";
			$.each($("input[name='supportType']"), function(key, value) {
				if($(this).attr('checked')=='checked'){	
					var numValue=$(this).val();
					//alert(numValue);
					str+=numValue+",";
				}
			});
			if(str.length>0){
				str=str.substring(0, str.length-1);
				this.caseAssigned.supportTypes = str;
			}
			str = "";
		},
		
		//取消分派
		cancelAsssignment : function(){
		    	var ids = new Array();
			  $.each($("input[name='editBatchAddr']"), function(k, v) {
		        if ($(v).attr("checked") != undefined) {
		            ids[ids.length] = $(v).attr("id");
		        }
		    }); 
			  parameterCaseIds="";
			  parameterCaseIds = ids.join(",");	
			if (ids.length>0) {
				if (confirm("確定取消分派?")) {
					var param={
							parameterCaseIds:parameterCaseIds					
							};
					$.ajax({
						url: contextPath+'/CaseAssigned/cancelCaseAssignment',
						type : "POST",
						data: param,
						dataType : "json",
						async:false,
						success : function(d) {
							//$("input[name='addAddrAll']").attr("checked", false);
							$.growlUI('取消分派', "取消成功！");
							parameterCaseIds="";
							// 刷新數據
							initLeftData();
							searchTmp(1);
							$("#addAddrAll").attr("checked",false);
							leftchoose=-2;
							$('#cancelAsssignment').hide();
						},
						error : function(e) {
							errorAlert();
						}
					});
				}
			
			} else {
				alert("請選擇需要取消指派的個案");
			}
		}
		
	});

	// 獲取頁面上需要的數據

 	$.ajax({
		url : contextPath + '/CaseAssigned/getParamater',
		type : "POST",
		dataType : "json",
		success : function(d) {
			$.extend(assignmentVm, d);
			kendo.bind($("#div_Assignment"), assignmentVm);
			//給全選綁定click事件
			$("#addAddrAll").click(function() {
				if ($(this).attr("checked") != undefined) {
					$("input[name='editBatchAddr']").attr("checked", true);
				} else {
					$("input[name='editBatchAddr']").attr("checked", false);
				}
				
			});
			assignmentVm.set("reportNumSelect",assignmentVm.reportNumSource[0]);
			
		},
		error : function(e) {
			alert(e);
		}
	});
 	
 	//加載左邊人員數據
	   homogeneous = new kendo.data.HierarchicalDataSource({
         transport: {
             read: {
                 url: contextPath+ '/user/QueryAllUser2',
                 dataType: "json",
             	type : "POST"
             }
         },
         schema: {
             model: {
                 id: "userid",
                 children:"list"
             },
             data:function(e){
            	 var  source = e;   
            	 return source;
             }
         },
         expanded: true,
         
     });

	var treeview =$("#treeview").kendoTreeView(	{
	    template: kendo.template($("#treeview-template").html()),
		dataSource : homogeneous,	
		select : onSelect,	
	}).data("kendoTreeView");
	
 	

});

//跳轉
function doCondition(caseId){
	location.href=contextPath+"/detail/info?caseid="+caseId;
}
//刷新左邊Treeview
function initLeftData() {
	homogeneous.read();
}


function onSelect(e) {
	$("input[name='addAddrAll']").attr("checked", false);
	parameterCaseIds = "";
	var data = $("#treeview").data('kendoTreeView').dataItem(e.node);
	assignmentVm.getSupportTypes();
	//點擊分派或未分派或人員
		if(data.userid == -1 && data.applytypeid == null) {//點擊分派
			searchTmp(2);
			$('#Asssignment').show();
			$('#cancelAsssignment').show();
		}
		if(data.userid == -2 && data.applytypeid == null) {//點擊未分派
			searchTmp(1);
			$('#cancelAsssignment').hide();
			$('#Asssignment').show();
			
		}
		if(data.userid > 0 && data.applytypeid == null){ //點擊人員
			assignmentVm.set("caseAssigned.userid", data.userid);
			searchTmp(3);
			$('#Asssignment').show();
			$('#cancelAsssignment').show();
		}
		
		if(data.userid != null && data.applytypeid != null){//點擊支付方式
			assignmentVm.set("caseAssigned.userid", data.applytypeid);
			assignmentVm.set("caseAssigned.applytypeid", data.userid);
			searchTmp(4);
			$('#Asssignment').show();
			$('#cancelAsssignment').show();
	}
		$("#userid"+leftchoose).removeClass("userbg");
}

function searchTmp(querytmp){
	assignmentVm.set("caseAssigned.querytmp", querytmp);
	assignmentVm.gridSource.read();

}


