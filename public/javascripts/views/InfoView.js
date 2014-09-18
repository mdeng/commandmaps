define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/info.html'
	], function($, _, Backbone, instruct) {
		var InfoView = Backbone.View.extend({
			el: '#overlay-container',
			events: {
				'click button#button-info-confirm': 'onConfirm'
			},
			initialize: function(options) {
				console.log('these are options: ');
				console.log(options);
				this.$el.removeClass('hidden');
				// called when you init the view
				// for example, you can then render the view
				this.part = options.part; 
				console.log('init part '+ options.part + " " +this.part);
				this.render();
			},
			render: function() {
				var toRender = {
					part: this.part
				};
				this.$el.html(_.template(instruct, {variable: 'info'})(toRender));
			},
			onConfirm: function(e) {
				// handle the event defined above
				this.$el.addClass('hidden');
				this.undelegateEvents();
				Backbone.history.navigate('main/'+this.part, {trigger: true, replace: true});
			}
		});
		return InfoView;

});
