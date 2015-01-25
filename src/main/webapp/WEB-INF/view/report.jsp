<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>詳細資料</title>
<%-- <script type="text/javascript" src="<%=resourcesPath %>/js/jquery-1.8.2.min.js"></script> --%>
<script type="text/javascript" src="<%=resourcesPath%>/js/report.js"></script>

</head>

<body>
	<div id="reportContent">
		<input type="hidden" value="${type}" id="type"> <input
			type="hidden" value="${num}" id="num">
		<div id="ReportLast" class="lineh">
			<select data-role='dropdownlist' data-text-field="name"
				data-value-field="id"
				data-bind="source:changeNos,value: currentReportNo,events:{change:getReportData2}"
				class="floatleft">
			</select>
			<div class="floatright curs">
				<sec:authorize access="hasRole('ROLE_SGFPF.reprort.internalNotification')">
				<img src="<%=resourcesPath%>/img/Modify1.png" data-bind="click:editReport"  title="編輯內部通知">
				</sec:authorize>
			<sec:authorize access="hasRole('ROLE_SGFPF.reprort.reportContent')">
				<img  src="<%=resourcesPath%>/img/Modify.png" data-bind="click:editReport"  title="編輯"> 
				</sec:authorize>
				<img src="<%=resourcesPath%>/img/Delete.png" data-bind="click:DeleteReport" title="刪除"> 
				<img src="<%=resourcesPath%>/img/Upload.png" title="上傳">
			</div>
			   <!-- 文件上傳 -->
		     <div class="filediv">
			 <div class="fileinput">
			 <input name="files" id="uploadReportFile" type="file" style="opacity: 0;width: 30px;height: 30px;"/>
		     </div>
		     </div>
		     <!--  -->
			<div class="clearboth"></div>
		<sec:authorize access="hasRole('ROLE_SGFPF.reprort.reportContent')">
			<div class="fontcolor fontweight floatleft">企業報告資料</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>

			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td class="fontcolor" width="27%" align="right">提交報告期限：</td>
					<td width="21%" align="left"><span
						data-bind="text:report.submitdueDate" /></td>
					<td width="31%" align="right" class="fontcolor">准許延遲提交報告期限：</td>
					<td width="21%" align="left"><span
						data-bind="text:report.delaysubmitdate" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">已提交報告日期：</td>
					<td align="left"><span data-bind="text:report.submitdate" /></td>
					<td class="fontcolor" align="right"></td>
					<td align="left"></td>
				</tr>
				<tr id="lastReportShow4" style="display: none">
					<td class="fontcolor" align="right">總結報告附件：</td>
					<td align="left" colspan="3"><span
						data-bind="text:attachTypeName" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><span
						data-bind="text:report.remark" /></td>
				</tr>
			</table>

			<div id="lastReportShow1" style="display: none">
				<!-- 最後一期的內容 -->
				<div class="fontcolor fontweight floatleft">結 算</div>
				<div class="divcss6 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td class="fontcolor" width="27%" align="right">項目實際總支出：</td>
						<td width="21%" align="left"><span
							data-bind="text:report.actualspend" /></td>
						<td width="31%" class="fontcolor" align="right">累計已發放資助金額：</td>
						<td width="21%" align="left"><span
							data-bind="text:report.accumulativepayment" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">差額撥付（返還）：</td>
						<td align="left" colspan="3">
						<span data-bind="text:report.returnpayment" /><span id="lblbo" style="display: none">(撥付)</span><span id="lblreturn" style="display: none">(返還)</span>
						</td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><span
							data-bind="text:report.clearingremark" /></td>
					</tr>
				</table>
			</div>

			<div class="fontcolor fontweight floatleft">分析報告</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			
			<div data-template="show-template"
				data-bind="source: products"></div>

			<div id="lastReportShow6" style="display: none">
				<div class="fontcolor fontweight floatleft">通知企業</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="27%" class="fontcolor" align="right">通知函編號：</td>
						<td width="21%" align="left"><span
							data-bind="text:report.tocompanycode" /></td>
						<td width="31%" class="fontcolor" align="right">企業獲通知日期：</td>
						<td width="21%" align="left"><span
							data-bind="text:report.companyreceivedate" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><span
							data-bind="text:report.tocompanyremark" /></td>
					</tr>
				</table>
			</div>
</sec:authorize>
	<sec:authorize access="hasRole('ROLE_SGFPF.reprort.internalNotification')">
			<div id="fristReportShow8">
			<div class="fontcolor fontweight floatleft">
				內部通知<span id="lastReportShow2" style="display: none">(撥款)</span>
			</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="27%" class="fontcolor" align="right">撥款通知編號：</td>
					<td width="21%" align="left"><span
						data-bind="text:report.financenotificationcode" /></td>
					<td width="31%" class="fontcolor" align="right">應撥款通知日期：</td>
					<td width="21%" align="left"><span
						data-bind="text:report.financenotificationdate" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">本次已撥款金額：</td>
					<td align="left"><span data-bind="text:report.financeamount" /></td>
					<td class="fontcolor" align="right">本次撥款日期：</td>
					<td align="left"><span data-bind="text:report.financedate" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><span
						data-bind="text:report.notificationremark" /></td>
				</tr>
			</table>
			</div>
			<div id="lastReportShow3" style="display: none">
				<!-- 最後一期的內容 -->
				<div class="fontcolor fontweight floatleft">內部通知(返還)</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0" >
					<tr>
						<td width="27%" class="fontcolor" align="right">差額返還通知編號：</td>
						<td width="21%" align="left"><span
							data-bind="text:report.returnnotificationcode" /></td>
						<td width="31%" class="fontcolor" align="right">差額返還通知日期：</td>
						<td width="21%" align="left"><span
							data-bind="text:report.returnnotificationdate" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業須返還差額期限：</td>
						<td align="left" colspan="3"><span
							data-bind="text:report.companyreturnduedate" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業以返還差額：</td>
						<td align="left"><span
							data-bind="text:report.companyreturnamount" /></td>
						<td class="fontcolor" align="right">企業已返還日期：</td>
						<td align="left"><span
							data-bind="text:report.companyreturndate" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right"></td>
						<td align="left"></td>
						<td class="fontcolor" align="right">通知強制徵收日期：</td>
						<td align="left"><span
							data-bind="text:report.compulsorynotificationdate" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><span
							data-bind="text:report.returnnotificationremark" /></td>
					</tr>
				</table>
			</div>
			</sec:authorize>
	
			<div id="fileDiv">
				<div class="fontcolor fontweight floatleft">附 件</div>
				<div class="divcss6 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<div class="margin3" id="selectFile">
				        <input type="button" class="buttoncs" id="selectAll" value="全選"  />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delreportFile()"/><br>
               	<span data-template="reportFileTemplate" data-bind="source: fileSource_report"></span>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>


		<!-- 編輯部分 -->
		<div id="Report-edit1" class="lineh" style="display: none;">
			<div  id="editdiv" class="floatleft">編輯報告內容</div>
			<div class="floatright curs">
				<img class="save-Report1" data-bind="click:saveReport" 	src="<%=resourcesPath%>/img/save.png">
				 <img class="save-Report1" data-bind="click:cancelReport"  src="<%=resourcesPath%>/img/Cancel.png">
			</div>
			<div class="clearboth"></div>
		<sec:authorize access="hasRole('ROLE_SGFPF.reprort.reportContent')">
			<div class="fontcolor fontweight floatleft">企業報告資料</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>

			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="25%" class="fontcolor" align="right">提交總結報告期限：</td>
					<td width="25%" align="left"><input data-role="datepicker"
						data-format="yyyy-MM-dd" style="width: 130px;"
						data-bind="value:report.submitdueDate" /></td>
					<td width="25%" align="right" class="fontcolor">准許延遲提交報告期限：</td>
					<td width="25%" align="left"><input data-role="datepicker"
						data-format="yyyy-MM-dd" style="width: 130px;"
						data-bind="value:report.delaysubmitdate" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">已提交報告日期：</td>
					<td align="left" colspan="3"><input data-role="datepicker"
						data-format="yyyy-MM-dd" style="width: 130px;"
						data-bind="value:report.submitdate" /></td>
				</tr>
				<tr style="display: none" id="lastReportEdit4">
					<!-- 最後一期的內容 -->
					<td class="fontcolor" align="right">總結報告附件：</td>
					<td align="left" colspan="3"><select data-role='dropdownlist'
						style="width: 130px;" data-text-field="text" data-value-field="id"
						data-bind="source: attachType, value: report.summaryAttachType"></select>
					</td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><textarea class="k-textbox"
							data-bind="value:report.remark" style="width: 455px;"></textarea></td>
				</tr>
			</table>

			<div id="lastReportEdit1" style="display: none">
				<!-- 最後一期的內容 -->
				<div class="fontcolor fontweight floatleft">結 算</div>
				<div class="divcss6 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="25%" class="fontcolor" align="right">項目實際總支出：</td>
						<td width="25%" align="left"><input type="text"
							class="k-input" data-bind="value:report.actualspend" onblur="getReturnPayment()"
							style="width: 130px;" /></td>
						<td width="25%" class="fontcolor" align="right">累計已發放資助金額：</td>
						<td width="25%" align="left"><input type="text"
							class="k-input" id="accumulativepayment" data-bind="value:report.accumulativepayment"
							style="width: 130px;" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">差額撥付（返還）：</td>
						<td align="left" colspan="3"><input type="text"
							class="k-input" id="returnpayment" data-bind="value:report.returnpayment"
							style="width: 130px;"  /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><textarea class="k-textbox"
								data-bind="value:report.clearingremark" style="width: 455px;"></textarea></td>
					</tr>
				</table>
			</div>



			<div class="fontcolor fontweight floatleft">分析報告</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			

			<div class="margin3">
				<input type="button" class="buttoncs" style="width: 100px;"	data-bind="click:addSuggenstion" value="添加建議書" id="addreport1" />
			    <input type="button" class="buttoncs" value="刪除" data-bind="click:deleteSuggenstion" id="delreport1" /><br>
			</div>
			<div data-template="row-template" data-bind="source: products">

			</div>
		

			<div id="lastReportEdit6" style="display: none">
				<div class="fontcolor fontweight floatleft">通知企業</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="25%" class="fontcolor" align="right">通知函編號：</td>
						<td width="25%" align="left"><input type="text"
							class="k-input" data-bind="value:report.tocompanycode"
							style="width: 130px;" /></td>
						<td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
						<td width="25%" align="left"><input data-role="datepicker"
							data-format="yyyy-MM-dd"
							data-bind="value:report.companyreceivedate" style="width: 130px;" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><textarea class="k-textbox"
								data-bind="value:report.tocompanyremark" style="width: 455px;"></textarea></td>
					</tr>
				</table>
			</div>
			</sec:authorize>
			<sec:authorize access="hasRole('ROLE_SGFPF.reprort.internalNotification')">
			
			<div id="fristReportEdit8">
			<div class="fontcolor fontweight floatleft">
				內部通知<span id="lastReportEdit2" style="display: none">(撥款)</span>
			</div>
			<!-- 最後一期的內容 -->
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="25%" class="fontcolor" align="right">撥款通知編號：</td>
					<td width="25%" align="left"><input type="text"
						class="k-input" data-bind="value:report.financenotificationcode"
						style="width: 130px;" /></td>
					<td width="25%" class="fontcolor" align="right">應撥款通知日期：</td>
					<td width="25%" align="left"><input data-role="datepicker"
						data-format="yyyy-MM-dd"
						data-bind="value:report.financenotificationdate"
						style="width: 130px;" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">本次已撥款金額：</td>
					<td align="left"><input type="text" id="financeamounttxt" class="k-input"
						data-bind="value:report.financeamount" style="width: 130px;" onblur="getReturnPayment()" /></td>
					<td class="fontcolor" align="right">本次撥款日期：</td>
					<td align="left"><input data-role="datepicker"
						data-format="yyyy-MM-dd" data-bind="value:report.financedate"
						style="width: 130px;" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><textarea
							data-bind="value:report.notificationremark" class="k-textbox"
							style="width: 455px;"></textarea></td>
				</tr>
			</table>
			</div>
			<div id="lastReportEdit3" style="display: none">
				<!-- 最後一期的內容 -->
				<div class="fontcolor fontweight floatleft">內部通知(返還)</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="25%" class="fontcolor" align="right">差額返還通知編號：</td>
						<td width="25%" align="left"><input type="text"
							class="k-input" data-bind="value:report.returnnotificationcode"
							style="width: 130px;" /></td>
						<td width="25%" class="fontcolor" align="right">差額返還通知日期：</td>
						<td width="25%" align="left"><input data-role="datepicker"
							data-format="yyyy-MM-dd"
							data-bind="value:report.returnnotificationdate"
							style="width: 130px;" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業須返還差額期限：</td>
						<td align="left" colspan="3"><input data-role="datepicker"
							data-format="yyyy-MM-dd"
							data-bind="value:report.companyreturnduedate"
							style="width: 130px;" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業以返還差額：</td>
						<td align="left"><input type="text" class="k-input"
							data-bind="value:report.companyreturnamount"
							style="width: 130px;" /></td>
						<td class="fontcolor" align="right">企業已返還日期：</td>
						<td align="left"><input data-role="datepicker"
							data-format="yyyy-MM-dd"
							data-bind="value:report.companyreturndate" style="width: 130px;" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right"></td>
						<td align="left"></td>
						<td class="fontcolor" align="right">通知強制徵收日期：</td>
						<td align="left"><input data-role="datepicker"
							data-format="yyyy-MM-dd"
							data-bind="value:report.compulsorynotificationdate"
							style="width: 130px;" /></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><textarea class="k-textbox"
								data-bind="value:report.returnnotificationremark"
								style="width: 455px;"></textarea></td>
					</tr>
				</table>
			</div>
			</sec:authorize>
	
		</div>
	</div>

	<script id="row-template" type="text/x-kendo-template"> 	
<fieldset >
  <table width="100%" cellpadding="0"  cellspacing="0" id="addtb#:num#"  >
        <tr>
            <td class="fontcolor" width="20%" align="right">
			<input type="checkbox" id="#:num#checkBox" value="#:num#mm#:suggestionid#" name="checkBoxReport">&nbsp;&nbsp;&nbsp
			#if(reportVM.islastNo){#	
        	<span>分析報告建議書編號：</span>
			#}else{#
			<span>建議書編號：</span>
			#}#	

			</td>
            <td width="25%" align="left"><input type="text" class="k-input" data-bind="value: suggestioncode"  style="width:130px;"/></td>
            <td width="20%" class="fontcolor"  align="right">建議書批示日期：</td>
            <td width="25%"  align="left">
				<input data-role="datepicker"   data-format="yyyy-MM-dd" data-bind="value: suggestionapprovetime" style="width:130px;" />
			</td>
        </tr>	
		<tr>
			<td colspan="4"  class="fontcolor" >&nbsp;&nbsp;本期報告批示決定：</td>
		</tr>
	#for(var i=0;i<appList.length;i++){   #
		#var approvefinanceamount= appList[i].approvefinanceamount; var typeCname=appList[i].applytype.cname;  var typeid=appList[i].applytype.applytypeid;  #
			#approvefinanceamount=setValue(approvefinanceamount)#
		#if(reportVM.islastNo){#
        <tr>
           	<td class="fontcolor" align="right">(#:typeCname#)：</td>
					<td align="left" colspan="3">
					<select data-role='dropdownlist' style="width: 130px;" id="#:typeid#sel#:num#" data-text-field="text" data-value-field="id"		data-bind="source: reportApproveStatusType"></select>
					</td>
        </tr>
	#}else{#
	    <tr>
            <td class="fontcolor" align="right">(#:typeCname#)：</td>
            <td align="left">
	         <select data-role='dropdownlist' style="width:130px;" id="#:typeid#sel#:num#" name="selname"  data-text-field="text" data-value-field="id" data-bind="source: reportApproveStatusType"  ></select>
			</td>
            <td class="fontcolor" align="right">批准可撥付金額：</td>
	
            <td align="left"><input type="text" class="k-input" id="#:typeid#amount#:num#" value="#:approvefinanceamount#"  style="width:130px;"/></td>
        </tr>

	#}#
		
   #}#
        <tr > 
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox" data-bind="value:remark"   style="width:455px;"></textarea></td>
        </tr>
      </table>
</fieldset>
	
</script>


	<script id="show-template" type="text/x-kendo-template"> 
<fieldset >
  <table width="100%" cellpadding="0" cellspacing="0" >
    <tr>
        <td class="fontcolor" width="30%" align="right">
			#if(reportVM.islastNo){#	
        	<span>分析報告建議書編號：</span>
			#}else{#
			<span>建議書編號：</span>
			#}#	
		</td>
        <td width="21%" align="left"><span data-bind="text:suggestioncode"/></td>
        <td width="20%" class="fontcolor"  align="right">分析報告批示日期：</td>
		#if(suggestionapprovetime!=null){#
        	<td width="21%"  align="left">#:suggestionapprovetime#</td>
		#}else{#
			<td  width="21%" align="left"></td>
		#}#
    </tr>	
	#for(var i=0;i<appList.length;i++){   #
		#var approvefinanceamount= appList[i].approvefinanceamount;  var typeCname=appList[i].applytype.cname;  var reportapprovetype=appList[i].reportapprovetype;   #
	#if(reportVM.islastNo){#	
	 <tr >
        <td class="fontcolor" align="right">本期報告批示決定(#:typeCname#)：</td>
        <td align="left" colspan="3">#:getapproveState(reportapprovetype)#</td>
    </tr>
	#}else{#
	  <tr>
	        <td class="fontcolor" align="right">本期報告批示決定(#:typeCname#)：</td>
	        <td align="left">#:getapproveState(reportapprovetype)#</td>
	        <td class="fontcolor" align="right">批准可撥付金額：</td>
			#if(approvefinanceamount!=null){#
				<td align="left">#:approvefinanceamount#</td>
			#}else{#
				<td align="left"></td>
			#}#
	        
	  </tr>
	#}#
	#}#
    <tr>
        <td class="fontcolor" align="right">備註：</td>
        <td align="left" colspan="3"><span data-bind="text:remark"/></td>
    </tr>
  </table>
</fieldset>
</script>

</body>
</html>
<script type="text/x-kendo-template" id="reportFileTemplate">
			<div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="ckReportFile"  /><a name="investigationDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
<script>
$("#uploadReportFile").parent().removeClass("k-button k-upload-button");
$("#uploadReportFile").parent().parent().removeClass("k-dropzone");
$("#uploadReportFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
$("#uploadReportFile").parent().addClass("filednewcss");  

</script>
