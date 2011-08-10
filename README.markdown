mimic-ajax is a small addition to jasmine, and allows developers to stub the XMLHttpRequest object with syntax familiar to jasmine users.

Releases
========

* [mimic-ajax-0.1](https://github.com/azzamallow/mimic-ajax/blob/master/release/mimic.ajax.0.1.js) [min](https://github.com/azzamallow/mimic-ajax/blob/master/release/mimic.ajax.0.1-min.js)

Example
======

	describe('Mimic.Ajax', function() {
		beforeEach(function() {
			jQuery('body').append('<div id="tweet"></div>');
		});
	
		afterEach(function() {
			jQuery('#tweet').remove();
		});

		it('should grab an example tweet from twitter', function (request) {
			request('http://www.twitter.com/example.tweet').toHaveResponse(Mimic.HTTP.SUCCESS, 'Here is my example tweet');
		
			var success = function(response) {
				jQuery('#tweet').text(response);
			}
			jQuery.ajax({'url': 'http://www.twitter.com/example.tweet', 'success': success });

			expect(jQuery('#tweet').text()).toEqual('Here is my example tweet');
		});	
	});