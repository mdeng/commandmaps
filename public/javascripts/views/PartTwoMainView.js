var NUM_TRIALS_2 = 90;

define([
	'jquery',
	'underscore',
	'backbone',
	'commands',
	'text!../templates/main_view.html',
	'text!../templates/item_prompt.html',
	'views/PromptView',
	], function($, _, Backbone, Commands, mainTemplate, promptTemplate, PromptView) {
		var PartTwoMainView = Backbone.View.extend({
			el: '#body-container',
			events: {
				'click .item': 'onClickItem'
			},
			initialize: function() {
				this.User = window.CMUser;

				this.currentData = {
					userID: this.User.id,
					interfaceType: (this.User.order % 2 ? 'R' : 'C'),
					commandSetId: Math.floor(this.User.order / 2),
					correct: true,
				};

				this.commandNames = Commands.getCommandNames();
				this.commandClasses = Commands.getCommandClasses();

				this.commandSequence = Commands.getValidSequence(
					this.currentData.commandSetId, 15);

				this.itemCount = 0;

				this.promptView = new PromptView();
				this.render();
			},
			render: function() {
				var template = _.template(mainTemplate);
				this.$el.html(template);
				this.renderPrompt(this.commandSequence[this.itemCount]);
			},
			initCommandMaps: function() {

			},
			initRibbon: function() {

			},
			renderPrompt: function(id) {
				console.log('rendering item ' + id + ": "+this.commandNames[id]);
				var data = {name: 'hi'};
				console.log(data.name);
				var template = _.template(promptTemplate, {info: data});
				this.$("#prompt-container").html(template);

				this.startTime = Date.now();
			},
			refreshCommand: function() {
				this.renderPrompt(this.commandSequence[this.itemCount]);
			},
			onClickItem: function(e) {
				e.preventDefault();
				var clickedId = $(e.currentTarget).data('id');
				if (clickedId == this.commandSequence[this.itemCount]) {
					console.log('clicked correctly!');
					this.currentData.time = Date.now() - this.startTime;
					this.currentData.commandID = clickedId;
					console.log('PUT-ing' + this.currentData);
					$.ajax("/db/trials", { type: "PUT", data: this.currentData, success: function(response) { 
							console.log(response);
							// next one
							this.itemCount++;
							if (this.itemCount < NUM_TRIALS_2) {
								this.refreshCommand();
							} else {
								Backbone.history.navigate('3-info', {trigger: true, replace: true});
							}
						} 
					});
				} else {
					this.currentData.correct = false;
					console.log('clicked incorrectly');
					// play sound;
				}
			}
		});
		return PartTwoMainView;

});
