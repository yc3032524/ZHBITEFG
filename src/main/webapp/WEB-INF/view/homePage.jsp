<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="index.jsp"%>
<html>
<head>
<script type="text/javascript" src="<%=resourcesPath %>/js/homePage.js"></script> 
<meta charset="utf-8">
<title>首頁</title>

<style type="text/css">
.scheduleClass{
background-color:#568BB9;
 border-style: none;
}

</style>

</head>


<body>
<div id="homeContent">
	<div class="Basic">
    	<!--header-->    
        <!--conter-->
        <div id="conter">
            <div class=" cleft floatleft">
            	<div class="p-right1">
                	<table width="100%" cellpadding="0"  cellspacing="0" >
                        <tr>
                            <td>
                            <div id="DIVCOntent">
                            	<div id="ic1" class="iconbgdiv iconColor1">
                                    <div id="iconType1" class="iconbg iconTypeimg1-1" onclick="changeCss(1)"><span data-bind="text:homeCount.newaddcasecount"></span></div>
                                    <div class="iconMargin1">新增卷宗</div>
                                </div>
                                <div id="ic12" class="iconbgdiv iconColor12">
                                    <div id="iconType12" class="iconbg iconTypeimg12"  onclick="changeCss(12)"><span data-bind="text:homeCount.checkcount"></span></div>
                                    <div class="iconMargin1">核對過程</div>
                                </div>
                                <div id="ic2" class="iconbgdiv iconColor2">
                                    <div id="iconType2" class="iconbg iconTypeimg2" onclick="changeCss(2)"><span data-bind="text:homeCount.reportcount"></span></div>
                                    <div class="iconMargin1">報告內容</div>
                                </div>
                                <div id="ic3" class="iconbgdiv iconColor3">
                                    <div id="iconType3" class="iconbg iconTypeimg3" onclick="changeCss(3)"><span data-bind="text:homeCount.fundnotificationcount"></span></div>
                                    <div class="iconMargin1">基金通知</div>
                                </div>
                                <div id="ic4" class="iconbgdiv iconColor4">
                                    <div id="iconType4" class="iconbg iconTypeimg4" onclick="changeCss(4)"><span data-bind="text:homeCount.cancelcontractcount"></span></div>
                                    <div class="iconMargin1">取消批給</div>
                                </div>
                                <div id="ic5" class="iconbgdiv iconColor5">
                                    <div id="iconType5" class="iconbg iconTypeimg5" onclick="changeCss(5)"><span data-bind="text:homeCount.stopfinancecount"></span></div>
                                    <div class="iconMargin1">中止發放</div>
                                </div>
                                
                                <div id="ic6" class="iconbgdiv iconColor6">
                                    <div id="iconType6" class="iconbg iconTypeimg6" onclick="changeCss(6)"><span data-bind="text:homeCount.pauseworkcount"></span></div>
                                    <div class="iconMargin1">暫停項目</div>
                                </div>
<!--                                 <div class="clearboth"></div> -->
                                <div id="ic7" class="iconbgdiv iconColor7">
                                    <div id="iconType7" class="iconbg iconTypeimg7" onclick="changeCss(7)"><span data-bind="text:homeCount.delaysubmitcount"></span></div>
                                    <div class="iconMargin1">延遲提交<br>報告</div>
                                </div>
                                <div id="ic8" class="iconbgdiv iconColor8">
                                    <div id="iconType8" class="iconbg iconTypeimg8" onclick="changeCss(8)"><span data-bind="text:homeCount.delayworkcuont"></span></div>
                                    <div class="iconMargin1">延遲開展<br>項目</div>
                                </div>
                                <div id="ic9" class="iconbgdiv iconColor9">
                                    <div id="iconType9" class="iconbg iconTypeimg9"  onclick="changeCss(9)"><span data-bind="text:homeCount.investigationcount"></span></div>
                                    <div class="iconMargin1">審計或調<br>查</div>
                                </div>
                                <div id="ic10" class="iconbgdiv iconColor10">
                                    <div id="iconType10" class="iconbg iconTypeimg10"  onclick="changeCss(10)"><span data-bind="text:homeCount.companylettercount"></span></div>
                                    <div class="iconMargin1">企業來函</div>
                                </div>
                                <div id="ic11" class="iconbgdiv iconColor11">
                                    <div id="iconType11" class="iconbg iconTypeimg11"  onclick="changeCss(11)"><span data-bind="text:homeCount.companyapplychange"></span></div>
                                    <div class="iconMargin1">申請調撥</div>
                                </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <br>
                    
                    <table width="100%" class="tbbgcolor" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="title2 title-style">
                                <div class="floatleft m-left1"><img src="<%=resourcesPath%>/img/title2.png"></div>
                                <div class="floatleft title-padding">統計（批示決定後未作出內部通知）</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table  style="width: 550px;" class="detailtb1" id="instructionsTable" border="0"  cellpadding="0" cellspacing="0">
                                   
                                </table>
                            </td>
                        </tr>
                    </table>
                	
                </div>
            </div>
            
            <div class=" cright floatright" id="floatrightDiv">
            	<!-- ----------------------------------新增卷宗tb-------------------------------------------- -->
                <table id="Adddossier" width="100%" class="tbbgcolor" cellpadding="0" cellspacing="0" border="0">
                	<tr class="title3 title-style">
                    	<td>
                        	<div class="floatleft m-left1"><img src="<%=resourcesPath%>/img/title1.png"></div>
                            <div class="floatleft title-padding">新增卷宗</div>
                        </td>
                        <td align="right" >
                     	<select data-role='dropdownlist' data-text-field="cname" data-value-field="applytypeid" style="margin-right:18px;font-size:12px;" id="applytypeid"	data-bind="source:applytypeSource,events:{change:changeApplyType}"	></select>
                        </td>
                    </tr>
                    <tr>
                    	<td colspan="2" >
                        	<table class="detailtb1 cursorp"  cellpadding="0" cellspacing="0">
                            	<tr class="cursorn">
                            	  <td align="center">卷宗編號</td>
                            	  <td align="center">申請編號</td>
                                  <td align="center">項目名稱</td>
                                  <td align="center">企業名稱</td>
                                  <td align="center">批准資助方式</td>
                                </tr>
                                <tbody id="NewAddCaseDiv">
                                
                                </tbody>                             
                            </table>
                            
       
                        </td>
                    </tr>
                </table>
                  <!-- 報告內容 -->
                <table id="ReportInfoTb" width="100%"  cellpadding="0" cellspacing="0" class="tbbgcolor displayNone">
                	<tr class="title1 title-style" id="reportTrCss">
                    	<td>
                        	<div class="floatleft m-left1"><img src="<%=resourcesPath%>/img/title1.png"></div>
                            <div class="floatleft title-padding" id="titleContent">報告內容</div>
                        </td>
                        <td align="right">
                             	<select data-role='dropdownlist' id="reportDownid" data-text-field="name" data-value-field="id" style="margin-right:18px;font-size:12px;" 	data-bind="source:dropdownSource,events:{change:changeReport}"	></select>
                        </td>
                    </tr>
                    <tr>
                    	<td colspan="2">
                        	<table class="detailtb1"  cellpadding="0" cellspacing="0">
                                <tr>
                                  <td align="center">卷宗編號</td>
                                  <td align="center">項目名稱</td>
                                  <td align="center">報告周期</td>
                                  <td align="center">提示</td>
                                </tr>
                               <tbody id="reportContentDiv">
                         
                                </tbody>
                                
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div class="clearboth"></div>
        </div>
        <!--footer-->
        <div id="footer"></div>
    </div>	
    <script type="text/x-kendo-tmpl" id="tempNewAddCase">  
	<tr onclick=javascript:doCondition("#=caseid#")  style="cursor:pointer">
     <td align="center" >#:casecode#</td>
     <td align="center">#:applicationcode#</td>
     <td align="center">#:projectname#</td>
     <td align="center">#:compnaycname#</td>
     <td align="center" title="#:applytypecnamedetail#">#:applytypecname#</td>
	</tr>
	</script>
	

	
	
<script type="text/x-kendo-tmpl" id="tempReportContent">   
	<tr onclick=javascript:doCondition("#=caseid#")  style="cursor:pointer">
     <td align="center"  >#:casecode#</td>     
     <td align="center">#:projectname#</td>
	 <td align="center">#:reportperiod#</td>
     <td align="center">#:remark#</td>   
	</tr>
	</script>
	
<script type="text/x-kendo-tmpl" id="templateInstructions">
 <tr>
        <td width="20%" align="left" class="table-tdbg">&nbsp;&nbsp;#=name#</td> 
        <td width="10%" align="right">#=count# &nbsp;</td>
        <td align="left">
            <input type="text" size="0.1" id="caseStatus#=id#" disabled="disabled" class="scheduleClass"  style="width:0px" />
            <label id="caseStatusCount#=id#"></label>%
        </td>    
    </tr>
</script>
	
</div>

</body>
</html>
