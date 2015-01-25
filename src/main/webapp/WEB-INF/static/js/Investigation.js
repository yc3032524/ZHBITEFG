var investigationFormVM="";
var selectAll =2;
$(document).ready(function() {
		var caseId=$("#basic_caseid").val();	
	    investigationFormVM = kendo.observable({
	    	approveresults:"",//批示結果
	    	investigationpurposes:"",//目的
	    	isfollowups:"",//是否跟進
	    	isrelatereports:"",//是否有關
	    	changeNos:"",//期數
	    	currentInvestigationfollowtype:0, //當前選中的須展開之跟進程序
	    	Investigationfollowtype:"",//跟進程序
	    	InvestigationfollowtypeStr:"",
	    	investigationentitys:"",//本次進行調查之實體
	    	investigationentityStr:"",//本次進行調查之實體Str
	    	
	    	fileSource_investigation : [],
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
			
			investigationpurposesSource:[{
				text : '--',
				id : '0'
			},{
				text : '審計',
				id : '1'
			},{
				text : '實地調查',
				id : '2'
			}], 
			
			investigationentitySource:[{
				text : '--',
				id : '0'
			},{
				text : '基金人員',
				id : '1'
			},{
				text : '其他',
				id : '2'
			}], 
			
			followtypeSource:[{
				text : '--',
				id : '0'
			},{
				text : '符合審計或調查目的',
				id : '1'
			},{
				text : '要求解釋',
				id : '2'
			},{
				text : '建議撥款',
				id : '3'
			},{
				text : '建議中止發放',
				id : '4'
			},{
				text : '建議取消批給',
				id : '5'
			},{
				text : '其它',
				id : '6'
			}],
	    	
			investigationChangeNos:function(){				
				forwordJSP('/detail/showJSP?forwordJSP=Investigation&type=show&num='+investigationFormVM.currentInvestigationNo);
			},
			//讀取文件源
			getFileSource : function() {
				$.ajax({
							cache : false,
							url : contextPath+ "/file/getFile",
							type : "POST",
							async : false,
							data : {
								fileSourceID :investigationFormVM.get("tinvestigation.investigationid"),
								filesourcetype:"Investigation"
							},
							dataType : "json",
							success : function(data) {
								if(data.FileisNull == 1){
									$('#selectFile').hide();
									investigationFormVM.set("fileSource_investigation",data.tfile);
									}else{
										$('#selectFile').show();
										investigationFormVM.set("fileSource_investigation",data.tfile);
									}
								setDivHeight();
							},
							error:function(a,b,c){
								alert(a+"/"+b+"/"+c);	
								}
						});
			},
			
	    	saveInvestigation:function(e){

	    		$.ajax({
	    			url: contextPath+'/investigationForm/updateInvestigationForm',
	    			contentType : 'application/json',
	    			type: "POST",
	    			dataType: "json",   
	    			async : false,
	    			data : JSON.stringify(investigationFormVM.tinvestigation),
	    			success: function(d) {	
							if(investigationFormVM.currentInvestigationfollowtype!=investigationFormVM.tinvestigation.followtype && investigationFormVM.tinvestigation.followtype==4){
								if (confirm("是否建立項目中止發放?")) {
				        			detailinfoVM.set('showStopFinanceVisiblePage',true);
				        			tab('tabId6','tabC6');
				            		forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=add');
				        			return;
				        		}
							}
							
							if(investigationFormVM.tinvestigation.followtype==5 && investigationFormVM.currentInvestigationfollowtype!=investigationFormVM.tinvestigation.followtype){
				        		if (confirm("是否建立取消批給程序?")) {
				        			detailinfoVM.set('showCancelContractVisiblePage',true);
				        			tab('tabId9','tabC9');
				            		forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=add');
				        			return;
				        		}
				        	}

	    			forwordJSP('/detail/showJSP?forwordJSP=Investigation&type=show&num='+investigationFormVM.currentInvestigationNo);
	    			},
	    			error:function(a,b,c){
	    				alert(a+"/"+b+"/"+c);	
	    			}
			});
		},
		
		deleteInvestigation:function(){
			if(confirm("確定要刪除嗎?")){
				var investigationId=investigationFormVM.get("tinvestigation.investigationid");
				$.ajax({
					url : contextPath + '/investigationForm/deleteInvestigation?investigationId='+investigationId,
					contentType : "application/json",
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						forwordJSP('/detail/showJSP?forwordJSP=Investigation&type=show&num=0')
						
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
		
		},
	});
	
	$(".Save-InvestigationForm").click(function(){
		$('#InvestigationForm').show();
		$('#InvestigationForm-edit').hide();
		setDivHeight();
	});

	$("#Edit-InvestigationForm").click(function(){
		$('#InvestigationForm-edit').show();
		$('#InvestigationForm').hide();
		if(investigationFormVM.tinvestigation.isrelatereport==1){
			$('#reportInput').show();
		}
		if(investigationFormVM.tinvestigation.investigationentity==2){
			$('#rinput2').show();
		}
		if(investigationFormVM.tinvestigation.followtype==6){
			$('#otherinput').show();
		}
		setDivHeight();
	}); 
	//附件中的“全选”  
	$("#selectAll").click(function() {
		if (selectAll == 2) {
			$("input[name='investigationFile']").attr("checked", true);
			selectAll=1;
		} else {
			$("input[name='investigationFile']").attr("checked", false);
			selectAll=2;
		}
		setDivHeight();
	});
	
		// 上傳
		$("#uploadInvestigationFile").kendoUpload({
			async : {
				
				saveUrl : contextPath + "/file/upload",
				autoUpload : true
			},
			success : function onSuccess(e) {
				investigationFormVM.getFileSource();
				$("#uploadInvestigationFile").parent().parent().removeClass("k-widget k-upload k-header");
				setDivHeight();
			},
			error : function onError(e) {
				alert(e);
			},
			upload : function onUpload(e) {
				
				investigationFormVM.tfile.filesourcetype = "Investigation";
				investigationFormVM.tfile.filesourceid =  investigationFormVM.get("tinvestigation.investigationid");
				e.data = {
					tfileJsonStr : JSON.stringify(investigationFormVM.tfile)
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
		url: contextPath+'/investigationForm/getParamater?caseId='+caseId+"&type="+type+"&num="+num,
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {		    
	        $.extend(investigationFormVM, d);
	        investigationFormVM.set("changeNos",d.listNo);
	        investigationFormVM.set("tfile", d.tfile);
	      
	        if(d.data!="none"){	    
	        	initData();
	        	investigationFormVM.set("currentInvestigationNo",d.currentInvestigationNo); 	
	    		
	    	}else{
	    		$('#InvestigationForm-edit').show();
	    		$('#InvestigationForm').hide();
	    		detailinfoVM.set('showInvestigationVisiblePage',true);
	    	}
	    },	    
	    error:function(a,b,c){
	    	alert(a+"/"+b+"/"+c);		    	
	    }
	});
	
    kendo.bind($("#InvestigationFormContent"), investigationFormVM);

    investigationFormVM.getFileSource();// 附件
    setDivHeight();
    
 }); 

function btnRadio(type){
	investigationFormVM.set("tinvestigation.isrelatereport",type);

	if(type==1){
		$('#reportInput').show();
	}else{
		$('#reportInput').hide();
	}
} 

function onChange1(self) {//是否和報告期有關
	  if($(self).val() == 0 ){
		 $('#rinput1').hide();
		 this.investigationFormVM.tinvestigation.reportno="";
	  }
	  else{
		  $('#rinput1').show();
		  this.investigationFormVM.tinvestigation.reportno="";
	  }
}

function onChange22(self) {//本次進行調查之實體
	  if($(self).val() != 2  ){
		 $('#rinput2').hide();
		 this.investigationFormVM.tinvestigation.investigationentitydetail="";
	  }
	  else{
		  $('#rinput2').show();
		  this.investigationFormVM.tinvestigation.investigationentitydetail="";
	  }
}

function onChange2(self) {//跟進程序-其他
	  if($(self).val() != 6 ){
		 $('#otherinput').hide();
		 this.investigationFormVM.tinvestigation.followtypeotherremark="";
	  }
	  else{
		  $('#otherinput').show();
		  this.investigationFormVM.tinvestigation.followtypeotherremark="";
	  }
}



function initData(){
	//本次進行調查之實體
	if(investigationFormVM.tinvestigation.investigationentity==0){
		investigationFormVM.set("investigationentitys","");
	}else if(investigationFormVM.tinvestigation.investigationentity==1){
		investigationFormVM.set("investigationentitys","基金人員");
	}else if(investigationFormVM.tinvestigation.investigationentity==2){
		investigationFormVM.set("investigationentitys","其他");
	}

	//
	if(investigationFormVM.tinvestigation.investigationentity !=2 ){
		investigationFormVM.set("investigationentityStr",investigationFormVM.investigationentitys);
	}else{
		investigationFormVM.set("investigationentityStr",investigationFormVM.investigationentitys+","+investigationFormVM.tinvestigation.investigationentitydetail);
	}
	
	//批准方式
	if(investigationFormVM.tinvestigation.approvalresult==0){
		investigationFormVM.set("approveresults","");
	}else if(investigationFormVM.tinvestigation.approvalresult==1){
		investigationFormVM.set("approveresults","批准");
	}else if(investigationFormVM.tinvestigation.approvalresult==2){
		investigationFormVM.set("approveresults","不批准");
	}else if(investigationFormVM.tinvestigation.approvalresult==3){
		investigationFormVM.set("approveresults","其它");
	}
	
	//審計調查目的
	if(investigationFormVM.tinvestigation.investigationpurpose == 1){
		investigationFormVM.set("investigationpurposes","審計");
	}else if(investigationFormVM.tinvestigation.investigationpurpose == 2){
		investigationFormVM.set("investigationpurposes","實地調查");
	}
	
	//是否有關
	if(investigationFormVM.tinvestigation.isrelatereport == 1){
		investigationFormVM.set("isrelatereports","是");
		$("#radioyes").attr("checked",'true');
	}else if(investigationFormVM.tinvestigation.isrelatereport == 2){
		investigationFormVM.set("isrelatereports","否");
		$("#radiono").attr("checked",'true');
	}
	
	//是否跟進
	if(investigationFormVM.tinvestigation.isfollowup == 1){
		investigationFormVM.set("isfollowups","是");
	}else if(investigationFormVM.tinvestigation.isfollowup == 2){
		investigationFormVM.set("isfollowups","否");
	}


	
	
	//須展開之跟進程序
	if(investigationFormVM.tinvestigation.followtype==0){
		investigationFormVM.set("Investigationfollowtype","");
	}else if(investigationFormVM.tinvestigation.followtype==1){
		investigationFormVM.set("Investigationfollowtype","符合審計或調查目的");
	}else if(investigationFormVM.tinvestigation.followtype==2){
		investigationFormVM.set("Investigationfollowtype","要求解釋");
	}else if(investigationFormVM.tinvestigation.followtype==3){
		investigationFormVM.set("Investigationfollowtype","建議撥款");
	}else if(investigationFormVM.tinvestigation.followtype==4){
		investigationFormVM.set("Investigationfollowtype","建議中止發放");
	}else if(investigationFormVM.tinvestigation.followtype==5){
		investigationFormVM.set("Investigationfollowtype","建議取消批給");
	}else if(investigationFormVM.tinvestigation.followtype==6){
		investigationFormVM.set("Investigationfollowtype","其它");
	}
	
	if(investigationFormVM.tinvestigation.followtype != 6 ){
		investigationFormVM.set("InvestigationfollowtypeStr",investigationFormVM.Investigationfollowtype);
	}else{
		investigationFormVM.set("InvestigationfollowtypeStr",investigationFormVM.Investigationfollowtype+","+investigationFormVM.tinvestigation.followtypeotherremark);
	}
	
	
	
	if(investigationFormVM.tinvestigation.isrelatereport==1){
		$('#reportInput2').show();
	}
	
	investigationFormVM.set("currentInvestigationfollowtype",investigationFormVM.tinvestigation.followtype);
	
	investigationFormVM.set("tinvestigation.investigationdeadline",getFormatDateByLong(investigationFormVM.tinvestigation.investigationdeadline));	
	investigationFormVM.set("tinvestigation.monitorapprovaldate",getFormatDateByLong(investigationFormVM.tinvestigation.monitorapprovaldate));	
	investigationFormVM.set("tinvestigation.investigationdate",getFormatDateByLong(investigationFormVM.tinvestigation.investigationdate));	
	investigationFormVM.set("tinvestigation.companyreceivedate",getFormatDateByLong(investigationFormVM.tinvestigation.companyreceivedate));	
	investigationFormVM.set("tinvestigation.investigationapprovaldate",getFormatDateByLong(investigationFormVM.tinvestigation.investigationapprovaldate));	
}
//刪除文件
function delinvestigationFormFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='investigationFile']"), function(key, value) {
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
				investigationFormVM.getFileSource();
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

 
