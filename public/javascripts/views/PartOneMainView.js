var NUM_TRIALS_FAMILIARIZATION = 30;
var KEYCODE_ALT = 18;

define([
	'jquery',
	'underscore',
	'backbone',
	'commands',
	'menu',
	'text!../templates/main_view.html',
	'text!../templates/item_prompt.html',
	'views/PromptView',
	], function($, _, Backbone, Commands, Menu, mainTemplate, promptTemplate, PromptView) {
		var PartOneMainView = Backbone.View.extend({
			el: '#body-container',
			events: {
				'click .item': 'onClickItem',
			},
			initialize: function() {
				this.User = window.CMUser;

				this.currentData = {
					userID: this.User.id,
					interfaceType: (this.User.order % 2 ? 'R' : 'C'),
					commandSetId: Math.floor(this.User.order / 2),
					correct: true,
					parentIsDiff: false,
				};

				this.commandNames = Commands.getCommandNames();
				this.commandClasses = Commands.getCommandClasses();

				this.commandSequence = Commands.getValidSequence(
					this.currentData.commandSetId, 5); // yay magic numbers

				this.itemCount = 0;

				this.promptView = new PromptView();
				this.render();
			},
			render: function() {
				var template = _.template(mainTemplate);
				this.$el.html(template);
				
				this.renderPrompt(this.commandSequence[this.itemCount]);
				
				// Interface-specific command menu handling
				Menu.render(this.currentData.interfaceType);

				$('html').on('click', this.onClickOutsideTab);
			},
			renderPrompt: function(id) {
				var toRender = {
					dispClass: this.commandClasses[id],
                    name: this.commandNames[id],
				};
				console.log(toRender.dispClass + ' '+ toRender.name);
				this.promptView.render(toRender);
				this.startTime = new Date().getTime();
			},
			refreshCommand: function() {
				this.renderPrompt(this.commandSequence[this.itemCount]);
				// reset correct command selection tracker
				this.currentData.correct = true;
			},
			onClickItem: function(e) {
				console.log("click item");
				e.preventDefault();
				var clickedId = $(e.currentTarget).data('id');
				if (clickedId == this.commandSequence[this.itemCount]) {
					// collect relevant data to send off
					this.endTime = new Date().getTime();
					this.currentData.time = this.endTime - this.startTime;
					this.currentData.commandID = clickedId;

					console.log('clicked correctly!');
					// call endpoint to save row to database
					$.ajax('/db/trials', {
						type: 'PUT',
						data: this.currentData,
						error: function(err, status) { console.error(status + ' ' + err) },
						success: function() { console.log('data saved!') }
					});

					this.itemCount++;
					if (this.itemCount < NUM_TRIALS_FAMILIARIZATION) {
						this.refreshCommand();
					} else {
						Backbone.history.navigate('2-info', {trigger: true, replace: true});
					}
				} else {
					console.log('clicked incorrectly');
					this.currentData.correct = false;
					// play sound;
				}
			}, 
			remove: function() {
		        // Clean up after ourselves.
				$('html').on('click', this.onClickOutsideTab);
		        // ...
		    },
		});
		return PartOneMainView;

});
