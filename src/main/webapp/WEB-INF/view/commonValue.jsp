<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
//項目基本目錄
    String contextPath = request.getContextPath();

//靜態資源目錄
   String resourcesPath = contextPath + "/resources";

//網站全目錄
    String basePath = request.getScheme() + "://"
+ request.getServerName() + ":" + request.getServerPort()
+ contextPath;

String defaultPageable = "{'pageSizes': [10, 20, 50],'input': true,'refresh':true,'messages' : {'display' : '{0} - {1} 條,共 {2} 條','empty' : '沒有任何記錄','page' : '第','itemsPerPage' : '條每頁','first' : '跳轉至第一頁','last' : '跳轉至最後一頁','previous' : '前一頁','next' : '後一頁','refresh' : '重新整理','of' : '頁,共 {0} 頁'}}";
%>




