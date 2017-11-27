function rankchart(){
	
	
}

rankchart.prototype = Object.create(barchart.prototype);
rankchart.prototype.contructor = barchart;

rankchart.prototype.createyax = function(){
	//xlabs
	this.yaxob = new MovieClip();
	this.yaxlist = new Array();
	this.myclip.addChild(this.yaxob);
	var l = this.xlabs.length;
	var i;
	for(i=0; i<l; i++){
		var yob = new MovieClip();
		yob.myob.addClass('yaxlabwide');
		this.yaxlist.push(yob);
		this.yaxob.addChild(yob);
		yob.setx(-1000);
	}
	
	
	
}
rankchart.prototype.setbarroll = function(){
	this.barroll.graphics.setcnvdim(100,100);
	this.barroll.graphics.beginFill('#000');
	this.barroll.graphics.drawRect(0,0,100,60);
	this.barroll.graphics.endFill();
	this.barlabcl = new MovieClip();
	this.barlabcl.width(100);
	this.barroll.addChild(this.barlabcl);

	this.barlabcl.myob.addClass('broll');
	this.barroll.myob.css('z-index',1000);
}



rankchart.prototype.buildyax = function(){
	
var l = this.xlabs.length;
	this.yaxob.setx(this.chartob.x-5);
	this.yaxob.sety(this.chartob.y-5);
	var div = this.myheight / (l+1);
	
	var curry = (div/2);
	var currval = 0;
	var currvuse;
	var i;
	
	var exlinewidth = 240;
	var extralineclip = new MovieClip();
	this.chartob.addChild(extralineclip);
	extralineclip.width(exlinewidth);
	extralineclip.height(this.myheight);
	extralineclip.graphics.setcnvdim(exlinewidth,this.myheight);
	extralineclip.setx(-exlinewidth);
	extralineclip.sety(0);
	
	for(i=0; i<l; i++){
		currvuse = this.xlabs[i];
		this.yaxlist[i].setx(-230);
		this.yaxlist[i].sety(curry-3);
		
		this.chartob.graphics.beginPath();
		this.chartob.graphics.lineStyle(1,'#efefef');
		this.chartob.graphics.moveTo(0,curry+(div/2));
		this.chartob.graphics.lineTo(this.mywidth,curry+(div/2));
		this.chartob.graphics.stroke();
		
			extralineclip.graphics.beginPath();
			extralineclip.graphics.lineStyle(1,'#bbb');
			extralineclip.graphics.moveTo(0,curry+(div/2));
			extralineclip.graphics.lineTo(exlinewidth,curry+(div/2));
			extralineclip.graphics.stroke();
			
		
		this.yaxlist[i].myob.html(currvuse);
		
		curry += div;
		
	}
	
	
}
rankchart.prototype.setmax = function(){
	var m = -10000;
	for(i=0; i<this.mydata.length; i++){
		var d = this.mydata[i];
		if(d>m){
			m=d;
		}
	}
	this.maxval = m;
	return (m*1.1);
}


rankchart.prototype.drawchart = function(){

	var i;
	
	var barspace = this.myheight / (this.mydata.length+1) 
	var curry = (barspace/2);
	var barwidth = Math.max(3,barspace /3);
	
	for(i=0; i<this.mydata.length; i++){
		var d = this.mydata[i];
		
		var fr = (d/this.maxval);
		var w = fr * this.mywidth;
		
		this.barlist[i].setx(0);
		this.barlist[i].sety(curry-(barwidth/2));
		this.barlist[i].width(w);
		this.barlist[i].height(barwidth);
	
		this.barlist[i].graphics.setcnvdim(w,barwidth);
		this.barlist[i].graphics.beginFill(this.mycolors[0]);
		this.barlist[i].graphics.drawRect(0,0,w,barwidth);
		this.barlist[i].graphics.endFill();
		
	
		
		var dstr = d+"";
		if(dstr.indexOf('.')>-1){
			dstr = dstr.substring(0,dstr.indexOf('.')+6);
		}
		
		this.barlist[i].myob.data('chob',this).data('val',dstr).data('bar',this.barlist[i]).on('mousemove',function(evt){
			$(this).data('chob').showbarroll($(this).data('val'),evt.pageX,evt.pageY,$(this).data('bar'));
		});
		this.barlist[i].myob.on('mouseout',function(evt){
			$(this).data('chob').hidebarroll();
		});	
		
		curry += barspace;	
	}

	
}


function statchart(){
	
	
	
	
}

statchart.prototype = Object.create(barchart.prototype);
statchart.prototype.contructor = barchart;

statchart.prototype.setmax = function(){
	
	var m = -100000.0;
	
	var i,ii;
	for(i=0;i<this.mydata.length;i++){
		var currset = this.mydata[i];
		for(ii=0; ii<currset.length; ii++){
			var currval = currset[ii];
			if(currval > m){
				m= currval;
			}
		}
	}
	var dec = .0001;
	var mx;
	while(dec < m){
		dec *= 10;
	}
	if(m <= dec/2){
		mx = dec/2;
	}
	else{
		mx = dec;
	}
	this.maxval = mx;
	return mx;
	
}

statchart.prototype.setbarroll = function(){
	this.barroll.graphics.setcnvdim(100,100);
	this.barroll.graphics.beginFill('#000');
	this.barroll.graphics.drawRect(0,0,100,60);
	this.barroll.graphics.endFill();
	this.barlabcl = new MovieClip();
	this.barlabcl.width(100);
	this.barroll.addChild(this.barlabcl);

	this.barlabcl.myob.addClass('broll');
	this.barroll.myob.css('z-index',1000);
}

statchart.prototype.createxax = function(){
	
	this.xaxob = new MovieClip();
	this.xaxlist = new Array();
	this.myclip.addChild(this.xaxob);
	var l = this.xlabs.length;
	var i;
	for(i=0; i<=l; i++){
		var xob = new MovieClip(); 
		xob.myob.addClass('xaxlab');
		this.xaxlist.push(xob);
		this.xaxob.addChild(xob);
		
	}
	
	
}
statchart.prototype.setxlabels = function(){
	var i;
	var div;
	var numsteps;
	var mstr = this.maxval+"";
	var divis;
	this.xlabs = new Array();
	if(mstr.charAt(0)=="5"){
		divis = 5;
	}
	else{
		divis = 10;
	}
	if(divis==10){
		div = this.maxval/10;
		numsteps=10;
	}
	else{
		div = this.maxval/5;
		numsteps = 5;
	}
	var currv = 0;
	for(i=0; i<=numsteps; i++){
		this.xlabs.push(myuimanager.commaFormat(currv));
		currv += div;
	}
	

}

statchart.prototype.setbars = function(){
	
	this.barlist = new Array();
	this.bardotlist = new Array();
	
	var i;
	for(i=0; i<this.mydata.length; i++){
		var barob = new MovieClip();
		this.barlist.push(barob);
		this.chartob.addChild(barob);
		
	}
	var ii;
	
	for(i=0; i<this.mydata.length; i++){
		var d = this.mydata[i];
		for(ii=0; ii<d.length; ii++){
			var bardotclip = new MovieClip();
			this.bardotlist.push(bardotclip);
			this.chartob.addChild(bardotclip);
			
		}
	}
	
	
	
}

statchart.prototype.drawchart = function(){

	var i,ii;
	
	var dotcounter = 0;
	for(i=0; i<this.mydata.length; i++){
		var d = this.mydata[i];
		var min = d[0];
		var mean = d[1];
		var max = d[2];
		
		var fr_min = (min/this.maxval);
		var fr_mean = (mean/this.maxval);
		var fr_max = (max/this.maxval);
		
		var p_min = fr_min * (this.mywidth);
		var p_mean = fr_mean * (this.mywidth);
		var p_max = fr_max * (this.mywidth);
		var h = 20;
		
		this.chartob.graphics.lineStyle(2,'#878bad');
		this.chartob.graphics.beginPath();
		this.chartob.graphics.moveTo(p_min,this.myheight * ((i+1)/3));
		this.chartob.graphics.lineTo(p_min,this.myheight);
		this.chartob.graphics.stroke();
		
		this.chartob.graphics.beginPath();
		this.chartob.graphics.moveTo(p_mean,this.myheight * ((i+1)/3));
		this.chartob.graphics.lineTo(p_mean,this.myheight);
		this.chartob.graphics.stroke();
		
		this.chartob.graphics.beginPath();
		this.chartob.graphics.moveTo(p_max,this.myheight * ((i+1)/3));
		this.chartob.graphics.lineTo(p_max,this.myheight);
		this.chartob.graphics.stroke();
			
		
		this.barlist[i].setx(p_min);
		this.barlist[i].sety(this.myheight * ((i+1)/3));
		this.barlist[i].width(p_max - p_min);
		this.barlist[i].height(h);
	
		this.barlist[i].graphics.setcnvdim(p_max - p_min,h);
		this.barlist[i].graphics.beginFill(this.mycolors[i]);
		this.barlist[i].graphics.drawRect(0,0,p_max - p_min,h);
		this.barlist[i].graphics.endFill();
		this.barlist[i].myob.css('opacity',0.3);
		
		this.bardotlist[dotcounter].setx(p_min-10);
		this.bardotlist[dotcounter].sety(this.myheight * ((i+1)/3));
		this.bardotlist[dotcounter].width(20);
		this.bardotlist[dotcounter].height(20);
		this.bardotlist[dotcounter].graphics.setcnvdim(22,22);
		this.bardotlist[dotcounter].graphics.beginFill(this.mycolors[i]);
		this.bardotlist[dotcounter].graphics.drawEllipse(0,0,10,10);
		this.bardotlist[dotcounter].graphics.endFill();
		//this.bardotlist[dotcounter].myob.data('val',"Min:"+min).data('chrt',this).mouseover(function(ev){
	//		$(this).data('chrt').placeval($(this),$(this).data('val'));	
	//	});
		var minstr = min+"";
		if(minstr.indexOf('.')>-1){
			minstr = minstr.substring(0,minstr.indexOf('.')+2);
		}
		this.bardotlist[dotcounter].myob.data('chob',this).data('val',("Min: "+myuimanager.commaFormat(minstr))).data('bar',this.bardotlist[dotcounter]).on('mousemove',function(evt){
			$(this).data('chob').showbarroll($(this).data('val'),evt.pageX,evt.pageY,$(this).data('bar'));
		});
		this.bardotlist[dotcounter].myob.on('mouseout',function(evt){
			$(this).data('chob').hidebarroll();
		});
		dotcounter++;
		
		this.bardotlist[dotcounter].setx(p_mean-10);
		this.bardotlist[dotcounter].sety(this.myheight * ((i+1)/3));
		this.bardotlist[dotcounter].width(20);
		this.bardotlist[dotcounter].height(20);
		this.bardotlist[dotcounter].graphics.setcnvdim(22,22);
		this.bardotlist[dotcounter].graphics.beginFill(this.mycolors[i]);
		this.bardotlist[dotcounter].graphics.drawEllipse(0,0,10,10);
		this.bardotlist[dotcounter].graphics.endFill();
		
		var meanstr = mean+"";
		if(meanstr.indexOf('.')>-1){
			meanstr = meanstr.substring(0,meanstr.indexOf('.')+2);
		}
			this.bardotlist[dotcounter].myob.data('chob',this).data('val',("Mean: "+myuimanager.commaFormat(meanstr))).data('bar',this.bardotlist[dotcounter]).on('mousemove',function(evt){
				$(this).data('chob').showbarroll($(this).data('val'),evt.pageX,evt.pageY,$(this).data('bar'));
			});
			this.bardotlist[dotcounter].myob.on('mouseout',function(evt){
				$(this).data('chob').hidebarroll();
			});
		dotcounter++;
		
		this.bardotlist[dotcounter].setx(p_max-10);
		this.bardotlist[dotcounter].sety(this.myheight * ((i+1)/3));
		this.bardotlist[dotcounter].width(20);
		this.bardotlist[dotcounter].height(20);
		this.bardotlist[dotcounter].graphics.setcnvdim(22,22);
		this.bardotlist[dotcounter].graphics.beginFill(this.mycolors[i]);
		this.bardotlist[dotcounter].graphics.drawEllipse(0,0,10,10);
		this.bardotlist[dotcounter].graphics.endFill();
		
			var maxstr = max+"";
			if(maxstr.indexOf('.')>-1){
				maxstr = maxstr.substring(0,maxstr.indexOf('.')+2);
			}
			
			this.bardotlist[dotcounter].myob.data('chob',this).data('val',("Max: "+myuimanager.commaFormat(maxstr))).data('bar',this.bardotlist[dotcounter]).on('mousemove',function(evt){
				$(this).data('chob').showbarroll($(this).data('val'),evt.pageX,evt.pageY,$(this).data('bar'));
			});
			this.bardotlist[dotcounter].myob.on('mouseout',function(evt){
				$(this).data('chob').hidebarroll();
			});
		dotcounter++;
			
		
		
		
		
	}

	
}


function barchart(){


}

barchart.prototype.setob = function(ob){
	this.myob = ob;
	
	this.chartob = new MovieClip();
	this.myclip = new MovieClip();
	this.myclip.setob(this.myob);
	this.myclip.graphics.setcnvdim(20,20);
	this.legendclip = new MovieClip();
	this.myclip.addChild(this.chartob);
	this.myclip.addChild(this.legendclip);
	this.barroll = new MovieClip();
	
	this.chartob.addChild(this.barroll);
	this.barroll.setx(-1000);
	this.barroll.myob.css('padding-left','2px');
	
}

barchart.prototype.setbarroll = function(){
	this.barroll.graphics.setcnvdim(75,25);
	this.barroll.graphics.beginFill('#000');
	this.barroll.graphics.drawRect(0,0,75,50);
	this.barroll.graphics.endFill();
	this.barlabcl = new MovieClip();
	this.barlabcl.width(40);
	this.barroll.addChild(this.barlabcl);

	this.barlabcl.myob.addClass('broll');
	this.barroll.myob.css('z-index',1000);
}
barchart.prototype.showbarroll = function(t,x,y,b){
	this.barlabcl.html(t);
	this.barroll.setx(x-(this.chartob.myob.offset().left));
	this.barroll.sety((y-(this.chartob.myob.offset().top))+20);
}

barchart.prototype.hidebarroll = function(){
	this.barroll.setx(-1000);
}


barchart.prototype.setlegend = function(l){
	
	var lclstr ="";
	var i;
	var currx = 0;
	for(i=0; i<l.length; i++){
		var colcl = new MovieClip();
		this.legendclip.addChild(colcl);
		colcl.graphics.setcnvdim(10,10);
		colcl.graphics.beginFill(this.mycolors[i]);
		colcl.graphics.drawRect(0,0,10,10);
		colcl.graphics.endFill();
		colcl.setx(currx);
		colcl.sety(0);
		currx += 12;
		
		var labcl = new MovieClip();
		this.legendclip.addChild(labcl);
		labcl.html(l[i]);
		
		labcl.myob.addClass('legendcl');
		labcl.setx(currx);
		labcl.sety(-3);
		
		currx += (labcl.myob.textWidth()+10);
	}
	
}

barchart.prototype.setlegendRight = function(l){
	
	var lclstr ="";
	var i;
	var currx = 0;
	for(i=0; i<l.length; i++){
		var colcl = new MovieClip();
		this.legendclip.addChild(colcl);
		colcl.graphics.setcnvdim(10,10);
		colcl.graphics.beginFill(this.mycolors[i]);
		colcl.graphics.drawRect(0,0,10,10);
		colcl.graphics.endFill();
		colcl.setx(currx);
		colcl.sety(0);
		currx += 12;
		
		var labcl = new MovieClip();
		this.legendclip.addChild(labcl);
		labcl.html(l[i]);
		
		labcl.myob.addClass('legendcl');
		labcl.setx(currx);
		labcl.sety(-3);
		
		currx += (labcl.myob.textWidth()+10);
	}
	
}

barchart.prototype.setlegendRightThin = function(l){
	
	var lclstr ="";
	var i;
	var currx = 0;
	var curry = 0;
	for(i=0; i<l.length; i++){
		var colcl = new MovieClip();
		this.legendclip.addChild(colcl);
		colcl.graphics.setcnvdim(10,10);
		colcl.graphics.beginFill(this.mycolors[i]);
		colcl.graphics.drawRect(0,0,10,3);
		colcl.graphics.endFill();
		colcl.setx(currx);
		colcl.sety(curry);
		currx += 12;
		
		var labcl = new MovieClip();
		this.legendclip.addChild(labcl);
		labcl.html(l[i]);
		labcl.width(300);
		labcl.myob.addClass('legendcl');
		labcl.setx(currx);
		labcl.sety(curry-3);
		curry += 20;
		currx =0;
		
	}
	
}

barchart.prototype.setdata = function(d){
	
	this.mydata = d;
	
	
}

barchart.prototype.setwidth = function(w){
	
	this.mywidth = w;
	
}

barchart.prototype.setheight = function(h){
	
	this.myheight = h;
	
}
barchart.prototype.tintback = function(col){
	//this.chartob.myob.find('canvas').css('background-color',col);
	this.chartob.graphics.beginPath();
	this.chartob.graphics.beginFill(col);
	this.chartob.graphics.drawRect(0,-20,this.mywidth,this.myheight+20);
	this.chartob.graphics.endFill();
}
barchart.prototype.setchartcnv = function(){
	this.chartob.graphics.setcnvdim(this.mywidth+20,this.myheight+20);
}

barchart.prototype.setcolors = function(c){
	
	this.mycolors = c;
	
}

barchart.prototype.setmax = function(){
	
	var i;
	var m = -100000;
	for(i=0; i<this.mydata.length; i++){
		if(this.mydata[i]>m){m=this.mydata[i];}
	}
	var dec = 1.0;
	while(dec < 10000000.0){
		if(m <= dec){
			this.maxval = dec;
			break;
		}
		
		dec *= 10;
	}
	if(m < (this.maxval/2)){
		this.maxval /= 2;
	}
	
}

barchart.prototype.createxax = function(){
	
	this.xaxob = new MovieClip();
	this.xaxlist = new Array();
	this.myclip.addChild(this.xaxob);
	
	var i;
	for(i=0; i<this.mydata.length; i++){
		var xob = new MovieClip();
		xob.myob.addClass('xaxlab');
		this.xaxlist.push(xob);
		this.xaxob.addChild(xob);
		
	}
	
	
}


barchart.prototype.createyax = function(){
	
	this.yaxob = new MovieClip();
	this.yaxlist = new Array();
	this.myclip.addChild(this.yaxob);
	
	var i;
	for(i=0; i<15; i++){
		var yob = new MovieClip();
		yob.myob.addClass('yaxlab');
		this.yaxlist.push(yob);
		this.yaxob.addChild(yob);
		yob.setx(-1000)
	}
	
}

barchart.prototype.setxlabels = function(typ,xlablist){

	this.xlabs = new Array();
	
	if(typ == "age"){
		this.xlabs.push("<20");
		this.xlabs.push("20-40");
		this.xlabs.push("40-60");
		this.xlabs.push("60-80");
		this.xlabs.push(">80");
	}
	else if(typ== "income"){
		this.xlabs.push("< $20K");
		this.xlabs.push("$20K-$50K");
		this.xlabs.push("$50K-$100K");
		this.xlabs.push("$100-$150K");
		this.xlabs.push("$150K-$200K");
		this.xlabs.push("$200K-$250K");
		this.xlabs.push("> $250K");
	
	}
	else if(typ == "education"){
		this.xlabs.push("Some H.S.");
		this.xlabs.push("H.S. Grad");
		this.xlabs.push("Some College");
		this.xlabs.push("BA");
		this.xlabs.push("MA");
		this.xlabs.push("PhD");
		
	}
	else if(typ == "boolean"){
		this.xlabs.push("Yes");
		this.xlabs.push("No");
	}
	else{
		var i;
		for(i=0; i<xlablist.length; i++){
			this.xlabs.push(xlablist[i]);
		}
	}
	//["Some H.S.", "H.S. Grad", "Some College", "BA", "MA", "PhD"]
}

barchart.prototype.drawtopline = function(){
		this.chartob.graphics.beginPath();
		this.chartob.graphics.lineStyle(2,'#999');
		this.chartob.graphics.moveTo(0,0);
		this.chartob.graphics.lineTo(this.mywidth,0);
		this.chartob.graphics.stroke();
}
barchart.prototype.drawbaseline = function(){
		this.chartob.graphics.beginPath();
		this.chartob.graphics.lineStyle(2,'#999');
		this.chartob.graphics.moveTo(0,this.myheight+1);
		this.chartob.graphics.lineTo(this.mywidth,this.myheight+1);
		this.chartob.graphics.stroke();
}
barchart.prototype.buildyax = function(){
	
	var mstr = (this.maxval+"");
	var c1 = mstr.charAt(0);
	var numlabs, diff, diffpos;
	if(mstr == "1"){
		numlabs = 11;
		diff = 10;
		diffpos = this.myheight/10;
	}
	else if(mstr == "0.5"){
		numlabs = 6;
		diff = 10;
		diffpos = this.myheight/5;
	}
	else if(c1 == "5"){
		numlabs = 6;
		diff = this.maxval / 5;
		diffpos = this.myheight/5;
	}
	else if(c1 == "1"){
		numlabs = 11;
		diff = this.maxval / 10;
		diffpos = this.myheight/10;
	}
	else{
		numlabs = 6;
		diff = this.maxval / 5;
		diffpos = this.myheight/5;	
	}
	
	this.yaxob.setx(this.chartob.x-5);
	this.yaxob.sety(this.chartob.y-5);
	
	var curry = this.myheight;
	var currval = 0;
	var currvuse=currval;
	var i;
	for(i=0; i<numlabs; i++){
		this.yaxlist[i].setx(-100);
		this.yaxlist[i].sety(curry);
		
		this.chartob.graphics.beginPath();
		this.chartob.graphics.lineStyle(1,'#efefef');
		this.chartob.graphics.moveTo(0,curry);
		this.chartob.graphics.lineTo(this.mywidth,curry);
		this.chartob.graphics.stroke();
		
		
		this.yaxlist[i].myob.html(currvuse);
		
		currvuse += diff;
		curry -= diffpos;
		
	}
	
	
}

barchart.prototype.buildxax = function(){
	this.xaxob.setx(this.chartob.x);
	this.xaxob.sety(this.chartob.y + this.myheight);
	
	var i;
	var l = this.xlabs.length; 
	var labspace = this.mywidth/(l);
	var xoff = labspace/2;
	for(i=0; i<l; i++){
		var lb = this.xaxlist[i];
		lb.myob.html(this.xlabs[i]);
		lb.myob.css('text-align','left');
		
		lb.width(300);
		var tw = lb.myob.textWidth();
		
		lb.setx((xoff-(tw/2))+4);
		lb.sety(10);
		xoff += labspace;
		
		
		
	}
	if(l>7){
		$('.xaxlab').css('font-size','0.7em');
	}
	
}

barchart.prototype.setbars = function(){
	
	this.barlist = new Array();
	var i;
	for(i=0; i<this.mydata.length; i++){
		var barob = new MovieClip();
		this.barlist.push(barob);
		this.chartob.addChild(barob);
		barob.myob.on('mousemove',function(){})
	}
	
	
	
} 


barchart.prototype.drawchart = function(){

	var i;
	
	var barspace = this.mywidth / (this.mydata.length) 
	var currx = (barspace/2);
	var barwidth = Math.max(3,barspace /3);
	
	for(i=0; i<this.mydata.length; i++){
		var d = this.mydata[i];
		
		var fr = (d/this.maxval);
		var h = fr * this.myheight;
		var pos = this.myheight - (fr * this.myheight);
		
		this.barlist[i].setx(currx - (barwidth/2));
		this.barlist[i].sety(pos);
		this.barlist[i].width(barwidth);
		this.barlist[i].height(h);
	
		this.barlist[i].graphics.setcnvdim(barwidth,h);
		if(this.mydata.length > 4){
			this.barlist[i].graphics.beginFill(this.mycolors[0]);
		}
		else{
			this.barlist[i].graphics.beginFill(this.mycolors[i]);
		}
		this.barlist[i].graphics.drawRect(0,0,barwidth,h);
		this.barlist[i].graphics.endFill();
		
	
		
		var val = Math.round(d*100,2)+"%";
		var valcl = new MovieClip();
		valcl.myob.addClass('barchlab');
		if(barwidth>70){
		this.chartob.addChild(valcl);
		}
		valcl.html(val);
		valcl.setx(currx - (barwidth/2));
		valcl.width(barwidth);
		if(h>40){
			valcl.sety(pos+5);
		}
		else{
			valcl.sety(pos-20);
		}
		
		this.barlist[i].myob.data('chob',this).data('val',val).data('bar',this.barlist[i]).on('mousemove',function(evt){
			$(this).data('chob').showbarroll($(this).data('val'),evt.pageX,evt.pageY,$(this).data('bar'));
		});
		this.barlist[i].myob.on('mouseout',function(evt){
			$(this).data('chob').hidebarroll();
		});	
		
		currx += barspace;	
	}

	
}


function clusterchart(){
	
	
	
	
	
}

clusterchart.prototype = Object.create(barchart.prototype);
clusterchart.prototype.contructor = barchart;


clusterchart.prototype.setbars = function(){
	
	this.barlist = new Array();
	var i,ii;
	for(i=0; i<this.mydata.length; i++){
		for(ii=0; ii<this.mydata[i].length;ii++){
		var barob = new MovieClip();
		this.barlist.push(barob);
		this.chartob.addChild(barob);
		}
	}
	
	
	
	
}

clusterchart.prototype.setmax = function(){
	
	var i,ii;
	var m = -100000;
	for(i=0; i<this.mydata.length; i++){
		
		var currd = this.mydata[i];
		var tst = 0;
		for(ii=0; ii<currd.length; ii++){
			tst = currd[ii];
			if(tst>m){m=tst;}
			
		}
	
		
	}
	var dec = 1.0;
	while(dec < 10000000.0){
		if(m <= dec){
			this.maxval = dec;
			break;
		}
		dec *= 10;
		
	}
	var testdec = dec;
	var inc = testdec/10;
	while(m < testdec){
		
		testdec -= inc;
	}
	testdec += inc;
	this.maxval = testdec;
}


clusterchart.prototype.drawchart = function(){
	var barsperset = this.mydata[0].length;
	
	var i;
	
	var barspace = this.mywidth / (this.mydata.length);//space occupied by each cluster
	var offx = (barspace/2)+8;//offset x
	var barwidth = Math.max(3,((barspace /3)/barsperset));
	
	var totwidth = barwidth*barsperset;
	var totwidthHlf = totwidth/2;
	
	var currx = offx-(totwidthHlf);
	
	
	var ii;
	var bcnt = 0;
	for(i=0; i<this.mydata.length; i++){
		
		for(ii=0; ii<this.mydata[i].length;ii++){
		var d = this.mydata[i][ii];	
		var currd = d[ii];
		var fr = (d/this.maxval);
		var h = Math.max(1,Math.round(fr * this.myheight));
		var pos = this.myheight - h;
		
		this.barlist[bcnt].setx(currx - (barwidth/2));
		this.barlist[bcnt].sety(pos);
		this.barlist[bcnt].width(barwidth);
		this.barlist[bcnt].height(h);
		this.barlist[bcnt].graphics.setcnvdim(barwidth,h);
		this.barlist[bcnt].graphics.beginFill(this.mycolors[ii]);
		this.barlist[bcnt].graphics.drawRect(0,0,barwidth,h);
		this.barlist[bcnt].graphics.endFill();
		
		var val = Math.round(d,2);
		
		this.barlist[bcnt].myob.data('chob',this).data('val',val).data('bar',this.barlist[bcnt]).on('mousemove',function(evt){
			$(this).data('chob').showbarroll(myuimanager.commaFormat($(this).data('val')),evt.pageX,evt.pageY,$(this).data('bar'));
		});
		this.barlist[bcnt].myob.on('mouseout',function(evt){
			$(this).data('chob').hidebarroll();
		});
			
			
		bcnt++;
		currx += barwidth;
		
		}
		currx = (offx + ((i+1)*barspace))-(totwidthHlf);
	}
}
	


function stackchart(){

	
	
	
}

stackchart.prototype = Object.create(barchart.prototype);
stackchart.prototype.contructor = barchart;

stackchart.prototype.setbars = function(){
	
	this.barlist = new Array();
	var i,ii;
	for(i=0; i<this.mydata.length; i++){
		for(ii=0; ii<this.mydata[i].length;ii++){
		var barob = new MovieClip();
		this.barlist.push(barob);
		this.chartob.addChild(barob);
		}
	}
	
	
	
	
}



stackchart.prototype.drawchart = function(){
	var barsperset = this.mydata[0].length;
	
	var i;
	
	var barspace = this.mywidth / (this.mydata.length) 
	var offx = (barspace/2);
	var barwidth = Math.max(3,barspace /3);
	
	var totwidth = barwidth*barsperset;
	var totwidthHlf = totwidth/2;
	
	var currx = offx;
	
	var currposlist = new Array();
	
	for(i=0; i<this.mydata.length; i++){
		currposlist.push(0);
	}
		
	var ii;
	var bcnt = 0;
	for(i=0; i<this.mydata[0].length; i++){
		
		
		for(ii=0; ii<this.mydata.length;ii++){
			var d = this.mydata[ii][i];	
			var currd = d[ii];
			var fr = (d/this.maxval);
			var h = Math.max(1,Math.round(fr * this.myheight));
			var pos = this.myheight - h;
		//pos -= (currposlist[ii]);
		this.barlist[bcnt].setx(currx - (barwidth/2));
		this.barlist[bcnt].sety(pos -(currposlist[ii]));
		this.barlist[bcnt].width(barwidth);
		this.barlist[bcnt].height(h);
		this.barlist[bcnt].graphics.setcnvdim(barwidth,h);
		this.barlist[bcnt].graphics.beginFill(this.mycolors[i]);
		this.barlist[bcnt].graphics.drawRect(0,0,barwidth,h);
		this.barlist[bcnt].graphics.endFill();
		var cplstval = currposlist[ii];
		cplstval += h;
		currposlist[ii]=cplstval;
		
			var val = Math.round(d*100,2)+"%";

			this.barlist[bcnt].myob.data('chob',this).data('val',val).data('bar',this.barlist[bcnt]).on('mousemove',function(evt){
				$(this).data('chob').showbarroll($(this).data('val'),evt.pageX,evt.pageY,$(this).data('bar'));
			});
			this.barlist[bcnt].myob.on('mouseout',function(evt){
				$(this).data('chob').hidebarroll();
			});
		
		
		
		bcnt++;
		currx += barspace;
		
		}
		currx = (offx);
	}
}


stackchart.prototype.setmax = function(){
	
	var i,ii;
	var m = -100000;
	for(i=0; i<this.mydata.length; i++){
		
		var currd = this.mydata[i];
		var tst = 0;
		for(ii=0; ii<currd.length; ii++){
			tst += currd[ii];
			
		}
		if(tst>m){m=tst;}
		
	}
	var dec = 1.0;
	while(dec < 10000000.0){
		if(m <= dec){
			this.maxval = dec;
			break;
		}
		dec *= 10;
		
	}
	if(m < (this.maxval/2)){
		this.maxval /= 2;
	}
	
}




function linechart(){
	
	
	
	
	
}

linechart.prototype = Object.create(barchart.prototype);
linechart.prototype.contructor = barchart;

linechart.prototype.createxax = function(){
	
	this.xaxob = new MovieClip();
	this.xaxlist = new Array();
	this.myclip.addChild(this.xaxob);
	
	var i;
	var ln = this.xlabs.length;
	for(i=0; i<=ln; i++){
		var xob = new MovieClip();
		xob.myob.addClass('xaxlab');
		this.xaxlist.push(xob);
		this.xaxob.addChild(xob);
		
	}
	
	
}
linechart.prototype.setxstep = function(fl){
	this.isxstep = fl;
}
linechart.prototype.buildxax = function(){
	this.xaxob.setx(this.chartob.x);
	this.xaxob.sety(this.chartob.y + this.myheight);
	
	var i;
	var xtest;
	var l = this.xlabs.length; 
	
	if(l > 20 && l<40){
		xtest = 2;
	}
	else if(l>=40){
		xtest = 4;
	}
	else{
		xtest = 1;
	}
	
	var labspace = this.mywidth/(l);
	var xoff = labspace/2;
	for(i=0; i<l; i++){
		var lb = this.xaxlist[i];
		if((l > 20) && (i%xtest==1)){
			lb.myob.html(this.xlabs[i]);
		
		}
		else{
			lb.myob.html("&nbsp;");
		}
		lb.myob.css('text-align','left');
		
		lb.width(300);
		var tw = lb.myob.textWidth();
		
		lb.setx((xoff-(tw/2))+4);
		lb.sety(10);
		xoff += labspace;
		
		
		
	}
	
}

linechart.prototype.buildyax = function(){
	
	var numlabs = (this.maxval/this.ydiv)+1;
	var diff = this.ydiv;
	var diffpos = (this.myheight)/(this.maxval/this.ydiv);
	
	
	var mstr = (this.maxval+"");

	this.yaxob.setx(this.chartob.x-5);
	this.yaxob.sety(this.chartob.y-5);
	
	var curry = this.myheight;
	var currval = 0;
	var currvuse=currval;
	var i;
	for(i=0; i<numlabs; i++){
		this.yaxlist[i].setx(-100);
		this.yaxlist[i].sety(curry);
		
		this.chartob.graphics.beginPath();
		this.chartob.graphics.lineStyle(1,'#efefef');
		this.chartob.graphics.moveTo(0,curry);
		this.chartob.graphics.lineTo(this.mywidth,curry);
		this.chartob.graphics.stroke();
		if(this.maxval == 100){
			this.yaxlist[i].myob.html((currvuse)+"%");	
			
		}
		else{
			this.yaxlist[i].myob.html(currvuse.toFixed(3));
		}
		
		
		currvuse += diff;
		curry -= diffpos;
		
	}
	
	
}


linechart.prototype.setmax = function(m){
	this.maxval = m;
} 
linechart.prototype.setydiv = function(d){
	this.ydiv = d;
}


linechart.prototype.getrealmax = function(){
	var m = -1000.0;
	for(i=0; i<this.mydata.length; i++){
		var d = this.mydata[i];
		for(ii=0; ii<d.length;ii++){
			
			var currd = d[ii];
			var currdx = currd[0];
			var currdy = currd[1];
			if(currdy > m){
				m= currdy;
			}
		}
	}
	return m;	
}

linechart.prototype.drawchart = function(){
	var barsperset = this.mydata.length;
	
	var i;
	

	var offx = 10;
	var currx = offx;
	var usewidth = this.mywidth - (offx*2);
	var div = usewidth/(this.mydata[0].length-1);
	var ii;
	var realm = this.getrealmax();
//	this.chartob.graphics.setcnvdim(this.mywidth,this.myheight);
	for(i=0; i<this.mydata.length; i++){
		var d = this.mydata[i];
		this.chartob.graphics.beginPath();
		this.chartob.graphics.lineStyle(2,this.mycolors[i]);
		for(ii=0; ii<d.length;ii++){
			
			var currd = d[ii];
			var currdx = currd[0];
			var currdy = currd[1];
			if(this.isxstep==true){
				currx = Math.round(offx+(ii*div));
			}
			else{
				var frx = currdx;
				var w = frx * usewidth;
				currx = offx + w;
			}
			var fr;
			if(this.maxval == 100){
			 	fr = currdy;
			}
			else{
				fr = currdy / this.maxval;
			}
		
			var h = fr * this.myheight;
			var pos = this.myheight - (fr * this.myheight);
			
			if(ii==0){
				this.chartob.graphics.moveTo(currx,pos);
			}
			else{
				this.chartob.graphics.lineTo(currx,pos);
			}
			
			var dotcl = new MovieClip();
			dotcl.graphics.setcnvdim(9,9);
			this.chartob.addChild(dotcl);
			dotcl.graphics.beginPath();
			dotcl.graphics.beginFill(this.mycolors[i]);
			
			//dotcl.graphics.lineStyle(2,this.mycolors[i]);
			dotcl.graphics.drawEllipse(1,1,2,2);
				dotcl.graphics.endFill();
			//dotcl.graphics.stroke();
		
			dotcl.setx(currx-2);
			dotcl.sety(pos-2);
			
			var valstr;
			if(realm <= 1.0){
				var m = currdy*100.0;
				var mstr = m+"";
				var mstrsub;
				if(mstr.indexOf(".")>-1){
					mstrsub = mstr.substring(0,mstr.indexOf(".")+2);
				}
				else{
					mstrsub = mstr;
				}
				valstr = mstrsub;
			}
			else{
				var m = currdy;
				var mstr = m+"";
				var mstrsub;
				if(mstr.indexOf(".")>-1){
					mstrsub = mstr.substring(0,mstr.indexOf(".")+2);
				}
				else{
					mstrsub = mstr;
				}
				valstr = mstrsub;
			}
			
			dotcl.myob.data('chob',this).data('val',valstr).data('bar',dotcl).on('mousemove',function(evt){
				$(this).data('chob').showbarroll($(this).data('val'),evt.pageX,evt.pageY,$(this).data('bar'));
			});
			dotcl.myob.on('mouseout',function(evt){
				$(this).data('chob').hidebarroll();
			});
		
		
		}
		this.chartob.graphics.stroke();
		
		
		
		currx = (offx);
	}
}



function intpiering(p){
	this.par = p;
	

	this.numwedges = 20;
	this.outerplist = new Array();
	this.innerplist = new Array();
	this.labplist = new Array();
	this.innerRadius = 0;
	this.outerRadius = 0;
	this.pieclip = new MovieClip();
	this.pieclip.setx(0);
	this.pieclip.sety(0);
	
	this.dottedlineclip = new MovieClip();
	this.datalist = new Array();
	this.qob = null;
	this.seg = null;
	this.collist = null;
	this.numcols = 20;
}
intpiering.prototype.setCenter = function(x,y){
	this.centerx = x;
	this.centery = y;
}
intpiering.prototype.getFadedCol = function(col){
	var pct = 0.85;
//	var backcol = $('#maingraphics').css('background');
	var backcol = '#efefef';
	var rhex_b = backcol.substr(1,2);
	var ghex_b = backcol.substr(3,2);
	var bhex_b = backcol.substr(5,2);
	
	var rhex = col.substr(1,2);
	var ghex = col.substr(3,2);
	var bhex = col.substr(5,2);
	
	
	var rhex_b_int = parseInt('0x'+rhex_b);
	var ghex_b_int = parseInt('0x'+ghex_b);
	var bhex_b_int = parseInt('0x'+bhex_b);
	
	var rhex_int = parseInt('0x'+rhex);
	var ghex_int = parseInt('0x'+ghex);
	var bhex_int = parseInt('0x'+bhex);
	
	
	var rd = rhex_b_int - rhex_int;
	var gd = ghex_b_int - ghex_int;
	var bd = bhex_b_int - bhex_int;
	
	var newr = rhex_int + Math.round(pct * rd);
	var newg = ghex_int + Math.round(pct * gd);
	var newb = bhex_int + Math.round(pct * bd);
	
	var hxcol = "#"+ (newr.toString(16).length<2?"0"+newr.toString(16):newr.toString(16)) +  (newg.toString(16).length<2?"0"+newg.toString(16):newg.toString(16))  +  (newb.toString(16).length<2?"0"+newb.toString(16):newb.toString(16));
	
	
	return hxcol;
}
intpiering.prototype.getRealDataLength = function(dl){
	var i;
	var cnt = 0;
	for(i=0; i<dl.length; i++){
		if(dl[i]>0){
			cnt++;
		}
	}
	return cnt;
}
intpiering.prototype.setcolors = function(c){
	this.collist = c;
}
intpiering.prototype.calcSubColors = function(parcol){
	if(parcol==null){
		if(!(this.datalist.length==2)){
			this.collist = this.par.collist;
		}
		else{
			this.collist = new Array();
			this.collist = [this.par.collist[0],this.par.collist[5]];
		}
	}
	else{
		var rhex = parcol.substr(1,2);
		var ghex = parcol.substr(3,2);
		var bhex = parcol.substr(5,2);
		
		var rhexint = parseInt('0x'+rhex);
		var ghexint = parseInt('0x'+ghex);
		var bhexint = parseInt('0x'+bhex);
		
		
		var dcnt = this.getRealDataLength(this.datalist);
		var coldiff = 18;
		var dcnthlf = dcnt/2;
		
		var rstart = Math.max(0,rhexint - (dcnthlf*coldiff));
		var gstart = Math.max(0,ghexint - (dcnthlf*coldiff));
		var bstart = Math.max(0,bhexint - (dcnthlf*coldiff));
		
		var i;
		this.collist = new Array();
		for(i=0; i<this.datalist.length; i++){
				
			var hxcol = "#"+ (rstart.toString(16).length<2?"0"+rstart.toString(16):rstart.toString(16)) +  (gstart.toString(16).length<2?"0"+gstart.toString(16):gstart.toString(16))  +  (bstart.toString(16).length<2?"0"+bstart.toString(16):bstart.toString(16));
			this.collist.push(hxcol);
			
			if(this.datalist[i]>0){
			rstart += coldiff;
			if(rstart > 255){rstart = 255;}
			
			gstart += coldiff;
			if(gstart > 255){gstart = 255;}
			
			bstart += coldiff;
			if(bstart > 255){bstart = 255;}
			}
			
		}
		
	}
}

intpiering.prototype.setRingPoints = function(i,o){
	this.innerRadius = i;
	this.outerRadius = o;
	
	this.innerplist = this.getPointList(this.innerRadius);
	this.outerplist = this.getPointList(this.outerRadius);
	this.labplist =  this.getPointList(this.innerRadius+Math.round((this.outerRadius-this.innerRadius)/2));
	this.contoursNumeric = new Array();
	this.contourRects = new Array();
	this.labpoints = new Array();
	this.datalabelist = new Array();
	this.whichactivated = -1;
	var i;
	var startindex = 0;
	
	for(i=0; i<this.datalist.length; i++){
		
		var currd = this.datalist[i];
		
		var diff = Math.max(1,Math.round((currd/100.0)*360));
		
		endindex = startindex + diff;
		if(endindex > 360){endindex = 360;}
		if(i==this.datalist.length-1){
			endindex = 360;
		}
		var currcont = new Array();
		
		var ii;
		var minx = 10000000.0;
		var maxx = -10000;
		
		var miny = 10000000.0;
		var maxy = -10000;
		
		
		for(ii=startindex; ii<=endindex; ii++){
			currcont.push(this.outerplist[ii]);
			if(this.outerplist[ii][0]<minx){minx = this.outerplist[ii][0]};
			if(this.outerplist[ii][0]>maxx){maxx = this.outerplist[ii][0]};
			
			if(this.outerplist[ii][1]<miny){miny = this.outerplist[ii][1]};
			if(this.outerplist[ii][1]>maxy){maxy = this.outerplist[ii][1]};
			
			
			
		}
		for(ii=endindex; ii>=startindex; ii--){
			currcont.push(this.innerplist[ii]);
			
			if(this.innerplist[ii][0]<minx){minx = this.innerplist[ii][0]};
			if(this.innerplist[ii][0]>maxx){maxx = this.innerplist[ii][0]};
			
			if(this.innerplist[ii][1]<miny){miny = this.innerplist[ii][1]};
			if(this.innerplist[ii][1]>maxy){maxy = this.innerplist[ii][1]};
			
		}
		currcont.push(this.outerplist[startindex]);
		
		this.contoursNumeric.push(currcont);
		
		var currlabpointIndex = startindex+Math.round((endindex-startindex)/2);
		var currlabpoint = new Array();
		currlabpoint = [this.innerplist[currlabpointIndex][0], this.innerplist[currlabpointIndex][1]];
		this.labpoints.push(currlabpoint);
		
		startindex = endindex;
		if(startindex > 360){startindex = 360;}


		var currRect = new Array();
		currRect = [minx,miny, (maxx-minx),(maxy-miny)];
		
		this.contourRects.push(currRect);
		if(i==0){
			//console.log("recttest: "+currRect[0]+" "+currRect[1]+" "+currRect[2]+" "+currRect[3]);
		}
		
		 
		
	
	
	}
}


intpiering.prototype.setData = function(d,q,s){
	this.datalist = d;
	this.qob = q;
}
	intpiering.prototype.addLabelToElement=function(el){
		var dlabclip = new MovieClip();
		dlabclip.graphics.setcnvdim(50,50);

		var datalab = new TextField();
		datalab.selectable = false;
datalab.setTextClass("datalabelFormat");
//			datalab.antiAliasType = AntiAliasType.ADVANCED;
		//datalab.embedFonts= true;
		datalab.height(30);
		dlabclip.show();
		//alpha(dlabclip,1.0);

		dlabclip.append(datalab);
		
		el.append(dlabclip);
		
		this.datalabelList.push(dlabclip);
	}

intpiering.prototype.reinitWedges=function(){
	var dcount = this.datalist.length;
	for (i = 0; i < (dcount); i++)
	{
		var currwedge = this.wedgelist[i];
		currwedge.width(this.par.pwidth);0
		currwedge.height(this.par.pheight);
		currwedge.graphics.setcnvdim(this.par.pwidth,this.par.pheight);
	}
	
}
		
intpiering.prototype.initWedges=function(){

		var i;
		this.datalabelList = new Array();
		this.wedgelist = new Array();

		var dcount = this.numwedges;

		this.dottedlinelist = [];
		this.dottedlineclip.remChildren();
		
		this.pieclip.remChildren();
	
		for (i = 0; i < (dcount); i++)
		{
			var currwedge=new MovieClip();
			
			//	this.addEventListener = function(ev,ob,func,args){
			//currwedge.addEventListener()
			currwedge.idnum = i;
		//	this.addLabelToElement(currwedge);
			this.wedgelist.push(currwedge);
			this.pieclip.append(currwedge);
			currwedge.setx(0);
			currwedge.sety(0);
			currwedge.width(this.par.pwidth);
			currwedge.height(this.par.pheight);
			currwedge.graphics.setcnvdim(this.par.pwidth,this.par.pheight);
			
			var currline=new MovieClip();
			currline.setx(0);
			currline.sety(0);
			this.dottedlinelist.push(currline);
			this.dottedlineclip.append(currline);

		}
	}
	
	
	
	intpiering.prototype.getPointList=function(r){
		var centerx = this.centerx;
		var centery = this.centery;
		var pointlist = new Array();

		for (var i = 0; i <= 360; i++)
		{
			var pntx;
			var pnty;
			var angtouse,rang,ydist,xdist,pntx,pnty;
			if ((i < 90))
			{
				angtouse = 90 - i;

				rang = this.convtoRad(angtouse);

				ydist = Math.sin(rang) * r;
				xdist = Math.cos(rang) * r;

				pntx = centerx + xdist;
				pnty = centery - ydist;
			}
			else if ((i < 180))
			{//translate px becomes +y, py becomes x
				angtouse = 90 - (i - 90);

				rang = this.convtoRad(angtouse);

				ydist = Math.sin(rang) * r;
				xdist = Math.cos(rang) * r;

				pntx = centerx + ydist;
				pnty = centery + xdist;

			}
			else if ((i < 270))
			{
				angtouse = 90 - (i - 180);

				rang = this.convtoRad(angtouse);

				ydist = Math.sin(rang) * r;
				xdist = Math.cos(rang) * r;

				pntx = centerx - xdist;
				pnty = centery + ydist;
			}
			else
			{
				angtouse = 90 - (i - 270);
				rang = this.convtoRad(angtouse);

				ydist = Math.sin(rang) * r;
				xdist = Math.cos(rang) * r;

				pntx = centerx - ydist;
				pnty = centery - xdist;
			}
			var newpoint = new Array();
			newpoint = [pntx,pnty];
			pointlist.push(newpoint);
		}
		var last = 0;
		return pointlist;

	}
	
	
	
	
intpiering.prototype.hitTest = function(testx, testy,ind){
	
	var inRect = false;

	
	
	var i,c, verty, vertx;

	var rx1, ry1,rx2,ry2;
	var reccnt = this.contourRects.length;
	for(i=0; i<reccnt; i++){
		var currrect = this.contourRects[i];
		
			 rx1 = currrect[0];
			
			 ry1 = currrect[1];
			 rx2 = rx1+currrect[2];
			 ry2 = ry1+currrect[3];
			
			if((testx >= rx1) && (testy>= ry1) && (testx <= rx2) && (testy <= ry2)){
				inRect = true;
				break;
			}
			
		
	}
	if(inRect == false){
		return {ishit:inRect,hitnum:-1};
	}
	else{
		//console.log("in rect"+i+" rx1:"+rx1+" ry1:"+ry1+" rx2:"+rx2+" ry2:"+ry2);
	}
	
	
	var found = false;
	var ii;
	var rec;
	var contindFound = -1;
	for(rec=0; rec<this.contoursNumeric.length; rec++){
	var currcont = this.contoursNumeric[rec];
		
		
	c=0;
	d = currcont.length-1;
		
	var totcount = currcont.length;	
		
	while(c<totcount){
		vertx_d = currcont[d][0];
		verty_d = currcont[d][1];
		d++;
		if(d==currcont.length){
			d = 0;
		}
			
		vertx_c = currcont[c][0];
		verty_c = currcont[c][1];
		c++;
		
	//	console.log("testing x on "+i+": testx:"+testx+" eval:"+( (vertx_d - vertx_c) * (testy - verty_c)/(verty_d-verty_c) + vertx_c )+" ");
			//if( ((verty_c > testy) != (verty_d > testy)) && ((vertx_c > testx) != (vertx_d > testx))){
		if( ((verty_c > testy) != (verty_d > testy)) && (testx < (vertx_d - vertx_c) * (testy - verty_c)/(verty_d-verty_c) + vertx_c)){
			
			if(found == false){
				contindFound = rec;
			//	console.log("crossed border of "+ind+" at contind:"+c+", false to true    |    testx:"+testx+" vertx_c:"+vertx_c+" vertx_d:"+vertx_d+"   testy:"+testy+" verty_c:"+verty_c+" verty_d:"+verty_d);
				found = true;
				
				//console.log("found");
				
			}
			else{
				//console.log("not found");
					found = false;
					//console.log("crossed border of "+ind+" at contind:"+c+", true to false   |    testx:"+testx+" vertx_c:"+vertx_c+" vertx_d:"+vertx_d+"   testy:"+testy+" verty_c:"+verty_c+" verty_d:"+verty_d);
			}
		}	
	}
	if(found==true){
		//console.log("break");
		break;
	}
	
	}
	if(found == true){
	//	console.log("found: "+contindFound);
		return {ishit:found,hitnum:contindFound};
	}
	//console.log("not found");
	return {ishit:found,hitnum:-1};
}


intpiering.prototype.drawWedge=function(contourIndex,col,cl){

		var clist = this.contoursNumeric[contourIndex];
		
		cl.graphics.beginPath();
	//	cl.graphics.moveTo(this.centerx,this.centery);
		cl.graphics.beginFill(col);
		var i;
		for(i=0; i<clist.length; i++){
			var p = clist[i];
			if(i==0){
				cl.graphics.moveTo(p[0],p[1]);
			}
			else{
				cl.graphics.lineTo(p[0],p[1]);
			}
		}
		cl.graphics.endFill();
		
		var labpnt = this.labpoints[contourIndex];
		var pct = this.datalist[contourIndex];
		var txt;
		if(pct > 0){
			//var qch = this.qob.qchoicelist[contourIndex];
		//	if(qch.length > 10){
	//			txt = "<span class='plabdescrsm'>"+this.qob.qchoicelist[contourIndex]+"</span></br><span class='plabval'>"+pct+"%</span>";
		//	}
			//else{
		//		txt = "<span class='plabdescr'>"+this.qob.qchoicelist[contourIndex]+"</span></br><span class='plabval'>"+pct+"%</span>";
		//	}
				txt = "<span class='plabval'>"+pct+"%</span>";
		}
		else{
			txt = "";
		}

		//cl.myob.find('.datalabelFormat').html(txt).css('left',-20).css('top',-30);
		//this.datalabelList[contourIndex].setx(labpnt[0]);
		//this.datalabelList[contourIndex].sety(labpnt[1]);
		/*
		if(!(this.seg.chosen == null)){
			if(this.seg.chosen == contourIndex){
				cl.myob.css('opacity',1.0);
			}
			else{
				cl.myob.css('opacity',0.1);
			}
		}
		*/
		
		

}
intpiering.prototype.setCenterLab = function(l){
	this.clab = l;
	this.clabcl = new MovieClip();
	this.pieclip.addChild(this.clabcl);
	this.clabcl.width(400);
	this.clabcl.myob.addClass('pieclab');
	this.clabcl.html(l);
	
}
intpiering.prototype.setCenterVal = function(v){
	this.cval = v;
	this.cvalcl = new MovieClip();
	this.pieclip.addChild(this.cvalcl);
	this.cvalcl.width(50);
	this.cvalcl.myob.addClass('piecval');
	this.cvalcl.html(v);
	
}
intpiering.prototype.drawCenterLab = function(){
	var ringp = this.labplist[0];
	this.pieclip.graphics.beginPath();
	this.pieclip.graphics.lineStyle(1,'#ddd');
	this.pieclip.graphics.moveTo(ringp[0],ringp[1]);
	this.pieclip.graphics.lineTo(this.centerx,this.centery);
	this.pieclip.graphics.stroke();
	this.pieclip.graphics.beginPath();
	this.pieclip.graphics.beginFill('#999');
	this.pieclip.graphics.drawEllipse(this.centerx-4,this.centery-2,4,4);
	this.clabcl.setx(this.centerx - (this.clabcl.myob.width()/2));
	this.clabcl.sety(this.centery + 10);
	this.cvalcl.setx(this.centerx - (this.cvalcl.myob.width()/2));
	this.cvalcl.sety(this.centery + 30);
	
}

intpiering.prototype.convtoRad=function(ang){
	var t1 = Math.PI;
	var t2 = Math.PI;
	return ang / 180 * Math.PI;
}

intpiering.prototype.clearWedge=function(cl){
	cl.graphics.clear();
}

intpiering.prototype.fadeWedges = function(holdwedge){
	
	/*
	console.log("holdwedge: "+holdwedge);
	var i;
	for(i=0; i<this.wedgelist.length; i++){
		if(!(i==holdwedge)){
			//alert("test");
			this.wedgelist[i].myob.css('opacity',0.5);
			//this.wedgelist[i].myob.css('opacity',0.5);
		}
		else{
			this.wedgelist[i].myob.css('opacity',1.0);
			//this.wedgelist[i].myob.fadeTo('opacity',1.0);
		}
	}
	*/
	
	
}
/*
intpiering.prototype.fadeBackNonChosen =function(ch){
	
	var i;
	this.seg.fadeflags = new Array();
	for(i=0; i<this.datalist.length; i++){
		if(i==ch){
			this.seg.fadeflags.push(1);
		}
		else{
			this.seg.fadeflags.push(0);
		}
	}
	
	/*
	var i;
	for(i=0; i<this.wedgelist.length; i++){
		if(!(i==ch)){
			//alert("test");
			this.wedgelist[i].myob.css('opacity',0.1);
			//this.wedgelist[i].myob.css('opacity',0.5);
		}
		else{
			this.wedgelist[i].myob.css('opacity',1.0);
			//this.wedgelist[i].myob.fadeTo('opacity',1.0);
		}
	}
	
	myui.resetPieRings();
}
*/
intpiering.prototype.fadeInWedges = function(holdwedge){
	/*
	var i;
	for(i=0; i<this.wedgelist.length; i++){
		if(!(i==holdwedge)){
			this.wedgelist[i].myob.css('opacity',1.0);
		}
	}
	*/
	
	
}
intpiering.prototype.drawChart = function(){
	var i;

	for(i=0; i<this.contoursNumeric.length; i++){
	//	if(i==1){
		var coltouse;
		
		this.drawWedge(i,this.collist[i],this.pieclip);
	
	}
}
intpiering.prototype.clearChart = function(){
	var i;
	this.pieclip.graphics.clear();

}




