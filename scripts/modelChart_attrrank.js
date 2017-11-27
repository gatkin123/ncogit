function modelChart_attrrank(){
	this.myob = $('#mod_segattrcharts');
	this.mychart = new rankchart();
	this.mychart.setob(this.myob);
	this.colorlist = ["#44bbaf"];
	
	

}
modelChart_attrrank.prototype.reinit=function(){
	this.mychart.myclip.removeChildren();
	this.mychart.myclip.graphics.clear();
	this.mychart.setob(this.myob);
	this.init();
	
	
}

modelChart_attrrank.prototype.init = function(){
	//this.mychart.myclip.removeChildren();
//	this.mychart.myclip.graphics.clear();
	var chwidth = 500;
	var currcamp = mydatamanager.getcurrcampaign();
	var mod = currcamp.getcurrmodel();
	
	var dta = mod.attrimportlist;
	
	var valList = new Array();
	var labList = new Array();
	var i;
	for(i=0; i<dta.length;i++){
		var currdat = dta[i];
		var currlab = currdat.attribute;
		var currval = currdat.ranking;
		
		labList.push(currlab.toUpperCase());
		valList.push(parseFloat(currval));
		
	}
	this.mychart.myclip.setx(250);
	this.mychart.setxlabels(null,labList);
	this.mychart.setdata(valList);
	this.mychart.setwidth(chwidth);
	this.mychart.setheight(400);
	this.mychart.chartob.sety(20);
	
	this.mychart.setcolors(this.colorlist);
	
	this.mychart.setmax();
	this.mychart.createyax();
	this.mychart.setchartcnv();
	this.mychart.tintback('#ddddef');
	this.mychart.buildyax();
	this.mychart.setbars();
	this.mychart.setbarroll();
	this.mychart.drawchart();
	
	
	
	
	
	
}
