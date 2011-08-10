/*global Mimic, jasmine */
if (typeof jasmine !== 'undefined') {
	var describeForAjax = jasmine.Env.prototype.describe;
	jasmine.Env.prototype.describe = function (description, specDefinitions) {
		return describeForAjax.call(this, description, function () {
			var ajax = Mimic.Ajax.getInstance();
			ajax.start();
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
			func.call(this, Mimic.Ajax.getInstance().request);
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
	
	this.request = function (url) {
		return matchers(url);
	};
	
	this.start = function () {
		XMLHttpRequest = function () {
			this.onreadystatechange = undefined;
			this.readyState = -1;
			this.responseText = null;
			this.responseXML = null;
			this.status = -1;
			this.statusText = null;
			this.open = function (method, url, async, user, password) {
				var i; 
				for (i = 0; i < data.length; i += 1) {
					if (data[i].url === url) {
						this.responseText = data[i].text;
						this.status = data[i].status;
						this.readyState = 4;
					}
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