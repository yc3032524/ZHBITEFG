var holidayData=null;
var vm=null;
$(document).ready( function() {
	
	$("#startTime").kendoDatePicker({		
		format : "yyyy-MM-dd"
	});
	
	$("#endTime").kendoDatePicker({
		value : new Date(),
		format : "yyyy-MM-dd"
	});
	
	    
	    var year=$("#year").val();
	    $("#startTime").val(year+"/01/01");
	    $("#endTime").val(year+"/12/31");
	
	    
		  
		//獲取頁面上需要的數據
		$.ajax({
		    url: contextPath+'/holiday/getparm',
		    type: "POST",
		    dataType: "json",   
		    success: function(d) {		    
		        $.extend(vm, d);
		   
		        kendo.bind($("body"), vm);
		    },
		    error:function(e){
		    	alert(e);		    	
		    }
		});
	    
	    
	    

	
 holidayData = new kendo.data.DataSource({
		sync: function(e) {		     
			holidayData.read(); 
	     },
		transport:{
			read:{
				type:"post",
				url : contextPath+ '/holiday/QueryHoliday',
				dataType:"json"
			},
			update: {
				type:"post",
				url:contextPath+ '/holiday/CreateHoliday',
		        dataType: "json"
		    },
		    create: {
            	type:"post",
				url:contextPath+ '/holiday/CreateHoliday',
                dataType: "json"
            },
            parameterMap: function(options, operation) {  
                if (operation != "read" && options.models) {  
                	var n=0;
                 	 $.each(options.models, function(i, holiday){                	    	
                	   	 if(kendo.stringify(holiday.startdatetime).indexOf("T16:00:00")<=0){
                			 //等於 1 表示新增時  沒有觸碰控件 日期不用加一天 
                	   		holiday.isTounchStart=1;
                		 }
                		 if(kendo.stringify(holiday.enddatetime).indexOf("T16:00:00")<=0){
                			 holiday.istouchEnd=1;
                		 }
                		 var a=Date.parse(holiday.startdatetime);
                		 var b=Date.parse(holiday.enddatetime);
                		  if(a>b){
                			  alert("開始日期不能大於結束日期");
                			  n++;
                		  }
                		 holiday.lastupdatetime=null;
                      });
                	
                 	 if(n>0){
                 		 return false;
                 	 }else{
                 		  return {models: kendo.stringify(options.models)};
                 	 }
                  
                }
                else{          
                	return {start:$("#startTime").val(),end:$("#endTime").val(),pageSize:options.pageSize,page:options.page};
                }
            }
            
		},
		pageSize : 10,
		pageable : true,
		serverPaging : true,
		serverFiltering : true,
		schema: {	
			data: function (d) {
				return d.data; 
			},	
			total: function (d) {
				return d.count; 
			},		
			model: {
                id: "id",
                fields: {
                	id: { editable: false,nullable: true },
                	name: {validation: { required: true,validationMessage:"必填" }},
                	startdatetime: {type: "date",validation: { required: true,validationMessage:"必填" }  },		
                	enddatetime: {type: "date",validation: { required: true,validationMessage:"必填" }  },
                	lastupdateuser: {editable:false},				
                	lastupdatetime:{editable: false,nullable: true}
                }
            }
	    },
	    batch: true
	});
		
	$("#holidayGrid").kendoGrid( {
		dataSource:holidayData,
        toolbar: [{ "name": "create", "text": "新增" }, { "name": "save",template: '#= onHolidayToolbar()#' },{ "name": "cancel", "text": "取消" }],
        pageSize : 10,
		pageable : true,
		pageable: defaultPageable,
		editable:true,
		scrollable: false,
		dataBound: function(e) {
		    $('#holidayGrid').data('kendoGrid').tbody.find('.k-button').click(function(e) {
		       var id=e.target.title;
		       
		       if(confirm("請問您確定要刪除這條記錄嗎?")){
		    	   $.ajax({
						url : contextPath+ '/holiday/deleteHolidayById?id='+id,							
						type : "POST",
						dataType : "json",
						async:false,
						success : function(d) {
							holidayData.read();
						},
						error : function(e) {
							alert(e);
						}
					});
		       }
		    	
		    	
		    });				
		},
        columns: [{
         	    field: "name",
                title: "假期名稱",
                filterable: false,
                template:'#=kendo.toString(replaceValue(name))#'
          },{         	
         	   field: "startdatetime",
         	   format: "{0:yyyy-MM-dd}",
         	   width:'110px',
         	   title: "開始日期"
                
          },{
        	   field: "enddatetime",
        	   format: "{0:yyyy-MM-dd}",
        	   width:'110px',
        	   title: "結束日期"
          },{
	         	field: "lastupdateuser",
	            title: "最後修改人",
	            width:'90px',
	            filterable: false,
	            template:'#=kendo.toString(replaceValue(lastupdateuser))#'
          }, {
                field: "lastupdatetime",
                title: "更新日期",
                filterable: false,
                width:'90px',
                template:'#=kendo.toString(getFormatDateByLong(lastupdatetime))#'
          }	,{
				field : "newsId",
				title : "操作",
				filterable : false,
				width : '80px',
				template : '<input type="button" id="btnNew"  class="k-button" title="#=id#" value="刪除" >'
			}
          
          ]
	 });
	
	//回車鍵自動查詢
    $(document.body).keydown(function(e) {
        if (e.keyCode == 13) {
            $("#sb").focus();
            seachHoliday();
        }
    });
});

//查詢
function seachHoliday(){
	holidayData.read();		
}

function onHolidayToolbar(){
	  return '<label style="float:left;margin-top:5px;"><strong>公眾假期&nbsp;</strong></label><div style="float:left;"></div><a class="k-button" href="#" id="toolbar-add_user" onclick="holidaySave()"><span class="k-icon k-edit"></span>保存</a>';
}

function holidaySave(){
	holidayData.sync();		
}

function cleanHoliday(){
	$("#startTime").val("");
	$("#endTime").val("");	
	
	$("#holidayGrid").data("kendoGrid").dataSource.page(1);
}
