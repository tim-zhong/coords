/*
Nano Ajax Library
(c) Schien Dong, Antradar Software Inc.

License: www.antradar.com/license.php
Documentation: www.antradar.com/docs.php?article=nano-ajax-manual

Warning: this copy of Nano Ajax Library is modified for running in Gyroscope. Use the public version for general purpose applications.
*/

function gid(d){return document.getElementById(d);}

function hb(){var now=new Date(); var hb=now.getTime();return hb;}

function ajxb(u,data){
	if (document.wssid) u=u+'&wssid_='+document.wssid;
	
	var rq=xmlHTTPRequestObject();
	rq.open('POST',u+'&hb='+hb(),false);
	rq.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
	rq.send(data);
	return rq.responseText;	
}

function ajxnb(rq,u,f,data){
	if (document.wssid) u=u+'&wssid_='+document.wssid;	
	rq.onreadystatechange=f;
	rq.open('POST',u+'&hb='+hb(),true);
	rq.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
	rq.send(data);  	
}

function ajxpgn(c,u,d,e,data,callback){
	var ct=gid(c);
	if (ct==null) return;
	
	var f=function(c){return function(){
		if (rq.readyState==4){
			if (ct.reqobj!=null){
				ct.reqobj=null;
			}
			
			var apperror=rq.getResponseHeader('apperror');
			if (apperror!=null&&apperror!=''){
				alert('Error: '+apperror);
				
				return;	
			}
			
			ct.innerHTML=rq.responseText;
			
			if (d) ct.style.display='block';
			
			if (e){
				var i;
				var scripts=gid(c).getElementsByTagName('script');
				for (i=0;i<scripts.length;i++) eval(scripts[i].innerHTML);
				scripts=null;
			}
			
			if (callback) callback(rq);
		}	  
	}}	
	
	var rq=xmlHTTPRequestObject();
	
	if (ct.reqobj!=null) ct.reqobj.abort();
	ct.reqobj=rq;
	ajxnb(rq,u,f(c),data);
}


function ajxjs(f,js){if (f==null) eval(ajxb(js+'?'));}

function ajxcss(f,css){
	if (f==null) {
	  	csl=document.createElement('link');
		csl.setAttribute('rel','stylesheet');
		csl.setAttribute('type','text/css');
		csl.setAttribute('href',css);
		document.getElementsByTagName("head").item(0).appendChild(csl);
	}
}

function xajx(url){
	if (!document.xjs_transport){
		var xjs=document.createElement('div');
		document.body.appendChild(xjs);
		document.xjs_transport=xjs;
	}
	
	var xjs=document.xjs_transport;
	xjs.innerHTML='';
	var rq=document.createElement('script');
	rq.setAttribute('src',url);
	xjs.appendChild(rq);  
}


function xmlHTTPRequestObject() {
	var obj = false;
	var objs = ["Microsoft.XMLHTTP","Msxml2.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP.4.0"];
	var success = false;
	for (var i=0; !success && i < objs.length; i++) {
		try {
			obj = new ActiveXObject(objs[i]);
			success = true;
		} catch (e) { obj = false; }
	}

	if (!obj) obj = new XMLHttpRequest();
	return obj;
}

function hdpromote(css){
	if (typeof(document.documentElement.style.backgroundSize)=='string'&&window.devicePixelRatio>1){
		ajxcss(self.bgupgrade,css);
	}	
}



function ajxjs(f,js){if (f==null) eval(ajxb(js+'?'));}

function ajxcss(f,css,cachekey){
	if (f==null) {
	  	csl=document.createElement('link');
		csl.setAttribute('rel','stylesheet');
		csl.setAttribute('type','text/css');
		csl.setAttribute('href',css);
		document.getElementsByTagName("head").item(0).appendChild(csl);
	}
}

function xajx(url){
	if (!document.xjs_transport){
		var xjs=document.createElement('div');
		document.body.appendChild(xjs);
		document.xjs_transport=xjs;
	}
	
	var xjs=document.xjs_transport;
	xjs.innerHTML='';
	var rq=document.createElement('script');
	rq.setAttribute('src',url);
	xjs.appendChild(rq);  
}


function xmlHTTPRequestObject() {
	var obj = false;
	var objs = ["Microsoft.XMLHTTP","Msxml2.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP.4.0"];
	var success = false;
	for (var i=0; !success && i < objs.length; i++) {
		try {
			obj = new ActiveXObject(objs[i]);
			success = true;
		} catch (e) { obj = false; }
	}

	if (!obj) obj = new XMLHttpRequest();
	return obj;
}


function encodeHTML(code){
	code=escape(code);
	code=code.replace(/\//g,"%2F");
	code=code.replace(/\?/g,"%3F");
	code=code.replace(/=/g,"%3D");
	code=code.replace(/&/g,"%26");
	code=code.replace(/@/g,"%40");
	code=code.replace(/\+/g,"%2B");
	return code;
}