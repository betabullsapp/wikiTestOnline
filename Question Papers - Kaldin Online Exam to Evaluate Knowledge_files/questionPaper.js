function savetopic() {
	var tpcid = '';
	var questioncount = '';
	var givenquestion = '';
	var subid = '';
	var level = '';
	if(document.getElementById("topicidresponse") && document.getElementById("topicidresponse").value != null && document.getElementById("topicidresponse").value != 0)
		tpcid = document.getElementById("topicidresponse").value;
	 
	if(document.getElementById("numberquestion").value != null )
		questioncount = parseInt(document.getElementById("numberquestion").value,10);
	if(document.getElementById("numberquestiongiven").value != null)
		givenquestion = document.getElementById("numberquestiongiven").value;
	if(document.getElementById("subjectname").value != null && document.getElementById("subjectname").value != 0)
		subid = document.getElementById("subjectname").value;
	if(document.getElementById("testlevel").value != null && document.getElementById("testlevel").value != 0)
		level = document.getElementById("testlevel").value;
	
	var isError = false;
	if(subid == '' || questioncount == '' ||  givenquestion == '') {
		isError = true;
	}
	if(isError) {
		alert('Please provide values for all mandatory fields');
	} else {
		$.post("questionpapertopicaction.do",
		{
			topicid : tpcid,
			quecount : questioncount,
			totalcount : givenquestion,
			subjectid : subid,
			levelid : level,
			op : 'addquestion'
		},
		function(data) {
			if (data == null) {
				message(container, "Data Not Found...");
			} else {
				d = data.split("$$");
	
				if (d[2] == 0) {
					alert("Sorry! you have selected previous topic.");
					return false;
				}
				totalquestioncount = parseInt(d[0],10);
				totalQuestioninSubject = parseInt(d[3],10);
				givenquestion1 = parseInt(givenquestion);
				if(questioncount <= totalQuestioninSubject){
					//do nothing
				}else{
					alert("Sorry entered question count is more than questions present in the category");
					return false;
				} 
				document.getElementById("selectedtopic").innerHTML = "<h6>Questions Added to Question Paper</h6>" + d[1];
				if (totalquestioncount == givenquestion1) {
					document.getElementById("btnsave").disabled = false;
					document.getElementById("btnaddtopic").disabled = true;
					jQuery('#btnaddtopic').css('opacity','0.6');	
					$("#dialog").dialog('close');
				}
				else if(totalquestioncount < givenquestion1) {
					$("#dialog").dialog('close');
				} else if (totalquestioncount > givenquestion1) {
					alert("Sorry! you have selected more questions");
				}
				document.getElementById("totalquestioncnt").value = totalquestioncount;
			}
		});
	}
}
function calculateMark() {
	var markperquest = parseInt(document.getElementById("markperquestion").value);
	var re=/$\.^/
	questionCount = parseInt(document.getElementById("numberquestiongiven").value);
	totalMark = (markperquest * questionCount);
	document.getElementById("totalmrk").innerHTML = totalMark;
	document.forms["QuestionPaperForm"].totalmarks.value = totalMark;
}

function getTopic() {

	var subid = document.getElementById("subjectname").value;
	$.post("showQuestion.do", {
		subjectId : subid,
		op : "getTopic",
		ex : "N"
	}, function(data) {
		if (data == null) {
			message(container, "Data Not Found...");
		} else {
			document.getElementById("topicCont").innerHTML = data;
			document.getElementById("topicidresponse").style.width = '223px';
			$("#topicidresponse").select2({
				placeholder: "",
				allowClear: true
			});
		}
	});

}
function deleteTopic(tpcid) {	
	var givenquestion = document.getElementById("numberquestiongiven").value;

	givenquestion1 = parseInt(givenquestion);
	$
			.post(
					"questionpapertopicaction.do",
					{
						topicid : tpcid,
						op : "deletequestion"
					},
					function(data) {
						if (data == null) {
							message(container, "Data Not Found...");
						} else {
							d = data.split("$$");
							document.getElementById("selectedtopic").innerHTML = "<center style=\"margin:40px 0 0 0;\"><b>Questions Added to Question Paper</b></center>"
									+ d[1];
							if (d[0] < givenquestion1) {
								document.getElementById("btnsave").disabled = true;
								document.getElementById("btnaddtopic").disabled = false;
								jQuery('#btnaddtopic').css('opacity','1.0');
							}

						}
					});

}

function getQuestion(page) {
	var topicid = document.getElementById("topicidresponse").value;
	var levelid = document.getElementById("testlevel").value;

	$.post("questionpapertopicaction.do", {
		topicId : topicid,
		levelId : levelid,
		op : "getTotalQuestion"
	}, function(data) {
		if (data == null) {
			message(container, "Data Not Found...");
		} else {
			document.getElementById("availableQuestions").innerHTML = data;
		}
	});
}

function getlevels(page) {
	var subjectid = document.getElementById("subjectname").value;
	var topicid = document.getElementById("topicidresponse").value;

	$.post("questionpapertopicaction.do", {
		topicId : topicid,
		subjectid : subjectid,
		op : "getLevelQuestion"
	}, function(data) {
		if (data == null) {
			message(container, "Data Not Found...");
		} else {
			document.getElementById("complexity").innerHTML = data;
			document.getElementById("testlevel").style.width = '223px';
			$("#testlevel").select2({
				placeholder: "",
				allowClear: true
			});
		}
	});
}

function initializedoc() {
	document.getElementById("btnsave").disabled = true;

}

function validate(totalQ) {
	data = document.getElementById("availableQuestions").innerHTML;
	d = data.split(":");
	if(isNaN(document.getElementById("numberquestion").value)){
		alert("Please Enter Valid No of Questions");
	}
	if (parseInt(document.getElementById("numberquestion").value) > parseInt(d[1]))
		alert("Please Enter questions within availability limit..");
}

function numbersonly(e) {
	var unicode = e.charCode ? e.charCode : e.keyCode
	if (unicode != 9) {
		if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
			if (unicode < 48 || unicode > 57) // if not a number
				return false // disable key press
		}
	}
}

function checkExamURL(urlval) {	
	$.post("callCreateQuestionPaper.do?check", {
		exmURL : urlval,
		op : "checkurl"
	}, function(data) {
		if (data == null) {
			message(container, "Data Not Found...");
		} else {			
			if(data != 'available'){
				alert("The entered public exam url is not available. Pease use different url.");
				document.forms["QuestionPaperForm"].exmURL.value="";
			}
		}
	});

}

function showAlert(){
	alert('Exam already scheduled for this question paper');
}
