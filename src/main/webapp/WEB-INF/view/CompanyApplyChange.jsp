<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>詳細資料</title>
<script type="text/javascript" src="<%=resourcesPath%>/js/CompanyApplyChange.js"></script>

</head>
<body>
<div id="CompanyApplyChangeFormContent">  
<input type="hidden" value="${type}" id="type">
<input type="hidden" value="${num}" id="num"> 
  <div  id="CompanyApplyChangeForm" class="lineh"> 
  	<select  data-role='dropdownlist' data-text-field="name" data-value-field="id" data-bind="source:changeNos,value:currentCompanyApplyChangeNo,events:{change:companyApplyChangeNos}"    class="floatleft" >	</select>                      
  	 <div class="floatright curs">
        <img src="<%=resourcesPath%>/img/Modify.png" id="Edit-CompanyApplyChangeForm" title="編輯">
        <img src="<%=resourcesPath%>/img/Delete.png" data-bind="click:deleteCompanyApplyChange" title="刪除">
        <img src="<%=resourcesPath%>/img/Upload.png" title="上傳附件"> 
     </div>
      <!-- 文件上傳 -->
     <div class="filediv">
	 <div class="fileinput">
	 <input name="files" id="uploadCompanyapplychangeFile" type="file" style="opacity: 0;width: 30px;height: 30px;"/>
     </div>
     </div>
	 <div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">企業申請調撥</div>
     <div class="divcss3 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">申請函收件日期：</td>
            <td width="25%" align="left"><span data-bind="text:tcompanyapplychange.receivedate"/></td>
            <td width="25%" align="right" class="fontcolor">擬調撥之報告期：</td>
            <td width="20%" align="left"><span data-bind="text:tcompanyapplychange.reportdate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">來函方式：</td>
            <td align="left" colspan="3"><span data-bind="text:lettertypeStr"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td align="left" colspan="3"><span data-bind="text:tcompanyapplychange.suggestioncode"/></td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" ><span data-bind="text:companyapplychangeapprovalresult"/></td>
            <td class="fontcolor" align="right">批示日期：</td>
            <td align="left" ><span data-bind="text:tcompanyapplychange.approvaldate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:tcompanyapplychange.remark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td width="25%" align="left" ><span data-bind="text:tcompanyapplychange.replylettercode"/></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td width="20%" align="left" ><span data-bind="text:tcompanyapplychange.companyreceivedate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:tcompanyapplychange.replyremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
<!--       <tr>
            <td class="fontcolor" align="right">是否有跟進程序：</td>
            <td align="left" colspan="3"><span data-bind="text:isfollowups"/></td>
        </tr> -->
        <tr>
            <td  width="30%" class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" ><span data-bind="text:companyapplychangefollowtypeStr"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><span data-bind="text:tcompanyapplychange.followremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">附 件</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
     	<div class="margin3" id="selectFile">
                  <input type="button" class="buttoncs" id="selectAll" value="全選"  />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delcompanyapplychangeFromFile()"/><br>
               	<span data-template="companyapplychangeFileTemplate" data-bind="source: fileSource_companyapplychange"></span>
                </div> 
    
  </div>

  <div id="CompanyApplyChangeForm-edit" class="lineh" style="display:none;"> 
      <div class="floatleft" >編輯企業申請調撥</div>
      <div class="floatright curs">
        <img class="Save-CompanyApplyChangeForm" data-bind="click:saveCompanyApplyChange" src="<%=resourcesPath%>/img/save.png">
    	<img class="Save-CompanyApplyChangeForm" src="<%=resourcesPath%>/img/Cancel.png" >
      </div>
	<div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">企業申請調撥</div>
     <div class="divcss3 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">申請函收件日期：</td>
            <td width="25%" align="left"><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd" data-bind="value:tcompanyapplychange.receivedate"/></td>
            <td width="25%" align="right" class="fontcolor">擬調撥之報告期：</td>
            <td width="20%" align="left"><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd" data-bind="value:tcompanyapplychange.reportdate" /></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">來函方式：</td>
            <td align="left" colspan="3">
            <select data-role='dropdownlist' style="width:180px;" onChange="lettertypeonChange(this)" data-text-field="text" data-value-field="id" data-bind="source: lettertypeSource, value: tcompanyapplychange.lettertype" ></select>
            <input id="lettertypeotherinput" type="text" class="k-input"  style="width:150px; display:none;" data-bind="value:tcompanyapplychange.lettertypeotherremark"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td align="left" colspan="3"><input type="text" class="k-input"  style="width:150px;" data-bind="value:tcompanyapplychange.suggestioncode"/></td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" >
            <select data-role='dropdownlist' style="width:180px;" data-text-field="text" data-value-field="id" data-bind="source: approvereSource, value: tcompanyapplychange.approvalresult" ></select>
            </td>
            <td class="fontcolor" align="right">批示日期：</td>
            <td align="left" ><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd" data-bind="value:tcompanyapplychange.approvaldate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  style="width:430px;" data-bind="value:tcompanyapplychange.remark"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td width="25%" align="left" ><input type="text" class="k-input"  style="width:150px;"data-bind="value:tcompanyapplychange.replylettercode"/></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td width="20%" align="left" ><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tcompanyapplychange.companyreceivedate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  style="width:430px;" data-bind="value:tcompanyapplychange.replyremark"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
<!--       	<tr>
            <td width="30%" class="fontcolor" align="right">是否有跟進程序：
            <input  id="radioyes" value="1" type="radio"   onchange="btnRadio(1)" name="radios">&nbsp;是
	        <input id="radiono" value="2"  type="radio"   onchange="btnRadio(2)"  name="radios">&nbsp;否	
	        </td></td>
        </tr> -->

        <tr id="FollowPro">
            <td width="30%" class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" >
			<select data-role='dropdownlist' style="width:180px;" onChange="companyapplychangefollowtypeonChange(this)" data-text-field="text" data-value-field="id" data-bind="source: followtypeSource, value: tcompanyapplychange.followtype" ></select>
            <input id="otherinput" type="text" class="k-input"  style="width:150px; display:none;" data-bind="value:tcompanyapplychange.followtypeotherremark"/>
            </td>
        </tr>
    
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><textarea  class="k-textbox"  style="width:430px;" data-bind="value:tcompanyapplychange.followremark"></textarea></td>
        </tr>
      </table>
  </div>                                      
</body>
</html>
<script type="text/x-kendo-template" id="companyapplychangeFileTemplate">

			<div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="companyapplychangeFile"  /><a name="companyapplychangeDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>

</script>
<script>
$("#uploadCompanyapplychangeFile").parent().removeClass("k-button k-upload-button");
$("#uploadCompanyapplychangeFile").parent().parent().removeClass("k-dropzone");
$("#uploadCompanyapplychangeFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
$("#uploadCompanyapplychangeFile").parent().addClass("filednewcss");  

</script>