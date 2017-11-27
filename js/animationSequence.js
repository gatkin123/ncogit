function animationsequence(){
	this.animlist = new Array();
	this.animindex = 0;
	this.animflag = false;
	this.timing = 1;
	this.addanimation = addanimation;
	this.startSequence = startSequence;
	this.resetsequence = resetsequence;
	this.mainanim = mainanim;
	// JavaScript Document
}


function addanimation(an, cuetime){
	
	this.animlist.push(an);
	if(!(cuetime==null)){
	an.setStartTime(cuetime);
	}
	else{
	an.startTime = 0;
	}
}

function resetsequence(){
	this.animlist = new Array();
	this.animflag = false;
	this.animindex = 0;
}

function startSequence(){
	this.animindex = 0;
	this.animflag = true;
	this.mainanim();
	
}


function mainanim(){
	var i;
	for(i=0; i<this.animlist.length; i++){
		var curranim = this.animlist[i];
		if(curranim.startTime == this.animindex){
			if(!(curranim.initanim == undefined)){
			curranim.initanim();
			}
			curranim.anim();
			
		}
		else if(this.animindex >  curranim.startTime){
			curranim.anim();
		}
	}
	
	
	var killanim = false;
	/*
	for(i=0; i<this.animlist.length; i++){
		var curranim = this.animlist[i];
		if(curranim.started== false ||(curranim.started == true && curranim.animflag == true)){
			killanim = false;
		}
	}
	*/
	if(killanim == false){
		this.animindex++;
	
		var t=setTimeout("mainsequence.mainanim()",this.timing);
	}
	else{
		
		animdone();
	}
}


	
	
	