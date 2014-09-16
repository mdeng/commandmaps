var NUM_TRIALS_FAMILIARIZATION = 1;
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
		var PartThreeMainView = Backbone.View.extend({
			el: '#body-container',
			events: {
				'click .item': 'onClickItem',
			},
			initialize: function() {
				this.User = window.CMUser;

				this.currentData = {
					userID: this.User.id,
					interfaceType: (this.User.order % 2 ? 'C' : 'R'),
					commandSetId: (1 - Math.floor(this.User.order / 2)),
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
				alert('click item ' + id + ": "+this.commandNames[id]);
				var data = {name: 'hi'};
				var template = _.template(promptTemplate, {info: data});
				this.$("#prompt-container").html(template);
			},
			refreshCommand: function() {
				this.renderPrompt(this.commandSequence[this.itemCount]);
			},
			onClickItem: function(e) {
				console.log("click item");
				e.preventDefault();
				var clickedId = $(e.currentTarget).data('id');
				if (clickedId == this.commandSequence[this.itemCount]) {
					console.log('clicked correctly!');
					this.itemCount++;
					if (this.itemCount < NUM_TRIALS_FAMILIARIZATION) {
						this.refreshCommand();
					} else {
						Backbone.history.navigate('4-info', {trigger: true, replace: true});
					}
				} else {
					console.log('clicked incorrectly');
					// play sound;
				}
			}, 
			remove: function() {
		        // Clean up after ourselves.
				$('html').on('click', this.onClickOutsideTab);
		        // ...
		    },
		});
		return PartThreeMainView;

});
