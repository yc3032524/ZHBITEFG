var dWorkVM="";
var selectAll =2;
//延遲開展項目
$(document).ready(function() {
	
	dWorkVM=kendo.observable({
		approveresult:"",//批示結果
		changeNos:"",
		currentDwokNo:"",
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
		saveDelayWork:function(){	
//			alert(JSON.stringify(dWorkVM.dwork));
			
			if(dWorkVM.judgeaDate()){
				$.ajax({
					url : contextPath + '/delayWork/SaveOrUpdateDelayWork',
					contentType : "application/json",
					data : JSON.stringify(dWorkVM.dwork),
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
//						alert(dWorkVM.currentDwokNo);
						RefreshBasicData();
						forwordJSP('/detail/showJSP?forwordJSP=delayWork&type=show&num='+dWorkVM.currentDwokNo)
					
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
			
		
		},
		initData:function(){
			dWorkVM.set("dwork.requestdelaydate",getFormatDateByLong(dWorkVM.dwork.requestdelaydate));
			dWorkVM.set("dwork.approvedate",getFormatDateByLong(dWorkVM.dwork.approvedate));					
			dWorkVM.set("dwork.receivedate",getFormatDateByLong(dWorkVM.dwork.receivedate));
			dWorkVM.set("dwork.delayduedate",getFormatDateByLong(dWorkVM.dwork.delayduedate));
			
			
			if(dWorkVM.dwork.approveresult==0){
				dWorkVM.set("approveresult","--");
			}else if(dWorkVM.dwork.approveresult==1){
				dWorkVM.set("approveresult","批准");
			}else if(dWorkVM.dwork.approveresult==2){
				dWorkVM.set("approveresult","不批准");
			}else if(dWorkVM.dwork.approveresult==3){
				dWorkVM.set("approveresult","其它");
			}
		},
		dworkChangeNos:function(){				
			forwordJSP('/detail/showJSP?forwordJSP=delayWork&type=show&num='+dWorkVM.currentDwokNo)
		},
		deleteDelayWork:function(){
			if(confirm("確定要刪除嗎?")){
				//var caseId=$("#basic_caseid").val();					
				var delayworkid=dWorkVM.get("dwork.delayworkid");
				
				$.ajax({
					url : contextPath + '/delayWork/deleteDelayWorkById?delayworkid='+delayworkid,
					contentType : "application/json",
					type : "POST",
					dataType : 'json',
					async : false,
					success : function(data) {	
						RefreshBasicData();
						forwordJSP('/detail/showJSP?forwordJSP=delayWork&type=show&num=0')
					
					},
					error:function(a,b,c){
						alert(a+"/"+b+"/"+c);
					}
				});
			}
		
		},
		DIVTxt:function(){
			var type=$("#type").val();
			var num=$("#num").val();
			if(num==0 && type=="add"){//表示新增
				$("#editdiv").html("新增申請延遲開展項目資料");
			}else{
				$("#editdiv").html("編輯申請延遲開展項目資料");
			}
		},
		editDelayWork:function(){
			$('#DelayProject-edit').show();
			$('#DelayProject').hide();		
			dWorkVM.DIVTxt();
			setDivHeight();
		},
		cancelDelayWork:function(){
			$('#DelayProject').show();
			$('#DelayProject-edit').hide();
			setDivHeight();
			var type=$("#type").val();
			var num=$("#num").val();
			if(num==0 && type=="add"){//表示新增
				forwordJSP('/detail/showJSP?forwordJSP=delayWork&type=show&num=0')
			}
		},
		judgeaDate:function(e){
					
			if(dWorkVM.dwork.delayduedate>dWorkVM.dwork.surerequestdelaytime){
				alert("准許延遲開展期限不能大於可申請延遲期限!");
				return false;
			}
			
		   return true;
		},
		fileSource_delayWork : [],
    	tfile : null,
    	//讀取文件源
		getFileSource : function() {
			$.ajax({
						cache : false,
						url : contextPath+ "/file/getFile",
						type : "POST",
						async : false,
						data : {
							fileSourceID :dWorkVM.get("dwork.delayworkid"),
							filesourcetype:"delayWork"
						},
						dataType : "json",
						success : function(data) {
							if(data.FileisNull == 1){
								$('#selectFile').hide();
								dWorkVM.set("fileSource_delayWork",data.tfile);
								}else{
									$('#selectFile').show();
									dWorkVM.set("fileSource_delayWork",data.tfile);
								}
							setDivHeight();
						},
						error:function(a,b,c){
							alert(a+"/"+b+"/"+c);	
							}
					});
		},
		
	})
	
	
	dWorkVM.DIVTxt();
	
	
	
	
	$("#selectAll").click(function() {
		if (selectAll == 2) {
			$("input[name='ckDelayWorkFile']").attr("checked", true);
			selectAll=1;
		} else {
			$("input[name='ckDelayWorkFile']").attr("checked", false);
			selectAll=2;
		}
		setDivHeight();
	});
	
		// 上傳
		$("#uploadDelayWorkFile").kendoUpload({
			async : {
				
				saveUrl : contextPath + "/file/upload",
				autoUpload : true
			},
			success : function onSuccess(e) {
				dWorkVM.getFileSource();
				$("#uploadDelayWorkFile").parent().parent().removeClass("k-widget k-upload k-header");
				setDivHeight();
			},
			error : function onError(e) {
				alert(e);
			},
			upload : function onUpload(e) {
				
				dWorkVM.tfile.filesourcetype = "delayWork";
				dWorkVM.tfile.filesourceid =  dWorkVM.get("dwork.delayworkid");
				e.data = {
					tfileJsonStr : JSON.stringify(dWorkVM.tfile)
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
	    url: contextPath+'/delayWork/getParam2?caseId='+caseId+"&type="+type+"&num="+num,
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {	
	    	 $.extend(dWorkVM, d);	
	    		dWorkVM.set("changeNos",d.listNo);
	    	if(d.data!="none"){
	    
	    		dWorkVM.initData();
	    		dWorkVM.set("currentDwokNo",d.currentDwokNo); 	
	    		
	    		detailinfoVM.set('showDelayWorkVisiblePage',true);
	    		
	    	}else{
	    		$('#DelayProject-edit').show();
	    		$('#DelayProject').hide();
	    		detailinfoVM.set('showDelayWorkVisiblePage',true);
	    	}
	    },
	    error:function(a,b,c){
	    	alert(a+"/"+b+"/"+c);		    	
	    }
	});

	

kendo.bind($("#delayWorkDiv"), dWorkVM);

dWorkVM.getFileSource();// 附件
	
setDivHeight();	
	
})



//刪除文件
function deldelayWorkFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='ckDelayWorkFile']"), function(key, value) {
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
				dWorkVM.getFileSource();
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