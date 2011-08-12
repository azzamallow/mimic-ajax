/*global Mimic, jasmine */
if (typeof jasmine !== 'undefined') {
	// request = Mimic.Ajax.getInstance().request;
	
	var describeForAjax = jasmine.Env.prototype.describe;
	jasmine.Env.prototype.describe = function (description, specDefinitions) {
		return describeForAjax.call(this, description, function () {
			var ajax = Mimic.Ajax.getInstance();
			// ajax.start();
			specDefinitions.call(this, ajax.request);
		});
	};
	
	var beforeEachForAjax = jasmine.Env.prototype.beforeEach;
	jasmine.Env.prototype.beforeEach = function (beforeEachFunction) {
		return beforeEachForAjax.call(this, function () {
			beforeEachFunction.call(this, Mimic.Ajax.getInstance().request);
		});
	};
	
	var itForAjax = jasmine.Env.prototype.it;
	jasmine.Env.prototype.it = function (description, func) {
		return itForAjax.call(this, description, function () {
			var ajax = Mimic.Ajax.getInstance();
			func.call(this, ajax.request);
			ajax.reset();
		});
	};
}
/*global XMLHttpRequest:true */
var Mimic = {};
Mimic.Ajax = function () {
	var data = [], matchers = function (url) {
		return {
			toHaveResponse: function (status, text) {
				data.push({ 'url': url, 'text': text, 'status': status });
			}
		};
	};
	
	var RealXMLHttpRequest = XMLHttpRequest;
	XMLHttpRequest = function () {
		if (data.length === 0) {
			return new RealXMLHttpRequest();
		}
		
		return new function() {
			this.onreadystatechange = undefined;
			this.readyState = -1;
			this.responseText = null;
			this.responseXML = null;
			this.status = -1;
			this.statusText = null;
			this.open = function (method, url, async, user, password) {
				var i, useStub = false; 
				for (i = 0; i < data.length; i += 1) {
					if (data[i].url === url) {
						useStub = true;
						this.responseText = data[i].text;
						this.status = data[i].status;
						this.readyState = 4;
					}
				}
				
				if (!useStub) {
					this.responseText = 'url ' + url + ' was not expected.';
					this.status = Mimic.HTTP.INTERNAL_SERVER_ERROR;
					this.readyState = 4;
				}
			};
			this.send = function (object) {
				if (this.onreadystatechange !== undefined) {
					this.onreadystatechange(this);
				}
			};
			this.getAllResponseHeaders = function () {};
			this.getResponseHeader = function (header) {};
			this.setRequestHeader = function (header, value) {};
			this.abort = function () {};
		};
	};
	
	this.request = function (url) {
		return matchers(url);
	};
	
	this.reset = function () {
		data = [];
	}
};

Mimic.Ajax.getInstance = function () {
	if (Mimic.Ajax.instance === undefined) {
	    Mimic.Ajax.instance = new Mimic.Ajax();
	}

	return Mimic.Ajax.instance;
};

Mimic.HTTP = {
	'SUCCESS': 200,
	'INTERNAL_SERVER_ERROR': 500,
	'NOT_FOUND': 404	
};