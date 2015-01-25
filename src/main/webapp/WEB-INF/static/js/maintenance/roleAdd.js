
		 
		 
$(document).ready(function() {
		 
			 
	 $("#tabstrip").kendoTabStrip({
			animation:	{
				open: {
					effects: "fadeIn"
				}
			}
	});

			 
 });


  var isNew=$("#roleId").val();

  if(isNew==""){ //新增
	//左邊的數據源
	  jQuery.ajax({   
	         type : 'POST',   
	         url : contextPath+'/user/QueryUserList',   
	         dataType:'json',
	         success : function(data){  
	  	       	var listm="";
	  	       	$.each(data.allUserList,function(i,val){	   
	  	       		listm+="<option value="+val.userid+">"+val.loginname+"</option>";
	  	       	});		        	
	           	$("#listUser1").html(listm);
	           	
	        	var listm3="";
	  	       	$.each(data.listAuth,function(i,val){	   
	  	       		listm3+="<option  value="+val.authid+">"+val.authname+"</option>";
	  	       	});		        	
	           	$("#listUser3").html(listm3);
	        
	         },
	         error : function(data){
	         	alert("Error");
	         } 
	  });
  }
  else{ //修改
	  
	//左邊的數據源
	  jQuery.ajax({   
	         type : 'POST',   
	         url : contextPath+'/user/QueryUserListByRoleId?roleId='+isNew,   
	         dataType:'json',
	         success : function(data){  
	        	   	var listm="";
		  	       	$.each(data.noUserList,function(i,val){	   
		  	       		listm+="<option  value="+val.userid+">"+val.loginname+"</option>";
		  	       	});		        	
		           	$("#listUser1").html(listm);
		           	
		          	var listm2="";
		  	       	$.each(data.hasUserList,function(i,val){	   
		  	       		listm2+="<option value="+val.userid+">"+val.loginname+"</option>";
		  	       	});		        	
		           	$("#listUser2").html(listm2);
	        
		         	var listm3="";
		  	       	$.each(data.noAuthList,function(i,val){	   
		  	       		listm3+="<option  value="+val.authid+"  >"+val.authname+"</option>";
		  	       	});		        	
		           	$("#listUser3").html(listm3);
		           	
		           	
		        	var listm4="";
		  	       	$.each(data.hasAuthList,function(i,val){	   
		  	       		listm4+="<option style='width:300px'  value="+val.authid+">"+val.authname+"</option>";
		  	       	});		        	
		           	$("#listUser4").html(listm4);
		           	
		         
		           	
		           	
	         },
	         error : function(data){
	         	alert("Error");
	         } 
	  });
	  
	  
  }


function WinClose(){
	$("#addRoleDiv").data("kendoWindow").close();
}

/**
 * 保存更新 角色
 */
function saveRole(box2,box4){
	
	var name=$("#roleName").val();
	if(name==""){
		alert("角色名不能為空");
	}
	else{
		var ids="";
		for(var i=0; i<box2.options.length; i++) {
				ids+=box2.options[i].value+",";
		}
		var roleId=$("#roleId").val();
		
		
		var authIds="";
		for(var i=0; i<box4.options.length; i++) {
			authIds+=box4.options[i].value+",";
		}
		
		
		var param={
				name:name,
				strUserIds:ids,
				roleId:roleId,
				authIds:authIds			
		}
		 var url=encodeURI(contextPath+'/role/saveRole');
		
		// var url=encodeURI(contextPath+'/role/saveRole?name='+name+"&strUserIds="+ids+"&roleId="+roleId+"&authIds="+authIds);
		jQuery.ajax({   
		       type : 'POST',   
		       url : url,   
		       data:param,
		       dataType:'json',
		       success : function(data){  
		    	   WinClose();
		    	   refurbishData();
		       },
		       error : function(data){
		        	alert("Error");
		       } 
		});
	}		
}

