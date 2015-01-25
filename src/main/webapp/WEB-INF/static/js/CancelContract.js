var CancelContractVM = '';
$(document).ready(function() {
	
	if('add'==$("#hide_type").val()){
		$('#Cancel-edit').show();
		$('#Cancel').hide();
		detailinfoVM.set('showCancelContractVisiblePage',true);
	}
	CancelContractVM = kendo.observable({
		cancelReasonText:null,
		cancelResultText:null,
		selectReportSource:[],
		selectReportSelect:null,
		cancelcontractamount:[],
		fileSource_CancelContract : [],
		filesourcetype:'CancelContract',
		tfile : null,
		setShowDate:function(e){
			this.set('cancelcontract.approvedate',getFormatDateByLong(this.get('cancelcontract.approvedate')));
			this.set('cancelcontract.companyreceivedate',getFormatDateByLong(this.get('cancelcontract.companyreceivedate')));
			this.set('cancelcontract.returnduedate',getFormatDateByLong(this.get('cancelcontract.returnduedate')));
			this.set('cancelcontract.shouldcanceldate',getFormatDateByLong(this.get('cancelcontract.shouldcanceldate')));
			this.set('cancelcontract.companyreturndate',getFormatDateByLong(this.get('cancelcontract.companyreturndate')));
			this.set('cancelcontract.forcecollectiondate',getFormatDateByLong(this.get('cancelcontract.forcecollectiondate')));
			if(1==this.get('cancelcontract.isdraft')){
				$("#isdraftShow").attr("checked","checked");
				$("#isdraftEdit").attr("checked","checked");
			}else{
				$("#isdraftShow").removeAttr("checked"); 
				$("#isdraftEdit").removeAttr("checked"); 
			}
			this.setCancelReasonText(e);
			this.setCancelResultText(e);
			var num = $("#hide_num").val();
			if(''==num){
				num = parseInt(this.get('num'));
			}
			$.each(this.get('cancelContractList'),function(k,v){
				var index = v.cancelcontractnum;
				if(index<10){
					index = '0' + index;
				}
				CancelContractVM.get("selectReportSource").push({
					id : v.cancelcontractnum,
					text : '第'+index+'次取消批給程序'
				});
			});
			$.each(this.get('selectReportSource'),function(k,v){
				if(v.id==num){
					CancelContractVM.set('selectReportSelect',v);
					return;
				}
			});
			if(isNaN(num)){
				$('#Cancel-edit').show();
				$('#Cancel').hide();
			}
		},
		setCancelReasonText:function(e){
			var cancelreason = this.get('cancelcontract.cancelreason');
			if(null!=cancelreason){
				if(1==cancelreason){
					this.set('cancelReasonText','作出虛假聲明/提供虛假資料');
				}else if(2==cancelreason){
					this.set('cancelReasonText','沒有履行協議書中的義務');
				}else if(3==cancelreason){
					this.set('cancelReasonText','違反規章的行為');
				}else if(4==cancelreason){
					this.set('cancelReasonText','監察項目時發現嚴重差異');
				}else if(5==cancelreason){
					this.set('cancelReasonText','未按規定處理設備變賣得益');
				}else if(6==cancelreason){
					this.set('cancelReasonText','賬簿及記錄未按規定處理');
				}else if(7==cancelreason){
					this.set('cancelReasonText','未完成并終止項目');
				}else if(8==cancelreason){
					this.set('cancelReasonText','其它');
				}
			}
		},
		setCancelResultText:function(e){
			var cancelresult = this.get('cancelcontract.cancelresult');
			if(null!=cancelresult){
				if(1==cancelresult){
					this.set('cancelResultText','批准');
				}else if(2==cancelresult){
					this.set('cancelResultText','不批准');
				}else if(3==cancelresult){
					this.set('cancelResultText','其它');
				}
			}
		},
		setSelectData:function(e){
			$("#cancelreason").data("kendoDropDownList").select(this.get('cancelcontract.cancelreason'));
			$("#cancelresult").data("kendoDropDownList").select(this.get('cancelcontract.cancelresult'));
			if(8==this.get('cancelcontract.cancelreason')){
				$('#otherinput').show();
			}
		},
		SaveAndUpdateCancelContract:function(e){
			this.setCancelContractData(e);
			var cancelcontractid = this.get('cancelcontract.cancelcontractid');
			var cancelcontract = JSON.stringify(this.cancelcontract);
			var cancelcontractamount = JSON.stringify(this.get('cancelcontractamount'));
			$.ajax({
			    url: contextPath+'/cancelcontract/SaveAndUpdateCancelContract?caseid='+$("#basic_caseid").val()+'&cancelcontractamount='+cancelcontractamount,
			    contentType : 'application/json',
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    data : cancelcontract,
			    success: function(d) {		    
			        if(d.result=='ok'){
			        	RefreshBasicData();
			        	//刷新系統右邊的數據列表
						 detailinfoVM.GetRightReportData();
			        	forwordJSP('/detail/showJSP?forwordJSP=CancelContract&caseid='+$("#basic_caseid").val()+'&type=show&num='+(cancelcontractid==null?d.num:CancelContractVM.get('selectReportSelect.id')));
			        }
			    },
			    error:function(a,b,c){
			    	alert(a+'\t'+b+'\t'+c);		    	
			    }
			});
		},
		setCancelContractData:function(e){
			this.set('cancelcontract.cancelreason',parseInt($("#cancelreason").val()));
			this.set('cancelcontract.cancelresult',parseInt($("#cancelresult").val()));
			if(undefined!=$('#isdraftEdit').attr('checked')){
				this.set('cancelcontract.isdraft',1);
			}else{
				this.set('cancelcontract.isdraft',0);
			}
			if(8!=$("#cancelreason").val()){
				this.set('cancelcontract.cancelreasonotherremark',null);
			}
			if(null == this.get('cancelcontract.cancelcontracreturnamount') || ''==this.get('cancelcontract.cancelcontracreturnamount')){
				$.each($("input[name^='cancelfinanceamount']"), function(key, value) {
					var id = $(this).attr('index');
					CancelContractVM.get('cancelcontractamount').push({
						stopfinanceamount : $("#cancelfinanceamount" + id).val()==''?null:$("#cancelfinanceamount" + id).val(),
						applytypeid : id
					});
				});
			}else{
				$.each($("input[name^='cancelfinanceamount']"), function(key, value) {
					var id = $(this).attr('index');
					$.each(CancelContractVM.get('cancelcontract.cancelcontracreturnamount'),function(k,v){
						if(id == v.applytype.applytypeid){
							v.returnamount = $("#cancelfinanceamount" + id).val()==''?null:$("#cancelfinanceamount" + id).val();
							return;
						}
					});
				});
			}
		},
		reportNumChange:function(e){
			forwordJSP('/detail/showJSP?forwordJSP=CancelContract&caseid='+$("#basic_caseid").val()+'&type=show&num='+this.get('selectReportSelect.id'));
		},
		//讀取文件源
		getFileSource : function() {
			$.ajax({
				cache : false,
				url : contextPath+ "/file/getFile",
				type : "POST",
				data : {
					fileSourceID :CancelContractVM.get("cancelcontract.cancelcontractid"),
					filesourcetype:CancelContractVM.get("filesourcetype")
				},
				dataType : "json",
				success : function(data) {
					if(data.FileisNull == 1){
						$('#selectFile').hide();
						}else{
							$('#selectFile').show();
							CancelContractVM.set("fileSource_CancelContract",data.tfile);
						}
					setDivHeight();
				},
				error:function(a,b,c){
					alert(a+"/"+b+"/"+c);	
				}
			});
		},
		deleteStopFinance:function(e){
			if(confirm("確定要刪除嗎?")){
				$.ajax({
					url : contextPath + '/cancelcontract/deleteCancelContract?cancelcontractid='+CancelContractVM.get('cancelcontract.cancelcontractid'),
					type : "POST",
					dataType : "json",
					async : false,
					success : function(d) {
						if(d.result=='ok'){
							forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=show');
						}
					},
					error : function(e) {
						errorAlert();
					}
				});
			}
		}
	});
	
	// 獲取頁面上需要的數據
	$.ajax({
		url : contextPath + '/cancelcontract/getParamater?caseid=' + $("#basic_caseid").val()+'&num='+$("#hide_num").val()+'&type='+$("#hide_type").val(),
		type : "POST",
		dataType : "json",
		async : false,
		success : function(d) {
			$.extend(CancelContractVM, d);
			CancelContractVM.setShowDate();
		},
		error : function(e) {
			errorAlert();
		}
	});
	kendo.bind($("#CancelContractContent"), CancelContractVM);	
	CancelContractVM.getFileSource();// 附件
	
	$(".save-Cancel").click(function() {
		$('#Cancel').show();
		$('#Cancel-edit').hide();
		setDivHeight();
	});
	$("#Edit-Cancel").click(function() {
		$('#Cancel-edit').show();
		$('#Cancel').hide();
		setDivHeight();
	});

	$(".datepicker").kendoDatePicker({
		format : "yyyy-MM-dd"
	});
	$(".selecttype").kendoDropDownList();
	
	// 上傳
	$("#uploadInvestigationFile").kendoUpload({
		async : {
			saveUrl : contextPath + "/file/upload",
			autoUpload : true
		},
		success : function onSuccess(e) {
			CancelContractVM.getFileSource();
		},
		error : function onError(e) {
			alert(e);
		},
		upload : function onUpload(e) {
			CancelContractVM.tfile.filesourcetype = CancelContractVM.get("filesourcetype");
			CancelContractVM.tfile.filesourceid =  CancelContractVM.get("cancelcontract.cancelcontractid");
			CancelContractVM.tfile.caseId = $("#basic_caseid").val();
			e.data = {
				tfileJsonStr : JSON.stringify(CancelContractVM.tfile)
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

function onChange(self) {
	if ($(self).val() == 8) {
		$('#otherinput').show();
	} else {
		$('#otherinput').hide();
	}
}

function selectAll() {//附件中的“全选”
	 var checkboxs=document.getElementsByName("CancelContractFile");
	 for (var i=0;i<checkboxs.length;i++) {
	  var e=checkboxs[i];
	  e.checked=!e.checked;
	 }
}

//刪除文件
function delFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='CancelContractFile']"), function(key, value) {
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
				CancelContractVM.getFileSource();
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
