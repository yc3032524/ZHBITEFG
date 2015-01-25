<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<script type="text/javascript" src="<%=resourcesPath%>/js/pauseWork.js"></script>
<html>
<head>
<script type="text/javascript" language="javascript">
$(document).ready(function() {
	 	
	
	$("#Other").click(function(){
		$('#Otherinput').show();
	});
	
  
 });  

</script>

</head>

<body>    
<div id="pauseWorkDiv">
<input type="hidden" value="${type}" id="type">
<input type="hidden" value="${num}" id="num">
  <div  id="Suspension" class="lineh"> 
<select  data-role='dropdownlist' data-text-field="name" data-value-field="id" data-bind="source:changeNos,value:currentPwokNo,events:{change:pworkChangeNos}"    class="floatleft" >	</select>         
  	 <div class="floatright curs">
        <img src="<%=resourcesPath%>/img/Modify.png" data-bind="click:editPauseWork" id="Edit-Suspension" title="編輯">
        <img src="<%=resourcesPath%>/img/Delete.png" data-bind="click:deletePauseWork" title="刪除">
        <img src="<%=resourcesPath%>/img/Upload.png" title="上傳附件">
     </div>
          <!-- 文件上傳 -->
     <div class="filediv">
	 <div class="fileinput">
	 <input name="files" id="uploadPauseWorkFile" type="file" style="opacity: 0;width: 30px;height: 30px;"/>
     </div>
     </div>
     <!--  -->
     <div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">企業申請暫停</div>
     <div class="divcss3 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">申請暫停項目日期：</td>
            <td align="left" colspan="3"><span data-bind="text:pwork.requestpausedate"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td align="left"><span data-bind="text:pwork.suggestioncode"></td>
            <td width="25%" class="fontcolor" align="right">批示日期：</td>
            <td align="left"><span data-bind="text:pwork.approvedate"></td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" colspan="3"><span data-bind="text:approveresult"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:pwork.pauseremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td align="left" ><span data-bind="text:pwork.replycode"></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td align="left" ><span data-bind="text:pwork.receivedate"></td>
        </tr>
        <tr>

            <td class="fontcolor" align="right">准許企業暫停項目期限：</td>
            <td align="left"  colspan="3"><span data-bind="text:pwork.approvepausedate"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:pwork.replyremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss3 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
<!--       	<tr> -->
<!--             <td width="30%" class="fontcolor" align="right">是否有跟進程序：</td> -->
<!--             <td align="left" ><span data-bind="text:isfollowupstr"></td> -->
<!--         </tr> -->
        <tr id="follwtypeTR">
            <td class="fontcolor" align="right" width="30%"  >須展開之跟進程序：</td>
            <td align="left" ><span data-bind="text:followtypeStr"></span>&nbsp;&nbsp;
            <span id="followtypeotherremarkspan"  data-bind="text:pwork.followtypeotherremark">
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><span data-bind="text:pwork.followremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">附 件</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
     <div class="margin3" id="selectFile">
                  <input type="button" class="buttoncs" id="selectAll" value="全選"  />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delpauseWork()"/><br>
               	<span data-template="pauseWorkTemplate" data-bind="source: fileSource_pauseWork"></span>
                </div>  
    
  </div>  
  
  <div id="Suspension-edit" class="lineh" style="display:none;"> 
      <div class="floatleft" id="editdiv">編輯暫停項目程序</div>
      <div class="floatright curs">
        <img class="save-Suspension" data-bind="click:savePauseWork" src="<%=resourcesPath%>/img/save.png">
    	<img class="save-Suspension" data-bind="click:cancelPauseWork" src="<%=resourcesPath%>/img/Cancel.png" >
      </div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">申請暫停項目日期：</td>
            <td align="left" colspan="3"><input data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:pwork.requestpausedate"  style="width:152px;" /></td>
        </tr>
        <tr>
            <td width="30%" class="fontcolor" align="right">建議書編號：</td>
            <td width="25%" align="left"><input type="text" class="k-input"  style="width:150px;" data-bind="value:pwork.suggestioncode" /></td>
            <td width="25%" class="fontcolor" align="right">批示日期：</td>
            <td width="20%" align="left"><input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:pwork.approvedate"  style="width:152px;" /></td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" colspan="3">
            <select data-role='dropdownlist' style="width:130px;" data-text-field="text" data-value-field="id" data-bind="source: approvereSource, value: pwork.approveresult" ></select>
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox" data-bind="value:pwork.pauseremark" style="width:400px;"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td width="25%" align="left" ><input type="text" class="k-input"   data-bind="value:pwork.replycode"  style="width:150px;"/></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td width="20%" align="left" ><input  data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:pwork.receivedate"  style="width:152px;" /></td>
        </tr>
        <tr>

            <td class="fontcolor" align="right">准許企業暫停項目期限：</td>
            <td align="left"  colspan="3"><input data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:pwork.approvepausedate" style="width:152px;" /></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  data-bind="value:pwork.replyremark"  style="width:400px;"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
<!--       	<tr> -->
<!--             <td width="28%" class="fontcolor" align="right">是否有跟進程序：</td> -->
<!--             <td align="left" > -->
<!-- 	            <input type="radio" value="1" id="radioyes"  onchange="btnRadio(1)" name="radios">&nbsp;是 -->
<!-- 	            <input id="radiono" value="2"  type="radio"   onchange="btnRadio(2)"  name="radios">&nbsp;否 -->
<!--              </td> -->
<!--         </tr> -->
        <tr id="selectyes" >
            <td class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" >
        <select data-role='dropdownlist' style="width:130px;" data-text-field="text" data-value-field="id" data-bind="source: followtypeSource, value: pwork.followtype,events:{change:changePauseFllow}" ></select>
            <input id="otherinput" type="text" class="k-input"  data-bind="value:pwork.followtypeotherremark"  style="width:150px; display:none;"/>
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><textarea  class="k-textbox"   data-bind="value:pwork.followremark" style="width:400px;"></textarea></td>
        </tr>
      </table>
  </div>          
</div>                       
</body>

</html>
<script type="text/x-kendo-template" id="pauseWorkTemplate">
			<div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="CkPauseWorkFile"  /><a name="pauseWorkFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
<script>
$("#uploadPauseWorkFile").parent().removeClass("k-button k-upload-button");
$("#uploadPauseWorkFile").parent().parent().removeClass("k-dropzone");
$("#uploadPauseWorkFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
$("#uploadPauseWorkFile").parent().addClass("filednewcss");  

</script>