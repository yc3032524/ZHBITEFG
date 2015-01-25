<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../index.jsp"%>
<html>
<head>
<meta charset="utf-8">
<title>卷宗分派</title>
<script src="<%=resourcesPath %>/js/caseAssigned/caseAssigned.js" type="text/javascript"></script>
<style type="text/css">
.userbg{
 background-color: #7EA700;

}
</style>
</head>
<body id="casesearchbody"> 
<div class="table-list2" id="div_Assignment">
	<div class="Basic">
        <!--conter-->
        <div id="conter">
	  	    <div class=" title2 title-style">
            	<div class="floatleft m-left1"><img src="<%=resourcesPath%>/img/title5.png"></div>
            	<div class="floatleft title-padding">卷宗分派</div>
            </div>
            <div class="conbg">
            <table width="100%">
            	<tr>
                	<td valign="top" width="15%" >
                    	<div id="treeview"></div>   
                    </td> 
                    <td valign="top"  align="left">
                      <div class="casetitle">
                          <div class="floatleft">搜尋選項</div>
                          <img src="<%=resourcesPath%>/img/tag3.png" class="floatright m-top1">
                          <div class="floatright ag-divcss"></div>
                      </div>
                    <table  width="100%"  class=" contbwidth contb"cellpadding="0" cellspacing="0"  name="paramTable"  >
                      <tr>
                        <td align="right">批准資助方式：</td>
              			<td align="left" colspan="3">
					      <table  data-template="applytypeEdit" data-bind="source: agreementApplytypes"></table>
                   		</td>
                      </tr>
                      <tr>
                        <td align="right">報告總期數：</td>
                        <td align="left">
                        <select data-role='dropdownlist' style="width:70px;"  data-text-field="text" data-value-field="id" data-bind="source: reportNumSource, value: reportNumSelect,events:{change:reportNumMarkChange}" ></select>
                        <input class="k-input"  type="text" data-bind="value:caseAssigned.reportNum" ></td>
                      </tr>
                      <tr>
                        <td colspan="2" align="right">
                        <br>
                        <img id="Asssignment" src="<%=resourcesPath%>/img/Assigned.png"data-bind="events:{click:openAsssignment}"  style="cursor:pointer">
						<img id="cancelAsssignment" src="<%=resourcesPath%>/img/cancelAsssign.png"data-bind="events:{click:cancelAsssignment}"  style="cursor:pointer">
                        <img src="<%=resourcesPath%>/img/search.png"data-bind="events:{click:search}"  style="cursor:pointer">
               			<img src="<%=resourcesPath%>/img/Reset.png" data-bind="events:{click:clear}"  style="cursor:pointer">
                        <div id="openAsssignmentDiv"></div>  
                        </td>
                         
                      </tr>
                      
                    </table>
                     <div class="casetitle">
                       <div class="floatleft">搜尋結果</div>
                          <img src="<%=resourcesPath%>/img/tag3.png" class="floatright m-top1">
                          <div class="floatright ag-divcss"></div>
                     </div> 
                     <br>
                     <table width="100%" class=" contbwidth contb1 cursorp" cellpadding="0" cellspacing="0">
					<tr>
               <div id="showCase"  style="border: 1" data-role="grid" data-batch="true" data-pageable="<%=defaultPageable %>"
	 			data-scrollable="false" data-sortable="true" data-selectable="row"
     			data-columns='[{"title":"<input name=addAddrAll id=addAddrAll type=checkbox >  "},{"title":"卷宗編號","width":"117","field":"caseCode"}, {"title":"批准資助方式","width":"64",},{"title":"項目名稱","width":"64","field":"projectname"},{"title":"企業名稱","width":"64","field":"compnaycname"},{"title":"資助總金額","width":"61","field":""},{"title":"報告總期數","width":"165","field":"reportnum"},{"title":"資助期","width":"65","field":"supportnum"}]'
     			data-bind="source: gridSource"
     			data-row-template="rowTemplate"}]'>
              </div>
              </tr>
                    </table>
                     <div class="clearboth"></div>
                     <br>
                    </td>
                </tr>
            </table>
          </div>     
        </div>
        <!--footer-->
        <div id="footer"></div>
    </div>
    </div>
    	
</body>
</html>
<script type="text/x-kendo-template" id="rowTemplate">

	<tr ondblclick=javascript:doCondition("#=caseid#") >
		<td>
            <input type="checkbox" id="#=caseid#" name="editBatchAddr" > 
        </td>
       <td align="left" >
		   <div><a href=javascript:doCondition("#=caseid#")><span data-bind="text:caseCode"></span>
		</td>

		<td align="left" title="#=applytypecnamedetail#" >
		   <div><span data-bind="text:applytypecname"></span></div>
			</td>
		<td align="left"  title="#=projectnameTmpdetail#">
		   <div><span data-bind="text:projectnameTmp"></span></div>
		</td>
		
		<td align="left"  title="#=compnaycnameTmpdetail#">
		   <div><span data-bind="text:compnaycnameTmp"></span></div>
		</td>
		<td align="left" title="#=supportamountsumdetail#" >
		   <div><span data-bind="text:supportamountsum"></span></div>
		</td>
		<td align="left">
		   <div><span data-bind="text:reportnumTmp"></span></div>
		</td>
		 	<td align="left"  title="#=supportnumdetail#">
		   	<div><span data-bind="text:supportnum"></span></div>	
		</td>
   </tr>
</script>
<script id="applytypeEdit" type="text/x-kendo-template">
		<input type="checkbox" class="k-checkbox"  id="supportType#:applytypeid#" value="#:applytypeid#" name="supportType"  />#:cname#
</script>
<script id="treeview-template" type="text/kendo-ui-template">
			#if(leftchoose==item.userid){#
			 <div id="userid#:item.userid#" style="cursor:pointer;" class="userbg"> #:item.loginname#  #:item.pingCount#  </div>	
			#}else{#
			 <div id="userid#:item.userid#" style="cursor:pointer;" > #:item.loginname#  #:item.pingCount#  </div>	
			#}#
	
</script>

