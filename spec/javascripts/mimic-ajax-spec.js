describe('Mimic.Ajax', function() {
	beforeEach(function() {
		if (jQuery('#hello').length === 0) {
			jQuery('body').append('<div id="hello"></div>');			
		}
	});
	
	afterEach(function() {
		jQuery('#hello').empty();
	});
	
	it('should provide a request', function (request) {
		expect(request).toBeDefined();
	});
	
	describe('nested describe with a before stubbing ajax', function (request) {
		beforeEach(function() {
			request('http://www.twitter3.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'called with jquery');
		});
		
		it('should still pass', function (request) {
			var success = function(response) {
				jQuery('#hello').text(response);
			}
			jQuery.ajax({'url': 'http://www.twitter3.com', 'success': success });

			expect(jQuery('#hello').text()).toEqual('called with jquery');
		});
	});

	it('should provide basic ajax request and response stubbing', function (request) {
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'hello world');

		tweet = new XMLHttpRequest();
		tweet.onreadystatechange = function(response) {
			jQuery('#hello').text(response.responseText);
		}
		tweet.open("GET", "http://www.twitter.com", true);
		tweet.send();
		
		expect(jQuery('#hello').text()).toEqual('hello world');
	});
	
	it('should set the neccassary variables on the XMLHttpRequest with a successful response', function (request) {
		request('http://www.twitter2.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'hello world');
		
		tweet = new XMLHttpRequest();
		tweet.open("GET", "http://www.twitter2.com", true);
		tweet.send();
		
		expect(tweet.status).toEqual(200);
		expect(tweet.readyState).toEqual(4);
	});
	
	it('should allow basic ajax request and response stubbing when using jQuery ajax call', function (request) {
		request('http://www.twitter3.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'called with jquery');
		
		var success = function(response) {
			jQuery('#hello').text(response);
		}
		jQuery.ajax({'url': 'http://www.twitter3.com', 'success': success });
		
		expect(jQuery('#hello').text()).toEqual('called with jquery');
	});	
	
	it('should allow ajax stubbing when using jQuery getJSON call', function (request) {
		request('http://www.twitter4.com').toHaveResponse(Mimic.HTTP.SUCCESS, '[1,2,3,4]');
		
		var success = function(data) {
			jQuery('#hello').text(data.join(','));
		}
		
		jQuery.getJSON('http://www.twitter4.com', success);
		expect(jQuery('#hello').text()).toEqual('1,2,3,4');
	});
	
	it('should allow a 500 response', function (request) {
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.INTERNAL_SERVER_ERROR);
		
		var error = function(response) {
			jQuery('#hello').text(response.status);
		}
		
		jQuery.ajax({'url': 'http://www.twitter.com', 'error': error });
		expect(parseInt(jQuery('#hello').text())).toEqual(Mimic.HTTP.INTERNAL_SERVER_ERROR);
	});
	
	it('should override the previous response specified', function (request) {
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.INTERNAL_SERVER_ERROR, 'shouldnt be called');
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'should be called');
		
		var success = function(response) {
			jQuery('#hello').text(response);
		}
		
		jQuery.ajax({'url': 'http://www.twitter.com', 'success': success });
		expect(jQuery('#hello').text()).toEqual('should be called');
	});
	
	it('should actually do a real request because there was nothing stubbed', function (request) {
		var success = function() {
			jQuery('#hello').text('went to real XMLHttpRequest');
		}
		
		jQuery.ajax({'url': 'http://localhost:8888/', 'success': success });
		
		waits(10);
		runs(function () {
			expect(jQuery('#hello').text()).toEqual('went to real XMLHttpRequest');			
		});
	});
	
	describe('it should reset the stubs', function () {
		it('should stub a request for checkout the stubs', function (request) {
			request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'something');
			
			tweet = new XMLHttpRequest();
			tweet.onreadystatechange = function(response) {
				expect(response.status).toEqual(200);
			}
			tweet.open("GET", "http://www.twitter.com", true);
			tweet.send();
		});
		
		afterEach(function () {
			tweet = new XMLHttpRequest();
			tweet.onreadystatechange = function(response) {
				expect(response.status).not.toEqual(200);
			}
			tweet.open("GET", "http://www.twitter.com", true);
			tweet.send();
		});
	});
	
	it('should throw an error if a stub was created but it went to the wrong url', function (request) {
		request('http://www.twitter.com').toHaveResponse(Mimic.HTTP.SUCCESS, 'something');
		
		var error = function(response) {
			jQuery('#hello').text('should throw an error');
		}
		
		jQuery.ajax({'url': 'http://www.yahoo.com', 'error': error });
		expect(jQuery('#hello').text()).toEqual('should throw an error');
	})
});