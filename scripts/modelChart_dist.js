function modelChart_dist(){
	this.myob = $('#mod_charts_dist');
	this.mychart = new linechart();
	this.mychart.setob(this.myob);
	
	

}

modelChart_dist.prototype.initlegend = function(){
	var leglist = new Array();
	
	leglist = ["Model Data Segment Size", "Model Data Outcome Rate", "Cross Val Score Data Segment Size", "Cross Val Score Data Outcome Rate"];
	this.mychart.setlegend(leglist);
	
}