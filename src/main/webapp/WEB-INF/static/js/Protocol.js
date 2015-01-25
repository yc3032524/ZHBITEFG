var protocolVM='';
$(document).ready(function() {
	 var count = 0;
	 var flowType = 0;//1為審核，0為取消審核
	 protocolVM = kendo.observable({
		 applytypeText:null,
		 reportsummaryattachmenttype:null,
		 applytypeamount : [],
		 ischeck:null,
		 checkName:"",
		 ischeck2:null,
		 checkName2:"",
		 ischeck3:null,
		 checkName3:"",
		 isShowCheck:true,
		 isreadyforcheck:null,
		 isShowEdit:true,
		 isShowCancelCheck:true,
		 fileSource_agreement:[],
		 filesourcetype:'Agreement',
		 tfile : null,
		 setShowDate:function(e){
			 this.set('agreementPO.supportapprovedate',getFormatDateByLong(this.get('agreementPO.supportapprovedate')));
			 this.set('agreementPO.aggreementsigndate',getFormatDateByLong(this.get('agreementPO.aggreementsigndate')));
			 this.set('agreementPO.supportdatefrom',getFormatDateByLong(this.get('agreementPO.supportdatefrom')));
			 this.set('agreementPO.supportdateto',getFormatDateByLong(this.get('agreementPO.supportdateto')));
			 this.set('agreementPO.payfrom',getFormatDateByLong(this.get('agreementPO.payfrom')));
			 this.set('agreementPO.firstfinancedate',getFormatDateByLong(this.get('agreementPO.firstfinancedate')));
			 var rt = this.get('agreementPO.reportsummaryattachmenttype');
			 if(null!=rt){
				 if(rt==1){
					 this.set('reportsummaryattachmenttype','財務報表');
				 }else if(rt==2){
					 this.set('reportsummaryattachmenttype','審核賬目');
				 }
			 }
			 if(1==this.get('agreementPO.isreadyforcheck')){
				 this.set('isreadyforcheck','是');
				 $("#applyCheck").attr('checked','checked');
			 }
			 if(1==this.get('agreementPO.ischecked')){
				 this.set('isShowEdit',false);
			 }else{
				 this.set('isShowCancelCheck',false);
			 }
			 this.setApplytypeText(e);
			 this.setCheckInfo(e);
		 },
		 setCheckInfo:function(e){
			 var ck = this.get('agreementPO.ischecked');
			 var ck2 = this.get('agreementPO.ischecked2');
			 var ck3 = this.get('agreementPO.ischecked3');
			 if(null!=ck3 || 1!=this.get('agreementPO.isreadyforcheck')){
				 this.set('isShowCheck',false);
			 }
			 if(null!=ck){
				 this.set('ischeck','已核對');
				 if(this.agreementPO.checkuser!=null){//核對人員
					 this.set("checkName",this.agreementPO.checkuser.loginname);
				 }
				 $("#ischeck2").show();
				 if(ck2!=null){
					 this.set('ischeck2','已核對');
					 if(this.agreementPO.checkuser2!=null){//核對人員
						 this.set("checkName2",this.agreementPO.checkuser2.loginname);
					 }
					 $("#ischeck3").show();
					 if(ck3!=null){
						 this.set('ischeck3','已核對');
						 if(this.agreementPO.checkuser3!=null){//核對人員
							 this.set("checkName3",this.agreementPO.checkuser3.loginname);
						 }
					 }else{
						 this.set('ischeck3','待核對');
					 }
				 }else{
					 this.set('ischeck2','待核對');
				 }
			 }else{
				 this.set('ischeck','待核對');
			 }
		 },
		 openCheckSubmitDialog:function(e){
			var ck = this.get('agreementPO.ischecked');
			var ck2 = this.get('agreementPO.ischecked2');
			var ck3 = this.get('agreementPO.ischecked3');
			var num = '';
			if(null==ck){
				num = '一';
				count = 1;
			}else if(null==ck2){
				num = '二';
				count = 2;
			}else if(null==ck3){
				num = '三';
				count = 3;
			}
			if (confirm('是否確認第'+num+'次核對資料？')) {
				flowType = 1;
				this.checkSubmit(e);
			}
		 },
		 CancelCheckSubmitDialog:function(e){
			var ck = this.get('agreementPO.ischecked');
			var ck2 = this.get('agreementPO.ischecked2');
			var ck3 = this.get('agreementPO.ischecked3');
			var num = '';
			if(null!=ck3){
				num = '三';
				count = 3;
			}else if(null!=ck2){
				num = '二';
				count = 2;
			}else if(null!=ck){
				num = '一';
				count = 1;
			}
			if (confirm('是否取消第'+num+'次核對資料？')) {
				flowType = 0;
				this.checkSubmit(e);
			}
		 },
		 checkSubmit:function(e){
			 $.ajax({
				    url: contextPath+'/agreement/updateCheckData?agreementid='+protocolVM.get('agreementPO.agreementid')+'&count='+count+'&flowType='+flowType,
				    contentType : 'application/json',
				    type: "POST",
				    dataType: "json",   
				    async : false,
				    success: function(d) {		    
				        if(d.result=='ok'){
				        	RefreshBasicData();
				        	forwordJSP('/detail/showJSP?forwordJSP=Protocol&caseid='+$("#basic_caseid").val());
				        }
				    },
				    error:function(a,b,c){
				    	alert(a+'\t'+b+'\t'+c);		    	
				    }
				});
		 },
//		 closeCheckDialog:function(e){
//			 $("#checkDialog").data("kendoWindow").close();
//		 },
		 setApplytypeText:function(e){
			 var text = '';
			 $.each(this.get('agreementPO.agreementSupports'),function(k,v){
				 text += v.applytype.cname+',';
			 });
			 if(''!=text){
				 text = text.substring(0,text.length-1);
			 }
			 this.set('applytypeText',text); 
		 },
		 setSelectData:function(e){
			 if(null!=this.get('agreementPO.reportsummaryattachmenttype')){
				 var sel = 0;
				 var rt = this.get('agreementPO.reportsummaryattachmenttype');
				 if(rt==1){
					 sel = 1;
				 }else if(rt==2){
					 sel = 2;
				 }
				 $("#typeSelect").data("kendoDropDownList").select(sel);
			 }
			 $.each(protocolVM.get('agreementPO.agreementSupports'),function(k,v){
				 if(null!=v.supportnum){
					 $("#agreementApplycyptCK"+v.applytype.applytypeid).attr('checked','checked');
					 $("#agreementApplycyptNum"+v.applytype.applytypeid).val(v.supportnum).show();
					 $("#agreementApplycyptDiv" + v.applytype.applytypeid).show();
					 $("#agreementApplycyptAmount" + v.applytype.applytypeid).val(v.supportamount);
				 }
			 });
		 },
		 setAgreementData:function(e){
			$("input[name^='reportdueno']").each(function (k,v) {
				protocolVM.agreementPO.reportduedates[k].reportduedate=$(this).val();
			});
			this.set('agreementPO.reportsummaryattachmenttype',parseInt($("#typeSelect").val()));
			//設置批准資助方式 - start
			var isMaxApplytypeid = null;//記錄最大期數的applytypeid
			var isMaxNum = null;//記錄最大期數
			$.each($("input[name^='agreementApplycyptCK']"), function(key, value) {
    			var self = $(this);
    			var id = self.val();
				if(self.attr('checked')=='checked'){
					var currentNum = parseInt($("#agreementApplycyptNum" + id).val());
					if(null == isMaxApplytypeid){//第一次賦值
						isMaxApplytypeid = id;
						isMaxNum = currentNum;
					}else{//比較獲取最大值
						if(currentNum>isMaxNum){
							isMaxApplytypeid = id;
							isMaxNum = currentNum;
						}
					}
					var isExist = false;
					$.each(protocolVM.get('agreementPO.agreementSupports'),function(k,v){
						if(id == v.applytype.applytypeid){
							v.supportamount = $("#agreementApplycyptAmount" + id).val();
							v.supportnum = $("#agreementApplycyptNum" + id).val();
							v.ismax = 0;
							isExist = true;
							return;
						}
					});
					if(!isExist){
						protocolVM.get('applytypeamount').push({
							reportfinanceamount : $("#agreementApplycyptAmount" + id).val(),
							reportfinanceno : $("#agreementApplycyptNum" + id).val(),
							applytypeid : id,
							ismax : 0
						});
					}
				}else{
					$.each(protocolVM.get('agreementPO.agreementSupports'),function(k,v){
						if(id == v.applytype.applytypeid){
							v.supportamount = null;
							v.supportnum = null;
							return;
						}
					});
				}
			});
			//設置isMax
			var isSetIsMax = false;
			$.each(protocolVM.get('agreementPO.agreementSupports'),function(k,v){
				if(isMaxApplytypeid == v.applytype.applytypeid){
					v.ismax = 1;
					isSetIsMax = true;
					return;
				}
			});
			if(!isSetIsMax){
				$.each(protocolVM.get('applytypeamount'),function(k,v){
					if(isMaxApplytypeid == v.applytypeid){
						v.ismax = 1;
						return;
					}
				});
			}
			//設置批准資助方式 - end
			$.each($("input[name^='reportfinanceno']"), function(k1, v1) {
				var self = $(this);
				$.each(protocolVM.get('agreementPO.reportfinanceamounts'),function(k2,v2){
					if(v2.applytype.applytypeid==self.attr('applytypeid') && v2.reportfinanceno==self.attr('reportfinanceno')){
						v2.reportfinanceamount = self.val();
						return;
					}
				});
			});
			if($("#applyCheck").attr('checked')=='checked'){
				this.set('agreementPO.isreadyforcheck',1);
			}else{
				this.set('agreementPO.isreadyforcheck',null);
			}
		 },
		 updateAgreement:function(e){
			this.setAgreementData(e);
			var agreement = JSON.stringify(this.agreementPO);
			var applytypeamount = JSON.stringify(this.get('applytypeamount'));
			$.ajax({
			    url: contextPath+'/agreement/updateAgreement?applytypeamount='+applytypeamount,
			    contentType : 'application/json',
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    data : agreement,
			    success: function(d) {		    
			        if(d.result=='ok'){
			        	RefreshBasicData();
			        	forwordJSP('/detail/showJSP?forwordJSP=Protocol&caseid='+$("#basic_caseid").val());
			        }
			    },
			    error:function(a,b,c){
			    	alert(a+'\t'+b+'\t'+c);		    	
			    }
			});
		 },
		//讀取文件源
		getFileSource : function() {
			$.ajax({
				cache : false,
				url : contextPath+ "/file/getFile",
				type : "POST",
				data : {
					fileSourceID :protocolVM.get("agreementPO.agreementid"),
					filesourcetype:protocolVM.get("filesourcetype")
				},
				dataType : "json",
				success : function(data) {
					if(data.FileisNull == 1){
						$('#selectFile').hide();
						}else{
							$('#selectFile').show();
							protocolVM.set("fileSource_agreement",data.tfile);
						}
					setDivHeight();
				},
				error:function(a,b,c){
					alert(a+"/"+b+"/"+c);	
				}
			});
		}
	 });
	 
	// 獲取頁面上需要的數據
	$.ajax({
		url : contextPath + '/agreement/getParamater?caseid=' + $("#basic_caseid").val(),
		type : "POST",
		dataType : "json",
		async : false,
		success : function(d) {
			$.extend(protocolVM, d);
			protocolVM.setShowDate();
		},
		error : function(e) {
			errorAlert();
		}
	});
	kendo.bind($("#ProtocolContent"), protocolVM);
	protocolVM.getFileSource();// 附件
	
	$(".save-Protocol").click(function(){
		$('#Protocol').show();
		$('#Protocol-edit').hide();
		setDivHeight();
	});
	$("#Edit-Protocol").click(function(){
		$('#Protocol-edit').show();
		$('#Protocol').hide();
		setDivHeight();
	});  
	
	$(".datepicker").kendoDatePicker({
		format: "dd/MM/yyyy"
	  }); 
	 $(".selecttype").kendoDropDownList();
	 
	// 上傳
	$("#uploadInvestigationFile").kendoUpload({
		async : {
			saveUrl : contextPath + "/file/upload",
			autoUpload : true
		},
		success : function onSuccess(e) {
			protocolVM.getFileSource();
		},
		error : function onError(e) {
			alert(e);
		},
		upload : function onUpload(e) {
			protocolVM.tfile.filesourcetype = protocolVM.get("filesourcetype");
			protocolVM.tfile.filesourceid =  protocolVM.get("agreementPO.agreementid");
			protocolVM.tfile.caseId = $("#basic_caseid").val();
			e.data = {
				tfileJsonStr : JSON.stringify(protocolVM.tfile)
			};
			$(".k-upload-files").hide();
		},
		complete : function onComplete(e) {
			$(".k-upload-files").hide('');
			$(".k-upload-files").hide();
		},
		localization : defaultKendoUploadLocalization
	});
});

function showAndHideInp(self){
	if($(self).attr('checked')=='checked'){
		$("#agreementApplycyptNum" + $(self).val()).show();
		$("#agreementApplycyptDiv" + $(self).val()).show();
	}else{
		$("#agreementApplycyptNum" + $(self).val()).hide();
		$("#agreementApplycyptDiv" + $(self).val()).hide();
	}
}

function selectAll() {//附件中的“全选”
	 var checkboxs=document.getElementsByName("AgreementFileFile");
	 for (var i=0;i<checkboxs.length;i++) {
	  var e=checkboxs[i];
	  e.checked=!e.checked;
	 }
}

//刪除文件
function delFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='AgreementFileFile']"), function(key, value) {
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
				protocolVM.getFileSource();
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
