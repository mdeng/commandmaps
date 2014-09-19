define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/preference.html'
	], function($, _, Backbone, instruct) {
		var InfoView = Backbone.View.extend({
			el: '#overlay-container',
			events: {
				'click button#button-pref-submit': 'onSubmit'
			},
			initialize: function() {
				console.log('initializing preference view');
				this.$el.removeClass('hidden');
				this.user = window.CMUser;
				this.render();
			},
			render: function() {
				var interfaces;
				if (this.user.order % 2 == 0) {
					interfaces = ['C', 'R'];
				} else {
					interfaces = ['R', 'C'];
				}
				this.$el.html(_.template(instruct, {variable: 'info'}) (interfaces));
			},
			onSubmit: function(e) {
				var self = this;
				var url = '/db/prefs';

		        var formData = {
		        	userID: this.user.id,
		            interfaceType: $("input[name='interfaceType']:checked").val()
		        };
				console.log('Submitting: user '+ formData.userID + ' interface '+ formData.interfaceType);
				//Backbone.history.navigate('goodbye', {trigger: true, replace: true});
		        $.ajax({
		            url: url,
		            type: 'PUT',
		            data: formData,
		            success: function(response) {
		                console.log(["response: ", response]);
		                
						self.undelegateEvents();
						Backbone.history.navigate('goodbye', {trigger: true, replace: true});
		            }
		        });
			}
		});
		return InfoView;

});
