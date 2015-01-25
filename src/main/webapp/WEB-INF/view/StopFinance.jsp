<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>項目中止發放</title>
<script type="text/javascript"
	src="<%=resourcesPath%>/js/StopFinance.js"></script>

<script id="stopApplytypeEdit" type="text/x-kendo-template">
<tr>
    <td>
        #:applytype.cname#:
    </td>
    <td>
        <input id="stopfinanceamount#:applytype.applytypeid#" index="#:applytype.applytypeid#" type="text" value="#:stopfinanceamount==null?'':stopfinanceamount#" class="k-input" name="stopfinanceamount#:applytype.applytypeid#" style="width: 100px;"/>
    </td>
</tr>
</script>
<script id="stopApplytypeShow" type="text/x-kendo-template">
<tr>
    <td>
        #:applytype.cname#:
    </td>
    <td>
        #:stopfinanceamount==null?'':stopfinanceamount#
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
    <div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="StopFinanceFile"  /><a name="StopFinanceDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
</head>
<body>
	<div id="StopFinanceContent">
		<input type="hidden" id="hide_num" value="${num }" /> 
		<input type="hidden" id="hide_type" value="${type }" />
		<div id="Stop" class="lineh">
			<div class="floatleft">
			     <select data-role="dropdownlist" data-value-field="id" data-text-field="text" data-bind="source: selectReportSource,value:selectReportSelect,events:{change:reportNumChange}"></select>
			</div>
			<div class="floatright curs">
				<img src="<%=resourcesPath%>/img/Modify.png" id="Edit-Stop" title="編輯" data-bind="click:setSelectData"> <img
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
			<div class="fontcolor fontweight floatleft">中止發放</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="25%" align="right" class="fontcolor">中止情況：</td>
					<td width="25%" align="left"><span data-bind="text:StopStatusText"/></td>
					<td width="25%" align="right" class="fontcolor"></td>
					<td align="left"></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">建議書編號：</td>
					<td align="left"><span data-bind="text:stopfinance.suggestioncode"/> 
					   &nbsp;&nbsp;草擬中<input id="isindraftShow" type="checkbox" disabled="disabled"></td>
					<td class="fontcolor" align="right">批示日期：</td>
					<td align="left"><span data-bind="text:stopfinance.approvedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">中止發放日期：</td>
					<td align="left"><span data-bind="text:stopfinance.stopfinancedate"/></td>
					<td class="fontcolor" align="right">中止日數：</td>
					<td align="left"><span data-bind="text:stopfinance.stopdays"/>天</td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">中止發放金額：</td>
					<td align="left" colspan="3">
					   <table data-template="stopApplytypeShow" data-bind="source: stopApplyList"></table>
					</td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">中止發放原因：</td>
					<td align="left" colspan="3"><span data-bind="text:stopreasonText"/>&nbsp;&nbsp;<span data-bind="text:stopfinance.stopreasonotherremark"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><span data-bind="text:stopfinance.stopremark"/></td>
				</tr>
			</table>
			<div>
			    <div class="fontcolor fontweight floatleft">內部通知</div>
                <div class="divcss7 floatright"></div>
                <div class="clearboth"></div>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="25%" class="fontcolor" align="right">中止發放通知編號：</td>
                        <td width="25%" align="left"><span data-bind="text:stopfinance.shouldnotificationcode"/></td>
                        <td width="25%" class="fontcolor" align="right">中止發放通知日期：</td>
                        <td align="left"><span data-bind="text:stopfinance.shouldnotificationdate"/></td>
                    </tr>
                    <tr>
                        <td class="fontcolor" align="right">備註：</td>
                        <td align="left" colspan="3"><span data-bind="text:stopfinance.shouldnotificationremark"/></td>
                    </tr>
                </table>
				<div class="fontcolor fontweight floatleft">通知企業</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="25%" class="fontcolor" align="right">中止發放通知函編號：</td>
						<td width="25%" align="left"><span data-bind="text:stopfinance.tocompanycode"/></td>
						<td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
						<td align="left"><span data-bind="text:stopfinance.companyreceivedate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><span data-bind="text:stopfinance.tocompanyremark"/></td>
					</tr>
				</table>
			</div>

			<div class="fontcolor fontweight floatleft">企業回覆</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="25%" class="fontcolor" align="right">企業解釋/補交期限：</td>
					<td width="25%" align="left"><span data-bind="text:stopfinance.companyreplyduedate"/></td>
					<td width="25%" class="fontcolor" align="right">企業已回覆日期：</td>
					<td align="left"><span data-bind="text:stopfinance.companyreplydate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><span data-bind="text:stopfinance.companyremark"/></td>
				</tr>
			</table>
			<div class="fontcolor fontweight floatleft">跟進程序</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="25%" class="fontcolor" align="right">須展開之跟進程序：</td>
					<td align="left"><span data-bind="text:followtypeText"/>&nbsp;&nbsp;<span data-bind="text:stopfinance.followtypeotherremark"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left"><span data-bind="text:stopfinance.followremark"/></td>
				</tr>
			</table>
			<div class="fontcolor fontweight floatleft">附 件</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<div class="margin3" id="selectFile" >
                  <input type="button" class="buttoncs"  value="全選" onclick="selectAll()" />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delFile()"/><br>
                  <span data-template="fileTemplate" data-bind="source: fileSource_stopFinance"></span>
            </div>  
		</div>

		<div id="Stop-edit" class="lineh" style="display: none;">
			<div class="floatleft">編輯項目中止發放內容</div>
			<div class="floatright curs">
				<img class="save-Stop" src="<%=resourcesPath%>/img/save.png" data-bind="click:SaveAndUpdateStopFinance"> <img
					class="save-Stop" src="<%=resourcesPath%>/img/Cancel.png">
			</div>
			<div class="clearboth"></div>
			<div class="fontcolor fontweight floatleft">中止發放</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="25%" align="right" class="fontcolor">中止情況：</td>
					<td width="35%" align="left"><select id="stopstatus" style="width: 130px;"
						class="selecttype"><option value="0">--</option>
							<option value="1">一般</option>
							<option value="2">特別</option></select></td>
					<td width="25%" align="right" class="fontcolor"></td>
					<td width="20%" align="left"></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">建議書編號：</td>
					<td align="left">
					   <input type="text" class="k-input" style="width: 130px;" data-bind="value:stopfinance.suggestioncode"/> 
					   草擬中<input id="isindraftEdit" type="checkbox"></td>
					<td class="fontcolor" align="right">批示日期：</td>
					<td align="left"><input class="datepicker"
						style="width: 130px;" data-format="yyyy-MM-dd" data-bind="value:stopfinance.approvedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">中止發放日期：</td>
					<td align="left"><input class="datepicker"
						style="width: 130px;" data-format="yyyy-MM-dd" data-bind="value:stopfinance.stopfinancedate"/></td>
					<td class="fontcolor" align="right">中止日數：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 130px;" data-bind="value:stopfinance.stopdays"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">中止發放金額：</td>
					<td align="left" colspan="3">
					   <table data-template="stopApplytypeEdit" data-bind="source: stopApplyList"></table>
					</td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">中止發放原因：</td>
					<td align="left" colspan="3"><select id="stopreason" style="width: 130px;"
						onChange="onChange(this)" class="selecttype"><option
								value="0">--</option>
							<option value="1">未能準時提交報告</option>
							<option value="2">建議實地調查或審計</option>
							<option value="3">未因項目變更事先通知基金</option>
							<option value="4">其它</option></select> <input id="otherinput" type="text"
						class="k-input" style="width: 130px; display: none;" data-bind="value:stopfinance.stopreasonotherremark"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><textarea class="k-textbox"
							style="width: 400px;" data-bind="value:stopfinance.stopremark"></textarea></td>
				</tr>
			</table>
			<div id="Noticediv">
			    <div class="fontcolor fontweight floatleft">內部通知</div>
                <div class="divcss7 floatright"></div>
                <div class="clearboth"></div>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="25%" class="fontcolor" align="right">中止發放通知編號：</td>
                        <td width="35%" align="left"><input type="text"
                            class="k-input" style="width: 130px;" data-bind="value:stopfinance.shouldnotificationcode"/></td>
                        <td width="25%" class="fontcolor" align="right">中止發放通知日期：</td>
                        <td width="20%" align="left"><input class="datepicker"
                            style="width: 130px;" data-format="yyyy-MM-dd" data-bind="value:stopfinance.shouldnotificationdate"/></td>
                    </tr>
                    <tr>
                        <td class="fontcolor" align="right">備註：</td>
                        <td align="left" colspan="3"><textarea class="k-textbox"
                                style="width: 400px;" data-bind="value:stopfinance.shouldnotificationremark"></textarea></td>
                    </tr>
                </table>
				<div class="fontcolor fontweight floatleft">通知企業</div>
				<div class="divcss7 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="25%" class="fontcolor" align="right">中止發放通知函編號：</td>
						<td width="35%" align="left"><input type="text"
							class="k-input" style="width: 130px;" data-bind="value:stopfinance.tocompanycode"/></td>
						<td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
						<td width="20%" align="left"><input class="datepicker"
							style="width: 130px;" data-format="yyyy-MM-dd" data-bind="value:stopfinance.companyreceivedate"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left" colspan="3"><textarea class="k-textbox"
								style="width: 400px;" data-bind="value:stopfinance.tocompanyremark"></textarea></td>
					</tr>
				</table>
			</div>

			<div class="fontcolor fontweight floatleft">企業回覆</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="25%" class="fontcolor" align="right">企業解釋/補交期限：</td>
					<td width="35%" align="left"><input class="datepicker"
						style="width: 130px;" data-format="yyyy-MM-dd" data-bind="value:stopfinance.companyreplyduedate"/></td>
					<td width="25%" class="fontcolor" align="right">企業已回覆日期：</td>
					<td width="20%" align="left"><input class="datepicker"
						style="width: 130px;" data-format="yyyy-MM-dd" data-bind="value:stopfinance.companyreplydate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><textarea class="k-textbox"
							style="width: 400px;" data-bind="value:stopfinance.companyremark"></textarea></td>
				</tr>
			</table>
			<div class="fontcolor fontweight floatleft">跟進程序</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td class="fontcolor" align="right">須展開之跟進程序：</td>
					<td align="left"><select id="followtype" style="width: 130px;"
						class="selecttype" onChange="onChange1(this)"><option
								value="0">--</option>
							<option value="1">符合要求</option>
							<option value="2">建議撥付</option>
							<option value="3">建議取消批給</option>
							<option value="4">其它</option></select> <input id="otherinput1" type="text"
						class="k-input" style="width: 130px; display: none;" data-bind="value:stopfinance.followtypeotherremark"/></td>
					<td class="fontcolor" align="right"></td>
					<td align="left"></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><textarea class="k-textbox"
							style="width: 400px;" data-bind="value:stopfinance.followremark"></textarea></td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>