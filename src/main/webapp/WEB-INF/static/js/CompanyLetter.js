var companyletterFromVM="";
var selectAll =2;
$(document).ready(function() {
	    companyletterFromVM = kendo.observable({
	    	iscompanyreplysatisfys:"",//企業回覆是否符合要求
	    	companyletterfollowtype:"",//須展開之跟進程序
	    	companyletterfollowtypeStr:"",
	    	recevietypes:"",//收件方式
	    	recevietypeStr:"",
	    	changeNos:"",//期數
	    	fileSource_companyletter : [],
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
				text : '企業回覆符合要求',
				id : '1'
			},{
				text : '另行通知',
				id : '2'
			},{
				text : '轉交其他部門處理',
				id : '3'
			},{
				text : '建議中止發放',
				id : '4'
			},{
				text : '建議取消批給',
				id : '5'
			},{
				text : '審計或調查',
				id : '6'
			}, {
				text : '其它',
				id : '7'
			}   ],
			
			recevietypeSource:[{
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
			
			companyletterChangeNos:function(){				
				forwordJSP('/detail/showJSP?forwordJSP=CompanyLetter&type=show&num='+companyletterFromVM.currenTCompanyLetterNo);
			},
			//讀取文件源
			getFileSource : function() {
				$.ajax({
							cache : false,
							url : contextPath+ "/file/getFile",
							type : "POST",
							async : false,
							data : {
								fileSourceID :companyletterFromVM.get("tcompanyletter.companyletterid"),
								filesourcetype:"Companyletter"
							},
							dataType : "json",
							success : function(data) {
								if(data.FileisNull == 1){
									$('#selectFile').hide();
									companyletterFromVM.set("fileSource_companyletter",data.tfile);
									}else{
										$('#selectFile').show();
										companyletterFromVM.set("fileSource_companyletter",data.tfile);
									}
								setDivHeight();
							},
							error:function(a,b,c){
								alert(a+"/"+b+"/"+c);	
								}
						});
			},
	    	saveCompanyletter:function(e){
	    		$.ajax({
	    			url: contextPath+'/companyletterformForm/updateCompanyLetterForm',
	    			contentType : 'application/json',
	    			type: "POST",
	    			dataType: "json",   
	    			async : false,
	    			data : JSON.stringify(this.tcompanyletter),
	    			success: function(d) {	
								if(companyletterFromVM.currentcompanyletterfollowtype!=companyletterFromVM.tcompanyletter.followtype && companyletterFromVM.tcompanyletter.followtype==4){
									if (confirm("是否建立項目中止發放?")) {
					        			detailinfoVM.set('showStopFinanceVisiblePage',true);
					        			tab('tabId6','tabC6');
					            		forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=add');
					        			return;
					        		}
								}else if(companyletterFromVM.currentcompanyletterfollowtype!=companyletterFromVM.tcompanyletter.followtype && companyletterFromVM.tcompanyletter.followtype==5 ){
					        		if (confirm("是否建立取消批給程序?")) {
					        			detailinfoVM.set('showCancelContractVisiblePage',true);
					        			tab('tabId9','tabC9');
					            		forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=add');
					        			return;
					        		}
					        	}else if(companyletterFromVM.currentcompanyletterfollowtype!=companyletterFromVM.tcompanyletter.followtype && companyletterFromVM.tcompanyletter.followtype==6 ){
					        		if (confirm("是否建立審計或調查?")) {
					        			detailinfoVM.set('showInvestigationVisible',true);
					        			tab('tabId10','tabC10');
					            		forwordJSP('/detail/showJSP?forwordJSP=Investigation&num=0&type=add');
					        			return;
					        		}
					        	}
								forwordJSP('/detail/showJSP?forwordJSP=CompanyLetter&type=show&num='+companyletterFromVM.currenTCompanyLetterNo);		
	    			},
	    			error:function(a,b,c){
			    	alert(a+"/"+b+"/"+c);		    	
			    }
			});
		},
		
		deleteCompanyletter:function(){
			if(confirm("確定要刪除嗎?")){
				var companyletterId=companyletterFromVM.get("tcompanyletter.companyletterid");
				$.ajax({
					url : contextPath + '/companyletterformForm/deleteCompanyLetter?companyletterId='+companyletterId,
					contentType : "application/json",
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						forwordJSP('/detail/showJSP?forwordJSP=CompanyLetter&type=show&num=0');
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
		
		}
		
	});
	
	$(".Save-CompanyLetterForm").click(function(){
		$('#CompanyLetterForm').show();
		$('#CompanyLetterForm-edit').hide();
		setDivHeight();
	});

	$("#Edit-CompanyLetterForm").click(function(){
		$('#CompanyLetterForm-edit').show();
		$('#CompanyLetterForm').hide();
		if(companyletterFromVM.tcompanyletter.followtype==7){
			$('#otherinput').show();
		}
		if(companyletterFromVM.tcompanyletter.recevietype == 6){
			$('#RecevieTypeOther').show();
		}
		setDivHeight();
	}); 
	
	//附件中的“全选”  
	$("#selectAll").click(function() {
		if (selectAll == 2) {
			$("input[name='companyletterFile']").attr("checked", true);
			selectAll=1;
		} else {
			$("input[name='companyletterFile']").attr("checked", false);
			selectAll=2;
		}
		setDivHeight();
	});
	
		// 上傳
		$("#uploadCompanyletterFile").kendoUpload({
			async : {
				
				saveUrl : contextPath + "/file/upload",
				autoUpload : true
			},
			success : function onSuccess(e) {
				companyletterFromVM.getFileSource();
				$("#uploadCompanyletterFile").parent().parent().removeClass("k-widget k-upload k-header");
				setDivHeight();
			},
			error : function onError(e) {
				alert(e);
			},
			upload : function onUpload(e) {
				
				companyletterFromVM.tfile.filesourcetype = "Companyletter";
				companyletterFromVM.tfile.filesourceid =  companyletterFromVM.get("tcompanyletter.companyletterid");
				e.data = {
					tfileJsonStr : JSON.stringify(companyletterFromVM.tfile)
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
	    url: contextPath+'/companyletterformForm/getParamater?caseId='+caseId+"&type="+type+"&num="+num,
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {		    
	        $.extend(companyletterFromVM, d);
	        companyletterFromVM.set("changeNos",d.listNo);
	        if(d.data!="none"){	    
	        	initData();
	        	companyletterFromVM.set("currenTCompanyLetterNo",d.currenTCompanyLetterNo); 	
	    	}else{
	    		$('#CompanyLetterForm-edit').show();
	    		$('#CompanyLetterForm').hide();
	    		detailinfoVM.set('showCompanyLetterFormPage',true);
	    	}
	    },
	    
	    error:function(e){
	    	alert(e);		    	
	    }
	});
	
    kendo.bind($("#CompanyLetterFormContent"), companyletterFromVM);
    
    companyletterFromVM.getFileSource();// 附件
     setDivHeight();
 }); 

function btnRadio(type){
	companyletterFromVM.set("tcompanyletter.iscompanyreplysatisfy",type);

	if(type==1){
		$('#FollowPro').show();
	}else{
		$('#FollowPro').hide();
	}
} 
function followtypeotheronChange(self) {
	  if($(self).val() != 7 ){
		 $('#otherinput').hide();
		 this.companyletterFromVM.tcompanyletter.followtypeotherremark="";
	  }
	  else{
		  $('#otherinput').show();
		  this.companyletterFromVM.tcompanyletter.followtypeotherremark="";
	  }
}

function recevietypeonChange(self) {//來函方式
	  if($(self).val() != 6 ){
		 $('#RecevieTypeOther').hide();
		 this.companyletterFromVM.tcompanyletter.recevietypeotherremark="";
	  }
	  else{
		  $('#RecevieTypeOther').show();
		  this.companyletterFromVM.tcompanyletter.recevietypeotherremark="";
	  }
}

function initData(){
	//企業回覆是否符合要求
	//alert(JSON.stringify(companyletterFromVM.tcompanyletter.iscompanyreplysatisfy));
/*	if(companyletterFromVM.tcompanyletter.iscompanyreplysatisfy!=null){
	if(companyletterFromVM.tcompanyletter.iscompanyreplysatisfy==1){
		companyletterFromVM.set("iscompanyreplysatisfys","是");
	}else if(companyletterFromVM.tcompanyletter.iscompanyreplysatisfy==2){
		companyletterFromVM.set("iscompanyreplysatisfys","否");
	}
	}*/
	
	if(companyletterFromVM.tcompanyletter.followtype ==0){//跟进程序
			companyletterFromVM.set("companyletterfollowtype","--");
		}else if(companyletterFromVM.tcompanyletter.followtype==1){
			companyletterFromVM.set("companyletterfollowtype","企業回覆符合要求");
		}else if(companyletterFromVM.tcompanyletter.followtype==2){
			companyletterFromVM.set("companyletterfollowtype","另行通知");
		}else if(companyletterFromVM.tcompanyletter.followtype==3){
			companyletterFromVM.set("companyletterfollowtype","轉交其他部門處理");
		}else if(companyletterFromVM.tcompanyletter.followtype==4){
			companyletterFromVM.set("companyletterfollowtype","建議中止發放");
		}else if(companyletterFromVM.tcompanyletter.followtype==5){
			companyletterFromVM.set("companyletterfollowtype","建議取消批給");
		}else if(companyletterFromVM.tcompanyletter.followtype==6){
			companyletterFromVM.set("companyletterfollowtype","審計或調查");
		}else if(companyletterFromVM.tcompanyletter.followtype==7){
			companyletterFromVM.set("companyletterfollowtype","其它");
		}
	
	if(companyletterFromVM.tcompanyletter.followtype != 7 ){
		companyletterFromVM.set("companyletterfollowtypeStr",companyletterFromVM.companyletterfollowtype);
	}else{
		companyletterFromVM.set("companyletterfollowtypeStr",companyletterFromVM.companyletterfollowtype+","+companyletterFromVM.tcompanyletter.followtypeotherremark);
	}
	
	if(companyletterFromVM.tcompanyletter.recevietype==0){//收件方式
		companyletterFromVM.set("recevietypes","");
		}else if(companyletterFromVM.tcompanyletter.recevietype==1){
			companyletterFromVM.set("recevietypes","SEPbox");
		}else if(companyletterFromVM.tcompanyletter.recevietype==2){
			companyletterFromVM.set("recevietypes","郵寄");
		}else if(companyletterFromVM.tcompanyletter.recevietype==3){
			companyletterFromVM.set("recevietypes","電郵");
		}else if(companyletterFromVM.tcompanyletter.recevietype==4){
			companyletterFromVM.set("recevietypes","傳真");
		}else if(companyletterFromVM.tcompanyletter.recevietype==5){
			companyletterFromVM.set("recevietypes","親臨");
		}else if(companyletterFromVM.tcompanyletter.recevietype==6){
			companyletterFromVM.set("recevietypes","其它");
		}
	
	if(companyletterFromVM.tcompanyletter.recevietype != 6 ){
		companyletterFromVM.set("recevietypeStr",companyletterFromVM.recevietypes);
	}else{
		companyletterFromVM.set("recevietypeStr",companyletterFromVM.recevietypes+","+companyletterFromVM.tcompanyletter.recevietypeotherremark);
	}
	
	
	companyletterFromVM.set("currentcompanyletterfollowtype",companyletterFromVM.tcompanyletter.followtype);
	companyletterFromVM.set("tcompanyletter.letterdate",getFormatDateByLong(companyletterFromVM.tcompanyletter.letterdate));	
	companyletterFromVM.set("tcompanyletter.companyreceivedate",getFormatDateByLong(companyletterFromVM.tcompanyletter.companyreceivedate));	
	companyletterFromVM.set("tcompanyletter.companyreplydeadline",getFormatDateByLong(companyletterFromVM.tcompanyletter.companyreplydeadline));	
	companyletterFromVM.set("tcompanyletter.comnpanyreplydate",getFormatDateByLong(companyletterFromVM.tcompanyletter.comnpanyreplydate));	
	
	

}

//刪除文件
function delcompanyletterFromFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='companyletterFile']"), function(key, value) {
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
				companyletterFromVM.getFileSource();
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