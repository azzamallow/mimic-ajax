if(typeof jasmine!=="undefined"){var describeForAjax=jasmine.Env.prototype.describe;jasmine.Env.prototype.describe=function(b,a){return describeForAjax.call(this,b,function(){ajax=Mimic.Ajax.getInstance();ajax.start();a.call(this,ajax.request);});};var beforeEachForAjax=jasmine.Env.prototype.beforeEach;jasmine.Env.prototype.beforeEach=function(a){return beforeEachForAjax.call(this,function(){a.call(this,Mimic.Ajax.getInstance().request);});};var itForAjax=jasmine.Env.prototype.it;jasmine.Env.prototype.it=function(b,a){return itForAjax.call(this,b,function(){a.call(this,Mimic.Ajax.getInstance().request);});};}if(typeof Mimic==="undefined"){Mimic={};}Mimic.Ajax=function(){data=[];var a=function(b){return{toHaveResponse:function(c,d){data.push({url:b,text:d,status:c});}};};this.request=function(b){return a(b);};this.start=function(){XMLHttpRequest=function(){this.onreadystatechange=undefined;this.readyState=-1;this.responseText=null;this.responseXML=null;this.status=-1;this.statusText=null;this.open=function(g,d,f,b,c){for(var e=0;e<data.length;e++){if(data[e].url===d){this.responseText=data[e].text;this.status=data[e].status;this.readyState=4;}}};this.send=function(b){if(this.onreadystatechange!==undefined){this.onreadystatechange(this);}};this.getAllResponseHeaders=function(){};this.getResponseHeader=function(b){};this.setRequestHeader=function(c,b){};this.abort=function(){};};};};Mimic.Ajax.getInstance=function(){if(Mimic.Ajax.instance===undefined){Mimic.Ajax.instance=new Mimic.Ajax();}return Mimic.Ajax.instance;};Mimic.HTTP={SUCCESS:200,INTERNAL_SERVER_ERROR:500,NOT_FOUND:404};