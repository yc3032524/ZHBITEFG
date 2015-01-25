<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../index.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>公眾假期</title>
<script src="<%=resourcesPath%>/js/maintenance/holiday.js"
	type="text/javascript"></script>
</head>
<style>
	#holidayGrid td{text-align:left;}
</style>
<body>
<input type="hidden" value="${year}" id="year">
	<!--conter-->
	<div id="Conter">
		<div class="container con-container">
			<div class="conter-padding">
				<div class="conterbg">
					<div class="case-font">	<strong>系統維護&nbsp;<span class="k-icon k-i-arrow-e"></span>&nbsp;公眾假期
				</strong></div>
					<div class="searchbg-top"></div>
					<div class="searchbg-in">
						<div id="searchtitle">
							<div class="line1pxs"></div>
						</div>
						<div id="holidayDiv" class="searchin">
							<table width="100%" >
							  <tr>
							  	<td >
								&nbsp;&nbsp;開始日期:<input type="text"   id="startTime">&nbsp;
								結束日期:<input type="text"    id="endTime"></td>
							  	<td>
							  	</td>
							  </tr>
							   <tr>
							  	<td></td>
							  	<td align="right">
							  		<input id="sb" type="button" class="k-button" onclick="seachHoliday()" value="查詢">
							  		<input type="button" class="k-button" onclick="cleanHoliday()" value="清空">
							  	</td>
							  </tr>
							</table>	
						</div>						
					</div>					
					<div class="searchbg-bottom"></div>
					<div id="holidayGrid" style="text-align:right;"></div>
				</div>			
			</div>		
		</div>
		<!--container-->
	</div>
	<!--Conter-->
</body>
</html>