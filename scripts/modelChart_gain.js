function modelChart_gain(){
	this.myob = $('#mod_charts_gain');
	this.mychart = new linechart();
	this.mychart.setob(this.myob);
	this.colorlist = ['#aad03e','#e45b5a','#44bbaf', '#999'];
	//['#44bbaf','#e45b5a','#aad03e','#6960aa'];


}
modelChart_gain.prototype.reinit=function(){
	this.mychart.myclip.removeChildren();
	this.mychart.myclip.graphics.clear();
	this.mychart.setob(this.myob);
	this.init();
	
	
}
modelChart_gain.prototype.init = function(){
	//	this.myob.html("");
//	this.mychart.myclip.removeChildren();
	this.mychart.myclip.graphics.clear();
		var chwidth = 500;
		var currcamp = mydatamanager.getcurrcampaign();
		var mod = currcamp.getcurrmodel();
		var dta;
	if(mod.treatmentactive == false){
		dta = mod.tempgaindata_notreat;
	}
	else{
		dta = mod.tempgaindata;
	}
//	var dta = mod.tempgaindata;
	var lablist = ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
		//var dlist = this.myuiManager.generateFakePcts(rng.length);
	
	this.mychart.setdata(dta);
		
	this.mychart.setwidth(chwidth);
		this.mychart.setheight(400);
		this.mychart.chartob.sety(20);
	
	
		var leglist = new Array();
	if(mod.treatmentactive == false){
		leglist = ["Model Score","Random"];	
		this.colorlist = ['#44bbaf','#999'];
	}
	else{
		leglist = ["DC","LI", "Best", "Random"];
		this.colorlist = ['#aad03e','#e45b5a','#44bbaf', '#999'];
	}
	
		var collist = this.colorlist;
		this.mychart.setcolors(collist);
	
	
			this.mychart.legendclip.setx(this.mychart.mywidth+10);
			this.mychart.legendclip.sety(30);
		this.mychart.setlegendRightThin(leglist);
		
		this.mychart.setxstep(false);
		this.mychart.setmax(100);
		this.mychart.setydiv(10);
		//this.mychart.setxlabels(null,lablist);
		
		$('#mod_charts_gain_xtitle1').css('left',60).css('top',this.mychart.myheight + 50);
		$('#mod_charts_gain_xtitle2').css('left',480).css('top',this.mychart.myheight + 50 );
	//	this.mychart.createxax();
		this.mychart.createyax();
		this.mychart.setchartcnv();
	
		this.mychart.tintback('#ddddef');
		this.mychart.buildyax();
	//	this.mychart.buildxax();
		this.mychart.setbarroll();
	
		
		this.mychart.drawchart();
		
		
	
	
	
	
}