function modelDisplay(cdisp){
	this.mycampdisplay = cdisp;
	this.modprofchart = new modProfileChart(this);
	
	this.modprofchart.resetobs('#mod_prof_charts','#mod_prof_charts_nav','#mod_prof_ranges');

	
	this.whichsection = "segments";
	
	
	this.modseg = $('#mod_segments');
	this.modatt = $('#mod_attributes');
	this.modcharts = $('#mod_charts');

}
modelDisplay.prototype.resetDisplay = function(){
	this.showmodcont();
	this.currmodel = mydatamanager.getcurrcampaign().getcurrmodel();
	this.chosenseg = 0;
	this.modchartgain.reinit();
	this.modchartlift.reinit();
	this.modchartresp.reinit();
	
	
	this.updateModelMenu();
	this.buildSegListNew();
	this.initProfiles();
	this.hideSegProf();
	this.attrimpchart.reinit();
	
	if(this.currmodel.treatmentactive==false){
	//	this.modchartresp.hide();
		$('.segrows').css('width','50%');
	}
	else{
	//	this.modchartresp.show();
		$('.segrows').css('width','100%');
	}
	
}
modelDisplay.prototype.init = function(){
	this.profshown = false;
	this.currmodel = 0;
	this.chosenseg = 0;
	this.whichsection = "segments";
	
	this.moddisp_nocont = $('#ccamp_cnt_models_firstime');
	this.moddisp_cont = $('#ccamp_cnt_models_existing');
	
	this.modmenu = $('#mod_dd');
	this.scoremenu = $('#sf_dd');
	
	this.modseglist = $('#mod_seglist');
	this.modsegdisp = $('#mod_segdisplay');
	
	this.modtogg = $('#mod_toggle');
	
	this.modtogg.find('li').eq(0).click(function(){
		myuimanager.mymodeldisplay.toggleModel("segments");
		
	});
	this.modtogg.find('li').eq(1).click(function(){
		myuimanager.mymodeldisplay.toggleModel("attrank");
		
	});
	this.modtogg.find('li').eq(2).click(function(){
		myuimanager.mymodeldisplay.toggleModel("charts");
		
	});
	
	
	this.modchartgain = new modelChart_gain();
	this.modchartlift = new modelChart_lift();
	this.modchartresp = new modelChart_resp();
	this.attrimpchart = new modelChart_attrrank();
	this.initdialog();
	if(mydatamanager.getcurrcampaign().modelsexist == false){
		this.clearmodcont();
		this.shownomodcont();
	}
	else{
	
	
	this.modchartgain.init();
	this.modchartlift.init();
	this.modchartresp.init();
	
	this.clearnomodcont();
	this.updateModelMenu();

	this.buildSegListNew();
	this.initProfiles();
	this.hideSegProf();

	
	
	
	
	

	this.attrimpchart.init();
	}
	
}

modelDisplay.prototype.clearmodels = function(){
	this.clearmodcont();
	this.shownomodcont();
}


modelDisplay.prototype.updateModelMenu= function(){
	var modstr = "";
	var modlist = mydatamanager.getcurrcampaign().models;
	var currmodel = mydatamanager.getcurrcampaign().getcurrmodel();
	for(i=0; i<modlist.length; i++){
		var currmod = modlist[i];
		var currmodname = currmod.modelname;
		
		modstr += ("<li><a href='javascript:;'>"+modlist[i].modelname+"<span class='mensub'>&nbsp;&nbsp;created: "+myuimanager.formatDateString(currmod.created)+"</span></a></li>");
	}
	this.modmenu.find('ul').html(modstr);
	this.modmenu.find('button').html(currmodel.modelname+"<span class='mensub'>&nbsp;&nbsp;created: "+myuimanager.formatDateString(currmodel.created)+"</span>");

	this.modmenu.find('li').each(function(ind){
		$(this).data('myid',ind);
		$(this).click(function(){
			myuimanager.mymodeldisplay.switchmodel($(this).data('myid'));
			//temp
		//	myuimanager.switchcampaign($(this).data('myid'));
		});
	});
	
	
}

modelDisplay.prototype.switchmodel = function(id){
	mydatamanager.getcurrcampaign().currmodel = id;
	var mod = mydatamanager.getcurrmodel();
	if(mod.dataloaded == true){
		this.resetDisplay();
	}
	else{
		mydatamanager.loadcurrmodeldataAll(id);
	}
	
}

modelDisplay.prototype.toggleModel = function(sec){
	if(!(sec==null)){this.whichsection = sec};
	if(this.whichsection=="segments"){
		
		$('#mod_toggle li').removeClass('active');
		$('#mod_toggle li').eq(0).addClass('active');
		
		this.modcharts.css('left',-2000).css('top',-2000);
		this.modseg.css('left',20).css('top',20);
		this.modatt.css('left',-2000).css('top',-2000);
	}
	else if(this.whichsection=="charts"){
		$('#mod_toggle li').removeClass('active');
		$('#mod_toggle li').eq(2).addClass('active');
		
		this.modcharts.css('left',20).css('top',20);
		this.modseg.css('left',-2000).css('top',-2000);
		this.modatt.css('left',-2000).css('top',-2000);
	}
	else if(this.whichsection == "attrank"){
		$('#mod_toggle li').removeClass('active');
		$('#mod_toggle li').eq(1).addClass('active');
		this.modcharts.css('left',-2000).css('top',-2000);
		this.modseg.css('left',-2000).css('top',-2000);
		this.modatt.css('left',20).css('top',20);
		
	}
}


modelDisplay.prototype.hideSegProf = function(){
	$('#mod_segdisplay').fadeTo(1,0);
}
modelDisplay.prototype.showSegProf = function(nm){
	if(this.profshown == true){
		$('#mod_segdisplay').fadeTo(300,0.0,function(){
			$('#mod_prof_mainlab').html(nm+" Statistics");
			$(this).fadeTo(300,1.0)});	
	}
	else{
		this.profshown = true;
		$('#mod_prof_mainlab').html(nm+" Statistics");
		$('#mod_segdisplay').fadeTo(300,1.0);
	}
	
}


modelDisplay.prototype.buildSegListNew = function(){
	
	this.modseglist.html("");
	var currcamp = mydatamanager.getcurrcampaign();
	var mod = currcamp.getcurrmodel();
	var treatshow = mod.treatmentactive;
	var segs = mod.segments;
	var segstr = "";
	var i,ii;
	
	//header
	segstr += ("<div class='segheader>");
	segstr += ("<div class='seglab'>&nbsp;</div>");
	segstr += ("<div class='segmathead'>");
	segstr += ("<div class='segmhding'>Segment Size</div>");
	segstr += ("<div class='segmhding'>Segment Size %</div>");
	segstr += ("<div class='segmhding'>Outcome='T'</div>");
	segstr += ("<div class='segmhding'>Outcome='T' %</div>");
	
	if(treatshow){
		segstr += ("<div class='segmhding'>Respondents for 'LI'</div>");
		segstr += ("<div class='segmhding'>Respondents for 'LI' %</div>");
		segstr += ("<div class='segmhding'>Respondents for 'DC'</div>");
		segstr += ("<div class='segmhding'>Respondents for 'DC' %</div>");
		segstr += ("<div class='segmhding'>Respondents for Best</div>");
		segstr += ("<div class='segmhding'>Respondents for Best %</div>");
	}
	
	
	//segstr += ("<div class='segmhding'>Decile</div>");
//	segstr += ("<div class='segmhding'>Parent Segment</div>");
	segstr += ("</div>");
	segstr += ("</div>");
	
	segstr += ("<div class='segtotals'>");
	segstr += ("<div class='seglabspace'></div>");
	segstr += ("<div class='segmattots'>");
	segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumsegsize)+"</div>");
	segstr += ("<div class='segmattot'>100%</div>");
	segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumout)+"</div>");
	var outpctstr = ((mod.cumout/mod.cumsegsize)*100)+"";
	var truncstr = outpctstr.substring(0,(outpctstr.indexOf("."))+2);
	
	segstr += ("<div class='segmattot'>"+truncstr+"%</div>");
	
	if(treatshow){
		segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumrespdc)+"</div>");
		segstr += ("<div class='segmattot'>100%</div>");
		segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumrespli)+"</div>");
		segstr += ("<div class='segmattot'>100%</div>");
		segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumrespbest)+"</div>");
		segstr += ("<div class='segmattot'>100%</div>");
		
		
	}
	
	//segstr += ("<div class='segmattot'></div>");
	//segstr += ("<div class='segmattot'></div>");
	segstr += ("</div>");//setmattots
	segstr += ("</div>");
	
	
	
	
	segstr += ("<div class='segrows'>");
	
	for(i=0; i<segs.length; i++){
		var currseg = segs[i];
		var attsegs = currseg.attrsegs;
		
		segstr += ("<div class='segrow'>");
		
		segstr += ("<div class='segdef'>");
		segstr += ("<div class='segdef_name'>"+myuimanager.stripUnderscores(currseg.segname)+"</div>");
		segstr += ("<div class='segdef_atts'>");
		for(ii=0; ii<attsegs.length; ii++){
			var currattseg = attsegs[ii];
			segstr += ("<div class='segdef_att'>"+myuimanager.stripUnderscores(currattseg.mysegstr)+"</div>");
		}
		segstr += ("</div>");
		segstr += ("</div>");
		
		
		segstr += ("<div class='segmatrow'>");
		
		segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.segment_count)+"</div>");
		var scp_str = (currseg.segment_count_pct*100)+"";
		var scp_rnd = scp_str.substring(0,(scp_str.indexOf("."))+2);
		
		segstr += ("<div class='segmatrowval'>"+scp_rnd+"%</div>");
		segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.outcome_true_count)+"</div>");
		
		var otp_str = (currseg.outcome_true_pct*100)+"";
		var otp_rnd = otp_str.substring(0,(otp_str.indexOf("."))+2);
			
			
		segstr += ("<div class='segmatrowval'>"+otp_rnd+"%</div>");
		
		if(treatshow){
			
			/*
				segstr += ("<div class='segmhding'>Respondents for 'LI'</div>");
				segstr += ("<div class='segmhding'>Respondents for 'LI' %</div>");
				segstr += ("<div class='segmhding'>Respondents for 'DC'</div>");
				segstr += ("<div class='segmhding'>Respondents for 'DC' %</div>");
				segstr += ("<div class='segmhding'>Respondents for Best</div>");
				segstr += ("<div class='segmhding'>Respondents for Best %</div>");
				*/
				
			segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.LIcount)+"</div>");
			
			var lipct_str = (currseg.LIresponseRate*100)+"";
			var lipct_rnd = lipct_str.substring(0,(lipct_str.indexOf("."))+2);
			segstr += ("<div class='segmatrowval'>"+lipct_rnd+"%</div>");
			
			
			segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.DCcount)+"</div>");
			
			var dcpct_str = (currseg.DCresponseRate*100)+"";
			var dcpct_rnd = dcpct_str.substring(0,(dcpct_str.indexOf("."))+2);
			segstr += ("<div class='segmatrowval'>"+dcpct_rnd+"%</div>");
			
			segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.Bestcount)+"</div>");
			
			var bestpct_str = (currseg.BestresponseRate*100)+"";
			var bestpct_rnd = bestpct_str.substring(0,(bestpct_str.indexOf("."))+2);
			segstr += ("<div class='segmatrowval'>"+bestpct_rnd+"%</div>");
		

		}
	
		
		
	//	segstr += ("<div class='segmatrowval'>"+currseg.decile+"</div>");
		//segstr += ("<div class='segmatrowval'>"+currseg.parentseg+"</div>");
		
		segstr += ("</div>");
	
		segstr += ("</div>");
	
	}
	segstr += ("</div>");
	
	this.modseglist.html(segstr);
	
	this.resetsegdimensiong();
	
	
}





modelDisplay.prototype.buildSegList = function(){
	
	this.modseglist.html("");
	var currcamp = mydatamanager.getcurrcampaign();
	var mod = currcamp.getcurrmodel();
	var segs = mod.segments;
	var segstr = "";
	var i,ii;
	
	//header
	segstr += ("<div class='segheader>");
	segstr += ("<div class='seglab'>&nbsp;</div>");
	segstr += ("<div class='segmathead'>");
	segstr += ("<div class='segmhding'>Segment Size</div>");
	segstr += ("<div class='segmhding'>Segment Size %</div>");
	segstr += ("<div class='segmhding'>Outcome='T'</div>");
	segstr += ("<div class='segmhding'>Outcome='T' %</div>");
	segstr += ("<div class='segmhding'>Cumulative Outcome='T'</div>");
	segstr += ("<div class='segmhding'>Cumulative Population</div>");
	segstr += ("<div class='segmhding'>Cumulative Outcome='T' %</div>");
	segstr += ("<div class='segmhding'>Cumulative Population %</div>");
	segstr += ("<div class='segmhding'>Cumulative Response Rate</div>");
	segstr += ("<div class='segmhding'>Decile</div>");
//	segstr += ("<div class='segmhding'>Parent Segment</div>");
	segstr += ("</div>");
	segstr += ("</div>");
	
	segstr += ("<div class='segtotals'>");
	segstr += ("<div class='seglabspace'></div>");
	segstr += ("<div class='segmattots'>");
	segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumsegsize)+"</div>");
	segstr += ("<div class='segmattot'>100%</div>");
	segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumout)+"</div>");
	var outpctstr = ((mod.cumout/mod.cumsegsize)*100)+"";
	var truncstr = outpctstr.substring(0,(outpctstr.indexOf("."))+2);
	
	segstr += ("<div class='segmattot'>"+truncstr+"%</div>");
	segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumout)+"</div>");
	segstr += ("<div class='segmattot'>"+myuimanager.commaFormat(mod.cumsegsize)+"</div>");
	segstr += ("<div class='segmattot'>100%</div>");
	segstr += ("<div class='segmattot'>100%</div>");
	segstr += ("<div class='segmattot'>"+truncstr+"%</div>");
	//segstr += ("<div class='segmattot'></div>");
	//segstr += ("<div class='segmattot'></div>");
	segstr += ("</div>");//setmattots
	segstr += ("</div>");
	
	
	
	
	segstr += ("<div class='segrows'>");
	
	for(i=0; i<segs.length; i++){
		var currseg = segs[i];
		var attsegs = currseg.attrsegs;
		
		segstr += ("<div class='segrow'>");
		
		segstr += ("<div class='segdef'>");
		segstr += ("<div class='segdef_name'>"+myuimanager.stripUnderscores(currseg.segname)+"</div>");
		segstr += ("<div class='segdef_atts'>");
		for(ii=0; ii<attsegs.length; ii++){
			var currattseg = attsegs[ii];
			segstr += ("<div class='segdef_att'>"+myuimanager.stripUnderscores(currattseg.mysegstr)+"</div>");
		}
		segstr += ("</div>");
		segstr += ("</div>");
		
		
		segstr += ("<div class='segmatrow'>");
		
		segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.segment_count)+"</div>");
		var scp_str = (currseg.segment_count_pct*100)+"";
		var scp_rnd = scp_str.substring(0,(scp_str.indexOf("."))+2);
		
		segstr += ("<div class='segmatrowval'>"+scp_rnd+"%</div>");
		segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.outcome_true_count)+"</div>");
		
		var otp_str = (currseg.outcome_true_pct*100)+"";
		var otp_rnd = otp_str.substring(0,(otp_str.indexOf("."))+2);
			
			
		segstr += ("<div class='segmatrowval'>"+otp_rnd+"%</div>");
		segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.cum_outcome_true)+"</div>");
		segstr += ("<div class='segmatrowval'>"+myuimanager.commaFormat(currseg.cum_population)+"</div>");
		
		var cotp_str = (currseg.cum_outcome_true_pct*100)+"";
		var cotp_rnd = cotp_str.substring(0,(cotp_str.indexOf("."))+2);
		
		segstr += ("<div class='segmatrowval'>"+cotp_rnd+"%</div>");
		
		var cpp_str = (currseg.cum_population_pct*100)+"";
		var cpp_rnd = cpp_str.substring(0,(cpp_str.indexOf("."))+2);
		
		segstr += ("<div class='segmatrowval'>"+cpp_rnd+"%</div>");
		
		var crr_str = (currseg.cum_response_rate*100)+"";
		var crr_rnd = crr_str.substring(0,(crr_str.indexOf("."))+2);
		
		segstr += ("<div class='segmatrowval'>"+crr_rnd+"%</div>");
		segstr += ("<div class='segmatrowval'>"+currseg.decile+"</div>");
		//segstr += ("<div class='segmatrowval'>"+currseg.parentseg+"</div>");
		
		segstr += ("</div>");
	
		segstr += ("</div>");
	
	}
	segstr += ("</div>");
	
	this.modseglist.html(segstr);
	
	this.resetsegdimensiong();
	
	
}

modelDisplay.prototype.resetsegdimensiong=function(){
var fullheight = $('.segheader').height() + $('.segtotals').height();
var attheight = 0;
var paddingheight = 10;
var borderheight = 0;
var attpadding = 0;
$('.segrow').each(function(ind){
	attheight = 0;
	borderheight = 0;
	attpadding = 0;
	var def = $(this).find('.segdef');
	var nm = def.find('.segdef_name');
	var atts = def.find('.segdef_atts');
	 attheight = nm.height();
	
	atts.find('.segdef_att').each(function(ind){
		attpadding+=10;
		var currheight = $(this).height();
		attheight += currheight;
		borderheight += 1;
	
	});

	def.height(attheight+borderheight+attpadding);
	$(this).find('.segmatrow').height(attheight);
	$(this).height(attheight+borderheight+paddingheight+attpadding);
	fullheight += attheight;
	
	$(this).data('activated','no');
	$(this).data('whichseg',ind);
	$(this).css('cursor','pointer').mouseover(function(ev){
		$(this).css('background-color','#ddddef');
		$(this).find('.segdef').css('background-color','#8a84ac');
	});
	$(this).css('cursor','pointer').mouseout(function(ev){
	
		if($(this).data('activated')=="no"){
			$(this).find('.segdef').css('background-color','#878bad');
			$(this).css('background-color','');
		}	
		
	});
	$(this).css('cursor','pointer').mousedown(function(ev){
		myuimanager.mymodeldisplay.resetactivation();
		$(this).data('activated','yes');
		$(this).css('background-color','#ddddef');
		$(this).find('.segdef').css('background-color','#8a84ac');
		var def = $(this).find('.segdef');
		var nm = def.find('.segdef_name').html();
		myuimanager.mymodeldisplay.setchosenseg($(this).data('whichseg'));
		myuimanager.mymodeldisplay.showSegProf(nm);
	});
	
	
});



}

modelDisplay.prototype.setchosenseg=function(whichseg){
	this.chosenseg = whichseg;
}

modelDisplay.prototype.resetactivation = function(){
	$('.segrow').each(function(ind){
		$(this).data('activated','no');
		$(this).find('.segdef').css('background-color','#878bad');
		$(this).css('background-color','');
	});
}



modelDisplay.prototype.clearnomodcont = function(){
	
	this.moddisp_nocont.css('left',-2000).css('top',-2000);
}

modelDisplay.prototype.shownomodcont = function(){
	
	this.moddisp_nocont.css('left',0).css('top',0);
}

modelDisplay.prototype.clearmodcont = function(){
	this.moddisp_cont.css('left',-2000).css('top',-2000);
}

modelDisplay.prototype.showmodcont = function(){
	this.moddisp_cont.css('left',0).css('top',0);
}



modelDisplay.prototype.initProfiles = function(){
	var dset = mydatamanager.getcurrdset();
	var mod = mydatamanager.getcurrcampaign().getcurrmodel();
	
	//var offerob = dset.getFlagData('offer');
	//var predob = dset.getFlagData('prediction');
//	var keyob = dset.getFlagData('primary-key');
	var numericalobs = mod.getNumericalAttrs();
	
	//$('#modprment_mainattr').html("");
	//var mainattrstr = "";
	
	//	<div class = 'dsprmen_mattr'><span class='fa fa-credit-card'></span>&nbsp;Offer</div>
	//mainattrstr += ("<div class='modprmen_mattr modprmenactive'><span class='fa fa-bar-chart'></span>&nbsp;Response</div>");
	//mainattrstr += ("<div class='modprmen_mattr'><a href='javascript:;'><span class='fa fa-credit-card'></span>&nbsp;Message</a></div>");
	
	
	//$('#modprmen_mainattr').html(mainattrstr);
	
	var otherattrstr = "";
	
	var i;
	for(i=0;i<numericalobs.length;i++){
		otherattrstr += ("<div class = 'modprmen_oattr'><a href='javascript:;'>"+numericalobs[i]+"</a></div>");
	}
	$('#modprmen_othattr_panel').html(otherattrstr);
	
	//$('#modprmen_mainattr').find('div').eq(0).click(function(){
	//	myuimanager.mymodeldisplay.choosedsprof("response");
	//});
	
	//$('#modprmen_mainattr').find('div').eq(1).click(function(){
	//	myuimanager.mymodeldisplay.choosedsprof("message");
	//});
	
	$('#modprmen_othattr_panel div a').each(function(ind){
		var index = ind;
		$(this).click(function(){
			
			myuimanager.mymodeldisplay.choosedsprof($(this).html());
		});
	});
	
	
	
	
	this.whichchoice = numericalobs[0];
	this.whichchoicemode = "total";
	
	//this.initDsetChoose();
	
	this.modprofchart.initchartNav();
	mod.setProfChartData(this.whichchoice);
	this.modprofchart.build();
	
	
	//testing
	/*
	this.whichchoice = "AGGREGATE_CREDIT_LIMIT";
	//this.whichchoicemode = "compareoffer";
	
	this.initDsetChoose();
	this.whichchoicemode = "compareprediction";
	this.modprofchart.initchartNav();
	this.modprofchart.chartType = "cluster";
	dset.setChartData((this.whichchoice),this.whichchoicemode)
	this.modprofchart.build();
	*/
	
	
}
modelDisplay.prototype.switchProfileChart = function(typ){
	this.modprofchart.chartType = typ;
	$('.chicon').removeClass('chicactive');
	if(typ=="cluster"){
		
		$('.chicon').eq(0).addClass('chicactive');
	}
	else{
		$('.chicon').eq(1).addClass('chicactive');
	}
	this.modprofchart.build();
}

modelDisplay.prototype.makeMenuLinks = function(){
	var dset = mydatamanager.getcurrdset();
	//var offerob = dset.getFlagData('offer');
	//var predob = dset.getFlagData('prediction');
	
//	var m1 = "<a href='javascript:;'><span class='fa fa-bar-chart'></span>&nbsp;Response</a>";
//	$('.modprmen_mattr').eq(0).html(m1).removeClass('modprmenactive');
//	var m2 = "<a href='javascript:;'><span class='fa fa-credit-card'></span>&nbsp;Message</a>";
//	$('.modprmen_mattr').eq(1).html(m2).removeClass('modprmenactive');
	
	$('.modprmen_oattr').each(function(ind){
		var ht = $(this).find('a').html();
		if(ht == undefined || ht == null){
			ht = $(this).html();
		}
		var newstr = "<a href='javascript:;'>"+ht+"</a>";
		$(this).html(newstr).removeClass('modprmenactive');
	});
	
//	$('#modprmen_mainattr').find('div').eq(0).unbind().click(function(){
//		myuimanager.mymodeldisplay.choosedsprof("response");
//	});
	
//	$('#modprmen_mainattr').find('div').eq(1).unbind().click(function(){
//		myuimanager.mymodeldisplay.choosedsprof("message");
//	});
	
	$('#modprmen_othattr_panel div a').each(function(ind){
		var index = ind;
		$(this).unbind().click(function(){
			
			myuimanager.mymodeldisplay.choosedsprof($(this).html());
		});
	});
	
	
	
}
modelDisplay.prototype.highlightMenu = function(whichp){
	var useind = 0;
	$('.modprmen_oattr').each(function(ind){
		var ht = $(this).find('a').html();
		if(ht == whichp){
			useind = ind;
		}
	});
	
	$('.modprmen_oattr').eq(useind).html(whichp);
	$('.modprmen_oattr').eq(useind).addClass('modprmenactive');
	
		

	
}
modelDisplay.prototype.choosedsprof = function(whichp){
	var dset = mydatamanager.getcurrdset();
	var mod = mydatamanager.getcurrcampaign().getcurrmodel();
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
		$('.modprmen_mattr').eq(0).html(othstr);
		var thisstr = "<span class='fa fa-"+offerob.flag+"'></span>&nbsp;Message";
		$('.modprmen_mattr').eq(1).html(thisstr);
		$('.modprmen_mattr').eq(1).addClass('modprmenactive');
		
		
	}
	else if(this.whichchoice == "response"){
		whichp = dset.getResponseAttr(this.whichchoice);
		
		var othstr = "<a href='javascript:;'><span class='fa fa-credit-card'></span>&nbsp;Message</a>";
		$('.modprmen_mattr').eq(1).html(othstr);
		var thisstr = "<span class='fa fa-"+predob.flag+"'></span>&nbsp;Response";
		$('.modprmen_mattr').eq(0).html(thisstr);
		$('.modprmen_mattr').eq(0).addClass('modprmenactive');
			
	}
	else{
	*/
		this.highlightMenu(whichp);
	//}
	//this.initDsetChoose();
	
	//this.modprofchart.initchartNav();
	
	mod.setProfChartData(this.whichchoice);
	this.modprofchart.build();



}
modelDisplay.prototype.resetChart = function(){
	var dset = mydatamanager.getcurrdset();
	var mod = mydatamanager.getcurrcampaign().getcurrmodel();
		
	mod.setProfChartData(this.whichchoice);
	this.modprofchart.build();
		
}

modelDisplay.prototype.initDsetChoose = function(){
	var complist = "";
	var dset = mydatamanager.getcurrdset();
	if(this.whichchoice == "message" || this.whichchoice == "response"){
			dset.rangemx = null;
			dset.rangesteps = null;

			this.modprofchart.clearRanges();
			
		if(this.whichchoice == "message"){
	     	complist = "";
		}
		else{
			$('#mod_prof_title').html("");
			complist = "";
		}
	}
	else{
		complist += "<div class='modetprofchoice modetprchactive'>Totals</div>";
		complist += "<div class='modetprofchoicelab'>COMPARE BY:</div>";
		complist += "<div class='modetprofchoice'>Message</div>";
		complist += "<div class='modetprofchoice'>Response</div>";
		
		dset.rangemx = null;
		dset.rangesteps = null;
		
		this.modprofchart.clearRanges();
		this.modprofchart.buildRanges();
		this.modprofchart.setExtras(myuimanager.mymodeldisplay.whichchoice);
		
			
	}
	$('#mod_prof_choices').html(complist);
	
	
	$('.modetprofchoice').click(function(){
		$('.modetprofchoice').removeClass('modetprchactive');
		$(this).addClass('modetprchactive');
			var dset = mydatamanager.getcurrdset();
				dset.rangemx = null;
				dset.rangesteps = null;
			
		if($(this).html()=="Totals"){
			myuimanager.mymodeldisplay.whichchoicemode = "total";
			dset.setChartData(myuimanager.mymodeldisplay.whichchoice,myuimanager.mymodeldisplay.whichchoicemode);
			myuimanager.mymodeldisplay.dsetprofchart.clearRanges();
			myuimanager.mymodeldisplay.dsetprofchart.buildRanges();
			myuimanager.mymodeldisplay.dsetprofchart.setRanges(myuimanager.mymodeldisplay.whichchoice);
				
			myuimanager.mymodeldisplay.dsetprofchart.initchartNav();
			
			myuimanager.mymodeldisplay.dsetprofchart.build();
		}
		else if($(this).html()=="Message"){
			myuimanager.mymodeldisplay.whichchoicemode = "comparemessage";
			dset.setChartData(myuimanager.mymodeldisplay.whichchoice,myuimanager.mymodeldisplay.whichchoicemode);
			myuimanager.mymodeldisplay.dsetprofchart.clearRanges();
			myuimanager.mymodeldisplay.dsetprofchart.buildRanges();
			myuimanager.mymodeldisplay.dsetprofchart.setRanges(myuimanager.mymodeldisplay.whichchoice);
			
			myuimanager.mymodeldisplay.dsetprofchart.initchartNav();
			myuimanager.mymodeldisplay.dsetprofchart.build();
		}
		else if($(this).html() == "Response"){
			myuimanager.mymodeldisplay.whichchoicemode = "compareresponse";
			dset.setChartData(myuimanager.mymodeldisplay.whichchoice,myuimanager.mymodeldisplay.whichchoicemode);
			myuimanager.mymodeldisplay.dsetprofchart.clearRanges();
			myuimanager.mymodeldisplay.dsetprofchart.buildRanges();
			myuimanager.mymodeldisplay.dsetprofchart.setRanges(myuimanager.mymodeldisplay.whichchoice);
				
			myuimanager.mymodeldisplay.dsetprofchart.initchartNav();
			myuimanager.mymodeldisplay.dsetprofchart.build();
		}
	})
	this.whichchoicemode = "total";
}




modelDisplay.prototype.initdialog = function(){
		$('#m_edit').click(function(evt){
		//	myuimanager.mymodeldisplay.setnewdiag("edit");
		//	$('#modelDialog').modal('show');
		});
		
		$('#m_create').click(function(evt){
			myuimanager.mymodeldisplay.setnewdiag("create");
			$('#modelDialog').modal('show');
		});
		
		$('#m_del').click(function(evt){
			myuimanager.mymodeldisplay.setconfirmdiag("delete");
			mydatamanager.delfunc = "model";
			$('#confirmDialog').modal('show');
		
		
			mydatamanager.deletecurrModel();
		});
		
		$('#m_dup').click(function(evt){
		//	myuimanager.mymodeldisplay.setnewdiag("dup");
		//	$('#modelDialog').modal('show');
		});
			
		
		$('#modelDialog .editdiagfooterbtns button').eq(0).click(function(evt){
			$('#modelDialog').modal('hide');
			
			myuimanager.mymodeldisplay.updateModelData();
		});
		$('#modelDialog .editdiagfooterbtns button').eq(1).click(function(evt){
			$('#modelDialog').modal('hide');
		});
		
		
		var mui = myuimanager;
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Dataset").find('.dropdown'));
	//	mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Outcome").find('.dropdown'));
	//	mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Treatment").find('.dropdown'));
	///	mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Row Weight").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Missing Penalty").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Class Weight").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Treatment Emphasis").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Split Metric").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Stop Grow (%)").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Minimum Size (%)").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Sampling").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Sampling Phase").find('.dropdown'));
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Sampling Compliment").find('.dropdown'));
		
		mui.setddownactionExtra(mui.getDRowFromLabel($('#modelDialog'),"Stop Grow (%)").find('.dropdown'),"updateminsize");
		
		
		
}

modelDisplay.prototype.updateMinSize = function(){
	var mui = myuimanager;
		var stopgrow = mui.getDRowFromLabel($('#modelDialog'),"Stop Grow (%)").find('button').html();
		var sgstr = stopgrow.substring(0,(stopgrow.indexOf("%")));
		
		var sgval = parseFloat(sgstr);
		
		var newminsize_max = (sgval * 0.5);
		
		
		var minsize = mui.getDRowFromLabel($('#modelDialog'),"Minimum Size (%)").find('button').html();
		var minstr = minsize.substring(0,(minsize.indexOf("%")));
		minsize = parseFloat(minstr);
		
		var currmin = .25;
		
		var menstr = "";
		
		while(currmin <= newminsize_max){
			menstr += ("<li><a href='javascript:;'>"+currmin+"%</a></li>");
			currmin += 0.25;
		}
		currmin -= 0.25;
		mui.getDRowFromLabel($('#modelDialog'),"Minimum Size (%)").find('ul').html(menstr);
		
		
		if(minsize > currmin){
			mui.getDRowFromLabel($('#modelDialog'),"Minimum Size (%)").find('button').html(currmin+"%");
		}
		
		mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Minimum Size (%)").find('.dropdown'));
		mui.setddownactionExtra(mui.getDRowFromLabel($('#modelDialog'),"Stop Grow (%)").find('.dropdown'),"updateminsize");
			
		
		
		
		
}


modelDisplay.prototype.updateModelData = function(){
	
	var url = "";
	var dta = {};
	var dsetid;
	var progid;
	if(this.whichdtype == "edit"){
		var url = "EditCampaigns_cng";
		
		var id = mydatamanager.getcurrcampaign().myid;
		 progid = mydatamanager.getcurrprogram().myid;
		var mui = myuimanager;
		var name = mui.getDRowFromLabel($('#modelDialog'),"Name").find('.editdiagline_val input').val();
		var descr = mui.getDRowFromLabel($('#modelDialog'),"Description").find('.editdiagline_val input').val();
		var createdate = $('#datetimepicker_progcreate input').val();
		var moddate = $('#datetimepicker_progmod input').val();
		var campstate = mui.getDRowFromLabel($('#modelDialog'),"Campaign State").find('button').html();
		var camptype = mui.getDRowFromLabel($('#modelDialog'),"Campaign Type").find('button').html();
		var campmethod = mui.getDRowFromLabel($('#modelDialog'),"Campaign Method").find('button').html();
		var contchannel = mui.getDRowFromLabel($('#modelDialog'),"Contact Channel").find('button').html();
		var fxcost = mui.getDRowFromLabel($('#modelDialog'),"Fixed Cost").find('.editdiagline_val input').val();
		var varcost = mui.getDRowFromLabel($('#modelDialog'),"Variable Cost").find('.editdiagline_val input').val();
		var varcostunit = mui.getDRowFromLabel($('#modelDialog'),"Variable Cost Unit").find('.editdiagline_val input').val();
		//datetimepicker_depstart
		var depstart = $('#datetimepicker_depstart input').val();
		var depend = $('#datetimepicker_depend input').val();
		
		dta = {ID:id,Program_ID:progid,Name:name, Description:descr,Created:createdate,Modified:moddate,Campaign_State:camp,Campaign_Type:camptype,Campaign_Method:campmethod,Contact_Channel:contchannel,Fixed_Cost:fxcost,Var_Cost:varcost,Var_Cost_Unit:varcostunit,Deploy_Start:depstart, Deploy_End:depend};
		
	}
	else if(this.whichdtype == "create"){
		
			var url = "CreateModels_cng";
			var id;
			
			//d.getFullYear()+""+d.getDate()+""+d.getDay()+""+d.getHours()+""+d.getMinutes()+""+d.getSeconds();
			/*
			var d = new Date();
			var yr = d.getFullYear()+"";
			var mn = d.getDate()+"";
			if(mn.length==1){mn = "0"+mn;}
			var day = d.getDay()+"";
			if(day.length==1){day = "0"+day;}
			var hrs = d.getHours()+"";
			if(hrs.length==1){hrs = "0"+hrs;}
			var mins = d.getMinutes()+"";
			if(mins.length==1){mins = "0"+mins;}
			var secs = d.getSeconds()+"";
			if(secs.length==1){secs = "0"+secs;}
			
			var id = yr+mn+day+hrs+mins+secs;
			*/
			var id = myuimanager.createdateString();
			
			 progid = mydatamanager.getcurrprogram().myid;
			var campid = mydatamanager.getcurrcampaign().myid;
		
		
			
			
			var mui = myuimanager;
			var name = mui.getDRowFromLabel($('#modelDialog'),"Name").find('.editdiagline_val input').val();
			var descr = mui.getDRowFromLabel($('#modelDialog'),"Description").find('.editdiagline_val input').val();
			var dset = mui.getDRowFromLabel($('#modelDialog'),"Dataset").find('button').html();
			 dsetid = mydatamanager.getdsetidfromname(dset);
			var dsetob = mydatamanager.getcurrprogram().getdsetbyid(dsetid);
			var numrows = parseInt(dsetob.rowcount);
			
			var respattr = dsetob.getResponseAttr();
			var msgattr = dsetob.getTreatmentAttr();
			if(msgattr==null){msgattr = "";}
			var pkeyattr = dsetob.getPrimkeyAttr();
			var wtattr = dsetob.getWeightAttr();
			if(wtattr == null){wtattr = "";};
			
			//var outcome = mui.getDRowFromLabel($('#modelDialog'),"Outcome").find('button').html();
			
			//var treatment = mui.getDRowFromLabel($('#modelDialog'),"Treatment").find('button').html();
			//var rowWeight = mui.getDRowFromLabel($('#modelDialog'),"Row Weight").find('button').html();
			var outcome
			var missingpenalty = mui.getDRowFromLabel($('#modelDialog'),"Missing Penalty").find('button').html();
			if(missingpenalty=="Local"){
				missingpenalty = 1.0;
			}
			else if(missingpenalty=="Equal"){
				missingpenalty = 2.0;
			}
			else{
				missingpenalty = 3.0;
			}
			
			
			var classweight = mui.getDRowFromLabel($('#modelDialog'),"Class Weight").find('button').html();
			var treatmentemphasis = mui.getDRowFromLabel($('#modelDialog'),"Treatment Emphasis").find('button').html();
			if(treatmentemphasis.indexOf(" (Balanced")>-1){
				var ind = treatmentemphasis.indexOf(" (Balanced")
				treatmentemphasis = treatmentemphasis.substr(0,ind);
			}
			var splitmetric = mui.getDRowFromLabel($('#modelDialog'),"Split Metric").find('button').html();
			var stopgrow = mui.getDRowFromLabel($('#modelDialog'),"Stop Grow (%)").find('button').html();
			var sgstr = stopgrow.substring(0,(stopgrow.indexOf("%")));
			stopgrow = parseFloat(sgstr)/100.0;
			stopgrow = Math.round(stopgrow * numrows);
			
			var minsize = mui.getDRowFromLabel($('#modelDialog'),"Minimum Size (%)").find('button').html();
			var minstr = minsize.substring(0,(minsize.indexOf("%")));
			minsize = parseFloat(minstr)/100.0;
			minsize = Math.round(minsize*numrows);
			
			var samplingpct = mui.getDRowFromLabel($('#modelDialog'),"Sampling").find('button').html();
			if(samplingpct.indexOf("100%")>-1){
				samplingpct = 1.0;
			}
			else{
				var sampstr = samplingpct.substring(0,(samplingpct.indexOf("%")));
				samplingpct = parseInt(sampstr)/100.0;
			}
			
			
			var samplingphase = mui.getDRowFromLabel($('#modelDialog'),"Sampling Phase").find('button').html();
			var samplingmodulo = Math.floor(1/(samplingpct));
			var samplingcomp = mui.getDRowFromLabel($('#modelDialog'),"Sampling Compliment").find('button').html();
			if(samplingcomp == "True"){
				samplingcomp = 1;
			}
			else{
				samplingcomp = 0;
			}	
			
				
			dta = {ID:id, Program_ID:progid, Campaign_ID:campid, Dataset_ID:dsetid, Name:name, Description:descr, Created:id, Modified:id, Model_State:"No Outcome Att",Dataset_Name:dset, Row_Count:numrows, RowID_Att:pkeyattr, Outcome_Att:respattr, Treatment_Att:msgattr, Row_Weight_Att:wtattr, Split_Metric:splitmetric,Stop_Grow:stopgrow, Min_Size:minsize, Missing_Penalty:missingpenalty, Class_Weight:classweight, Offer_Emphasis:treatmentemphasis, Calculate_Statistics:1,Sample_Percentage:samplingpct, Sample_Modulo:samplingmodulo, Sample_Phase:samplingphase, Sample_Complement:samplingcomp};
			var newmod = new model(id,progid, campid, dsetid, name,descr,id,id, "No Outcome Att");
			var camp = mydatamanager.getcurrcampaign();
			camp.addmodel(newmod);
			var mcnt = camp.models.length;
			camp.currmodel = mcnt-1;
		
	}
		//mydatamanager.updateProgramData(url,dta);
	
	
			mydatamanager.createModel(url,dta, id,dsetid,progid);
	
	
	
	
	
}
modelDisplay.prototype.setconfirmdiag = function(whichtype){
	if(whichtype == "delete"){
		$('#confirmDialog .modal-header div').html("Delete Campaign");
		$('#confirmDialog .modal-body div').html("Are you sure you want to delete this model?");
	}
}

modelDisplay.prototype.setnewdiag = function(whichtype) {
		var mui = myuimanager;
	var prog = mydatamanager.getcurrprogram();
	var dsets = prog.getdsets();
	
	var dsetstr = "";
	for(i=0; i<dsets.length; i++){
		dsetstr += ("<li><a href='javascript:;'>"+dsets[i].myfile+"</a></li>");
	}
	mui.getDRowFromLabel($('#modelDialog'),"Dataset").find('.dropdown').find('ul').html(dsetstr);
	mui.getDRowFromLabel($('#modelDialog'),"Dataset").find('.dropdown').find('button').html(dsets[0].myfile);
	mui.setddownaction(mui.getDRowFromLabel($('#modelDialog'),"Dataset").find('.dropdown'));
	
	
	this.whichdtype = whichtype;
	if(whichtype == "edit"){
		$('#modelDialog .modal-header div').html("Edit Model");
		$('#initdiagcampname').next().find('input').attr('value',camp.campname);
		$('#initdiagcampdescr').next().find('input').attr('value',camp.descr);
	
	}
	else if(whichtype == "create"){
		$('#modelDialog .modal-header div').html("Create Model");
		mui.getDRowFromLabel($('#modelDialog'),"Name").find('.editdiagline_val input').val('');
		
		var dset = mui.getDRowFromLabel($('#modelDialog'),"Dataset").find('button').html();
		 dsetid = mydatamanager.getdsetidfromname(dset);
		var dsetob = mydatamanager.getcurrprogram().getdsetbyid(dsetid);
			var respattr = dsetob.getResponseAttr();
			var msgattr = dsetob.getTreatmentAttr();
		mui.getDRowFromLabel($('#modelDialog'),"Outcome").find('.editdiagline_valtext').html(respattr);	
		mui.getDRowFromLabel($('#modelDialog'),"Treatment").find('.editdiagline_valtext').html(msgattr);	
		
		
	}
	else if(whichtype == "dup"){
		$('#modelDialog .modal-header div').html("Duplicate Model");
		$('#initdiagprogname').next().find('input').attr('value',camp.progname+" Copy");
		$('#initdiagprogdescr').next().find('input').attr('value','');
	}

	
}









