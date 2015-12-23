echeck = function() {
	var frm = document.forms[0];
	var group = frm.elements[0].value;
	var email_val = frm.elements[1].value;
	var emailArray = '';

	if (group == 0) {
		alert("Please select the Group first");
		return false;
	}
	if(email_val.charAt(email_val.length - 1) == ','){
		email_val = email_val.substring(0, email_val.length - 1);
	}
	
	if(email_val.indexOf(',') !== -1){
	  emailArray = email_val.split(',');
	}else if(email_val.indexOf('\n') !== -1){
	  emailArray = email_val.split('\n');
	}else if(email_val.indexOf(',') === -1){
		 emailArray = email_val.split(',');
	}

    var email_item = '';
    var newEmail = '';
	for(var i=0;i<emailArray.length;i++){
		email_item = $.trim(emailArray[i]);//.trim();
		if(email_item != ''){
			email_item = email_item.replace(/\n/g, '');
			if(email_item.match(/@/g) == null || email_item.match(/@/g).length == 1){
				var atpos = email_item.indexOf("@");
				var dotpos = email_item.lastIndexOf(".");
				if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email_item.length) {
					alert("Invalid Email Address : "+email_item);
					return false;
				}
			}else{
				alert("Please separate email ids by comma to add multiple members");
				return false;
			}
		newEmail = newEmail + email_item +',';
		}
	}
	newEmail = newEmail.substring(0, newEmail.length - 1);
	document.getElementById('hiddenEmail').value = newEmail;
	frm.submit();
}