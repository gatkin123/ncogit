function datasetDisplay(cdisp){
	this.mycampdisplay = cdisp;
	this.dsetprofchart = new dsetProfileChart(this);
	
	
}
datasetDisplay.prototype.init = function(){
	
	this.currdset = 0;
	this.whichsection = "schema";
	this.whichschemaview = "preview";
	
	this.dsetdisp_nocont = $('#ccamp_cnt_dsets_firstime');
	this.dsetdisp_cont = $('#ccamp_cnt_dsets_existing');
	
	this.dsetmenu = $('#ds_dd');
	
	this.dsetschema = $('#ds_schema');
	this.dsetschema_preview = $('#ds_schema_prev');
	this.dsetschema_attr = $('#ds_schema_attr');
	
	this.dsetprofile = $('#ds_profile');
	this.dsetprofilechoose = $('#ds_prof_choose');
	this.dstogg = $('#ds_toggle');
	
	this.dstogg.find('li').eq(0).click(function(){
		myuimanager.mydsetdisplay.toggleDataset("schema");
		
	});
	this.dstogg.find('li').eq(1).click(function(){
		myuimanager.mydsetdisplay.toggleDataset("profile");
		
	});
	

	$('#ds_scht_attributes a').click(function(){
		myuimanager.mydsetdisplay.toggleSchema("attributes");
		
	});
	
	$('#dsets_firstime_create').click(function(){
		myuimanager.mydsetdisplay.setnewdiag("create");
		$('#datasetDialog').modal('show');
	
	});
	this.clearnodscont();
	this.cleardsets();
	
	
	
	if (mydatamanager.getcurrprogram().datasetsexist == false){
		this.shownodscont();
		this.cleardscont();
	}
	else{
	
	
		this.initTestTables();
		this.initProfiles();
		this.toggleDataset(null);
		this.toggleSchema(null);
		this.setdsetlist();

	}

	this.initdialog();	
	
}
datasetDisplay.prototype.cleardatasets = function(){
	this.shownodscont();
	this.cleardscont();
}
datasetDisplay.prototype.updatewidth_tstTables = function(){
	var off = 75;
	$('#tsttable').width($('#tsttable').parent().width() - off);
	$('#tsttable_mn').width($('#tsttable').parent().width() - off);
	var attrtab = $('#tsttableattr table');
	$('#tsttableattr').css('width',attrtab.width());
	
	$('#tablescrollback').css('left',$('#tsttable').width()+10);
	$('#tablescroll').css('left',$('#tsttable').width()+40);
	
}

datasetDisplay.prototype.clearnodscont = function(){
	this.dsetdisp_nocont.css('left',-2000).css('top',-2000);
}

datasetDisplay.prototype.shownodscont = function(){
	this.dsetdisp_nocont.css('left',0).css('top',0);
}

datasetDisplay.prototype.cleardscont = function(){
	this.dsetdisp_cont.css('left',-2000).css('top',-2000);
}

datasetDisplay.prototype.showdscont = function(){
	this.dsetdisp_cont.css('left',0).css('top',0);
}


datasetDisplay.prototype.cleardsets = function(){
	this.dsetschema.css('left',-2000).css('top',-2000);
	this.dsetprofile.css('left',-2000).css('top',-2000);
}


datasetDisplay.prototype.deletecallback = function(){
	var currds = mydatamanager.getcurrprogram().currdset;
	this.currdset = currds;
	this.setdsetlist(currds);
	this.initTestTables();
	this.initProfiles();
	this.toggleDataset(null);
	this.toggleSchema(null);
	this.clearnodscont();
	this.showdscont();
	
}


datasetDisplay.prototype.addNewdset = function(){
	$('#initloadDialog').modal('hide');
	var currds = mydatamanager.getcurrprogram().currdset;
	this.currdset = currds;
	this.setdsetlist(currds);
	this.initTestTables();
	this.initProfiles();
	this.toggleDataset(null);
	this.toggleSchema(null);
	$('#datasetDialog').modal('hide');
	this.clearnodscont();
	this.showdscont();
	
}

datasetDisplay.prototype.setdsetlist = function(ds){
	this.dsetmenu.find('ul').html("");
	var dsetstr = "";
	var dsets = mydatamanager.getcurrprogram().getdsets();
	var i;
	
	for(i=0; i<dsets.length; i++){
		dsetstr += ("<li><a href='javascript:;'>"+dsets[i].mycamp+"</a></li>");
	}
	this.dsetmenu.find('ul').html(dsetstr);
	if(ds==null || ds==undefined){
		this.dsetmenu.find('button').html(dsets[0].mycamp);
	}
	else{
		this.dsetmenu.find('button').html(dsets[ds].mycamp);
	}
	this.dsetmenu.find('li').each(function(ind){
		$(this).data('myind',ind).click(function(){
			var btxt = $(this).find('a').html();
			myuimanager.mydsetdisplay.dsetmenu.find('button').html(btxt);
			myuimanager.mydsetdisplay.currdset = ($(this).data('myind'));
			mydatamanager.getcurrprogram().currdset = myuimanager.mydsetdisplay.currdset;
			myuimanager.mydsetdisplay.initTestTables();
			myuimanager.mydsetdisplay.initProfiles();
			
			
		});
	});
	
	
	
}
datasetDisplay.prototype.toggleDataset = function(sec){
	if(!(sec==null)){this.whichsection = sec};
	if(this.whichsection=="profile"){
		
		$('#ds_toggle li').removeClass('active');
		$('#ds_toggle li').eq(1).addClass('active');
		
		this.dsetschema.css('left',-2000).css('top',-2000);
		this.dsetprofile.css('left',0).css('top',25);
	}
	else{
		$('#ds_toggle li').removeClass('active');
		$('#ds_toggle li').eq(0).addClass('active');
		
		this.dsetschema.css('left',15).css('top',25);
		this.dsetprofile.css('left',-2000).css('top',-2000);
	}
}
datasetDisplay.prototype.toggleSchema = function(sec){
	if(!(sec==null)){this.whichschemaview = sec};
	if(this.whichschemaview=="attributes"){
		this.dsetschema_preview.css('left',-2000).css('top',-2000);
		this.dsetschema_attr.css('left',0).css('top',25);
		
		$('#ds_scht_attributes').html("Attributes");
		$('#ds_scht_preview').html("<a href='javascript:;'>Preview</a>");
		$('#ds_scht_preview a').click(function(){
			myuimanager.mydsetdisplay.toggleSchema("preview");

		});
		
		
	}
	else{
		this.dsetschema_preview.css('left',0).css('top',25);
		this.dsetschema_attr.css('left',-2000).css('top',-2000);
		
		$('#ds_scht_preview').html("Preview");
		$('#ds_scht_attributes').html("<a href='javascript:;'>Attributes</a>");
		$('#ds_scht_attributes a').click(function(){
			myuimanager.mydsetdisplay.toggleSchema("attributes");

		});
	}

}
datasetDisplay.prototype.initProfiles = function(){
	var dset = mydatamanager.getcurrdset();
	//var offerob = dset.getFlagData('offer');
	//var predob = dset.getFlagData('prediction');
	var keyob = dset.getFlagData('primary-key');
	var numericalobs = dset.getNumericalAttrs();
	
	$('#dsprment_mainattr').html("");
	var mainattrstr = "";
	
	//	<div class = 'dsprmen_mattr'><span class='fa fa-credit-card'></span>&nbsp;Offer</div>
//	mainattrstr += ("<div class='dsprmen_mattr dsprmenactive'><span class='fa fa-bar-chart'></span>&nbsp;Response</div>");
//	mainattrstr += ("<div class='dsprmen_mattr'><a href='javascript:;'><span class='fa fa-credit-card'></span>&nbsp;Message</a></div>");
	
	
	$('#dsprmen_mainattr').html(mainattrstr);
	
	var otherattrstr = "";
	
	var i;
	for(i=0;i<numericalobs.length;i++){
		otherattrstr += ("<div class = 'dsprmen_oattr'><a href='javascript:;'>"+numericalobs[i].attr+"</a></div>");
	}
	$('#dsprmen_othattr_panel').html(otherattrstr);
	
//	$('#dsprmen_mainattr').find('div').eq(0).click(function(){
//		myuimanager.mydsetdisplay.choosedsprof("response");
//	});
	
//	$('#dsprmen_mainattr').find('div').eq(1).click(function(){
//		myuimanager.mydsetdisplay.choosedsprof("message");
//	});
	
	$('#dsprmen_othattr_panel div a').each(function(ind){
		var index = ind;
		$(this).click(function(){
			
			myuimanager.mydsetdisplay.choosedsprof($(this).html());
		});
	});
	
	
	
	
	this.whichchoice = numericalobs[0].attr;
	this.whichchoicemode = "total";
	
	this.initDsetChoose();
	
	this.dsetprofchart.initchartNav();
	dset.setChartData(numericalobs[0].attr,this.whichchoicemode);
	this.choosedsprof(numericalobs[0].attr);
	this.dsetprofchart.build();
	
	
	//testing
	/*
	this.whichchoice = "AGGREGATE_CREDIT_LIMIT";
	//this.whichchoicemode = "compareoffer";
	
	this.initDsetChoose();
	this.whichchoicemode = "compareprediction";
	this.dsetprofchart.initchartNav();
	this.dsetprofchart.chartType = "cluster";
	dset.setChartData((this.whichchoice),this.whichchoicemode)
	this.dsetprofchart.build();
	*/
	
	
}
datasetDisplay.prototype.switchProfileChart = function(typ){
	this.dsetprofchart.chartType = typ;
	$('.chicon').removeClass('chicactive');
	if(typ=="cluster"){
		
		$('.chicon').eq(0).addClass('chicactive');
	}
	else{
		$('.chicon').eq(1).addClass('chicactive');
	}
	this.dsetprofchart.build();
}

datasetDisplay.prototype.makeMenuLinks = function(){
	var dset = mydatamanager.getcurrdset();
	//var offerob = dset.getFlagData('offer');
	//var predob = dset.getFlagData('prediction');
	
//	var m1 = "<a href='javascript:;'><span class='fa fa-bar-chart'></span>&nbsp;Response</a>";
//	$('.dsprmen_mattr').eq(0).html(m1).removeClass('dsprmenactive');
//	var m2 = "<a href='javascript:;'><span class='fa fa-credit-card'></span>&nbsp;Message</a>";
//	$('.dsprmen_mattr').eq(1).html(m2).removeClass('dsprmenactive');
	
	$('.dsprmen_oattr').each(function(ind){
		var ht = $(this).find('a').html();
		if(ht == undefined || ht == null){
			ht = $(this).html();
		}
		var newstr = "<a href='javascript:;'>"+ht+"</a>";
		$(this).html(newstr).removeClass('dsprmenactive');
	});
	
//	$('#dsprmen_mainattr').find('div').eq(0).unbind().click(function(){
//		myuimanager.mydsetdisplay.choosedsprof("response");
//	});
	
//	$('#dsprmen_mainattr').find('div').eq(1).unbind().click(function(){
//		myuimanager.mydsetdisplay.choosedsprof("message");
//	});
	
	$('#dsprmen_othattr_panel div a').each(function(ind){
		var index = ind;
		$(this).unbind().click(function(){
			
			myuimanager.mydsetdisplay.choosedsprof($(this).html());
		});
	});
	
	
	
}
datasetDisplay.prototype.highlightMenu = function(whichp){
	var useind = 0;
	$('.dsprmen_oattr').each(function(ind){
		var ht = $(this).find('a').html();
		if(ht == whichp){
			useind = ind;
		}
	});
	
	$('.dsprmen_oattr').eq(useind).html(whichp);
	$('.dsprmen_oattr').eq(useind).addClass('dsprmenactive');
	
		

	
}
datasetDisplay.prototype.choosedsprof = function(whichp){
	var dset = mydatamanager.getcurrdset();
	var offob;
	var offrng;
	
	//var offerob = dset.getFlagData('offer');
	//var predob = dset.getFlagData('response');
	
	this.whichchoice = whichp;
	
	this.makeMenuLinks();
	/*
	if(this.whichchoice == "offer"){
		whichp = dset.getOfferAttr(this.whichchoice);
		
		var othstr = "<a href='javascript:;'><span class='fa fa-line-chart'></span>&nbsp;Response</a>";
		$('.dsprmen_mattr').eq(0).html(othstr);
		var thisstr = "<span class='fa fa-credit-card'></span>&nbsp;Message";
		$('.dsprmen_mattr').eq(1).html(thisstr);
		$('.dsprmen_mattr').eq(1).addClass('dsprmenactive');
		
		
	}
	else if(this.whichchoice == "response"){
		whichp = dset.getResponseAttr(this.whichchoice);
		
		var othstr = "<a href='javascript:;'><span class='fa fa-credit-card'></span>&nbsp;Message</a>";
		$('.dsprmen_mattr').eq(1).html(othstr);
		var thisstr = "<span class='fa fa-line-chart'></span>&nbsp;Response";
		$('.dsprmen_mattr').eq(0).html(thisstr);
		$('.dsprmen_mattr').eq(0).addClass('dsprmenactive');
			
	}
	*/
	
		this.highlightMenu(whichp);
	
	this.initDsetChoose();
	
	this.dsetprofchart.initchartNav();
	dset.setChartData(whichp,this.whichchoicemode)
	this.dsetprofchart.build();


}
datasetDisplay.prototype.resetChart = function(){
	var dset = mydatamanager.getcurrdset();
	dset.setChartData(this.whichchoice,this.whichchoicemode)
	this.dsetprofchart.build();	
}

datasetDisplay.prototype.initDsetChoose = function(){
	var complist = "";
	var dset = mydatamanager.getcurrdset();

		complist += "<div class='dsetprofchoice dsetprchactive'>Totals</div>";
		
		dset.rangemx = null;
		dset.rangesteps = null;
		
		this.dsetprofchart.clearRanges();
		this.dsetprofchart.buildRanges();
		this.dsetprofchart.setExtras(myuimanager.mydsetdisplay.whichchoice);
		
			
	
//	$('#ds_prof_choices').html(complist);
	
	
	$('.dsetprofchoice').click(function(){
		$('.dsetprofchoice').removeClass('dsetprchactive');
		$(this).addClass('dsetprchactive');
			var dset = mydatamanager.getcurrdset();
				dset.rangemx = null;
				dset.rangesteps = null;
			
		if($(this).html()=="Totals"){
			myuimanager.mydsetdisplay.whichchoicemode = "total";
			dset.setChartData(myuimanager.mydsetdisplay.whichchoice,myuimanager.mydsetdisplay.whichchoicemode);
			myuimanager.mydsetdisplay.dsetprofchart.clearRanges();
			myuimanager.mydsetdisplay.dsetprofchart.buildRanges();
			myuimanager.mydsetdisplay.dsetprofchart.setRanges(myuimanager.mydsetdisplay.whichchoice);
				
			myuimanager.mydsetdisplay.dsetprofchart.initchartNav();
			
			myuimanager.mydsetdisplay.dsetprofchart.build();
		}
		
		/*else if($(this).html()=="Message"){
			myuimanager.mydsetdisplay.whichchoicemode = "comparemessage";
			dset.setChartData(myuimanager.mydsetdisplay.whichchoice,myuimanager.mydsetdisplay.whichchoicemode);
			myuimanager.mydsetdisplay.dsetprofchart.clearRanges();
			myuimanager.mydsetdisplay.dsetprofchart.buildRanges();
			myuimanager.mydsetdisplay.dsetprofchart.setRanges(myuimanager.mydsetdisplay.whichchoice);
			
			myuimanager.mydsetdisplay.dsetprofchart.initchartNav();
			myuimanager.mydsetdisplay.dsetprofchart.build();
		}
		else if($(this).html() == "Response"){
			myuimanager.mydsetdisplay.whichchoicemode = "compareresponse";
			dset.setChartData(myuimanager.mydsetdisplay.whichchoice,myuimanager.mydsetdisplay.whichchoicemode);
			myuimanager.mydsetdisplay.dsetprofchart.clearRanges();
			myuimanager.mydsetdisplay.dsetprofchart.buildRanges();
			myuimanager.mydsetdisplay.dsetprofchart.setRanges(myuimanager.mydsetdisplay.whichchoice);
				
			myuimanager.mydsetdisplay.dsetprofchart.initchartNav();
			myuimanager.mydsetdisplay.dsetprofchart.build();
		}
		*/
	});
	this.whichchoicemode = "total";
}
var tabscroll = 0;


datasetDisplay.prototype.updateType =function(pid,typ){
	var dset = mydatamanager.getcurrdset(this.currdset);
	dset.attroblist[pid].datatype = typ;
	dset.typelist[pid]=typ;
	this.resetTestTableHeaders(pid);
}




datasetDisplay.prototype.updateTypeMenu = function(ind){
	var dset = mydatamanager.getcurrdset(this.currdset);
	

	var parind = ind;
	$('#typemenu ul li').each(function(index){
		$(this).data('parind',parind);
	});


	
	
}

datasetDisplay.prototype.updateTypeMenuAttr = function(ind){
	var dset = mydatamanager.getcurrdset(this.currdset);
	

	var parind = ind;
	$('#typemenuattr ul li').each(function(index){
		$(this).data('parind',parind);
	});


	
	
}


datasetDisplay.prototype.updateFlag =function(pid,fid){
	var dset = mydatamanager.getcurrdset(this.currdset);
	var i;
	var spl = fid.split("_");
	var flagstr = "";
	for(i=1;i<spl.length; i++){
		flagstr += spl[i];
		if(i<(spl.length-1)){
			flagstr += " ";
		}
	}
	
	var fl;
	var attrus;
	var attobus;
	
	if(flagstr == "Primary Key"){
		fl = "key";
		attrus = "primary-key";
	}
	else if(flagstr == "Response"){
		fl = "line-chart";
		attrus = "outcome";
	}
	else if(flagstr == "Treatment"){
		fl = "credit-card";
		attrus = "treatment";
	}
	else if(flagstr == "Model Only"){
		fl = "gears";
		attrus = "model-only";
	}
	else if(flagstr == "Stats Only"){
		fl = "bar-chart";
		attrus = "stats-only";
	}
	else if(flagstr == "Weight"){
		fl = "balance-scale";
		attrus = "weight";
	}
	else if(flagstr == "Ignore"){
		fl = "window-close";
		attrus = "ignore";
	}
	else if(flagstr == "Clear"){
		fl = "na";
		attrus = "";
		
	}
	
	
	dset.attroblist[pid].attributeUsage = attrus;
	dset.flaglist[pid] = fl;
	dset.flagnamelist[pid] = attrus;
	
	this.checkchanges();
	this.resetTestTableHeaders(pid);
	
}
datasetDisplay.prototype.updateFlagMenu = function(ind){
	var dset = mydatamanager.getcurrdset(this.currdset);
	var currflag = dset.flagnamelist[ind];
	var primkeyset = false;
	var messageset = false;
	var responseset = false;
	var modonlyset = false;
	var statsonlyset = false;
	var weightset = false;
	
	var i;
	for(i=0; i<dset.attroblist.length; i++){
		var currattrob = dset.attroblist[i];
		if(currattrob.attributeUsage=="primary-key"){
			primkeyset = true;
		}
		if(currattrob.attributeUsage=="outcome"){
			responseset = true;
		}
		if(currattrob.attributeUsage=="model-only"){
			modonlyset = true;
		}
		if(currattrob.attributeUsage=="stats-only"){
			statsonlyset = true;
		}
		if(currattrob.attributeUsage=="weight"){
			weightset = true;
		}
	}
	
	
	
	var fmenstr ="<ul>";		
	for(i=0;i<this.flagheaderlist.length; i++ ){
		var currfl = this.flagheaderlist[i];
		if(currfl == "Primary Key" && primkeyset==false){
			fmenstr += ("<li id='fm_Primary_Key'><span class='fa fa-key'></span>&nbsp;Primary Key</li>");
		}
		if(currfl == "Response" && responseset==false){
			fmenstr += ("<li id='fm_Response'><span class='fa fa-line-chart'></span>&nbsp;Response</li>");
		}
		if(currfl == "Treatment"){
			fmenstr += ("<li id='fm_Treatment'><span class='fa fa-credit-card'></span>&nbsp;Treatment</li>");
		}
		if(currfl == "Model Only" && modonlyset==false){
			fmenstr += ("<li id='fm_Model_Only'><span class='fa fa-gears'></span>&nbsp;Model Only</li>");
		}
		if(currfl == "Stats Only" && statsonlyset==false){
			fmenstr += ("<li id='fm_Stats_Only'><span class='fa fa-bar-chart'></span>&nbsp;Stats Only</li>");
		}
		if(currfl == "Weight" && weightset==false){
			fmenstr += ("<li id='fm_Weight'><span class='fa fa-balance-scale'></span>&nbsp;Weight</li>");
		}
	
	}
		fmenstr += ("<li id='fm_Ignore'><span class='fa fa-window-close'></span>&nbsp;Ignore</li>");
		fmenstr += ("<li id='fm_Clear'><span class='fa fa-square'></span>&nbsp;Clear</li></ul>");
	$('#flagmenu').html(fmenstr);
	var parind = ind;
	$('#flagmenu ul li').each(function(index){
		$(this).data('parind',parind);
	});
	
	$('#flagmenu li').click(function(){
			myuimanager.mydsetdisplay.flagmenup = false;
		$('#flagmenu').fadeTo(100,0.0,function(){$(this).css('left',-2005);});
		//this.flagmenup = false;
		var flid = $(this).attr('id');
		var parind = $(this).data('parind');
		myuimanager.mydsetdisplay.updateFlag(parind,flid);
	});


	
	
}

datasetDisplay.prototype.updateFlagMenuAttr = function(ind){
	var dset = mydatamanager.getcurrdset(this.currdset);
	var currflag = dset.flagnamelist[ind];
	var primkeyset = false;
	var messageset = false;
	var responseset = false;
	var modonlyset = false;
	var statsonlyset = false;
	var weightset = false;
	
	var i;
	for(i=0; i<dset.attroblist.length; i++){
		var currattrob = dset.attroblist[i];
		if(currattrob.attributeUsage=="primary-key"){
			primkeyset = true;
		}
		if(currattrob.attributeUsage=="outcome"){
			responseset = true;
		}
		if(currattrob.attributeUsage=="model-only"){
			modonlyset = true;
		}
		if(currattrob.attributeUsage=="stats-only"){
			statsonlyset = true;
		}
		if(currattrob.attributeUsage=="weight"){
			weightset = true;
		}
	}
	
	
	
	var fmenstr ="<ul>";		
	for(i=0;i<this.flagheaderlist.length; i++ ){
		var currfl = this.flagheaderlist[i];
		if(currfl == "Primary Key" && primkeyset==false){
			fmenstr += ("<li id='fma_Primary_Key'><span class='fa fa-key'></span>&nbsp;Primary Key</li>");
		}
		if(currfl == "Response" && responseset==false){
			fmenstr += ("<li id='fma_Response'><span class='fa fa-line-chart'></span>&nbsp;Response</li>");
		}
		if(currfl == "Treatment"){
			fmenstr += ("<li id='fm_Treatment'><span class='fa fa-credit-card'></span>&nbsp;Treatment</li>");
		}
		if(currfl == "Model Only" && modonlyset==false){
			fmenstr += ("<li id='fma_Model_Only'><span class='fa fa-gears'></span>&nbsp;Model Only</li>");
		}
		if(currfl == "Stats Only" && statsonlyset==false){
			fmenstr += ("<li id='fma_Stats_Only'><span class='fa fa-bar-chart'></span>&nbsp;Stats Only</li>");
		}
		if(currfl == "Weight" && weightset==false){
			fmenstr += ("<li id='fma_Weight'><span class='fa fa-balance-scale'></span>&nbsp;Weight</li>");
		}
	
	}
		fmenstr += ("<li id='fma_Ignore'><span class='fa fa-window-close'></span>&nbsp;Ignore</li>");
		fmenstr += ("<li id='fma_Clear'><span class='fa fa-square'></span>&nbsp;Clear</li></ul>");
	$('#flagmenuattr').html(fmenstr);
		var parind = ind;
	$('#flagmenuattr ul li').each(function(index){
		$(this).data('parind',parind);
	});
	
	$('#flagmenuattr li').click(function(){
			myuimanager.mydsetdisplay.flagattrmenup = false;
		$('#flagmenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
		$('#tsttableattr table tr').removeClass('tbldarkerrow');
		var flid = $(this).attr('id');
		var parind = $(this).data('parind');
		myuimanager.mydsetdisplay.updateFlag(parind,flid);

	});
	
	
}

datasetDisplay.prototype.resetTestTableHeaders = function(ind){
	
	var dset = mydatamanager.getcurrdset(this.currdset);
	var attrlst = dset.attributelist;
	var attnicklist = dset.attnicknamelist;
	
	var attrtypelst = dset.typelist;
	
	var attrrangelst = dset.rangelist;
	
	var flaglist = dset.flaglist;
	
	var flagcanonical = dset.flagnamelist;
	

		
		var ic;
		var ictxt;
		if(flaglist[ind]=="na"){
			ic = "<span>&nbsp;</span>";
			ictxt = "<span>&nbsp;</span>";
		}
		else{
			ic = "<span class='fa fa-"+flaglist[ind]+"'></span>";
			ictxt = "<span>"+flagcanonical[ind]+"</span>";
			ictxt = "<span>&nbsp;</span>";
		}
		ts = ("<div class='tablehead_flag sh2'>"+ic+"</div><div contenteditable='true' class='tablehead_main'>"+attnicklist[ind]+"</div><div class='tablehead_sec'>"+attrtypelst[ind]+"&nbsp;&nbsp;<span class='fa fa-chevron-down'></span></div>");
		
		tsattr = ("<td width='45' class='tblattr_flag sh2'>"+ic+"&nbsp;&nbsp;"+ictxt+"</td><td contenteditable='true' width = '200'>"+attnicklist[ind]+"</td><td width= '150' class='tblattr_type'>"+attrtypelst[ind]+"</td>");
		
		
		$('#tsttable table tr th').eq(ind).html(ts);
		
		
		
		$('#tsttableattr table tr').eq(ind).html(tsattr);
		
		$('.tablehead_flag').each(function(ind){
			$(this).data('ind',ind);

		});
		$('.tblattr_flag').each(function(ind){
			$(this).data('ind',ind);

		});
		
		//Setting the id number for each type section of the table 
		$('.tablehead_sec').each(function(ind){
			$(this).data('ind',ind);
		})

		$('.tblattr_type').each(function(ind){
			$(this).data('ind',ind);
		})
		
		
	
		
		
		$('.tablehead_flag').css('cursor','pointer').unbind().click(function(e){
			if(myuimanager.mydsetdisplay.flagmenup==false){
				myuimanager.mydsetdisplay.flagmenup = true;
				var l = $(this).position().left;
				var t = $(this).position().top;
				myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
				myuimanager.mydsetdisplay.updateFlagMenu($(this).data('ind'));

				$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2001);});
				$('#flagmenu').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height());
			}
			else{
				var currch = $(this).data('ind');
				if(!(currch == myuimanager.mydsetdisplay.whichtablechoice)){
					var l = $(this).position().left;
					var t = $(this).position().top;
					myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
					myuimanager.mydsetdisplay.updateFlagMenu($(this).data('ind'));

					//$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
					$('#flagmenu').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height());

				}
				else{
					myuimanager.mydsetdisplay.flagmenup = false;
					$('#flagmenu').fadeTo(100,0.0,function(){$(this).css('left',-2001);});
				}
			}
		});
		
		$('.tblattr_flag').css('cursor','pointer').unbind().click(function(e){
			if(myuimanager.mydsetdisplay.flagattrmenup==false){

				myuimanager.mydsetdisplay.flagattrmenup = true;
				var l = $(this).position().left;
				var t = $(this).position().top;
				myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
				myuimanager.mydsetdisplay.updateFlagMenuAttr($(this).data('ind'));
				$('#typemenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
				$('#flagmenuattr').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+15);
				$(this).parent().addClass('tbldarkerrow');
			}
			else{

				var currch = $(this).data('ind');
				if(!(currch == myuimanager.mydsetdisplay.whichtablechoice)){
					$('#tsttableattr table tr').removeClass('tbldarkerrow');
						var l = $(this).position().left;
						var t = $(this).position().top;
						myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
							myuimanager.mydsetdisplay.updateFlagMenuAttr($(this).data('ind'));
						$('#flagmenuattr').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+15);
						$(this).parent().addClass('tbldarkerrow');
				}
				else{
					$('#tsttableattr table tr').removeClass('tbldarkerrow');
					myuimanager.mydsetdisplay.flagattrmenup = false;
					$('#flagmenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2016);});
				}
			}

		});
		
		
			//Setting the actions for the type labels in the main header

			$('.tablehead_sec').css('cursor','pointer').unbind().click(function(e){
				if(myuimanager.mydsetdisplay.typemenup == false){
					myuimanager.mydsetdisplay.typemenup = true;
					var l = $(this).position().left;
					var t = $(this).position().top;
					myuimanager.mydsetdisplay.updateTypeMenu($(this).data('ind'));

					$('#typemenu').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+5);
				}
				else{

					myuimanager.mydsetdisplay.typemenup = false;
					$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
				}

			});


		//Setting the actions for the type labels in the attr table	

			$('.tblattr_type').css('cursor','pointer').unbind().click(function(e){
				if(myuimanager.mydsetdisplay.typeattrmenup == false){
					myuimanager.mydsetdisplay.typeattrmenup = true;
					var l = $(this).position().left;
					var t = $(this).position().top;
					myuimanager.mydsetdisplay.updateTypeMenuAttr($(this).data('ind'));
					$('#flagmenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
					$('#typemenuattr').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+15);
					$(this).parent().addClass('tbldarkerrow');
				}
				else{
					$('#tsttableattr table tr').removeClass('tbldarkerrow');
					myuimanager.mydsetdisplay.typeattrmenup = false;
					$('#typemenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
				}

			});
		
		
		

			$('#tsttableattr tr').each(function(ind){
				var nind = ind;
				$(this).find('td').eq(1).data('nickind',nind).keyup(function(){
					myuimanager.mydsetdisplay.updatenickname($(this).data('nickind'),'preview',$(this).html());
				});
			})
			
			$('.tablehead_main').each(function(ind){
				$(this).data('nickind',ind);
			});
				
			$('.tablehead_main').keyup(function() {
				myuimanager.mydsetdisplay.updatenickname($(this).data('nickind'),'attr',$(this).html());
			 // alert( "Handler for .keydown() called on "+$(this).data('nickind') );
			});
			
		
		
		
		
	
	
	
}

datasetDisplay.prototype.updatenickname = function(nind,otherpanel,str){
	
		var dset = mydatamanager.getcurrdset(this.currdset);
		var currattrob = dset.attroblist[nind];
		dset.attnicknamelist[nind]=str;
		currattrob.mynickname = str;
		
		if(otherpanel == "attr"){
			
			$("#tsttableattr table tr").eq(nind).find('td').eq(1).html(str);
			
		}
		else{
			
			$('#tsttable table th').eq(nind).find('div').eq(1).html(str);
			
		}	
		
		
	
	
}


datasetDisplay.prototype.initUpdateSchema =function(){
	$('#updateschemaattr').fadeTo(1,0);
	$('#updateschema').fadeTo(1,0);
	$('#upschema_msg').html("schema changes:");
	$('#upschema_attr_msg').html("schema changes:");
	
	this.schemachanged = false;
}

datasetDisplay.prototype.showSaved =function(){
	$('#upschema_msg').fadeTo(200,0,function(){$(this).html("changes saved").fadeTo(200,1)});
	$('#updateschema').delay(3000).fadeTo(200,0,function(){$('#upschema_msg').html("schema changes:")});
	
	$('#upschema_attr_msg').fadeTo(200,0,function(){$(this).html("changes saved").fadeTo(200,1)});
	$('#updateschemaattr').delay(3000).fadeTo(200,0,function(){$('#upschema_attr_msg').html("schema changes:")});
	
	this.schemachanged = false;
	
	
}

datasetDisplay.prototype.clearUpdateSchema =function(){
	$('#updateschemaattr').fadeTo(1,0);
	$('#updateschema').fadeTo(1,0);
	
	this.schemachanged = false;
}


datasetDisplay.prototype.checkchanges = function(){
	var ds = mydatamanager.getcurrprogram().getcurrdset();
	var changetest = ds.compareToHold();
	if(changetest){
		if(this.schemachanged == false){
			this.schemachanged = true;
			$('#updateschemaattr').fadeTo(300,1);
			$('#updateschema').fadeTo(300,1);
		}
	}
	
}

datasetDisplay.prototype.initTestTables = function(){
	
	this.initUpdateSchema();
	
	this.flagmenup = false;
	this.typemenup = false;
	this.flagattrmenup = false;
	this.typeattrmenup = false;
	
	this.flagheaderlist = new Array();
	this.flagheaderlist = ["Primary Key", "Treatment", "Response", "Model Only", "Stats Only", "Ignore", "Weight", "Clear"];
	
	//Setting actions on buttons to save changes

	

	$('#upschema_attr_sv').unbind().click(function(e){
		mydatamanager.editcurrdatasetAttrs();
	});
	
	$('#upschema_sv').unbind().click(function(e){
		mydatamanager.editcurrdatasetAttrs();
	});
	
	
	$('#upschema_attr_rev').unbind().click(function(e){
		mydatamanager.revertcurrdatasetAttrs();
	});
	
	$('#upschema_rev').unbind().click(function(e){
		mydatamanager.revertcurrdatasetAttrs();
	});
	
	
	
	/*
		<li><span class='fa fa-key'></span>&nbsp;Primary Key</li>
		<li><span class='fa fa-credit-card'></span>&nbsp;Message</li>
		<li><span class='fa fa-line-chart'></span>&nbsp;Response</li>
		<li><span class='fa fa-gears'></span>&nbsp;Model Only</li>
		<li><span class='fa fa-bar-chart'></span>&nbsp;Stats Only</li>
		<li><span class='fa fa-window-close'></span>&nbsp;Ignore</li>
		<li><span class='fa fa-balance-scale'></span>&nbsp;Weight</li>
		<li><span class='fa fa-square'></span>&nbsp;Clear</li>
		*/
	
	
	//Initializing the tables
	var dset = mydatamanager.getcurrdset(this.currdset);
	var attrlst = dset.attributelist;
		var attnicklist = dset.attnicknamelist;
	var attrtypelst = dset.typelist;
	
	var attrrangelst = dset.rangelist;
	
	var flaglist = dset.flaglist;
	
	var flagcanonical = dset.flagnamelist;
	
	var ts = "";
	ts = "<tr>";
	
	var tsattr = "";
	
	
	
	var i;
	for(i=0; i<attrlst.length;i++){
		var ic;
		var ictxt;
		if(flaglist[i]=="na"){
			ic = "<span>&nbsp;</span>";
			ictxt = "<span>&nbsp;</span>";
		}
		else{
			ic = "<span class='fa fa-"+flaglist[i]+"'></span>";
			ictxt = "<span>"+flagcanonical[i]+"</span>";
			ictxt = "<span>&nbsp;</span>";
		}
		ts += ("<th><div class='tablehead_flag sh2'>"+ic+"</div><div contenteditable='true' class='tablehead_main'>"+attnicklist[i]+"</div><div class='tablehead_sec'>"+attrtypelst[i]+"&nbsp;&nbsp;<span class='fa fa-chevron-down'></span></div></th>");
		
		tsattr += ("<tr><td width='45' class='tblattr_flag sh2'>"+ic+"&nbsp;&nbsp;"+ictxt+"</td><td contenteditable='true' width = '275'>"+attnicklist[i]+"</td><td width= '150' class='tblattr_type'>"+attrtypelst[i]+"</td></tr>");
		
	}
	ts += ("</tr>");
	
	var tsmain = "";
	var n;
	for(n=0; n<100; n++){
		if(n%2==0 || n==0){
			tsmain += ("<tr class='trgrey'>");
		}
		else{
			tsmain += ("<tr>");
		}
		
		var currRow = dset.mydata[n];
		var l = currRow.length;
		
		for(i=0; i<l; i++){
			tsmain += ("<td>"+currRow[i]+"</td>");	
		}	
	/*	
	for(i=0; i<attrlst.length; i++){
		var typ = attrtypelst[i];
		var dv;
		if(typ == "Integer"){
			var val = attrrangelst[i];
			 dv = Math.round(Math.random()*val);
			
		}
		else if (typ == "Decimal"){
			var val = attrrangelst[i];
			dv = Math.round(Math.random()*val,-2);
			
		}
		else if(typ == "Boolean"){
			dv = Math.round(Math.random());
			dv = dv<0.5?false:true;
			
		}
		else if(typ == "String"){
			var cnt = attrrangelst[i].length;
			dv = attrrangelst[i][ Math.max(0,   (Math.round(Math.random()*cnt)-1) ) ];
				
		}
		
		
			ts += ("<td>"+dv+"</td>");
		
		
		
	}
	*/
		tsmain += ("</tr>");
	}
	var tabwidth = attrlst.length * 150;
	$('#ds_hdtab').html(ts).width(tabwidth);
	$('#ds_maintab').html(tsmain).width(tabwidth);
	$('#tsttableattr table').html(tsattr);
	
	
	//Fading out the two flag menus
	
	$('#flagmenu').fadeTo(1,0);
	$('#flagmenuattr').fadeTo(1,0);

	$('#flagmenu').fadeTo(100,0.0,function(){$(this).css('left',-2003);});
	$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2003);});

	//Setting the id number for each flag section of the table 

	$('.tablehead_flag').each(function(ind){
	$(this).data('ind',ind);
	
	});
	$('.tblattr_flag').each(function(ind){
	$(this).data('ind',ind);
	
	});
	
	//Setting the id number for each type section of the table 
	$('.tablehead_sec').each(function(ind){
		$(this).data('ind',ind);
	})
	
	$('.tblattr_type').each(function(ind){
		$(this).data('ind',ind);
	})


	//Setting the action fo the flag section of the table header

$('.tablehead_flag').css('cursor','pointer').click(function(e){
	if(myuimanager.mydsetdisplay.flagmenup==false){
		myuimanager.mydsetdisplay.flagmenup = true;
		var l = $(this).position().left;
		var t = $(this).position().top;
		myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
		myuimanager.mydsetdisplay.updateFlagMenu($(this).data('ind'));
	
		$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
		$('#flagmenu').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height());
	}
	else{
		var currch = $(this).data('ind');
		if(!(currch == myuimanager.mydsetdisplay.whichtablechoice)){
			var l = $(this).position().left;
			var t = $(this).position().top;
			myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
			myuimanager.mydsetdisplay.updateFlagMenu($(this).data('ind'));

			//$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
			$('#flagmenu').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height());
			
		}
		else{
			myuimanager.mydsetdisplay.flagmenup = false;
			$('#flagmenu').fadeTo(100,0.0,function(){$(this).css('left',-2013);});
		}
	}
});


	//Setting the action fo the flag section of the attr table header
	
$('.tblattr_flag').css('cursor','pointer').click(function(e){
	if(myuimanager.mydsetdisplay.flagattrmenup==false){
		
		myuimanager.mydsetdisplay.flagattrmenup = true;
		var l = $(this).position().left;
		var t = $(this).position().top;
		myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
		myuimanager.mydsetdisplay.updateFlagMenuAttr($(this).data('ind'));
		$('#typemenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
		$('#flagmenuattr').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+15);
		$(this).parent().addClass('tbldarkerrow');
	}
	else{
		
		var currch = $(this).data('ind');
		if(!(currch == myuimanager.mydsetdisplay.whichtablechoice)){
			$('#tsttableattr table tr').removeClass('tbldarkerrow');
				var l = $(this).position().left;
				var t = $(this).position().top;
				myuimanager.mydsetdisplay.whichtablechoice = $(this).data('ind');
					myuimanager.mydsetdisplay.updateFlagMenuAttr($(this).data('ind'));
				$('#flagmenuattr').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+15);
				$(this).parent().addClass('tbldarkerrow');
		}
		else{
			$('#tsttableattr table tr').removeClass('tbldarkerrow');
			myuimanager.mydsetdisplay.flagattrmenup = false;
			$('#flagmenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2016);});
		}
	}
	
});



	
//Setting the actions for the rows of the flag menu	

$('#flagmenu li').click(function(){
		myuimanager.mydsetdisplay.flagmenup = false;
	$('#flagmenu').fadeTo(100,0.0,function(){$(this).css('left',-2018);});
	//this.flagmenup = false;
	var flid = $(this).attr('id');
	var parind = $(this).data('parind');
	myuimanager.mydsetdisplay.updateFlag(parind,flid);
});

//Setting the actions for the rows of the flag attr menu	

$('#flagmenuattr li').click(function(){
		myuimanager.mydsetdisplay.flagattrmenup = false;
	$('#flagmenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
	$('#tsttableattr table tr').removeClass('tbldarkerrow');
	var flid = $(this).attr('id');
	var parind = $(this).data('parind');
	myuimanager.mydsetdisplay.updateFlag(parind,flid);
	
});
	
	//Setting the actions for the type labels in the main header
	
	$('.tablehead_sec').css('cursor','pointer').click(function(e){
		if(myuimanager.mydsetdisplay.typemenup == false){
			myuimanager.mydsetdisplay.typemenup = true;
			var l = $(this).position().left;
			var t = $(this).position().top;
			myuimanager.mydsetdisplay.updateTypeMenu($(this).data('ind'));

			$('#typemenu').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+5);
		}
		else{
		
			myuimanager.mydsetdisplay.typemenup = false;
			$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
		}

	});

	
//Setting the actions for the type labels in the attr table	
	
	$('.tblattr_type').css('cursor','pointer').click(function(e){
		if(myuimanager.mydsetdisplay.typeattrmenup == false){
			myuimanager.mydsetdisplay.typeattrmenup = true;
			var l = $(this).position().left;
			var t = $(this).position().top;
			myuimanager.mydsetdisplay.updateTypeMenuAttr($(this).data('ind'));
			$('#flagmenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
			$('#typemenuattr').fadeTo(200,1.0).css('left',l).css('top',t+$(this).height()+15);
			$(this).parent().addClass('tbldarkerrow');
		}
		else{
			$('#tsttableattr table tr').removeClass('tbldarkerrow');
			myuimanager.mydsetdisplay.typeattrmenup = false;
			$('#typemenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
		}
		
	});
	


	
		
		$('#typemenu').fadeTo(1,0);
		
		//Setting the actions for the rows of the main type menu
		
		$('#typemenu li').click(function(){
				myuimanager.mydsetdisplay.typemenup = false;
			$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
			var flid = $(this).html();
			var parind = $(this).data('parind');
			myuimanager.mydsetdisplay.updateType(parind,flid);
		});
		
		$('#typemenuattr').fadeTo(1,0);
		
		//Setting the actions for the rows of the attr type menu
		
		$('#typemenuattr li').click(function(){
			myuimanager.mydsetdisplay.typeattrmenup = false;
			$('#typemenuattr').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
			var flid = $(this).html();
			var parind = $(this).data('parind');
			myuimanager.mydsetdisplay.updateType(parind,flid);
			$('#tsttableattr table tr').removeClass('tbldarkerrow');
		});
		
		
		
		//For the nickname text in the main header, setting data for it and setting the key action
		
		$('.tablehead_main').each(function(ind){
			$(this).data('nickind',ind);
		});
		
			$('.tablehead_main').keyup(function() {
				myuimanager.mydsetdisplay.updatenickname($(this).data('nickind'),'attr',$(this).html());
			 // alert( "Handler for .keydown() called on "+$(this).data('nickind') );
			});
		
		//For the nickname text in the attr table, setting data for it and setting the key action	
		
		$('#tsttableattr tr').each(function(ind){
			var nind = ind;
			$(this).find('td').eq(1).data('nickind',nind).keyup(function(){
				myuimanager.mydsetdisplay.updatenickname($(this).data('nickind'),'preview',$(this).html());
				myuimanager.checkchanges();
			});
		})
		
	
			
	var t = $('#tsttable table li');
	$('#tsttable table td').each(function(ind){
		var n = 0;
		
	});
	
	//registering a click-off action for the the rows of the main table
	
		$('#tsttable_mn table td').click(function(){
			myuimanager.mydsetdisplay.typemenup = false;
			myuimanager.mydsetdisplay.flagmenup = false;
			$('#flagmenu').fadeTo(100,0.0,function(){$(this).css('left',-2023);});
			$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
		});
		/*
			$('#tsttable table th').mousedown(function(){
				if(myuimanager.mydsetdisplay.typemenup==true || myuimanager.mydsetdisplay.flagmenup==true){
					
					myuimanager.mydsetdisplay.typemenup = false;
					myuimanager.mydsetdisplay.flagmenup = false;
					$('#flagmenu').fadeTo(100,0.0,function(){$(this).css('left',-2031);});
					$('#typemenu').fadeTo(100,0.0,function(){$(this).css('left',-2000);});
				}
			});
		*/
		
	$('#tablescroll').click(function(){
		tabscroll += 600;
		$('#tsttable').animate({
		        scrollLeft: tabscroll
		    }, 1000);
		$('#tsttable_mn').animate({
		        scrollLeft: tabscroll
		    }, 1000);
	});	
	$('#tablescrollback').click(function(){
		tabscroll = 0;
		$('#tsttable').animate({
		        scrollLeft: 0
		    }, 1000);
		$('#tsttable_mn').animate({
		        scrollLeft: 0
		    }, 1000);
	});
	
}


var files;

datasetDisplay.prototype.validatefileNames=function(farr){
	var i;
	var froot = null;
	if(farr.length == 0){
		return "";
	}
	if(farr.length > 2 || farr.length < 2){
		return "Incorrect number of files. Please choose two files to upload."
	}
	for(i=0; i<farr.length; i++){
		var currfile = farr[i];
		var currname = currfile.name;
		var spl = currname.split(".");
		
		if(froot == null){
			froot = spl[0];
		}
		else{
			var secroot = spl[0];
			if(!(froot == secroot)){
				return "Please make sure both filenames match. Please try again.";
			}
		}
		var ext = spl[1];
		if(!(ext == "dd" || ext=="csv")){
			
			return "Both files require extension of either 'dd' or 'csv'. Please try again.";
			
		}
		
		
	}
	return "OK";
	
	
}

datasetDisplay.prototype.updatefileListing=function(){
	
	
	var fileSelect = document.getElementById('file-form-inpt');
	 files = fileSelect.files;
	var i;
	var status = myuimanager.mydsetdisplay.validatefileNames(files);
	if(status == "OK"){
		var i;
		var bothset = 0;
		for(i=0; i<files.length; i++){
			var currfile = files[i].name;
			if(currfile.split(".")[1]=="dd"){
				bothset++;
				$('#ds_file_schema .filenm').html(currfile);
				$('#ds_file_schema .statusmarker').fadeTo(1,0,function(){$(this).html("<span class='fa fa-check'></span>").fadeTo(300,1)});
				
			}
			else if(currfile.split(".")[1]=="csv"){
				bothset++;
				$('#ds_file_data .filenm').html(currfile);
				$('#ds_file_data .statusmarker').fadeTo(1,0,function(){$(this).html("<span class='fa fa-check'></span>").fadeTo(300,1)});
			}
		}
		if(bothset == 2){
			$('#updsfiles').prop('disabled',false);
			$('#dsloadstatus').html("&nbsp;");
			
			$('.filelabel').removeClass('nofile');
			
		}
		
	}
	else{
		$('#dsloadstatus').html(status);
	}
	
	
	
	
}

datasetDisplay.prototype.resetDataFiles=function(){
	$('.filelabel').addClass('nofile');
	$('.filerow .filenm').html("");
	$('.filerow .statusmarker').html("");
	$('#updsfiles').prop('disabled',true);
	$('#file-form-inpt').val('');
}

datasetDisplay.prototype.initdialog=function(){

	$('#d_del').click(function(evt){
			myuimanager.mydsetdisplay.setconfirmdiag("delete");
			mydatamanager.delfunc = "dataset";
		$('#confirmDialog').modal('show');
	});
	
	
	$('#d_create').click(function(evt){
			myuimanager.mydsetdisplay.setnewdiag("create");
		$('#datasetDialog').modal('show');
	});
		
	
	$("#file-form-inpt").change(function(e){
		var tst = $(this);
			myuimanager.mydsetdisplay.updatefileListing();
	         //submit the form here
	 });
	
	$('#file-form-inpt').on('click touchstart' , function(){
	   	myuimanager.mydsetdisplay.resetDataFiles();
	});
	
	
	$('#resetfiles').click(function(e){
			myuimanager.mydsetdisplay.resetDataFiles();
	});
	
	var form = document.getElementById('file-form');
	var fileSelect = document.getElementById('file-form-inpt');

	
	
	form.onsubmit = function(event) {
		
	  event.preventDefault();
	myuimanager.updateProgressDialog("Creating Dataset. This may take several minutes.")
		$('#initloadDialog').modal('show');
		
	  // Update button text.
	  //uploadButton.innerHTML = 'Uploading...';

	  // The rest of the code will go here...
	// Get the selected files from the input.
	 files = fileSelect.files;
	
	// Create a new FormData object.
	var formData = new FormData(form);
	
	
	// Loop through each of the selected files.
	/*
	for (var i = 0; i < files.length; i++) {
	  var file = files[i];

	  // Check the file type.
	  

	  // Add the file to the request.
	  formData.append('datasets[]', file, file.name);
	}
	*/
	
	var xhr = new XMLHttpRequest();
	
	// Open the connection.
	xhr.open('POST', '../testfileload', true);
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
	  if (xhr.status == 200) {
		myuimanager.updateProgressDialog("Loading New Dataset.")
		
			//$('#dsloadstatus').html(xhr.responseText);
	    // File(s) uploaded.
	    //uploadButton.innerHTML = 'Upload';
		
		console.log(xhr.responseText);
		var restext = xhr.responseText;
		var newdid = restext.split(":")[1];
		
		mydatamanager.loadnewDataset(newdid);
	  } else {
		var tst = xhr.status;
		//$('#dsloadstatus').html(xhr.responseText);
	    //alert('An error occurred!');
	  }
	};
	
	// Send the Data.
	xhr.send(formData);
	
}

$( "#updsfiles" ).click(function() {
	
		var currprogid = mydatamanager.getcurrprogram().myid;
		$('#file-form-prog').val(currprogid);
		
		
		var dsnam = myuimanager.getDRowFromLabel($('#datasetDialog'),"Name").find('input').val();
		var descr = myuimanager.getDRowFromLabel($('#datasetDialog'),"Description").find('input').val();
		
		$('#file-form-dsname').val(dsnam);
		$('#file-form-descr').val(descr);
		var dt = myuimanager.createdateString();
		$('#file-form-created').val(dt);
	
	
	
  $( "#file-form" ).submit();
});


}

datasetDisplay.prototype.setconfirmdiag = function(whichtype){
	if(whichtype == "delete"){
		$('#confirmDialog .modal-header div').html("Delete Dataset");
		$('#confirmDialog .modal-body div').html("Are you sure you want to delete this dataset?");
	}
}

datasetDisplay.prototype.setnewdiag = function(whichtype){
	
	if(whichtype == "delete"){
		$('#confirmDialog').find('.modal-header div').html("Delete Dataset");
		$('#confirmDialog').find('.modal-body div').html("Are you sure you want to delete this dataset?");
		
		
	}
	else if(whichtype == "create"){
		/*
		var currprogid = mydatamanager.getcurrprogram().myid;
		$('#file-form-prog').val(currprogid);
		
		
		var dsnam = myuimanager.getDRowFromLabel($('#datasetDialog'),"Name").find('input').val();
		var descr = myuimanager.getDRowFromLabel($('#datasetDialog'),"Description").find('input').val();
		
		$('#file-form-dsname').val(dsnam);
		$('#file-form-descr').val(descr);
		var dt = myuimanager.createdateString();
		$('#file-form-created').val(dt);
		*/
		
		
		
		
	}
}
