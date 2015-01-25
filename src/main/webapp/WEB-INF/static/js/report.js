var reportVM="";
var reportNo="";
var reportCountNo="";//當前caseId下的總期數
var selectAll =2;
$(document).ready(function() {
	


	
    reportVM = kendo.observable({
		checkState:"--",
		checkName:"",	
		checkedSatae:[{
			text : '--',
			id : '0'
		},{
			text : '已核對',
			id : '1'
		},{
			text : '未核對',
			id : '2'
		} ],  
		attachType:[{
			text : '---',
			id : '0'
		},{
			text : '財務報表',
			id : '1'
		},{
			text : '審計賬目',
			id : '2'
		} ],
		attachTypeName:"--",
		reportApproveStatusType:[{
			text : '--',
			id : '0'
		},{
			text : '中止',
			id : '1'
		},{
			text : '撥付',
			id : '2'
		},{
			text : '取消',
			id : '3'
		},{
			text : '中止後撥付',
			id : '4'
		},{
			text : '中止後取消',
			id : '5'
		},{
			text : '返還',
			id : '6'
		},{
			text : '報告通過',
			id : '7'
		},{
			text : '其它',
			id : '8'
		}
		],
		reportapprovestatusName:"--",
		changeNos:"",
		currentReportNo:1,
		islastNo:false,    //true為最後一期
		appslist:"", //查詢協議書 的批准資助方式	
		saveReport:function(){		
		
			getDropDownlist();
			reportVM.set("report.suggenstiondata", JSON.stringify(reportVM.products));
			if(reportVM.judgeamount()){//驗證金額格式
				
				$.ajax({
					url : contextPath + '/report/updateReport',
					contentType : "application/json",
					data : JSON.stringify(reportVM.report),
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						RefreshBasicData();
						//刷新系統右邊的數據列表
						 detailinfoVM.GetRightReportData();
						forwordJSP('/detail/showJSP?forwordJSP=report&num='+reportVM.currentReportNo+'&type=show');
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
			
			return false;
			
		},
		getReportData2:function(){
			getReportData();			
			onChangeReport();
			
		},
		productSuggenstionData:"",//存儲分析報告的數據
		products : function() {
			reportid=reportVM.report.reportid;
			var str = [];	
			if(reportid!="" && reportid!=null && reportid!="null"){
				$.ajax({
					url : contextPath+ '/report/getSuggenstionList?reportid='+reportid,
					type : "POST",
					async : false,
					dataType : "json",
					success : function(d) {		
						str = d;					
					},
					error : function(e) {
						alert(e);
					}
				});
			}
				
		
			this.set("products", str);

		},
		addSuggenstion:function(){	//添加分析報告	
	
			if(confirm("是否增加建議書？")){
				this.get("products").push({
					suggestionid:"",
					suggestioncode : '',
					suggestionapprovetime :"", 			
					remark:"",
					appList:reportVM.appslist,
					num:this.get("products").length//編號
					
				});
				setDivHeight();
			}
		
		},
		deleteSuggenstion:function(e){	
			var products = this.get("products");
			//alert(JSON.stringify(products));
			
			var checked=new Array();	
			var n=0;
			
			var suggestionIds="";//記住所有勾選中的suggestionId
			
			//獲取所有選中的存放到數組	checked
			$.each($("input[name='checkBoxReport']"), function(key, value) {
				if($(this).attr('checked')=='checked'){	
					
		      	var numValue=$(this).val();
//		      	alert(numValue);
		      	var  strs= numValue.split("mm");
		      	if(str[1]!==""){
		      		suggestionIds+=strs[1]+",";
		      	}	
		      	
				checked[n]=strs[0];
				n++;
				}
			});
						
			
			if(suggestionIds.length==0){
				alert("請勾選你需要刪除的分析報告!");
				return false;
			}
			
			if(confirm("確定要刪除嗎?")){
				reportVM.set("report.suggestionIds",suggestionIds);
				
				for(var m=n;m>0;m--){
					products.splice(checked[m-1], 1);//移出數據
				}
				
			}
			
		
			setDivHeight();
			
		},
		editReport:function(e){ //編輯
			$('#Report-edit1').show();
			$('#ReportLast').hide();
			setDivHeight();
			
			reportVM.DIVTxt();
		},
		judgeamount:function(e){
			if(reportVM.report.actualspend!=null && reportVM.report.actualspend!="" && reportVM.report.actualspend!=0){
				if(!isPositiveNumberReg(reportVM.report.actualspend)){
					alert("項目實際總支出輸入的金額格式不正確!");
					return false;
				}
			}
			var accumulativepayment=reportVM.report.accumulativepayment;
			if(accumulativepayment!=null && accumulativepayment!="" && accumulativepayment!=0 ){					
				if(!isPositiveNumberReg(accumulativepayment)){
					alert("累計已發放資助金的金額格式不正確!");
					return false;
				}
			}
			
			var currentFinanceamount=reportVM.report.financeamount;
			if(currentFinanceamount!=null && currentFinanceamount!="" && currentFinanceamount!=0 ){
				if(!isPositiveNumberReg(currentFinanceamount)){
					alert("本次已撥款金額格式不正確!");
					return false;
				}
			}
			
			if(reportVM.report.companyreturnamount!=null && reportVM.report.companyreturnamount!="" && reportVM.report.companyreturnamount!=0){
				if(!isPositiveNumberReg(reportVM.report.companyreturnamount)){
					alert("企業以返還差額格式不正確!");
					return false;
				}
			}
			
			return true;
		},
		DeleteReport:function(){
			
			if(confirm("確定要刪除嗎?")){
				var caseId=$("#basic_caseid").val();	
				$.ajax({
					url : contextPath + '/report/DeleteReportById?caseid='+caseId,
					contentType : "application/json",
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						RefreshBasicData();
						forwordJSP('/detail/showJSP?forwordJSP=report&num=0&type=show');
					
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
		
		},
		cancelReport:function(){
			
			$("#ReportLast").show();
			$("#Report-edit1").hide();
			setDivHeight();
			var type=$("#type").val();
			var num=$("#num").val();
			if(num==0 && type=="add"){//表示新增
				forwordJSP('/detail/showJSP?forwordJSP=report&num=0&type=show');
			}
		},
		DIVTxt:function(){
			var type=$("#type").val();
			var num=$("#num").val();
			if(reportVM.report.modifier==null){//表示新增
				$("#editdiv").html("新增報告內容");
			}else{
				$("#editdiv").html("編輯報告內容");
			}
		},
	   	fileSource_report : [],
    	tfile : null,
		//讀取文件源
		getFileSource : function() {
			$.ajax({
						cache : false,
						url : contextPath+ "/file/getFile",
						type : "POST",
						async : false,
						data : {
							fileSourceID :reportVM.get("report.reportid"),
							filesourcetype:"report"
						},
						dataType : "json",
						success : function(data) {
				
							if(data.FileisNull == 1){
								$('#selectFile').hide();
								reportVM.set("fileSource_report",data.tfile);
								}else{									
									$('#selectFile').show();
									reportVM.set("fileSource_report",data.tfile);
								}
							setDivHeight();
						},
						error:function(a,b,c){
							alert(a+"/"+b+"/"+c);	
							}
					});
		}
		
		
	})
	
	
	
	//附件中的“全选”  
	$("#selectAll").click(function() {
		if (selectAll == 2) {
			$("input[name='ckReportFile']").attr("checked", true);
			selectAll=1;
		} else {
			$("input[name='ckReportFile']").attr("checked", false);
			selectAll=2;
		}
		setDivHeight();
	});
	
		// 上傳
		$("#uploadReportFile").kendoUpload({
			async : {
				
				saveUrl : contextPath + "/file/upload",
				autoUpload : true
			},
			success : function onSuccess(e) {
				reportVM.getFileSource();
				$("#uploadReportFile").parent().parent().removeClass("k-widget k-upload k-header");
				setDivHeight();
			},
			error : function onError(e) {
				alert(e);
			},
			upload : function onUpload(e) {
				
				reportVM.tfile.filesourcetype = "report";
				reportVM.tfile.filesourceid =  reportVM.get("report.reportid");
				e.data = {
					tfileJsonStr : JSON.stringify(reportVM.tfile)
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
		    url: contextPath+'/report/getParam3?caseId='+caseId+"&type="+type+"&num="+num,
		    type: "POST",
		    dataType: "json",   
		    async : false,
		    success: function(d) {	
				
		        $.extend(reportVM, d);			        
		        reportCountNo=d.count;//總期數
		      //動態設置週期的選項
		        reportVM.set("changeNos",d.listNo) 
		        reportNo=d.reportno;//當前期數		        
		        reportVM.set("currentReportNo",d.reportno); 	
				
		        reportVM.set("islastNo",d.islastNo); //true為最後一期
		      
		        
		        onChangeReport();
		        initData();
		        //alert(JSON.stringify(reportVM.report));
		        if(type=="add"){
		        	$('#Report-edit1').show();
					$('#ReportLast').hide();
					detailinfoVM.set('showReportVisiblePage',true);
		        }else{
		        	$('#Report-edit1').hide();
					$('#ReportLast').show();
		        }
		
		   	 //查詢協議書 的批准資助方式
		        reportVM.set("appslist",d.appslist);
		        
		    },
		    error:function(a,b,c){
		    	alert(a+"/"+b+"/"+c);		    	
		    }
		});
	
		
		reportVM.DIVTxt();
	
	kendo.bind($("#reportContent"), reportVM);
	
	reportVM.getFileSource();// 附件
	setDivHeight();
	
	
	//加載完后 給 row-template的DropDownlist 賦值
	setDropDownlist();
	
	
})


	//加載完后 給 row-template的DropDownlist 賦值
 function setDropDownlist(){
	
	
   for(var i=0;i<reportVM.products.length;i++){
	   //alert(JSON.stringify(reportVM.products[0].appList[0].applytype.applytypeid));
	   var p=reportVM.products[i];
	   var num=p.num;	 
	   for(var j=0;j<p.appList.length;j++){
		   var app=p.appList;
//		   alert(JSON.stringify(app));
		   var applytypeid=app[j].applytype.applytypeid;	
		   var reportapprovetype=app[j].reportapprovetype;
			var dropdownlist = $("#"+applytypeid+"sel"+num).data("kendoDropDownList");	
			dropdownlist.value(reportapprovetype);
			//alert(applytypeid);
	   }
	   
   }

	
 }


function getDropDownlist(){
	
	
	   for(var i=0;i<reportVM.products.length;i++){
		   //alert(JSON.stringify(reportVM.products[0].appList[0].applytype.applytypeid));
		   var p=reportVM.products[i];
		   var num=p.num;	 		   
		   var time=p.suggestionapprovetime+"";
		   if(time.indexOf("UTC")>0){
			   p.suggestionapprovetime=Todate(time);
		   }
		
		   for(var j=0;j<p.appList.length;j++){
			   var app=p.appList;
			   var applytypeid=app[j].applytype.applytypeid;		
			  
				var dropdownlist = $("#"+applytypeid+"sel"+num).data("kendoDropDownList");
				app[j].reportapprovetype=dropdownlist.value();
				
				
				var amount=$("#"+applytypeid+"amount"+num).val();			
				if(amount!=null && amount!="null" &&  amount!=""){		
					if(!isPositiveNumberReg(amount)){
						alert("第"+(j+1)+"個分析報告的批准可撥付金額格式不正確!");
						return false;
					}
					app[j].approvefinanceamount=amount;
				}
				
					
		   }
		   
	   }
	   reportVM.set("products",reportVM.products);

		
	 }
	  



  

	//根據 個案ID和 期號 獲取數據
  function getReportData(){			
		forwordJSP('/detail/showJSP?forwordJSP=report&num='+reportVM.currentReportNo+'&type=show');
  }

	


 function initData(){
	if(reportVM.report.ischecked==0){
		reportVM.set("checkState","--");
	}else if(reportVM.report.ischecked==1){		
		reportVM.set("checkState","已核對");
	}else{
		reportVM.set("checkState","未核對");
	}	
	
	
	if(reportVM.report.summaryAttachType==0){
		reportVM.set("attachTypeName","--");
	}else if(reportVM.report.summaryAttachType==1){		
		reportVM.set("attachTypeName","財務報表");
	}else{
		reportVM.set("attachTypeName","審計賬目");
	}
	
	if(reportVM.report.reportapprovestatus==0){
		reportVM.set("reportapprovestatusName","--");
	}else if(reportVM.report.reportapprovestatus==1){		
		reportVM.set("reportapprovestatusName","中止");
	}else if(reportVM.report.reportapprovestatus==2){
		reportVM.set("reportapprovestatusName","撥付");
	}else if(reportVM.report.reportapprovestatus==3){
		reportVM.set("reportapprovestatusName","取消");
	}else if(reportVM.report.reportapprovestatus==4){
		reportVM.set("reportapprovestatusName","中止後撥付");
	}else if(reportVM.report.reportapprovestatus==5){
		reportVM.set("reportapprovestatusName","中止後取消");
	}else if(reportVM.report.reportapprovestatus==6){
		reportVM.set("reportapprovestatusName","返還");
	}else if(reportVM.report.reportapprovestatus==7){
		reportVM.set("reportapprovestatusName","報告通過");
	}else if(reportVM.report.reportapprovestatus==3){
		reportVM.set("reportapprovestatusName","其它");
	}
	
	
	if(reportVM.report.user!=null){//核對人員
		reportVM.set("checkName",reportVM.report.user.loginname);
	}

	reportVM.set("report.submitdueDate",getFormatDateByLong(reportVM.report.submitdueDate));
	reportVM.set("report.delaysubmitdate",getFormatDateByLong(reportVM.report.delaysubmitdate));	
	reportVM.set("report.submitdate",getFormatDateByLong(reportVM.report.submitdate));
	reportVM.set("report.companyreceivedate",getFormatDateByLong(reportVM.report.companyreceivedate));
	reportVM.set("report.financenotificationdate",getFormatDateByLong(reportVM.report.financenotificationdate));
	reportVM.set("report.financedate",getFormatDateByLong(reportVM.report.financedate));
	reportVM.set("report.returnnotificationdate",getFormatDateByLong(reportVM.report.returnnotificationdate));
	reportVM.set("report.companyreturnduedate",getFormatDateByLong(reportVM.report.companyreturnduedate));
	reportVM.set("report.companyreturndate",getFormatDateByLong(reportVM.report.companyreturndate));	
	reportVM.set("report.compulsorynotificationdate",getFormatDateByLong(reportVM.report.compulsorynotificationdate));
	//分析報告批示日期
	//reportVM.set("report.suggestionapprovedate",getFormatDateByLong(reportVM.report.suggestionapprovedate));
	
	
	if(reportVM.report.returnpayment!=null && reportVM.report.returnpayment!=0){
		 if(reportVM.report.isreturnpayment==1){//表示差額 返還 需要加（）
			 //返還
		    	$("#lblreturn").show(); 
		    	$("#lblbo").hide();
		    			    	
		      	$('#fristReportShow8').hide(); //內部通知(撥款)
		    	$('#fristReportEdit8').hide();
		    	
		    	$('#lastReportShow3').show(); //內部通知(撥款) 
		    	$('#lastReportEdit3').show();
		    	
		    }else if(reportVM.report.isreturnpayment==-1) {
		    	$("#lblreturn").hide();  // (撥付)
		    	$("#lblbo").show();
		    
		    	$('#fristReportShow8').show(); //內部通知(撥款)
		    	$('#fristReportEdit8').show();
		    	
		    	$('#lastReportshow3').hide(); //內部通知(返還)
		    	$('#lastReportEdit3').hide();
		   
		  
		    }
	}
	
   
	
 }

 //改變樣式 最後一期和前面幾期不一樣
 function onChangeReport() {
	
	  if(reportVM.currentReportNo==reportCountNo){ //最後一期
		  $('#lastReportShow1').show(); //結 算  
		  $('#lastReportEdit1').show();		
		  
		  $('#lastReportShow2').show();//(撥款)
		  $('#lastReportEdit2').show();
		  
		  if(reportVM.report.isreturnpayment==0){
			  $('#lastReportShow3').show();//內部通知(返還)
			  $('#lastReportEdit3').show();//內部通知(返還)
		  }
		
		  
		  $('#lastReportShow4').show();//企業報告資料
		  $('#lastReportEdit4').show();//企業報告資料
		  
		 // $('#lastReportShow5').show(); //分析報告
		  //$('#lastReportEdit5').show();
		  
		  $('#lastReportShow6').show();//通知企業
		  $('#lastReportEdit6').show();
		  
		 // $('#lastReportShow7').show();//分析報告建議書編號
		  $('#lastReportEdit7').show();
		  
		  $('#fristReportShow7').show();//分析報告
		  $('#fristReportEdit7').show();
		  
		  
		 // $('#fristReportShow1').hide();//分析報告
		  //$('#fristReportEdit1').hide();
		  
		 // $('#firstReportShow2').hide();//建議書編號
		  $('#firstReportEdit2').hide();
		  
		 
	  }
	  else{	
		  $('#lastReportShow1').hide();	//結 算  
		  $('#lastReportEdit1').hide();
		  
		  $('#lastReportShow2').hide();
		  $('#lastReportEdit2').hide();//(撥款)
	
		  $('#lastReportShow3').hide();//內部通知(返還)
		  $('#lastReportEdit3').hide();//內部通知(返還)
		  
		  $('#lastReportShow4').hide();//企業報告資料
		  $('#lastReportEdit4').hide();
		  
		 // $('#lastReportShow5').hide();//分析報告
		 // $('#lastReportEdit5').hide();
		  
		  $('#lastReportShow6').hide();//通知企業
		  $('#lastReportEdit6').hide();
		  
		  //$('#lastReportShow7').hide();//分析報告建議書編號
		  $('#lastReportEdit7').hide();
		  
		  
		 // $('#fristReportShow1').show();//分析報告
		 // $('#fristReportEdit1').show();
		  
		  
		 // $('#firstReportShow2').show();//建議書編號
		  $('#firstReportEdit2').show();
		  
		  
		
	  }
  }; 
  


  
  function getapproveState(type){	 

		if(type==0){
			return "--";
		}else if(type==1){		
			return "中止";
		}else if(type==2){
			return "撥付";
		}else if(type==3){
			return "取消";
		}else if(type==4){
			return "中止後撥付";
		}else if(type==5){
			return "中止後取消";
		}else if(type==6){
			return "返還";
		}else if(type==7){
			return "報告通過";
		}else if(type==8){
			return "其它";
		}
		return "";
  }
  
 function setValue(amount){
	// alert(amount);
		if(amount!=null && amount!="null" &&  amount!=""){				
			return amount;
		}
		return "";
 }
 

 function getReturnPayment(){
	
	 if(reportVM.report.isLastNo!=1){ //最後一期才需要計算
		 return false;
	 }

	 
		var caseId=$("#basic_caseid").val();	
		var actualspend=reportVM.report.actualspend;
		if(actualspend==null || actualspend==""){
			 return false;
		}else{
			if(actualspend!=0){
				if(!isPositiveNumberReg(reportVM.report.actualspend)){
					alert("項目實際總支出輸入的金額格式不正確!");
					return false;
				}
			}
			
		}
		
		var accumulativepayment=reportVM.report.accumulativepayment;
		if(accumulativepayment==null || accumulativepayment=="" ){
			return false;
		}else{			
			if(accumulativepayment!=0){
				if(!isPositiveNumberReg(accumulativepayment)){
					alert("累計已發放資助金的金額格式不正確!");
					return false;
				}
			}
		}
		
		var currentFinanceamount=reportVM.report.financeamount;
		if(currentFinanceamount!=null && currentFinanceamount!="" && currentFinanceamount!=0){
			if(!isPositiveNumberReg(currentFinanceamount)){
				alert("本次已撥款金額格式不正確!");
				return false;
			}
		}else{
			currentFinanceamount=0;
		}
	
	 
		//獲取頁面上需要的數據
		$.ajax({
		    url: contextPath+'/report/Calculationreturnpayment?caseId='+caseId+"&actualspend="+actualspend+"&currentFinanceamount="+currentFinanceamount,
		    type: "POST",
		    dataType: "json",   
		    async : false,
		    success: function(d) {			
		    	
		    	if(d.message!=undefined  || d.subsidyAmountSumMessage!=null ){
		    		$("#financeamounttxt").val(0);		  
		    		reportVM.set("report.financeamount","");
		    		alert("累計已發放資助金額超出了總資助金額,請重新輸入本次已撥款金額");
		    	}else{
		    		$("#returnpayment").val(d.returnPayment);
			    	$("#accumulativepayment").val(d.financeamountSum);
		    	}		    	
		    
		    },
		    error:function(a,b,c){
		    	alert(a+"/"+b+"/"+c);		    	
		    }
		});
	 
 }
 
//刪除文件
 function delreportFile() {
 	var str="";
 	//獲取所有選中的存放到數組	checked
 	$.each($("input[name='ckReportFile']"), function(key, value) {
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
 	if (confirm('確定要執行刪除操作嗎?')) {
 		$.ajax({
 			url : contextPath + '/file/delFile?fileidss=' + str +'&caseId='+ $("#basic_caseid").val(),
 			type : "POST",
 			dataType : "json",
 			success : function(d) {
 				reportVM.getFileSource();
 			},
 			error : function(a, b, c) {
 				alert(a + '\t' + b + '\t' + c);
 			}
 		});
 	}
   	str = "";
 	
 	}else{
 		alert("請選擇需要刪除的文件!");
 	}
 	
 }
 

