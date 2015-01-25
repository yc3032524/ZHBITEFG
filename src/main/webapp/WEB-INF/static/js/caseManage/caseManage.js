var casesearchVM = "";
var param="";
jQuery(document).ready(function($) {
		casesearchVM = kendo.observable({
		caseManage : null,
		applytypeText:null,
		reportApproveStatusTypeSelect:null,
		reportNumSelect:null,
		userListSource:[],
		userListSelect:null,
		reportApproveStatusTypeSource:[{
			text : '全部',
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
		
		reportNumSource:[{
			text : '全部',
			id : '0'
		},{
			text : '≠',
			id : '1'
		},{
			text : '≤',
			id : '2'
		},{
			text : '≥',
			id : '3'
		},{
			text : '<',
			id : '4'
		},{
			text : '>',
			id : '5'
		},{
			text : '=',
			id : '6'
		}], 
		
		reportApproveStatusTypeChange:function(e) {
	
			this.caseManage.reportApproveStatusType = this.reportApproveStatusTypeSelect.id;
		},
		
		reportNumMarkChange:function(e) {
			this.caseManage.reportNumMark = this.reportNumSelect.id;
		},
		
		userListChange:function(e){
			this.caseManage.userListid = this.userListSelect.userid;
		},

		
		search : function() {
			var str="";
			//獲取所有選中的存放到數組	checked 批准資助方式
			$.each($("input[name='supportType']"), function(key, value) {
				if($(this).attr('checked')=='checked'){	
		      	var numValue=$(this).val();
		      	//alert(numValue);
		      	str+=numValue+",";
				}
			});
			if(str.length>0){
			str=str.substring(0, str.length-1);
		 	this.caseManage.supportTypes = str;
			}
	      	str = "";
	      	
	      	//alert(JSON.stringify(this.caseManage.userListid));
			this.gridSource.read({
				page : 1
			});

		},
		
		// 查詢結果數據集合
		gridSource : new kendo.data.DataSource({
			transport : {
				read : {
					url : contextPath + '/CaseManage_V/getv_CaseSeachInfo',
					dataType : 'json',
					type : "POST",
					data : function() {
					    //this.caseManage.offenddate=Todate(this.caseManage.offenddate);
						param = casesearchVM.caseManage;
						
  				        //alert(JSON.stringify(casesearchVM.offsupportTypeSelect));

						return param;
					}
				}
			},
			pageSize : 20,
			serverPaging : true,
			serverSorting : true,
			serverFiltering : true,
			schema : {
				data : function(d) {
					return d.data;
				},
				total : function(d) {
					return d.totalCount;
				}
			}
		}),		
		
		clear:function(){
			isSelect = false;
			$("table[name='paramTable'] input:text").each(function () {
				$(this).val("");
			});
			
			$.each($("input[name='supportType']"), function(key, value) {
				
				$(this).attr('checked',false);
			});
			
			this.set("userListeSelect", this.userListSource[0]);
			this.set("reportApproveStatusTypeSelect", this.reportApproveStatusTypeSource[0]);
			this.set("reportNumSelect", this.reportNumSource[0]);
			this.set("userListSelect", this.userListSource[0]);
			this.caseManage.reportApproveStatusType='0';
			this.caseManage.caseCode='';
			this.caseManage.applicationCode='';
			this.caseManage.agreementCode='';
			this.caseManage.projectName='';
			this.caseManage.companyName='';
			this.caseManage.reportNum='';
			this.caseManage.reportNumMark=0;
			this.caseManage.taxCode='';
			this.caseManage.venueCode='';
			this.caseManage.supportApproveDateFrom='';
			this.caseManage.supportApproveDateTo='';
			this.caseManage.aggreementSignDateFrom='';
			this.caseManage.aggreementSignDateTo='';
			this.caseManage.supportNumMax='';
			this.caseManage.supportNumMin='';
			this.caseManage.notificationCode='';
			this.caseManage.supportTypes='';
			this.caseManage.financeDateFrom='';
			this.caseManage.financeDateTo='';
			this.caseManage.reportNumMark='';
			this.caseManage.submitduedateFrom='';
			this.caseManage.submitduedateTo='';
			this.caseManage.userListid='';
		},

	});

	// 獲取頁面上需要的數據
	$.ajax({
		url : contextPath + '/CaseManage_V/getParamater',
		type : "POST",
		dataType : "json",
		async : false,
		success : function(d) {
			$.extend(casesearchVM, d);
			casesearchVM.set("reportApproveStatusTypeSelect",casesearchVM.reportApproveStatusTypeSource[0]);
			casesearchVM.set("reportNumSelect",casesearchVM.reportNumSource[0]);
			
			casesearchVM.set("userListSource",d.userList);
			casesearchVM.set("userListSelect",d.userList[0]);

			/*casesearchVM.set("userListSource",d.userLists);
			casesearchVM.set("userListSelect",d.userLists[0]);*/

		},
		
		error : function(e) {
			errorAlert();
		}
	});
	 kendo.bind($("#casesearchbody"), casesearchVM);	 
	 
	 
});

function doCondition(caseId){
	location.href=contextPath+"/detail/info?caseid="+caseId;

}

//導出结果
function exportData(){
		alert();
	
	  /*var  url= contextPath + "/CommonPlaceRulesfine/exportData?startTime="+startTime+"&endTime="+endTime;	 
	  window.location.href=url;*/
	   
}

