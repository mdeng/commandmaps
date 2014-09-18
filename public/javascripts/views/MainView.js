var NUM_TRIALS_FAMILIARIZATION = 30;
var NUM_TRIALS_PERFORMANCE = 90;
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
		var MainView = Backbone.View.extend({
			el: '#body-container',
			events: {
				'click .item': 'onClickItem',
				'click #button-next': 'onClickNext',
			},
			initialize: function(options) {
				this.user = window.CMUser;
				this.part = parseInt(options.part);

				var interfaceType = 'R';
				if (this.user.order % 2 == 0 && this.part < 3
						|| this.user .order % 2 == 1 && this.part >= 3) {
					interfaceType = 'C';
				}

				this.currentData = {
					userID: this.user.id,
					interfaceType: interfaceType,
					commandSetId: Math.floor(this.user.order / 2),
					correct: true,
				};

				console.log(this.currentData);

				this.commandNames = Commands.getCommandNames();
				this.commandClasses = Commands.getCommandClasses();

				this.commandSequence = Commands.getValidSequence(
					this.currentData.commandSetId, 5); // yay magic numbers

				this.itemCount = 0;
				this.stage = 0;

				this.numTrials = (this.part % 2 == 1) ? NUM_TRIALS_FAMILIARIZATION : NUM_TRIALS_PERFORMANCE;

				this.promptView = new PromptView();
				this.render();
			},
			render: function() {
				var template = _.template(mainTemplate);
				this.$el.html(template);
								
				// Interface-specific command menu handling
				Menu.init(this.currentData.interfaceType);

				$('html').on('click', this.onClickOutsideTab);
			},
			renderPrompt: function(id) {
				var toRender = {
					dispClass: this.commandClasses[id],
                    name: this.commandNames[id],
				};
				this.promptView.render(toRender);
			},
			onClickNext: function(e) {
				$(e.currentTarget).addClass('hidden');
				this.renderPrompt(this.commandSequence[this.itemCount]);
				Menu.setEnabled(true);
				this.startTime = Date.now();
			},
			moveToNext: function() {
				this.itemCount++;
				if (this.itemCount < this.numTrials) {
					this.$('#button-next').removeClass('hidden');
					this.promptView.hide();
					Menu.setEnabled(false);
				} else {
					if (this.part < 4) {
						Backbone.history.navigate('info/'+(this.part+1), {trigger: true, replace: true});
					} else {
						Backbone.history.navigate('prefs', {trigger: true, replace: true});
					}
				}
			},
			moveToNextAfterSave: function() {
				console.log('PUT-ing' + this.currentData);
				$.ajax('/db/trials', { 
					type: 'PUT', 
					data: this.currentData, 
					success: function(response) { 
						console.log(response);
						this.moveToNext();
					} 
				});
			},
			onClickItem: function(e) {
				console.log('click item');
				e.preventDefault();
				e.stopPropagation();
				var clickedId = $(e.currentTarget).data('id');
				if (clickedId == this.commandSequence[this.itemCount]) {
					console.log('clicked correctly!');
					this.currentData.time = Date.now() - this.startTime;

					console.log('part ' + this.part);
					if (this.part % 2 == 1) {
						this.moveToNext();
					} else {
						this.moveToNext();
						//this.moveToNextAfterSave();
					}
				} else {
					console.log('clicked incorrectly');
					// play sound;
				}
			},
			remove: function() {
		        // Clean up after ourselves.
				$('html').on('click', this.onClickOutsideTab);
		    },
		});
		return MainView;
});
