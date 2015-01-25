<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../index.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>卷宗管理</title>
<!--kendo ui-->
<script src="<%=resourcesPath %>/js/caseManage/caseManage.js" type="text/javascript"></script>
</head>

</head>
<body id="casesearchbody">
	<div class="Basic">
    	<!--header-->

          <div id="conter">
	  	    <div class=" title2 title-style">
            	<div class="floatleft m-left1"><img src="<%=resourcesPath%>/img/title5.png"></div>
            	<div class="floatleft title-padding">卷宗管理</div>
            </div>
            <div class="conbg">
              <div class="casetitle">
                  <div class="floatleft">搜尋選項</div>
                  <img src="<%=resourcesPath%>/img/tag3.png" class="floatright m-top1">
                  <div class="floatright divcss2"></div>
              </div>
            <table class=" contbwidth contb" width="100%" cellpadding="0" cellspacing="0" name="paramTable" >
              <tr>
                <td width="18%" align="right">卷宗編號：</td>
                <td width="23%" align="left"><input class="k-input"  type="text" data-bind="value:caseManage.caseCode"></td>
               <td align="right">資助期：</td>
                <td align="left"><input class="k-input"  type="text" data-bind="value:caseManage.supportNumMin">
     至
   				<input class="k-input"  type="text" data-bind="value:caseManage.supportNumMax">個月</td>
              </tr>
              <tr>
                <td align="right">申請編號：</td>
                <td align="left"><input class="k-input"  type="text" data-bind="value:caseManage.applicationCode"></td>
                <td align="right">資助項目批示日期：</td>
                <td align="left"><input  data-role="datepicker" data-format="yyyy-MM-dd"  data-bind="value:caseManage.supportApproveDateFrom">
                  至
                  <input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:caseManage.supportApproveDateTo"></td>
              </tr>
              <tr>
              	<td align="right">場所登記編號：</td>
                <td align="left"><input class="k-input"  type="text" data-bind="value:caseManage.venueCode" ></td>
                <td align="right">撥款日期：</td>
                <td align="left"><input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:caseManage.financeDateFrom">
至
 				<input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:caseManage.financeDateTo"></td>
              </tr>
              <tr>
                <td align="right">協議書編號：</td>
                <td align="left"><input class="k-input"  type="text" data-bind="value:caseManage.agreementCode" ></td>
                <td align="right">協議書簽訂日期：</td>
                <td align="left"><input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:caseManage.aggreementSignDateFrom">
                  至
                <input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:caseManage.aggreementSignDateTo"></td>
              </tr>
              <tr>
               <td align="right">批准資助方式：</td>
                <!-- <td colspan="3"align="left">項目補貼<input type="checkbox" class="k-checkbox" id="supportType1" name="ckType" data-bind="click:checkSupportType">&nbsp;銀行貸款貼息<input type="checkbox" class="k-checkbox" id="supportType2" name="ckType" data-bind="click:checkSupportType" >&nbsp;免息貸款<input type="checkbox" class="k-checkbox" id="supportType3" name="ckType" data-bind="click:checkSupportType" >&nbsp;個人<input type="checkbox" class="k-checkbox" id="supportType4" name="ckType" data-bind="click:checkSupportType" ></td> -->
                    <td align="left" colspan="3">
					      <table  data-template="applytypeEdit" data-bind="source: agreementApplytypes"></table>
                    </td>
                </tr>
                <tr>
                <td align="right">項目名稱：</td>
                <td colspan="3" align="left"><input class="k-input"  type="text" style="width:720px;" data-bind="value:caseManage.projectName" ></td>
              </tr>
              <tr>
                <td align="right">企業名稱：</td>
                <td colspan="3" align="left"><input class="k-input"  type="text" style="width:720px;" data-bind="value:caseManage.companyName" ></td>
              </tr>
              <tr>
                <td align="right">報告總期數：</td>
                <td align="left">
                <select data-role='dropdownlist' style="width:63px;"  data-text-field="text" data-value-field="id" data-bind="source: reportNumSource, value: reportNumSelect,events:{change:reportNumMarkChange}" ></select>
                <input class="k-input" style="width: 83px;" type="text" data-bind="value:caseManage.reportNum" ></td>
				<td align="right">納稅人編號：</td>
                <td align="left"><input class="k-input"  type="text" data-bind="value:caseManage.taxCode"></td>
              </tr>
              <tr>
              <td align="right">本期報告批示決定：</td>
                <td align="left"><select data-role="dropdownlist" data-value-field="id" data-text-field="text"  style="width: 150px;"data-bind="source: reportApproveStatusTypeSource,value: reportApproveStatusTypeSelect,events:{change:reportApproveStatusTypeChange}"></select>
                 </td> 
               
                 <td align="right">卷宗跟進人員：</td>
                <td align="left"><select data-role="dropdownlist" data-value-field="userid" data-text-field="loginname"  style="width: 150px;"data-bind="source: userListSource,value: userListSelect,events:{change:userListChange}"></select>          				
              </tr>
        		<tr>
        		 <td align="right">內部通知編號：</td>
                <td align="left"><input class="k-input" style="width: 150px;" type="text" data-bind="value:caseManage.notificationCode" ></td>
            	<td align="right">提交報告期限：</td>
                <td align="left"><input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:caseManage.submitduedateFrom">
                  至
                <input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:caseManage.submitduedateTo"></td>
        		</tr>
                 <tr>
              	<td colspan="4" align="center">
              	<br>
               <img src="<%=resourcesPath%>/img/search.png" data-bind="events:{click:search}" style="cursor:pointer">
               <img src="<%=resourcesPath%>/img/Reset.png" data-bind="events:{click:clear}" style="cursor:pointer">
               <img src="<%=resourcesPath%>/img/Export.png" onclick="exportData()" style="cursor:pointer">
              </tr>
            </table>
             <div class="casetitle">
               <div class="floatleft">搜尋結果</div>
                  <img src="<%=resourcesPath%>/img/tag3.png" class="floatright m-top1">
                  <div class="floatright divcss2"></div>
             </div> 
             <br>
             <table width="100%" class=" contbwidth contb1 cursorp" cellpadding="0" cellspacing="0">
               <tr>
               <div id="showCase"  style="border: 1" data-role="grid" data-batch="true" data-pageable="<%=defaultPageable %>"
	 data-scrollable="false" data-sortable="true" data-selectable="row"
     data-columns='[{"title":"卷宗編號","width":"117","field":"casecode"},{"title":"項目名稱","width":"64","field":"projectname"},{"title":"企業名稱","width":"64","field":"compnaycname"}, {"title":"批准資助方式","width":"64"},{"title":"資助總金額","width":"61"},{"title":"已發放金額","width":"178","field":""},{"title":"報告總期數","width":"165","field":"reportnum"},{"title":"發放總期數","width":"206","field":"financenum"},{"title":"資助期","width":"65","field":""},{"title":"項目資助期間","width":"300","field":"supportdatefrom"}]'
     data-bind="source: gridSource"
     data-row-template="rowTemplate"}]'>
              </div> 
              </tr>
            </table>

             <div class="clearboth"></div>
          </div>     
        </div>
        <!--footer-->
        <div id="footer"></div>
    </div>	
</body>
</html>
<script type="text/javascript" language="javascript">
function url(){
	window.location.href='Detailpage.html';
}
</script>
<script type="text/x-kendo-template" id="rowTemplate">

	<tr >
        <td align="left">
		   <div><span data-bind="text:caseCode" onclick=javascript:doCondition("#=caseid#")  style="cursor:pointer"></span></div>
		</td>
	<td align="left" title="#=projectnameTmpdetail#">
		   <div><span data-bind="text:projectnameTmp"></span></div>
		</td>
		
		<td align="left" title="#=compnaycnameTmpdetail#">
		   <div><span data-bind="text:compnaycnameTmp"></span></div>
		</td>
		
        <td align="left" title="#=applytypecnamedetail#" >
		   <div><span data-bind="text:applytypecname"></span></div>
			</td>

		 <td align="left" title="#=supportamountdetail#" >
		   <div><span data-bind="text:supportamount"></span></div>
		</td>
		 <td align="left" >
		   <div><span data-bind="text:financeamountsum"></span></div>
		</td>
		 <td align="left">
		   <div><span data-bind="text:reportnumTmp"></span></div>
		</td>
		</td>
		 <td align="left">
		 	<div><span data-bind="text:financenumTmp"></span></div>	
		</td>
		</td>
		 <td align="left"  title="#=supportnumdetail#">
		   <div><span data-bind="text:supportnum"></span></div>
		</td>
		 <td align="left">
		  <div>#:getFormatDateByLong(supportdatefrom)#至#:getFormatDateByLong(supportdateto)#</div>
		</td>
		<td align="left">
		   <div></div>
		</td>
   </tr>
</script> 
<script id="applytypeEdit" type="text/x-kendo-template">
		<input type="checkbox" class="k-checkbox"  id="supportType#:applytypeid#" value="#:applytypeid#" name="supportType"  />#:cname#
</script>