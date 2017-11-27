function modelChart_lift(){
	this.myob = $('#mod_charts_lift');
	this.mychart = new linechart();
	this.mychart.setob(this.myob);
	this.colorlist = ['#e45b5a','#999','#aad03e','#6960aa'];
	//e45b5a
	//44bbaf
	

}
modelChart_lift.prototype.reinit=function(){
	this.mychart.myclip.removeChildren();
	this.mychart.myclip.graphics.clear();
	this.mychart.setob(this.myob);
	this.init();
	
	
} 
modelChart_lift.prototype.init = function(){
		//this.mychart.myclip.graphics.clear();
		var chwidth = 500;
		var currcamp = mydatamanager.getcurrcampaign();
		var mod = currcamp.getcurrmodel();
	var dta = mod.templiftdata;
	var i;
	var lablist = new Array();
	for(i=0; i<mod.segments.length; i++){
		lablist.push((i+1)+"");
	}
		//var dlist = this.myuiManager.generateFakePcts(rng.length);
		
	this.mychart.setdata(dta);
		
	this.mychart.setwidth(chwidth);
		this.mychart.setheight(400);
		this.mychart.chartob.sety(20);
	
		var collist = this.colorlist;
		this.mychart.setcolors(collist);
		
		var leglist = new Array();

		leglist = ["Model Response", "Avg Response"];
		this.mychart.legendclip.setx(this.mychart.mywidth+10);
		this.mychart.legendclip.sety(30);
		
		this.mychart.setlegendRightThin(leglist);
		this.mychart.legendclip.myob.css('z-index',2000);
	
		var mx = 0.0;
		for(i=0; i<dta[0].length; i++){
			var currmodpnt = dta[0][i];
			var curryval = currmodpnt[1];
			if(curryval > mx){
				mx = curryval;
			}
		}
		var dec = 0.0;
		while(dec < mx){
			dec += 0.5;
		}
		
		
		this.mychart.setmax(dec);
		this.mychart.setxstep(true);
		this.mychart.setydiv(.5);
		
		
		$('#mod_charts_lift_xtitle1').css('left',60).css('top',this.mychart.myheight + 30 + 520 );
		$('#mod_charts_lift_xtitle2').css('left',480).css('top',this.mychart.myheight + 30 + 520);
			
		this.mychart.setxlabels(null,lablist);
	//	this.mychart.createxax();
		this.mychart.createyax();
		this.mychart.setchartcnv();
	
		this.mychart.tintback('#ddddef');
		this.mychart.buildyax();
	//	this.mychart.buildxax();
		this.mychart.setbarroll();
		
		this.mychart.drawchart();
		
		
	
	
	
	
}