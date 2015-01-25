var StopFinanceVM = '';
$(document).ready(function() {
	
	if('add'==$("#hide_type").val()){
		$('#Stop-edit').show();
		$('#Stop').hide();
		detailinfoVM.set('showStopFinanceVisiblePage',true);
	}
	var currentFollowtype = null; //記錄須展開之跟進程序狀態
	StopFinanceVM = kendo.observable({
		StopStatusText:null,
		stopreasonText:null,
		followtypeText:null,
		selectReportSource:[],
		selectReportSelect:null,
		stopfinanceamount : [],
		fileSource_stopFinance : [],
		filesourcetype:'StopFinance',
		tfile : null,
		setShowDate:function(e){
			this.set('stopfinance.approvedate',getFormatDateByLong(this.get('stopfinance.approvedate')));
			this.set('stopfinance.stopfinancedate',getFormatDateByLong(this.get('stopfinance.stopfinancedate')));
			this.set('stopfinance.companyreceivedate',getFormatDateByLong(this.get('stopfinance.companyreceivedate')));
			this.set('stopfinance.shouldnotificationdate',getFormatDateByLong(this.get('stopfinance.shouldnotificationdate')));
			this.set('stopfinance.companyreplyduedate',getFormatDateByLong(this.get('stopfinance.companyreplyduedate')));
			this.set('stopfinance.companyreplydate',getFormatDateByLong(this.get('stopfinance.companyreplydate')));
			if(1==this.get('stopfinance.isindraft')){
				$("#isindraftShow").attr("checked","checked");
				$("#isindraftEdit").attr("checked","checked");
			}else{
				$("#isindraftShow").removeAttr("checked"); 
				$("#isindraftEdit").removeAttr("checked"); 
			}
			this.setStopStatusText(e);
			this.setstopreasonText(e);
			this.setfollowtypeText(e);
			var num = $("#hide_num").val();
			if(''==num){
				num = parseInt(this.get('num'));
			}
			$.each(this.get('stopFinanceList'),function(k,v){
				var index = v.stopfinancenum;
				if(index<10){
					index = '0' + index;
				}
				StopFinanceVM.get("selectReportSource").push({
					id : v.stopfinancenum,
					text : '第'+index+'次中止發放'
				});
			});
			$.each(this.get('selectReportSource'),function(k,v){
				if(v.id==num){
					StopFinanceVM.set('selectReportSelect',v);
					return;
				}
			});
			currentFollowtype = this.get('stopfinance.followtype');
			if(isNaN(num)){
				$('#Stop-edit').show();
				$('#Stop').hide();
			}
		},
		setStopStatusText:function(e){
			var stopstatus = this.get('stopfinance.stopstatus');
			if(null!=stopstatus){
				if(1==stopstatus){
					this.set('StopStatusText','一般');
				}else if(2==stopstatus){
					this.set('StopStatusText','特別');
				}
			}
		},
		setstopreasonText:function(e){
			var stopreason = this.get('stopfinance.stopreason');
			if(null!=stopreason){
				if(1==stopreason){
					this.set('stopreasonText','未能準時提交報告');
				}else if(2==stopreason){
					this.set('stopreasonText','建議實地調查或審計');
				}
				else if(3==stopreason){
					this.set('stopreasonText','未因項目變更事先通知基金');
				}
				else if(4==stopreason){
					this.set('stopreasonText','其它');
				}
			}
		},
		setfollowtypeText:function(e){
			var followtype = this.get('stopfinance.followtype');
			if(null!=followtype){
				if(1==followtype){
					this.set('followtypeText','符合要求');
				}else if(2==followtype){
					this.set('followtypeText','建議撥付');
				}else if(3==followtype){
					this.set('followtypeText','建議取消批給');
				}else if(4==followtype){
					this.set('followtypeText','其它');
				}
			}
		},
		setSelectData:function(e){
			$("#stopstatus").data("kendoDropDownList").select(this.get('stopfinance.stopstatus'));
			$("#stopreason").data("kendoDropDownList").select(this.get('stopfinance.stopreason'));
			$("#followtype").data("kendoDropDownList").select(this.get('stopfinance.followtype'));
			if(4==this.get('stopfinance.stopreason')){
				$('#otherinput').show();
			}
			if(4==this.get('stopfinance.followtype')){
				$('#otherinput1').show();
			}
			/*$.each(StopFinanceVM.get('stopfinance.stopfinanceamount'), function(k,v) {
				$("#stopfinanceamount" + v.applytype.applytypeid).val(v.stopfinanceamount);
			});*/
		},
		SaveAndUpdateStopFinance:function(e){
			this.setStopFinanceData(e);
			var stopfinanceid = this.get('stopfinance.stopfinanceid');
			var stopfinance = JSON.stringify(this.stopfinance);
			var stopfinanceamount = JSON.stringify(this.get('stopfinanceamount'));
			$.ajax({
			    url: contextPath+'/stopfinance/SaveAndUpdateStopFinance?caseid='+$("#basic_caseid").val()+'&stopfinanceamount='+stopfinanceamount,
			    contentType : 'application/json',
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    data : stopfinance,
			    success: function(d) {		    
			        if(d.result=='ok'){
			        	RefreshBasicData();
			        	if(3==$("#followtype").val() && currentFollowtype!= StopFinanceVM.get('stopfinance.followtype')){
			        		if (confirm("是否建立取消批給程序?")) {
			        			detailinfoVM.set('showCancelContractVisiblePage',true);
			        			tab('tabId9','tabC9');
			            		forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=add');
			        			return;
			        		}
			        	}
			        	forwordJSP('/detail/showJSP?forwordJSP=StopFinance&caseid='+$("#basic_caseid").val()+'&type=show&num='+(stopfinanceid==null?d.num:StopFinanceVM.get('selectReportSelect.id')));
			        }
			    },
			    error:function(a,b,c){
			    	alert(a+'\t'+b+'\t'+c);		    	
			    }
			});
		},
		setStopFinanceData:function(e){
			this.set('stopfinance.stopstatus',parseInt($("#stopstatus").val()));
			this.set('stopfinance.stopreason',parseInt($("#stopreason").val()));
			this.set('stopfinance.followtype',parseInt($("#followtype").val()));
			if(undefined!=$('#isindraftEdit').attr('checked')){
				this.set('stopfinance.isindraft',1);
			}else{
				this.set('stopfinance.isindraft',0);
			}
			if(4!=$("#stopreason").val()){
				this.set('stopfinance.stopreasonotherremark',null);
			}
			if(4!=$("#followtype").val()){
				this.set('stopfinance.followtypeotherremark',null);
			}
			if(null == this.get('stopfinance.stopfinanceamount') || ''==this.get('stopfinance.stopfinanceamount')){
				$.each($("input[name^='stopfinanceamount']"), function(key, value) {
					var id = $(this).attr('index');
					StopFinanceVM.get('stopfinanceamount').push({
						stopfinanceamount : $("#stopfinanceamount" + id).val()==''?null:$("#stopfinanceamount" + id).val(),
						applytypeid : id
					});
				});
			}else{
				$.each($("input[name^='stopfinanceamount']"), function(key, value) {
					var id = $(this).attr('index');
					$.each(StopFinanceVM.get('stopfinance.stopfinanceamount'),function(k,v){
						if(id == v.applytype.applytypeid){
							v.stopfinanceamount = $("#stopfinanceamount" + id).val()==''?null:$("#stopfinanceamount" + id).val();
							return;
						}
					});
				});
			}
		},
		reportNumChange:function(e){
			forwordJSP('/detail/showJSP?forwordJSP=StopFinance&caseid='+$("#basic_caseid").val()+'&type=show&num='+this.get('selectReportSelect.id'));
		},
		//讀取文件源
		getFileSource : function() {
			$.ajax({
				cache : false,
				url : contextPath+ "/file/getFile",
				type : "POST",
				data : {
					fileSourceID :StopFinanceVM.get("stopfinance.stopfinanceid"),
					filesourcetype:StopFinanceVM.get("filesourcetype")
				},
				dataType : "json",
				success : function(data) {
					if(data.FileisNull == 1){
						$('#selectFile').hide();
						}else{
							$('#selectFile').show();
							StopFinanceVM.set("fileSource_stopFinance",data.tfile);
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
					url : contextPath + '/stopfinance/deleteStopFinance?stopfinanceid='+StopFinanceVM.get('stopfinance.stopfinanceid'),
					type : "POST",
					dataType : "json",
					async : false,
					success : function(d) {
						if(d.result=='ok'){
							forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=show');
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
		url : contextPath + '/stopfinance/getParamater?caseid=' + $("#basic_caseid").val()+'&num='+$("#hide_num").val()+'&type='+$("#hide_type").val(),
		type : "POST",
		dataType : "json",
		async : false,
		success : function(d) {
			$.extend(StopFinanceVM, d);
			StopFinanceVM.setShowDate();
		},
		error : function(e) {
			errorAlert();
		}
	});
	kendo.bind($("#StopFinanceContent"), StopFinanceVM);
	
	StopFinanceVM.getFileSource();// 附件
	
	$(".save-Stop").click(function(){
		$('#Stop').show();
		$('#Stop-edit').hide();
		setDivHeight();
	});
	$("#Edit-Stop").click(function(){
		$('#Stop-edit').show();
		$('#Stop').hide();
		setDivHeight();
	});  
	
	$("#radioyes").click(function(){
		$('#Noticediv').show();
	});
	$("#radiono").click(function(){
		$('#Noticediv').hide();
	}); 
	
	$(".datepicker").kendoDatePicker({
		format: "yyyy-MM-dd"
	  }); 
	 $(".selecttype").kendoDropDownList(); 
	 
	// 上傳
	$("#uploadInvestigationFile").kendoUpload({
		async : {
			saveUrl : contextPath + "/file/upload",
			autoUpload : true
		},
		success : function onSuccess(e) {
			StopFinanceVM.getFileSource();
		},
		error : function onError(e) {
			alert(e);
		},
		upload : function onUpload(e) {
			StopFinanceVM.tfile.filesourcetype = StopFinanceVM.get("filesourcetype");
			StopFinanceVM.tfile.filesourceid =  StopFinanceVM.get("stopfinance.stopfinanceid");
			StopFinanceVM.tfile.caseId = $("#basic_caseid").val();
			e.data = {
				tfileJsonStr : JSON.stringify(StopFinanceVM.tfile)
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
	  if($(self).val() == 4){
		 $('#otherinput').show();
	  }
	  else{
		  $('#otherinput').hide();
	  }
  }; 
  function onChange1(self) {
	  if($(self).val() == 4){
		 $('#otherinput1').show();
	  }
	  else{
		  $('#otherinput1').hide();
	  }
  }; 
  
  function selectAll() {//附件中的“全选”
		 var checkboxs=document.getElementsByName("StopFinanceFile");
		 for (var i=0;i<checkboxs.length;i++) {
		  var e=checkboxs[i];
		  e.checked=!e.checked;
		 }
	}

	//刪除文件
	function delFile(fileid) {
		var str="";
		//獲取所有選中的存放到數組	checked
		$.each($("input[name='StopFinanceFile']"), function(key, value) {
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
					StopFinanceVM.getFileSource();
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