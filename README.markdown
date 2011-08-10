mimic-ajax is a small addition to jasmine which allows developers to stub the XMLHttpRequest object with syntax familiar to jasmine users.

Releases
========

* version 0.1
 * [mimic-ajax](https://raw.github.com/azzamallow/mimic-ajax/master/release/mimic.ajax.0.1.js)
 * [mimic-ajax-min](https://raw.github.com/azzamallow/mimic-ajax/master/release/mimic.ajax.0.1-min.js)

Example
======

	describe('Mimic.Ajax', function() {
		it('should grab an example tweet from twitter', function (request) {
			request('http://www.twitter.com/example.tweet').toHaveResponse(Mimic.HTTP.SUCCESS, 'Here is my example tweet');
		
			var success = function(response) {
				jQuery('#tweet').text(response);
			}
			jQuery.ajax({'url': 'http://www.twitter.com/example.tweet', 'success': success });

			expect(jQuery('#tweet').text()).toEqual('Here is my example tweet');
		});	
	});