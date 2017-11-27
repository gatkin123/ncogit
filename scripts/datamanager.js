function datamanager(){
	
	
	

}
datamanager.prototype.init = function(){
	
	this.programlist = new Array();
	this.rawdarr = new Array();
	this.currprog = 0;
	this.loadcreatedmodel = false;
	this.loadcreateddset = false;
	this.delfunc = "";
	this.programsexist = true; 

	/*
	var attrlst = new Array();
	attrlst = ["ID","Message","Response","Aggregate CB", "Total Debt Outstanding", "Trans Union Score", "Zipcode", "High Fico", "Age", "Income","Buys Female Merchandise", "Buys Male Merchandise", "Buys Upscale Merchandise", "Education Level", "Weight" ];
	
	var attrtypelst = new Array();
	attrtypelst = ["Integer","String","Boolean","Integer", "Integer", "Decimal", "Integer", "Boolean", "Integer", "Integer","Boolean", "Boolean", "Boolean", "String", "Decimal" ];
	
	var attrrangelst = new Array();
	attrrangelst = [10000,["Buy One Get One Free","50% Off", "Spend over $100","Round-Trip Ticket"], 1,100000,1000000,8.0,99999,1,100,500000,1,1,1,["Some H.S.", "H.S. Grad", "Some College", "BA", "MA", "PhD"],10.0];
	var flaglist = new Array();
	flaglist = ["key","credit-card","line-chart","na", "na", "na", "na", "na", "na", "na","na", "na", "na", "na","balance-scale" ];
	
	
	var flagcanonical = new Array();
	flagcanonical = ["Primary Key","Offer","Prediction","na", "na", "na", "na", "na", "na", "na","na", "na", "na", "na","Weight" ];
	
	var testdset = new dataset(1,"Test DataSet 1");
	
	testdset.setAttributes(attrlst);
	testdset.setTypes(attrtypelst);
	testdset.setRanges(attrrangelst);
	testdset.setFlags(flaglist);
	testdset.setFlagnames(flagcanonical);
	*/
	

	
	this.loadData();
}




datamanager.prototype.loadData = function(){
	
	
	this.loadPrograms();
	
	
	/*
	this.whichfile = 0;
	this.filearr = new Array();
	this.rawdarr = new Array();
	this.filearr = ["bank_testing.csv","bank_testing.dd","bank_training.csv","bank_training.dd"];
	this.loaddatafile();
	*/
	
}


datamanager.prototype.loadPrograms= function(){
	var murl = "../LoadPrograms_cng";
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"xml",
		success: function(xml){
		////alert(xml);},
				//uccess: function(html) {
					//alert(xml);
					//alert("success");
				serverbusy = false;
				
				var rec = xml.getElementsByTagName("record");
				var qchlist = new Array();
				var i, ii;
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						var ownerem = flds[1].textContent;
						var nm = flds[2].textContent;
						var descr = flds[3].textContent;
						var created = flds[4].textContent;
						var modified = flds[5].textContent;
						//function program(idn,n,d,em,cr,mod){
						mydatamanager.programlist.push(new program(id,nm,descr,ownerem,created,modified));
						
					
				}
				
				mydatamanager.loadCampaigns();
				
			}
		});
		
	
}


datamanager.prototype.loadCampaigns= function(){
	var murl = "../LoadCampaigns_cng";
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"xml",
		success: function(xml){
		////alert(xml);},
				//uccess: function(html) {
					//alert(xml);
					//alert("success");
				serverbusy = false;
				
				var rec = xml.getElementsByTagName("record");
				var qchlist = new Array();
				var i, ii;
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						var progid = flds[1].textContent;
						var nm = flds[2].textContent;
						var descr = flds[3].textContent;
						var created = flds[4].textContent;
						var modified = flds[5].textContent;
						var campstate = flds[6].textContent;
						var camptype = flds[7].textContent;
						var contmethod = flds[8].textContent;
						var contchann = flds[9].textContent;
						var fixedcost = flds[10].textContent;
						var varcost = flds[11].textContent;
						var varcostun = flds[12].textContent;
						var depstart = flds[13].textContent;
						var depend = flds[14].textContent;
						//function program(idn,n,d,em,cr,mod){
						
						var prog = mydatamanager.getprogramFromID(progid);
						var currcamp = new campaign(id,prog,nm,descr,created,modified,campstate,camptype,contmethod,contchann,fixedcost,varcost,varcostun,depstart,depend);	
						prog.addcampaign(currcamp);
						
					
				}
				
				mydatamanager.loadDatasets();
				
			}
		});
		
	
}
datamanager.prototype.loadnewDataset = function(did){
	var murl = "../LoadDataSetAll_cng?datasetID="+did;
	
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"xml",
		success: function(xml){
		////alert(xml);},
				//uccess: function(html) {
					//alert(xml);
					//alert("success");
				serverbusy = false;
				var dsrec = xml.getElementsByTagName("dataset")
				var rec = dsrec[0].getElementsByTagName("record");
				var qchlist = new Array();
				var i, ii, newdid;
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						newdid = id;
						var progid = flds[1].textContent;
						var campnm = flds[2].textContent;
						var descr = flds[3].textContent;
						var created = flds[4].textContent;
						var modified = flds[5].textContent;
						var filepath = flds[6].textContent;
						var filename = flds[7].textContent;
						var fileext = flds[8].textContent;
						var isfirstrow =flds[9].textContent;
						var rowcount = flds[10].textContent;
						
						//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
						
						var newdset = new dataset(id,progid, campnm, descr,created,modified,filepath,filename,fileext,isfirstrow,rowcount);
						
						//function program(idn,n,d,em,cr,mod){
						
						var prog = mydatamanager.getprogramFromID(progid);
						
						prog.adddataset(newdset);
						
					
				}
				
				
				var dsrecatt = xml.getElementsByTagName("datasetatt")
				 rec = dsrecatt[0].getElementsByTagName("record");
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						var dset= flds[1].textContent;
						var progid= flds[2].textContent;
						var seqnum= flds[3].textContent;
						var dseqnum= flds[4].textContent;
						var nm= flds[5].textContent;
						var nicknm= flds[6].textContent;
						var dtype= flds[7].textContent;
						var attusage= flds[8].textContent;
						var depon= flds[9].textContent;
						var descr= flds[10].textContent;
						var precis= flds[11].textContent;
						var cnt= flds[12].textContent;
						var nummissing= flds[13].textContent;
						var unval= flds[14].textContent;
						var origdtype= flds[15].textContent;
						var origattus= flds[16].textContent;
						var origdepon= flds[17].textContent;
						
						var prog = mydatamanager.getprogramFromID(progid);
						//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
						var newdsetattr = new datasetAttr(id,dset,prog,seqnum,dseqnum,nm, nicknm, dtype, attusage, depon, descr,precis, cnt, nummissing, unval,origdtype, origattus,origdepon);
					
						
						//function program(idn,n,d,em,cr,mod){
						
						
						
						prog.adddatasetattr(newdsetattr);
						
					
				}
				
				
				var dsrecattstat = xml.getElementsByTagName("datasetattstats");
				rec = dsrecattstat[0].getElementsByTagName("record");
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						var datasetid = flds[1].textContent;
						var tottrue= flds[2].textContent;
						var catcounts= flds[3].textContent;
						var totsum= flds[4].textContent;
						var maxval= flds[5].textContent;
						var minval= flds[6].textContent;
						var meanval= flds[7].textContent;
						var stdev= flds[8].textContent;
						var cats= flds[9].textContent;
						var deciles= flds[10].textContent;
						var decilesTrt = flds[11].textContent;
						var decilesOut = flds[12].textContent;
						
						var prog = mydatamanager.getprogramFromID(progid);
						//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
						var newdsetattrstats = new datasetAttrStats(id,tottrue,catcounts,totsum,maxval,minval,meanval,stdev,cats,deciles,decilesTrt,decilesOut);
						//datasetAttrStats(idn, tottrue, catcounts, totsum, mx, mn, mean, stdev, cats, dec)
						//function program(idn,n,d,em,cr,mod){
						
						
						
						prog.adddatasetattrstats(newdsetattrstats);
						
					
				}
				
				var i,ii,iii,iiii;
				var currprog = mydatamanager.getcurrprogram();
				var currdset = prog.getdsetbyid(newdid);
				
				var currdsetid = currdset.myid;
				for(iii=0; iii<currprog.mydatasetattrs.length; iii++){
					var currattr = currprog.mydatasetattrs[iii];
					if(currattr.dataset==newdid){
						for(iiii=0; iiii<currprog.mydatasetattrstats.length; iiii++){
							var currattrstats = currprog.mydatasetattrstats[iiii];
							if(currattrstats.myid == currattr.myid){
								currattr.mystats = currattrstats;
								break;
							}
						}
						currdset.addtoAttroblst(currattr);

					}
				}
				currdset.sortattrobs();
				currdset.setlists();
	
				currprog.setcurrdsetToLast();
				mydatamanager.loadcurrdspreview(currprog.myid, newdid);
				
				
				
				
				
				
			}
		});
	
		
	
	
}

datamanager.prototype.loadDatasets= function(){
	var murl = "../LoadDataSetsNew_cng";
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"xml",
		success: function(xml){
		////alert(xml);},
				//uccess: function(html) {
					//alert(xml);
					//alert("success");
					
				var resp = xml.getElementsByTagName("response");
				if(resp[0].textContent.indexOf("no records")>-1){
					mydatamanager.loadModels();
				}
				else{	
					
					serverbusy = false;
				
					var rec = xml.getElementsByTagName("record");
					var qchlist = new Array();
					var i, ii;
					for(i=0; i<rec.length;i++){
						var currRec = rec[i];
						var flds = currRec.getElementsByTagName("fld");
					
							var id= flds[0].textContent;
							var progid = flds[1].textContent;
							var campnm = flds[2].textContent;
							var descr = flds[3].textContent;
							var created = flds[4].textContent;
							var modified = flds[5].textContent;
							var filepath = flds[6].textContent;
							var filename = flds[7].textContent;
							var fileext = flds[8].textContent;
							var isfirstrow =flds[9].textContent;
							var rowcount = flds[10].textContent;
						
							//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
						
							var newdset = new dataset(id,progid, campnm, descr,created,modified,filepath,filename,fileext,isfirstrow,rowcount);
						
							//function program(idn,n,d,em,cr,mod){
						
							var prog = mydatamanager.getprogramFromID(progid);
							prog.datasetsexist = true;
							prog.adddataset(newdset);
						
					
					}
				
					mydatamanager.loadDatasetAttrs();
				}
				
			}
		});
		
	
}
datamanager.prototype.loadAllDatasetData= function(){
	
	var murl = "../LoadDataSetDataAll_cng";
	//this is a test of branch
	
}
	
	
	
	
datamanager.prototype.loadDatasetAttrs= function(){
	var murl = "../LoadDataSetAttrNew_cng";
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"xml",
		success: function(xml){
		////alert(xml);},
				//uccess: function(html) {
					//alert(xml);
					//alert("success");
				serverbusy = false;
				
				var rec = xml.getElementsByTagName("record");
				var qchlist = new Array();
				var i, ii;
				var prog;
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						var dset= flds[1].textContent;
						var progid= flds[2].textContent;
						var seqnum= flds[3].textContent;
						var dseqnum= flds[4].textContent;
						var nm= flds[5].textContent;
						var nicknm= flds[6].textContent;
						var dtype= flds[7].textContent;
						var attusage= flds[8].textContent;
						var depon= flds[9].textContent;
						var descr= flds[10].textContent;
						var precis= flds[11].textContent;
						var cnt= flds[12].textContent;
						var nummissing= flds[13].textContent;
						var unval= flds[14].textContent;
						var origdtype= flds[15].textContent;
						var origattus= flds[16].textContent;
						var origdepon= flds[17].textContent;
						
						 prog = mydatamanager.getprogramFromID(progid);
						//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
						var newdsetattr = new datasetAttr(id,dset,prog,seqnum,dseqnum,nm, nicknm, dtype, attusage, depon, descr,precis, cnt, nummissing, unval,origdtype, origattus,origdepon);
					
						
						//function program(idn,n,d,em,cr,mod){
						
						
						
						prog.adddatasetattr(newdsetattr);
						
					
				}
				
				mydatamanager.loadDatasetAttrStats(prog.myid);
				
			}
		});
		
	
}

datamanager.prototype.loadDatasetAttrStats= function(pid){
	var murl = "../LoadDataSetAttrStats_cng";
	var progid = pid;
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"xml",
		success: function(xml){
		////alert(xml);},
				//uccess: function(html) {
					//alert(xml);
					//alert("success");
				serverbusy = false;
				
				var rec = xml.getElementsByTagName("record");
				var qchlist = new Array();
				var i, ii;
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						var datasetid = flds[1].textContent;
						var tottrue= flds[2].textContent;
						var catcounts= flds[3].textContent;
						var totsum= flds[4].textContent;
						var maxval= flds[5].textContent;
						var minval= flds[6].textContent;
						var meanval= flds[7].textContent;
						var stdev= flds[8].textContent;
						var cats= flds[9].textContent;
						var deciles= flds[10].textContent;
						var decilesTrt = flds[11].textContent;
						var decilesOut = flds[12].textContent;
						
						
						//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
						var newdsetattrstats = new datasetAttrStats(id,tottrue,catcounts,totsum,maxval,minval,meanval,stdev,cats,deciles,decilesTrt,decilesOut);
						//datasetAttrStats(idn, tottrue, catcounts, totsum, mx, mn, mean, stdev, cats, dec)
						//function program(idn,n,d,em,cr,mod){
						
						prog = mydatamanager.getprogramFromID(progid);
						prog.adddatasetattrstats(newdsetattrstats);
						
					
				}
				
				
				
				mydatamanager.loadInitDataFile();
				
			}
		});
		
	
}



datamanager.prototype.loadInitDataFile = function(){
	
	/*
	program.prototype.adddataset = function(d){
		this.mydatasets.push(d);
	}

	program.prototype.adddatasetattr = function(d){
		this.mydatasetattrs.push(d);
	}*/
	
	var i,ii,iii,iiii;
	for(i=0; i<this.programlist.length; i++){
		var currprog = this.programlist[i];
		for(ii=0; ii<currprog.mydatasets.length; ii++){
			var currdset = currprog.mydatasets[ii];
			var currdsetid = currdset.myid;
			for(iii=0; iii<currprog.mydatasetattrs.length; iii++){
				var currattr = currprog.mydatasetattrs[iii];
				
				if(currattr.dataset==currdsetid){
					for(iiii=0; iiii<currprog.mydatasetattrstats.length; iiii++){
						var currattrstats = currprog.mydatasetattrstats[iiii];
						if(currattrstats.myid == currattr.myid){
							currattr.mystats = currattrstats;
							break;
						}
					}
						
					currdset.addtoAttroblst(currattr);
					
				}
			}
			currdset.sortattrobs();
			
			
			
			
			
			
		}
	}
	
	for(i=0; i<this.programlist.length; i++){
		var currprog = this.programlist[i];
		for(ii=0; ii<currprog.mydatasets.length; ii++){
			var currdset = currprog.mydatasets[ii];
			currdset.setlists();
		}
	}
	
	this.loadallrawdata();
	//this.loadrawdatatemp(currdset);
	
	
	
	
}

var dsetcounter = 0;
datamanager.prototype.loadallrawdata = function(){
		if(dsetcounter == this.programlist[this.currprog].mydatasets.length){
				this.loadModels();
		}
		else{
			var currdset = this.programlist[this.currprog].mydatasets[dsetcounter];
			this.loadrawdatatemp(currdset);
			
		}
}

datamanager.prototype.loadrawdata = function(ds){

	var fname = ds.myfile;
	var fext = ds.myfilext;
	
	var curl = "../testread?filename="+fname+"&ext="+fext;
	
	$.ajax({
	  	url: curl,
	    type: "GET",
		dataType:"text",
		success: function(d){
			//alert(d);
			//test numlines
			var nl = d.split(/\r\n|\r|\n/).length;
			mydatamanager.rawdarr.push(d);
				var currdset = mydatamanager.programlist[mydatamanager.currprog].getcurrdset();
				currdset.setData(0);
				//temp set
				mydatamanager.createModelTest();
				
				
				myuimanager.init();
		}
	});


}
/*
datamanager.prototype.createModelTest = function(){
	var pid = this.programlist[this.currprog].myid;
	var cid = this.getprogramFromID(pid).getcurrcampaign().myid;
	var dsid = this.getprogramFromID(pid).getcurrdset().myid;
	var testmodel = new model(3000,pid,cid,dsid);
	this.getprogramFromID(pid).getcurrcampaign().addmodel(testmodel);
	testmodel.tempBuildSegments();
	testmodel.defineCumulatives();
	
}
*/

datamanager.prototype.loadcurrdspreview = function(pid,did){

	
	//var curl = "bank_training.csv";
	var curl = "../LoadDataPreview?progID="+pid+"&datasetID="+did;
	$.ajax({
	  	url: curl,
	    type: "GET",
		dataType:"text",
		success: function(d){
			
			//alert(d);
			//test numlines
			mydatamanager.rawdarr.push(d);
			var currdset = mydatamanager.getcurrprogram().getcurrdset();
			currdset.setRawData(d);
			myuimanager.mydsetdisplay.addNewdset();
			//mydatamanager.loadModels();
			//mydatamanager.createModelTest();
			//myuimanager.init();
		}
	});


}


datamanager.prototype.loadrawdatatemp = function(ds){


	var pid = ds.myprog;
	var did =ds.myid;
	
	
	//var curl = "bank_training.csv";
	var curl = "../LoadDataPreview?progID="+pid+"&datasetID="+did;
	$.ajax({
	  	url: curl,
	    type: "GET",
		dataType:"text",
		success: function(d){
			
			//alert(d);
			//test numlines
			mydatamanager.rawdarr.push(d);
			var currdset = mydatamanager.programlist[mydatamanager.currprog].mydatasets[dsetcounter];
			currdset.setData(dsetcounter++);
			mydatamanager.loadallrawdata();
			//mydatamanager.loadModels();
			//mydatamanager.createModelTest();
			//myuimanager.init();
		}
	});


}



datamanager.prototype.loadModels = function(){
	myuimanager.updateProgressDialog("Loading Model Data");
	var murl = "../LoadModels_cng";
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"xml",
		success: function(xml){
		////alert(xml);},
				//uccess: function(html) {
					//alert(xml);
					//alert("success");
				serverbusy = false;
				
				var resp = xml.getElementsByTagName("response");
				if(resp[0].textContent.indexOf("no records")>-1){
					myuimanager.init();
				}
				else{
					
				var rec = xml.getElementsByTagName("record");
				var qchlist = new Array();
				var i, ii;
				for(i=0; i<rec.length;i++){
					var currRec = rec[i];
					var flds = currRec.getElementsByTagName("fld");
					
						var id= flds[0].textContent;
						var progid = parseInt(flds[1].textContent);
						var campid = parseInt(flds[2].textContent);
						var dsetid = parseInt(flds[3].textContent);
						var mname = flds[4].textContent;
						var descr = flds[5].textContent;
						var created = flds[6].textContent;
						var modified = flds[7].textContent;
						var mstate = flds[8].textContent;
						
						//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
						// model(idn,pid,cid,dsid,mn,des,cd,md,st)
						var newmod = new model(id,progid, campid, dsetid, mname,descr,created,modified, mstate);
						var prog = mydatamanager.getprogramFromID(progid);
						
						//function program(idn,n,d,em,cr,mod){
						
						var camp = prog.getcampaignbyID(campid);
						camp.modelsexist = true;
						camp.addmodel(newmod);
						
					
				}
				
				mydatamanager.loadcurrmodeldataAll(0);
				}
			}
		});
		
	
}

datamanager.prototype.loadcurrmodeldataAll = function(ind){
 	var mod = this.getcurrcampaign().models[ind];

	
	
		var mid = mod.modelid;
		
		var murl = "../LoadAllModelData_cng";
		$.ajax({
		   	url: murl,
		    type: "GET",
			data: {modelID:mid},
			dataType:"xml",
			
			success: function(xml){
			////alert(xml);},
					//uccess: function(html) {
						//alert("success");
					serverbusy = false;
					var segdta = xml.getElementsByTagName("segdata")[0];
					
					var rec = segdta.getElementsByTagName("rc");
					var i, ii;
					for(i=0; i<rec.length;i++){
						var currRec = rec[i];
						var flds = currRec.getElementsByTagName("f");

							var id= flds[0].textContent;
							var seg_num = flds[1].textContent;
							var seg_id = flds[2].textContent;
							var descr = flds[3].textContent;
							var segcount = flds[4].textContent;
							var segcountpct = flds[5].textContent;
							var outtruecount = flds[6].textContent;
							var outttruepct = flds[7].textContent;
							var cumouttrue = flds[8].textContent;
							var cumpop = flds[9].textContent;
							var cumouttruepct = flds[10].textContent;
							var cumpoppct = flds[11].textContent;
							var cumresprate = flds[12].textContent;
							var decile = flds[13].textContent;
							
							var dc_count = flds[14].textContent;
							var dc_response_rate = flds[15].textContent;
							var cum_respondents_dc = flds[16].textContent;
							var cum_respondents_dc_pct = flds[17].textContent;
							var cum_response_rate_dc = flds[18].textContent;
							
								var li_count = flds[19].textContent;
								var li_response_rate = flds[20].textContent;
								var cum_respondents_li = flds[21].textContent;
								var cum_respondents_li_pct = flds[22].textContent;
								var cum_response_rate_li = flds[23].textContent;
								
									var best_count = flds[24].textContent;
									var best_response_rate = flds[25].textContent;
									var cum_respondents_best = flds[26].textContent;
									var cum_respondents_best_pct = flds[27].textContent;
									var cum_response_rate_best = flds[28].textContent;
						
							//addSegment = function(sid, snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec)
							
							mod.addSegment(seg_id, seg_num, descr, segcount, segcountpct, outtruecount,outttruepct,cumouttrue,cumpop,cumouttruepct,cumpoppct,cumresprate,decile,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best);
							
							//dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,
							
							//li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,
							
							//best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best	
								
							//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
							// model(idn,pid,cid,dsid,mn,des,cd,md,st)
							


					}
					mod.finishSegments();
					
					
					var attdta = xml.getElementsByTagName("atts")[0];
					 rec = attdta.getElementsByTagName("rc");
					var qchlist = new Array();
			
					for(i=0; i<rec.length;i++){
						var currRec = rec[i];
						var flds = currRec.getElementsByTagName("f");

							var attname= flds[1].textContent;
							var ranking = flds[2].textContent;
							mod.attrimportlist.push(new attrimp(attname,ranking));
							//addSegment = function(sid, snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec)
						//	mod.addSegment(seg_id, seg_num, descr, segcount, segcountpct, outtruecount,outttruepct,cumouttrue,cumpop,cumouttruepct,cumpoppct,cumresprate,decile);
							//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
							// model(idn,pid,cid,dsid,mn,des,cd,md,st)



					}
					mod.finishattrimport();
					
					var statdta = xml.getElementsByTagName("stats")[0];
						 rec = statdta.getElementsByTagName("rc");
						for(i=0; i<rec.length;i++){
							var currRec = rec[i];
							var flds = currRec.getElementsByTagName("f");
								var statsstr = flds[0].textContent.split(',');
								
								var modid= statsstr[0];
								var node = statsstr[1];
								var attname = statsstr[2];
								var weighted = statsstr[3];
								var catval = statsstr[4];
								var cnt = statsstr[5];
								var mean = statsstr[6];
								var stderr = statsstr[7];
								var minval = statsstr[8];
								var maxval = statsstr[9];

								//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
								// model(idn,pid,cid,dsid,mn,des,cd,md,st)
								
								//function program(idn,n,d,em,cr,mod){

								mod.addsegstat(modid, node, attname, weighted, catval, cnt, mean, stderr, minval, maxval);


						}

						mod.preparemodelstats();
					
						mod.dataloaded = true;
						
						myuimanager.setModelCallback();
					}
					
					});
					
					
					
					
					
					
	
}



var modcounter = 0;




datamanager.prototype.loadcurrmodeldata = function(){
	var mod;
	if(this.loadcreatedmodel == true){
		myuimanager.updateProgressDialog("Loading Model");
		 mod = this.getcurrcampaign().getcurrmodel();
	}
	else{
		mod = this.getcurrcampaign().models[modcounter];
	}
		var mid = mod.modelid;
		
		var murl = "../LoadModelSegmentData_cng";
		$.ajax({
		   	url: murl,
		    type: "GET",
			data: {modelID:mid},
			dataType:"xml",
			
			success: function(xml){
			////alert(xml);},
					//uccess: function(html) {
						//alert("success");
					serverbusy = false;

					var rec = xml.getElementsByTagName("record");
					var qchlist = new Array();
					var i, ii;
					for(i=0; i<rec.length;i++){
						var currRec = rec[i];
						var flds = currRec.getElementsByTagName("fld");

							var id= flds[0].textContent;
							var seg_num = flds[1].textContent;
							var seg_id = flds[2].textContent;
							var descr = flds[3].textContent;
							var segcount = flds[4].textContent;
							var segcountpct = flds[5].textContent;
							var outtruecount = flds[6].textContent;
							var outttruepct = flds[7].textContent;
							var cumouttrue = flds[8].textContent;
							var cumpop = flds[9].textContent;
							var cumouttruepct = flds[10].textContent;
							var cumpoppct = flds[11].textContent;
							var cumresprate = flds[12].textContent;
							var decile = flds[13].textContent;
							
							var dc_count = flds[14].textContent;
							var dc_response_rate = flds[15].textContent;
							var cum_respondents_dc = flds[16].textContent;
							var cum_respondents_dc_pct = flds[17].textContent;
							var cum_response_rate_dc = flds[18].textContent;
							
								var li_count = flds[19].textContent;
								var li_response_rate = flds[20].textContent;
								var cum_respondents_li = flds[21].textContent;
								var cum_respondents_li_pct = flds[22].textContent;
								var cum_response_rate_li = flds[23].textContent;
								
									var best_count = flds[24].textContent;
									var best_response_rate = flds[25].textContent;
									var cum_respondents_best = flds[26].textContent;
									var cum_respondents_best_pct = flds[27].textContent;
									var cum_response_rate_best = flds[28].textContent;
						
							//addSegment = function(sid, snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec)
							
							mod.addSegment(seg_id, seg_num, descr, segcount, segcountpct, outtruecount,outttruepct,cumouttrue,cumpop,cumouttruepct,cumpoppct,cumresprate,decile,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best);
							
							//dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,
							
							//li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,
							
							//best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best	
								
							//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
							// model(idn,pid,cid,dsid,mn,des,cd,md,st)
							


					}
					mod.finishSegments();

					mydatamanager.loadcurrmodelattrimport();

				},
					error: function(xml){
						console.log(xml);
					}
			});


	}
	
	
	datamanager.prototype.loadcurrmodelattrimport = function(){
		var mod;
		if(this.loadcreatedmodel == true){
			 mod = this.getcurrcampaign().getcurrmodel();
		}
		else{
			mod = this.getcurrcampaign().models[modcounter];
		}
			var mid = mod.modelid;

			var murl = "../LoadModelAttImport_cng";
			$.ajax({
			   	url: murl,
			    type: "GET",
				data: {modelID:mid},
				dataType:"xml",

				success: function(xml){
				////alert(xml);},
						//uccess: function(html) {
							//alert("success");
						serverbusy = false;

						var rec = xml.getElementsByTagName("record");
						var qchlist = new Array();
						var i, ii;
						for(i=0; i<rec.length;i++){
							var currRec = rec[i];
							var flds = currRec.getElementsByTagName("fld");

								var attname= flds[1].textContent;
								var ranking = flds[2].textContent;
								mod.attrimportlist.push(new attrimp(attname,ranking));
								//addSegment = function(sid, snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec)
							//	mod.addSegment(seg_id, seg_num, descr, segcount, segcountpct, outtruecount,outttruepct,cumouttrue,cumpop,cumouttruepct,cumpoppct,cumresprate,decile);
								//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
								// model(idn,pid,cid,dsid,mn,des,cd,md,st)



						}
						mod.finishattrimport();

						mydatamanager.loadcurrmodelstats();

					},
						error: function(xml){
							console.log(xml);
						}
				});


		}
		
		

datamanager.prototype.loadcurrmodelstats = function(){
	var mod;
	if(this.loadcreatedmodel == true){
		 mod = this.getcurrcampaign().getcurrmodel();
	}
	else{
		mod = this.getcurrcampaign().models[modcounter];
	}
	
		var mid = mod.modelid;
			var murl = "../LoadModelStats_cng";
			$.ajax({
			   	url: murl,
			    type: "GET",
				data: {modelID:mid},
				dataType:"xml",

				success: function(xml){
				////alert(xml);},
						//uccess: function(html) {
							//alert(xml);
							//alert("success");
						serverbusy = false;

						var rec = xml.getElementsByTagName("record");
						var qchlist = new Array();
						var i, ii;
						for(i=0; i<rec.length;i++){
							var currRec = rec[i];
							var flds = currRec.getElementsByTagName("fld");

								var modid= flds[0].textContent;
								var node = flds[1].textContent;
								var attname = flds[2].textContent;
								var weighted = flds[3].textContent;
								var catval = flds[4].textContent;
								var cnt = flds[5].textContent;
								var mean = flds[6].textContent;
								var stderr = flds[7].textContent;
								var minval = flds[8].textContent;
								var maxval = flds[9].textContent;

								//dataset(idn,prog,camp,des, cr,mod,fp,fn,fext,firstrow,rowcnt)
								// model(idn,pid,cid,dsid,mn,des,cd,md,st)
								
								//function program(idn,n,d,em,cr,mod){

								mod.addsegstat(modid, node, attname, weighted, catval, cnt, mean, stderr, minval, maxval);


						}

						mod.preparemodelstats();
						
						
						if(mydatamanager.loadcreatedmodel == true){
							$('#initloadDialog').modal('hide');
							myuimanager.mymodeldisplay.resetDisplay();
						}
						else{
							modcounter++;
							if(modcounter == mydatamanager.getcurrcampaign().models.length){
								myuimanager.init();
							}
							else{
								mydatamanager.loadcurrmodeldata();
							}
						}
						
						

					},
					error: function(xml){
						console.log(xml);
					}
				});	
		
}
datamanager.prototype.placeempty = function(str){
	if(str==""){
		return "EMPTY";
	}
	else{
		return str;
	}
}
datamanager.prototype.revertcurrdatasetAttrs = function(){
		var dset = mydatamanager.getcurrdset(this.currdset);
		dset.revert();
		myuimanager.mydsetdisplay.initTestTables();
}
datamanager.prototype.editcurrdatasetAttrs = function(){
		var dset = mydatamanager.getcurrdset(this.currdset);
			var murl = "../EditDatasetAttrs_cng";
			
				var attrStr= "";
			var i;
			for(i=0; i<dset.attroblist.length; i++){
				var currattrob = dset.attroblist[i];
			
				attrStr += this.placeempty(currattrob.myid);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.myprog.myid);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.sequenceNum);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.dispsequenceNum);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.myname);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.mynickname);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.datatype);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.attributeUsage);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.dependson);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.mydescr);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.precision);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.count);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.numberMissing);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.uniqueValues);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.origdataType);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.origattUsage);
				attrStr += ("*");
				attrStr += this.placeempty(currattrob.origdependson);
				
				if(i<(dset.attroblist.length-1)){
					attrStr += "~";
				}
				
			}
			
			
			$.ajax({
			   	url: murl,
			    type: "GET",
				data: {ID:dset.myid,
					attData:attrStr},
				dataType:"text",

				success: function(xml){
				////alert(xml);},
						//uccess: function(html) {
							//alert(xml);
							//alert("success");
					
							//alert(xml);
							var currdset = mydatamanager.getcurrdset();
							currdset.holddata();
							myuimanager.mydsetdisplay.showSaved();

					},
					error: function(xml){
						console.log(xml);
					}
				});	
		
}


datamanager.prototype.getprogram = function(ind){
	return this.programlist[ind];
}
datamanager.prototype.getprogramFromID = function(idn){
	var i;
	for(i=0; i<this.programlist.length; i++){
		if(this.programlist[i].myid == idn){
			return this.programlist[i];
		}
	}
	return null;
}
datamanager.prototype.getcurrprogram = function(){
	return this.programlist[this.currprog];
}
datamanager.prototype.getmaxcampid = function(){
	var i;
	var mx = -1000;
	var prog = this.getcurrprogram();
	
	for(i=0; i<prog.campaigns.length; i++){
		var camp = prog.campaigns[i];
		var idn = camp.myid;
		mx = (idn>mx?idn:mx);
		
	}
	return mx;
}

datamanager.prototype.getmaxprogramid = function(){
	var i;
	var mx = -1000;
	for(i=0; i<this.programlist.length; i++){
		var idn = this.programlist[i].myid;
		mx = (idn>mx?idn:mx);
		
	}
	return mx;
}
datamanager.prototype.getcurrcampaign = function(){
	return this.getcurrprogram().getcurrcampaign();
}
datamanager.prototype.getcampaignfromid = function(idn){
	var i;
	for(i=0; i<this.campaignlist.length; i++){
		if(this.campaignlist[i].myid == idn){
			return this.campaignlist[i];
		}
	}
	return null;
}
datamanager.prototype.getcurrdset = function(){
	return this.getcurrprogram().getcurrdset();
}
datamanager.prototype.getdsetidfromname = function(dsn){
 	var dsets = this.getcurrprogram().getdsets();
	var i;
	for(i=0; i<dsets.length; i++){
		if(dsets[i].myfile == dsn){
			return dsets[i].myid;
		}
	}
	return null;
	
}
datamanager.prototype.getcurrmodel = function(){
	return this.getcurrcampaign().getcurrmodel();
}
datamanager.prototype.getmodelFromID = function(idn){
	var i;
	var camp = this.getcurrcampaign();
	for(i=0; i<camp.models.length; i++){
		if(camp.models[i].modelid == idn){
			return camp.models[i];
		}
	}
	return null;
}
datamanager.prototype.updateProgramData = function(murl,dta){
	
	murl = "../"+murl;
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"text",
		data:dta,
		success: function(xml){
			console.log(xml);
		}
	});
	
	
	
}

datamanager.prototype.deletecurrDataset = function(){
	var currprog = this.getcurrprogram();
	var currdset = currprog.getcurrdset();
	var pid = currprog.myid;
	var did = currdset.myid;
	currprog.deletedataset(currdset.myid);
	
	var murl = "../deleteDataset?progID="+pid+"&datasetID="+did;
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"text",
		data:dta,
		success: function(xml){
			
			if(mydatamanager.getcurrprogram().mydatasets.length > 0){
			
				myuimanager.mydsetdisplay.deletecallback();

			}
			else{
					mydatamanager.getcurrprogram().datasetsexist = false;
					
				myuimanager.mydsetdisplay.cleardatasets();
			}
			console.log(xml);
			
			
		}
	});
	
	
}

datamanager.prototype.deletecurrModel = function(){
	var currmod = this.getcurrmodel();
	var mid = currmod.modelid;
	var ind = this.getcurrcampaign().currmodel;
	this.getcurrcampaign().deletemodel(mid);
	

	var murl = "../deleteModel?modelID="+mid;
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"text",
		data:dta,
		success: function(xml){
			console.log(xml);
		
			if(mydatamanager.getcurrcampaign().models.length > 0){
				var newid = Math.min(ind,(mydatamanager.getcurrcampaign().models.length-1));
				myuimanager.mymodeldisplay.switchmodel(newid);

			}
			else{
				mydatamanager.getcurrcampaign().modelsexist = false;
				myuimanager.mymodeldisplay.clearmodels();
			}
			
		}
	});
	
	
}
datamanager.prototype.createModel = function(murl,dta, mid,did, pid){
	$('#initloadDialog').modal('show');
	myuimanager.updateProgressDialog("Creating New Model");
	var currmid = mid;
	var dsetid = did;
	var progid = pid;
	murl = "../"+murl;
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"text",
		data:dta,
		success: function(xml){
			console.log(xml);
			mydatamanager.runMegatree(currmid,dsetid, progid);
		}
	});
	
	
	
}

datamanager.prototype.runMegatree = function(mid,did, pid){
	myuimanager.updateProgressDialog("Running Model Analysis");
	var currmid = mid;
	var dsetid = did;
	murl = "../runMegatree?modelID="+mid+"&dsetID="+dsetid+"&progID="+pid;
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"text",
		success: function(xml){
			console.log(xml);
			//mydatamanager.runMegascore(currmid);
			mydatamanager.loadcreatedmodel = true;
			mydatamanager.loadcurrmodeldata();
		}
	});
	
	
	
}

datamanager.prototype.runMegascore = function(mid){
	myuimanager.updateProgressDialog("Running Model Score Analysis");
	var currmid = mid;
	murl = "../megascoretest?modelID="+mid;
	$.ajax({
	   	url: murl,
	    type: "GET",
		dataType:"text",
		success: function(xml){
			mydatamanager.loadcreatedmodel = true;
			mydatamanager.loadcurrmodeldata();
			//alert(xml);
		}
	});
	
	
	
}


function program(idn,n,d,em,cr,mod){
	this.currcamp = 0;
	this.progname = n;
	this.descr = d;
	this.myid = idn;
	this.campaignsexist = false;
	this.campaigns = new Array();
	this.owner_email = em;
	this.created = cr;
	this.modified = mod;
	this.datasetsexist = false;
	this.mydatasets = new Array();
	this.mydatasetattrs = new Array();
	this.mydatasetattrstats = new Array();
	this.currdset = 0;
}
program.prototype.addcampaign = function(c){
	this.campaigns.push(c);
}
program.prototype.getcampaign = function(ind){
	return this.campaigns[ind];
}
program.prototype.getcurrcampaign = function(){
	return this.campaigns[this.currcamp];
}
program.prototype.getcampaignbyID = function(id){
	var i;
	for(i=0; i<this.campaigns.length; i++){
		if(this.campaigns[i].myid==id){
			return this.campaigns[i];
		}
	}
	return null;
}
program.prototype.setcurrdsetToLast = function(){
	this.currdset = this.mydatasets.length-1;
	
}
program.prototype.adddataset = function(d){
	this.mydatasets.push(d);
}

program.prototype.adddatasetattr = function(d){
	this.mydatasetattrs.push(d);
}
program.prototype.getdatasetattrbyID = function(idn){
	var i;
	for(i=0; i<this.mydatasetattrs.length; i++){
		if(this.mydatasetattrs[i].myid == idn){
			return this.mydatasetattrs[i];
		}
	}
	return null;
}

program.prototype.adddatasetattrstats = function(d){
	this.mydatasetattrstats.push(d);
}

program.prototype.getdset = function(ind){
	return this.mydatasets[ind];
}
program.prototype.getdsetbyid = function(id){
	var i;
	for(i=0; i<this.mydatasets.length; i++){
		if(this.mydatasets[i].myid==id){
			return this.mydatasets[i];
		}
	}
	return null
}
program.prototype.deletedataset = function(id){
	var i;
	var delind = 0;
	for(i=0; i<this.mydatasets.length;i++){
		if(this.mydatasets[i].myid==id){
			delind = i;
			break;
		}
	}
	this.mydatasets.splice(delind,1);
	
	
}	
program.prototype.getcurrdset = function(){
	return this.mydatasets[this.currdset];
}
program.prototype.getdsets = function(){
	return this.mydatasets;
}


function campaign(idn,p,nm,descr,cr,mod,cstate,ctype,contmethod, chann, fxcost,varcost, varcostun, depstart, depend){
	this.myid = idn;
	this.myprogram = p;

	
	this.campname = nm;
	this.mydescr = descr;
	this.modelsexist = false;
	
	this.datasets = new Array();
	this.models = new Array();
	this.currmodel = 0;
	this.deployment = null;
	this.campstate = cstate;
	this.camptype = ctype;
	this.campmethod = contmethod;
	this.contchannel = chann;
	this.fixedcost = fxcost;
	this.variablecost = varcost;
	this.varcostunit = varcostun;
	this.depstartdate = depstart;
	this.dependdate = depend;
	
	this.created = cr;
	this.modified = mod;
	
}
campaign.prototype.adddataset = function(d){
	this.datasets.push(d);
}
campaign.prototype.addmodel = function(m){
	this.models.push(m);
}
campaign.prototype.getdset = function(ind){
	return this.datasets[ind];
}
campaign.prototype.getcurrdset = function(){
	return this.datasets[this.currdset];
}
campaign.prototype.getdsets = function(){
	return this.datasets;
}
campaign.prototype.getcurrmodel = function(){
	return this.models[this.currmodel];
}
campaign.prototype.deletemodel = function(mid){
	var i;
	var delind = 0;
	for(i=0; i<this.models.length;i++){
		if(this.models[i].modelid == mid){
			delind = i;
			break;
		}
	}
	this.models.splice(delind,1);
	
	
}

function datasetAttr(idn,dset,prog,seqnum,dseqnum,nm, nicknm, dtype, attusage, depon, descr,precis, cnt, nummissing, unval,origdtype, origattus,origdepon){
	this.myid = idn;
	this.myidnum = parseInt(this.myid);
	this.dataset = dset;
	this.myprog = prog;
	this.sequenceNum = seqnum;
	this.dispsequenceNum = dseqnum;
	this.myname = nm;
	this.mynickname = nicknm;
	this.datatype = dtype;
	this.attributeUsage = attusage;
	this.dependson = depon;
	this.mydescr = descr;
	this.precision = precis;
	this.count = cnt;
	this.numberMissing = nummissing;
	this.uniqueValues = unval;
	this.origdataType = origdtype;
	this.origattUsage = origattus;
	this.origdependson = origdepon;
	this.mystats = null;
	
}

function datasetAttrStats(idn, tottrue, catcounts, totsum, mx, mn, mean, stdev, cats, dec,dec_trt, dec_out){
	this.myid = idn;
	this.totaltrue = tottrue;
	this.categoryCounts = catcounts;
	this.totalsum = totsum;
	this.maxval = mx;
	this.minval = mn;
	this.standardDeviation = stdev;
	this.categories = cats;
	this.deciles = dec;
	this.deciles_treatment = dec_trt;
	this.deciles_outcome = dec_out;
	
	
	
}


function dataset(idn,prog,camp,des,cr,mod,fp,fn,fext,firstrow,rowcnt){
	this.myid = idn;
	
	this.myprog = prog;
	this.mycamp = camp;
	this.descr = des;
	this.created = cr;
	this.modified = mod;
	this.filepath = fp;
	
	this.myfile = fn;
	this.myfilext = fext;
	this.firstrownaming = firstrow;
	this.rowcount = rowcnt;
	this.attrlist = new Array();
	this.attroblist = new Array();
	this.attrobstatslist = new Array();
	this.rangemx = null;
	this.rangesteps = null;
	
	
	
	
}

function dscompare(a,b) {
  if (a.myidnum < b.myidnum)
    return -1;
  if (a.myidnum > b.myidnum)
    return 1;
  return 0;
}



dataset.prototype.sortattrobs = function(){
	
	this.attroblist.sort(dscompare);
	
}

dataset.prototype.compareToHold = function(){
	var i;
	for(i=0; i<this.attroblist.length; i++){
		var currattrob = this.attroblist[i];
		var currholdob = this.attroblist_hld[i];
		
		var curratt = currattrob.attributeUsage;
		var holdatt = currholdob.attributeUsage;
		
		var currnick = currattrob.mynickname;
		var holdnick = currholdob.mynickname;
		
		if(!(curratt == holdatt && currnick == holdnick)){
			return false;
		}
		
		
	}
	return true;
	
	
}

dataset.prototype.holddata = function(){
	
	this.attributelist_hld = new Array();
	this.attnicknamelist_hld = new Array();
	this.typelist_hld = new Array();
	this.flaglist_hld = new Array();
	this.flagnamelist_hld = new Array();
	this.attroblist_hld = new Array();
	
	this.attributelist_hld = this.attributelist.slice();
	this.attnicknamelist_hld = this.attnicknamelist.slice();
	this.typelist_hld = this.typelist.slice();
	this.flaglist_hld = this.flaglist.slice();
	this.flagnamelist_hld = this.flagnamelist.slice();
	this.attroblist_hld = this.attroblist.slice();
}
dataset.prototype.revert = function(){
	this.attributelist = this.attributelist_hld.slice();
	this.attnicknamelist = this.attnicknamelist_hld.slice();
	this.typelist = this.typelist_hld.slice();
	this.flaglist = this.flaglist_hld.slice();
	this.flagnamelist = this.flagnamelist_hld.slice();
	this.attroblist = this.attroblist_hld.slice();
	


}	
dataset.prototype.setlists = function(){
	
	
	this.attributelist = new Array();
	this.attnicknamelist = new Array();
	
	this.typelist = new Array();
	this.flaglist = new Array();
	this.flagnamelist = new Array();
	
	var i;
	for(i=0; i<this.attroblist.length; i++){
		var curratt = this.attroblist[i];
		
		this.attributelist.push(curratt.myname);
		this.attnicknamelist.push(curratt.mynickname);
		
		this.typelist.push(curratt.datatype);
		this.flagnamelist.push(curratt.attributeUsage);
		if(curratt.myname == "response"){
			this.flaglist.push("line-chart");
		}
		else if(curratt.attributeUsage == "treatment"){
			this.flaglist.push("credit-card")
		}
		else if(curratt.attributeUsage == "primary-key"){
			this.flaglist.push("key");
		}
		else if(curratt.attributeUsage == "weight"){
			this.flaglist.push("balance-scale");
		}
		else if(curratt.attributeUsage == "stats-only"){
			this.flaglist.push("bar-chart");
		}
		else if(curratt.attributeUsage == "ignore"){
			this.flaglist.push("window-close");
		}
		else if(curratt.attributeUsage == "model-only"){
			this.flaglist.push("gears");
		}
		else{
			this.flaglist.push("na");
		}
	
		
		
	}
	this.holddata();
}
dataset.prototype.getAttrobfromID = function(id){
	var i;
	for(i=0; i<this.attroblist.length; i++){
		if(this.attroblist[i].myid == id){
			return this.attroblist[i];
		}
	}
	return null;
}
dataset.prototype.getAttrobfromName = function(attr){
	var i;
	for(i=0; i<this.attroblist.length; i++){
		if(this.attroblist[i].myname == attr){
			return this.attroblist[i];
		}
	}
	return null;
}
dataset.prototype.addtoAttroblst = function(ob){
	this.attroblist.push(ob);
}
dataset.prototype.addtoAttrobstatslst = function(ob){
	this.attroblist.push(ob);
}
dataset.prototype.setAttributes=function(a){
	this.attributelist = a;	
}
dataset.prototype.setTypes=function(t){
	this.typelist = t;	
}
dataset.prototype.setRanges=function(r){
	this.rangelist = r;	
}
dataset.prototype.setFlags=function(f){
	this.flaglist = f;	
}
dataset.prototype.setFlagnames=function(fn){
	this.flagnamelist = fn;	
}

dataset.prototype.getFlagData=function(fl){
	var ob = {};
	var i;
	for(i=0; i<this.flagnamelist.length; i++){
		if(this.flagnamelist[i]==fl){
			ob.flag = this.flaglist[i];
			ob.attr = this.attributelist[i];
			ob.atype = this.typelist[i];
			ob.flname = this.flagnamelist[i];
			return ob;
		}
		
	}
	return null;
	
	
}

dataset.prototype.getFlagFromAttribute=function(attr){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.attributelist[i]==attr){
			return this.flagnamelist[i];
		}
	}
	return null;
		
}
dataset.prototype.getResponseInd = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.attributelist[i]=="response"){
			return i;
		}
	}
	return null;
}
dataset.prototype.getResponseAttr = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.attributelist[i]=="response"){
			return this.attributelist[i];
		}
	}
	return null;
}

dataset.prototype.getMessageInd = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.attributelist[i]=="message"){
			return i;
		}
	}
	return null;
}
dataset.prototype.getMessageAttr = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.attributelist[i]=="message"){
			return this.attributelist[i];
		}
	}
	return null;
}

dataset.prototype.getTreatmentAttr = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.flagnamelist[i]=="treatment"){
			return this.attributelist[i];
		}
	}
	return null;
}

dataset.prototype.getOfferAttr = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.flagnamelist[i]=="offer"){
			return this.attributelist[i];
		}
	}
	return null;
}


dataset.prototype.getPrimkeyAttr = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.flagnamelist[i]=="primary-key"){
			return this.attributelist[i];
		}
	}
	return null;
}

dataset.prototype.getWeightAttr = function(){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.flagnamelist[i]=="weight"){
			return this.attributelist[i];
		}
	}
	return null;
}


dataset.prototype.getTypeFromAttribute=function(attr){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.attributelist[i]==attr){
			return this.typelist[i];
		}
	}
	return null;
		
}
dataset.prototype.getIndFromAttribute=function(attr){
	var i;
	for(i=0; i<this.attributelist.length; i++){
		if(this.attributelist[i]==attr){
			return i;
		}
	}
	return null;
}

dataset.prototype.setData = function(dind){
	var d = mydatamanager.rawdarr[dind];
	var retDel = String.fromCharCode(10);
	var dlinearr = d.split(retDel);
	this.mydata = new Array();
	
	var rowarr = new Array();
	var i,ii;
	var l = dlinearr.length;
	for(i=0; i<l; i++){
		var currrow = dlinearr[i];
		var dspl = currrow.split(",");
		rowarr = new Array();
		for(ii=0;ii<dspl.length; ii++){
			rowarr.push(dspl[ii]);
		}
		this.mydata.push(rowarr);
		
	}
	
	
}

dataset.prototype.setRawData = function(d){
	var retDel = String.fromCharCode(10);
	var dlinearr = d.split(retDel);
	this.mydata = new Array();
	
	var rowarr = new Array();
	var i,ii;
	var l = dlinearr.length;
	for(i=0; i<l; i++){
		var currrow = dlinearr[i];
		var dspl = currrow.split(",");
		rowarr = new Array();
		for(ii=0;ii<dspl.length; ii++){
			rowarr.push(dspl[ii]);
		}
		this.mydata.push(rowarr);
		
	}
	
	
}

dataset.prototype.getNumericalAttrs = function(){
	var oblist = new Array();
	
	var i;
	for(i=0; i<this.typelist.length;i++){
		if(!(this.flagnamelist[i]=="primary-key" || this.attributelist[i]=="message" || this.attributelist[i]=="response" || this.flagnamelist[i]=="ignore")){
			if(this.typelist[i] == "integer" || this.typelist[i] == "float"){
				var ob = {};
				ob.flag = this.flaglist[i];
				ob.attr = this.attributelist[i];
				ob.atype = this.typelist[i];
				ob.flname = this.flagnamelist[i];
				oblist.push(ob);
			}
		}
	}
	return oblist;
}
dataset.prototype.getMessageChoices = function(attr){
	var fldInd = this.getIndFromAttribute(attr);
	var offlst = new Array();
	var attrob = this.getAttrobfromName(attr);
	offlst = attrob.mystats.categories.split("*~*");
	
	return offlst;
			
}
dataset.prototype.getMessagePcts = function(attr,olst){
	var fldInd = this.getIndFromAttribute(attr);
	var offlst = new Array();
	var attrob = this.getAttrobfromName(attr);
	offlst = attrob.mystats.categoryCounts.split("*~*");
	var plst = new Array();
	var i;
	var totcnt = parseInt(attrob.count);
	for(i=0; i<offlst.length; i++){
		var curroffcnt = parseInt(offlst[i]);
		plst.push(curroffcnt/(totcnt*1.0));
		
		
	}
	return plst;
	
	
}

dataset.prototype.getminfromData = function(attr){
	
	
	var i, mx;
	var fldInd = this.getIndFromAttribute(attr);
	var typ = this.getTypeFromAttribute(attr);
	var attrob = this.getAttrobfromName(attr);
	var mn = attrob.mystats.minval;
	var mnv;
	if(typ=="integer"){
		mnv = parseInt(mn);
	}
	else if(typ == "float"){
		mnv = parseFloat(mn);
	}
	return mnv;
	
	/*
	var i, mx;
	var fldInd = this.getIndFromAttribute(attr);
	var typ = this.getTypeFromAttribute(attr);
	
	var m = 1000000000.0;
	for(i=0; i<this.mydata.length; i++){
		
		var d = this.mydata[i][fldInd];
		var dv;
		if(d == ""){
			dv = 0;
		}
		else{
		if(typ == "integer"){
			dv = parseInt(d);
		}
		else if(typ == "float"){
			dv = parseFloat(d);
		}
		}
		if(dv<m){m=dv;}
	}
	var dec = 1.0;
	while(dec < 10000000.0){
		if(m <= dec){
			mx = dec;
			break;
		}
		
		dec *= 10;
	}
	if(m < (mx/2)){
		mx /= 2;
	}
	return m;
	//return mx;
	*/
	
}

dataset.prototype.getnullsfromData = function(attr){
	var i, e;
	e = 0;
	var fldInd = this.getIndFromAttribute(attr);
	var attrob = this.getAttrobfromName(attr);
	var missing = parseInt(attrob.numberMissing);
	return missing;
	/*
	for(i=0; i<this.mydata.length; i++){
		
		var d = this.mydata[i][fldInd];
		if(d == "" || d==null || d==undefined){
			e++;
		}
	}
	return e;
	*/
		
	
}

dataset.prototype.getmeanfromData = function(attr){
	var i, mx;
	var fldInd = this.getIndFromAttribute(attr);
	var typ = this.getTypeFromAttribute(attr);
	var attrob = this.getAttrobfromName(attr);
	
	var mn = attrob.mystats.meanval;
	var mnv;
	if(typ=="integer"){
		mnv = parseInt(mn);
	}
	else if(typ == "float"){
		mnv = parseFloat(mn);
	}
	return mnv;
	

	
	
}

dataset.prototype.getmaxfromData = function(attr){
	
	var i, mx;
	var fldInd = this.getIndFromAttribute(attr);
	var typ = this.getTypeFromAttribute(attr);
	var attrob = this.getAttrobfromName(attr);
	var mx = attrob.mystats.maxval;
	var mxv;
	if(typ=="integer"){
		mxv = parseInt(mx);
	}
	else if(typ == "float"){
		mxv = parseFloat(mx);
	}
	return mxv;
	/*
	var m = -100000;
	for(i=0; i<this.mydata.length; i++){
		
		var d = this.mydata[i][fldInd];
		
		var dv;
		if(d == ""){
			dv = 0;
		}
		else{
			if(typ == "integer"){
				dv = parseInt(d);
			}
			else if(typ == "float"){
				dv = parseFloat(d);
			}
		}
		if(dv>m){m=dv;}
	}
	var dec = 1.0;
	while(dec < 10000000.0){
		if(m <= dec){
			mx = dec;
			break;
		}
		
		dec *= 10;
	}
	if(m < (mx/2)){
		mx /= 2;
	}
	return m
	//return mx;
	*/
	
}
dataset.prototype.getDecPcts = function(attr){
	var attrob = this.getAttrobfromName(attr);
	var totstr = attrob.mystats.deciles;
	var spl1 = totstr.split("~*~");
	var i;
	var declist = new Array();
	for(i=0; i<spl1.length; i++){
		var cluslist = new Array();
		var currclus = spl1[i].split(',');
		var currdec = spl1[i].split(",");
		var firstindex = 0;
		if(spl1[i].charAt(0)==","){
			firstindex = 1;
		}
		cluslist.push(parseFloat(currdec[firstindex]));
		cluslist.push(parseFloat(currdec[firstindex+2]));
		cluslist.push(parseFloat(currdec[firstindex+1]));
		declist.push(cluslist);
	}
	return declist;
	
	
}
dataset.prototype.getThreshPcts = function(comp,attr){
	var fldInd = this.getIndFromAttribute(attr);
	var attrob = this.getAttrobfromName(attr);
	var l = this.mydata.length;
	var i,ii,iii;
	var offchlist;
	var currocountlist;
	var currtcountlist;
	
	var cind = this.getResponseInd();
	var offind = this.getMessageInd();
	
	var offerchoverallcountlist = new Array();
	var overallcount = 0;
	var overallyescount = 0;
	var overallnocount = 0;
				
	if(comp=="comparemessage"){
		var offatt = this.getOfferAttr();
		offchlist = this.getMessageChoices(offatt);
		for(i=0; i<offchlist.length; i++){
			offerchoverallcountlist.push(0);
		}
		var treatmentstr = attrob.mystats.deciles_treatment;
		
		var treatmentspl = treatmentstr.split("~*~");
		
		currtcountlist = new Array();
	
		
		for(i=0; i<treatmentspl.length; i++){//iterate through each decile
			var currdec = treatmentspl[i];
			var currdecspl = currdec.split(',');
			var decvallist = new Array();
			for(ii=0; ii<offchlist.length; ii++){//interate through each category
				var offch = offchlist[ii];
				for(iii=0; iii<currdecspl.length; iii++){
					var currtestcat = currdecspl[iii];
					var fldspl = currtestcat.split(":");
					var fldval = parseInt(fldspl[1]);
				
					var fld = fldspl[0];
					if(fld == offch){
						offerchoverallcountlist[ii]+=fldval;
						decvallist.push(fldval);
						break;
					}
				}
			}
			currtcountlist.push(decvallist);
		}

		
		
	}
	else if(comp=="compareresponse"){
		
		var outcomestr = attrob.mystats.deciles_outcome;
		
		var outcomespl = outcomestr.split("~*~");
		
		currtcountlist = new Array();
		
		for(i=0; i<outcomespl.length; i++){
			var currdec = outcomespl[i];
			var currdecspl = currdec.split(",");
			var devallist = new Array();
			var trueval = parseInt(currdecspl[0].split(":")[1]);
			var falseval = parseInt(currdecspl[1].split(":")[1]);
			devallist.push(trueval);
			devallist.push(falseval);
			overallcount += (trueval + falseval);
			overallyescount += (trueval);
			overallnocount += (falseval);
			
			currtcountlist.push(devallist);
			
		}
		
	}
	else if(comp == "total"){
		
		var totstr = attrob.mystats.deciles;
		
		var totspl = totstr.split(",");
		currtcountlist = new Array();
			
		
		for(i=0; i<totspl.length; i++){
			var currv = parseInt(totspl[i]);
			overallcount += currv;
			currtcountlist.push(currv);
		}
		
	}
		
		
	
	for(i=0; i<currtcountlist.length;i++){
		if(Array.isArray(currtcountlist[i])){
			var subarr = currtcountlist[i];
			for(ii=0; ii<subarr.length;ii++){
				if(comp=="compareresponse"){
					var usetotal;
					if(ii==0){
						usetotal = overallyescount;
					}
					else{
						usetotal = overallnocount;
					}
					currtcountlist[i][ii] = (currtcountlist[i][ii]/usetotal);
				}
				else if(comp == "comparemessage"){
					currtcountlist[i][ii] = (currtcountlist[i][ii]/offerchoverallcountlist[ii]);
				}
			}
		}
		else{
			currtcountlist[i] = (currtcountlist[i]/overallcount);
		}
	}
	return currtcountlist;
	
	
}	
dataset.prototype.setChartData = function(attr, comparison){
	var arr = new Array();
	var lablist, pctlist, leglist;
	this.chdata = null;
	var attrob = this.getAttrobfromName(attr);
	var fl = this.getFlagFromAttribute(attr);
	if(attr == "response"){
		var fldInd = this.getIndFromAttribute(attr);
		var tottrue = parseInt(attrob.mystats.totaltrue);
		var totcnt = parseInt(attrob.count);
		var pct = tottrue/(totcnt*1.0);
		arr.push(pct);
		arr.push(1.0-pct);
		leglist = null;
		this.chdata = {pcts:arr,labs:null, leg:leglist};
		
	}
	else if(attr == "message"){
		var offlst = this.getMessageChoices(attr);
		var getoffpcts = this.getMessagePcts(attr,offlst);
		leglist = null;
		this.chdata = {pcts:getoffpcts,labs:offlst, leg:leglist};
		
	}
	else{
		var typ = this.getTypeFromAttribute(attr);
		if(typ == "integer" || typ == "float"){
			
			
			var pctlist = this.getDecPcts(attr);
			
			var lablist = new Array();
			var leglist = new Array();
			leglist = ["Min","Mean","Max"];
			var i;
			for(i=0; i<10;i++){
				lablist.push((i+1));
			}
			/*	
			var m, mn;
			if(this.rangemx == null){
				 mn = this.getminfromData(attr);
				 m = this.getmaxfromData(attr);
			}
			else{
				 mn = this.getminfromData(attr);
				m = this.rangemx;
			}
				
			var ms = m+"";
			var div;
			var un = "";
			
			var stp;
			if(this.rangesteps == null){
				div = (m-mn) / 10.0;
			}
			else{
				div = (m-mn)/this.rangesteps;
			}
			
			var currthresh = mn;
			var threshlist = new Array();
			
			var lablist = new Array();
			var thrcount = 0;
			while(currthresh <= m){
				threshlist.push(currthresh);
				if(thrcount>0){
					if( (currthresh-div > 99) || (currthresh>99)){
						lablist.push(myuimanager.commaFormat(Math.round(currthresh-div))+"-</br>"+myuimanager.commaFormat(Math.round(currthresh)));
					}
					else{
						lablist.push(myuimanager.commaFormat(Math.round(currthresh-div))+"&nbsp;-&nbsp;"+myuimanager.commaFormat(Math.round(currthresh)));
					}
				}
				thrcount++;
				currthresh += div;
				
			}
			var pctlist = this.getThreshPcts(comparison,attr);
			*/
			
			
		}
		if(comparison == "compareresponse"){
			leglist = new Array();
			leglist = ["Yes","No"];
		}
		else if(comparison == "comparemessage"){
			var offlst = this.getMessageChoices(this.getMessageAttr());
			leglist = new Array();
			for(i=0; i<offlst.length; i++){
				leglist.push(offlst[i]);
			}
		}
		else{
		//	leglist = null;
		}
		this.chdata= {pcts:pctlist,labs:lablist, leg:leglist};
	}
	
	
	
}



/*Models*/
function model(idn,pid,cid,dsid,mn,des,cd,md,st){
	this.modelid = idn;
	this.programid = pid;
	this.campaignid = cid;
	this.datasetid = dsid;
	this.modelname = mn;
	this.description = des;
	this.created = cd;
	this.modified = md;
	this.modelstate = st;
	this.dataloaded = false;
	this.segments = new Array();
	
	this.segmentstats = new Array();
	
	this.segstatattrlist = new Array();
	this.attrimportlist = new Array();
	/*
	this.tempgaindata = new Array();
	
	var overfit = new Array();
	overfit = [ [0,0],[.15,1.0]];
	
	var modscore = new Array();
	modscore = [ [0,0], [.1,.18], [.21,.39], [.38,.55], [.5,.7], [.59,.8], [.8,.96], [1,1]];
	
	var crossval = new Array();
	crossval = [ [0,0], [.1,.21], [.19,.39], [.28,.5], [.4,.6], [.48,.7], [.7,.88], [1,1]];
	
	var random = new Array();
	random = [ [0,0], [.2,.2], [.4,.4], [.6,.6], [.8,.8],[1,1]];
	
	this.tempgaindata = [overfit, modscore,crossval, random];
	
	
	this.templiftdata = new Array();
	
	var modscore_lift = new Array();
	modscore_lift = [ [.1,1.8], [.22,1.6], [.38,1.5], [.5,1.4], [.58,1.3], [.8,1.2], [1,1]];
	
	var crossval_lift = new Array();
	crossval_lift = [ [.1,2.0], [.18,1.9], [.28,1.75], [.38,1.6], [.48,1.5], [.72,1.2], [1,1]];
	
	this.templiftdata = [modscore_lift,crossval_lift];
	*/

	
	
	
}
model.prototype.turnoffTreatment = function(){
	this.treatmentactive = false;
}

model.prototype.turnonTreatment = function(){
	this.treatmentactive = true;
}


model.prototype.finishSegments = function(){
	
	this.segments.sort(function (a, b) {
	  return a.seg_num - b.seg_num;
	});
	
	var lastseg = this.segments[this.segments.length-1];
	this.cumsegsize = lastseg.cum_population;
	this.cumout = lastseg.cum_outcome_true;
	
	this.cumrespdc = lastseg.cumRespondentsDC;
	this.cumrespdcpct = lastseg.cumRespondentsDCPct;
	this.cumrespli = lastseg.cumRespondentsLI;
	this.cumresplipct = lastseg.cumRespondentsLIPct;
	this.cumrespbest = lastseg.cumRespondentsBest;
	this.cumrespbestpct = lastseg.cumRespondentsBestPct;
	
	if(this.cumrespdc == 0 && this.cumrespli == 0){
		this.treatmentactive = false;
	}
	else{
		this.treatmentactive = true;
	}
	this.createGainLiftData();
	this.createResponseData();
	
	
	
	
}

model.prototype.finishattrimport = function(){
	this.attrimportlist.sort(function (a,b){
		var arank = a.ranking;
		var brank = b.ranking;
		var arankint = Math.round(a.ranking * 10000);
		var brankint = Math.round(b.ranking * 10000);
		return  brankint - arankint;
	});
}


model.prototype.createResponseData = function(){
	this.temprespdata = new Array();
	this.temprespdata_notreat = new Array();
	//var modresp = new Array();
	var rand = new Array();
	var modresp = new Array();
	var modresp_li = new Array();
	var modresp_dc = new Array();
	var modresp_best = new Array();
	
	var i;
	var avgresp = this.cumout / this.cumsegsize; 
	
	
	for(i=0; i<this.segments.length; i++){
		var currrandpnt = new Array();
		var currmodpnt = new Array();
		var currmodpnt_dc = new Array();
		var currmodpnt_li = new Array();
		var currmodpnt_best = new Array();
		
		
		var currseg = this.segments[i];
		var xval = currseg.cum_population_pct;
		var yval = currseg.outcome_true_pct;
		
		var yval_dc = currseg.DCresponseRate;
		var yval_li = currseg.LIresponseRate;
		var yval_best = currseg.BestresponseRate;
		
		currmodpnt.push(xval);
		currmodpnt.push(yval);
		
		currmodpnt_dc.push(xval);
		currmodpnt_dc.push(yval_dc);
		
		currmodpnt_li.push(xval);
		currmodpnt_li.push(yval_li);
		
		currmodpnt_best.push(xval);
		currmodpnt_best.push(yval_best);
		
	
		currrandpnt.push(xval);
		currrandpnt.push(.0066);
		modresp.push(currmodpnt);
		modresp_dc.push(currmodpnt_dc);
		modresp_li.push(currmodpnt_li);
		modresp_best.push(currmodpnt_best);
		
		rand.push(currrandpnt);
		
		/*
		var currmodpntlift = new Array();
		var currrandpntlift = new Array();
		 xval = (i+1);
		 yval = currseg.outcome_true_pct*100;
		currmodpntlift.push(xval);
		currmodpntlift.push(yval);
		
		currrandpntlift.push(xval);
		currrandpntlift.push(avgresp*100);
		
		modscorelift.push(currmodpntlift);
		randlift.push(currrandpntlift);
		*/
		
		
		
	}
	this.temprespdata = [modresp_dc, modresp_li,modresp_best,rand];
	this.temprespdata_notreat = [modresp,rand];
	
}

model.prototype.createGainLiftData = function(){
	
	this.tempgaindata = new Array();
	this.templiftdata = new Array();
	this.tempgaindata_notreat = new Array();
	
	
	var modscore = new Array();
	var rand = new Array();
	
	var modscorelift = new Array();
	var randlift = new Array();
	

	var modscore_dc = new Array();
	var modscore_li = new Array();
	var modscore_best = new Array();
	
	
	
	var i;
	var avgresp = this.cumout / this.cumsegsize;
	
	for(i=0; i<this.segments.length; i++){
		var currmodpnt = new Array();
		var currrandpnt = new Array();
		
		var currmodpnt_dc = new Array();
		var currmodpnt_li = new Array();
		var currmodpnt_best = new Array();
		
		
		var currseg = this.segments[i];
		var xval = currseg.cum_population_pct;
		var yval = currseg.cum_outcome_true_pct;
		
		var yval_dc = currseg.cumRespondentsDCPct;
		var yval_li = currseg.cumRespondentsLIPct;
		var yval_best = currseg.cumRespondentsBestPct;
		
		currmodpnt.push(xval);
		currmodpnt.push(yval);
		
		currmodpnt_dc.push(xval);
		currmodpnt_dc.push(yval_dc);
		
		currmodpnt_li.push(xval);
		currmodpnt_li.push(yval_li);
		
		currmodpnt_best.push(xval);
		currmodpnt_best.push(yval_best);
		
	
		currrandpnt.push(xval);
		currrandpnt.push(xval);
		
		modscore.push(currmodpnt);
		modscore_dc.push(currmodpnt_dc);
		modscore_li.push(currmodpnt_li);
		modscore_best.push(currmodpnt_best);
		
		rand.push(currrandpnt);
		
		
		var currmodpntlift = new Array();
		var currrandpntlift = new Array();
		 xval = (i+1);
		 yval = currseg.outcome_true_pct*100;
		currmodpntlift.push(xval);
		currmodpntlift.push(yval);
		
		currrandpntlift.push(xval);
		currrandpntlift.push(avgresp*100);
		
		modscorelift.push(currmodpntlift);
		randlift.push(currrandpntlift);
		
		
		
		
	}
	this.tempgaindata = [modscore_dc, modscore_li,modscore_best,rand];
	this.templiftdata = [modscorelift,randlift];
	this.tempgaindata_notreat = [modscore, rand];
	
	
	
}

model.prototype.modelSettings =function(nm, desc, ds, outcm, treat, rowwt, missp, classwt, treatemph, splmet, stgrow, minsize, samppct, samphase, sampcomp){
	this.modname = nm;
	this.description = desc;
	this.datasetid = ds;
	this.outcome = outcm;
	this.treatment = treat;
	this.rowWeight = rowwt;
	this.missingPenalty = missp;
	this.classWeight = classwt;
	this.treatmentEmphasis = treatemph;
	this.splitMetric = splmet;
	this.stopGrow = stgrow;
	this.minimumSize = minsize;
	this.samplingPercentage = samppct;
	this.samplingPhase = samphase;
	this.samplingComplement = sampcomp;
}
/*
model.prototype.tempBuildSegments = function(){
	//fico score = 12
	//number rev trades = 10
	//tot debt out = 14
	//aggmonthly pay = 5
	//trans union = 15
	//agg cr limit = 7
	
	var currseg = new segment(76,this.progamid,this.modelid,this.datasetid,"Segment 1");
	//fico score <= 722  and   number revolving trades > 9  and   total debt outstanding > 17234
	currseg.addattrseg(12,"<=",722);
	currseg.addattrseg(10,">",9);
	currseg.addattrseg(14,">",17234);

	currseg.buildMetrics(1142,48,1,74);
	
	this.segments.push(currseg);
	
	
	currseg = new segment(90,this.progamid,this.modelid,this.datasetid,"Segment 2");
	//fico score <= 722  and   number revolving trades <= 9  and   aggregate monthly payments > 242  and   trans union score NOT UNKNOWN 2  and   trans union score <= 707  and   aggregate credit limit > 44380
	currseg.addattrseg(12,"<=",722);
	currseg.addattrseg(10,">",9);
	currseg.addattrseg(5,">",242);
	currseg.addattrseg(15,"NOT","UNKNOWN");
	currseg.addattrseg(15,"<=",707);
	currseg.addattrseg(7,">",44380);
	
	currseg.buildMetrics(721,22,1,83);
	
	
	
	this.segments.push(currseg);
	
	
	currseg = new segment(74,this.progamid,this.modelid,this.datasetid,"Segment 3");
	//fico score <= 722  and   number revolving trades > 9  and   total debt outstanding is unknown
	currseg.addattrseg(12,"<=",722);
	currseg.addattrseg(10,">",9);
	currseg.addattrseg(14,"IS","UNKNOWN");
	
	currseg.buildMetrics(128,4,1,3);
	
	this.segments.push(currseg);
	
	
	currseg = new segment(86,this.progamid,this.modelid,this.datasetid,"Segment 4");
	//fico score <= 722  and   number revolving trades <= 9  and   aggregate monthly payments > 242  and   trans union score NOT UNKNOWN 2  and   trans union score > 707  and   aggregate monthly payments <= 288
	currseg.addattrseg(12,"<=",722);
	currseg.addattrseg(10,">",9);
	currseg.addattrseg(5,">",242);
	currseg.addattrseg(15,"NOT","UNKNOWN");
	currseg.addattrseg(15,">",707);
	currseg.addattrseg(5,"<=",288);
	
	currseg.buildMetrics(785,17,1,82);
	
	this.segments.push(currseg);
	
	
	currseg = new segment(86,this.progamid,this.modelid,this.datasetid,"Segment 5");
	//fico score <= 722  and   number revolving trades > 9  and   total debt outstanding <= 17234
	currseg.addattrseg(12,"<=",722);
	currseg.addattrseg(10,">",9);
	currseg.addattrseg(14,"<=",17234);
	
	currseg.buildMetrics(1007,16,1,74);
	
	this.segments.push(currseg);
	
	
	
	
	
	
	
	
	
}
*/
/*
model.prototype.defineCumulatives = function(){
	var i;
	
	this.cumout = 0;
	this.cumsegsize = 0;
	
	
	for(i=0;i<this.segments.length; i++){
		var currseg = this.segments[i];
		var currout = currseg.outcomes + this.cumout;
		this.cumout += (currout);
		currseg.cumoutcomes = this.cumout;
		
		
		
		var currpop = this.cumsegsize + currseg.segmentsize;
		this.cumsegsize = currpop;
		currseg.cumsegsize = this.cumsegsize;
			
		
	}
	
	for(i=0;i<this.segments.length; i++){
		var currseg = this.segments[i];
		
		var currcumout = currseg.cumoutcomes;
		var currcumoutpct = currcumout/this.cumout;
		currseg.cumoutcomespct = currcumoutpct;
		
		
		var currcumsegsize = currseg.cumsegsize;
		var currcumsegsizepct = currcumsegsize/this.cumsegsize;
		currseg.cumsegsizepct = currcumsegsizepct;
		currseg.segsizepct = currseg.segmentsize/this.cumsegsize;
		var currresppct = currcumout/currcumsegsize;
		
		currseg.cumresprate = currresppct;
		
		
	}
	
	
	
	
	
}
*/


model.prototype.setProfChartData = function(whichchoice){
	var dset = mydatamanager.getcurrprogram().getcurrdset();
	var chosenseg = this.segments[myuimanager.mymodeldisplay.chosenseg];
	var stats = chosenseg.getstatsByAttr(whichchoice);
	
	
//	this.segstats_overallmax = dset.getmaxfromData(whichchoice);
//	this.segstats_overallmin = dset.getminfromData(whichchoice);
//	this.segstats_overallmean = dset.getmeanfromData(whichchoice);
	this.segstats_segmax = (stats.maxval.indexOf(".")>-1)?parseFloat(stats.maxval):parseInt(stats.maxval);
	this.segstats_segmin = (stats.minval.indexOf(".")>-1)?parseFloat(stats.minval):parseInt(stats.minval);
	this.segstats_segmean = (stats.mean.indexOf(".")>-1)?parseFloat(stats.mean):parseInt(stats.mean);
	
	
	
}

model.prototype.getsegmentbyid = function(id){
	var i;
	for(i=0; i<this.segments.length; i++){
		if(this.segments[i].segmentid==id){
			return this.segements[i];
		}
	}
	return null;
}
model.prototype.addSegment = function(sid, snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best){
	this.segments.push(new segment(sid,this.programid,this.modelid,this.datasetid,snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best));
	//	mod.addSegment(seg_id, seg_num, descr, segcount, segcountpct, outtruecount,outttruepct,cumouttrue,cumpop,cumouttruepct,cumpoppct,cumresprate,decile,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best);
	
	//sid, pid, mid, dsid, snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec
}
model.prototype.addsegstat = function(mid, nd, attname, wted, catval, cnt, mn, stderr, min, max){
	this.segmentstats.push(new segstats(mid, nd, attname, wted, catval, cnt, mn, stderr, min, max));
}
model.prototype.preparemodelstats = function(){
	
	this.segstatattrlist = new Array();
	
	var i,ii;
	for(i=0; i<this.segmentstats.length; i++){
		var currsegst = this.segmentstats[i];
		var curratt =currsegst.att_name;
		var fnd = false;
		for(ii=0; ii<this.segstatattrlist.length; ii++){
			if(this.segstatattrlist[ii]==curratt){
				fnd = true;
				break;
			}
		}
		if(!fnd){
			if(!(curratt=="response" || curratt=="treatment" || curratt=="offer")){
				this.segstatattrlist.push(curratt);
			}
		}
	}
	for(i=0; i<this.segmentstats.length; i++){
		var currsegst = this.segmentstats[i];
		for(ii=0; ii<this.segments.length; ii++){
			var currseg = this.segments[ii];
			if(currsegst.node == currseg.segmentid){
				var curratt = currsegst.att_name;
				if(!(curratt=="response" || curratt=="treatment" || curratt=="offer")){
					currseg.attrstats.push(currsegst);
				}
			}
			
		}
	}
	
	
	
	
	
}


model.prototype.getNumericalAttrs = function(){
	var uppcaseatts = new Array();
	var i;
	for(i=0; i<this.segstatattrlist.length; i++){
		var curratt = this.segstatattrlist[i];
		var curratt_u = curratt.toUpperCase();
		uppcaseatts.push(curratt_u);
	}
	return uppcaseatts;
}
/*
	var id= flds[0].textContent;
	var seg_num = flds[1].textContent;
	var seg_id = flds[2].textContent;
	var descr = flds[3].textContent;
	var segcount = flds[4].textContent;
	var segcountpct = flds[5].textContent;
	var outtruecount = flds[6].textContent;
	var outttruepct = flds[7].textContent;
	var cumouttrue = flds[8].textContent;
	var cumpop = flds[9].textContent;
	var cumouttruepct = flds[10].textContent;
	var cumpoppct = flds[11].textContent;
	var cumresprate = flds[12].textContent;
	var decile = flds[13].textContent;
	*/
function attrimp(attr, rnk){
	this.attribute = attr;
	this.ranking = rnk;
	
}

function segstats(mid, nd, attname, wted, catval, cnt, mn, stderr, min, max){
	this.modelid = mid;
	this.node = nd;
	this.att_name = attname;
	this.weighted = wted;
	this.categ_val = catval;
	this.count = cnt;
	this.mean = mn;
	this.std_err = stderr;
	this.minval = min;
	this.maxval = max;
	
}


function segment(sid, pid, mid, dsid, snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best){
	//this.segments.push(new segment(sid,this.programid,this.modelid,this.datasetid,snum, descr, scount, scountpct, otruecnt, otruepct, cumouttrue, cumpop, cumouttruepct, cumpoppct, cumresprate, dec,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,li_count,li_response_rate,cum_respondents_li,cum_respondents_li_pct,cum_response_rate_li,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best)));
	
	//dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,dc_count,dc_response_rate,cum_respondents_dc,cum_respondents_dc_pct,cum_response_rate_dc,	best_count,best_response_rate,cum_respondents_best,cum_respondents_best_pct,cum_response_rate_best)
	
	this.segmentid = parseInt(sid);
	this.programid = pid;
	this.modelid = mid;
	this.datasetid = dsid;
	this.seg_num = parseInt(snum);
	this.segname = "Segment "+(this.seg_num+1);
	this.description = descr;
	this.segment_count = parseInt(scount);
	this.segment_count_pct = parseFloat(scountpct);
	this.outcome_true_count = parseInt(otruecnt);
	this.outcome_true_pct = parseFloat(otruepct);
	this.cum_outcome_true = parseInt(cumouttrue);
	this.cum_population = parseInt(cumpop);
	this.cum_outcome_true_pct = parseFloat(cumouttruepct);
	this.cum_population_pct = parseFloat(cumpoppct);
	this.cum_response_rate = parseFloat(cumresprate);
	this.decile = parseInt(dec);
	
	this.DCcount = parseInt(dc_count);
	this.DCresponseRate = parseFloat(dc_response_rate);
	this.cumRespondentsDC = parseInt(cum_respondents_dc);
	this.cumRespondentsDCPct = parseFloat(cum_respondents_dc_pct);
	this.cumResponseRateDC = parseFloat(cum_response_rate_dc);
	
	this.LIcount = parseInt(li_count);
	this.LIresponseRate = parseFloat(li_response_rate);
	this.cumRespondentsLI = parseInt(cum_respondents_li);
	this.cumRespondentsLIPct = parseFloat(cum_respondents_li_pct);
	this.cumResponseRateLI = parseFloat(cum_response_rate_li);
	
	this.Bestcount = parseInt(best_count);
	this.BestresponseRate = parseFloat(best_response_rate);
	this.cumRespondentsBest = parseInt(cum_respondents_best);
	this.cumRespondentsBestPct = parseFloat(cum_respondents_best_pct);
	this.cumResponseRateBest = parseFloat(cum_response_rate_best);
	
	this.attrsegs = new Array();
	this.attrStr = "";
	this.attrstats = new Array();
	this.buildattrsegs();
	
}
segment.prototype.getstatsByAttr = function(whichchoice){
	var i;
	for(i=0; i<this.attrstats.length; i++){
		var currstats = this.attrstats[i];
		var att_name_upper = currstats.att_name.toUpperCase();
		if(att_name_upper==whichchoice){
			return currstats;
			
		}
	}
	return null;
	
}
segment.prototype.buildattrsegs = function(){
	//( fico_score > 731 ) AND ( aggregate_revolving_balance > 6320 ) AND ( fico_score <= 782 ) AND ( total_debt_outstanding > 9643 ) AND ( aggregate_revolving_balance > 12244 ) AND ( aggregate_cb > 13890 ) AND ( hh_income_score > 1 )
	var spl1 = this.description.split(" AND ");

	var i;
	for(i=0; i<spl1.length; i++){
		var curratt =spl1[i];
		var curratt_noparen = curratt.replace("( ","");
		var curratt_noparen2 = curratt_noparen.replace(" )","");
		var spl2 = curratt_noparen2.split(" ");
		var att = spl2[0];
		var op = spl2[1];
		var val = spl2[2];
		this.addattrseg(att,op,val);
	}
	this.buildattrstr();
	
}


segment.prototype.buildattrstr = function(){
	var i;
	this.attrstr = "";
	for(i=0; i<this.attrsegs.length; i++){
		var currattr = this.attrsegs[i];
		this.attrstr += (currattr.mysegstr)
	}
}
segment.prototype.addattrseg = function(att,cond,val){
	this.attrsegs.push(new attrseg(this.modelid,this.segmentid,att,cond,val));
	
}



function attrseg(mid,sid,att,conditional, value){
	this.segmentid = sid;
	
	this.mymod = mydatamanager.getmodelFromID(mid);
	this.myprog = mydatamanager.getprogramFromID(this.mymod.programid);
	this.mydset = this.myprog.getdsetbyid(this.mymod.datasetid);
	this.myattr = att;
	this.myconditional = conditional;
	this.myval = value;
	this.mysegstr = this.myattr+" "+this.myconditional+" "+this.myval;
	
}
