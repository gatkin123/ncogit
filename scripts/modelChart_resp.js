function modelChart_resp(){
	this.myob = $('#mod_charts_resp');
	this.mychart = new linechart();
	this.mychart.setob(this.myob);
	this.colorlist = ['#aad03e','#e45b5a','#44bbaf', '#999'];
	//e45b5a
	//44bbaf
	

}
modelChart_resp.prototype.reinit=function(){
	this.mychart.myclip.removeChildren();
	this.mychart.myclip.graphics.clear();
	this.mychart.setob(this.myob);
	this.init();
	
	
} 
modelChart_resp.prototype.hide = function(){
	this.myob.fadeTo(1,0);
	

	$('#mod_charts_resp_title').fadeTo(1,0);
	$('#mod_charts_resp_ytitle').fadeTo(1,0);
	$('#mod_charts_resp_xtitle').fadeTo(1,0);
	$('#mod_charts_resp_xtitle1').fadeTo(1,0);
	$('#mod_charts_resp_xtitle2').fadeTo(1,0);
	
}
modelChart_resp.prototype.show = function(){
	this.myob.fadeTo(1,1);
	
	
	$('#mod_charts_resp_title').fadeTo(1,1);
	$('#mod_charts_resp_ytitle').fadeTo(1,1);
	$('#mod_charts_resp_xtitle').fadeTo(1,1);
		$('#mod_charts_resp_xtitle1').fadeTo(1,1);
	$('#mod_charts_resp_xtitle2').fadeTo(1,1);
	
}

modelChart_resp.prototype.init = function(){
		//this.mychart.myclip.graphics.clear();
		var chwidth = 500;
		var currcamp = mydatamanager.getcurrcampaign();
		var mod = currcamp.getcurrmodel();
		
		if(mod.treatmentactive == false){
			dta = mod.temprespdata_notreat;
		}
		else{
			dta = mod.temprespdata;
		}
		
	//var dta = mod.temprespdata;
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
	
	
		
		var leglist = new Array();

		if(mod.treatmentactive == false){
			this.colorlist = ['#44bbaf', '#999'];
			leglist = ["Model Response","Avg Response"];	
		}
		else{
			this.colorlist = ['#aad03e','#e45b5a','#44bbaf', '#999'];
			leglist = ["DC Response","LI Response", "Best Response", "Avg Response"];
		}
			var collist = this.colorlist;
			this.mychart.setcolors(collist);
		
		this.mychart.legendclip.setx(this.mychart.mywidth+10);
		this.mychart.legendclip.sety(30);
		
		this.mychart.setlegendRightThin(leglist);
		this.mychart.legendclip.myob.css('z-index',2000);
	
		var mx = 0.0;
		var i,ii;
		for(i=0; i<dta.length; i++){
			var currline = dta[i];
			for(ii=0; ii<currline.length; ii++){
				var currdata = currline[ii];
				var curry = currdata[1];
				if(curry > mx){
					mx = curry;
				}
			}
		}
	
	
		var dec = 0.0;
		while(dec < mx){
			dec += 0.005;
		}
		
		
		this.mychart.setmax(dec);
		this.mychart.setxstep(true);
		this.mychart.setydiv(.005);
		
		
		$('#mod_charts_resp_xtitle1').css('left',60).css('top',this.mychart.myheight + 30 + 520 );
		$('#mod_charts_resp_xtitle2').css('left',480).css('top',this.mychart.myheight + 30 + 520);
			
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