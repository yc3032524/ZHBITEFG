var pWorkVM="";
var selectAll =2;
////暫停項目程序
$(document).ready(function() {
	
	pWorkVM=kendo.observable({
		approveresult:"",//批示結果
		changeNos:"",
		currentPwokNo:"",
		currentPworkfollowtype:0, //當前選中的須展開之跟進程序
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
		savePauseWork:function(){			
			$.ajax({
				url : contextPath + '/pauseWork/SaveOrUpdatePauseWork',
				contentType : "application/json",
				data : JSON.stringify(pWorkVM.pwork),
				type : "POST",
				dataType : 'json',
				async : false,
				success : function(data) {
					//刷新系統右邊的數據列表
					 detailinfoVM.GetRightReportData();
					
					if(pWorkVM.pwork.isfollowup==1){
						if(pWorkVM.currentPworkfollowtype!=pWorkVM.pwork.followtype && pWorkVM.pwork.followtype==2){
							if (confirm("是否建立項目中止發放?")) {
			        			detailinfoVM.set('showStopFinanceVisiblePage',true);
			        			tab('tabId6','tabC6');
			            		forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=add');
			        			return;
			        		}
						}else if(pWorkVM.pwork.followtype==3 && pWorkVM.currentPworkfollowtype!=pWorkVM.pwork.followtype){
			        		if (confirm("是否建立取消批給程序?")) {
			        			detailinfoVM.set('showCancelContractVisiblePage',true);
			        			tab('tabId9','tabC9');
			            		forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=add');
			        			return;
			        		}
			        	}
					}		
				
						 RefreshBasicData();
						 forwordJSP('/detail/showJSP?forwordJSP=pauseWork&type=show&num='+pWorkVM.currentPwokNo); 
					
				
				},
				error:function(a,b,c){
					alert(a+"/"+b+"/"+c);
				}
			});
		},
		initData:function(){
			pWorkVM.set("pwork.requestpausedate",getFormatDateByLong(pWorkVM.pwork.requestpausedate));
			pWorkVM.set("pwork.approvedate",getFormatDateByLong(pWorkVM.pwork.approvedate));					
			pWorkVM.set("pwork.receivedate",getFormatDateByLong(pWorkVM.pwork.receivedate));
			pWorkVM.set("pwork.approvepausedate",getFormatDateByLong(pWorkVM.pwork.approvepausedate));
			
			if(pWorkVM.pwork.approveresult==0){
				pWorkVM.set("approveresult","--");
			}else if(pWorkVM.pwork.approveresult==1){
				pWorkVM.set("approveresult","批准");
			}else if(pWorkVM.pwork.approveresult==2){
				pWorkVM.set("approveresult","不批准");
			}else if(pWorkVM.pwork.approveresult==3){
				pWorkVM.set("approveresult","其它");
			}

		
		
		
			$("#followtypeotherremarkspan").hide();
			$("#otherinput").hide();
			
			
			if(pWorkVM.pwork.followtype==0){
				pWorkVM.set("followtypeStr","--");
			}else if(pWorkVM.pwork.followtype==1){
				pWorkVM.set("followtypeStr","建議撥款");
			}else if(pWorkVM.pwork.followtype==2){
				pWorkVM.set("followtypeStr","建議中止發放");
			}else if(pWorkVM.pwork.followtype==3){
				pWorkVM.set("followtypeStr","建議取消批給");
			}else if(pWorkVM.pwork.followtype==4){
				pWorkVM.set("followtypeStr","審計或調查");
			}else if(pWorkVM.pwork.followtype==5){
				pWorkVM.set("followtypeStr","其它");
				$("#followtypeotherremarkspan").show();
				$("#otherinput").show();
			}
			
			pWorkVM.set("currentPworkfollowtype",pWorkVM.pwork.followtype);
		},
		pworkChangeNos:function(){				
			forwordJSP('/detail/showJSP?forwordJSP=pauseWork&type=show&num='+pWorkVM.currentPwokNo)
		},
		radioBtn:function(e){
			alert(e);
			
		},
		deletePauseWork:function(){
			if(confirm("確定要刪除嗎?")){
				var pauseworkid=pWorkVM.get("pwork.pauseworkid");	
				$.ajax({
					url : contextPath + '/pauseWork/deletePauseWork?pauseworkid='+pauseworkid,
					contentType : "application/json",
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						RefreshBasicData();
						forwordJSP('/detail/showJSP?forwordJSP=pauseWork&type=show&num=0')
					
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
		
		},
		changePauseFllow:function(e){
			if(pWorkVM.pwork.followtype==5){
				$("#otherinput").show();
			}else{
				$("#otherinput").hide()
			}
			
		},
		DIVTxt:function(){
			var type=$("#type").val();
			var num=$("#num").val();
			if(num==0 && type=="add"){//表示新增
				$("#editdiv").html("新增暫停項目程序");
			}else{
				$("#editdiv").html("編輯暫停項目程序");
			}
		},
		editPauseWork:function(){
			$('#Suspension-edit').show();
			$('#Suspension').hide();
			setDivHeight();
			pWorkVM.DIVTxt();
		},
		cancelPauseWork:function(){
			$('#Suspension').show();
			$('#Suspension-edit').hide();
			var type=$("#type").val();
			var num=$("#num").val();
			if(num==0 && type=="add"){//表示新增
				forwordJSP('/detail/showJSP?forwordJSP=pauseWork&type=show&num=0')
			}
			setDivHeight();
		},
		fileSource_pauseWork:[],
		tfile : null,
		//讀取文件源
		getFileSource : function() {
			$.ajax({
						cache : false,
						url : contextPath+ "/file/getFile",
						type : "POST",
						async : false,
						data : {
							fileSourceID :pWorkVM.get("pwork.pauseworkid"),
							filesourcetype:"pauseWork"
						},
						dataType : "json",
						success : function(data) {
							if(data.FileisNull == 1){
								$('#selectFile').hide();
								pWorkVM.set("fileSource_pauseWork",data.tfile);
								}else{
									$('#selectFile').show();
									pWorkVM.set("fileSource_pauseWork",data.tfile);
								}
							setDivHeight();
						},
						error:function(a,b,c){
							alert(a+"/"+b+"/"+c);	
							}
					});
		}
		
	});
	
	pWorkVM.DIVTxt();
	//附件中的“全选”  
	$("#selectAll").click(function() {
		if (selectAll == 2) {
			$("input[name='CkPauseWorkFile']").attr("checked", true);
			selectAll=1;
		} else {
			$("input[name='CkPauseWorkFile']").attr("checked", false);
			selectAll=2;
		}
		setDivHeight();
	});
	

		// 上傳
		$("#uploadPauseWorkFile").kendoUpload({
			async : {
				
				saveUrl : contextPath + "/file/upload",
				autoUpload : true
			},
			success : function onSuccess(e) {
				pWorkVM.getFileSource();
				$("#uploadPauseWorkFile").parent().parent().removeClass("k-widget k-upload k-header");
				setDivHeight();
			},
			error : function onError(e) {
				alert(e);
			},
			upload : function onUpload(e) {
				
				pWorkVM.tfile.filesourcetype = "pauseWork";
				pWorkVM.tfile.filesourceid =  pWorkVM.get("pwork.pauseworkid");
				e.data = {
					tfileJsonStr : JSON.stringify(pWorkVM.tfile)
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
	    url: contextPath+'/pauseWork/getParam2?caseId='+caseId+"&type="+type+"&num="+num,
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {	
	    	 $.extend(pWorkVM, d);	
	    	pWorkVM.set("changeNos",d.listNo);
	    	pWorkVM.set("tfile", d.tfile);
	    	if(d.data!="none"){	    
	    		pWorkVM.initData();
	    		pWorkVM.set("currentPwokNo",d.currentPwokNo); 	
	    		
	    		detailinfoVM.set('showPauseWorkVisiblePage',true);
	    	}else{
	    		$('#Suspension-edit').show();
	    		$('#Suspension').hide();
	    		detailinfoVM.set('showPauseWorkVisiblePage',true);
	    	}
	    },
	    error:function(a,b,c){
	    	alert(a+"/"+b+"/"+c);		    	
	    }
	});
	
	kendo.bind($("#pauseWorkDiv"), pWorkVM);
	pWorkVM.getFileSource();
	setDivHeight();
});


//刪除文件
function delpauseWork(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='CkPauseWorkFile']"), function(key, value) {
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
				pWorkVM.getFileSource();
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
