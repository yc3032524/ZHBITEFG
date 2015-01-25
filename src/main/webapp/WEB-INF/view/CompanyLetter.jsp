<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>詳細資料</title>
<script type="text/javascript" src="<%=resourcesPath%>/js/CompanyLetter.js"></script>

</head>
<body>
<div id="CompanyLetterFormContent">   
<input type="hidden" value="${type}" id="type">
<input type="hidden" value="${num}" id="num">
  <div  id="CompanyLetterForm" class="lineh"> 
  	<select  data-role='dropdownlist' data-text-field="name" data-value-field="id" data-bind="source:changeNos,value:currenTCompanyLetterNo,events:{change:companyletterChangeNos}"    class="floatleft" >	</select>                  
  	 <div class="floatright curs">
        <img src="<%=resourcesPath%>/img/Modify.png" id="Edit-CompanyLetterForm" title="編輯">
        <img src="<%=resourcesPath%>/img/Delete.png" data-bind="click:deleteCompanyletter" title="刪除">
        <img src="<%=resourcesPath%>/img/Upload.png" title="上傳附件">
     </div>
     <!-- 文件上傳 -->
     <div class="filediv">
    <div class="fileinput">
    <input name="files" id="uploadCompanyletterFile" type="file" style="opacity: 0;width: 30px;height: 30px;"/>
     </div>
     </div>
     <!--  -->
	 <div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">收件內容</div>
     <div class="divcss7 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">事由：</td>
            <td align="left" colspan="3" ><span data-bind="text:tcompanyletter.reason"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">來函方式：</td>
            <td align="left" colspan="3"><span data-bind="text:recevietypeStr"/></td>
        </tr>
         <tr>
            <td width="30%" class="fontcolor" align="right">收件編號：</td>
            <td width="27%" align="left"><span data-bind="text:tcompanyletter.lettercode"/></td>
            <td width="25%" class="fontcolor" align="right">收件日期：</td>
            <td width="18%" align="left"><span data-bind="text:tcompanyletter.letterdate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:tcompanyletter.letterremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆企業函件編號：</td>
            <td width="27%" align="left" ><span data-bind="text:tcompanyletter.replylettercode"/></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td width="18%" align="left" ><span data-bind="text:tcompanyletter.companyreceivedate"/></td>
        </tr>
        <tr>
			<td class="fontcolor" align="right">企業回覆期限：</td>
            <td align="left" ><span data-bind="text:tcompanyletter.companyreplydeadline"/></td>
            <td class="fontcolor" align="right">企業已回覆日期：</td>
            <td align="left" ><span data-bind="text:tcompanyletter.comnpanyreplydate"/></td>
        </tr>
       <!--  <tr>
            <td class="fontcolor" align="right">企業回覆是否符合要求：</td>
            <td align="left" colspan="3"><span data-bind="text:iscompanyreplysatisfys"/></td>
        </tr> -->
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:tcompanyletter.replyremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%"  class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" ><span data-bind="text:companyletterfollowtypeStr"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><span data-bind="text:tcompanyletter.followremark"/></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">附 件</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
       <div class="margin3" id="selectFile">
                  <input type="button" class="buttoncs" id="selectAll" value="全選"  />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delcompanyletterFromFile()"/><br>
               	<span data-template="companyletterFileTemplate" data-bind="source: fileSource_companyletter"></span>
                </div>  
  </div>  
  <div id="CompanyLetterForm-edit" class="lineh" style="display:none;"> 
      <div class="floatleft" >編輯企業來函資料</div>
      <div class="floatright curs">
        <img class="Save-CompanyLetterForm" data-bind="click:saveCompanyletter" src="<%=resourcesPath%>/img/save.png">
    	<img class="Save-CompanyLetterForm" src="<%=resourcesPath%>/img/Cancel.png" >
      </div>
	<div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">收件內容</div>
     <div class="divcss7 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">事由：</td>
            <td align="left" colspan="3" ><input type="text" class="k-input"  style="width:150px;" data-bind="value:tcompanyletter.reason"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">收件方式：</td>
            <td align="left" colspan="3">
            <select data-role='dropdownlist' style="width:180px;" onChange="recevietypeonChange(this)" data-text-field="text" data-value-field="id" data-bind="source: recevietypeSource, value: tcompanyletter.recevietype" ></select>
            <input id="RecevieTypeOther" type="text" class="k-input"  style="width:150px; display:none;" data-bind="value:tcompanyletter.recevietypeotherremark"/></td>
            
        </tr>
         <tr>
            <td width="30%" class="fontcolor" align="right">收件編號：</td>
            <td width="25%" align="left"><input type="text" class="k-input"  style="width:150px;" data-bind="value:tcompanyletter.lettercode" /></td>
            <td width="25%" class="fontcolor" align="right">收件日期：</td>
            <td width="20%" align="left"><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tcompanyletter.letterdate"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  style="width:400px;" data-bind="value:tcompanyletter.letterremark" ></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆企業函件編號：</td>
            <td width="25%" align="left" ><input type="text" class="k-input"  style="width:150px;" data-bind="value:tcompanyletter.replylettercode"/></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td width="20%" align="left" ><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tcompanyletter.companyreceivedate" /></td>
        </tr>
        <tr>
			<td class="fontcolor" align="right">企業回覆期限：</td>
            <td align="left" ><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tcompanyletter.companyreplydeadline"/></td>
            <td class="fontcolor" align="right">企業已回覆日期：</td>
            <td align="left" ><input data-role="datepicker" style="width:152px;" data-format="yyyy-MM-dd"  data-bind="value:tcompanyletter.comnpanyreplydate"/></td>
        </tr>
<!--         <tr>
            <td class="fontcolor" align="right" >企業回覆是否符合要求：
            <input  id="radioyes" value="1" type="radio"   onchange="btnRadio(1)" name="radios">&nbsp;是
	        <input id="radiono" value="2"  type="radio"   onchange="btnRadio(2)"  name="radios">否	
	        </td>
        </tr> -->
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  style="width:400px;"data-bind="value:tcompanyletter.replyremark" ></textarea></td>
        </tr>
      </table>
      <div id="FollowPro" >
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%"  class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" >
            <select data-role='dropdownlist' style="width:180px;" onChange="followtypeotheronChange(this)" data-text-field="text" data-value-field="id" data-bind="source: followtypeSource, value: tcompanyletter.followtype" ></select>
            <input id="otherinput" type="text" class="k-input"  style="width:150px; display:none;" data-bind="value:tcompanyletter.followtypeotherremark" />
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><textarea  class="k-textbox"  style="width:400px;" data-bind="value:tcompanyletter.followremark" ></textarea></td>
        </tr>
      </table>
  </div>  
  </div>                               
</body>
</html>
<script type="text/x-kendo-template" id="companyletterFileTemplate">

			<div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="companyletterFile"  /><a name="companyletterDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>

</script>
<script>
$("#uploadCompanyletterFile").parent().removeClass("k-button k-upload-button");
$("#uploadCompanyletterFile").parent().parent().removeClass("k-dropzone");
$("#uploadCompanyletterFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
$("#uploadCompanyletterFile").parent().addClass("filednewcss");  

</script>