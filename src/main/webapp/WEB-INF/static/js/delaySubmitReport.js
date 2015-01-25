var dsReportVM="";
var selectAll =2;
//延遲提交報告
$(document).ready(function() {
	
	dsReportVM=kendo.observable({
		approveresult:"",//批示結果
		changeNos:"",
		currentdsReportNo:"",
		currentdelaySubmitfollowtype:0, //當前選中的須展開之跟進程序
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
		isfollowupStr:"",
		followtypeStr:"",
		followtypeSource:[{
			text : '--',
			id : '0'
		},{
			text : '建議撥款',
			id : '1'
		},{
			text : '建議中止發放',
			id : '2'
		},{
			text : '建議取消批給',
			id : '3'
		},{
			text : '審計或調查',
			id : '4'
		},{
			text : '其它',
			id : '5'
		}  ],	
		saveDleaySubmitReport:function(){	
			$.ajax({
				url : contextPath + '/delaySubmitReport/SaveOrUpdateDelaySubmitReport',
				contentType : "application/json",
				data : JSON.stringify(dsReportVM.dsReport),
				type : "POST",
				dataType : 'json',
				async : false,
				success : function(data) {	
			
			
					if(dsReportVM.currentdelaySubmitfollowtype!=dsReportVM.dsReport.followtype && dsReportVM.dsReport.followtype==2){
						if (confirm("是否建立項目中止發放?")) {
		        			detailinfoVM.set('showStopFinanceVisiblePage',true);
		        			tab('tabId6','tabC6');
		            		forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=add');
		        			return;
		        		}
					}else if(dsReportVM.dsReport.followtype==3 && dsReportVM.currentdelaySubmitfollowtype!=dsReportVM.dsReport.followtype){
		        		if (confirm("是否建立取消批給程序?")) {
		        			detailinfoVM.set('showCancelContractVisiblePage',true);
		        			tab('tabId9','tabC9');
		            		forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=add');
		        			return;
		        		}
		        	}
				
					
				
					forwordJSP('/detail/showJSP?forwordJSP=delaySubmitReport&type=show&num='+dsReportVM.currentdsReportNo);
					
					
				
				},
				error:function(a,b,c){
					alert(a+"/"+b+"/"+c);
				}
			});
		},
		initData:function(){
			dsReportVM.set("dsReport.requestdelaydate",getFormatDateByLong(dsReportVM.dsReport.requestdelaydate));
			dsReportVM.set("dsReport.approvedate",getFormatDateByLong(dsReportVM.dsReport.approvedate));					
			dsReportVM.set("dsReport.receivedate",getFormatDateByLong(dsReportVM.dsReport.receivedate));
			dsReportVM.set("dsReport.approvedelaydate",getFormatDateByLong(dsReportVM.dsReport.approvedelaydate));
			
			if(dsReportVM.dsReport.approveresult==0){
				dsReportVM.set("approveresult","--");
			}else if(dsReportVM.dsReport.approveresult==1){
				dsReportVM.set("approveresult","批准");
			}else if(dsReportVM.dsReport.approveresult==2){
				dsReportVM.set("approveresult","不批准");
			}else if(dsReportVM.dsReport.approveresult==3){
				dsReportVM.set("approveresult","其它");
			}
					
			
			$("#followtypeotherremarkspan").hide();
			$("#otherinput").hide();
			
			
			if(dsReportVM.dsReport.followtype==0){
				dsReportVM.set("followtypeStr","--");
			}else if(dsReportVM.dsReport.followtype==1){
				dsReportVM.set("followtypeStr","建議撥款");
			}else if(dsReportVM.dsReport.followtype==2){
				dsReportVM.set("followtypeStr","建議中止發放");
			}else if(dsReportVM.dsReport.followtype==3){
				dsReportVM.set("followtypeStr","建議取消批給");
			}else if(dsReportVM.dsReport.followtype==4){
				dsReportVM.set("followtypeStr","審計或調查");
			}else if(dsReportVM.dsReport.followtype==5){
				dsReportVM.set("followtypeStr","其它");
				
				$("#followtypeotherremarkspan").show();
				$("#otherinput").show();
			}
			
			dsReportVM.set("currentdelaySubmitfollowtype",dsReportVM.dsReport.followtype);
		},
		dsReportChangeNos:function(){				
			forwordJSP('/detail/showJSP?forwordJSP=delaySubmitReport&type=show&num='+dsReportVM.currentdsReportNo)
		},
		radioBtn:function(e){
			alert(e);
			
		},
		deleteDelaySubmitReport:function(){
			if(confirm("確定要刪除嗎?")){
				var delaysubmitreportid=dsReportVM.get("dsReport.delaysubmitreportid");	
				$.ajax({
					url : contextPath + '/delaySubmitReport/deleteDelaySubmitReport?delaysubmitreportid='+delaysubmitreportid,
					contentType : "application/json",
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						RefreshBasicData();
						forwordJSP('/detail/showJSP?forwordJSP=delaySubmitReport&type=show&num=0')
					
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
		
		},
		changedsReportFllow:function(e){
			if(dsReportVM.dsReport.followtype==5){
				$("#otherinput").show();
			}else{
				$("#otherinput").hide()
			}
		},
		editDelaySubmit:function(e){
			$('#DelayReport-edit').show();
			$('#DelayReport').hide();
			dsReportVM.DIVTxt();
			setDivHeight();
		},
		DIVTxt:function(){
			var type=$("#type").val();
			var num=$("#num").val();
			if(num==0 && type=="add"){//表示新增
				$("#editdiv").html("新增延遲提交報告");
			}else{
				$("#editdiv").html("編輯延遲提交報告");
			}
		},
		cancelDelaySubmit:function(e){			
			$('#DelayReport').show();
			$('#DelayReport-edit').hide();
			var type=$("#type").val();
			var num=$("#num").val();
			if(num==0 && type=="add"){//表示新增
				forwordJSP('/detail/showJSP?forwordJSP=delaySubmitReport&type=show&num=0')
			}
			setDivHeight();
		},
		fileSource_DelaySubmitReport:[],
    	tfile : null,
		//讀取文件源
		getFileSource : function() {
			$.ajax({
						cache : false,
						url : contextPath+ "/file/getFile",
						type : "POST",
						async : false,
						data : {
							fileSourceID :dsReportVM.get("dsReport.delaysubmitreportid"),
							filesourcetype:"delaySubmitReport"
						},
						dataType : "json",
						success : function(data) {
				
							if(data.FileisNull == 1){
								$('#selectFile').hide();
								dsReportVM.set("fileSource_DelaySubmitReport",data.tfile);
								}else{									
									$('#selectFile').show();
									dsReportVM.set("fileSource_DelaySubmitReport",data.tfile);
								}
							setDivHeight();
						},
						error:function(a,b,c){
							alert(a+"/"+b+"/"+c);	
							}
					});
		}
	});
	dsReportVM.DIVTxt();
	
	
	
	$("#selectAll").click(function() {
		if (selectAll == 2) {
			$("input[name='CKDelaySubmitReportFile']").attr("checked", true);
			selectAll=1;
		} else {
			$("input[name='CKDelaySubmitReportFile']").attr("checked", false);
			selectAll=2;
		}
		setDivHeight();
	});
	
		// 上傳
		$("#uploadDelaySubmitReportFile").kendoUpload({
			async : {
				
				saveUrl : contextPath + "/file/upload",
				autoUpload : true
			},
			success : function onSuccess(e) {
				dsReportVM.getFileSource();
				$("#uploadDelaySubmitReportFile").parent().parent().removeClass("k-widget k-upload k-header");
				setDivHeight();
			},
			error : function onError(e) {
				alert(e);
			},
			upload : function onUpload(e) {
				
				dsReportVM.tfile.filesourcetype = "delaySubmitReport";
				dsReportVM.tfile.filesourceid =  dsReportVM.get("dsReport.delaysubmitreportid");
				e.data = {
					tfileJsonStr : JSON.stringify(dsReportVM.tfile)
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
	    url: contextPath+'/delaySubmitReport/getParam2?caseId='+caseId+"&type="+type+"&num="+num,
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {	
	    	 $.extend(dsReportVM, d);	
	    	dsReportVM.set("changeNos",d.listNo);
	    	dsReportVM.set("tfile", d.tfile);
	    	if(d.data!="none"){	    
	    		dsReportVM.initData();
	    		dsReportVM.set("currentdsReportNo",d.currentdsReportNo); 	
	    		
	    		detailinfoVM.set('showDelaySubmitReportVisiblePage',true);
	    	}else{
	    		$('#DelayReport-edit').show();
	    		$('#DelayReport').hide();
	    		detailinfoVM.set('showDelaySubmitReportVisiblePage',true);
	    	}
	    },
	    error:function(a,b,c){
	    	alert(a+"/"+b+"/"+c);		    	
	    }
	});
	
	kendo.bind($("#delaySubmitReportContent"), dsReportVM);
	
	
	dsReportVM.getFileSource();
	
	setDivHeight();
});

//刪除文件
function delaySubmitReportFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='CKDelaySubmitReportFile']"), function(key, value) {
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
				dsReportVM.getFileSource();
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
