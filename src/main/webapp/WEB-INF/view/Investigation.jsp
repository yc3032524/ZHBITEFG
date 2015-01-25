<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>詳細資料</title>
<script type="text/javascript" src="<%=resourcesPath%>/js/Investigation.js"></script>

</head>
<body>
<div id="InvestigationFormContent">  
<input type="hidden" value="${type}" id="type">
<input type="hidden" value="${num}" id="num">
 <div  id="InvestigationForm" class="lineh"> 
  	 <select  data-role='dropdownlist' data-text-field="name" data-value-field="id" data-bind="source:changeNos,value:currentInvestigationNo,events:{change:investigationChangeNos}"    class="floatleft" >	</select>                  
              
  	 <div class="floatright curs">
        <img src="<%=resourcesPath%>/img/Modify.png" id="Edit-InvestigationForm" title="編輯">
        <img src="<%=resourcesPath%>/img/Delete.png" data-bind="click:deleteInvestigation" title="刪除" >
       	<img src="<%=resourcesPath%>/img/Upload.png" title="上傳附件" > 
 		
     </div>
     <!-- 文件上傳 -->
     <div class="filediv">
	 <div class="fileinput">
	 <input name="files" id="uploadInvestigationFile" type="file" style="opacity: 0;width: 30px;height: 30px;"/>
     </div>
     </div>
     <!--  -->
	 <div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">監察目的</div>
     <div class="divcss7 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">本次監察：</td>
            <td align="left" colspan="3"><span data-bind="text:investigationpurposes"/></td>
        </tr>
        <tr>
            <td width="30%" class="fontcolor" align="right">建議書編號：</td>
            <td align="left" width="25%"><span data-bind="text:tinvestigation.suggestioncode"/></td>
            <td width="21%" class="fontcolor" align="right">批示決定：</td>
            <td align="left" width="24%"><span data-bind="text:approveresults"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="left" colspan="4">本次監察是否與企業提交之報告有關：<span data-bind="text:isrelatereports"/></td>

        </tr>
        <tr id="reportInput2" style="display:none;">
            <td class="fontcolor" align="right">報告期數：</td>
            <td align="left" colspan="3"><span data-bind="text:tinvestigation.reportno"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">將進行調查期限：</td>
            <td align="left" colspan="3"><span data-bind="text:tinvestigation.investigationdeadline"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:tinvestigation.monitorremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">通知企業</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">向企業發出通知函編號：</td>
            <td align="left" width="21%"><span data-bind="text:tinvestigation.tocompanycode"/></td>
            <td class="fontcolor" width="25%" align="right">企業獲通知日期：</td>
            <td align="left" width="24%"><span data-bind="text:tinvestigation.companyreceivedate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:tinvestigation.tocompanyremark"/></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">調 查</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">對項目作調查日期：</td>
            <td align="left" ><span data-bind="text:tinvestigation.investigationdate"/></td>
        </tr>
        <tr>
         <td width="20%" class="fontcolor" align="right">本次進行調查之實體：</td>
           <td align="left" ><span data-bind="text:investigationentityStr"/></td>
        </tr>
         <tr>
            <td width="30%" class="fontcolor" align="right">調查後報告書編號：</td>
            <td align="left" width="21%" ><span data-bind="text:tinvestigation.reportcode"/></td>
            <td class="fontcolor" width="25%" align="right">批示日期：</td>
            <td align="left" width="24%"><span data-bind="text:tinvestigation.investigationapprovaldate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:tinvestigation.investigationremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" ><span data-bind="text:InvestigationfollowtypeStr"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><span data-bind="text:tinvestigation.followremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">附 件</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
                <div class="margin3" id="selectFile">
                  <input type="button" class="buttoncs" id="selectAll" value="全選"  />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delinvestigationFormFile()"/><br>
               	<span data-template="investigationFileTemplate" data-bind="source: fileSource_investigation"></span>
                </div>  
  </div>  
  

  <div id="InvestigationForm-edit" class="lineh" style="display:none;"> 
      <div class="floatleft" >編輯調查範圍資料</div>
      <div class="floatright curs">
        <img class="Save-InvestigationForm" data-bind="click:saveInvestigation" src="<%=resourcesPath%>/img/save.png">
    	<img class="Save-InvestigationForm" src="<%=resourcesPath%>/img/Cancel.png" >
      </div>
	<div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">監察目的</div>
     <div class="divcss7 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">本次監察：</td>
            <td align="left" colspan="3"><select data-role='dropdownlist' style="width:130px;" data-text-field="text" data-value-field="id" data-bind="source: investigationpurposesSource, value:tinvestigation.investigationpurpose" ></select></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td align="left"><input type="text" class="k-input"  style="width:150px;" data-bind="value:tinvestigation.suggestioncode" /></td>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left"><select data-role='dropdownlist' style="width:130px;" data-text-field="text" data-value-field="id" data-bind="source: approvereSource, value: tinvestigation.approvalresult" ></select></td>
        </tr>

        
        <tr>
            <td class="fontcolor" align="left" colspan="4">本次監察是否與企業提交之報告有關：
	            <input  id="radioyes" value="1" type="radio"   onchange="btnRadio(1)" name="radios">&nbsp;是
	            <input id="radiono" value="2"  type="radio"   onchange="btnRadio(2)"  name="radios">&nbsp;否
            </td>
        </tr>
        <tr id="reportInput" style="display:none;">
            <td class="fontcolor" align="right">報告期數：</td>
            <td align="left" colspan="3"><input type="text" class="k-input"  style="width:150px;" data-bind="value:tinvestigation.reportno"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">將進行調查期限：</td>
            <td align="left"><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tinvestigation.investigationdeadline"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  style="width:400px;" data-bind="value:tinvestigation.monitorremark"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">通知企業</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">向企業發出通知函編號：</td>
            <td align="left" ><input type="text" class="k-input"  style="width:150px;" data-bind="value:tinvestigation.tocompanycode"/></td>
            <td class="fontcolor" align="right">企業獲通知日期：</td>
            <td align="left"><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tinvestigation.companyreceivedate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  style="width:400px;" data-bind="value:tinvestigation.tocompanyremark"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">調 查</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">對項目作調查日期：</td>
            <td align="left"><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tinvestigation.investigationdate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right" width="37%">本次進行調查之實體：</td>
            <td align="left" colspan="3">
            <select data-role='dropdownlist' style="width:150px;" onChange="onChange22(this)" data-text-field="text" data-value-field="id" data-bind="source: investigationentitySource, value: tinvestigation.investigationentity" ></select>
            <input id="rinput2" type="text" class="k-input"  style="width:150px; display:none;" data-bind="value:tinvestigation.investigationentitydetail" /></td>
        </tr>
        <tr>
            <td width="30%" class="fontcolor" align="right">調查後報告書編號：</td>
            <td align="left" width="21%" ><input type="text" class="k-input"  style="width:150px;" data-bind="value:tinvestigation.reportcode"/></td>
            <td class="fontcolor" align="right" width="25%">批示日期:</td>
            <td align="left" ><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tinvestigation.investigationapprovaldate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  style="width:440px;" data-bind="value:tinvestigation.investigationremark"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss3 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr id="selectyes" >
            <td  width="30%"  class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" >
            <select data-role='dropdownlist' style="width:180px;" onChange="onChange2(this)" data-text-field="text" data-value-field="id" data-bind="source: followtypeSource, value: tinvestigation.followtype" ></select>
            <input id="otherinput" type="text" class="k-input"  style="width:150px; display:none;" data-bind="value:tinvestigation.followtypeotherremark" />
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><textarea  class="k-textbox"  style="width:430px;" data-bind="value:tinvestigation.followremark"></textarea></td>
        </tr>
      </table>
  </div>  
  </div>                               
</body>
</html>
<script type="text/x-kendo-template" id="investigationFileTemplate">

			<div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="investigationFile"  /><a name="investigationDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>

</script>
<script>
$("#uploadInvestigationFile").parent().removeClass("k-button k-upload-button");
$("#uploadInvestigationFile").parent().parent().removeClass("k-dropzone");
$("#uploadInvestigationFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
$("#uploadInvestigationFile").parent().addClass("filednewcss");  

</script>
