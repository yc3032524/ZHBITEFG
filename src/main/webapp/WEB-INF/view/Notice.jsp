<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>基金通知</title>
<script type="text/javascript" src="<%=resourcesPath%>/js/Notice.js"></script>
<script type="text/x-kendo-template" id="fileTemplate">
    <div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="NoticeFile"  /><a name="NoticeDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
<script>
    $("#uploadInvestigationFile").parent().removeClass("k-button k-upload-button");
    $("#uploadInvestigationFile").parent().parent().removeClass("k-dropzone");
    $("#uploadInvestigationFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
    $("#uploadInvestigationFile").parent().addClass("filednewcss");  
</script>
</head>
<body>
	<div id="NoticeContent">
	    <input type="hidden" id="hide_num" value="${num }"/>
	    <input type="hidden" id="hide_type" value="${type }"/>
		<div id="Notice" class="lineh">
			<div class="floatleft">
			     <select data-role="dropdownlist" data-value-field="id" data-text-field="text" data-bind="source: selectReportSource,value:selectReportSelect,events:{change:reportNumChange}"></select>
			</div>
			<div class="floatright curs">
				<img src="<%=resourcesPath%>/img/Modify.png" id="Edit-Notice" title="編輯" data-bind="click:setSelectData"> <img
					src="<%=resourcesPath%>/img/Delete.png" title="刪除" data-bind="click:deleteFundNotification"> 
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
			<div class="fontcolor fontweight floatleft">通知內容</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="27%" align="right" class="fontcolor">事由：</td>
					<td align="left"><span data-bind="text:fundnotification.reason"/></td>
				</tr>
				<tr>
					<td colspan="2" class="fontcolor">&nbsp;&nbsp;本次通知是否與企業提交之報告有關
						： <span data-bind="text:isaboutsubmitreport"/></td>
				</tr>
				<tr data-bind="visible:isShowReportNum">
                    <td align="right" class="fontcolor">報告期數：</td>
                    <td align="left"><span data-bind="text:fundnotification.reportnum"/></td>
                </tr>
				<tr>
					<td align="right" class="fontcolor">通知方式：</td>
					<td align="left"><span data-bind="text:notificationtypeText"/>&nbsp;<span data-bind="text:fundnotification.notificationotherremark"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left"><span data-bind="text:fundnotification.contentremark"/></td>
				</tr>
			</table>
			<div class="fontcolor fontweight floatleft">通知企業</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="27%" align="right" class="fontcolor">基金通知函編號：</td>
					<td width="21%" align="left"><span data-bind="text:fundnotification.notificationcode"/></td>
					<td width="31%" align="right" class="fontcolor">企業獲通知日期：</td>
					<td width="21%" align="left"><span data-bind="text:fundnotification.receivedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業回覆期限：</td>
					<td align="left"><span data-bind="text:fundnotification.replyduedate"/></td>
					<td class="fontcolor" align="right">企業已回覆日期：</td>
					<td align="left"><span data-bind="text:fundnotification.replydate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><span data-bind="text:fundnotification.tocompanyremark"/></td>
				</tr>
			</table>
			<div>
				<div class="fontcolor fontweight floatleft">跟進程序</div>
				<div class="divcss3 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="27%" class="fontcolor" align="right">須展開之跟進程序：</td>
						<td align="left"><span data-bind="text:followtypeText"/>&nbsp;<span data-bind="text:fundnotification.followotherremark"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left"><span data-bind="text:fundnotification.followremark"/></td>
					</tr>
				</table>
			</div>
			<div class="fontcolor fontweight floatleft">附 件</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<div class="margin3" id="selectFile" >
                  <input type="button" class="buttoncs"  value="全選" onclick="selectAll()" />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delFile()"/><br>
                  <span data-template="fileTemplate" data-bind="source: fileSource_notice"></span>
            </div>  
		</div>

		<div id="Notice-edit" class="lineh" style="display: none;">
			<div class="floatleft">編輯基金通知</div>
			<div class="floatright curs">
				<img class="save-Notice" src="<%=resourcesPath%>/img/save.png" data-bind="click:SaveAndUpdateNotice"> <img
					class="save-Notice" src="<%=resourcesPath%>/img/Cancel.png">
			</div>
			<div class="clearboth"></div>

			<div class="fontcolor fontweight floatleft">通知內容</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="27%" align="right" class="fontcolor">事由：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 455px;" data-bind="value:fundnotification.reason"/></td>
				</tr>
				<tr>
					<td colspan="2" class="fontcolor">&nbsp;&nbsp;本次通知是否與企業提交之報告有關
						： <input id="radioyes" type="radio" value="1" name="radios">&nbsp;是
						<input id="radiono" type="radio" value="0" name="radios">&nbsp;否
					</td>
				</tr>
				<tr id="reportInput" style="display: none;">
					<td class="fontcolor" align="right">報告期數：</td>
					<td align="left" colspan="3"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:fundnotification.reportnum" /></td>
				</tr>
				<tr>
					<td align="right" class="fontcolor">通知方式：</td>
					<td align="left"><select id="notificationtype" class="selecttype"
						style="width: 150px;" onChange="onChange(this)"><option
								value="0">--</option>
							<option value="1">SEPbox</option>
							<option value="2">郵寄</option>
							<option value="3">電郵</option>
							<option value="4">傳真</option>
							<option value="5">親臨</option>
							<option value="6">其它</option></select> <input id="otherinput" type="text"
						class="k-input" style="width: 150px; display: none;" data-bind="value:fundnotification.notificationotherremark" /></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left"><textarea class="k-textbox"
							style="width: 455px;" data-bind="value:fundnotification.contentremark"></textarea></td>
				</tr>
			</table>
			<div class="fontcolor fontweight floatleft">通知企業</div>
			<div class="divcss3 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0">
				<tr>
					<td width="27%" align="right" class="fontcolor">基金通知函編號：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:fundnotification.notificationcode"/></td>
					<td align="right" class="fontcolor">企業獲通知日期：</td>
					<td align="left"><input class="datepicker" data-format="yyyy-MM-dd"
						style="width: 152px;" data-bind="value:fundnotification.receivedate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業回覆期限：</td>
					<td align="left"><input class="datepicker" data-format="yyyy-MM-dd"
						style="width: 152px;" data-bind="value:fundnotification.replyduedate"/></td>
					<td class="fontcolor" align="right">企業已回覆日期：</td>
					<td align="left"><input class="datepicker" data-format="yyyy-MM-dd"
						style="width: 152px;" data-bind="value:fundnotification.replydate"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">備註：</td>
					<td align="left" colspan="3"><textarea class="k-textbox"
							style="width: 455px;" data-bind="value:fundnotification.tocompanyremark"></textarea></td>
				</tr>
			</table>
			<div id="Followup">
				<div class="fontcolor fontweight floatleft">跟進程序</div>
				<div class="divcss3 floatright"></div>
				<div class="clearboth"></div>
				<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="27%" class="fontcolor" align="right">須展開之跟進程序：</td>
						<td align="left"><select id="followtype" class="selecttype"
							style="width: 150px;" onChange="onChange1(this)"><option
									value="0">--</option>
								<option value="1">另行通知</option>
								<option value="2">轉交其他部門處理</option>
								<option value="3">建議中止發放</option>
								<option value="4">建議取消批給</option>
								<option value="5">其它</option></select> <input id="otherinput1"
							type="text" class="k-input" style="width: 150px; display: none;" data-bind="value:fundnotification.followotherremark"/></td>
					</tr>
					<tr>
						<td class="fontcolor" align="right">備註：</td>
						<td align="left"><textarea class="k-textbox"
								style="width: 455px;" data-bind="value:fundnotification.followremark"></textarea></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</body>
</html>