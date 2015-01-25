<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="head.jsp"%>

<html>
<head>
<meta charset="utf-8">
<title>首頁</title>
<script type="text/javascript" src="<%=resourcesPath%>/js/index.js"></script>
<script>
		$(document).ready(function(){
				$("#menu").kendoMenu();
		});
</script>
</head>
<body>
    <div id="Header">
	<div class="container menu-container">
    	<!--header-->
            <table  width="100%" cellpadding="0" cellspacing="0" border="0" >
            <tr>&nbsp;</tr>
            <tr>&nbsp;</tr>
            	<tr>
                	<td align="right" width="450px" class="user">版本${version_env}${display_version}</td>
                    <td align="right">
                    	<div >
                            <ul  id="menu"  class="menu">
                                <li><a href="<%=contextPath%>/home" class="selected">首頁</a></li>
                                <li><a href="<%=contextPath%>/CaseAssigned/AssignedJSP">卷宗分派</a></li>
                                <li><a href="<%=contextPath%>/CaseManage/CaseManageJSP">卷宗管理</a></li>
                                <li><a href="#">報表</a></li>
                                <li><a href="<%=contextPath%>/maintenance/userJSP">系統維護</a>
                                	<ul> 
                                	  <li><a href="<%=contextPath%>/maintenance/userJSP"> 用戶</a></li>
                                	  <li><a href="<%=contextPath%>/maintenance/roleJSP">角色</a>
                                	  <li><a href="<%=contextPath%>/holiday/new">公眾假期</a>
                                	</ul>
                                </li>
                            </ul>
                        </div>
                    </td>
                    <td align="center" class="user">Kass</td>
                </tr>
            </table>
        </div>
       
        <!--footer-->

    </div>	
</body>
</html>
<script type="text/javascript" language="javascript">
function url(){
	window.location.href='Detailpage.html';
}

</script>
