<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>詳細資料</title>
<script type="text/javascript" src="<%=resourcesPath%>/js/ApplicationForm.js"></script>
<script type="text/x-kendo-template" id="applytypeTemp">
    <tr>
        <td><input name="applycyptCK#:applytypeid#" value="#:applytypeid#" type="checkbox"/>#:cname#</td>
    </tr>
</script>
<script>
	$("#uploadInvestigationFile").parent().removeClass("k-button k-upload-button");
	$("#uploadInvestigationFile").parent().parent().removeClass("k-dropzone");
	$("#uploadInvestigationFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
	$("#uploadInvestigationFile").parent().addClass("filednewcss");  
</script>
<script type="text/x-kendo-template" id="fileTemplate">
    <div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="applicationFileFile"  /><a name="applicationFileDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
</head>

<body>
	<div id="ApplicationFormContent">
		<div id="ApplicationForm" class="lineh">
			<div class="floatright curs">
				<img src="<%=resourcesPath%>/img/Modify.png"
					id="Edit-ApplicationForm" title="編輯" data-bind="click:setSelectData"> <img
					src="<%=resourcesPath%>/img/Delete.png" title="刪除"> 
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
			<div class="fontcolor fontweight floatleft">一般資料</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0"
				style="font-size: 14px;">
				<tr>
					<td width="30%" class="fontcolor" align="right">項目名稱：</td>
					<td width="21%" align="left"><span data-bind="text:tapplication.projectname"/></td>
					<td width="31%" class="fontcolor" align="right">卷宗編號：</td>
					<td width="21%" align="left"><span data-bind="text:tapplication.casecode"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">申請資助方式：</td>
					<td align="left" colspan="3"><span data-bind="text:applytypeText"/></td>
				</tr>
				<tr>
				    <td class="fontcolor" align="right">申請編號：</td>
                    <td align="left" colspan="3"><span data-bind="text:tapplication.applicationcode"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">項目類別 （領域）：</td>
					<td align="left"><span data-bind="text:tapplication.projectfiledtype"/></td>
					<td class="fontcolor" align="right">項目類別 （行業）：</td>
					<td align="left"><span data-bind="text:tapplication.projectjobtype"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業名稱 （中文）：</td>
					<td colspan="3" align="left"><span data-bind="text:tapplication.compnaycname"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業名稱 （葡文）：</td>
					<td colspan="3" align="left"><span data-bind="text:tapplication.compnaypname"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業名稱 （英文）：</td>
					<td colspan="3" align="left"><span data-bind="text:tapplication.compnayename"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">商業企業主類型：</td>
					<td align="left"><span data-bind="text:tapplication.tcompanytype.cname"/></td>
					<td class="fontcolor" align="right">商業登記編號：</td>
					<td align="left"><span data-bind="text:tapplication.companyregcode"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">場所登記編號：</td>
					<td align="left"><span data-bind="text:tapplication.venuecode"/></td>
					<td class="fontcolor" align="right">納稅人編號：</td>
					<td align="left"><span data-bind="text:tapplication.taxcode"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">場所電話/通訊電話：</td>
					<td align="left" colspan="3"><span data-bind="text:tapplication.venuephone"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">電郵地址：</td>
					<td align="left" colspan="3"><span data-bind="text:tapplication.email"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">安全電子郵箱(SEPbox)名稱：</td>
					<td align="left" colspan="3"><span data-bind="text:tapplication.sepbox"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">住所地址：</td>
					<td colspan="3" align="left"></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">通訊地址：</td>
					<td colspan="3" align="left"></td>
				</tr>
			</table>
			<div class="fontcolor fontweight floatleft">項目主要負責人資料</div>
		    <div class="divcss8 floatright"></div>
		    <div class="clearboth"></div>
		    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                <tr>
                    <td width="35%" class="fontcolor" align="right">姓名：</td>
                    <td width="21%" align="left"><span data-bind="text:tapplication.projecowner"/></td>
                    <td width="31%" class="fontcolor" align="right">職稱：</td>
                    <td width="21%" align="left"><span data-bind="text:tapplication.ownerposition"/></td>
                </tr>
                <tr>
                    <td class="fontcolor" align="right">公司電話：</td>
                    <td align="left"><span data-bind="text:tapplication.ownercompanyphone"/></td>
                    <td class="fontcolor" align="right">手機：</td>
                    <td align="left"><span data-bind="text:tapplication.ownermobilephone"/></td>
                </tr>
                <tr>
                    <td class="fontcolor" align="right">電郵地址：</td>
                    <td align="left" colspan="3"><span data-bind="text:tapplication.owneremail"/></td>
                </tr>
            </table>
			<div class="fontcolor fontweight floatleft">附 件</div>
			<div class="divcss6 floatright"></div>
			<div class="clearboth"></div>
			<div class="margin3" id="selectFile" >
                  <input type="button" class="buttoncs"  value="全選" onclick="selectAll()" />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delFile()"/><br>
                  <span data-template="fileTemplate" data-bind="source: fileSource_application"></span>
            </div>  
		</div>

		<div id="ApplicationForm-edit" class="lineh" style="display: none;">
			<div class="floatleft">編輯申請表內容</div>
			<div class="floatright curs">
				<img class="save-ApplicationForm"
					src="<%=resourcesPath%>/img/save.png" data-bind="click:saveApplication"> <img
					class="save-ApplicationForm"
					src="<%=resourcesPath%>/img/Cancel.png">
			</div>
			<div class="clearboth"></div>
			<div class="fontcolor fontweight floatleft">一般資料</div>
			<div class="divcss7 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="35%" class="fontcolor" align="right">項目名稱：</td>
					<td width="21%" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.projectname"/></td>
					<td width="31%" class="fontcolor" align="right">卷宗編號：</td>
					<td width="21%" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.casecode"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right" valign="top">申請資助方式：</td>
					<td align="left" colspan="3">
						<table data-template="applytypeTemp" data-bind="source: applytypes"></table>
					</td>
				</tr>
				<tr>
                    <td class="fontcolor" align="right">申請編號：</td>
                    <td align="left" colspan="3"><input type="text" class="k-input"
                        style="width: 150px;" data-bind="value:tapplication.applicationcode"/></td>
                </tr>
				<tr>
					<td class="fontcolor" align="right">項目類別 （領域）：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:tapplication.projectfiledtype"/></td>
					<td class="fontcolor" align="right">項目類別 （行業）：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:tapplication.projectjobtype"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業名稱 （中文）：</td>
					<td colspan="3" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.compnaycname"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業名稱 （葡文）：</td>
					<td colspan="3" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.compnaypname"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">企業名稱 （英文）：</td>
					<td colspan="3" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.compnayename"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">商業企業主類型：</td>
					<td align="left">
					   <select id="companytype" style="width: 150px;" data-role='dropdownlist' data-value-field="companytypeid" data-text-field="cname" data-bind='source:companytypes'></select>
                    </td>
					<td class="fontcolor" align="right">商業登記編號：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:tapplication.companyregcode"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">場所登記編號：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:tapplication.venuecode"/></td>
					<td class="fontcolor" align="right">納稅人編號：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:tapplication.taxcode"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">場所電話/通訊電話：</td>
					<td align="left" colspan="3"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.venuephone"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">電郵地址：</td>
					<td align="left" colspan="3"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.email"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">安全電子郵箱(SEPbox)名稱：</td>
					<td align="left" colspan="3"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.sepbox"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">住所地址：</td>
					<td colspan="3" align="left"><img
						src="<%=resourcesPath%>/img/serach.png" width="20" height="20"
						style="vertical-align: middle"></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">通訊地址：</td>
					<td colspan="3" align="left"><img
						src="<%=resourcesPath%>/img/serach.png" width="20" height="20"
						style="vertical-align: middle"></td>
				</tr>
			</table>
			<div class="fontcolor fontweight floatleft">項目主要負責人資料</div>
			<div class="divcss8 floatright"></div>
			<div class="clearboth"></div>
			<table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
				<tr>
					<td width="35%" class="fontcolor" align="right">姓名：</td>
					<td width="21%" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.projecowner"/></td>
					<td width="31%" class="fontcolor" align="right">職稱：</td>
					<td width="21%" align="left"><input type="text"
						class="k-input" style="width: 150px;" data-bind="value:tapplication.ownerposition"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">公司電話：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:tapplication.ownercompanyphone"/></td>
					<td class="fontcolor" align="right">手機：</td>
					<td align="left"><input type="text" class="k-input"
						style="width: 150px;" data-bind="value:tapplication.ownermobilephone"/></td>
				</tr>
				<tr>
					<td class="fontcolor" align="right">電郵地址：</td>
					<td align="left" colspan="3"><input type="text"
                        class="k-input" style="width: 150px;" data-bind="value:tapplication.owneremail"/></td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>
