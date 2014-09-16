define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/part_two_info.html'
	], function($, _, Backbone, instruct) {
		
		var PartOneInfoView = Backbone.View.extend({
			el: '#overlay-container',
			events: {
				'click button#btn-begin': 'onClickBegin'
			},
			initialize: function() {
				this.$el.removeClass('hidden');
				// called when you init the view
				// for example, you can then render the view
				this.render();
			},
			render: function() {
				_.templateSettings.variable = 'info';
				this.$el.html(_.template(instruct));
			},
			onClickBegin: function(e) {
				// handle the event defined above
				this.$el.addClass('hidden');
				location.href = '2-main';
			}
		});
		return PartOneInfoView;

});
