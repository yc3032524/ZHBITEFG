var detailinfoVM="";
$(document).ready(function() {
	
	
	
	
    $("#newmenu").kendoMenu();
     
    /*報告書*/
    $("#save-Report").click(function(){
        $('#Report').show();
        $('#Report-edit').hide();
    });
    $("#Edit-Report").click(function(){
        $('#Report-edit').show();
        $('#Report').hide();
    }); 
    
    $("#Issue,.selecttype").kendoDropDownList();  
    
    $(".datepicker").kendoDatePicker({
    	format: "dd/MM/yyyy"
    });  
    
    
     detailinfoVM = kendo.observable({
    	basicApplytypes:[],
    	supportnumSource:[],
    	totalSubsidyAmount:null,//總資助金額
    	haveBeenIssuedAmount:null,//已發放金額
    	addItemVisible:true,
    	showAgreementVisiblePage:false,
    	showReportVisiblePage:false,
    	showFundNotificationVisiblePage:false,
    	showDelayWorkVisiblePage:false,
    	showStopFinanceVisiblePage:false,
    	showPauseWorkVisiblePage:false,
    	showDelaySubmitReportVisiblePage:false,
    	showCancelContractVisiblePage:false,
    	showInvestigationVisiblePage:false,
    	showCompanyLetterFormPage:false,
    	showCompanyApplyChangePage:false,
    	setBasicApplytypeText:function(e){
    		var text = '';
			$.each(this.get('basicApplicationApplyTypeList'),function(k,v){
				text += v.applytype.cname+'<br/>';
			});
			$("#basicApplytypeText").html(text);
    	},
    	addAgreement:function(e){
    		detailinfoVM.set("supportnumSource",[]);
    		$.each($("input[name^='basicApplycyptCK']"), function(key, value) {
    			var self = $(this);
				if(self.attr('checked')=='checked'){
					detailinfoVM.get("supportnumSource").push({
						id:self.val(),
						num:$("#basicSupportNum" + self.val()).val()
					});
				}
			});
    		var params = {
    				aggreementsigndate:$("#aggreementsigndate").val(),
    				supportnum:JSON.stringify(detailinfoVM.get("supportnumSource")),
    				reportduedate:$("#reportduedate").val(),
    				reportcycle:$("#reportcycle").val(),
    				caseid:$("#basic_caseid").val()
    			};
    		$.ajax({
    		    url: contextPath+'/agreement/saveAgreement',
    		    type: "POST",
    		    dataType: "json",   
    		    async : false,
    		    data : params,
    		    success: function(d) {		
    		    	$("#agreementDialog").data("kendoWindow").close();
    		    	RefreshBasicData();
    		    	tab('tabId2','tabC2');
    		    	forwordJSP('/detail/showJSP?forwordJSP=Protocol&caseid='+$("#basic_caseid").val());
    		    },
    		    error:function(e){
    		    	alert(e);		    	
    		    }
    		});
    	},
    	closeAgreement:function(e){
    		$("#agreementDialog").data("kendoWindow").close();
    	},
    	rightReportNum:0,
    	RightReportData:[],//系統右邊 報告內容數據
    	GetRightReportData:function(){ //系統右邊 報告內容列表
    		var caseId=$("#basic_caseid").val();    	
    		var str = [];			
			$.ajax({
				url : contextPath+ '/report/GetRightReport?caseId='+caseId,
				type : "POST",
				async : false,
				dataType : "json",
				success : function(d) {		
					str = d;					
					detailinfoVM.set("rightReportNum",str.length);
				},
				error : function(e) {
					alert(e);
				}
			});
			this.set("RightReportData", str);
    	},
    	initData:function(e){
    		this.setBasicApplytypeText(e);
    		var totalAmount = 0;
    		$.each(this.get('basicAgreement.agreementSupports'),function(k,v){
    			totalAmount += v.supportamount;
    		});
    		this.set('totalSubsidyAmount',formatCurrency(totalAmount));
    		var issuedAmount = 0;
    		$.each(this.get('basicReportList'),function(k,v){
    			issuedAmount += v.financeamount;
    		});
    		this.set('haveBeenIssuedAmount',formatCurrency(issuedAmount));
    		if(null!=this.get('basicDelayWork')){
    			$("#basicDelayWork").show();
    			var text = '';
    			if(null!=this.get('basicDelayWork.delayduedate')){
    				text = '(' + getFormatDateByLong(this.get('basicDelayWork.delayduedate')) +') - ' +  this.get('basicDelayWorkCount') + '期';
    			}else{
    				text = this.get('basicDelayWorkCount') + '期';
    			}
    			$("#DelayWorkData").html(text);
    		}
    		if(null!=this.get('basicStopFinance')){
    			$("#basicStopFinance").show();
    			var num = this.get('basicStopFinance.stopfinancenum')<10?'0'+this.get('basicStopFinance.stopfinancenum'):this.get('basicStopFinance.stopfinancenum');
    			var text = '';
    			if(null!=this.get('basicStopFinance.stopfinancedate')){
    				text = '(' + getFormatDateByLong(this.get('basicStopFinance.stopfinancedate')) +') - ' +  num + '期';
    			}else{
    				text = num + '期';
    			}
    			$("#StopFinanceData").html(text);
    		}
    		if(null!=this.get('basicPauseWork')){
    			$("#basicPauseWork").show();
    			var text = '';
    			if(null!=this.get('basicPauseWork.approvepausedate')){
    				text = '(' + getFormatDateByLong(this.get('basicPauseWork.approvepausedate')) +') - ' +  this.get('basicPauseWorkCount') + '期';
    			}else{
    				text = this.get('basicPauseWorkCount') + '期';
    			}
    			$("#PauseWorkData").html(text);
    		}
    		if(null!=this.get('basicCancelContract')){
    			$("#basicCancelContract").show();
    			var num = this.get('basicCancelContract.cancelcontractnum')<10?'0'+this.get('basicCancelContract.cancelcontractnum'):this.get('basicCancelContract.cancelcontractnum');
    			var text = '';
    			if(null!=this.get('basicCancelContract.cancelreason')){
    				text = '(' + this.setCancelReasonText() + ') - ' + num + '期';
    			}else{
    				text = num + '期';
    			}
    			$("#CancelContractData").html(text);
    		}
    		if(null == this.get('basicAgreement.agreementid') || (
    				this.get('basicAgreement.ischecked')!=1 
    				&& this.get('basicAgreement.ischecked2')!=1 
    				&& this.get('basicAgreement.ischecked3')!=1)){
    			this.set('addItemVisible',false);
    		}else{
    			this.set('addItemVisible',true);
    		}
    	},
    	initItem:function(){
    		this.itemIsOrder();
    		var orderid = $(".orderid");
    		$.each(this.get('orderId'),function(k,v){
    			orderid.each(function() {
                    if($(this).attr('id')==k){
                    	$(this).attr('orderid',v);
                    	return;
                    }
                });
    		});
    		orderItem();
    	},
    	itemIsOrder:function(){//移除不需要排序的item樣式.orderid
    		if(!this.get('showFundNotificationVisiblePage')){
    			$("#tabId4").removeClass('orderid');
    		}
    		if(!this.get('showDelayWorkVisiblePage')){
    			$("#tabId5").removeClass('orderid');
    		}
    		if(!this.get('showStopFinanceVisiblePage')){
    			$("#tabId6").removeClass('orderid');
    		}
    		if(!this.get('showPauseWorkVisiblePage')){
    			$("#tabId7").removeClass('orderid');
    		}
    		if(!this.get('showDelaySubmitReportVisiblePage')){
    			$("#tabId8").removeClass('orderid');
    		}
    		if(!this.get('showCancelContractVisiblePage')){
    			$("#tabId9").removeClass('orderid');
    		}
    		if(!this.get('showInvestigationVisiblePage')){
    			$("#tabId10").removeClass('orderid');
    		}
    		if(!this.get('showCompanyLetterFormPage')){
    			$("#tabId11").removeClass('orderid');
    		}
    		if(!this.get('showCompanyApplyChangePage')){
    			$("#tabId12").removeClass('orderid');
    		}
    	},
    	setCancelReasonText:function(e){
			var cancelreason = this.get('basicCancelContract.cancelreason');
			var text = '';
			if(null!=cancelreason){
				if(1==cancelreason){
					text = '作出虛假聲明/提供虛假資料';
				}else if(2==cancelreason){
					text = '沒有履行協議書中的義務';
				}else if(3==cancelreason){
					text = '違反規章的行為';
				}else if(4==cancelreason){
					text = '監察項目時發現嚴重差異';
				}else if(5==cancelreason){
					text = '未按規定處理設備變賣得益';
				}else if(6==cancelreason){
					text = '賬簿及記錄未按規定處理';
				}else if(7==cancelreason){
					text = '未完成并終止項目';
				}else if(8==cancelreason){
					text = '其它';
				}
			}
			return text;
		}
	});
     
    RefreshBasicData();
    kendo.bind($("#detailinfoContent"), detailinfoVM);

    $("#addProjectItem>li").click(function(k,v){
    	var index = $(this).attr('index');
    	if(0==index){
    		openAgreement();
    	}else if(index==1){//創建報告書    	
    		tab('tabId3','tabC3');
    		forwordJSP('/detail/showJSP?forwordJSP=report&num=0&type=add');
    	}else if(index==2){//創建基金通知    	
    		tab('tabId4','tabC4');
    		forwordJSP('/detail/showJSP?forwordJSP=Notice&type=add');;
    	}else if(index==4){//項目中止發放 	
    		tab('tabId6','tabC6');
    		forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=add')
    	}else if(index==3){//延遲開展項目
    		tab('tabId5','tabC5');
    		forwordJSP('/detail/showJSP?forwordJSP=delayWork&num=0&type=add');
    	}else if(index==5){//暫停項目程序
    		tab('tabId7','tabC7');
    		forwordJSP('/detail/showJSP?forwordJSP=pauseWork&num=0&type=add');
    	}else if(index==6){//延遲提交報告
    		tab('tabId8','tabC8');
    		forwordJSP('/detail/showJSP?forwordJSP=delaySubmitReport&num=0&type=add');
    	}else if(index==7){//取消批給程序
    		tab('tabId9','tabC9');
    		forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=add');
    	}else if(index==8){//審計或調查
    		tab('tabId10','tabC10');
    		forwordJSP('/detail/showJSP?forwordJSP=Investigation&num=0&type=add');
    	}
    	else if(index==9){//企業來函
    		tab('tabId11','tabC11');
    		forwordJSP('/detail/showJSP?forwordJSP=CompanyLetter&num=0&type=add');
    	}
    	else if(index==10){//企業申請調撥
    		tab('tabId12','tabC12');
    		forwordJSP('/detail/showJSP?forwordJSP=CompanyApplyChange&num=0&type=add');
    	}
    	
    });
    
   
    
    function openAgreement(){
    	$.ajax({
    		url : contextPath + '/agreement/getApplyType',
    		type : "POST",
    		dataType : "json",
    		async : false,
    		success : function(d) {
    			detailinfoVM.set('basicApplytypes',d.applytypes);
    		},
    		error : function(e) {
    			errorAlert();
    		}
    	});
    	var window = $("#agreementDialog");
    	 if (!window.data("kendoWindow")) {
    	     window.kendoWindow({
    	    	 actions: [
    	             "close"
    	         ],
    	    	 title: '新增協議書',
    	 		 visible: false,
    	 		 resizable: false,
    	 		 width: 550,
    	 		 height: 'auto'
    	     });
    	 }
    	 window.show();
    	 window.data("kendoWindow").center().open();
    	 $.each(detailinfoVM.get('basicApplicationType'),function(k,v){
    		$.each($("input[name^='basicApplycyptCK']"), function(key, value) {
    			var self = $(this);
				if(v.applytype.applytypeid==self.val()){
					self.attr('checked','checked');
					$("#basicNumDiv" + $(self).val()).show();
					return;
				}
			});
    	 });
    }
    
    
    detailinfoVM.GetRightReportData();
    
    /**
     * 左邊菜單排序
     */
    function orderItem(){
    	var orderIdArray = [];
        var idIndex = [];
        var orderid = $(".orderid");
        orderid.each(function(i) {
            var id = parseInt($(this).attr('orderid')); 
            idIndex[id] = i;        //orderid的序号
            orderIdArray.push(id);  //orderid的值
        });
        orderIdArray = orderIdArray.sort(function(a, b){return (a > b) ? 1 : -1}); //从小到大排序
        var list = $("#leftMenuItem").find("li.orderid");
        var _length = orderIdArray.length;
        for (var i=0; i<_length; i++) {
            $("#leftMenuItem").append(list.eq(idIndex[orderIdArray[i]]));
        } 
    }
 });

function RefreshBasicData(){
	// 獲取頁面上需要的數據
 	$.ajax({
 		url : contextPath + '/detail/getParamater?caseid=' + $("#basic_caseid").val(),
 		type : "POST",
 		dataType : "json",
 		async : false,
 		success : function(d) {
 			$.extend(detailinfoVM, d);
			detailinfoVM.set('basicApplication',null);
			detailinfoVM.set('basicApplication',d.basicApplication);
			detailinfoVM.set('basicAgreement',null);
			detailinfoVM.set('basicAgreement',d.basicAgreement);
			detailinfoVM.set('basicReportList',null);
			detailinfoVM.set('basicReportList',d.basicReportList);
			detailinfoVM.set('basicDelayWork',null);
			detailinfoVM.set('basicDelayWork',d.basicDelayWork);
			detailinfoVM.set('basicDelayWorkCount',null);
			detailinfoVM.set('basicDelayWorkCount',d.basicDelayWorkCount);
			detailinfoVM.set('basicStopFinance',null);
			detailinfoVM.set('basicStopFinance',d.basicStopFinance);
			detailinfoVM.set('basicPauseWork',null);
			detailinfoVM.set('basicPauseWork',d.basicPauseWork);
			detailinfoVM.set('basicPauseWorkCount',null);
			detailinfoVM.set('basicPauseWorkCount',d.basicPauseWorkCount);
			detailinfoVM.set('basicCancelContract',null);
			detailinfoVM.set('basicCancelContract',d.basicCancelContract);
			detailinfoVM.set('showAgreementVisiblePage',d.showAgreementVisible);
			detailinfoVM.set('showReportVisiblePage',d.showReportVisible);
			detailinfoVM.set('showFundNotificationVisiblePage',d.showFundNotificationVisible);
			detailinfoVM.set('showDelayWorkVisiblePage',d.showDelayWorkVisible);
			detailinfoVM.set('showStopFinanceVisiblePage',d.showStopFinanceVisible);
			detailinfoVM.set('showPauseWorkVisiblePage',d.showPauseWorkVisible);
			detailinfoVM.set('showDelaySubmitReportVisiblePage',d.showDelaySubmitReportVisible);
			detailinfoVM.set('showCancelContractVisiblePage',d.showCancelContractVisible);
			detailinfoVM.set('showInvestigationVisiblePage',d.showInvestigationVisible);
			detailinfoVM.set('showCompanyLetterFormPage',d.showCompanyLetterVisible);
			detailinfoVM.set('showCompanyApplyChangePage',d.showCompanyApplyChangeVisible);
 			detailinfoVM.initData();
 			detailinfoVM.initItem();
 		},
 		error : function(e) {
 			errorAlert();
 		}
 	});
}

function showChildText(self){
	if($(self).attr('checked')=='checked'){
		$("#basicNumDiv" + $(self).val()).show();
	}else{
		$("#basicNumDiv" + $(self).val()).hide();
	}
}

function forwordJSP(url){
	url = contextPath+url;
	$.ajax({
	  url: url,
	  type: "GET",
	  success: function(d){
		  $("#jspContent").html(d);
	  },
	  error:function(e){
		  alert('error');
	  }
	});
}

forwordJSP('/detail/showJSP?forwordJSP=ApplicationForm&caseid=C3C0B0A5-B79B-4E32-8EED-7F9EE288B404');

function tab(tabId, tabC){
    var len =document.getElementById('getId').getElementsByTagName('li').length;
    for(i=1; i <= len; i++){
    	if(i<=12){
    		 if ("tabId"+i==tabId){
    	            document.getElementById(tabId).className="current";
    	        }else{
    	            document.getElementById("tabId"+i).className="";
    	        }
    		
    	}
       
    }
}

//右邊的點擊事件
function showRigthReport(no){
	var num=detailinfoVM.rightReportNum;	
	for(var i=1;i<=num;i++){
		if(i!=no){
			$("#pan"+i).hide();
		}	
	}
	
	if($("#pan"+no).is(":hidden")){
		$("#pan"+no).show();
	}else{
		$("#pan"+no).hide();
	}

}


function getReportRightapproveState(type){	 
	if(type==0){
		return "";
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
