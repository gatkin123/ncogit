jQuery.fn.textWidth = function(tx){
    var _t = jQuery(this);
	var html_org;
	if(tx == null){
     html_org = _t.html();
	}
	else{
		html_org = tx;
	}
	
    if(_t[0].nodeName=='INPUT'){
        html_org = _t.val();
    }
    var html_calcS = '<span>' + html_org + '</span>';
    jQuery('body').append(html_calcS);
    var _lastspan = jQuery('span').last();
    //console.log(_lastspan, html_calc);
    _lastspan.css({
        'font-size' : _t.css('font-size')
        ,'font-family' : _t.css('font-family')
		, 'letter-spacing' : _t.css('letter-spacing')
		, 'font-weight' : _t.css('font-weight')
    })
    var width =_lastspan.width() + 5;
    //_t.html(html_org);
    _lastspan.remove();
    return width;
};




function DispOb(){
	this.x = null;
	this.y = null;
	this.childrenlist = new Array();
	this.myob = $("<div class='dob'></div>");
	this.myob.css('position','absolute');
	this.myid = null;
	this.width=function(val){
		if(val == undefined || val == null){
			return this.myob.width();
		}
		else{
			this.myob.width(val);
			return val;
		}
	}
	this.height=function(val){
		if(val == undefined || val == null){
			return this.myob.height();
		}
		else{
			this.myob.height(val);
		}
	}
	this.show = function(){
		this.myob.show();
	}
	this.hide = function(){
		this.myob.hide();
	}
	
	this.setx = function(val){
		this.myob.css('left',val);
		this.x = val;
	}
	this.sety = function(val){
		this.myob.css('top',val);
		this.y = val;
	}
	this.swapChildren = function(ob1,ob2){
		;
	}
	this.remChildren = function(){
		//this.myob.children().remove();
		
		this.myob.children().each(function(ind,el){
			if(! ($(this).prop("tagName") == "CANVAS")){
				$(this).remove();
			}
		});
				
		this.childrenlist = [];
	}
	this.children = function(){
		return this.myob.children();
	}
	this.fadeTo = function(d,a){
		this.myob.fadeTo(d,a);
	}
	this.getChildAt = function(ind){
		return this.childrenlist[ind];
	}
	this.removeChild = function(ob){
		var o;
		var splind=-1;
		for(o=0; o<this.childrenlist.length; o++){
			if(this.childrenlist[o]==ob){
				splind = o;
			}
		}
		if(!(splind ==-1)){
			this.childrenlist.splice(splind,1);
		}
		this.myob.remove(ob.myob);
	}
	this.removeChildAt = function(ind){
		var ob = this.childrenlist[ind];
		this.myob.remove(ob.myob);
		this.childrenlist.splice(ind,1);
		
	}
	this.html=function(htm){
		this.myob.html(htm);
	}
	
	this.addChild = function(ob){
		this.append(ob);
	}
	this.setclip = function(clipsettings){
		//{sclipleft:0,scliptop:0,sclipwidth:sectionwidth,sclipheight:0};
		
		var t = clipsettings.scliptop;
		var r = clipsettings.sclipleft + clipsettings.sclipwidth;
		var b = clipsettings.scliptop + clipsettings.sclipheight;
		var l = clipsettings.sclipleft;
		this.myob.css('clip','rect('+t+"px,"+r+"px,"+b+"px,"+l+"px)");
		
	}
	
	this.append = function(ob){
		this.childrenlist.push(ob);
		if(ob.myob){
			
			this.myob.append(ob.myob);
		}
		else{
			this.myob.append(ob);
		}
	}
	this.setBackground = function(col){
		this.myob.css('background',col);
	}
	this.addEventListener = function(ev,ob,func,args){
		var params = new Array();
		params = [ob,func,args];
	
		if(ev == "MouseUp"){
			this.myob.data('cbdata_mouseup',params);
			this.myob.mouseup(function(){
					
					cb($(this).data('cbdata_mouseup'));
				
				
			});
		}
		else if(ev == "MouseDown"){
				this.myob.data('cbdata_mousedown',params);
				this.myob.mousedown(function(){
					cb($(this).data('cbdata_mousedown'));
				
				
			});
		}
		else if(ev == "Click"){
				this.myob.data('cbdata_click',params);
			this.myob.click(function(e){
					e.preventDefault();
					eventactive = true;
					cb($(this).data('cbdata_click'));
				
				//alert("clicked");
				
			});
		}
		else if(ev == "MouseOver"){
				this.myob.data('cbdata_mouseover',params);
				this.myob.data('mouseovercount',0);
				this.myob.data('domouseoveraction',false);
			this.myob.mousemove(function(){
					
					   	var testrollover = $(this).data('cbdata_mouseover')[2][0];
						if(!(testrollover == homerolledover)){
						
							console.log("do rollover");
							$(this).data('domouseoveraction',false);
							homerolledover = $(this).data('cbdata_mouseover')[2][0];
							$(this).data('mouseovercount',0);
							
						}
						else{
							var currcnt = $(this).data('mouseovercount');
							currcnt++;
							console.log(currcnt);
							$(this).data('mouseovercount',currcnt);
							var actionflag = $(this).data('domouseoveraction');
							if(currcnt > 10 && actionflag == false){
								$(this).data('domouseoveraction',true);
								cb($(this).data('cbdata_mouseover'));
							}
						}
							//next();
			
					
				
				
				
			});
			
			
			
		}
			else if(ev == "MouseOut"){
					this.myob.data('cbdata_mouseoout',params);
				this.myob.mouseout(function(){
						console.log("mouseover: "+$(this).data('cbdata_mouseover')[2][0]);
						cb($(this).data('cbdata_mouseoout'));
					
					

				});
			}
	}

	
}
function cb(dt){
	var cob = dt[0];
	var f = dt[1];
	var args = dt[2];
	f.apply(cob, args);
}
function Button(){
	DispOb.call(this);
	
	this.idnum = null;
	//<button class="btn btn-link pull-right" type="button" id="addindbtn" ><span class='glyphicon glyphicon-plus'></span>
 				 			//</button>	
	this.myob = $("<button class='btn btn-link' type='button'></button>");
	this.label = function(txt){
		this.myob.append(txt);
	}
	this.setabs = function(){
		this.myob.css('position','absolute');
	}
	this.seticon = function(ic){
		this.myob.append("<span class='glyphicon "+ic+"'></span>");
	}
	
	
}

Button.prototype = Object.create(DispOb.prototype);
		Button.prototype.contructor = Button;


function FormOb(){
	DispOb.call(this);
	this.disptype = "form";
	this.idnum = null;	
	
	this.setob  = function(ob){
		this.myob = ob;
		this.myob.css('position','absolute');
	}
	
}

var mcCount = 0;
function MovieClip(){
	mcCount++;
	DispOb.call(this);
	this.disptype = "movieclip";
	this.idnum = null;
	
	
	this.myob = $("<div class='mcl'></div>");
	this.myob.css('position','absolute');
	
	this.setim = function(pth,w,h){
		this.myob.html("<img src='"+pth+"' width='"+w+"' height='"+h+"'/>");
	}

	this.setob  = function(ob){
		this.myob = ob;
		this.myob.css('position','absolute');
		this.graphics = new clipgraphics(this.myob);
		this.addcanv();
	}
	this.graphics = new clipgraphics(this.myob);
	
	this.addcanv = function(){
		this.myob.append(this.graphics.cnv);
		//this.graphics.setcnvdim(25,25);
	}
	this.addcanv();
	
	
	this.addimage = function(path){
		var imob = $("<div class = 'mclim'><img src='"+path+"'/></div>");
		imob.css('position','absolute').css('left',0).css('top',0);
		
		this.myob.append(imob);
	}
	
	
	
	this.alpha = function(val){
		this.myob.fadeTo(1,val);
	}
	
	this.suckamc = function(){
		alert("sooka!");
	}
	//currcolbox.addEventListener("MouseUp",this,chooseColorForChart,[currcolbox.idnum]);
	this.animate = function(ansettings){
		
		var antype = ansettings.antype;
		var andur = ansettings.andur;
		var anease = ansettings.anease;
		var andelay = ansettings.andelay;
		var callback = ansettings.callbacksettings;
		var stepcall;
		if(ansettings.stepcall==null || ansettings.stepcall==undefined){
			stepcall = null;
		}
		else{
			stepcall = ansettings.stepcall;
		}
		if(andelay > 0){
			this.myob.data('parob',this).data('ansettings',ansettings);
			this.myob.delay(andelay).queue(function() {
						$(this).dequeue();
						$(this).data('ansettings').andelay = 0;
			            $(this).data('parob').animate($(this).data('ansettings'));
			            
			});
		}
		else{
		var anend = ansettings.endsettings;
		if(antype == "clip"){
			
			var anstart = ansettings.startsettings;
			this.myob.data('anstart',anstart);
			this.myob.data('anend',anend);
			this.myob.data('callbackclip',callback);
			//this.myob.data('currstate',{sclipleft:20,scliptop:100,sclipwidth:50,sclipheight:50,eclipleft:0,ecliptop:0,eclipwidth:200,eclipheight:200});
			$({ val: 0,ob:this.myob }).animate(
			{ val: 100 }, 

			{ 
				duration:andur,
				easing:anease,

				step: function (now) { 
					var pct = now/100.0;
					var stateob = this.ob.data('anstart');
					var endob = this.ob.data('anend');
			

					var clipleftdiff = endob.eclipleft - stateob.sclipleft;
					var cliptopdiff = endob.ecliptop - stateob.scliptop;
					var clipwidthdiff = endob.eclipwidth - stateob.sclipwidth;
					var clipheightdiff = endob.eclipheight - stateob.sclipheight;
					var clipleftfrac = pct * clipleftdiff;
					var cliptopfrac = pct * cliptopdiff;
					var clipwidthfrac = pct * clipwidthdiff;
					var clipheightfrac = pct * clipheightdiff;

					var currclipleft = stateob.sclipleft + clipleftfrac;
					var currcliptop  = stateob.scliptop + cliptopfrac;
					var currclipwidth = stateob.sclipwidth + clipwidthfrac;
					var currclipheight = stateob.sclipheight + clipheightfrac;

					
						//$('#testbox').css('left',(stateob.left + leftfrac)).css('top',(stateob.top + topfrac));
					this.ob.css('clip','rect('+currcliptop+'px,'+(currclipleft+currclipwidth)+'px,'+(currcliptop+currclipheight)+'px,'+currclipleft+'px)');
				},
				complete: function() {
					if(!(this.ob.data('callbackclip')== null)){
						cb(this.ob.data('callbackclip'));
					}
			    }
			});
					
		}
		
		else if(antype == "rotate"){
			
			var anstart = ansettings.startsettings;
			this.myob.data('anstart',anstart);
			this.myob.data('anend',anend);
			this.myob.data('callbackclip',callback);
			this.myob.data('stepcall',stepcall);
			//this.myob.data('currstate',{sclipleft:20,scliptop:100,sclipwidth:50,sclipheight:50,eclipleft:0,ecliptop:0,eclipwidth:200,eclipheight:200});
			$({ val: 0,ob:this.myob }).animate(
			{ val: 100 }, 

			{ 
				duration:andur,
				easing:anease,

				step: function (now) { 
					var pct = now/100.0;
					var stateob = this.ob.data('anstart');
					var endob = this.ob.data('anend');
			
					var rotDiff = endof.rot - stateob.rot;
					var rotFrac = pct * rotDiff;
					
					var currRot = stateob.rot + rotFrac;
					
						//$('#testbox').css('left',(stateob.left + leftfrac)).css('top',(stateob.top + topfrac));
					this.ob.css('-ms-transform','rotate('+currRot+'deg)');
					this.ob.css('-webkit-transform','rotate('+currRot+'deg)');
					this.ob.css('transform','rotate('+currRot+'deg)');
					
				},
				complete: function() {
					if(!(this.ob.data('callbackclip')== null)){
						cb(this.ob.data('callbackclip'));
					}
			    }
			});
					
		}
		
		else if(antype=="pos"){
			this.myob.data('callbackpos',callback)
			this.myob.animate(
			{
				left:anend.left,
				top:anend.top
				
			},
			{
				duration:andur,
				easing:anease,
				
				step:function(now){
					if($(this).data('stepcall')==null){
						;
					}
					else{
						
					}
				},
				
				complete: function() {
				    //console.log($(this).html());
					if(!($(this).data('callbackpos')==null)){
						cb($(this).data('callbackpos'));
					}
				}
			}
			);
			
			
		}
	}
		
	}
	
}

function clipgraphics(cl){
	this.cnv = $("<canvas></canvas>");
	this.cnv.attr('id',"c_"+mcCount);
	this.context = null;
	this.cnv_raw = this.cnv[0];
	
	this.startheight=0;
	this.startwidth = 0;
	
	this.endheight=0;
	this.endwidth = 0;
	this.currwidth = 0;
	this.currheight = 0;
	this.animtype="";
	this.animflag = false;
	
	this.startrectanim = function(ew,eh){
		this.animtype = "rect";
		this.endwidth = ew;
		this.endheight = eh;
		
		this.animflag = true;
		this.animtype = typ;
	}
	this.startlineanim = function()
	
	this.anim = function(){
		if(this.animtype == "rect"){
			var wdone = false;
			var hdone = false;
			if(this.endwidth > this.startwidth){
				this.currwidth+=2;
				if(this.currwidth > this.endwidth){
					this.currwidth = this.endwidth;
					wdone = true;
				}
				
			}
			else if(this.endwidth < this.startwidth){
				this.currwidth-=2;
				if(this.currwidth < this.endwidth){
					this.currwidth = this.endwidth;
					wdone = true;
				}
			}
			if(this.endheight > this.startheight){
				this.currheight+=2;
				if(this.currheight > this.endheight){
					this.currheight = this.endheight;
					hdone = true;
				}

			}
			else if(this.endheight < this.startheight){
				this.currheight-=2;
				if(this.currheight < this.endheight){
					this.currheight = this.endheight;
					hdone = true;
				}
			}
			this.width(this.currwidth);
			this.height(this.currheight);
			this.clear();
			this.drawRect(0,0,this.currwidth,this.currheight);
				
			
		}
		
	}
	
	this.setcontext = function(){
		if(this.context == null){
			this.cnv_raw = this.cnv[0];
			this.context = this.cnv_raw.getContext('2d');	
		}
	}
	this.setcontext();
	
	
	this.clear = function(){
		//this.setcontext();
		this.context.clearRect(0,0,this.cnv_raw.width,this.cnv_raw.height);
		
	}
	this.setcnvdim = function(w,h){
		
		this.width(w);
		this.height(h);
	}
	this.width = function(w){
		this.currwidth = w;
		this.startwidth = w;
		this.cnv.attr('width',w);
	}
	this.height = function(h){
		this.currheight = h;
		this.startheight = h;
		this.cnv.attr('height',h);
	}
	this.beginFill = function(col){
		//this.setcontext();
		//alert(col);
		 this.context.fillStyle = col;
	}
	this.beginPath = function(){
		this.context.beginPath();
	}
	this.lineStyle=function(width,col){
			///this.setcontext();
			this.context.strokeStyle= col;
			this.context.lineWidth=width;	
	}
	this.moveTo = function(xt,yt){
		this.context.moveTo(xt,yt);
	}
	this.lineFromTo=function(xf,yf,xt,yt){
		
		//this.setcontext();
		//this.context.beginPath();
		this.context.moveTo(xf,yf);
		this.context.lineTo(xt,yt);
		//this.context.stroke();
	}
	this.lineTo = function(x,y){
		//this.setcontext();
		this.context.lineTo(x,y);
		//this.context.stroke();
	}
	this.drawRect = function(x,y,w,h){
		//this.setcontext();
		this.context.rect(x,y,w,h);
		
		
	}
	
	this.roundRect=function(x, y, width, height, radius) {
  
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  this.context.beginPath();
  this.context.moveTo(x + radius.tl, y);
  this.context.lineTo(x + width - radius.tr, y);
  this.context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  this.context.lineTo(x + width, y + height - radius.br);
  this.context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  this.context.lineTo(x + radius.bl, y + height);
  this.context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  this.context.lineTo(x, y + radius.tl);
  this.context.quadraticCurveTo(x, y, x + radius.tl, y);
  this.context.closePath();
  
  //if (fill) {
   // ctx.fill();
 // }
  //if (stroke) {
  //  ctx.stroke();
 // }
  

}

	this.stroke = function(){
		this.context.stroke();
	}
	this.endFill = function(){
		//this.setcontext();
		this.context.fill();
	}
	
	this.gradient =function(type,x,y,w,h,c1,c2,r){
		//this.setcontext();
		var direc;
		var grx1,gry1,grx2,gry2;
		if(r == Math.PI){
			direc = "horiz";
			grx1 = x;
			gry1 = y;
			grx2 = x+w;
			gry2 = y; 
		}
		else{
			direc = "vert";
			grx1 = x;
			gry1 = y;
			grx2 = x;
			gry2 = y+h; 
		}
		
		if(type == "linear"){
			
			var grd = this.context.createLinearGradient(grx1,gry1,grx2,gry2);
			grd.addColorStop(0,c1);
			grd.addColorStop(1,c2);
			this.context.fillStyle = grd;
			this.context.fillRect(x,y,w,h);
		}
	}
	
			
		this.drawEllipse = function(x,y,r1,r2){
			//this.setcontext();
			this.context.arc(x+r1,y+r2,r1,0,2*Math.PI);
			//this.context.stroke();
			this.context.fill();
		}
			
	
	
	
}
function ComboBox(nm,ob){
	DispOb.call(this);
	/*
	<div id='catdropdown' class="dropdown">
  								<button class="btn btn-default dropdown-toggle" type="button" id="catdropdownbutton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Dropdown<span class="caret"></span>
 				 				</button>
  								<ul id='catddownlist2' class="dropdown-menu" aria-labelledby="catdropdownbutton">
   				 					<li><a href="#">Action</a></li>
    								<li><a href="#">Another action</a></li>
    								<li><a href="#">Something else here</a></li>
    								<li><a href="#">Separated link</a></li>
 				 				</ul>
							</div>
	*/
	
	if(ob == null | ob == undefined){
	this.myob = $("<div id='"+nm+"_catdropdown' class='dropdown scroll-dropdown'><p>Dropdown</p><ul id='"+nm+"list'></ul></div>");
	this.myob.css('position','absolute');
	this.myob.width(278);
	}
	else{
		this.myob = ob;
	}
	
	//	this.addEventLi}stener = function(ev,ob,func,args){
		
	this.change = function(ob, func, args){
		var params = new Array();
		params = [ob, func, args];
		this.myob.data('ob',this);
		this.myob.data('cbdata',params);
		this.myob.find('ul').data('selind',-1);
		this.myob.find('ul li').each(function(ind){
			
			$(this).click(function(e){
				 e.preventDefault();
				var selind = $(this).parent().data('selind');
				if(!(selind == ind)){
					//alert($(this).data('ob'));
					$(this).parent().parent().data('ob').currid = $(this).attr('id');
					//alert($(this).html());
					$(this).parent().parent().find('p').html($(this).find('a').html());
					$(this).parent().data('selind',ind);
					$(this).parent().parent().prop('selectedIndex',ind);
					var cob = $(this).parent().parent().data('cbdata')[0];
					var f = $(this).parent().parent().data('cbdata')[1];
					var args = $(this).parent().parent().data('cbdata')[2];
					//args[0] = "clicked on choice: "+ind;
					f.apply(cob,args);
				}
			});
		});
	}
	
	this.html = function(htm){
		this.myob.html(htm);
	}
	this.append = function(txt,idn){
		//<li><a id='ic_1' href="#"><span class='glyphicon glyphicon-list'><span></a></li>
		if(idn == null || idn == undefined){
		this.myob.find('ul').append("<li><a href=''>"+txt+"</a></li>");
		}
		else{
			this.myob.find('ul').append("<li id='"+idn+"'><a href=''>"+txt+"</a></li>");
		}
		
	}
	this.setob = function(ob){
		this.myob = ob;
		this.myob.css('position','absolute');
	}
	
	this.selectedIndex = function(){
		var selind = this.myob.prop('selectedIndex');
		return selind;
	}
	this.removeItemAt = function(ind){
		this.myob.find('ul li').eq(ind).remove();
	}
	this.removeAll = function(){
		this.myob.find('button').html("");
		this.myob.find('ul').empty();
	}
			
	this.prop = function(whichtxt){
		this.myob.find('p').html(whichtxt);
	
		this.myob.find('ul li').each(function(i){
			var htmlstr = $(this).find('a').html();
			var hsrepl0 = htmlstr.replace("&amp;", "&");
			var hsrepl1 = hsrepl0.replace("&gt;", ">");
			var hsrepl2 = hsrepl1.replace("&lt;", "<");
			var hsrepl3 = hsrepl2.replace("&ge;", "≥");
			var hsrepl4 = hsrepl3.replace("&le;", "≤");
			
			if(hsrepl4 == whichtxt){
				console.log("found prop match for "+whichtxt+" ind:"+i);
				$(this).parent().parent().data('ob').currid = $(this).attr('id');
				$(this).parent().data('selind',i);
				$(this).parent().parent().prop('selectedIndex',i);
			}
		});
		
	}
	
	
}
ComboBox.prototype = Object.create(DispOb.prototype);
		ComboBox.prototype.contructor = ComboBox;



function RadioButton(){
	DispOb.call(this);
	
	this.myob = $("<div class='radio'><label><input type='radio' name=''></label></div>");
	this.myob.css('position','absolute');
	
	this.label = function(txt){
		this.myob.find('label input').append(txt);
	}
	
	this.radioname = function(txt){
		this.myob.find('input').attr('name',txt);
	}
	
	
	
}
RadioButton.prototype = Object.create(DispOb.prototype);
		RadioButton.prototype.contructor = RadioButton;


function CheckBox(){
	DispOb.call(this);
	this.myob = $("<div class='chb'><label><input type='checkbox' value='' data-size='large'/></label></div>");
	this.myob.css('position','absolute');
	this.setTextClass = function(cl){
		this.myob.addClass(cl);
	}
	this.text=function(t){
		this.myob.html(t);
	}
	this.setchecked = function(){
		this.myob = $("<div class='chb'><label><input type='checkbox' value='' data-size='large' checked/></label></div>");
		this.myob.css('position','absolute');
	}
	this.setob  = function(ob){
		this.myob = ob;
		this.myob.css('position','absolute');
	}
	this.setType = function(typ){
		if(this.typ == "input"){
			this.myob.attr('contentEditable','true');
		}
	}
	this.label = function(txt){
		this.myob.find('label input').append(txt);
		var htm = this.myob.find('label').html();
		htm+=txt;
		this.myob.find('label').html(htm);
		//alert(this.myob.find('label').html());
	}
	
	this.selected = function(){
		return this.myob.find('input')[0].checked;
	}
	
			
}
CheckBox.prototype = Object.create(DispOb.prototype);
		CheckBox.prototype.contructor = CheckBox;
		
				
function TextField(){
	DispOb.call(this);
	this.disptype = "textfield";
	this.myob = $("<div class='tf'></div>");
	this.myob.css('position','absolute');
	this.setTextClass = function(cl){
		this.myob.addClass(cl);
	}
	this.text=function(t){
		//alert(t);
		this.myob.html(t);
	}
	this.setob = function(ob){
		this.myob = ob;
		this.myob.css('position','absolute');
	}
	this.setType = function(typ){
		if(this.typ == "input"){
			this.myob.attr('contentEditable','true');
		}
	}
	
	this.twidth = function(){
		var txt= this.myob.html();
		var sz = this.myob.css('font-size');
		var fm = this.myob.css('font-family');
		var wt = this.myob.css('font-weight');
		return measureText(txt,sz,fm,wt).width;
		//return this.myob.textWidth();
	}
	this.trotate = function(){
		
		this.myob.addClass('rotate');
	}
	this.settotwidth = function(){
		var tw = this.myob.textWidth();
		this.myob.width(tw);
	}
	
	
			
}
TextField.prototype = Object.create(DispOb.prototype);
		TextField.prototype.contructor = TextField;
		
		function getTextWidth(ob){
			var txt= ob.html();
			var sz = ob.css('font-size');
			var fm = ob.css('font-family');
			var wt = ob.css('font-weight');
			return measureText(txt,sz,fm,wt).width;
			
		}
		
		function measureText(pText, pFontSize, pFamily, pWeight) {
		    var lDiv = document.createElement('div');

		    document.body.appendChild(lDiv);

		   // if (pStyle != null) {
		     //   lDiv.style = pStyle;
		    //}
			lDiv.style.fontFamily = ""+pFamily;
		    lDiv.style.fontSize = "" + pFontSize;
			lDiv.style.fontWeight = "" + pWeight;
		    lDiv.style.position = "absolute";
		    lDiv.style.left = -1000;
		    lDiv.style.top = -1000;

		    lDiv.innerHTML = pText;

		    var lResult = {
		        width: lDiv.clientWidth,
		        height: lDiv.clientHeight
		    };

		    document.body.removeChild(lDiv);
		    lDiv = null;

		    return lResult;
		}
		

function x(ob,val){
	
	if(ob.css == undefined || ob.css == null){
		ob.setx(val);
	}
	else{
		ob.css('left',val);
	}

}

function y(ob,val){
	if(ob.css == undefined || ob.css == null){
		ob.sety(val);
	}
	else{
		ob.css('top',val);
	}

}

function alpha(ob,val){
	if(ob instanceof MovieClip){
		ob.alpha(val);
	}
	else{
		ob.fadeTo(1,val);
	}
}



function closeBoxButton(){
	MovieClip.call(this);
	this.extra = "sooka";
}
closeBoxButton.prototype = Object.create(MovieClip.prototype);
		closeBoxButton.prototype.contructor = closeBoxButton;
		
		
function palletteBack(){
	MovieClip.call(this);
	this.width(131);
	this.height(72);
	this.graphics.setcnvdim(131,72);
	this.graphics.beginFill('#fff');
	this.graphics.lineStyle(1,'#ccc');
	this.graphics.drawRect(0,0,131,72);
	this.graphics.endFill();
	this.graphics.stroke();
	this.myob.addClass('box-shadow--2dp');
	//this.extra = "sooka";
	//this.addimage("images/pall.png");
}
palletteBack.prototype = Object.create(MovieClip.prototype);
		palletteBack.prototype.contructor = palletteBack;


function editSpiderButton(){
	MovieClip.call(this);
	this.extra = "sooka";
	//this.addimage("images/pall.png");
}
editSpiderButton.prototype = Object.create(MovieClip.prototype);
		editSpiderButton.prototype.contructor = editSpiderButton;

