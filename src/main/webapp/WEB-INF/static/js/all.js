// 頁面加載CSS
loadingUICSS = {
	border : 'none',
	padding : '15px',
	backgroundColor : '#000',
	'-webkit-border-radius' : '10px',
	'-moz-border-radius' : '10px',
	opacity : .5,
	color : '#fff'
};

defaultPageable = {
	pageSizes: [10, 20, 50],
	input: true,
	refresh:true,
	messages : {
		display : "{0} - {1} 條,共 {2} 條",
		empty : "沒有任何記錄",
		page : "第",
		itemsPerPage : "條每頁",
		first : "跳轉至第一頁",
		last : "跳轉至最後一頁",
		previous : "前一頁",
		next : "后一頁",
		refresh : "重新整理",
		of : "頁,共 {0} 頁"
	}
};

defaultKendoUploadLocalization = {
	dropFilesHere: '',
	select : '',
	retry : '重試',
	statusFailed : '失敗',
	cancel : '取消',
	remove : '刪除',
	statusUploaded : '已上傳',
	statusUploading : '上傳中'
};

// 連接
function doClick(url) {
	$('#mainIframe').attr('src', url);
}

// 替換空字符串
function replaceValue(str) {
	if (str == undefined) {
		return "";
	} else {
		return str;
	}
}

/**
 * 根據此類型Wed Sep 19 15:49:22 UTC+0800 2012轉換為2012-09-21
 * 
 * @param num
 * @returns
 */
function Todate(num, isTime) {
	if (null==num || '' == num || undefined == num) {
		return null;
	}
	num = num + ""; // 给字符串后就一个空格
	if(num.indexOf('UTC')!=-1){
		if (isNaN(parseInt(num.substring(0, 1)))) {
			// Fri Sep 28 00:00:00 UTC+0800 2012
			var date = "";
			var month = new Array();
			month["Jan"] = 1;
			month["Feb"] = 2;
			month["Mar"] = 3;
			month["Apr"] = 4;
			month["May"] = 5;
			month["Jun"] = 6;
			month["Jul"] = 7;
			month["Aug"] = 8;
			month["Sep"] = 9;
			month["Oct"] = 10;
			month["Nov"] = 11;
			month["Dec"] = 12;
			str = num.split(" "); // 根据空格组成数组
			date = str[5] + "-"; // 就是在2012的后面加一个“-”
			// 通过修改这里可以得到你想要的格式
			if (isTime == undefined) {
				date = date + month[str[1]] + "-" + str[2];
			} else if (isTime) {
				date = date + month[str[1]] + "-" + str[2] + " " + str[3];
			}
			return date;
		}
		if (isTime && num.length == 10)
			num += " 00:00:00";
		return num;
	}else if(num.indexOf('GMT')!=-1){
		var date = new Date(num); 
		var year = date.getFullYear();
		var month = (date.getMonth()  + 1) < 10  ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
		var day = (date.getDate())  < 10 ? '0' + (date.getDate()) : (date.getDate());
		var hours = (date.getHours()) < 10 ? '0' + (date.getHours()) : (date.getHours());
		var minutes = (date.getMinutes()) < 10 ? '0' + (date.getMinutes()) : (date.getMinutes());
		var seconds = (date.getSeconds()) < 10 ? '0' + (date.getSeconds()) : (date.getSeconds());
		if(isTime){
			return year+'-'+month+'-'+day +" "+hours+':'+minutes+':'+seconds;
		}
		return year+'-'+month+'-'+day;
	}
}

function ToTime(num) {
	if ('' == num || undefined == num) {
		return null;
	}
	num = num + ""; // 给字符串后就一个空格
	if (isNaN(parseInt(num.substring(0, 1)))) {
		// Fri Sep 28 00:00:00 UTC+0800 2012
		str = num.split(" "); // 根据空格组成数组
		return str[3];
	}
}

/**
 * 转换long值为日期字符串
 * 
 * @param l
 *            long值
 * @return 符合要求的日期字符串
 */
function getFormatDateByLong(l, isTime) {
	if (l == undefined || null == l) {
		return "";
	} else if (l.toString().length == 10 || l.toString().length == 19) {
		return l;
	}
	data = new Date(l);
	if (isTime == undefined) {
		return Todate(data);
	} else {
		return Todate(data, isTime);
	}
	return null;
}

/**
 * 转换long值为日期字符串
 * 
 * @param l long值
 * @return 符合要求的日期字符串, 如果日期為null就返回null
 */
function getDateByLong(l, isTime) {
	if (l == undefined || null == l) {
		return null;
	} else if (l.toString().length == 10 || l.toString().length == 19) {
		return l;
	}
	data = new Date(l);
	if (isTime == undefined) {
		return Todate(data);
	} else {
		return Todate(data, isTime);
	}
	return null;
}

/**
 * 转换long值为日期字符串
 * 
 * @param l
 *            long值 有時分秒
 * @return 符合要求的日期字符串
 */
function getTime(l) {
	if (l == undefined) {
		return "";
	}
	data = new Date(l);
	return Todate(data, true);
}



// 複制一個object到另一個object
// 注意:普通的array不可以
function cloneObject(source) {
	return $.extend(true, {}, source);
}

// 複制一個object list到另一個object list
// 注意:一定要由object組成的list,普通的array不可以
// 因為var targetList=$.extend(true,[],sourceList)在kendo裏會出現一點點問題,
// 最後一個object還是指向原來的object,所以需要用這種方法
function cloneList(source) {
	var target = [];
	for ( var i = 0; i < source.length; i++) {
		target.push($.extend(true, {}, source[i]));
	}
	return target;
}

// 複制一個array到另一個array
function cloneArray(source) {
	var target = [];
	for ( var i = 0; i < source.length; i++) {
		target[i] = source[i];
	}
	return target;
}

// 移除某array裏的item
// 例如array=["1","2","3"]
// removeItemInArray(array,"2")
// 結果resultList = ["1","3"]
function removeItemInArray(array, item) {
	return $.grep(array, function(value) {
		return value != item;
	});
}
// 通過object裏的某property的值來移除一個object list裏面的某個object
// 例如originalList = [{'id':'73','foo':'bar'},{'id':'45','foo':'bar'}]
// resultList=removeObjectInListByObjectProperty(originalList,'id','73');
// 結果resultList = [{'id':'45','foo':'bar'}]
function removeObjectInListByObjectProperty(list, objKey, objValue) {
	return $.grep(list, function(e) {
		return eval("e.lessonid") != objValue;
	});
}

// param:
// kendotime: HH:mm or Wed Sep 19 15:49:22 UTC+0800 2012
// date: yyyy-MM-dd
// return: yyyy-MM-dd HH:mm:ss

function kendoTimeToDate(kendotime, date) {
	if (kendotime == null)
		return null;
	var dt = Todate(kendotime, true);
	if (dt.length == 5)// HH:mm
		dt = date + " " + dt + ":00";
	else
		// yyyy-MM-dd HH:mm:ss
		dt = date + " " + dt.slice(-8, -3) + ":00";
	return dt;
}



/**
 * 返回 HH:mm
 * @param num
 * @param isTime
 * @returns
 */
function dateHM1(num) {
    if (null==num || '' == num || undefined == num) {
        return null;
    }
    num = num + ""; // 给字符串后就一个空格
    if (isNaN(parseInt(num.substring(0, 1)))) {
        // Fri Sep 28 00:00:00 UTC+0800 2012
        var date = "";
        str = num.split(" "); // 根据空格组成数组
        date = date + str[3].substring(0,5);
        return date;
    }
    return num;
}


//判斷文本框輸入的值是否是數字
function IsNum(num){
  var reNum=/^\d*$/;
  return(reNum.test(num));
}

function errorAlert(){
 $.unblockUI();	
 alert("操作失敗，請聯繫系統管理員！");
}

function selectErrorAlert(){
 alert("請選擇至少一條數據！");
}


/**
 * 記住個案在詳細信息最後所選擇的面板
 * @param caseid
 * @param tabIndex
 * @returns
 */
function caseSelectTabIndex(caseid,tabIndex){
	this.caseid=caseid;
	this.tabIndex=tabIndex;
}

/**
 * 設置個案選擇的tabindex
 * @param caseid
 * @param tabIndex
 */
function setCaseSelectTabIndex(caseid,tabIndex){
	var jsonStr = $.cookie('caseSelectIndex');
	var caseSelectList = eval(jsonStr);
	var index;
	if(null!=caseSelectList){
		$.each(caseSelectList,function(k,v){
			if(v.caseid==caseid){
				index=k;
				return false;
			}
		});
	}else{
		caseSelectList = new Array();
	}
	if(undefined==index){//如果不存在，保存到cookie中
		caseSelectList.push(new caseSelectTabIndex(caseid,tabIndex));
		$.cookie('caseSelectIndex', JSON.stringify(caseSelectList), { expires: 1 , path: '/'});
	}else{//如果存在，改變當前個案選擇的tabindex
		caseSelectList.splice(index,1,new caseSelectTabIndex(caseid,tabIndex));
		$.cookie('caseSelectIndex', JSON.stringify(caseSelectList), { expires: 1 , path: '/'});
	}
}

/**
 * 獲取個案選擇的tabindex
 * @param caseid
 * @returns {Number}
 */
function getCaseSelectTabIndex(caseid){
	var tabIndex = 0;
	if($.cookie('caseSelectIndex')==null){
		var caseSelectList = new Array();
		caseSelectList.push(new caseSelectTabIndex(caseid,0));
		$.cookie('caseSelectIndex', JSON.stringify(caseSelectList), { expires: 1 , path: '/'});
	}else{
		var jsonStr = $.cookie('caseSelectIndex');
		var caseSelectList = eval(jsonStr);
		var isFlag = true;
		$.each(caseSelectList,function(k,v){
			if(v.caseid==caseid){
				tabIndex=v.tabIndex;
				isFlag=false;
				return false;
			}
		});
		if(isFlag){
			caseSelectList.push(new caseSelectTabIndex(caseid,0));
			$.cookie('caseSelectIndex', JSON.stringify(caseSelectList), { expires: 1 , path: '/' });
		}
	}
	return tabIndex;
}

/**
 * 
 * @param regionId //區域ID
 * @param streetName //街道名稱
 * @param doorNum	//門牌
 * @param buildingName //大廈
 * @param flat         //座期
 * @param floor			//樓層
 * @param unit			//單元
 * @param isAo			//本澳 1代表本澳
 */
function splitJointAddress(districtName,regionName,regionId,streetName,doorNum,buildingName,flat,floor,unit,addressRemark,isAo){
	 var allAddress="";
		if(regionId!="" && regionId!=null){
			 if(parseInt(regionId)==6){
				 allAddress="澳門氹仔";
			  }else if(parseInt(regionId)==7){
				  allAddress="澳門路環";
			  }else {
				  allAddress="澳門";
			  }
		}
	 		  
		if(streetName!=null){
			allAddress+=streetName;
		}
		if(doorNum!=null){
			allAddress+=doorNum;
		}
		if(buildingName!=null){
			allAddress+=buildingName;
		}
		if(flat!=null){
			allAddress+=flat;
		}
		if(floor!=null){
			allAddress+=floor;
		}
		if(unit!=null){
			allAddress+=unit;
		}
	 
	   
	  if(addressRemark!=null && addressRemark!=""){
		  allAddress+=addressRemark;
	  }	  
	  
	  if(isAo=="" || isAo== null){
		  isAo="0";
	  }
	  
	  
	  if(parseInt(isAo)!=0 || (districtName!="" && districtName!=null ) || ( regionName!="" && regionName!=null) ){
		  allAddress+="(";
		  var additive="";		 
		  if(districtName!="" && districtName!=null){//
			  additive+=districtName+",";
		  }
		  if(regionName!="" && regionName!=null ){//
			  additive+=regionName+",";
		  }		
		  
		  if(parseInt(isAo)==1){//本澳
			  additive+="本澳,";
		  }
	  
		 
		  allAddress+= additive.substring(0,additive.length-1)+ ")";
	  }	  
	  
	  return allAddress;
}


/**
 * 
 * @param regionId //區域ID
 * @param streetName //街道名稱
 * @param doorNum	//門牌
 * @param buildingName //大廈
 * @param flat         //座期
 * @param floor			//樓層
 * @param unit			//單元
 * @param isAo			//本澳 1代表本澳
 * ischeckbox           //是否需要本澳 1 需要 0不需要 
 */
function splitJointAddress2(districtName,regionName,regionId,streetName,doorNum,buildingName,flat,floor,unit,addressRemark,isAo,ischeckbox){
	 var allAddress="";
		if(regionId!="" && regionId!=null){
			 if(parseInt(regionId)==6){
				 allAddress="澳門氹仔";
			  }else if(parseInt(regionId)==7){
				  allAddress="澳門路環";
			  }else {
				  allAddress="澳門";
			  }
		}
	 		  
		if(streetName!=null){
			allAddress+=streetName;
		}
		if(doorNum!=null){
			allAddress+=doorNum;
		}
		if(buildingName!=null){
			allAddress+=buildingName;
		}
		if(flat!=null){
			allAddress+=flat;
		}
		if(floor!=null){
			allAddress+=floor;
		}
		if(unit!=null){
			allAddress+=unit;
		}
	 
	   
	  if(addressRemark!=null && addressRemark!=""){
		  allAddress+=addressRemark;
	  }	  
	  
	  if(isAo=="" || isAo== null){
		  isAo="0";
	  }
	  
	  
	  if(parseInt(isAo)!=0 || (districtName!="" && districtName!=null ) || ( regionName!="" && regionName!=null) ){
		  allAddress+="(";
		  var additive="";		 
		  if(districtName!="" && districtName!=null){//
			  additive+=districtName+",";
		  }
		  if(regionName!="" && regionName!=null ){//
			  additive+=regionName+",";
		  }		
		  
		  if(ischeckbox==1){
			  if(parseInt(isAo)==1){//本澳
				  additive+="本澳,";
			  }
		  }
		  
		 
		  allAddress+= additive.substring(0,additive.length-1)+ ")";
	  }	  
	  
	  return allAddress;
}





//進度條
function waitProcess(){
    $.blockUI({ css: {border: 'none',padding: '15px',backgroundColor: '#000','-webkit-border-radius': '10px','-moz-border-radius': '10px',opacity: .5,color: '#fff'} });
}
//$(document).ajaxStart(function () {$.blockUI({ css: {border: 'none',padding: '15px',backgroundColor: '#000','-webkit-border-radius': '10px','-moz-border-radius': '10px',opacity: .5,color: '#fff'} });});
//$(document).ajaxStop(function () {
//    // 直接调用，无延时
//    $.unblockUI();
//});
//檢查時間文本框是否為空
function checkTimeisNull(obj){
	var isFlag = true;
	var arr = obj.split(',');
	$.each(arr,function(k,v){
		if($("#"+v).val()==""){
			isFlag = false;
			alert("請選擇查詢時間！");
			return false;
		}
	});
	return isFlag;
}


function showDialog(id){
	 if(arguments.length == 0){
		 return;
	 }
	 var parArgumentsCount = arguments.length;
	 var window = $( "#" + id);
	 if (!window.data("kendoWindow")) {
	     window.kendoWindow({
	    	 title: window.attr("divTitle"),
	 		 modal: true,
	 		 visible: false,
	 		 resizable: false,
	 		 width: window.attr("divWidth")
	     });
	 }
	 window.show();
	 window.data("kendoWindow").center().open();
}

function closeDialog(id){
	$( "#" + id).data("kendoWindow").center().close();
}

$(function(){
	$("#loadDiv").css("left",$(document.body).width()/2);
	$("#loadDiv").css("top",$(document.body).height()/2+200);
});

//檢查date1是否小於等於date2
function checkDate(date1,date2) {
    var arr = date1.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var sTimes = starttime.getTime();
    
    var arrs = date2.split("-");
    var endtime = new Date(arrs[0], arrs[1], arrs[2]);
    var eTime = endtime.getTime();
    if (sTimes > eTime) {
        return true;
    }
    else{
    	return false;
    }
}
/**
 * 用於控制datepicker組件，後面的日期不能小於前面的日期
 * @param s
 * @param e
 */
function startChange(s, e) {
    start = $("#"+s).data("kendoDatePicker");
    end = $("#"+e).data("kendoDatePicker");
    var startDate = start.value(),
    endDate = end.value();

    if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        end.min(startDate);
    } else if (endDate) {
        start.max(new Date(endDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function endChange(s, e) {
    start = $("#"+s).data("kendoDatePicker");
    end = $("#"+e).data("kendoDatePicker");
    var endDate = end.value(),
    startDate = start.value();

    if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        start.max(endDate);
    } else if (startDate) {
        end.min(new Date(startDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

//将日期转换为毫秒
function DateInMillis(date){
	if(null != date && date.indexOf('-')!=-1){
		var str = date.split('-');
		var month = parseInt(str[1]);
		var millis = Date.parse(new Date(str[0],month-1,str[2]));
		return millis;
	}
	return null;
}



//選擇核對人員
function choiceCheckUser() {
	var ww = $("#checkUserDiv").kendoWindow({
		title : "核對人員",
		width : "600px",
		content : contextPath + "/user/getCheckUser"
	}).data("kendoWindow");
	ww.open();
	ww.center();
}

//金額格式化
function formatCurrency(num) {  
    num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
        num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}



//正數正則表達式
function isPositiveNumberReg(value){
	var reg =new RegExp('^([1-9]\\d*)$');
	var reg2 =new RegExp('^([1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$');
	if(reg.test(value)||reg2.test(value)){
		return true;
	}else{
		return false;
	}
}

function setDivHeight(){
	var divHeight=document.getElementById("jspContent").offsetHeight;
	$(".tabT").css({ 'height': divHeight + 2 });
}