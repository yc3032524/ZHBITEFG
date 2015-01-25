<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<script type="text/javascript" src="<%=resourcesPath%>/js/delayWork.js"></script>
<html>
<head>


</head>

<body>    
<div id="delayWorkDiv">
<input type="hidden" value="${type}" id="type">
<input type="hidden" value="${num}" id="num">
  <div  id="DelayProject" class="lineh">  
  	 <div class="floatleft">
<select  data-role='dropdownlist' data-text-field="name" data-value-field="id" data-bind="source:changeNos,value:currentDwokNo,events:{change:dworkChangeNos}"    class="floatleft" >	</select>
     </div>                   
  	 <div class="floatright curs">
        <img src="<%=resourcesPath%>/img/Modify.png" data-bind="click:editDelayWork" id="Edit-DelayProject" title="編輯">
        <img src="<%=resourcesPath%>/img/Delete.png" data-bind="click:deleteDelayWork" title="刪除">
        <img src="<%=resourcesPath%>/img/Upload.png" title="上傳附件">
     </div>
   	   <!-- 文件上傳 -->
     <div class="filediv">
	 <div class="fileinput">
	 <input name="files" id="uploadDelayWorkFile" type="file" style="opacity: 0;width: 30px;height: 30px;"/>
     </div>
     </div>
     <!--  -->
     <div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">企業申請延遲</div>
     <div class="divcss3 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">申請延遲開展項目日期：</td>
            <td align="left" colspan="3">
            <span data-bind="text:dwork.requestdelaydate"></span>
            &nbsp;&nbsp;<span class="c-Red">可申請延遲期限：</span>
            <span class="c-Red" data-bind="text:dwork.surerequestdelaytime"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td align="left"><span data-bind="text:dwork.suggestioncode"></td>
            <td width="25%" class="fontcolor" align="right">批示日期：</td>
            <td align="left"><span data-bind="text:dwork.approvedate"></td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" colspan="3"><span data-bind="text:approveresult"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:dwork.delayremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td align="left" ><span data-bind="text:dwork.replycode"></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td align="left" ><span data-bind="text:dwork.receivedate"></td>
        </tr>
        <tr>

            <td class="fontcolor" align="right">准許延遲開展期限：</td>
            <td align="left"  colspan="3"><span data-bind="text:dwork.delayduedate"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:dwork.replyremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">附 件</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
      	<table width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<div class="margin3" id="selectFile">
				        <input type="button" class="buttoncs" id="selectAll" value="全選"  />
                  <input type="button" class="buttoncs"  value="刪除" onclick="deldelayWorkFile()"/><br>
              	<span data-template="delayWorkFileTemplate" data-bind="source: fileSource_delayWork"></span>
						</div>
					</td>
				</tr>
			</table>
  </div>  
  
  <div id="DelayProject-edit" class="lineh" style="display:none;"> 
      <div class="floatleft" >編輯申請延遲開展項目資料</div>
      <div class="floatright curs">
        <img class="save-DelayProject" data-bind="click:saveDelayWork" src="<%=resourcesPath%>/img/save.png">
    	<img class="save-DelayProject" data-bind="click:cancelDelayWork" src="<%=resourcesPath%>/img/Cancel.png" >
      </div>
      <div class="clearboth"></div>
      <div class="fontcolor fontweight floatleft">企業申請延遲</div>
     <div class="divcss3 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">申請延遲開展項目日期：</td>
            <td align="left" colspan="3">
            <input data-role="datepicker" data-format="yyyy-MM-dd"  style="width:130px;"  data-bind="value:dwork.requestdelaydate"  />&nbsp;&nbsp;
            <span class="c-Red">可申請延遲期限：</span> <span class="c-Red" data-bind="text:dwork.surerequestdelaytime">
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td width="25%" align="left">
            	<input type="text" class="k-input"   data-bind="value:dwork.suggestioncode"  style="width:130px;"/>
            </td>
            <td width="25%" class="fontcolor" align="right">批示日期：</td>
            <td width="20%" align="left">
            	<input data-role="datepicker" data-format="yyyy-MM-dd" style="width:130px;" data-bind="value:dwork.approvedate"  />
            </td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" colspan="3">
                         <select data-role='dropdownlist' style="width:130px;" data-text-field="text" data-value-field="id" data-bind="source: approvereSource, value: dwork.approveresult" ></select>
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox" data-bind="value:dwork.delayremark"  style="width:450px;"></textarea></td>
        </tr>
      </table> 
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%"  class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td width="25%" align="left" ><input type="text" class="k-input"  style="width:130px;"    data-bind="value:dwork.replycode" /></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知日期：</td>
            <td width="20%" align="left" ><input data-role="datepicker" data-format="yyyy-MM-dd"    data-bind="value:dwork.receivedate"  style="width:130px;" /></td>
        </tr>
        <tr>

            <td class="fontcolor" align="right">准許延遲開展期限：</td>
            <td align="left"  colspan="3"><input data-role="datepicker" data-format="yyyy-MM-dd"  data-bind="value:dwork.delayduedate"  style="width:130px;" /></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"   data-bind="value:dwork.replyremark"  style="width:450px;"></textarea></td>
        </tr>
      </table>
  </div>                        
  </div>         
</body>
</html>
<script type="text/x-kendo-template" id="delayWorkFileTemplate">
			<div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="ckDelayWorkFile"  /><a name="delayWorkFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
<script>
$("#uploadDelayWorkFile").parent().removeClass("k-button k-upload-button");
$("#uploadDelayWorkFile").parent().parent().removeClass("k-dropzone");
$("#uploadDelayWorkFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
$("#uploadDelayWorkFile").parent().addClass("filednewcss");  

</script>
