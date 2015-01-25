<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="index.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>詳細資料</title> 
<script type="text/javascript" src="<%=resourcesPath %>/js/detailinfo.js"></script> 
<script type="text/x-kendo-template" id="basicApplytypeTemp">
    <tr>
        <td align="right" width="30%">#:cname#<input name="basicApplycyptCK#:applytypeid#" value="#:applytypeid#" type="checkbox" onclick="showChildText(this)"/></td>
        <td><div style="display:none;" id="basicNumDiv#:applytypeid#"><input id="basicSupportNum#:applytypeid#" type="text" class="k-input" size="26"/>個月</div></td>
    </tr>
</script>
</head>

<body>
   
	<%--<input type="hidden" id="basic_caseid" value="C3C0B0A5-B79B-4E32-8EED-7F9EE288B406"/>--%>
	
    <input type="hidden" id="basic_caseid" value="${caseid }"/> 

    <div class="Basic" id="detailinfoContent">
        <!--header-->

        <!--conter-->
        <div id="conter1">
            <div class=" title3 title-style">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                    <tr>
                        <td align="left" width="85%">
                            <div class="floatleft m-left1"><img src="<%=resourcesPath%>/img/title4.png"></div>
                            <div class="floatleft title-padding">卷宗編號：<span data-bind="text:basicApplication.casecode"/></div>
                        </td>
                        <td align="right">
                            <img class="valign"  src="<%=resourcesPath%>/img/new_b.png">
                        </td>
                        <td align="left">
                            <ul id="newmenu" >
                                <li>添加項目事項
                                    <ul id="addProjectItem">
                                        <li index='0'>協議書</li>
                                        <li index='1' data-bind='visible:addItemVisible'>報告內容</li>
                                        <li index='2' data-bind='visible:addItemVisible'>基金通知</li>
                                        <li index='3' data-bind='visible:addItemVisible'>延遲開展項目</li>
                                        <li index='4' data-bind='visible:addItemVisible'>項目中止發放</li>
                                        <li index='5' data-bind='visible:addItemVisible'>暫停項目程序</li>
                                        <li index='6' data-bind='visible:addItemVisible'>延遲提交報告</li>
                                        <li index='7' data-bind='visible:addItemVisible'>取消批給程序</li>
                                        <li index='8' data-bind='visible:addItemVisible'>審計或調查</li>
                                        <li index='9' data-bind='visible:addItemVisible'>企業來函</li>
                                        <li index='10' data-bind='visible:addItemVisible'>企業申請調撥</li>
                                    </ul>  
                                </li>     
                            </ul>
                        </td>
                    </tr>   
                </table>
            </div>
            <table class="CaseDetails" width="100%" cellpadding="0" cellspacing="0" >
                <tr>
                    <td valign="top" class="tbborder" style="background-color:#FFF5E9;">
                      <table width="100%" cellpadding="0" cellspacing="0"  class=" BasicMessage p-top tbborder-bottom" style="font-size: 14px;">
                          <tr>
                            <td align="right" valign="top">資助方式：</td>
                            <td align="left" width="70px" id="basicApplytypeText"></td>
                        </tr>
                        <tr>
                            <td align="right" valign="top">項目名稱：</td>
                            <td align="left" width="70px"><span data-bind="text:basicApplication.projectname"/></td>
                        </tr>
                          <tr>
                            <td align="right" valign="top">企業名稱：</td>
                            <td align="left" width="70px"><span data-bind="text:basicApplication.compnaycname"/></td>
                        </tr>
                          <tr>
                            <td align="right">總資助金額：</td>
                            <td align="left"><span data-bind="text:totalSubsidyAmount"/></td>
                        </tr>
                        <tr>
                            <td align="right">已發放金額：</td>
                            <td align="left"><span data-bind="text:haveBeenIssuedAmount"/></td>
                        </tr>
                          <tr>
                            <td align="right">發放總期數：</td>
                            <td align="left"><span data-bind="text:basicAgreement.financenum"/>個</td>
                        </tr>
                          <tr>
                            <td align="right">報告期數：</td>
                            <td align="left"><span data-bind="text:basicAgreement.reportnum"/>個</td>
                        </tr>
                    </table>
                    <div class="status">
                        <div id="basicDelayWork" style="display: none;">
	                        <div class="statusfont" align="left">准許延遲開展期限</div>
	                        <div class="m-bottom" align="left" id="DelayWorkData"></div>
                        </div>
                        <div id="basicStopFinance" style="display: none;">
	                        <div class="statusfont" align="left">中止發放</div>
	                        <div class="m-bottom" align="left" id="StopFinanceData"></div>
                        </div>
                        <div id="basicPauseWork" style="display: none;">
	                        <div class="statusfont" align="left">暫停項目</div>
	                        <div class="m-bottom" align="left" id="PauseWorkData"></div>
                        </div>
                        <div id="basicCancelContract" style="display: none; width: 140px;">
	                        <div class="statusfont" align="left">取消批給</div>
	                        <div class="m-bottom" align="left" id="CancelContractData"></div>
                        </div>
                        <div style="margin-top: 50px;">
                            <table>
                                <tr class="fontcolor1">
		                            <td align="right">跟進人員：</td>
		                            <td align="left"><span data-bind="text:responsible"/></td>
		                        </tr>
		                         <tr class="fontcolor1">
		                            <td align="right">最後更新時間：</td>
		                            <td align="left"><span data-bind="text:lastTimeData"/></td>
		                        </tr>
                            </table>                            
                        </div>
                    </div>
                    </td>
                    <td  valign="top">
                        <div id="getId" class="m-top" style="font-size: 14px;">
                            <div class="tabT">
                                <ul class="tab" id="leftMenuItem">
	                                <li id="tabId1" class="current" onclick="tab('tabId1','tabC1');forwordJSP('/detail/showJSP?forwordJSP=ApplicationForm');">申請表內容</li>
	                                <li id="tabId2" class="default" data-bind="visible:showAgreementVisiblePage" onclick="tab('tabId2','tabC2');forwordJSP('/detail/showJSP?forwordJSP=Protocol');">協議書內容</li>
	                                <li id="tabId3" class="default" data-bind="visible:showReportVisiblePage" onclick="tab('tabId3','tabC3');forwordJSP('/detail/showJSP?forwordJSP=report&num=0&type=show');">報告內容</li>
	                                <li id="tabId4" class="default orderid" data-bind="visible:showFundNotificationVisiblePage" onclick="tab('tabId4','tabC4');forwordJSP('/detail/showJSP?forwordJSP=Notice&type=show');">基金通知</li>
	                                <li id="tabId5" class="default orderid" data-bind="visible:showDelayWorkVisiblePage" onclick="tab('tabId5','tabC5');forwordJSP('/detail/showJSP?forwordJSP=delayWork&num=0&type=show');">延遲開展項目</li>
	                                <li id="tabId6" class="default orderid" data-bind="visible:showStopFinanceVisiblePage" onclick="tab('tabId6','tabC6');forwordJSP('/detail/showJSP?forwordJSP=StopFinance&type=show');">項目中止發放</li>
	                                <li id="tabId7" class="default orderid" data-bind="visible:showPauseWorkVisiblePage" onclick="tab('tabId7','tabC7');forwordJSP('/detail/showJSP?forwordJSP=pauseWork&num=0&type=show')">暫停項目程序</li>
	                                <li id="tabId8" class="default orderid" data-bind="visible:showDelaySubmitReportVisiblePage" onclick="tab('tabId8','tabC8');forwordJSP('/detail/showJSP?forwordJSP=delaySubmitReport&num=0&type=show');">延遲提交報告</li>
	                                <li id="tabId9" class="default orderid" data-bind="visible:showCancelContractVisiblePage" onclick="tab('tabId9','tabC9');forwordJSP('/detail/showJSP?forwordJSP=CancelContract&type=show');">取消批給程序</li>
	                                <li id="tabId10" class="default orderid" data-bind="visible:showInvestigationVisiblePage" onclick="tab('tabId10','tabC10');forwordJSP('/detail/showJSP?forwordJSP=Investigation&type=show&num=0');">審計或調查</li>
	                                <li id="tabId11" class="default orderid" data-bind="visible:showCompanyLetterFormPage" onclick="tab('tabId11','tabC11');forwordJSP('/detail/showJSP?forwordJSP=CompanyLetter&type=show&num=0');">企業來函</li>
                                    <li id="tabId12" class="default orderid" data-bind="visible:showCompanyApplyChangePage" onclick="tab('tabId12','tabC12');forwordJSP('/detail/showJSP?forwordJSP=CompanyApplyChange&type=show&num=0');">企業申請調撥</li>
	                            </ul>
                            </div>
                            <div class="show">
                                <div class="con" id="jspContent"></div>
                            </div>
                            <div style="clear:both;"></div>
                        </div>
                  </td>
                  <td valign="top">
                    <div class="period">
                        <div class="periodlr">
                            <div class="floatleft">報告週期</div>
                            <div class="floatright"><img src="<%=resourcesPath%>/img/Expand.png"></div>
                        </div><br>
                        <div  data-template="GetRightReportData-template" 	data-bind="source: RightReportData"></div>
                     
                    </div>
                    
                  </td>
                </tr>
            </table>
            
            <div id="agreementDialog" style="display: none;">
	            <table width="98%">
	              <tr>
	                  <td align="right" width="30%">協議書簽訂日期:</td><td><input id="aggreementsigndate" data-role="datepicker" style="width: 220px" data-format="yyyy-MM-dd" /></td>
	              </tr>
	              <tr>
	               <td colspan="2">資助期：</td>
	              </tr>
	              <tr>
                       <td colspan="2">
                           <table width="100%" data-template="basicApplytypeTemp" data-bind="source: basicApplytypes"></table>
                       </td>
                   </tr>
	              <tr>
	                  <td align="right">報告期限:</td><td><input id="reportduedate" data-role="datepicker" style="width: 220px" data-format="yyyy-MM-dd" /></td>
	              </tr>
	              <tr>
	                  <td align="right">報告週期:</td><td><input id="reportcycle" type="text" class="k-input" size="26"/>個月</td>
	              </tr>
	              <tr align="right">
	                  <td colspan="2">
	                      <br/>
	                      <input type="button" class='k-button' data-bind="click:addAgreement" value="保存"/>&nbsp;&nbsp;
	                      <input type="button" class='k-button' data-bind="click:closeAgreement" value="取消"/>&nbsp;&nbsp;
	                  </td>
	              </tr>
	          </table>
	        </div>
        </div>
        <!--footer-->
        <div id="footer"></div>
        
    </div>  
 <script id="GetRightReportData-template" type="text/x-kendo-template"> 

 <div class="#:divcolor#">
            <div class="periodwidth periodlr" onClick="showRigthReport(#:reportno#)"><span class="periodfont">0#:reportno#</span>：#:getFormatDateByLong(reportdatefrom)#/#:getFormatDateByLong(reportdateTo)#</div>
                            <div class="periodwidth periodbg" id="pan#:reportno#" >
                                <table width="100%" cellpadding="0" cellspacing="0" >
                                    <tr><td colspan="2"></td></tr>
                                    <tr>
                                        <td align="right">提交報告日期：</td>
                                        <td align="left">#:getFormatDateByLong(submitdueDate)#</td>
                                    </tr>
                                    <tr>
                                        <td align="right">准許提交報告日期：</td>
                                        <td align="left">#:getFormatDateByLong(delaysubmitdate)#</td>
                                    </tr>
                                    <tr>
                                        <td align="right">已提交報告日期：</td>
                                        <td align="left">#:getFormatDateByLong(submitdate)#</td>
                                    </tr>							
									#for(var n=0;n<suggenstionList.length;n++){   #
									# var suggestioncode=suggenstionList[n].suggestioncode #
									# var suggestionapprovedate=suggenstionList[n].suggestionapprovedate #
                                    <tr>
                                        <td align="right">分析報告建議書編號：</td>
                                        <td align="left">#:suggestioncode#</td>
                                    </tr>
                                    <tr>
                                        <td align="right">建議書批示日期：</td>
                                        <td align="left">#:getFormatDateByLong(suggestionapprovedate)#</td>
                                    </tr>
									<tr>
										<td align="right">本期報告批示決定：</td>
                                        <td align="left"></td>
									</tr>
									# var appList= suggenstionList[n].appList; #
									#for(var i=0;i<appList.length;i++){   #
										# var typeCname=appList[i].applytype.cname;  var reportapprovetype=appList[i].reportapprovetype;   #
									 <tr >
     								   <td  align="right">#:typeCname#：</td>
      									  <td align="left">#:getReportRightapproveState(reportapprovetype)#</td>
   									 </tr>
									#}#
                            
								#}#
                                     <tr>
                                        <td align="right">本次撥款金額：</td>
                                        <td align="left">#:financeamount#</td>
                                    </tr>
                                    <tr>
                                        <td align="right">本次撥款日期：</td>
                                        <td align="left">#:getFormatDateByLong(financedate)#</td>
                                    </tr>
                                </table>
         </div>                
  </div>
</script>
</body>
</html>