var NoticeVM = '';
$(document).ready(function() {
	
	if('add'==$("#hide_type").val()){
		$('#Notice-edit').show();
		$('#Notice').hide();
		detailinfoVM.set('showFundNotificationVisiblePage',true);
	}
	
	var currentFollowtype = null; //記錄須展開之跟進程序狀態
	
	NoticeVM = kendo.observable({
		isaboutsubmitreport:null,
		isconform:null,
		isShowReportNum:false,
		notificationtypeText:null,
		followtypeText:null,
		selectReportSource:[],
		selectReportSelect:null,
		fileSource_notice:[],
		filesourcetype:'FundNotification',
		tfile : null,
		setShowDate:function(e){
			this.set('fundnotification.receivedate',getFormatDateByLong(this.get('fundnotification.receivedate')));
			this.set('fundnotification.replyduedate',getFormatDateByLong(this.get('fundnotification.replyduedate')));
			this.set('fundnotification.replydate',getFormatDateByLong(this.get('fundnotification.replydate')));
			if(1==this.get('fundnotification.isaboutsubmitreport')){
				this.set('isaboutsubmitreport','是');
				this.set('isShowReportNum',true);
				$("input[name=radios]:eq(0)").attr("checked",'checked');
				$('#reportInput').show();
			}else if(0==this.get('fundnotification.isaboutsubmitreport')){
				this.set('isaboutsubmitreport','否');
				$("input[name=radios]:eq(1)").attr("checked",'checked');
			}
			this.setnotificationtypeText();
			this.setfollowtypeText();
			var num = $("#hide_num").val();
			if(''==num){
				num = parseInt(this.get('num'));
			}
			$.each(this.get('fundNotificationList'),function(k,v){
				var index = v.fundnotificationnum;
				if(index<10){
					index = '0' + index;
				}
				NoticeVM.get("selectReportSource").push({
					id : v.fundnotificationnum,
					text : '第'+index+'封通知'
				});
			});
			$.each(this.get('selectReportSource'),function(k,v){
				if(v.id==num){
					NoticeVM.set('selectReportSelect',v);
					return;
				}
			});
			currentFollowtype = this.get('fundnotification.followtype');
			if(isNaN(num)){
				$('#Notice-edit').show();
				$('#Notice').hide();
			}
		},
		setSelectData:function(e){
			$("#notificationtype").data("kendoDropDownList").select(this.get('fundnotification.notificationtype'));
			if(6==this.get('fundnotification.notificationtype')){
				$('#otherinput').show();
			}
			$("#followtype").data("kendoDropDownList").select(this.get('fundnotification.followtype'));
			if(5==this.get('fundnotification.followtype')){
				$('#otherinput1').show();
			}
		},
		setnotificationtypeText:function(e){
			var notificationtype = this.get('fundnotification.notificationtype');
			if(null!=notificationtype){
				if(1==notificationtype){
					this.set('notificationtypeText','SEPbox');
				}else if(2==notificationtype){
					this.set('notificationtypeText','郵寄');
				}else if(3==notificationtype){
					this.set('notificationtypeText','電郵');
				}else if(4==notificationtype){
					this.set('notificationtypeText','傳真');
				}else if(5==notificationtype){
					this.set('notificationtypeText','親臨');
				}else if(6==notificationtype){
					this.set('notificationtypeText','其它');
				}
			}
		},
		setfollowtypeText:function(e){
			var followtype = this.get('fundnotification.followtype');
			if(null!=followtype){
				if(1==followtype){
					this.set('followtypeText','另行通知');
				}else if(2==followtype){
					this.set('followtypeText','轉交其他部門處理');
				}else if(3==followtype){
					this.set('followtypeText','建議中止發放');
				}else if(4==followtype){
					this.set('followtypeText','建議取消批給');
				}else if(5==followtype){
					this.set('followtypeText','其它');
				}
			}
		},
		setNoticeData:function(e){
			this.set('fundnotification.isaboutsubmitreport',$('input[name="radios"]:checked').val());
			this.set('fundnotification.isconform',$('input[name="radios1"]:checked').val());
			this.set('fundnotification.notificationtype',parseInt($("#notificationtype").val()));
			this.set('fundnotification.followtype',parseInt($("#followtype").val()));
			if(0==$('input[name="radios"]:checked').val()){
				this.set('fundnotification.reportnum',null);
			}
			if(6!=$("#notificationtype").val()){
				this.set('fundnotification.notificationotherremark',null);
			}
			if(0==$('input[name="radios1"]:checked').val()){
				this.set('fundnotification.followtype',0);
				this.set('fundnotification.followotherremark',null);
				this.set('fundnotification.followremark',null);
			}
			if(5!=$("#followtype").val()){
				this.set('fundnotification.followotherremark',null);
			}
		},
		SaveAndUpdateNotice:function(e){
			this.setNoticeData(e);
			var fundnotificationid = this.get('fundnotification.fundnotificationid');
			var fundnotification = JSON.stringify(this.fundnotification);
			$.ajax({
			    url: contextPath+'/notice/SaveAndUpdateNotice?caseid='+$("#basic_caseid").val(),
			    contentType : 'application/json',
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    data : fundnotification,
			    success: function(d) {		    
			        if(d.result=='ok'){
			        	if(3==$("#followtype").val() && currentFollowtype!= NoticeVM.get('fundnotification.followtype')){
			        		if (confirm("是否建立項目終止發放?")) {
			        			detailinfoVM.set('showStopFinanceVisiblePage',true);
			        			tab('tabId6','tabC6');
			            		forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=add');
			        			return;
			        		}
			        	}else if(4==$("#followtype").val() && currentFollowtype!= NoticeVM.get('fundnotification.followtype')){
			        		if (confirm("是否建立取消批給程序?")) {
			        			detailinfoVM.set('showCancelContractVisiblePage',true);
			        			tab('tabId9','tabC9');
			            		forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=add');
			        			return;
			        		}
			        	}
			        	forwordJSP('/detail/showJSP?forwordJSP=Notice&caseid='+$("#basic_caseid").val()+'&type=show&num='+(fundnotificationid==null?d.num:NoticeVM.get('selectReportSelect.id')));
			        }
			    },
			    error:function(a,b,c){
			    	alert(a+'\t'+b+'\t'+c);		    	
			    }
			});
		},
		reportNumChange:function(e){
			forwordJSP('/detail/showJSP?forwordJSP=Notice&caseid='+$("#basic_caseid").val()+'&type=show&num='+this.get('selectReportSelect.id'));
		},
		deleteFundNotification:function(e){
			if(confirm("確定要刪除嗎?")){
				$.ajax({
					url : contextPath + '/notice/deleteNotice?fundnotificationid='+NoticeVM.get('fundnotification.fundnotificationid'),
					type : "POST",
					dataType : "json",
					async : false,
					success : function(d) {
						if(d.result=='ok'){
							forwordJSP('/detail/showJSP?forwordJSP=Notice&type=show');
						}
					},
					error : function(e) {
						errorAlert();
					}
				});
			}
		},
		//讀取文件源
		getFileSource : function() {
			$.ajax({
				cache : false,
				url : contextPath+ "/file/getFile",
				type : "POST",
				data : {
					fileSourceID :NoticeVM.get("fundnotification.fundnotificationid"),
					filesourcetype:NoticeVM.get("filesourcetype")
				},
				dataType : "json",
				success : function(data) {
					if(data.FileisNull == 1){
						$('#selectFile').hide();
						}else{
							$('#selectFile').show();
							NoticeVM.set("fileSource_notice",data.tfile);
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
		url : contextPath + '/notice/getParamater?caseid=' + $("#basic_caseid").val()+'&num='+$("#hide_num").val()+'&type='+$("#hide_type").val(),
		type : "POST",
		dataType : "json",
		async : false,
		success : function(d) {
			$.extend(NoticeVM, d);
			NoticeVM.setShowDate();
		},
		error : function(e) {
			errorAlert();
		}
	});
	kendo.bind($("#NoticeContent"), NoticeVM);	
	
	NoticeVM.getFileSource();// 附件
	
	$(".save-Notice").click(function(){
		$('#Notice').show();
		$('#Notice-edit').hide();
		setDivHeight();
	});
	$("#Edit-Notice").click(function(){
		$('#Notice-edit').show();
		$('#Notice').hide();
		setDivHeight();
	});  
	
	$("#radioyes").click(function(){
		$('#reportInput').show();
	});
	$("#radiono").click(function(){
		$('#reportInput').hide();
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
			NoticeVM.getFileSource();
		},
		error : function onError(e) {
			alert(e);
		},
		upload : function onUpload(e) {
			NoticeVM.tfile.filesourcetype = NoticeVM.get("filesourcetype");
			NoticeVM.tfile.filesourceid =  NoticeVM.get("fundnotification.fundnotificationid");
			NoticeVM.tfile.caseId = $("#basic_caseid").val();
			e.data = {
				tfileJsonStr : JSON.stringify(NoticeVM.tfile)
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
	  if($(self).val() == 6){
		 $('#otherinput').show();
	  }
	  else{
		  $('#otherinput').hide();
	  }
  };
  function onChange1(self) {
	  if($(self).val() == 5){
		 $('#otherinput1').show();
	  }
	  else{
		  $('#otherinput1').hide();
	  }
  };  
  
  function selectAll() {//附件中的“全选”
		 var checkboxs=document.getElementsByName("NoticeFile");
		 for (var i=0;i<checkboxs.length;i++) {
		  var e=checkboxs[i];
		  e.checked=!e.checked;
		 }
	}

	//刪除文件
	function delFile(fileid) {
		var str="";
		//獲取所有選中的存放到數組	checked
		$.each($("input[name='NoticeFile']"), function(key, value) {
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
					NoticeVM.getFileSource();
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