var  res;
getTopic = function() {
	var subid = document.getElementById("subject").value;	
	var frm = document.forms["QuestionForm"];	
	$.post("showQuestion.do", {
		subjectId : subid,
		op : "getTopicShow",
		ex : "N"
	}, function(data) {
		if (data == null) {
			message(container, "Data Not Found...");
		} else {
			document.getElementById("topicCont").innerHTML = data;
			temp();
			topicSet();			
		}
	});
}

getTopicSecond = function() {

	var subid = document.getElementById('subjectid').value;
	var frm = document.forms["QuestionForm"];
	$.post("showQuestion.do", {
		subjectId : subid,
		op : "getTopicShow",
		ex : "Y"
	}, function(data) {
		if (data == null) {
			message(container, "Data Not Found...");
		} else {
			document.getElementById("topicContain").innerHTML = data;
			$("#topicidresponse").select2({
				placeholder: "",
				allowClear: true
			});
		}
	});
}

function getSubjectQuestion(page) {
	var subjectid = document.getElementById("subject").value;
	var frm = document.forms[1];
	frm.subjectId.value = subjectid;
	frm.operation.value = "GETSUBJECTQUESTION";
	frm.submit();
}


function getQuestion(page) {
	var tpcid = document.getElementById("topicidresponse").value;
	var frm = document.forms[1];
	frm.topicid.value = tpcid;
	frm.operation.value = "GETQUESTION";
	frm.submit();
}

function showAnswers(questionid) {
	$.post("showQuestion.do",{ questionid : questionid, op : "getAnswer"},
					    function(data) {
						if (data == null) {
							message(container, "Data Not Found...");
						} else {
							var str = "";
							varStrSelect = "";
							res = eval("(" + data + ")");	
							
							if(res.optionA=='' && res.optionB=='' && res.optionC=='' && res.optionD=='' && res.optionE=='' && res.optionF=='' && res.optionG=='')
							{
								str += "<input type='checkbox' id='CorrectAnswerA' value='A'>&nbsp;A&nbsp;</input>";
								varStrSelect += "<option value='A'>A</option>"; 
								str += "<input type='checkbox' id='CorrectAnswerB' value='B'>&nbsp;B&nbsp;</input>";
								varStrSelect += "<option value='B'>B</option>"; 
								str += "<input type='checkbox' id='CorrectAnswerC' value='C'>&nbsp;C&nbsp;</input>";
								varStrSelect += "<option value='C'>C</option>"; 
								str += "<input type='checkbox' id='CorrectAnswerD' value='D'>&nbsp;D&nbsp;</input>";
								varStrSelect += "<option value='D'>D</option>"; 
								
							}else{
				
								if(res.optionA!=""){str += "<input type='checkbox' id='CorrectAnswerA' value='A'>&nbsp;A&nbsp;</input>";
									varStrSelect += "<option value='A'>A</option>"; 
								}								
								
								if(res.optionB!=""){str += "<input type='checkbox' id='CorrectAnswerB' value='B'>&nbsp;B&nbsp;</input>";
									varStrSelect += "<option value='B'>B</option>"; 
								}								
								
								if(res.optionC!=""){str += "<input type='checkbox' id='CorrectAnswerC' value='C'>&nbsp;C&nbsp;</input>";
									varStrSelect += "<option value='C'>C</option>"; 
								}								
								
								if(res.optionD!=""){str += "<input type='checkbox' id='CorrectAnswerD' value='D'>&nbsp;D&nbsp;</input>";
									varStrSelect += "<option value='D'>D</option>"; 
								}								
								
								if(res.optionE!=""){str += "<input type='checkbox' id='CorrectAnswerE' value='E'>&nbsp;E&nbsp;</input>";
									varStrSelect += "<option value='E'>E</option>"; 
								}								
								
								if(res.optionF!=""){str += "<input type='checkbox' id='CorrectAnswerF' value='F'>&nbsp;F&nbsp;</input>";
									varStrSelect += "<option value='F'>F</option>"; 
								}								
								
								if(res.optionG!=""){str += "<input type='checkbox' id='CorrectAnswerG' value='G'>&nbsp;G&nbsp;</input>";
									varStrSelect += "<option value='G'>G</option>"; 
								}								
													
							}
							if(res.optionA!="")
								document.getElementById("optiona").value = res.optionA;							
							if(res.optionB!="")								
								document.getElementById("optionb").value = res.optionB;							
							if(res.optionC!="")
								document.getElementById("optionc").value = res.optionC;
							if(res.optionD!="")
								document.getElementById("optiond").value = res.optionD;
							if(res.optionE!="")
								document.getElementById("optione").value = res.optionE;
							if(res.optionF!="")
								document.getElementById("optionf").value = res.optionF;
							if(res.optionG!="")
								document.getElementById("optiong").value = res.optionG;
							
							
							
							if (res.MCQ == 1) {
								document.getElementById("answerContain").innerHTML = str;
								document.getElementById("MCQnewCheck").checked = true;
						
								var ans = res.CorrectAnswer.split(",");
								for (i = 1; i < 8; i++) {

									if (ans[i] == "A") {
										document
												.getElementById("CorrectAnswerA").checked = true;
									}
									if (ans[i] == "B") {
										document
												.getElementById("CorrectAnswerB").checked = true;
									}
									if (ans[i] == "C") {
										document
												.getElementById("CorrectAnswerC").checked = true;
									}
									if (ans[i] == "D") {
										document
												.getElementById("CorrectAnswerD").checked = true;
									}
									if (ans[i] == "E") {
										document
												.getElementById("CorrectAnswerE").checked = true;
									}
									if (ans[i] == "F") {
										document
												.getElementById("CorrectAnswerF").checked = true;
									}
									if (ans[i] == "G") {
										document
												.getElementById("CorrectAnswerG").checked = true;
									}

								}
							} else if (res.MCQ == 0) {
								document.getElementById("answerContain").innerHTML = "<select id='CorrectAnswer'>"+ varStrSelect + "</select>";
								document.getElementById("MCQnewRadio").checked = true;								
								if (res.CorrectAnswer == "A") {
									document.getElementById('CorrectAnswer').options[0].selected = true;
								}
								if (res.CorrectAnswer == "B") {
									document.getElementById('CorrectAnswer').options[1].selected = true;
								}
								if (res.CorrectAnswer == "C") {
									document.getElementById('CorrectAnswer').options[2].selected = true;
									
								}
								if (res.CorrectAnswer == "D") {
									document.getElementById('CorrectAnswer').options[3].selected = true;
									
								}
								if (res.CorrectAnswer == "E") {
									document.getElementById('CorrectAnswer').options[4].selected = true;
									
								}
								if (res.CorrectAnswer == "F") {
									document.getElementById('CorrectAnswer').options[5].selected = true;
									
								}
								if (res.CorrectAnswer == "G") {
									document.getElementById('CorrectAnswer').options[6].selected = true;
								}

							}
							else if (res.MCQ == 3) {
										
								document.getElementById("MCQnewText").checked = true;
								str =  "<textarea name='CorrectAnswer' cols='50' rows='2' id='CorrectAnswer' >"+res.CorrectAnswer+"</textarea>";
								document.getElementById("answerContain").innerHTML = str;
							}
						
							
							

						}
					});
}

getTextBoxes = function() {

	var totalOptions = document.getElementById("TotalOptions").value;
	
	if (totalOptions == 2) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='none';
		document.getElementById("optD").style.display='none';
		document.getElementById("optE").style.display='none';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 3) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='none';
		document.getElementById("optE").style.display='none';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 4) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='none';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 5) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 6) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='';
		document.getElementById("optF").style.display='';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 7) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='';
		document.getElementById("optF").style.display='';
		document.getElementById("optG").style.display='';
	}
	
	getChoice();
}

getTextBoxesForEdit = function() {

	var totalOptions = document.getElementById("TotalOptions").value;
	
	if (totalOptions == 2) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='none';
		document.getElementById("optD").style.display='none';
		document.getElementById("optE").style.display='none';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 3) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='none';
		document.getElementById("optE").style.display='none';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 4) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='none';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 5) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='';
		document.getElementById("optF").style.display='none';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 6) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='';
		document.getElementById("optF").style.display='';
		document.getElementById("optG").style.display='none';
	}

	else if (totalOptions == 7) {
		document.getElementById("optA").style.display='';
		document.getElementById("optB").style.display='';
		document.getElementById("optC").style.display='';
		document.getElementById("optD").style.display='';
		document.getElementById("optE").style.display='';
		document.getElementById("optF").style.display='';
		document.getElementById("optG").style.display='';
	}
	
}

function getChoiceForEdit() {
	var choice = 1;
	var totalOptions = document.getElementById("TotalOptions").value;
	if( document.getElementById("MCQnewRadio").checked){
		choice = 1;
	} else if( document.getElementById("MCQnewCheck").checked){
		choice = 2;
	} else if( document.getElementById("MCQnewText").checked){
		choice = 3;
	}
	if (totalOptions == 0 && choice != 3) {
		alert("Please Select Total Options First");
		//radio.checked=false;
		return;
	}
	if (choice == 1) {
		var strChoice = "";
		
		var strChoice = "<select id='CorrectAnswer'><option value='A'> A</option>";
		if (totalOptions == 2) {
			
			strChoice += "<option value='B'>B</option></select>";
		}

		else if (totalOptions == 3) {
			
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option></select>";
		}

		else if (totalOptions == 4) {
			
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option></select>";
		}

		else if (totalOptions == 5) {
			
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option>";
			strChoice += "<option value='E'>E</option></select>";
		}

		else if (totalOptions == 6) {
		
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option>";
			strChoice += "<option value='E'>E</option>";
			strChoice += "<option value='F'>F</option></select>";
		}

		else if (totalOptions == 7) {
		
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option>";
			strChoice += "<option value='E'>E</option>";
			strChoice += "<option value='F'>F</option>";
			strChoice += "<option value='G'>G</option></select>";
		}				
	} else if (choice == 2) {
		var strChoice = "";
		
		strChoice += "<input type='checkbox'id='CorrectAnswerA' value='A'>&nbsp; A</input>";
		if (totalOptions == 2) {
			
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
		}

		else if (totalOptions == 3) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
		}

		else if (totalOptions == 4) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input>";
		}

		else if (totalOptions == 5) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerE' value='E'>&nbsp; E</input>";
		}

		else if (totalOptions == 6) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerE' value='E'>&nbsp; E</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerF' value='F'>&nbsp; F</input>";
		}

		else if (totalOptions == 7) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerE' value='E'>&nbsp; E</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerF' value='F'>&nbsp; F</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerG' value='G'>&nbsp; G</input>";
		}

		

	}else if (choice == 3) {
		var strChoice = "";
		
		strChoice += "&nbsp;&nbsp;&nbsp;<textarea id='CorrectAnswer' cols='50' rows='2' ></textarea>";
		
	}
	document.getElementById("answerContain").innerHTML = strChoice;
}


function getChoice(choice) {
	var choice = 1;
	var totalOptions = document.getElementById("TotalOptions").value;
	if(document.getElementById("singleAswerType").checked){
		choice = 1;
	} else if( document.getElementById("mulitpleAswerType").checked){
		choice = 2;
	} else if( document.getElementById("subjectiveAswerType").checked){
		choice = 3;
	}
	if (totalOptions == 0 && choice != 3) {
		alert("Please Select Total Options First");
		//radio.checked=false;
		return;
	}
	if (choice == 1) {
		var strChoice = "";
		
		var strChoice = "<p><label>Correct Answer:</label><select id='CorrectAnswer'><option value='A'> A</option>";
		if (totalOptions == 2) {
			
			strChoice += "<option value='B'>B</option></select><p/>";
		}

		else if (totalOptions == 3) {
			
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option></select><p/>";
		}

		else if (totalOptions == 4) {
			
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option></select><p/>";
		}

		else if (totalOptions == 5) {
			
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option>";
			strChoice += "<option value='E'>E</option></select><p/>";
		}

		else if (totalOptions == 6) {
		
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option>";
			strChoice += "<option value='E'>E</option>";
			strChoice += "<option value='F'>F</option></select><p/>";
		}

		else if (totalOptions == 7) {
		
			strChoice += "<option value='B'>B</option>";
			strChoice += "<option value='C'>C</option>";
			strChoice += "<option value='D'>D</option>";
			strChoice += "<option value='E'>E</option>";
			strChoice += "<option value='F'>F</option>";
			strChoice += "<option value='G'>G</option></select><p/>";
		}
		strChoice += "<p><label>Show Options As:</label>";
		strChoice += "<span style='margin:7px 0 0;'><input type='radio' id='MCQRadio' name='showMCQ' checked='checked'>&nbsp;Radio Button</input>&nbsp;&nbsp;<input type='radio' id='MCQCheck' name='showMCQ'>&nbsp;Check Boxes</input></span></p>";		
	} else if (choice == 2) {
		var strChoice = "";
		
		strChoice += "<p><label>Correct Answer:</label><input type='checkbox'id='CorrectAnswerA' value='A'>&nbsp; A</input>";
		if (totalOptions == 2) {
			
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input><p/>";
		}

		else if (totalOptions == 3) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input><p/>";
		}

		else if (totalOptions == 4) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input><p/>";
		}

		else if (totalOptions == 5) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerE' value='E'>&nbsp; E</input><p/>";
		}

		else if (totalOptions == 6) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerE' value='E'>&nbsp; E</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerF' value='F'>&nbsp; F</input><p/>";
		}

		else if (totalOptions == 7) {
		
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerB' value='B'>&nbsp; B</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerC' value='C'>&nbsp; C</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerD' value='D'>&nbsp; D</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerE' value='E'>&nbsp; E</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerF' value='F'>&nbsp; F</input>";
			strChoice += "&nbsp;&nbsp;&nbsp;<input type='checkbox'id='CorrectAnswerG' value='G'>&nbsp; G</input><p/>";
		}

		strChoice += "<p><label>Show Options As:</label><span style='margin:7px 0 0;'><input type='radio' id='MCQRadio' name='showMCQ' disabled='disabled'>&nbsp;Radio Button</input>&nbsp;&nbsp;";
		strChoice += "&nbsp;<input type='radio' id='MCQCheck' name='showMCQ' checked='checked' disabled='disabled'>&nbsp;Check Boxes</input></span></p>";

	}else if (choice == 3) {
		var strChoice = "";
		strChoice += "<p style='vertical-align:top;'><label style='vertical-align:top;'>Correct Answer:</label>";
		strChoice += "&nbsp;&nbsp;&nbsp;<textarea id='CorrectAnswer' cols='50' rows='2' ></textarea><p/>";
		strChoice += "<p><label>Show Options As:</label><span style='margin:7px 0 0;'><input type='radio' id='MCQRadio' name='showMCQ' disabled='disabled'>&nbsp;Radio Button</input>&nbsp;&nbsp;";
		strChoice += "&nbsp;<input type='radio' id='MCQCheck' name='showMCQ' disabled='disabled'>&nbsp;Check Boxes</input></span>";
		strChoice += "&nbsp;<input type='radio' id='MCQText' name='showMCQ' checked='checked' disabled='disabled'>&nbsp;Text Area</input></span></p>";
	}
	document.getElementById("PlaceAnswerChoice").innerHTML = strChoice;
}

saveQuestion = function() {
	var frm = document.forms["QuestionForm"];
	
	var totalOptions = document.getElementById("TotalOptions").value;
	
	var subid = document.getElementById("subjectid").value;
	if(subid==0){		
		alert("Please select the Category");
		return false;
	}
		
	var topid = document.getElementById("topicidresponse").value;
	//Commented below line as the Topic Value is not going correct...
	//var topid = document.getElementById("topicpopup").value;

	var lvlid = document.getElementById("levelid").value;
	var nicE = new nicEditors.findEditor('newquestion');
	var question = nicE.getContent();
	if(question=="<br>"){question = "";}
	//Get Answers
	var answerValA= "";
	nicE = new nicEditors.findEditor('optionA');
	answerValA = nicE.getContent();		
	if(answerValA==" "){answerValA = "";}
	
	
	
	var answerValB= "";
	nicE = new nicEditors.findEditor('optionB');
	answerValB = nicE.getContent();	
	if(answerValB==" "){answerValB = "";}
	
	
	
	var answerValC= "";
	nicE = new nicEditors.findEditor('optionC');
	answerValC = nicE.getContent();
	if(answerValC==" "){answerValC = "";}
	
	
	var answerValD= "";
	nicE = new nicEditors.findEditor('optionD');
	answerValD = nicE.getContent();
	if(answerValD==" "){answerValD = "";}
	
	var answerValE= "";
	nicE = new nicEditors.findEditor('optionE');
	answerValE = nicE.getContent();
	if(answerValE==" "){answerValE = "";}
	
	var answerValF= "";
	nicE = new nicEditors.findEditor('optionF');
	answerValF = nicE.getContent();
	if(answerValF==" "){answerValF = "";}
	
	
	var answerValG= "";
	nicE = new nicEditors.findEditor('optionG');
	answerValG = nicE.getContent();
	if(answerValG==" "){answerValG = "";}
	
	if (question == "" || question=="<br>") {
		alert("Please enter the question details");
		return false;
	}
	if (document.getElementById("TotalOptions").value == 0 && !document.getElementById("MCQText")) {
		alert("Please select number of options");
		return false;
	}
	if(!document.getElementById("MCQRadio") || ((!document.getElementById("MCQRadio").checked) && (!document.getElementById("MCQCheck").checked) && (document.getElementById("MCQText") && !document.getElementById("MCQText").checked))  ){
		alert("Please select answer type");
		return false;
	}else {
		frm.operation.value = "add";
		frm.subjectId.value = subid;
		frm.topicid.value = topid;
		frm.levelid.value = lvlid;
		frm.question.value = question;

		if (document.getElementById("MCQRadio").checked)
			frm.showAsMCQ.value = 0;
		else if (document.getElementById("MCQCheck").checked)
			frm.showAsMCQ.value = 1;
		else if (document.getElementById("MCQText") && document.getElementById("MCQText").checked)
			frm.showAsMCQ.value = 3;
		
		if (document.getElementById("CorrectAnswer") != null) {
			if (document.getElementById("MCQCheck").checked)
				frm.answer.value = ","
						+ document.getElementById("CorrectAnswer").value;			
			else
				frm.answer.value = document.getElementById("CorrectAnswer").value;
			
						
			if(frm.showAsMCQ.value == 3 && frm.answer.value=="" )
			{
				alert("Enter Correct Answer");
				document.getElementById("CorrectAnswer").focus();
				return false;
			}else if (frm.showAsMCQ.value!=3){
				if (totalOptions == 3) {
					if (answerValC == "") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = "";
					frm.optionE.value = "";
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 4) {
					if (answerValC == "" || answerValD == "") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = "";
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 5) {
					if (answerValC=="" || answerValD=="" || answerValE=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 6) {
					if (answerValC=="" || answerValD=="" || answerValE ==""
						|| answerValF=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = answerValF;
					frm.optionG.value = "";
				}
				if (totalOptions == 7) {
					if (answerValC=="" || answerValD=="" || answerValE==""
						|| answerValF=="" || answerValG=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = answerValF;
					frm.optionG.value = answerValG;
				}
			
			}
		} else
			setChoiceAnswer();

		if (totalOptions == 2) {
			frm.optionC.value = "";
			frm.optionD.value = "";
			frm.optionE.value = "";
			frm.optionF.value = "";
			frm.optionG.value = "";
		}
	}
	
	if (frm.showAsMCQ.value!=3 && (answerValA == "" || answerValB == "")) {
		alert("Enter Answer Option");
		return false;
	} else if(frm.showAsMCQ.value==3 && frm.answer.value!="" ) {
		nicE = new nicEditors.findEditor('questionHint');
		var questionHint = nicE.getContent();	
		if(questionHint==" "){questionHint = "";}
		frm.questionHint.value = questionHint;		
		frm.submit();
	} else{	
		frm.optionA.value = answerValA;
		frm.optionB.value = answerValB;		
		nicE = new nicEditors.findEditor('questionHint');
		var questionHint = nicE.getContent();	
		if(questionHint==" "){questionHint = "";}
		frm.questionHint.value = questionHint;
		
		frm.submit();
	}
}

setChoiceAnswer = function() {

	var totalOptions = document.getElementById("TotalOptions").value;
	var frm = document.forms["QuestionForm"];
	//Get Answers
	var answerValA= "";
	var nicE = new nicEditors.findEditor('optionA');
	answerValA = nicE.getContent();
	if(answerValA==" "){answerValA = "";}
	
	var answerValB= "";
	nicE = new nicEditors.findEditor('optionB');
	answerValB = nicE.getContent();
	if(answerValB==" "){answerValB = "";}
	
	var answerValC= "";
	nicE = new nicEditors.findEditor('optionC');
	answerValC = nicE.getContent();
	if(answerValC==" "){answerValC = "";}
	
	var answerValD= "";
	nicE = new nicEditors.findEditor('optionD');
	answerValD = nicE.getContent();
	if(answerValD==" "){answerValD = "";}
	
	var answerValE= "";
	nicE = new nicEditors.findEditor('optionE');
	answerValE = nicE.getContent();
	if(answerValE==" "){answerValE = "";}
	
	var answerValF= "";
	nicE = new nicEditors.findEditor('optionF');
	answerValF = nicE.getContent();
	if(answerValF==" "){answerValF = "";}
	
	var answerValG= "";
	nicE = new nicEditors.findEditor('optionG');
	answerValG = nicE.getContent();
	if(answerValG==" "){answerValG = "";}
	
	if (totalOptions == 2) {
		frm.optionC.value = "";
		frm.optionD.value = "";
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		if (document.getElementById("CorrectAnswerA").checked == true)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked == true)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
	} else if (totalOptions == 3) {
		frm.optionD.value = "";
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		if (document.getElementById("CorrectAnswerA").checked == true)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked == true)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked == true)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
	} else if (totalOptions == 4) {
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
	} else if (totalOptions == 5) {

		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		frm.optionE.value = answerValE;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
		if (document.getElementById("CorrectAnswerE").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerE").value;
	} else if (totalOptions == 6) {
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		frm.optionE.value = answerValE;
		frm.optionF.value = answerValF;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
		if (document.getElementById("CorrectAnswerE").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerE").value;
		if (document.getElementById("CorrectAnswerF").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerF").value;
	} else {
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		frm.optionE.value = answerValE;
		frm.optionF.value = answerValF;
		frm.optionG.value = answerValG;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
		if (document.getElementById("CorrectAnswerE").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerE").value;
		if (document.getElementById("CorrectAnswerF").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerF").value;
		if (document.getElementById("CorrectAnswerG").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerG").value;
	}
	return;
}

editQuestion = function() {
	var frm = document.forms["QuestionForm"];
	frm.operation.value = "edit";
	frm.answer.value = "";
	var nicE = new nicEditors.findEditor('newquestion');
	var question = nicE.getContent();
	frm.question.value = question;	
	frm.subjectId.value = document.getElementById("subjectid").value;
	frm.topicid.value = document.getElementById("topicidresponse").value;
	frm.levelid.value = document.getElementById("levelid").value;
	var totalOptions = document.getElementById("TotalOptions").value;	
	//Get Answers
	var answerValA= "";
	if(document.getElementById("optiona")){
		nicE = new nicEditors.findEditor('optiona');
		answerValA = nicE.getContent();
		if(answerValA==" " || answerValA=="<br>"){answerValA = "";}
	}
	
	var answerValB= "";
	if(document.getElementById("optionb")){
		nicE = new nicEditors.findEditor('optionb');
		answerValB = nicE.getContent();
		if(answerValB==" " || answerValB=="<br>"){answerValB = "";}
	}
	var answerValC= "";
	if(document.getElementById("optionc")){
		nicE = new nicEditors.findEditor('optionc');
		answerValC = nicE.getContent();
		if(answerValC==" " || answerValC=="<br>"){answerValC = "";}
	}
	
	var answerValD= "";	
	if(document.getElementById("optiond")){
		nicE = new nicEditors.findEditor('optiond');
		answerValD = nicE.getContent();
		if(answerValD==" " || answerValD=="<br>"){answerValD = "";}
	}
	
	var answerValE= "";
	if(document.getElementById("optione")){
		nicE = new nicEditors.findEditor('optione');
		answerValE = nicE.getContent();
		if(answerValE==" " || answerValE=="<br>"){answerValE = "";}
	}
	
	var answerValF= "";
	if(document.getElementById("optionf")){
		nicE = new nicEditors.findEditor('optionf');
		answerValF = nicE.getContent();
		if(answerValF==" " || answerValF=="<br>"){answerValF = "";}
	}
	var answerValG= "";
	if(document.getElementById("optiong")){
		nicE = new nicEditors.findEditor('optiong');
		answerValG = nicE.getContent();
		if(answerValG==" " || answerValG=="<br>"){answerValG = "";}
	}

	if (question == "" || question=="<br>") {
		alert("Please enter the question details");
		return false;
	}
	if (document.getElementById("TotalOptions").value == 0 && !document.getElementById("MCQText")) {
		alert("Please select number of options");
		return false;
	}
	if(!document.getElementById("MCQnewRadio") || ((!document.getElementById("MCQnewRadio").checked) && (!document.getElementById("MCQnewCheck").checked) && (document.getElementById("MCQnewText") && !document.getElementById("MCQnewText").checked))  ){
		alert("Please select answer type");
		return false;
	}else {
		
		if (document.getElementById("MCQnewRadio").checked)
			frm.showAsMCQ.value = 0;
		else if (document.getElementById("MCQnewCheck").checked)
			frm.showAsMCQ.value = 1;
		else if (document.getElementById("MCQnewText") && document.getElementById("MCQnewText").checked)
			frm.showAsMCQ.value = 3;
		
		if (document.getElementById("CorrectAnswer") != null) {
			if (document.getElementById("MCQnewCheck").checked)
				frm.answer.value = ","
						+ document.getElementById("CorrectAnswer").value;			
			else
				frm.answer.value = document.getElementById("CorrectAnswer").value;
			
						
			if(frm.showAsMCQ.value == 3 && frm.answer.value=="" )
			{
				alert("Enter Correct Answer");
				document.getElementById("CorrectAnswer").focus();
				return false;
			}else if (!document.getElementById("MCQnewText").checked){				
				if (totalOptions == 3) {
					if (answerValC == "") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = "";
					frm.optionE.value = "";
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 4) {
					if (answerValC == "" || answerValD == "") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = "";
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 5) {
					if (answerValC=="" || answerValD=="" || answerValE=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 6) {
					if (answerValC=="" || answerValD=="" || answerValE ==""
						|| answerValF=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = answerValF;
					frm.optionG.value = "";
				}
				if (totalOptions == 7) {
					if (answerValC=="" || answerValD=="" || answerValE==""
						|| answerValF=="" || answerValG=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = answerValF;
					frm.optionG.value = answerValG;
				}
			
			}
		} else{
			setChoiceAnswerForEdit();
			if (totalOptions == 3) {
				if (answerValC == "") {
					alert("Enter Answer Option");
					return false;
				}
				frm.optionC.value = answerValC;
				frm.optionD.value = "";
				frm.optionE.value = "";
				frm.optionF.value = "";
				frm.optionG.value = "";
			}
			if (totalOptions == 4) {
				if (answerValC == "" || answerValD == "") {
					alert("Enter Answer Option");
					return false;
				}
				frm.optionC.value = answerValC;
				frm.optionD.value = answerValD;
				frm.optionE.value = "";
				frm.optionF.value = "";
				frm.optionG.value = "";
			}
			if (totalOptions == 5) {
				if (answerValC=="" || answerValD=="" || answerValE=="") {
					alert("Enter Answer Option");
					return false;
				}
				frm.optionC.value = answerValC;
				frm.optionD.value = answerValD;
				frm.optionE.value = answerValE;
				frm.optionF.value = "";
				frm.optionG.value = "";
			}
			if (totalOptions == 6) {
				if (answerValC=="" || answerValD=="" || answerValE ==""
					|| answerValF=="") {
					alert("Enter Answer Option");
					return false;
				}
				frm.optionC.value = answerValC;
				frm.optionD.value = answerValD;
				frm.optionE.value = answerValE;
				frm.optionF.value = answerValF;
				frm.optionG.value = "";
			}
			if (totalOptions == 7) {
				if (answerValC=="" || answerValD=="" || answerValE==""
					|| answerValF=="" || answerValG=="") {
					alert("Enter Answer Option");
					return false;
				}
				frm.optionC.value = answerValC;
				frm.optionD.value = answerValD;
				frm.optionE.value = answerValE;
				frm.optionF.value = answerValF;
				frm.optionG.value = answerValG;
			}
		}

		if (totalOptions == 2) {
			frm.optionC.value = "";
			frm.optionD.value = "";
			frm.optionE.value = "";
			frm.optionF.value = "";
			frm.optionG.value = "";
		}
	}
	if(frm.answer.value==""){
		alert("Enter Correct Answer");
		document.getElementById("CorrectAnswer").focus();
		return false;
	}
	else if (!document.getElementById("MCQnewText").checked && (answerValA == "" || answerValB == "")) {
		alert("Enter Answer Option");
		return false;
	} else if(document.getElementById("MCQnewText").checked && frm.answer.value!="" ) {
		nicE = new nicEditors.findEditor('questionHint');
		var questionHint = nicE.getContent();	
		if(questionHint==" "){questionHint = "";}
		frm.questionHint.value = questionHint;
		frm.optionA.value = "";
		frm.optionB.value = "";
		frm.optionC.value = "";
		frm.optionD.value = "";
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.submit();
	} else{	
		frm.optionA.value = answerValA;
		frm.optionB.value = answerValB;		
		nicE = new nicEditors.findEditor('questionHint');
		var questionHint = nicE.getContent();	
		if(questionHint==" "){questionHint = "";}
		frm.questionHint.value = questionHint;
		
		frm.submit();
	}
	
	
}

saveQuestion = function(object) {
	var frm = document.forms["QuestionForm"];
	
	var totalOptions = document.getElementById("TotalOptions").value;
	document.getElementById('selectedsubjectid').value = document.getElementById('subjectid').value;
	document.getElementById('selectedtopicid').value = document.getElementById('topicidresponse').value;
	document.getElementById('selectedcomplexity').value = document.getElementById('levelid').value;
	var subid = document.getElementById("subjectid").value;
	if(subid==0){		
		alert("Please select the Category");
		return false;
	}
		
	var topid = document.getElementById("topicidresponse").value;
	//Commented below line as the Topic Value is not going correct...
	//var topid = document.getElementById("topicpopup").value;

	var lvlid = document.getElementById("levelid").value;
	var nicE = new nicEditors.findEditor('newquestion');
	var question = nicE.getContent();
	if(question=="<br>"){question = "";}
	//Get Answers
	var answerValA= "";
	nicE = new nicEditors.findEditor('optionA');
	answerValA = nicE.getContent();		
	if(answerValA==" "){answerValA = "";}
	
	
	
	var answerValB= "";
	nicE = new nicEditors.findEditor('optionB');
	answerValB = nicE.getContent();	
	if(answerValB==" "){answerValB = "";}
	
	
	
	var answerValC= "";
	nicE = new nicEditors.findEditor('optionC');
	answerValC = nicE.getContent();
	if(answerValC==" "){answerValC = "";}
	
	
	var answerValD= "";
	nicE = new nicEditors.findEditor('optionD');
	answerValD = nicE.getContent();
	if(answerValD==" "){answerValD = "";}
	
	var answerValE= "";
	nicE = new nicEditors.findEditor('optionE');
	answerValE = nicE.getContent();
	if(answerValE==" "){answerValE = "";}
	
	var answerValF= "";
	nicE = new nicEditors.findEditor('optionF');
	answerValF = nicE.getContent();
	if(answerValF==" "){answerValF = "";}
	
	
	var answerValG= "";
	nicE = new nicEditors.findEditor('optionG');
	answerValG = nicE.getContent();
	if(answerValG==" "){answerValG = "";}
	
	if (question == "" || question=="<br>") {
		alert("Please enter the question details");
		return false;
	}
	if (document.getElementById("TotalOptions").value == 0 && !document.getElementById("MCQText")) {
		alert("Please select number of options");
		return false;
	}
	if(!document.getElementById("MCQRadio") || ((!document.getElementById("MCQRadio").checked) && (!document.getElementById("MCQCheck").checked) && (document.getElementById("MCQText") && !document.getElementById("MCQText").checked))  ){
		alert("Please select answer type");
		return false;
	}else {
		frm.operation.value = "add";
		frm.subjectId.value = subid;
		frm.topicid.value = topid;
		frm.levelid.value = lvlid;
		frm.question.value = question;

		if (document.getElementById("MCQRadio").checked)
			frm.showAsMCQ.value = 0;
		else if (document.getElementById("MCQCheck").checked)
			frm.showAsMCQ.value = 1;
		else if (document.getElementById("MCQText") && document.getElementById("MCQText").checked)
			frm.showAsMCQ.value = 3;
		
		if (document.getElementById("CorrectAnswer") != null) {
			if (document.getElementById("MCQCheck").checked)
				frm.answer.value = ","
						+ document.getElementById("CorrectAnswer").value;			
			else
				frm.answer.value = document.getElementById("CorrectAnswer").value;
			
						
			if(frm.showAsMCQ.value == 3 && frm.answer.value=="" )
			{
				alert("Enter Correct Answer");
				document.getElementById("CorrectAnswer").focus();
				return false;
			}else if (frm.showAsMCQ.value!=3){
				if (totalOptions == 3) {
					if (answerValC == "") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = "";
					frm.optionE.value = "";
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 4) {
					if (answerValC == "" || answerValD == "") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = "";
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 5) {
					if (answerValC=="" || answerValD=="" || answerValE=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = "";
					frm.optionG.value = "";
				}
				if (totalOptions == 6) {
					if (answerValC=="" || answerValD=="" || answerValE ==""
						|| answerValF=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = answerValF;
					frm.optionG.value = "";
				}
				if (totalOptions == 7) {
					if (answerValC=="" || answerValD=="" || answerValE==""
						|| answerValF=="" || answerValG=="") {
						alert("Enter Answer Option");
						return false;
					}
					frm.optionC.value = answerValC;
					frm.optionD.value = answerValD;
					frm.optionE.value = answerValE;
					frm.optionF.value = answerValF;
					frm.optionG.value = answerValG;
				}
			
			}
		} else
			setChoiceAnswer();

		if (totalOptions == 2) {
			frm.optionC.value = "";
			frm.optionD.value = "";
			frm.optionE.value = "";
			frm.optionF.value = "";
			frm.optionG.value = "";
		}
	}
	
	if (frm.showAsMCQ.value!=3 && (answerValA == "" || answerValB == "")) {
		alert("Enter Answer Option");
		return false;
	} else if(frm.showAsMCQ.value==3 && frm.answer.value!="" ) {
		nicE = new nicEditors.findEditor('questionHint');
		var questionHint = nicE.getContent();	
		if(questionHint==" "){questionHint = "";}
		frm.questionHint.value = questionHint;
		frm.optionA.value = "";
		frm.optionB.value = "";
		frm.optionC.value = "";
		frm.optionD.value = "";
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		if(object == 'addanother'){
			frm.operation.value = "addanother";
		}
		frm.submit();
	} else{	
		frm.optionA.value = answerValA;
		frm.optionB.value = answerValB;		
		nicE = new nicEditors.findEditor('questionHint');
		var questionHint = nicE.getContent();	
		if(questionHint==" "){questionHint = "";}
		frm.questionHint.value = questionHint;
		if(object == 'addanother'){
			frm.operation.value = "addanother";
		}
		frm.submit();
	}
}

setChoiceAnswerForEdit = function() {

	var totalOptions = document.getElementById("TotalOptions").value;
	var frm = document.forms["QuestionForm"];
	//Get Answers
	var answerValA= "";
	var nicE = new nicEditors.findEditor('optiona');
	answerValA = nicE.getContent();
	if(answerValA==" " || answerValA=="<br>"){answerValA = "";}
	
	var answerValB= "";
	nicE = new nicEditors.findEditor('optionb');
	answerValB = nicE.getContent();
	if(answerValB==" " || answerValB=="<br>"){answerValB = "";}
	
	var answerValC= "";
	nicE = new nicEditors.findEditor('optionc');
	answerValC = nicE.getContent();
	if(answerValC==" " || answerValC=="<br>"){answerValC = "";}
	
	var answerValD= "";
	nicE = new nicEditors.findEditor('optiond');
	answerValD = nicE.getContent();
	if(answerValD==" " || answerValD=="<br>"){answerValD = "";}
	
	var answerValE= "";
	nicE = new nicEditors.findEditor('optione');
	answerValE = nicE.getContent();
	if(answerValE==" " || answerValE=="<br>"){answerValE = "";}
	
	var answerValF= "";
	nicE = new nicEditors.findEditor('optionf');
	answerValF = nicE.getContent();
	if(answerValF==" " || answerValF=="<br>"){answerValF = "";}
	
	var answerValG= "";
	nicE = new nicEditors.findEditor('optiong');
	answerValG = nicE.getContent();
	if(answerValG==" " || answerValG=="<br>"){answerValG = "";}
	
	if (totalOptions == 2) {
		frm.optionC.value = "";
		frm.optionD.value = "";
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		if (document.getElementById("CorrectAnswerA").checked == true)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked == true)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
	} else if (totalOptions == 3) {
		frm.optionD.value = "";
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		if (document.getElementById("CorrectAnswerA").checked == true)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked == true)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked == true)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
	} else if (totalOptions == 4) {
		frm.optionE.value = "";
		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
	} else if (totalOptions == 5) {

		frm.optionF.value = "";
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		frm.optionE.value = answerValE;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
		if (document.getElementById("CorrectAnswerE").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerE").value;
	} else if (totalOptions == 6) {
		frm.optionG.value = "";
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		frm.optionE.value = answerValE;
		frm.optionF.value = answerValF;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
		if (document.getElementById("CorrectAnswerE").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerE").value;
		if (document.getElementById("CorrectAnswerF").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerF").value;
	} else {
		frm.answer.value = "";
		frm.optionC.value = answerValC;
		frm.optionD.value = answerValD;
		frm.optionE.value = answerValE;
		frm.optionF.value = answerValF;
		frm.optionG.value = answerValG;
		if (document.getElementById("CorrectAnswerA").checked)
			frm.answer.value = ","
					+ document.getElementById("CorrectAnswerA").value;
		if (document.getElementById("CorrectAnswerB").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerB").value;
		if (document.getElementById("CorrectAnswerC").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerC").value;
		if (document.getElementById("CorrectAnswerD").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerD").value;
		if (document.getElementById("CorrectAnswerE").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerE").value;
		if (document.getElementById("CorrectAnswerF").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerF").value;
		if (document.getElementById("CorrectAnswerG").checked)
			frm.answer.value += ","
					+ document.getElementById("CorrectAnswerG").value;
	}
	return;
}



 doSubmit = function() {
	var frm = document.forms[0];
	frm.submit();
}

function ReplaceAll(Source, stringToFind, stringToReplace) {
	var temp = Source;
	var index = temp.indexOf(stringToFind);
	while (index != -1) {
		temp = temp.replace(stringToFind, stringToReplace);
		index = temp.indexOf(stringToFind);
	}
	return temp;
}

function doQuestionDelete(questionid) {
	var frm = document.forms[0];
	frm.questionid.value = questionid;
	frm.operation.value = "delete";
	if (confirm('Do you want to delete this Question?')) {
		document.forms[0].submit();
	}
}


function charsonly(e) {
	var unicode = e.charCode ? e.charCode : e.keyCode
	if (unicode != 8 && unicode != 32 && unicode != 46 && unicode < 65
			|| unicode > 90 && unicode < 97 || unicode > 122) {
		//if the key isn't the backspace key (which we should allow)
		return false // disable key press
	}
}
