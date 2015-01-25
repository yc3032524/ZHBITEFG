var homeVM="";


$(document).ready(function() {
	
	
	homeVM=kendo.observable({	
		btnCss:function(e){
			if(e==2){
				$("#titleContent").html("報告內容");								
			}else if(e==3){
				$("#titleContent").html("基金通知");
			}else if(e==4){
				$("#titleContent").html("取消批給");
			}else if(e==5){
				$("#titleContent").html("中止發放");
			}else if(e==6){
				$("#titleContent").html("暫停項目");
			}else if(e==7){
				$("#titleContent").html("延遲提交報告");
			}else if(e==8){
				$("#titleContent").html("延遲開展項目");
			}else if(e==9){
				$("#titleContent").html("審計或調查");
			}else if(e==10){
				$("#titleContent").html("企業來函");
			}else if(e==11){
				$("#titleContent").html("申請調撥");
			}else if(e==12){
				$("#titleContent").html("核對過程");
			}		
			
			if(e!=1){
				if(e==2){ //右邊下拉框的背景色
					$("#reportTrCss").removeClass().addClass('title1 title-style');
				}else{
					$("#reportTrCss").removeClass().addClass('iconTitle'+e+' title-style');
				}				
			}			
			
			homeVM.set("selectedItem",e-1);
			
		},
		btnClick:function(e){	
			var remindertype=e-1;
			
			//獲取頁面上需要的數據
			$.ajax({
			    url: contextPath+'/home/getHomeData?remindertype='+remindertype+'&selectType=0',
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    success: function(d) {	
			    	$.extend(homeVM, d);	
			    	homeVM.SetData(e);
			    	
			    	//除了第一個 其他一樣 右邊的下拉選項
		        	if(e!=1){
		        		homeVM.set("dropdownSource",d.reportDropdownList)
		        	}else{
		        	   	homeVM.set("applytypeSource",d.applytypes);
		        	}
			    	
			    },
			    error:function(a,b,c){
			    	alert(a+"/"+b+"/"+c);		    	
			    }
			});
			
		},	
		selectedItem:0,//當前的選中項
		applytypeSource:null,//第一個下拉列表
		applytypeValue:0,	
		dropdownSource:"",//第二個下拉列表
		changeApplyType:function(e){			
			var applytypeValue=$("#applytypeid").val();		
			$.ajax({
			    url: contextPath+"/home/getHomeData?remindertype="+homeVM.selectedItem+"&selectType="+applytypeValue,
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    success: function(d) {	
			    	$.extend(homeVM, d);	
			    	showNewAddView(homeVM.homeData.newaddcasedata);
			    },
			    error:function(a,b,c){
			    	alert(a+"/"+b+"/"+c);		    	
			    }
			});
			
		},
		changeReport:function(e){
			var reportDownid=$("#reportDownid").val();
			
			$.ajax({
			    url: contextPath+"/home/getHomeData?remindertype="+homeVM.selectedItem+"&selectType="+reportDownid,
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    success: function(d) {	
			    	$.extend(homeVM, d);	
			    	homeVM.SetData(homeVM.selectedItem+1);
			    },
			    error:function(a,b,c){
			    	alert(a+"/"+b+"/"+c);		    	
			    }
			});
			
		},
		SetData:function(e){	
			if(e==1){		 
	    	   	showNewAddView(homeVM.homeData.newaddcasedata);				    	
	    	}else if(e==2){				
	    		showReportContentView(homeVM.homeData.reportdata);				    		
	    	}else if(e==3){
    		    showReportContentView(homeVM.homeData.fundnotificationdata);
	    	}else if(e==4){				    		
    		    showReportContentView(homeVM.homeData.cancelcontractdata);
	    	}else if(e==5){				    		
    		    showReportContentView(homeVM.homeData.stopfinancedata);
	    	}else if(e==6){				    		
    		    showReportContentView(homeVM.homeData.pauseworkdata);
	    	}else if(e==7){				    		
    		    showReportContentView(homeVM.homeData.delaysubmitdata);
	    	}else if(e==8){				    		
    		    showReportContentView(homeVM.homeData.delayworkdata);
	    	}else if(e==9){				    		
    		    showReportContentView(homeVM.homeData.investigationdata);
	    	}else if(e==10){				    		
    		    showReportContentView(homeVM.homeData.companyletterdata);
	    	}else if(e==11){				    		
    		    showReportContentView(homeVM.homeData.companyapplychangedata);
	    	}else if(e==12){	
	    		showReportContentView(homeVM.homeData.checkdata);
	    	}
		},
		getInstructionsSumData:new kendo.data.DataSource({//統計（批示決定後未作出內部通知）
	    	transport: {
	            read: {
	            	url:contextPath+'/home/getInstructionsSumData',
	            	dataType: 'json',
	            	type : "POST" ,
					contentType : "application/json; charset=utf-8"
	        	}
	        	
	    	}
	    })
		
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//獲取頁面上需要的數據
	$.ajax({
	    url: contextPath+'/home/getHomeData?remindertype=0&selectType=0',
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {	
			$.extend(homeVM, d);	 	
	    	homeVM.set("applytypeSource",d.applytypes);
	    	
	    },
	    error:function(a,b,c){
	    	alert(a+"/"+b+"/"+c);		    	
	    }
	});
	

	kendo.bind($("#homeContent"), homeVM);
	
	
   function showNewAddView(data){
		$("#NewAddCaseDiv").kendoListView({
			dataSource : data,
			template : kendo.template($("#tempNewAddCase").html())
		});
   }
   
   function showReportContentView(data){
		$("#reportContentDiv").kendoListView({
			dataSource : data,
			template : kendo.template($("#tempReportContent").html())
		});
  }
  
   
   showNewAddView(homeVM.homeData.newaddcasedata);
   HideDiv();
   
	// 統計（批示決定後未作出內部通知）
	$("#instructionsTable").kendoListView({
		dataSource : homeVM.getInstructionsSumData,
		dataBound : onCaseStatusDataBound,
		template : kendo.template($("#templateInstructions").html())
	});

	// 統計（批示決定後未作出內部通知）
	function onCaseStatusDataBound(e) {
		var le = e.sender.dataSource._total;// 個數長度
		for ( var i = 0; i < le; i++) {
			var n = e.sender.dataSource._view[i].id;
			var percentage = e.sender.dataSource._view[i].percentage;
			caseStatus(n, percentage);
		}
	}
	
   
	

	function caseStatus(n, percentage) {
		$("#caseStatus" + n).animate(
		{
			width : percentage/2 + 'px',
			text:percentage
		},
		{
			duration : 1500,
			step : function(now, fx) {
				if (now < 0) {
					now = 0;
				}
				if (percentage != 0) {
					$('#caseStatusCount' + n).text(
							number_format(now, 2));
				} else {
					$('#caseStatusCount' + n).text(0);
				}
			}
		});
	}
	
	function number_format(number, decimals, dec_point,
			thousands_sep) {
		// Strip all characters but numerical ones.
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0
				: Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ','
				: thousands_sep, dec = (typeof dec_point === 'undefined') ? '.'
				: dec_point, s = '', toFixedFix = function(n,
				prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
		// Fix for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
				.split('.');
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1).join('0');
		}

		return s.join(dec);
	}
   
   
	
});

//應該div
function HideDiv(){
	 var Identification="";

	   if(homeVM.home.newaddcaseTypeIds==""){		  
			$("#ic1").hide();		
			$("#Adddossier").hide();
	   }else{
		   Identification=0+",";
	   }
	   if(homeVM.home.reportTypeIds==""){
			$("#ic2").hide();
	   }else{
		   Identification+=1+",";
	   }
	   if(homeVM.home.fundnotificationTypeIds==""){
			$("#ic3").hide();
	   }else{
		   Identification+=2+",";
	   }
	   if(homeVM.home.cancelcontractTypeIds==""){
			$("#ic4").hide();
	   }else{
			Identification+=3+",";
	   }
	   if(homeVM.home.stopfinanceTypeIds==""){
			$("#ic5").hide();			
	   }else{
		   Identification+=4+",";
	   }
	   if(homeVM.home.pauseworkTypeIds==""){
			$("#ic6").hide();
	   }else{
		   Identification+=5+",";
	   }
	   
	   if(homeVM.home.delaysubmitTypeIds==""){
			$("#ic7").hide();
	   }else{
		   Identification+=6+",";
	   }
	   if(homeVM.home.delayworkTypeIds==""){
			$("#ic8").hide();
	   }else{
		   Identification+=7+",";
	   }
	   if(homeVM.home.investigationTypeIdsn==""){
			$("#ic9").hide();
	   }else{
		   Identification+=8+",";
	   }
	   if(homeVM.home.companyletterTypeIds==""){
			$("#ic10").hide();
	   }else{
		   Identification+=9+",";
	   }
	   if(homeVM.home.companyapplyTypeIds==""){
			$("#ic11").hide();
	   }else{
		   Identification+=10+"";
	   }
	   
	   if(homeVM.home.checktypeIds==""){
			$("#ic12").hide();
	   }else{
		   Identification+=11+"";
	   }
	   
	   
	   if(Identification==""){//所有權限都沒有
		   //全部隱藏
		   $("#DIVCOntent").hide();
		   $("#floatrightDiv").hide();
	   }else{
		   $("#ReportInfoTb").show();
		   var start=Identification.split(",");
		   //$("#reportTrCss").removeClass().addClass('iconTitle'+start[0]+' title-style');
		   var index=parseInt(start[0])+1;
		   homeVM.btnCss(index);
		   homeVM.btnClick(index);		   
		   changeCss(index);
	   }
	   
}

function changeCss(type){
	
	if(type==1){
		$('#Adddossier').show(); //第一個顯示
		$('#ReportInfoTb').hide(); //第二隱藏
				
	}else{
		$('#Adddossier').hide(); //第一個隱藏
		$('#ReportInfoTb').show(); //第二顯示			
	}	
	for(var i=1;i<=12;i++){
		if(i==type){            //按鈕
			$("#iconType"+i).removeClass("iconTypeimg"+i).addClass('iconTypeimg'+i+'-1');  //第一個換一種css
		}else{
			$("#iconType"+i).removeClass("iconTypeimg"+i+"-1").addClass('iconTypeimg'+i);
		}			
	}
	
	homeVM.btnCss(type);
	homeVM.btnClick(type);
}

function doCondition(caseId){
	location.href=contextPath+"/detail/info?caseid="+caseId;

}
