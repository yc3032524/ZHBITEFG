<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>取消批給程序</title>
<script type="text/javascript"
	src="<%=resourcesPath%>/js/CancelContract.js"></script>

<script id="CancelApplytypeEdit" type="text/x-kendo-template">
<tr>
    <td>
        #:applytype.cname#:
    </td>
    <td>
        <input id="cancelfinanceamount#:applytype.applytypeid#" index="#:applytype.applytypeid#" type="text" value="#:returnamount==null?'':returnamount#" class="k-input" name="cancelfinanceamount#:applytype.applytypeid#" style="width: 100px;"/>
    </td>
</tr>
</script>
<script id="CancelApplytypeShow" type="text/x-kendo-template">
<tr>
    <td>
        #:applytype.cname#:
    </td>
    <td>
        #:returnamount==null?'':returnamount#
    </td>
</tr>
</script>
<script>
    $("#uploadInvestigationFile").parent().removeClass("k-button k-upload-button");
    $("#uploadInvestigationFile").parent().parent().removeClass("k-dropzone");
    $("#uploadInvestigationFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
    $("#uploadInvestigationFile").parent().addClass("filednewcss");  
</script>
<script type="text/x-kendo-template" id="fileTemplate">
    <div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="CancelContractFile"  /><a name="CancelContractDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
</head>
<body>
	<div id="CancelContractContent">
		<input type="hidden" id="hide_num" value="${num }" /> <input
			type="hidden" id="hide_type" value="${type }" />
		<div id="Cancel" class="lineh">
		    <div class="floatleft">
                 <select data-role="dropdownlist" data-value-field="id" data-text-field="text" data-bind="source: selectReportSource,value:selectReportSelect,events:{change:reportNumChange}"></select>
            </div>
			<div class="floatright curs">
				<img src="<%=resourcesPath%>/img/Modify.png" id="Edit-Cancel" title="編輯" data-bind="click:setSelectData"> <img
					src="<%=resourcesPath%>/img/Delete.png" title="刪除" data-bind="click:deleteStopFinance"> <img src="<%=resourcesPath%>/img/Upload.png"
					title="上傳附件">
			</div>
			<!-- 文件上傳 -->
             <div class="filediv">
             <div class="fileinput">
             <input  name="files" id="uploadInvestigationFile" type="file" style="opacity: 0;width: 30px;height: 30px; cursor: pointer;"/>
             </div>
             </div>
             <!--  -->
			<div class="clearboth"></div>
			<div class="fontcolor fontweight floatleft">取消資助批給</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="30%" align="right" class="fontcolor">取消批給建議書編號：</td>
					<td width="30%" align="left"><span data-bind="text:cancelcontract.cancelcontractcode"/>&nbsp;&nbsp;草擬中<input id="isdraftShow" type="checkbox" disabled="disabled"></td>
					<td width="25%" align="right" class="fontcolor">取消批給原因：</td>
					<td width="25%" align="left"><span data-bind="text:cancelReasonText"/>&nbsp;&nbsp;<span data-bind="text:cancelcontract.cancelreasonotherremark"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">批示決定：</td>
					<td align="left"><span data-bind="text:cancelResultText"/></td>
					<td class="fontcolor" align="right">批示日期：</td>
					<td align="left"><span data-bind="text:cancelcontract.approvedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">企業應返還金額：</td>
					<td align="left" colspan="3">
					   <table data-template="CancelApplytypeShow" data-bind="source: cancelcontractApplyList"></table>
					</td>
					<td class="fontcolor" align="right"></td>
					<td align="left"></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><span data-bind="text:cancelcontract.cancelremark"/></td>
				</tr>
			</table>
			<div>
				<div class="fontcolor fontweight floatleft">通知企業</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="30%" class="fontcolor" align="right">取消批給通知函編號：</td>
						<td width="21%" align="left"><span data-bind="text:cancelcontract.tocompanycode"/></td>
						<td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
						<td align="left"><span data-bind="text:cancelcontract.companyreceivedate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業須返還資助款項期限：</td>
						<td align="left" colspan="3"><span data-bind="text:cancelcontract.returnduedate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><span data-bind="text:cancelcontract.tocompanyremark"/></td>
					</tr>
				</table>
				<div class="fontcolor fontweight floatleft">內部通知</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="30%" class="fontcolor" align="right">取消批給返還通知編號：</td>
						<td width="21%" align="left"><span data-bind="text:cancelcontract.cancelnotificationcode"/></td>
						<td width="25%" class="fontcolor" align="right">取消通知日期：</td>
						<td align="left"><span data-bind="text:cancelcontract.shouldcanceldate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業已返還金額：</td>
						<td align="left"><span data-bind="text:cancelcontract.companyreturnamount"/></td>
						<td class="fontcolor" align="right">企業已返還日期：</td>
						<td align="left"><span data-bind="text:cancelcontract.companyreturndate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right"></td>
						<td align="left"></td>
						<td class="fontcolor" align="right">通知強制徵收日期：</td>
						<td align="left"><span data-bind="text:cancelcontract.forcecollectiondate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><span data-bind="text:cancelcontract.notificationremark"/></td>
					</tr>
				</table>
			</div>
			<div class="fontcolor fontweight floatleft">附 件</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<div class="margin3" id="selectFile" >
                  <input type="button" class="buttoncs"  value="全選" onclick="selectAll()" />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delFile()"/><br>
                  <span data-template="fileTemplate" data-bind="source: fileSource_CancelContract"></span>
            </div>  
		</div>

		<div id="Cancel-edit" class="lineh" style="display: none;">
			<div class="floatleft">編輯取消批給程序</div>
			<div class="floatright curs">
				<img class="save-Cancel" src="<%=resourcesPath%>/img/save.png" data-bind="click:SaveAndUpdateCancelContract"> <img
					class="save-Cancel" src="<%=resourcesPath%>/img/Cancel.png">
			</div>
			<div class="clearboth"></div>
			<div class="fontcolor fontweight floatleft">取消資助批給</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="30%" align="right" class="fontcolor">取消批給建議書編號：</td>
					<td colspan="3" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:cancelcontract.cancelcontractcode"/> 草擬中<input id="isdraftEdit" type="checkbox"></td>
					</td>
				</tr>
				<td width="25%" align="right" class="fontcolor">取消批給原因：</td>
				<td align="left" colspan="3"><select class="selecttype"
					style="width: 150px;" onChange="onChange(this)" id="cancelreason"><option
							value="0">--</option>
						<option value="1">作出虛假聲明/提供虛假資料</option>
						<option value="2">沒有履行協議書中的義務</option>
						<option value="3">違反規章的行為</option>
						<option value="4">監察項目時發現嚴重差異</option>
						<option value="5">未按規定處理設備變賣得益</option>
						<option value="6">賬簿及記錄未按規定處理</option>
						<option value="7">未完成并終止項目</option>
						<option value="8">其它</option></select> <input id="otherinput" type="text"
					class="k-input" style="width: 150px; display: none;" data-bind="value:cancelcontract.cancelreasonotherremark"/></td>
				<tr>
					<td width="30%" class="fontcolor" align="right">批示決定：</td>
					<td width="20%" align="left"><select class="selecttype"
						style="width: 150px;" id="cancelresult"><option value="0">--</option>
							<option value="1">批准</option>
							<option value="2">不批准</option>
							<option value="3">其它</option></select></td>
					<td width="25%" class="fontcolor" align="right">批示日期：</td>
					<td width="20%" align="left"><input class="datepicker"
						style="width: 152px;" data-bind="value:cancelcontract.approvedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">企業應返還金額：</td>
					<td align="left" colspan="3">
					   <table data-template="CancelApplytypeEdit" data-bind="source: cancelcontractApplyList"></table>
					</td>
					<td class="fontcolor" align="right"></td>
					<td align="left"></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><textarea class="k-textbox"
							style="width: 450px;" data-bind="value:cancelcontract.cancelremark"></textarea></td>
				</tr>
			</table>
			<div>
				<div class="fontcolor fontweight floatleft">通知企業</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="30%" class="fontcolor" align="right">取消批給通知函編號：</td>
						<td width="20%" align="left"><input type="text"
							class="k-input" style="width: 150px;" data-bind="value:cancelcontract.tocompanycode"/></td>
						<td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
						<td width="20%" align="left"><input class="datepicker"
							style="width: 152px;" data-bind="value:cancelcontract.companyreceivedate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業須返還資助款項期限：</td>
						<td align="left" colspan="3"><input class="datepicker"
							style="width: 152px;" data-bind="value:cancelcontract.returnduedate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><textarea class="k-textbox"
								style="width: 450px;" data-bind="value:cancelcontract.tocompanyremark"></textarea></td>
					</tr>
				</table>
				<div class="fontcolor fontweight floatleft">內部通知</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="30%" class="fontcolor" align="right">取消批給返還通知編號：</td>
						<td width="20%" align="left"><input type="text"
							class="k-input" style="width: 150px;" data-bind="value:cancelcontract.cancelnotificationcode"/></td>
						<td width="25%" class="fontcolor" align="right">取消通知日期：</td>
						<td width="20%" align="left"><input class="datepicker"
							style="width: 152px;" data-bind="value:cancelcontract.shouldcanceldate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">企業已返還金額：</td>
						<td align="left"><input type="text" class="k-input"
							style="width: 150px;" data-bind="value:cancelcontract.companyreturnamount"/></td>
						<td class="fontcolor" align="right">企業已返還日期：</td>
						<td align="left"><input class="datepicker"
							style="width: 152px;" data-bind="value:cancelcontract.companyreturndate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right"></td>
						<td align="left"></td>
						<td class="fontcolor" align="right">通知強制徵收日期：</td>
						<td align="left"><input class="datepicker"
							style="width: 152px;" data-bind="value:cancelcontract.forcecollectiondate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><textarea class="k-textbox"
								style="width: 450px;" data-bind="value:cancelcontract.notificationremark"></textarea></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>