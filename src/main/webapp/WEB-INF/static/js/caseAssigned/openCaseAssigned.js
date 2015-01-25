var openstate="1";
jQuery(document).ready(function() {
	
	var openUserSource=new kendo.data.DataSource({
    	transport: {
            read: {
            	url:contextPath+'/user/QueryAllUser',
            	dataType: 'json',
                type: "POST"
        	}
    	},
        serverFiltering: true,
        pageSize: 15,
	    schema: {
           	data:function(d) {
				return d;	
			}
        }
          
    });

	 $("#surveyorUserGrid").kendoGrid({
	        dataSource: openUserSource,    
	        selectable: "row",
	        scrollable: false,
	        pageable: true, 
	    	pageSize: 15,
	    	pageable: {
		        pageSizes: [10, 20, 50]
			},
	        change: function(){
	        	var gr1 = $("#surveyorUserGrid").data("kendoGrid");
	    		var $selectedItem = $(gr1.select()[0]); //獲取第一列             
	    		var  viewGrid=$("#surveyorUserGrid").data("kendoGrid").dataItem($selectedItem);
	    	    var userid=	viewGrid.userid;
	    	    if(openstate==1){
	    	    openstate=2;
	    	    OKRefer(userid);
	    	    }
	        },
	        columns : [ {
				field : "loginname",
				title : "用戶全名",
				width : "100px",
				template : '#=kendo.toString(replaceValue(loginname))#'			
			}]
	      });
});

function OKRefer(userid){

	if(confirm("確定分派?")){
		openstate=1;
	    $("#openAsssignmentDiv").data("kendoWindow").close(); 
	    var param={
				parameterCaseIds:parameterCaseIds					
				};
		$.ajax({
		    url: contextPath+'/CaseAssigned/updateCaseAssignment?assignerid='+userid,
		    type: "POST",
		    async:false,
		    data:param,
		    dataType: "json",   
		    success: function(d) {	
		    	$.growlUI('分派', "分派成功！");
		    	//刷新左邊人員
		    	initLeftData();
		    	//刷新右邊數據
				assignmentVm.set("caseAssigned.userid", userid);
				searchTmp(3);
		    	$('#cancelAsssignment').show();
		    	$("#addAddrAll").attr("checked",false);
		    	leftchoose=userid;
		    	parameterCaseIds="";
		    },
		});
	
	}
	openstate=1;
}
