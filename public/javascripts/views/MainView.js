var NUM_TRIALS_FAMILIARIZATION = 20;
var NUM_TRIALS_PERFORMANCE = 40;
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
				'click .tab': 'onClickInsideTab',
			},
			initialize: function(options) {
				this.user = window.CMUser;

				this.part = parseInt(options.part);

				this.interfaceType = 'R';
			 	if (this.user.order % 2 == 0 && this.part < 3
						|| this.user.order % 2 == 1 && this.part >= 3) {
					this.interfaceType = 'C';
				}

				this.commandNames = Commands.getCommandNames();
				this.commandClasses = Commands.getCommandClasses();
				console.log('order '+ this.user.order);
				this.commandSetID = Math.floor((this.user.order - 1) / 2);  
				this.numTrials = (this.part % 2 == 1) ? NUM_TRIALS_FAMILIARIZATION : NUM_TRIALS_PERFORMANCE;
				this.commandSequence = Commands.getValidSequence(this.commandSetID, this.numTrials);
				this.trialCount = 0;

				this.promptView = new PromptView();
				this.render();
			},
			render: function() {
				var template = _.template(mainTemplate);
				this.$el.html(template);
								
				// Interface-specific command menu handling
				Menu.init(this.interfaceType);
			},
			renderPrompt: function(id) {
				console.log('rendering prompt for id '+id);
				var toRender = {
					dispClass: this.commandClasses[id],
                    name: this.commandNames[id],
				};
				this.promptView.render(toRender);
			},
			startTrial: function() {
				console.log('starting trial ' + this.trialCount);

				var targetCommandID = this.commandSequence[this.trialCount];
				var targetRibbonID = Commands.getRibbonID(targetCommandID);
				var needsRibbonSwitch = this.trialData != undefined && 
						this.trialData.targetRibbonID != targetRibbonID;

				this.trialData = {
					targetCommandID: targetCommandID,
					targetRibbonID: targetRibbonID,
					needsRibbonSwitch: needsRibbonSwitch, 
					numRibbonErrors: 0,
					numCommandErrors: 0,
					startTime: Date.now(),
				};

				this.renderPrompt(this.trialData.targetCommandID);
				Menu.setEnabled(true);
			},
			onClickNext: function(e) {
				$(e.currentTarget).addClass('hidden');
				this.startTrial();
			},
			prepareNext: function() {
				this.trialCount++;
				if (this.trialCount < this.numTrials) {
					this.$('#button-next').removeClass('hidden');
					this.promptView.hide();
					Menu.setEnabled(false);
				} else {
					this.undelegateEvents();
					$('.ribbon').remove();
					if (this.part < 4) {
						Backbone.history.navigate('info/'+(this.part+1), {trigger: true, replace: true});
					} else {
						Backbone.history.navigate('prefs', {trigger: true, replace: true});
					}
				}
			},
			saveAndPrepareNext: function() {
				var self = this;
				var dataToSave = {
					userID: this.user.id,
					commandSetID: this.commandSetID,
					interfaceOrder: this.part,
					interfaceType: this.interfaceType,
					commandID: this.trialData.targetCommandID,
					numCommandErrors: this.trialData.numCommandErrors,
					numRibbonErrors: this.trialData.numRibbonErrors,
					needsRibbonSwitch: this.trialData.needsRibbonSwitch,
					time: Date.now() - this.trialData.startTime,
				};
				console.log('PUT-ing');
				console.log(dataToSave);

				$.ajax('/db/trials', { 
					type: 'PUT', 
					data: dataToSave, 
					success: function(response) { 
						console.log(response);
						self.prepareNext();
					} 
				});
			},
			playSound: function(sound) {
				sound.pause();
                sound.currentTime = 0;
                sound.play();
			},
			onClickInsideTab: function(e) {
				var clickedRibbonID = parseInt($(e.currentTarget).data('id'));
				if (clickedRibbonID != this.trialData.targetRibbonID) {
					console.log('wrong ribbon: clicked ribbon id '+ clickedRibbonID+ ', target '+this.trialData.targetRibbonID);
					this.trialData.numRibbonErrors++;
				}
			},
			onClickItem: function(e) {
				e.preventDefault();
				e.stopPropagation();
				var clickedID = $(e.currentTarget).data('id');
				if (clickedID == this.trialData.targetCommandID) {
					console.log('clicked correctly!');
					if (this.part % 2 == 1) {
						this.prepareNext();
					} else {
						this.saveAndPrepareNext();
					}
				} else {
					console.log('clicked incorrectly');
					this.trialData.numCommandErrors++;
					
					this.playSound($('#beep')[0]);
				}
			},
		});
		return MainView;
});
