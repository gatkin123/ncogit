function dsetProfileChart(p){
	this.par = p;
	this.colorlist = ['#44bbaf','#e45b5a','#aad03e','#6960aa'];
	this.neutralcol1 = '#878bad';
	this.neutralcol2 = '#ddddef';
	
	this.myob = $('#ds_prof_charts');
	this.mynav = $('#ds_prof_charts_nav');
	this.myranges = $('#ds_prof_ranges');
	this.chartclip = new MovieClip();
	this.chartclip.setob(this.myob);
	$('#chrange_steps').css('display','none');
	$('#chrange_steps').css('visiblity','hidden');
	
	
	
}

dsetProfileChart.prototype.resetobs = function(obstr,navstr,rangestr){
	this.myob = $(obstr);
	this.mynav = $(navstr);
	this.myranges = $(rangestr);
	this.chartclip = new MovieClip();
	this.chartclip.setob(this.myob);
}

dsetProfileChart.prototype.setcomparison = function(whichcomp, dtype){
	this.whichcompmode = whichcomp;	
	this.whichdatatype = dtype;
}





dsetProfileChart.prototype.build = function(){
	this.myob.html("");
	//this.mynav.html("");
	var obstr = "";
	var navstr = "";
	this.chartclip.removeChildren();
	var currdata = mydatamanager.getcurrdset().chdata;
	//	this.chdata= {pcts:pctlist,labs:lablist, leg:leglist};
	var chwidth = 500;
	if(this.chartType == "pie"){
		this.leglist = currdata.leglist;
	
		this.mychart = new intpiering(this);
		this.mychartTitle = new MovieClip();
		
		this.chartclip.addChild(this.mychart.pieclip);
		this.chartclip.addChild(this.mychartTitle);
		
		this.mychart.pieclip.setx(0);
		this.mychart.pieclip.sety(-40);
		this.mychart.pieclip.graphics.setcnvdim(chwidth,chwidth);
		this.mychart.setCenter(chwidth/2,chwidth/2);
		var collist = new Array();
		collist = [this.neutralcol1, this.neutralcol2];
		this.mychart.setcolors(collist);
		var outerrad = chwidth/2 * 0.8;
		var innerrad = outerrad * 0.7;
		this.mychart.setData(currdata.pcts);
		this.mychart.setRingPoints(innerrad,outerrad);
		
		
		this.mychart.clearChart();
		this.mychart.drawChart();
		var firstpct = currdata.pcts[0];
		var rndpct = Math.round(firstpct*100,2)+"%";
		var lab = "RESPONSE RATE";
		this.mychart.setCenterLab(lab);
		this.mychart.setCenterVal(rndpct);
		this.mychart.drawCenterLab();
		
	}
	else if(this.chartType == "bar"){
		
	
		this.leglist = currdata.leg;
		this.lablist = currdata.labs;
		this.mychart = new barchart();
		this.mychart.setob(this.myob);
		//var dlist = this.myuiManager.generateFakePcts(rng.length);
		
		this.mychart.setdata(currdata.pcts);
		
		this.mychart.setwidth(chwidth);
		this.mychart.setheight(400);
		this.mychart.chartob.sety(20);
		var collist = this.colorlist;
		this.mychart.setcolors(collist);
		this.mychart.setmax();
		this.mychart.createxax();
		this.mychart.createyax();
		this.mychart.setchartcnv();
		this.mychart.setxlabels(null,this.lablist);
		this.mychart.tintback('#ddddef');
		this.mychart.buildyax();
		this.mychart.buildxax();
		this.mychart.setbarroll();
		
		//this.mychart.drawbaseline();
		//this.mychart.drawtopline();
			
		this.mychart.setbars();
	
		this.mychart.drawchart();
		
		//this.buildchartNav("total");
		
	}
	else if(this.chartType == "cluster"){
			this.leglist = currdata.leg;
			this.lablist = currdata.labs;
			this.mychart = new clusterchart();
			this.mychart.setob(this.myob);
			//var dlist = this.myuiManager.generateFakePcts(rng.length);
			
			this.mychart.setdata(currdata.pcts);
			
			this.mychart.setwidth(chwidth);
			this.mychart.setheight(400);
			this.mychart.chartob.sety(20);
			this.mychart.chartob.setx(30);
		
			var collist = this.colorlist;
			this.mychart.setcolors(collist);
			this.mychart.legendclip.setx(375);
			this.mychart.legendclip.sety(5);
			this.mychart.setlegend(this.leglist);
			this.mychart.setmax();
			this.mychart.createxax();
			this.mychart.createyax();
				this.mychart.setchartcnv();
			this.mychart.setxlabels(null,this.lablist);
				this.mychart.tintback('#ddddef');
			this.mychart.buildyax();
			this.mychart.buildxax();
				this.mychart.setbarroll();
		
			
			this.mychart.setbars();
			this.mychart.drawchart();
		
		
	}
	else if(this.chartType == "stacked"){
			this.leglist = currdata.leg;
			this.lablist = currdata.labs;
			this.mychart = new stackchart();
			this.mychart.setob(this.myob);
			//var dlist = this.myuiManager.generateFakePcts(rng.length);

			this.mychart.setdata(currdata.pcts);
			
			this.mychart.setwidth(chwidth);
			this.mychart.setheight(400);
			this.mychart.chartob.sety(20);
			var collist = this.colorlist;
			this.mychart.setcolors(collist);
				this.mychart.legendclip.setx(400);
				this.mychart.legendclip.sety(5);
					this.mychart.setlegend(this.leglist);
			this.mychart.setmax();
			this.mychart.createxax();
			this.mychart.createyax();
			this.mychart.setchartcnv();
			this.mychart.setxlabels(null,this.lablist);
				this.mychart.tintback('#ddddef');
			this.mychart.buildyax();
			this.mychart.buildxax();
				this.mychart.setbarroll();
			this.mychart.setbars();
			this.mychart.drawchart();
	}
}
dsetProfileChart.prototype.clearRanges = function(){
	this.myranges.html("");
	this.myranges.css('visibility','hidden');
}

dsetProfileChart.prototype.buildRanges =function(){

	var labstr = "<div class='sublab2'>DEFINE CHART RANGES</div>";
	var rstr = "";
	rstr += ("<div id='chrange'>");
	rstr += ("<div id='chextras'></div>");
	rstr += ("</div>");


	this.myranges.html(rstr);
	this.myranges.css('visibility','visible');
	
	/*
	$("#chrmax").slider();
	$("#chrmax").on("slide", function(slideEvt) {
					console.log($(this).attr('id'));
					//myuimanager.mydsetdisplay.dsetprofchart.setslup($(this).attr('id'),slideEvt.value);


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	*/
	
/*	
	$("#chrsteps").slider();
	$("#chrsteps").on("slide", function(slideEvt) {
					console.log($(this).attr('id'));
					myuimanager.mydsetdisplay.dsetprofchart.setslup($(this).attr('id'),slideEvt.value);


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	$("#chrsteps").on("slideStop", function(slideEvt) {
					console.log($(this).attr('id'));
					myuimanager.mydsetdisplay.resetChart();


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	*/
	





}

dsetProfileChart.prototype.setslup=function(attr,v){
	//$.find("#"+attr+"Slider .slider-handle").mouseup(function(){alert("Sooka")});
	
	var dset = mydatamanager.getcurrprogram().getcurrdset();
	if(attr == "chrmax"){
		dset.rangemx = v;
	}
	else if(attr == "chrsteps"){
		dset.rangesteps= v;
	}
//	$("#"+attr+"Slider .slider-handle").unbind().mouseup(function(){myuimanager.mydsetdisplay.resetChart();});
}
			
	
	

	
dsetProfileChart.prototype.setExtras = function(attr){
	var dset = mydatamanager.getcurrprogram().getcurrdset();
	

	
	var mx = dset.getmaxfromData(attr);
	var mn = dset.getminfromData(attr);
	var nulls = dset.getnullsfromData(attr);
	
	var exstr = "";
	exstr += ("<div class='exline'>");
	exstr += ("<div class='exline_lab'>Maximum:&nbsp;</div><div class='exline_val'>"+myuimanager.commaFormat(mx)+"</div>");
	exstr += ("</div>");
	
	exstr += ("<div class='exline'>");
	exstr += ("<div class='exline_lab'>Minimum:&nbsp;</div><div class='exline_val'>"+myuimanager.commaFormat(mn)+"</div>");
	exstr += ("</div>");
	
	exstr += ("<div class='exline'>");
	exstr += ("<div class='exline_lab'>Number of Missing:&nbsp;</div><div class='exline_val'>"+myuimanager.commaFormat(nulls)+"</div>");
	exstr += ("</div>");
	
	$('#chextras').html(exstr);
	
	
	
	
}	

dsetProfileChart.prototype.setRanges = function(attr){
	var dset = mydatamanager.getcurrprogram().getcurrdset();
	

	
	var mx = dset.getmaxfromData(attr);
	var mn = dset.getminfromData(attr);
	var stp = 1;
	
	var newmaxstr = "<div id='chrmaxlab'>Maximum Value Shown:</div><input id='chrmax' data-slider-id='chrmaxSlider' type='text' data-slider-min='"+mn+"' data-slider-max='"+mx+"' data-slider-step='"+stp+"' data-slider-value='"+mx+"'/>";
	
	$('#chrange_max').html(newmaxstr);
	
	$("#chrmax").slider({
		formatter: function(value) {
				return myuimanager.commaFormat(value);
			}
	
	});
	$("#chrmax").on("slide", function(slideEvt) {
					myuimanager.mydsetdisplay.dsetprofchart.setslup($(this).attr('id'),slideEvt.value);


	});
	
	$("#chrmax").on("slideStop", function(slideEvt) {
					myuimanager.mydsetdisplay.resetChart();


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	
		
	
}
dsetProfileChart.prototype.initchartNav = function(){
	var iclist = new Array();

	if(this.par.whichchoicemode == "total"){
		if(this.par.whichchoice == "response"){
			this.chartType = "pie";
			iclist = [];
		}
		else{
			this.chartType = "cluster";
			iclist = [];
		}
	}
	
	var i;
	var icstr = "";
	for(i=0; i<iclist.length; i++){
		if(i==0){
			icstr += ("<div id='chicon_"+iclist[i]+"' class='chicon chicactive'><img src='images/chic_"+iclist[i]+".png' width='25'/></div>");
		}
		else{
			icstr += ("<div id='chicon_"+iclist[i]+"' class='chicon'><img src='images/chic_"+iclist[i]+".png' width='25'/></div>");
		}
		
	}
	this.mynav.html(icstr);
	$('.chicon').each(function(ind){
		var charttype = $(this).attr('id').split("_")[1];
		
		$(this).click(function(){myuimanager.mydsetdisplay.switchProfileChart(charttype)});
	});
	
		
	
}








function modProfileChart(p){
	this.par = p;
	this.colorlist = ['#44bbaf','#e45b5a','#aad03e','#6960aa'];
	this.neutralcol1 = '#878bad';
	this.neutralcol2 = '#ddddef';
	
	this.myob = $('#ds_prof_charts');
	this.mynav = $('#ds_prof_charts_nav');
	this.myranges = $('#ds_prof_ranges');
	this.chartclip = new MovieClip();
	this.chartclip.setob(this.myob);
	
	
	
}

modProfileChart.prototype.resetobs = function(obstr,navstr,rangestr){
	this.myob = $(obstr);
	this.mynav = $(navstr);
	this.myranges = $(rangestr);
	this.chartclip = new MovieClip();
	this.chartclip.setob(this.myob);
}

modProfileChart.prototype.setcomparison = function(whichcomp, dtype){
	this.whichcompmode = whichcomp;	
	this.whichdatatype = dtype;
}





modProfileChart.prototype.build = function(){
	this.myob.html("");
	//this.mynav.html("");
	var obstr = "";
	var navstr = "";
	this.chartclip.removeChildren();
	var mod = mydatamanager.getcurrcampaign().getcurrmodel();
	
	/*
	this.segstats_overallmax = dset.getmaxfromData();
	this.segstats_overallmin = dset.getminfromData();
	this.segstats_overallmean = dset.getmeanfromData();
	this.segstats_segmax = stats.maxval;
	this.segstats_segmin = stats.minval;
	this.segstats_segmean = stats.mean;
	*/
		var chwidth = 500;
	var chdata = new Array();
	
	var datarow2 = new Array();
	datarow2 = [mod.segstats_segmin, mod.segstats_segmean, mod.segstats_segmax];
	chdata = [datarow2];
	this.mychart = new statchart();
	this.mychart.setdata(chdata);
	this.mychart.setmax();
	this.mychart.setxlabels();
		
		
		this.leglist =["Segment"];
		
		this.mychart.setob(this.myob);
		//var dlist = this.myuiManager.generateFakePcts(rng.length);
		
		this.mychart.setdata(chdata);
		
		this.mychart.setwidth(chwidth);
		this.mychart.setheight(400);
		this.mychart.chartob.sety(20);
		var collist = this.colorlist;
		this.mychart.setcolors(collist);
		this.mychart.legendclip.setx(375);
		this.mychart.legendclip.sety(5);
		this.mychart.setlegend(this.leglist);
		this.mychart.createxax();
		this.mychart.setchartcnv();
		this.mychart.tintback('#ddddef');
		this.mychart.buildxax();
		
		//this.mychart.drawbaseline();
		//this.mychart.drawtopline();
			
		this.mychart.setbars();
		this.mychart.setbarroll();
		this.mychart.drawchart();
		
	
	

}
modProfileChart.prototype.clearRanges = function(){
	this.myranges.html("");
	this.myranges.css('visibility','hidden');
}

modProfileChart.prototype.buildRanges =function(){

	var labstr = "<div class='sublab2'>DEFINE CHART RANGES</div>";
	var rstr = "";
	rstr += ("<div id='chrange'>");
	rstr += ("<div id='chextras'></div>");
	rstr += ("</div>");


	this.myranges.html(rstr);
	this.myranges.css('visibility','visible');
	
	/*
	$("#chrmax").slider();
	$("#chrmax").on("slide", function(slideEvt) {
					console.log($(this).attr('id'));
					//myuimanager.mymodeldisplay.dsetprofchart.setslup($(this).attr('id'),slideEvt.value);


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	*/
	
	/*
	$("#chrsteps").slider();
	$("#chrsteps").on("slide", function(slideEvt) {
					console.log($(this).attr('id'));
					myuimanager.mymodeldisplay.dsetprofchart.setslup($(this).attr('id'),slideEvt.value);


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	$("#chrsteps").on("slideStop", function(slideEvt) {
					console.log($(this).attr('id'));
					myuimanager.mymodeldisplay.resetChart();


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	*/





}

modProfileChart.prototype.setslup=function(attr,v){
	//$.find("#"+attr+"Slider .slider-handle").mouseup(function(){alert("Sooka")});
	
	var dset = mydatamanager.getcurrprogram().getcurrdset();
	if(attr == "chrmax"){
		dset.rangemx = v;
	}
	else if(attr == "chrsteps"){
		dset.rangesteps= v;
	}
//	$("#"+attr+"Slider .slider-handle").unbind().mouseup(function(){myuimanager.mymodeldisplay.resetChart();});
}
			
	
	

	
modProfileChart.prototype.setExtras = function(attr){
	var dset = mydatamanager.getcurrprogram().getcurrdset();
	

	
	var mx = dset.getmaxfromData(attr);
	var mn = dset.getminfromData(attr);
	var nulls = dset.getnullsfromData(attr);
	
	var exstr = "";
	exstr += ("<div class='exline'>");
	exstr += ("<div class='exline_lab'>Maximum:&nbsp;</div><div class='exline_val'>"+myuimanager.commaFormat(mx)+"</div>");
	exstr += ("</div>");
	
	exstr += ("<div class='exline'>");
	exstr += ("<div class='exline_lab'>Minimum:&nbsp;</div><div class='exline_val'>"+myuimanager.commaFormat(mn)+"</div>");
	exstr += ("</div>");
	
	exstr += ("<div class='exline'>");
	exstr += ("<div class='exline_lab'>Number of Missing:&nbsp;</div><div class='exline_val'>"+myuimanager.commaFormat(nulls)+"</div>");
	exstr += ("</div>");
	
	$('#chextras').html(exstr);
	
	
	
	
}	

modProfileChart.prototype.setRanges = function(attr){
	var dset = mydatamanager.getcurrprogram().getcurrdset();
	

	
	var mx = dset.getmaxfromData(attr);
	var mn = dset.getminfromData(attr);
	var stp = 1;
	
	var newmaxstr = "<div id='chrmaxlab'>Maximum Value Shown:</div><input id='chrmax' data-slider-id='chrmaxSlider' type='text' data-slider-min='"+mn+"' data-slider-max='"+mx+"' data-slider-step='"+stp+"' data-slider-value='"+mx+"'/>";
	
	$('#chrange_max').html(newmaxstr);
	
	$("#chrmax").slider({
		formatter: function(value) {
				return myuimanager.commaFormat(value);
			}
	
	});
	$("#chrmax").on("slide", function(slideEvt) {
					myuimanager.mymodeldisplay.dsetprofchart.setslup($(this).attr('id'),slideEvt.value);


	});
	
	$("#chrmax").on("slideStop", function(slideEvt) {
					myuimanager.mymodeldisplay.resetChart();


					//clearTimeout(tvar);
					//tvar = setTimeout(function(){ alert("Hello"); }, 500);



	});
	
		
	
}
modProfileChart.prototype.initchartNav = function(){
	var iclist = new Array();

	if(this.par.whichchoicemode == "total"){
		if(this.par.whichchoice == "response"){
			this.chartType = "pie";
			iclist = [];
		}
		else{
			this.chartType = "bar";
			iclist = [];
		}
	}
	else if(this.par.whichchoicemode == "comparemessage" || this.par.whichchoicemode == "compareresponse"){
		this.chartType = "cluster";
		iclist = ["cluster","stacked"];

	}
	var i;
	var icstr = "";
	for(i=0; i<iclist.length; i++){
		if(i==0){
			icstr += ("<div id='chicon_"+iclist[i]+"' class='chicon chicactive'><img src='images/chic_"+iclist[i]+".png' width='25'/></div>");
		}
		else{
			icstr += ("<div id='chicon_"+iclist[i]+"' class='chicon'><img src='images/chic_"+iclist[i]+".png' width='25'/></div>");
		}
		
	}
	this.mynav.html(icstr);
	$('.chicon').each(function(ind){
		var charttype = $(this).attr('id').split("_")[1];
		
		$(this).click(function(){myuimanager.mymodeldisplay.switchProfileChart(charttype)});
	});
	
		
	
}





