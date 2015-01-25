$(document).ready(function() {
	
	var openUserSource=new kendo.data.DataSource({
    	transport: {
            read: {
            	url:contextPath+'/user/getCheckUserList',
            	dataType: 'json',
                type: "POST"
        	}
    	},
        serverFiltering: true,
        pageSize: 15,
        pageable: {
	        pageSizes: [10, 20, 50]
		},
	    schema: {
           	data:function(d) {
				return d;	
			}
        }
          
    });
	

	 $("#checkUserGrid").kendoGrid({
	        dataSource: openUserSource,    
	        selectable: "row",
	        scrollable: false,
	        pageable: true, 
	        pageSize: 15,
	        pageable: {
		        pageSizes: [10, 20, 50]
			},
	        change: function(){
	        	var gr1 = $("#checkUserGrid").data("kendoGrid");
	    		var $selectedItem = $(gr1.select()[0]); //獲取第一列             
	    		var  viewGrid=$("#checkUserGrid").data("kendoGrid").dataItem($selectedItem);
	    	    var fullname=	viewGrid.loginname; 
	    	    var userid=	viewGrid.userid;		
	    	    returnCheckUser(userid,fullname);
	    	 	$("#checkUserDiv").data("kendoWindow").close();
	    	  
	        },
	        columns : [
						{
							field : "loginname",
							title : "用戶名",
							width : "100px",
							template : '#=kendo.toString(replaceValue(loginname))#'
						},
//						{
//							field : "deptid",
//							width : "100px",
//							title : "部門",
//							template : '#=kendo.toString(replaceValue(tissuedept.cname))#'
//						},
						{
							field : "contactphone",
							width : "100px",
							title : "聯繫電話",
							template : '#=kendo.toString(replaceValue(contactphone))#'
						} ]
	      });
	
	
});


function returnDept(obj){
	if(obj!=null && obj !=""){
		return obj.cname;
	}
	return "";
	
}

function cleanSurveyorUser(){
	returnCheckUser("","");
 	$("#checkUserDiv").data("kendoWindow").close();
}

