var myuimanager = new uimanager();
function uimanager(){
	
	
	this.modloadstate = "init";
	
}


uimanager.prototype.generateFakePcts = function(cnt){
	var startpct = 0.4;
	var lst = new Array();
	var currpct   = Math.random() * startpct;
	var i;
	for(i=0; i<cnt; i++){
		lst.push(currpct);
		var rem = 1.0-currpct;
		if(i<(cnt-1)){
			currpct = Math.random()*rem;
		}
		else{
			currpct = rem;
		}
	}
	return lst;
	
	
}
uimanager.prototype.init = function(){
	var dateTest = this.createdateString();
	var formdate = this.formatDateString(dateTest);
	$( window ).resize(function() {
	  myuimanager.updatewindow();
	});
	
	this.myprogdisplay = new programdisplay();
	this.mycampdisplay = new campaigndisplay(this);
	this.maincont = $('#maincontent');
	this.myprogdisplay.updateprogmenu();
	this.mycampdisplay.initcampmenu();
	this.mydsetdisplay = this.mycampdisplay.mydsetdisplay;
	this.mydsetdisplay.init();
	this.modloadstate = "init";
	this.mymodeldisplay = this.mycampdisplay.mymodeldisplay;
	this.mymodeldisplay.init();
	
	this.initDialogs();
	this.mycampdisplay.switchSection("datasets");
	
	this.updatewindow();
	
	
	this.showmaincontent();
	
	$('#initloadDialog').modal('hide');
	//temp move init prof to here:
	//setTimeout(function(){ myuimanager.delayedStart(); }, 2000);
}
uimanager.prototype.initDialogs = function(){
	this.initcommonDialogs();
	this.myprogdisplay.initdialog();
	this.mycampdisplay.initdialog();
	
}
uimanager.prototype.setModelCallback = function(){
	if(this.modloadstate == "init"){
		this.init();
		this.modloadstate = "loaded";	
	}
	else{
		this.mymodeldisplay.resetDisplay();
	}
}
uimanager.prototype.setDeleteCallback = function(delfunc){
	if(delfunc == "model"){
		mydatamanager.deletecurrModel();
	}
	else if(delfunc == "dataset"){
		mydatamanager.deletecurrDataset();
	}
}
uimanager.prototype.initcommonDialogs = function(){
	$('#confirmDialog .editdiagfooterbtns button').eq(0).click(function(evt){
		myuimanager.setDeleteCallback(mydatamanager.delfunc);
		$('#confirmDialog').modal('hide');
		
	});
	$('#confirmDialog .editdiagfooterbtns button').eq(1).click(function(evt){
		$('#confirmDialog').modal('hide');
	});
}
uimanager.prototype.delayedStart = function(){
	
}
uimanager.prototype.updatewindow = function(){
	var toff = ($('#titlecontent').offset().left);
	this.updateHeadline(toff);
	this.updatewidths();
	
}
uimanager.prototype.updateHeadline=function(toffset){
	var hoff = 45 + ((toffset/300.0)*5);
	var useoff = toffset - 396;
	$('#head1').css('left',useoff);
	useoff += hoff;
	$('#head2').css('left',useoff);
	useoff += hoff;
	$('#head3').css('left',useoff);
	
}

uimanager.prototype.updatewidths = function(){
	this.mycampdisplay.updatewidth_ccamp_cntarea();
	this.mydsetdisplay.updatewidth_tstTables();
	
	
	
	
		
}
uimanager.prototype.showmaincontent = function(){
	this.maincont.fadeTo(1,0.0,function(){$(this).css('visibility','visible').fadeTo(200,1.0);});
}

uimanager.prototype.updateprogramlisting = function(idn){
	mydatamanager.currprog = idn;
	this.mycampdisplay.initcampaignlisting();
	
}

uimanager.prototype.switchcampaign=function(ind){
	var prog = mydatamanager.getcurrprogram();
	prog.currcamp = ind;
	this.mycampdisplay.initcampaignlisting();
}

uimanager.prototype.setddownaction = function(dob){
	dob.find('li').each(function(ind){
		$(this).click(function(evt){
			var v = $(this).find('a').html();
			$(this).parent().parent().find('button').html(v);
			if(!($(this).data('extr')==undefined || $(this).data('extr')==null)){
				myuimanager.doextraddownAction($(this).data('extr'));
			}
		});
	});
}
uimanager.prototype.doextraddownAction = function(ex){
	if(ex == "updateminsize"){
		this.mymodeldisplay.updateMinSize();
	}
	
}

uimanager.prototype.setddownactionExtra = function(dob,ex){
	dob.find('li').each(function(ind){
		$(this).data('extr',ex);
	});
	
}

uimanager.prototype.getddval = function(dob){
	var ht = dob.find('button').html();
	var spind = ht.indexOf('<span');
	if(spind >-1){
		return ht.substring(0,spind);
	}
	else{
		return ht;
	}
}
uimanager.prototype.setddval = function(dob,v){
	dob.find('button').html(v);
}
uimanager.prototype.getDRowFromLabel = function(diag,lab){
	var userow = null;
	diag.find('.editdiagline').each(function(ind){
		 row = $(this);
		//<span class='dreqast'>*</span>
		var htm = $(this).find('.editdiagline_lab').html();
		var htmstr = myuimanager.stripformcontent(htm);
		if(htmstr==lab){
			userow = row;
		}
	});
	return userow;
}

uimanager.prototype.stripformcontent=function(htm){
	////<span class='dreqast'>*</span>;
	if(htm.indexOf("</span>")>-1){
		return htm.substring(htm.indexOf("</span>")+7);
	}
	else{
		return htm;
	}
	
	
}

uimanager.prototype.commaFormat = function(val){
	rval = Math.round(val)+"";
	var newstr = "";
	var index = 0;
	for(var i=rval.length-1; i>=0; i--){
		var c = rval.charAt(i);
		newstr += c;
		index++;
		if(index > 0 && ((index % 3) == 0)){
			newstr += ",";
		}
	}
	if(newstr.charAt(newstr.length-1) == ","){
		newstr = newstr.substr(0,newstr.length-1);
	}
	
	var finalstr = "";
	for(var i=newstr.length-1; i>=0; i--){
		finalstr += newstr.charAt(i);
	}
	return finalstr;
}

uimanager.prototype.stripUnderscores = function(str){
	var newstr = str.replace(/_/g," ");
	//str.replace("Microsoft", "W3Schools");
	//var res = str.replace(/blue/g, "red");
	return newstr;
	
}

uimanager.prototype.updateProgressDialog = function(msg){
	
	$('#initloadDialog h3').html(msg);
	
}


uimanager.prototype.createdateString = function(){
		var d = new Date();
		var yr = d.getFullYear()+"";
		var mn = (d.getUTCMonth()+1)+"";
		if(mn.length==1){mn = "0"+mn;}
		var day = (d.getDate())+"";
		if(day.length==1){day = "0"+day;}
		var hrs = d.getHours()+"";
		if(hrs.length==1){hrs = "0"+hrs;}
		var mins = d.getMinutes()+"";
		if(mins.length==1){mins = "0"+mins;}
		var secs = d.getSeconds()+"";
		if(secs.length==1){secs = "0"+secs;}
		
		var dt = yr+mn+day+hrs+mins+secs;
		return dt;
		
}

uimanager.prototype.formatDateString = function(d){
	
	
		var yr = d.substr(0,4);
		var mn = d.substr(4,2);
		var day = d.substr(6,2);
		
		var hrs = d.substr(8,2);
		var hrval = parseInt(hrs);
		var ampm = "";
		if(hrval>12){
			hrval = hrval-12;
			ampm = "PM";
		}
		else{
			ampm = "AM";
		}
		hrs = hrval+"";
		if(hrs.length==1){
			hrs = "0"+hrs;
		}
		var min = d.substr(10,2);
		
		
		return mn+"/"+day+"/"+yr+" | "+hrs+":"+min+ampm;
	
		
}
	
	
