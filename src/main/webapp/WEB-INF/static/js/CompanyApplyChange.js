var companyapplychangeFromVM="";
var selectAll =2;
$(document).ready(function() {
	
	
	    companyapplychangeFromVM = kendo.observable({
	    	//iscompanyreplysatisfys:"",//企業回覆是否符合要求
	    	companyapplychangefollowtype:"",//須展開之跟進程序
	    	companyapplychangefollowtypeStr:"",//須展開之跟進程序
	    	companyapplychangeapprovalresult:"",//批示決定
	    	lettertypes:"",//來函方式
	    	lettertypeStr:"",
	    	changeNos:"",//期數
	    	
	    	fileSource_companyapplychange : [],
	    	tfile : null,
	    	
			approvereSource:[{
				text : '--',
				id : '0'
			},{
				text : '批准',
				id : '1'
			},{
				text : '不批准',
				id : '2'
			},{
				text : '其他',
					id : '3'
			} ], 
			
			followtypeSource:[{
				text : '--',
				id : '0'
			},{
				text : '審計或調查',
				id : '1'
			},{
				text : '其它',
				id : '2'
			}],
			
			lettertypeSource:[{
				text : '--',
				id : '0'
			},{
				text : 'SEPbox',
				id : '1'
			},{
				text : '郵寄',
				id : '2'
			},{
				text : '電郵',
				id : '3'
			},{
				text : '傳真',
				id : '4'
			},{
				text : '親臨',
				id : '5'
			},{
				text : '其它',
				id : '6'
			} ],
			
			companyApplyChangeNos:function(){				
				forwordJSP('/detail/showJSP?forwordJSP=CompanyApplyChange&type=show&num='+companyapplychangeFromVM.currentCompanyApplyChangeNo);
			},
			
			//讀取文件源
			getFileSource : function() {
				$.ajax({
							cache : false,
							url : contextPath+ "/file/getFile",
							type : "POST",
							async : false,
							data : {
								fileSourceID :companyapplychangeFromVM.get("tcompanyapplychange.companyapplychangeid"),
								filesourcetype:"Companyapplychange"
							},
							dataType : "json",
							success : function(data) {
								if(data.FileisNull == 1){
									$('#selectFile').hide();
									companyapplychangeFromVM.set("fileSource_companyapplychange",data.tfile);
									}else{
										$('#selectFile').show();
										companyapplychangeFromVM.set("fileSource_companyapplychange",data.tfile);
									}
								setDivHeight();
							},
							error:function(a,b,c){
								alert(a+"/"+b+"/"+c);	
								}
						});
			},
			
	    	saveCompanyApplyChange:function(e){
	    		var tcompanyapplychange = JSON.stringify(this.tcompanyapplychange);
	    		$.ajax({
	    			url: contextPath+'/companyapplychangeForm/updateCompanyApplyChangeForm',
	    			contentType : 'application/json',
	    			type: "POST",
	    			dataType: "json",   
	    			async : false,
	    			data : tcompanyapplychange,
	    			success: function(d) {	
	    				if(companyapplychangeFromVM.currentcompanyapplyvhangefollowtype!=companyapplychangeFromVM.tcompanyapplychange.followtype && companyapplychangeFromVM.tcompanyapplychange.followtype==1 ){
			        		if (confirm("是否建立審計或調查?")) {
			        			detailinfoVM.set('showInvestigationVisible',true);
			        			tab('tabId10','tabC10');
			            		forwordJSP('/detail/showJSP?forwordJSP=Investigation&num=0&type=add');
			        			return;
			        		}
			        	}
	    				
	    				forwordJSP('/detail/showJSP?forwordJSP=CompanyApplyChange&type=show&num='+companyapplychangeFromVM.currentCompanyApplyChangeNo);	
	    			},
	    			error:function(a,b,c){
			    	alert(a+"/"+b+"/"+c);		    	
			    }
			});
		},
		
		deleteCompanyApplyChange:function(){
			if(confirm("確定要刪除嗎?")){
				var companyapplychangeId=companyapplychangeFromVM.get("tcompanyapplychange.companyapplychangeid");
				$.ajax({
					url : contextPath + '/companyapplychangeForm/deleteCompanyApplyChange?companyapplychangeId='+companyapplychangeId,
					contentType : "application/json",
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						forwordJSP('/detail/showJSP?forwordJSP=CompanyApplyChange&type=show&num=0');
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
		
		}
		
	});
	
	$(".Save-CompanyApplyChangeForm").click(function(){
		$('#CompanyApplyChangeForm').show();
		$('#CompanyApplyChangeForm-edit').hide();
		setDivHeight();
	});

	$("#Edit-CompanyApplyChangeForm").click(function(){
		$('#CompanyApplyChangeForm-edit').show();
		$('#CompanyApplyChangeForm').hide();
		if(companyapplychangeFromVM.tcompanyapplychange.followtype==2){
			$('#otherinput').show();
		}
		setDivHeight();
	}); 
	
	//附件中的“全选”  
	$("#selectAll").click(function() {
		if (selectAll == 2) {
			$("input[name='companyapplychangeFile']").attr("checked", true);
			selectAll=1;
		} else {
			$("input[name='companyapplychangeFile']").attr("checked", false);
			selectAll=2;
		}
		setDivHeight();
	});
	
		// 上傳
		$("#uploadCompanyapplychangeFile").kendoUpload({
			async : {
				
				saveUrl : contextPath + "/file/upload",
				autoUpload : true
			},
			success : function onSuccess(e) {
				companyapplychangeFromVM.getFileSource();
				$("#uploadCompanyapplychangeFile").parent().parent().removeClass("k-widget k-upload k-header");
				setDivHeight();
			},
			error : function onError(e) {
				alert(e);
			},
			upload : function onUpload(e) {
				
				companyapplychangeFromVM.tfile.filesourcetype = "Companyapplychange";
				companyapplychangeFromVM.tfile.filesourceid =  companyapplychangeFromVM.get("tcompanyapplychange.companyapplychangeid");
				e.data = {
					tfileJsonStr : JSON.stringify(companyapplychangeFromVM.tfile)
				};
				$(".k-upload-files").hide();
			},
			complete : function onComplete(e) {
				$(".k-upload-files").hide('');
				$(".k-upload-files").hide();
			},
			localization : defaultKendoUploadLocalization
		});
		
	
	var caseId=$("#basic_caseid").val();		
	var type=$("#type").val();
	var num=$("#num").val();
	//獲取頁面上需要的數據
	$.ajax({
	    url: contextPath+'/companyapplychangeForm/getParamater?caseId='+caseId+"&type="+type+"&num="+num,
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {		    
	    	$.extend(companyapplychangeFromVM, d);
	        companyapplychangeFromVM.set("changeNos",d.listNo);
	        if(d.data!="none"){	    
	        	initData();
	        	companyapplychangeFromVM.set("currentCompanyApplyChangeNo",d.currentCompanyApplyChangeNo); 	
	    	}else{
	    		$('#CompanyApplyChangeForm-edit').show();
	    		$('#CompanyApplyChangeForm').hide();
	    		detailinfoVM.set('showCompanyApplyChangePage',true);
	    	}
	    },
	    
	    error:function(e){
	    	alert(e);		    	
	    }
	});
	
    kendo.bind($("#CompanyApplyChangeFormContent"), companyapplychangeFromVM);
    companyapplychangeFromVM.getFileSource();// 附件
    setDivHeight();

 }); 

function companyapplychangefollowtypeonChange(self) {
	  if($(self).val() != 2 ){
		 $('#otherinput').hide();
		 this.companyapplychangeFromVM.tcompanyapplychange.followtypeotherremark="";
	  }
	  else{
		  $('#otherinput').show();
		  this.companyapplychangeFromVM.tcompanyapplychange.followtypeotherremark="";
	  }
}

function lettertypeonChange(self) {//來函方式
	  if($(self).val() != 6 ){
		 $('#lettertypeotherinput').hide();
		 this.companyapplychangeFromVM.tcompanyapplychange.lettertypeotherremark="";
	  }
	  else{
		  $('#lettertypeotherinput').show();
		  this.companyapplychangeFromVM.tcompanyapplychange.lettertypeotherremark="";
	  }
}

function initData(){

	if(companyapplychangeFromVM.tcompanyapplychange.approvalresult == 0){
		companyapplychangeFromVM.set("companyapplychangeapprovalresult","");
	}else if(companyapplychangeFromVM.tcompanyapplychange.approvalresult == 1){
		companyapplychangeFromVM.set("companyapplychangeapprovalresult","批准");
	}else if(companyapplychangeFromVM.tcompanyapplychange.approvalresult == 2){
		companyapplychangeFromVM.set("companyapplychangeapprovalresult","不批准");
	}else if(companyapplychangeFromVM.tcompanyapplychange.approvalresult == 3){
		companyapplychangeFromVM.set("companyapplychangeapprovalresult","其他");
	}
	
	if(companyapplychangeFromVM.tcompanyapplychange.followtype ==0){//跟进程序
			companyapplychangeFromVM.set("companyapplychangefollowtype","");
		}else if(companyapplychangeFromVM.tcompanyapplychange.followtype==1){
			companyapplychangeFromVM.set("companyapplychangefollowtype","審計或調查");
		}else if(companyapplychangeFromVM.tcompanyapplychange.followtype==2){
			companyapplychangeFromVM.set("companyapplychangefollowtype","其它");
		}
	if(companyapplychangeFromVM.tcompanyapplychange.followtype != 2 ){
		companyapplychangeFromVM.set("companyapplychangefollowtypeStr",companyapplychangeFromVM.companyapplychangefollowtype);
	}else{
		companyapplychangeFromVM.set("companyapplychangefollowtypeStr",companyapplychangeFromVM.companyapplychangefollowtype+","+companyapplychangeFromVM.tcompanyapplychange.followtypeotherremark);
	}
	if(companyapplychangeFromVM.tcompanyapplychange.lettertype==0){//收件方式
		companyapplychangeFromVM.set("lettertypes","");
		}else if(companyapplychangeFromVM.tcompanyapplychange.lettertype==1){
			companyapplychangeFromVM.set("lettertypes","SEPbox");
		}else if(companyapplychangeFromVM.tcompanyapplychange.lettertype==2){
			companyapplychangeFromVM.set("lettertypes","郵寄");
		}else if(companyapplychangeFromVM.tcompanyapplychange.lettertype==3){
			companyapplychangeFromVM.set("lettertypes","電郵");
		}else if(companyapplychangeFromVM.tcompanyapplychange.lettertype==4){
			companyapplychangeFromVM.set("lettertypes","傳真");
		}else if(companyapplychangeFromVM.tcompanyapplychange.lettertype==5){
			companyapplychangeFromVM.set("lettertypes","親臨");
		}else if(companyapplychangeFromVM.tcompanyapplychange.lettertype==6){
			companyapplychangeFromVM.set("lettertypes","其它");
		}
	if(companyapplychangeFromVM.tcompanyapplychange.lettertype != 6 ){
		companyapplychangeFromVM.set("lettertypeStr",companyapplychangeFromVM.lettertypes);
	}else{
		companyapplychangeFromVM.set("lettertypeStr",companyapplychangeFromVM.lettertypes+","+companyapplychangeFromVM.tcompanyapplychange.lettertypeotherremark);
	}
	companyapplychangeFromVM.set("currentcompanyapplyvhangefollowtype",companyapplychangeFromVM.tcompanyapplychange.followtype);
	
	companyapplychangeFromVM.set("tcompanyapplychange.receivedate",getFormatDateByLong(companyapplychangeFromVM.tcompanyapplychange.receivedate));	
	companyapplychangeFromVM.set("tcompanyapplychange.reportdate",getFormatDateByLong(companyapplychangeFromVM.tcompanyapplychange.reportdate));	
	companyapplychangeFromVM.set("tcompanyapplychange.approvaldate",getFormatDateByLong(companyapplychangeFromVM.tcompanyapplychange.approvaldate));	
	companyapplychangeFromVM.set("tcompanyapplychange.companyreceivedate",getFormatDateByLong(companyapplychangeFromVM.tcompanyapplychange.companyreceivedate));	
}

//刪除文件
function delcompanyapplychangeFromFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='companyapplychangeFile']"), function(key, value) {
		if($(this).attr('checked')=='checked'){	
      	var numValue=$(this).val();
      	//alert(numValue);
      	str+=numValue+",";
		}
	});
	if(str.length>0){
	str=str.substring(0, str.length-1);
	}
	if(str.length>0){
	if (confirm('確定要執行刪除操作嗎！')) {
		$.ajax({
			url : contextPath + '/file/delFile?fileidss=' + str +'&caseId='+ $("#basic_caseid").val(),
			type : "POST",
			dataType : "json",
			success : function(d) {
				companyapplychangeFromVM.getFileSource();
			},
			error : function(a, b, c) {
				alert(a + '\t' + b + '\t' + c);
			}
		});
	}
  	str = "";
	
	}else{
		alert("請選擇需要刪除的文件");
	}
	
}