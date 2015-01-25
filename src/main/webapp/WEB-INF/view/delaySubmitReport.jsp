<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="commonValue.jsp"%>
<script type="text/javascript" src="<%=resourcesPath%>/js/delaySubmitReport.js"></script>
<html>
<head>


</head>

<body>    
<div id="delaySubmitReportContent">
<input type="hidden" value="${type}" id="type">
<input type="hidden" value="${num}" id="num">
  <div  id="DelayReport" class="lineh">
  	<select  data-role='dropdownlist' data-text-field="name" data-value-field="id" data-bind="source:changeNos,value:currentdsReportNo,events:{change:dsReportChangeNos}"    class="floatleft" >	</select>                       
  	 <div class="floatright curs">
        <img src="<%=resourcesPath%>/img/Modify.png" data-bind="click:editDelaySubmit" id="Edit-DelayReport" title="編輯">
        <img src="<%=resourcesPath%>/img/Delete.png" data-bind="click:deleteDelaySubmitReport" title="刪除">
        <img src="<%=resourcesPath%>/img/Upload.png" title="上傳附件">
     </div>
          <!-- 文件上傳 -->
     <div class="filediv">
	 <div class="fileinput">
	 <input name="files" id="uploadDelaySubmitReportFile" type="file" style="opacity: 0;width: 30px;height: 30px;"/>
     </div>
     </div>
     <!--  -->
   	 <div class="clearboth"></div>
     <div class="fontcolor fontweight floatleft">企業申請延遲</div>
     <div class="divcss3 floatright"></div>
     <div class="clearboth"></div>
     <table width="100%" cellpadding="0" border="0" cellspacing="0" >
         <tr>
            <td width="30%" align="right" class="fontcolor">申請延遲提交報告日期：</td>
            <td align="left" width="20%" ><span data-bind="text:dsReport.requestdelaydate"></td>
            <td width="25%" class="fontcolor" align="right">擬延遲提交報告：</td>
            <td align="left"><span data-bind="text:dsReport.reportdraft"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td align="left"><span data-bind="text:dsReport.suggestioncode"></td>
            <td width="25%" class="fontcolor" align="right">批示日期：</td>
            <td align="left"><span data-bind="text:dsReport.approvedate"></td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" colspan="3"><span data-bind="text:approveresult"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:dsReport.delayremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%" class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td align="left" ><span data-bind="text:dsReport.replycode"></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知之日：</td>
            <td align="left" ><span data-bind="text:dsReport.receivedate"></td>
        </tr>
        <tr>

            <td class="fontcolor" align="right">准許延遲提交報告期限：</td>
            <td align="left"  colspan="3"><span data-bind="text:dsReport.approvedelaydate"></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><span data-bind="text:dsReport.replyremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%"  class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" ><span data-bind="text:followtypeStr"></span>&nbsp;&nbsp;
               <span id="followtypeotherremarkspan"  data-bind="text:dsReport.followtypeotherremark">           
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><span data-bind="text:dsReport.followremark"></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">附 件</div>
      <div class="divcss6 floatright"></div>
      <div class="clearboth"></div>
        <div class="margin3" id="selectFile">
                  <input type="button" class="buttoncs" id="selectAll" value="全選"  />
                  <input type="button" class="buttoncs"  value="刪除" onclick="delaySubmitReportFile()"/><br>
               	<span data-template="DelaySubmitReportTemplate" data-bind="source: fileSource_DelaySubmitReport"></span>
                </div>  
  </div>  
  
  <div id="DelayReport-edit" class="lineh" style="display:none;"> 
      <div class="floatleft" id="editdiv">編輯延遲提交報告</div>
      <div class="floatright curs">
        <img class="save-DelayReport" data-bind="click:saveDleaySubmitReport" src="<%=resourcesPath%>/img/save.png">
    	<img class="save-DelayReport" data-bind="click:cancelDelaySubmit" src="<%=resourcesPath%>/img/Cancel.png" >
      </div>
      <div class="clearboth"></div>
   
      <table width="100%" cellpadding="0" cellspacing="0" >
         <tr>
            <td width="35%" align="right" class="fontcolor">申請延遲提交報告日期：</td>
            <td align="left" ><input   data-bind="value:dsReport.requestdelaydate"  style="width:152px;"  data-role="datepicker" data-format="yyyy-MM-dd" /></td>
            <td width="25%" class="fontcolor" align="right">擬延遲提交報告：</td>
            <td align="left"><input type="text" class="k-input" data-bind="value:dsReport.reportdraft"   style="width:150px;"/></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">建議書編號：</td>
            <td align="left"><input type="text" class="k-input"  data-bind="value:dsReport.suggestioncode"  style="width:150px;"/></td>
            <td width="25%" class="fontcolor" align="right">批示日期：</td>
            <td align="left"><input  data-role="datepicker" data-format="yyyy-MM-dd"  data-bind="value:dsReport.approvedate"   style="width:152px;" /></td>
        </tr>
         <tr>
            <td class="fontcolor" align="right">批示決定：</td>
            <td align="left" colspan="3">
             <select data-role='dropdownlist' style="width:130px;" data-text-field="text" data-value-field="id" data-bind="source: approvereSource, value: dsReport.approveresult" ></select>
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  data-bind="value:dsReport.delayremark"  style="width:400px;"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">基金回覆</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="35%" class="fontcolor" align="right">回覆申請通知函編號：</td>
            <td align="left" ><input type="text" class="k-input"  style="width:150px;"  data-bind="value:dsReport.replycode" /></td>
            <td width="25%" class="fontcolor" align="right">企業獲通知之日：</td>
            <td align="left" ><input data-role="datepicker" data-format="yyyy-MM-dd" style="width:152px;"  data-bind="value:dsReport.receivedate"/></td>
        </tr>
        <tr>

            <td class="fontcolor" align="right">准許延遲提交報告期限：</td>
            <td align="left"  colspan="3"><input data-role="datepicker" data-format="yyyy-MM-dd" data-bind="value:dsReport.approvedelaydate" style="width:152px;" /></td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left" colspan="3"><textarea  class="k-textbox"  data-bind="value:dsReport.replyremark"   style="width:400px;"></textarea></td>
        </tr>
      </table>
      <div class="fontcolor fontweight floatleft">跟進程序</div>
      <div class="divcss7 floatright"></div>
      <div class="clearboth"></div>
      <table width="100%" cellpadding="0" cellspacing="0" >
        <tr>
            <td width="30%"  class="fontcolor" align="right">須展開之跟進程序：</td>
            <td align="left" >
            <select data-role='dropdownlist' style="width:130px;" data-text-field="text" data-value-field="id" data-bind="source: followtypeSource, value: dsReport.followtype,events:{change:changedsReportFllow}" ></select>
             <input id="otherinput" type="text" class="k-input"  data-bind="value:dsReport.followtypeotherremark"  style="width:150px; display:none;"/>
            </td>
        </tr>
        <tr>
            <td class="fontcolor" align="right">備註：</td>
            <td align="left"><textarea  class="k-textbox"   data-bind="value:dsReport.followremark" style="width:400px;"></textarea></td>
        </tr>
      </table>
  </div>            
  </div>                     
</body>
</html>
<script type="text/x-kendo-template" id="DelaySubmitReportTemplate">
			<div><input type="checkbox" class="k-checkbox"  id="tfile#:fileid#" value="#:fileid#" name="CKDelaySubmitReportFile"  /><a name="investigationDownFile" href="<%=contextPath%>/file/downloadFile?fileid=#:fileid#">#:filename#</a></div>
</script>
<script>
$("#uploadDelaySubmitReportFile").parent().removeClass("k-button k-upload-button");
$("#uploadDelaySubmitReportFile").parent().parent().removeClass("k-dropzone");
$("#uploadDelaySubmitReportFile").parent().parent().parent().removeClass("k-widget k-upload k-header k-upload-empty");
$("#uploadDelaySubmitReportFile").parent().addClass("filednewcss");  

</script>