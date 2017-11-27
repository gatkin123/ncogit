function programdisplay(){
		
		this.proglist = new Array();
		this.progmenu = $('#in_dd');
		this.whichdtype = null;
		
	}
	programdisplay.prototype.addprog = function(p){
		this.proglist.push(new program(p));
		
		this.updateprogmenu();
		
	}
	programdisplay.prototype.delprog = function(pid){
		var i;
		for(i=0; i<this.proglist.length; i++){
			if(pid == this.proglist[i].myid){
				this.proglist.splice(i,1);
				break;
				
			}
		}
		this.updateprogmenu();
		myuimanager.updateprogramlisting(this.proglist[0].myid);
	}
	
	programdisplay.prototype.updateprogmenu = function(){
		var proglist = mydatamanager.programlist;
		
		this.progmenu.find('ul').html("");
		var upmen = "";
		
		var i;
		for(i=0; i<proglist.length; i++){
			var prog = proglist[i];
			upmen += ("<li><a href='#'>"+proglist[i].progname+"<span class='mensub'>&nbsp;&nbsp;modified:"+myuimanager.formatDateString(prog.modified)+"</span></a></li>");
			
		}
		this.progmenu.find('ul').html(upmen);
		this.progmenu.find('button').html(proglist[0].progname+"<span class='mensub'>&nbsp;&nbsp;modified:"+myuimanager.formatDateString(proglist[0].modified)+"</span>");
		var pid = 0;
		this.progmenu.find('li').each(function(ind){
			$(this).data('myid',pid++);
			$(this).click(function(){
				myuimanager.updateprogramlisting($(this).data('myid'));
			});
		});
		
		
		
	}
	
	programdisplay.prototype.initdialog = function(){
		$('#in_edit').click(function(evt){
			myuimanager.myprogdisplay.setnewdiag("edit");
			$('#initiativeDialog').modal('show');
		});
		
		$('#in_create').click(function(evt){
		//	myuimanager.myprogdisplay.setnewdiag("create");
		//	$('#initiativeDialog').modal('show');
		});
		
		$('#in_del').click(function(evt){
		//	myuimanager.myprogdisplay.setconfirmdiag("delete");
		//	$('#confirmDialog').modal('show');
		});
		
		$('#in_dup').click(function(evt){
		//	myuimanager.myprogdisplay.setnewdiag("dup");
		//	$('#initiativeDialog').modal('show');
		});
			
		
		$('#initiativeDialog .editdiagfooterbtns button').eq(0).click(function(evt){
			$('#initiativeDialog').modal('hide');
			myuimanager.myprogdisplay.updateProgramData();
		});
		$('#initiativeDialog .editdiagfooterbtns button').eq(1).click(function(evt){
			
			$('#initiativeDialog').modal('hide');
		});
		
		
		
		
	}
	
	programdisplay.prototype.updateProgramData=function(){
		var url = "";
		var dta = {};
		if(this.whichdtype == "edit"){
			var prog = mydatamanager.getcurrprogram();
			var url = "EditPrograms_cng";
			
			var id = mydatamanager.getcurrprogram().myid;
			//var email = $('#initdiagprogemail').next().find('input').val();
			var name = $('#initdiagprogname').next().find('input').val();
			var descr = $('#initdiagprogdescr').next().find('input').val();
			var created = prog.created;
				var moddate = myuimanager.createdateString();
		//	var created = $('#datetimepicker3 input').val();
		//	var modified = $('#datetimepicker4 input').val();
			//{ name: "John", location: "Boston" }
			
			 //dta = "?ID="+id+"&Owner_email="+email+"&Name="+name+"&Description="+descr+"&Created="+created+"&Modified="+modified;
			dta = {ID:id,Owner_email:email,Name:name,Description:descr,Created:created,Modified:moddate};
			
			prog.descr = descr;
			prog.progname = name;
			prog.modified = moddate;
			this.updateprogmenu();
			
		}
		else if(this.whichdtype == "create"){
			var url = "CreatePrograms_cng";
			var id = mydatamanager.getmaxprogramid()+1;
			var email = $('#initdiagprogemail').next().find('input').val();
			var name = $('#initdiagprogname').next().find('input').val();
			var descr = $('#initdiagprogdescr').next().find('input').val();
			var created = $('#datetimepicker3 input').val();
			var modified = $('#datetimepicker4 input').val();
			
			 dta = {ID:id,Owner_email:email,Name:name,Description:descr,Created:created,Modified:modified};
				
			
		}
		
		
		mydatamanager.updateProgramData(url,dta);
		/*
		
		
			String p_ID = getStringParameter(req,"ID","0");
			String p_Owner_email = getStringParameter(req,"Owner_email","0");
			String p_Name = getStringParameter(req,"Name","0");
			String p_Description = getStringParameter(req,"Description","0");
			String p_Created = getStringParameter(req,"Created","0");
			String p_Modified = getStringParameter(req,"Modified","0");
			
			
			
			
			<div class='editdiagline'>
				<div id='initdiagprogname' class='editdiagline_lab dreq'><span class='dreqast'>*</span>Name</div>
				<div id='initdiagprognameinput' class='editdiagline_val'><input placeholder='Enter Name' type='text' name='initname' value='Test Program'></div>
			</div>
			<div class='editdiagline'>		
				<div id='initdiagprogdescr' class='editdiagline_lab'>Description</div>
				<div class='editdiagline_val'><input placeholder='Enter Description' type='text' name='initdescr'></div>
			</div>
			
			<div class='editdiagline'>		
				<div id='initdiagprogdescr' class='editdiagline_lab'>Owner Email</div>
				<div class='editdiagline_val'><input placeholder='Enter Email' type='text' name='initdescr'></div>
			</div>
			
			
				<div class='editdiagline'>			
					<div class='editdiagline_lab'>Created Date</div>
				 	<div id='initdiagprogcreate' class="editdiagline_val">
		                <div class='input-group date' id='datetimepicker3'>
		                    <input type='text' class="form-control" />
		                    <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
		                </div>
						<script type="text/javascript">
						            $(function () {
						                $('#datetimepicker3').datetimepicker();
						            });
					     </script>
	            	</div>
				</div>
				<div class='editdiagline'>			
					<div class='editdiagline_lab'>Modified Date</div>
				 	<div id='initdiagprogmodify' class="editdiagline_val">
		                <div class='input-group date' id='datetimepicker4'>
		                    <input type='text' class="form-control" />
		                    <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
		                </div>
						<script type="text/javascript">
						            $(function () {
						                $('#datetimepicker4').datetimepicker();
						            });
					     </script>
	            	</div>
				</div>
				*/
		
	}
		
	
	
	
	
	programdisplay.prototype.setconfirmdiag = function(whichtype){
		if(whichtype == "delete"){
			$('#confirmDialog .modal-header div').html("Delete Program");
			$('#confirmDialog .modal-body div').html("Are you sure you want to delete this program?");
		}
	}
	
	programdisplay.prototype.setnewdiag = function(whichtype){
		this.whichdtype = whichtype;
			var prog = mydatamanager.getcurrprogram();
		if(whichtype == "edit"){
		
			
			$('#initiativeDialog .modal-header div').html("Edit Marketing Program");
			$('#initdiagprogname').next().find('input').attr('value',prog.progname);
			$('#initdiagprogdescr').next().find('input').attr('value',prog.descr);
			
		}
		else if(whichtype == "create"){
			$('#initiativeDialog .modal-header div').html("Create Marketing Program");
			$('#initdiagprogname').next().find('input').attr('value','');
			$('#initdiagprogdescr').next().find('input').attr('value','');
		}
		else if(whichtype == "dup"){
			$('#initiativeDialog .modal-header div').html("Duplicate Marketing Program");
			$('#initdiagprogname').next().find('input').attr('value',prog.progname+" Copy");
			$('#initdiagprogdescr').next().find('input').attr('value','');
		}
	}
	
	
	
