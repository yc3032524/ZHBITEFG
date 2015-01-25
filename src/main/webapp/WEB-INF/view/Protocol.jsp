<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>詳細資料</title>
<script type="text/javascript" src="<%=resourcesPath%>/js/Protocol.js"></script>
<script id="reportTempShow" type="text/x-kendo-template">
<tr>
    <td>#:reportdueno#期：</td>
    <td>#:getFormatDateByLong(reportduedate)#</td>
</tr>
</script>
<script id="reportTempEdit" type="text/x-kendo-template">
<tr>
    <td>#:reportdueno#期：</td>
    <td><input name="reportdueno#:reportdueno#" index="#:reportdueno#" style="width:104px;" data-role="datepicker" data-format="yyyy-MM-dd" value="#:getFormatDateByLong(reportduedate)#"/></td>
</tr>
</script>
<script id="sendTempShow" type="text/x-kendo-template">
#if(cname!=null){#
    <tr>
        <td colspan='2'>#:cname#</td>
    </tr>
#}#
<tr>
    <td>#:reportfinanceno#期：</td>
    <td>#:reportfinanceamount==null?'':reportfinanceamount#</td>
</tr>
</script>
<script id="sendTempEdit" type="text/x-kendo-template">
#if(cname!=null){#
    <tr>
        <td colspan='2'>#:cname#</td>
    </tr>
#}#
<tr>
    <td>#:reportfinanceno#期：</td>
    <td><input name="reportfinanceno#:reportfinanceno#" reportfinanceno="#:reportfinanceno#" applytypeid="#:applytypeid#" type="text" class="k-input" style="width: 100px;" value="#:reportfinanceamount==null?'':reportfinanceamount#"/></td>
</tr>
</script>
<script id="applytypeShow" type="text/x-kendo-template">
<tr>
    <td>#:applytype.cname#:#:supportnum#&nbsp;&nbsp;</td>
    <td>資助總資金：#:supportamount==null?'':formatCurrency(supportamount)#</td>
</tr>
</script>
<script id="applytypeEdit" type="text/x-kendo-template">
<tr>
    <td>
        <input id="agreementApplycyptCK#:applytypeid#" name="agreementApplycyptCK#:applytypeid#" value="#:applytypeid#" type="checkbox" onclick="showAndHideInp(this)"/>#:cname#:
    </td>
    <td>
        <input id="agreementApplycyptNum#:applytypeid#" type="text" class="k-input" name="agreementApplycyptNum#:applytypeid#" style="width: 100px;display:none;"/>
    </td>
    <td>
        <div id="agreementApplycyptDiv#:applytypeid#" style="display:none;">資助總資金：<input id="agreementApplycyptAmount#:applytypeid#" type="text" class="k-input" name="agreementApplycyptAmount#:applytypeid#" style="width: 100px;"/></div>
    </td>
</tr>
</script>

<script type="text/x-kendo-template" id="fileTemplate">
    <div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="AgreementFileFile"  /><a name="AgreementFileDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
<script>
    $("#uploadInvestigationFile").parent().removeClass("k-button k-upload-button");
    $("#uploadInvestigationFile").parent().parent().removeClass("k-dropzone");
    $("#uploadInvestigationFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
    $("#uploadInvestigationFile").parent().addClass("filednewcss");  
</script>
</head>

<body>
	<div id="ProtocolContent">
		<div id="Protocol" class="lineh">
			<div class="floatright curs">
			    <img src="<%=resourcesPath%>/img/Check.png"  title="核對" data-bind="click:openCheckSubmitDialog,visible:isShowCheck">
			    <img src="<%=resourcesPath%>/img/Rollback.png"  title="取消核對" data-bind="click:CancelCheckSubmitDialog,visible:isShowCancelCheck">
                <img src="<%=resourcesPath%>/img/Generate.png" title="生成協議書">
				<img src="<%=resourcesPath%>/img/Modify.png" id="Edit-Protocol" title="編輯" data-bind="click:setSelectData,visible:isShowEdit"> 
				<img src="<%=resourcesPath%>/img/Delete.png" title="刪除"> 
				<img src="<%=resourcesPath%>/img/Upload.png" title="上傳附件" > 
			</div>
			<!-- 文件上傳 -->
             <div class="filediv">
             <div class="fileinput">
             <input  name="files" id="uploadInvestigationFile" type="file" style="opacity: 0;width: 30px;height: 30px; cursor: pointer;"/>
             </div>
             </div>
             <!--  -->
			<div class="clearboth"></div>
			<div class="fontcolor fontweight floatleft">協議書</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="27%" align="right" class="fontcolor">資助項目批給文件編號：</td>
					<td width="21%" align="left"><span data-bind="text:agreementPO.supportapprovedoccode"/></td>
					<td width="31%" align="right" class="fontcolor">資助項目批給批示日期：</td>
					<td width="21%" align="left"><span data-bind="text:agreementPO.supportapprovedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">協議書編號：</td>
					<td align="left"><span data-bind="text:agreementPO.agreementcode"/></td>
					<td class="fontcolor" align="right">協議書簽訂日期：</td>
					<td align="left"><span data-bind="text:agreementPO.aggreementsigndate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">批准資助方式：</td>
					<td align="left" colspan="3"><span data-bind="text:applytypeText"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">項目資助期間：</td>
					<td align="left" colspan="3"><span data-bind="text:agreementPO.supportdatefrom"/> 
					至 <span data-bind="text:agreementPO.supportdateto"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">批准資助方式：</td>
					<td align="left" colspan="3">
					   <table data-template="applytypeShow" data-bind="source: agreementPO.agreementSupports"></table>
					</td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">專用帳戶號碼：</td>
					<td align="left"><span data-bind="text:agreementPO.accountnumber"/></td>
					<td class="fontcolor" align="right">銀行名稱：</td>
					<td align="left"><span data-bind="text:agreementPO.bank"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">開始還款日期：</td>
					<td align="left" colspan="3"><span data-bind="text:agreementPO.payfrom"/></td>
				</tr>
			</table>

			<div class="fontcolor fontweight floatleft">報 告</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="27%" align="right" class="fontcolor"></td>
					<td width="21%" align="left"></td>
					<td width="31%" align="right" class="fontcolor">第一期撥款日期：</td>
					<td width="21%" align="left"><span data-bind="text:agreementPO.firstfinancedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">報告總期數：</td>
					<td align="left"><span data-bind="text:agreementPO.reportnum"/>個</td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">報告週期：</td>
					<td align="left"><span data-bind="text:agreementPO.reportcycle"/>個月</td>
				</tr>
				<tr>
				    <td class="fontcolor" align="right" valign="top">報告期限：</td>
                    <td colspan="3">
                       <table style="font-size: 14px;" data-template="reportTempShow" data-bind="source: agreementPO.reportduedates"></table>
                    </td>
				</tr>
				<tr>
				    <td class="fontcolor" align="right">發放總期數：</td>
                    <td align="left"><span data-bind="text:agreementPO.financenum"/>個</td>
				</tr>
				<tr>
				    <td class="fontcolor" align="right" valign="top">每期應撥款金額：</td>
                    <td>
                       <table style="font-size: 14px;" data-template="sendTempShow" data-bind="source: applytypeamountList"></table>
                    </td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">總結報告附件：</td>
					<td align="left" colspan="3"><span data-bind="text:reportsummaryattachmenttype"/></td>
				</tr>
				<tr>
                    <td class="fontcolor" align="right">是否申請核對：</td>
                    <td align="left" colspan="3"><span data-bind="text:isreadyforcheck"/></td>
                </tr>
			</table>
			<div class="fontcolor fontweight floatleft">核對資料</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="27%" class="fontcolor" align="right">核對資料(第一次)：</td>
					<td width="21%" align="left"><span data-bind="text:ischeck"/></td>
					<td width="31%" class="fontcolor" align="right">核對人員：</td>
					<td width="21%" align="left"><span data-bind="text:checkName" /></td>
				</tr>
				<tr id="ischeck2" style="display: none;">
                    <td width="27%" class="fontcolor" align="right">核對資料(第二次)：</td>
                    <td width="21%" align="left"><span data-bind="text:ischeck2"/></td>
                    <td width="31%" class="fontcolor" align="right">核對人員：</td>
                    <td width="21%" align="left"><span data-bind="text:checkName2" /></td>
                </tr>
                <tr id="ischeck3" style="display: none;">
                    <td width="27%" class="fontcolor" align="right">核對資料(第三次)：</td>
                    <td width="21%" align="left"><span data-bind="text:ischeck3"/></td>
                    <td width="31%" class="fontcolor" align="right">核對人員：</td>
                    <td width="21%" align="left"><span data-bind="text:checkName3" /></td>
                </tr>
			</table>
			<div class="fontcolor fontweight floatleft">附 件</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<div class="margin3" id="selectFile" >
                  <input type="button" class="buttoncs"  value="全選" onclick="selectAll()" />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delFile()"/><br>
                  <span data-template="fileTemplate" data-bind="source: fileSource_agreement"></span>
            </div>  
		</div>

		<div id="Protocol-edit" class="lineh" style="display: none;">
			<div class="floatleft">編輯協議書內容</div>
			<div class="floatright curs">
				<img class="save-Protocol" src="<%=resourcesPath%>/img/save.png" data-bind="click:updateAgreement"> <img
					class="save-Protocol" src="<%=resourcesPath%>/img/Cancel.png">
			</div>
			<div class="clearboth"></div>
			<div class="fontcolor fontweight floatleft">協議書</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="27%" align="right" class="fontcolor">資助項目批給文件編號：</td>
					<td width="21%" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:agreementPO.supportapprovedoccode"/></td>
					<td width="31%" align="right" class="fontcolor">資助項目批給批示日期：</td>
					<td width="21%" align="left"><input data-role="datepicker" data-format="yyyy-MM-dd"
						style="width: 152px;" data-bind="value:agreementPO.supportapprovedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">協議書編號：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:agreementPO.agreementcode"/></td>
					<td class="fontcolor" align="right">協議書簽訂日期：</td>
					<td align="left"><input 
						style="width: 152px;" data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:agreementPO.aggreementsigndate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">批准資助方式：</td>
					<td align="left" colspan="3">
					     <table data-template="applytypeEdit" data-bind="source: agreementApplytypes"></table>
                    </td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">項目資助期間：</td>
					<td align="left" colspan="3"><input data-role="datepicker" data-format="yyyy-MM-dd"
						style="width: 152px;" data-bind="value:agreementPO.supportdatefrom"/> 至 
						 <input data-role="datepicker" data-format="yyyy-MM-dd" style="width: 152px;" data-bind="value:agreementPO.supportdateto"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">專用帳戶號碼：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:agreementPO.accountnumber"/></td>
					<td class="fontcolor" align="right">銀行名稱：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:agreementPO.bank"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">開始還款日期：</td>
					<td align="left" colspan="3"><input 
						data-role="datepicker" data-format="yyyy-MM-dd" style="width: 150px;" data-bind="value:agreementPO.payfrom"/></td>
				</tr>
			</table>

			<div class="fontcolor fontweight floatleft">報 告</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="27%" align="right" class="fontcolor"></td>
					<td width="21%" align="left"></td>
					<td width="31%" align="right" class="fontcolor">第一期撥款日期：</td>
					<td width="21%" align="left"><input 
                        style="width: 152px;" data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:agreementPO.firstfinancedate"/>
				</tr>
				<tr>
					<td class="fontcolor" align="right">報告總期數：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:agreementPO.reportnum"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">報告週期：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:agreementPO.reportcycle"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">報告期限：</td>
					<td align="left">
					   <table style="font-size: 14px; width: 100%;" data-template="reportTempEdit" data-bind="source: agreementPO.reportduedates"></table>
                    </td>
				</tr>
				<tr>
				    <td class="fontcolor" align="right">發放總期數：</td>
                    <td align="left"><input type="text" class="k-input"
                        style="width: 150px;" data-bind="value:agreementPO.financenum"/></td>
				</tr>
				<tr>
				    <td class="fontcolor" align="right" valign="top">每期應撥款金額：</td>
                    <td align="left">
                        <table style="font-size: 14px;" data-template="sendTempEdit" data-bind="source: applytypeamountList"></table>
                    </td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">總結報告附件：</td>
					<td align="left">
					   <select id="typeSelect" style="width: 150px;" class="selecttype">
					       <option value="-1">--</option>
						   <option value="1">財務報表</option>
						   <option value="2">審核賬目</option>
					   </select>
					</td>
					<td class="fontcolor" align="right"></td>
					<td align="left"></td>
				</tr>
				<tr>
                    <td class="fontcolor" align="right">是否申請核對：</td>
                    <td align="left">
                       <input id="applyCheck" type="checkbox"/>
                    </td>
                    <td class="fontcolor" align="right"></td>
                    <td align="left"></td>
                </tr>
			</table>
			<!-- 
			<div id="checkDialog" style="display: none;">
			     <table width="100%">
			         <tr>
			             <td colspan="2" id="checkinfoTD"></td>
			         </tr>
			         <tr align="right">
	                     <td colspan="2">
	                         <br/>
	                         <input type="button" class='k-button' data-bind="click:checkSubmit" value="&nbsp;是&nbsp;"/>&nbsp;&nbsp;
	                         <input type="button" class='k-button' data-bind="click:closeCheckDialog" value="&nbsp;否&nbsp;"/>&nbsp;&nbsp;
	                     </td>
	                   </tr>
			     </table>
			</div>
			
			<div class="fontcolor fontweight floatleft">核對資料</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="27%" class="fontcolor" align="right">核對資料：</td>
					<td width="21%" align="left">
					   <select id="checkSelect" style="width: 150px;" class="selecttype">
					       <option value="-1">--</option>
						   <option value="1">已核對</option>
						   <option value="0">未核對</option>
					   </select>
					</td>
					<td width="31%" class="fontcolor" align="right">核對人員：</td>
					<td width="21%" align="left"><input type="text"
                        class="k-input" disabled="disabled" data-bind="value:checkName"
                        style="width: 110px;" /> <a class="k-icon k-i-search"
                        onclick="choiceCheckUser()"></a> 
                        <div id="checkUserDiv"></div></td>
				</tr>
			</table>
            -->
		</div>
	</div>
</body>
</html>
