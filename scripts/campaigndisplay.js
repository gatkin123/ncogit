function campaigndisplay(uiman){
	this.myuiManager =uiman;
	this.whichsection = null;
	
	this.mydatasets = new Array();
	this.mycampaigns = new Array();
	this.mydeployment = null;
	
	this.choicemenu = $('#c_dd');
	
	this.datasetSection = $('#ccamp_cnt_dsets');
	this.modelSection = $('#ccamp_cnt_models');
	this.deploymentSection = $('#ccamp_cnt_depl');
	
	this.datasetbutton = $('#ccamp_datasets');
	this.datasetbutton.click(function(){
		//temp
		myuimanager.mycampdisplay.switchSection("datasets");
	});
	
	
	this.modelbutton = $('#ccamp_models');
	this.modelbutton.click(function(){
			//temp
		myuimanager.mycampdisplay.switchSection("models");
	});
	
	this.deploybutton = $('#ccamp_deployment');
	this.deploybutton.click(function(){
			//temp
		//myuimanager.mycampdisplay.switchSection("deployment");
	});
	
	this.mydsetdisplay = new datasetDisplay(this);
	this.mymodeldisplay = new modelDisplay(this);

}

campaigndisplay.prototype.initcampmenu = function(){
	//c_dd
	var currprog = mydatamanager.getcurrprogram();
	//currprog.currcamp = 1;
	this.choicemenu.find('ul').html("");
	var str = "";
	var i;
	for(i=0; i<currprog.campaigns.length; i++){
		var currcamp = currprog.campaigns[i];
		var currcampname = currcamp.campname;
		str += ("<li><a href='#'>"+currcampname+"<span class='mensub'>&nbsp;&nbsp;modified: "+myuimanager.formatDateString(currcamp.modified)+"</span></a></li>");
	}
	this.choicemenu.find('ul').html(str);
	this.choicemenu.find('button').html(currcampname+"<span class='mensub'>&nbsp;&nbsp;modified: "+myuimanager.formatDateString(currcamp.modified)+"</span>");
	var pid = 0;
	this.choicemenu.find('li').each(function(ind){
		$(this).data('myid',pid++);
		$(this).click(function(){
			//temp
		//	myuimanager.switchcampaign($(this).data('myid'));
		});
	});
	
	
}

campaigndisplay.prototype.updatecampaignlisting = function(){
	var currcamp = mydatamanager.getcurrcampaign();
	
}
campaigndisplay.prototype.switchSection = function(s){
	
	
	this.clearsections();
	this.whichsection = s;


	if(this.whichsection == "datasets"){
		
		this.datasetbutton.removeClass('cctbinactive');
		this.datasetbutton.addClass('cctbactive');
		this.datasetSection.css('left',0).css('top',0);
	}
	else if(this.whichsection == "models"){
		this.modelbutton.removeClass('cctbinactive');
		this.modelbutton.addClass('cctbactive');
		this.modelSection.css('left',0).css('top',0);
	}
	else if(this.whichsection == "deployment"){
		this.deploybutton.removeClass('cctbinactive');
		this.deploybutton.addClass('cctbactive');
		this.deploymentSection.css('left',0).css('top',0);
		
	}
	
	
}
campaigndisplay.prototype.clearsections = function(){
	this.datasetbutton.removeClass('cctbactive');
	this.modelbutton.removeClass('cctbactive');
	this.deploybutton.removeClass('cctbactive');
	
	this.datasetbutton.addClass('cctbinactive');
	this.modelbutton.addClass('cctbinactive');
	this.deploybutton.addClass('cctbinactive');
	
	
	
	this.datasetSection.css('left',-2000).css('top',-2000);
	this.modelSection.css('left',-2000).css('top',-2000);
	this.deploymentSection.css('left',-2000).css('top',-2000);
	
}

campaigndisplay.prototype.updatewidth_ccamp_cntarea=function(){
	var cnt = $('#ccamp_cntarea');
	cnt.css('width',cnt.parent().width()-200);
	
}

campaigndisplay.prototype.initdialog = function(){
		$('#c_edit').click(function(evt){
			myuimanager.mycampdisplay.setnewdiag("edit");
			$('#campaignDialog').modal('show');
		});
		
		$('#c_create').click(function(evt){
			//temp
		//	myuimanager.mycampdisplay.setnewdiag("create");
		//	$('#campaignDialog').modal('show');
		});
		
		$('#c_del').click(function(evt){
		//	myuimanager.mycampdisplay.setconfirmdiag("delete");
		//	$('#confirmDialog').modal('show');
		});
		
		$('#c_dup').click(function(evt){
		//	myuimanager.mycampdisplay.setnewdiag("dup");
		//	$('#campaignDialog').modal('show');
		});
			
		
		$('#campaignDialog .editdiagfooterbtns button').eq(0).click(function(evt){
			$('#campaignDialog').modal('hide');
			myuimanager.mycampdisplay.updateCampaignData();
			
		});
		$('#campaignDialog .editdiagfooterbtns button').eq(1).click(function(evt){
			$('#campaignDialog').modal('hide');
		});
		
		var mui = myuimanager;
		var tst = mui.getDRowFromLabel($('#campaignDialog'),"Campaign Type");
		mui.setddownaction(mui.getDRowFromLabel($('#campaignDialog'),"Campaign State").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#campaignDialog'),"Campaign Type").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#campaignDialog'),"Campaign Method").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#campaignDialog'),"Contact Channel").find('.dropdown'));
}
campaigndisplay.prototype.updateCampaignData = function(){
	
	var url = "";
	var dta = {};
	if(this.whichdtype == "edit"){
		var url = "EditCampaign_cng";
		
		var id = mydatamanager.getcurrcampaign().myid;
		var progid = mydatamanager.getcurrprogram().myid;
		var mui = myuimanager;
		var name = mui.getDRowFromLabel($('#campaignDialog'),"Name").find('.editdiagline_val input').val();
		var descr = mui.getDRowFromLabel($('#campaignDialog'),"Description").find('.editdiagline_val input').val();
		//var createdate = $('#datetimepicker_progcreate input').val();
		//var moddate = $('#datetimepicker_progmod input').val();
		var createdate = mydatamanager.getcurrcampaign().created;
		var moddate = myuimanager.createdateString();
		var campstate = mui.getDRowFromLabel($('#campaignDialog'),"Campaign State").find('button').html();
		var camptype = mui.getDRowFromLabel($('#campaignDialog'),"Campaign Type").find('button').html();
		var campmethod = mui.getDRowFromLabel($('#campaignDialog'),"Campaign Method").find('button').html();
		var contchannel = mui.getDRowFromLabel($('#campaignDialog'),"Contact Channel").find('button').html();
		var fxcost = mui.getDRowFromLabel($('#campaignDialog'),"Fixed Cost").find('.editdiagline_val input').val();
		var varcost = mui.getDRowFromLabel($('#campaignDialog'),"Variable Cost").find('.editdiagline_val input').val();
		var varcostunit = mui.getDRowFromLabel($('#campaignDialog'),"Variable Cost Unit").find('.editdiagline_val input').val();
		//datetimepicker_depstart
		var depstart = $('#datetimepicker_depstart input').val();
		var depend = $('#datetimepicker_depend input').val();
		if(depstart == undefined){depstart = "";}
		if(depend == undefined){depend = "";}
		
		var camp = mydatamanager.getcurrcampaign();
		camp.campname = name;
		camp.mydescr = descr;
		camp.campstate = campstate;
		camp.camptype = camptype;
		camp.campmethod = campmethod;
		camp.contchanel = contchannel;
		camp.fixedcost = fxcost;
		camp.variablecost = varcost;
		camp.varcostunit= varcostunit;
		camp.depstartdate = depstart;
		camp.dependdate = depend;
		camp.moddate = moddate;
		
		
		dta = {ID:id,Program_ID:progid,Name:name, Description:descr,Created:createdate,Modified:moddate,Campaign_State:campstate,Campaign_Type:camptype,Campaign_Method:campmethod,Contact_Channel:contchannel,Fixed_Cost:fxcost,Var_Cost:varcost,Var_Cost_Unit:varcostunit,Deploy_Start:depstart, Deploy_End:depend};
		this.initcampmenu();
	}
	else if(this.whichdtype == "create"){
		
			var url = "CreateCampaigns_cng";
			var id = mydatamanager.getmaxcampid()+1;
			
			var progid = mydatamanager.getcurrprogram().myid;
			var mui = myuimanager;
			var name = mui.getDRowFromLabel($('#campaignDialog'),"Name").find('.editdiagline_val input').val();
			var descr = mui.getDRowFromLabel($('#campaignDialog'),"Description").find('.editdiagline_val input').val();
		//	var createdate = $('#datetimepicker_progcreate input').val();
		//	var moddate = $('#datetimepicker_progmod input').val();
			var createdate = myuimanager.createdateString();
			var moddate = myuimanager.createdateString();
		
		
			var campstate = mui.getDRowFromLabel($('#campaignDialog'),"Campaign State").find('button').html();
			var camptype = mui.getDRowFromLabel($('#campaignDialog'),"Campaign Type").find('button').html();
			var campmethod = mui.getDRowFromLabel($('#campaignDialog'),"Campaign Method").find('button').html();
			var contchannel = mui.getDRowFromLabel($('#campaignDialog'),"Contact Channel").find('button').html();
			var fxcost = mui.getDRowFromLabel($('#campaignDialog'),"Fixed Cost").find('.editdiagline_val input').val();
			var varcost = mui.getDRowFromLabel($('#campaignDialog'),"Variable Cost").find('.editdiagline_val input').val();
			var varcostunit = mui.getDRowFromLabel($('#campaignDialog'),"Variable Cost Unit").find('.editdiagline_val input').val();
			//datetimepicker_depstart
			var depstart = $('#datetimepicker_depstart input').val();
			var depend = $('#datetimepicker_depend input').val();

			dta = {ID:id,Program_ID:progid,Name:name, Description:descr,Created:createdate,Modified:moddate,Campaign_State:camp,Campaign_Type:camptype,Campaign_Method:campmethod,Contact_Channel:contchannel,Fixed_Cost:fxcost,Var_Cost:varcost,Var_Cost_Unit:varcostunit,Deploy_Start:depstart, Deploy_End:depend};
		
		
		
	}
		mydatamanager.updateProgramData(url,dta);
	
	
	
	
	
	
	
	
}
campaigndisplay.prototype.setconfirmdiag = function(whichtype){
	if(whichtype == "delete"){
		$('#confirmDialog .modal-header div').html("Delete Campaign");
		$('#confirmDialog .modal-body div').html("Are you sure you want to delete this campaign?");
	}
}

campaigndisplay.prototype.setnewdiag = function(whichtype) {
	var camp = mydatamanager.getcurrcampaign();
	this.whichdtype = whichtype;
if(whichtype == "edit"){

	
	$('#campaignDialog .modal-header div').html("Edit Campaign");
	$('#initdiagcampname').next().find('input').attr('value',camp.campname);
	$('#initdiagcampdescr').next().find('input').attr('value',camp.mydescr);
	
	myuimanager.getDRowFromLabel($('#campaignDialog'),"Campaign State").find('button').html(camp.campstate);
	myuimanager.getDRowFromLabel($('#campaignDialog'),"Campaign Type").find('button').html(camp.camptype);
	myuimanager.getDRowFromLabel($('#campaignDialog'),"Campaign Method").find('button').html(camp.campmethod);
	myuimanager.getDRowFromLabel($('#campaignDialog'),"Contact Channel").find('button').html(camp.contchannel);
	
		myuimanager.getDRowFromLabel($('#campaignDialog'),"Fixed Cost").find('.editdiagline_val input').val(camp.fixedcost);
		myuimanager.getDRowFromLabel($('#campaignDialog'),"Variable Cost").find('.editdiagline_val input').val(camp.variablecost);
		myuimanager.getDRowFromLabel($('#campaignDialog'),"Variable Cost Unit").find('.editdiagline_val input').val(camp.varcostunit);
		

	
}
else if(whichtype == "create"){
	$('#campaignDialog .modal-header div').html("Create Campaign");
	$('#initdiagprogname').next().find('input').attr('value','');
	$('#initdiagprogdescr').next().find('input').attr('value','');
}
else if(whichtype == "dup"){
	$('#campaignDialog .modal-header div').html("Duplicate Campaign");
	$('#initdiagprogname').next().find('input').attr('value',camp.progname+" Copy");
	$('#initdiagprogdescr').next().find('input').attr('value','');
}

	
}
