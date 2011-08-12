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