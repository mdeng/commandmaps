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
				console.log(options);
				this.$el.removeClass('hidden');
				// called when you init the view
				// for example, you can then render the view
				this.part = options.part; 
				console.log('init part '+ options.part + " " +this.part);
				this.render();
			},
			render: function() {
				var message;
				switch (this.part) {
					case 1: 
						message = 'The following 30 trials will get you acquainted with Interface A.';
						break;						
					case 3:
						message = 'The following 30 trials will get you acquainted with Interface B.';
						break;
					default:
						message = 'The following 90 trials will use the command selection interface you have just seen.';
						break;
				}
				var toRender = {
					part: this.part,
					message: message
				};
				this.$el.html(_.template(instruct, {variable: 'info'}) (toRender));
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
