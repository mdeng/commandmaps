define([
	'jquery',
	'underscore',
	'backbone',
	'commands',
	'text!../templates/item_prompt.html',
	], function($, _, Backbone, Commands, instruct) {
		var PromptView = Backbone.View.extend({
			el: '#prompt-container',
			initialize: function() {
			},
			render: function(item) {
				var template = _.template(instruct, {variable: 'info'})(item);
				$('#prompt-container').html(template);
				$('#prompt-container').removeClass('hidden');
			},
			hide: function() {
				$('#prompt-container').addClass('hidden');
			}
		});
		return PromptView;

});
