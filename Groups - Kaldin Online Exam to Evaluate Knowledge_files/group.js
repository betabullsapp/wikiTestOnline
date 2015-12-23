function showDialog() {
	$("#dialog").dialog({
		autoOpen : true,
		height : 'auto',
		width : 'auto',
		modal : true,
		closeOnEscape : false
	});
	$("#dialog").dialog('option', 'title', "Group");
	$("#dialog").dialog('option', 'show', 'drop');
	$("#dialog").dialog('option', 'resizable', true)
	$("#dialog")
			.html(
					"<p>Group: <input type='text' id='dlggroupname' size='30' onkeypress='return charsonly(event)'/><p><p style='text-align: right;'><input type='button' value='Save' onclick='saveGroup();' class='btn_green'></p>");
	$("#dialog").dialog('open');
}

function showEditDialog(levelid, levelName) {
	$("#dialog").dialog({
		autoOpen : true,
		height : 'auto',
		width : 'auto',
		modal : true,
		closeOnEscape : false
	});
	$("#dialog").dialog('option', 'title', "Group");
	$("#dialog").dialog('option', 'show', 'drop');
	$("#dialog").dialog('option', 'resizable', true)
	$("#dialog")
			.html(
					"<p>Group: <input type='text' size='30' value='"
							+ levelName
							+ "' id='newgroupname' onkeypress='return charsonly(event)'/></p><p style='text-align: right;'><input type='button' value='Save' onclick='editLevel();'  class='btn_green'/></p><input type='hidden' id='grpName' value='"
							+ levelName
							+ "'> <input type='hidden'id='grpid' value="
							+ levelid + ">");
	$("#dialog").dialog('open');
}

function saveGroup() {
	var frm = document.forms["GroupForm"];
	var group = document.getElementById("dlggroupname").value;

	if (group == "") {
		alert("Enter Group name");
		return false;
	} else if (group[0] == " ") {
		alert("Do not begin with space ");
		return false;
	} else {
		$.post("group.do", {
			check : "checkLevel",
			groupname : group
		},
				function(data) {
					if (data == 'Found') {
						alert("Group is already exists");
					} else {
						frm.operation.value = "add";
						frm.groupname.value = document.getElementById("dlggroupname").value;
						frm.submit();
					}
				});
	}
}
function editLevel() {

	var frm = document.forms["GroupForm"];
	var group = document.getElementById("newgroupname").value;
	if (group == "") {
		alert("Enter Group name");
		return false;
	} else if (group[0] == "") {
		alert("Do not begin with space ");
		return false;
	} else if (document.getElementById("grpName").value == group) {
		frm.operation.value = "edit";
		frm.groupid.value = document.getElementById("grpid").value;
		frm.groupname.value = document.getElementById("newgroupname").value;
		frm.submit();
	} else {
		$.post("Level.do", {
				check : "checkLevel",
				groupname : group
			},
			function(data) {
				if (data == 'Found') {
					alert("Group already exists");
				} else {
					frm.operation.value = "edit";
					frm.groupid.value = document.getElementById("grpid").value;
					frm.groupname.value = document.getElementById("newgroupname").value;
					frm.submit();
				}
			});
	}
}

function dopage(page, op) {
	document.forms["GroupForm"].operation.value = "LIST";
	document.forms["GroupForm"].startPage.value = page;
	document.forms["GroupForm"].submit();
}

function doSubmit() {
	var frm = document.forms["GroupForm"];
	frm.submit();
}
function doLevelAdd() {
	document.getElementById("groupname").value = "";
}
function doLevelDelete(groupid) {
	var frm = document.forms["GroupForm"];
	frm.groupid.value = groupid;
	frm.operation.value = "delete";
	if (confirm('Do you want to delete this Group?'))
		doSubmit();
}

function charsonly(e) {
	var unicode = e.charCode ? e.charCode : e.keyCode
	// if the key isn't the backspace key (which we should allow)
	if (unicode != 8 && unicode != 32 && unicode != 37 && unicode != 38
			&& unicode != 39 && unicode != 40) {
		//if (unicode < 65 || unicode > 90 && unicode < 97 || unicode > 122) // if not a number
		//	return false // disable key press
	}
}

/* For groupusers.jsp*/
getUsers = function() {
	var groupid = document.getElementById("groupid").value;
	var frm = document.forms["GroupForm"];
	document.forms["GroupForm"].operation.value="getUsers";
	frm.submit();
	
	/* $.post("groupuser.do", {
		groupid : groupid,
		op : "getUsers"
	}, function(data) {
		if (data == null) {
			message(container, "Data Not Found...");
		} else {
			document.getElementById("groupusers").innerHTML = data;
		}
	}); */
}
