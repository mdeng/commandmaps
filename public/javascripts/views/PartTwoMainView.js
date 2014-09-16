var NUM_TRIALS_2 = 3;
var KEYCODE_ALT = 18;

define([
	'jquery',
	'underscore',
	'backbone',
	'commands',
	'text!../templates/main_view.html',
	'text!../templates/item_prompt.html',
	'views/PromptView',
	], function($, _, Backbone, Commands, mainTemplate, promptTemplate, PromptView) {
		var PartOneMainView = Backbone.View.extend({
			el: '#body-container',
			events: {
				'click .item': 'onClickItem',
				'click .tab': 'onClickInsideTab',
			},
			onKeyDown: function(e) {
				var code = e.keyCode;
				if (code == KEYCODE_ALT) {
					$('.ribbon').removeClass('hidden');
				}
			},
			onKeyUp: function(e) {
				var code = e.keyCode;
				if (code == KEYCODE_ALT) {
					$('.ribbon').addClass('hidden');// TODO change to backbone
				}
			},
			closeTab: function(name) {
				$('.tab').removeClass('navbar-tab-active');
				switch (name) {
					case "font":
						$('#ribbon-font').addClass('hidden');
						break;				
					case "paragraph":
						$('#ribbon-paragraph').addClass('hidden');
						break;					
					case "insert":
						$('#ribbon-insert').addClass('hidden');	
						break;				
					case "drawing":
						$('#ribbon-drawing').addClass('hidden');
						break;			
					case "symbols":
						$('#ribbon-symbols').addClass('hidden');
						break;
					default:
						break;
				}
			},
			closeTabs: function() {
				$('.ribbon').addClass('hidden');
				this.currentTab = null;
			},
			openTab: function(name) {
				switch (name) {
					case "font":
						$('#ribbon-font').removeClass('hidden');
						break;				
					case "paragraph":
						$('#ribbon-paragraph').removeClass('hidden');
						break;					
					case "insert":
						$('#ribbon-insert').removeClass('hidden');	
						break;				
					case "drawing":
						$('#ribbon-drawing').removeClass('hidden');
						break;			
					case "symbols":
						$('#ribbon-symbols').removeClass('hidden');
						break;
					default:
						break;
				}
			},
			onClickInsideTab: function(e) {
				e.stopPropagation();
				var name = $(e.currentTarget).data('name');
				if (this.currentTab != name) {
					this.closeTab(this.currentTab);
					$(e.currentTarget).addClass('navbar-tab-active');
					this.openTab(name);
					this.currentTab = name;
				}
				return true;
			},
			onClickOutsideTab: function(e) {
				this.closeTabs();
				return false;
			},
			initialize: function() {
				_.bindAll(this, 'onClickInsideTab', 'onClickOutsideTab', 'onClickItem');

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
				if (this.currentData.interfaceType == 'R') {
					this.initRibbon();
				} else {
					this.initCommandMaps();
				}

				$('html').on('click', this.onClickOutsideTab);
			},
			initCommandMaps: function() {
				console.log('initing CM');
				this.$('#ribbon-container').addClass('mode-command-maps');
				this.$('#ribbon-container').addClass('hidden');
				$(document).on('keydown', this.onKeyDown);
				$(document).on('keyup', this.onKeyUp);
			},
			initRibbon: function() {
				console.log('initing Ribbon');
				this.$('#ribbon-container').addClass('mode-ribbon');
				this.$('#ribbon-container').removeClass('hidden');
			},
			renderPrompt: function(id) {
				alert('click item ' + id + ": "+this.commandNames[id]);
				var data = {name: 'hi'};
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
			},
			onClickTab: function(e) {
				e.preventDefault();
				console.log('clicked tab');
			},
			remove: function() {
		        // Clean up after ourselves.
				$('html').on('click', this.onClickOutsideTab);
		        // ...
		    },
		});
		return PartOneMainView;

});

