function printWin() {
		frm = document.forms[0];
        var URL = "Report.do";
        window.open(URL, "Reports", "scrollbars=yes,resizable=yes,width=700,height=650");
 }

 function setiframe(){
	var frm=document.forms[0];
	frm.operation.value="";
	var testid = document.forms[0].testID.value;
	var filterby = document.forms[0].filterBy.value;
	/*if(testid==0){
		alert("Please Select Test");
		return;
	}*/
	var str="<iframe src='' name='report' id='testiframe' frameBorder='0' style='min-height: 550px;height:auto;border:none;back'><input type=text name=email></iframe>";
 	document.getElementById("iframe").innerHTML=str;
 	document.getElementById("testiframe").src="Report.do?testId="+testid+"&filterBy="+filterby+"&op=test";
}
 
 function exportResult(){
	var frm=document.forms[0];
	frm.operation.value="";
	var testid = document.forms[0].testID.value;
	var filterby = document.forms[0].filterBy.value;
	var dateRange = document.ReportForm.dateRange.options[document.ReportForm.dateRange.selectedIndex].value;
	var startDate = document.forms[0].startDate.value;
	var endDate = document.forms[0].endDate.value;
	/*if(testid==0){
		alert("Please Select Test");
		return;
	}*/
	if(document.getElementById("iframe").innerHTML == ''){
		var str="<iframe src='' name='report' id='testiframe' frameBorder='0' style='min-height: 500px;height:auto;border:none;back'><input type=text name=email></iframe>";
	 	document.getElementById("iframe").innerHTML=str;
	 	document.getElementById("testiframe").src = "Report.do?testId="+testid+"&filterBy="+filterby+"&op=export";
	}else{
		document.getElementById("testiframe").src = "Report.do?testId="+testid+"&filterBy="+filterby+"&op=export";
	}

}
 
function setiframenew(){
		var frm=document.forms[0];
		frm.operation.value="";
		var testid = document.forms[0].testID.value;
		var filterby = document.forms[0].filterBy.value;
		var dateRange = document.ReportForm.dateRange.options[document.ReportForm.dateRange.selectedIndex].value;
		var startDate = document.forms[0].startDate.value;
		var endDate = document.forms[0].endDate.value;
		var str="<iframe src='' name='report' id='testiframe' frameBorder='0' style='min-height: 550px;height:auto;border:none;back'><input type=text name=email></iframe>";
	 	document.getElementById("iframe").innerHTML=str;
	 	document.getElementById("testiframe").src="Report.do?testId="+testid+"&filterBy="+filterby+"&op=test&dateRange="+dateRange+"&startDate="+startDate+"&endDate="+endDate;
}
 
function showhidedates(){
	var selValue = document.ReportForm.dateRange.options[document.ReportForm.dateRange.selectedIndex].value;
	if(selValue == 5){
		document.getElementById("customdate").style.display='';
	}else{
		document.getElementById("customdate").style.display='none';
	}
}
