var applicationFormVM = '';
$(document).ready(function() {
	applicationFormVM = kendo.observable({
		applytypeText:null,
		fileSource_application : [],
		filesourcetype:'Application',
		tfile : null,
		saveApplication:function(e){
			this.setApplicationForm();
			var tapplication = JSON.stringify(this.tapplication);
			$.ajax({
			    url: contextPath+'/applicationform/updateApplicationForm',
			    contentType : 'application/json',
			    type: "POST",
			    dataType: "json",   
			    async : false,
			    data : tapplication,
			    success: function(d) {		    
			        if(d.result=='ok'){
			        	RefreshBasicData();
			        	forwordJSP('/detail/showJSP?forwordJSP=ApplicationForm&caseid='+$("#basic_caseid").val());
			        }
			    },
			    error:function(e){
			    	alert(e);		    	
			    }
			});
		},
		setApplicationForm:function(e){
			this.set('tapplication.companytypeid',$("#companytype").val());
			var applytypeid = '';
			$.each($("input[name^='applycyptCK']"), function(key, value) {
				if($(this).attr('checked')=='checked'){
					applytypeid = applytypeid + $(this).val() + ',';
				}
			});
			this.set('tapplication.applytypeid',applytypeid);
		},
		setSelectData:function(e){
			if(null!=this.get('tapplication.tcompanytype')){
				$("#companytype").data("kendoDropDownList").select(this.get('tapplication.tcompanytype.companytypeid'));
			}
			$.each(this.get('applicationApplyTypeList'),function(k,v){
				$("input[name='applycyptCK"+v.applytype.applytypeid+"']").attr('checked','checked');
			});
		},
		setShowData:function(e){
			var text = '';
			$.each(this.get('applicationApplyTypeList'),function(k,v){
				text += v.applytype.cname+',';
			});
			if(''!=text){
				text = text.substring(0,text.length-1);
			}
			applicationFormVM.set('applytypeText',text);
		},
		//讀取文件源
		getFileSource : function() {
			$.ajax({
				cache : false,
				url : contextPath+ "/file/getFile",
				type : "POST",
				data : {
					fileSourceID :applicationFormVM.get("tapplication.applicationid"),
					filesourcetype:applicationFormVM.get("filesourcetype")
				},
				dataType : "json",
				success : function(data) {
					if(data.FileisNull == 1){
						$('#selectFile').hide();
						}else{
							$('#selectFile').show();
							applicationFormVM.set("fileSource_application",data.tfile);
						}
					setDivHeight();
				},
				error:function(a,b,c){
					alert(a+"/"+b+"/"+c);	
					}
			});
		}
	});
	
	//獲取頁面上需要的數據
	$.ajax({
	    url: contextPath+'/applicationform/getParamater?caseid='+$("#basic_caseid").val(),
	    type: "POST",
	    dataType: "json",   
	    async : false,
	    success: function(d) {		    
	        $.extend(applicationFormVM, d);
	        applicationFormVM.setShowData();
	    },
	    error:function(e){
	    	alert(e);		    	
	    }
	});
	
    kendo.bind($("#ApplicationFormContent"), applicationFormVM);
    
    applicationFormVM.getFileSource();// 附件
	
    $(".save-ApplicationForm").click(function(){
        $('#ApplicationForm').show();
        $('#ApplicationForm-edit').hide();
        setDivHeight();
    });
    $("#Edit-ApplicationForm").click(function(){
        $('#ApplicationForm-edit').show();
        $('#ApplicationForm').hide();
        setDivHeight();
    });  
    
    $(".datepicker").kendoDatePicker({
        format: "dd/MM/yyyy"
      }); 
     $(".selecttype").kendoDropDownList();   
     
     // 上傳
	$("#uploadInvestigationFile").kendoUpload({
		async : {
			saveUrl : contextPath + "/file/upload",
			autoUpload : true
		},
		success : function onSuccess(e) {
			applicationFormVM.getFileSource();
		},
		error : function onError(e) {
			alert(e);
		},
		upload : function onUpload(e) {
			applicationFormVM.tfile.filesourcetype = applicationFormVM.get("filesourcetype");
			applicationFormVM.tfile.filesourceid =  applicationFormVM.get("tapplication.applicationid");
			applicationFormVM.tfile.caseId = $("#basic_caseid").val();
			e.data = {
				tfileJsonStr : JSON.stringify(applicationFormVM.tfile)
			};
			$(".k-upload-files").hide();
		},
		complete : function onComplete(e) {
			$(".k-upload-files").hide('');
			$(".k-upload-files").hide();
		},
		localization : defaultKendoUploadLocalization
	});
 }); 

function selectAll() {//附件中的“全选”
	 var checkboxs=document.getElementsByName("applicationFileFile");
	 for (var i=0;i<checkboxs.length;i++) {
	  var e=checkboxs[i];
	  e.checked=!e.checked;
	 }
}

//刪除文件
function delFile(fileid) {
	var str="";
	//獲取所有選中的存放到數組	checked
	$.each($("input[name='applicationFileFile']"), function(key, value) {
		if($(this).attr('checked')=='checked'){	
			var numValue=$(this).val();
			//alert(numValue);
			str+=numValue+",";
		}
	});
	if(str.length>0){
		str=str.substring(0, str.length-1);
	}
	if(str.length>0){
	if (confirm('確定要執行刪除操作嗎！')) {
		$.ajax({
			url : contextPath + '/file/delFile?fileidss=' + str +'&caseId='+ $("#basic_caseid").val(),
			type : "POST",
			dataType : "json",
			success : function(d) {
				applicationFormVM.getFileSource();
			},
			error : function(a, b, c) {
				alert(a + '\t' + b + '\t' + c);
			}
		});
	}
 	str = "";
	}else{
		alert("請選擇需要刪除的文件");
	}
	
}