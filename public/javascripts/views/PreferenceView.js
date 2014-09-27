define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/preference.html'
	], function($, _, Backbone, instruct) {
		var InfoView = Backbone.View.extend({
			el: '#overlay-container',
			events: {
				'click button#button-pref-submit': 'onSubmit',
				'change input[name="age"]': 'onAgeChange'
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
				e.preventDefault();
				if (!this.hasError()) {
					var self = this;
					var url = '/db/prefs';

			        var formData = {
			        	userID: this.user.id,
			            interfaceType: $("input[name='interfaceType']:checked").val(),
			            age: parseInt($("input[name='age']").val()),
			            gender: $("input[name='gender']:checked").val(),
			            isTurk: window.isTurk,
			        };
					console.log('Submitting:');
					console.log(formData);
					
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
			},
			hasError: function() {
				var hasError = false;
				if (!$("input[name='interfaceType']:checked").val()) {
					hasError = true;
					$('#error-interface').addClass('show-error');
					console.log('interface error');
				} else {
					$('#error-interface').removeClass('show-error');
				}
				var age = parseInt($("input[name='age']").val());
				console.log('age: '+age);
				if (!$.isNumeric(age) || age < 1 || age > 120) {
					hasError = true;
					$('#error-age').addClass('show-error');
					console.log('age error');
				} else {
					$('#error-age').removeClass('show-error');
				}
				if (!$("input[name='gender']:checked").val()) {
					hasError = true;
					$('#error-gender').addClass('show-error');
					console.log('gender error');
				} else {
					$('#error-gender').removeClass('show-error');
				}
				return hasError;
			}
		});
		return InfoView;

});
