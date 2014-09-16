define([
	'jquery',
	'underscore',
	'backbone',
	'commands',
	'text!../templates/item_prompt.html',	
	], function($, _, Backbone, instruct) {
		var PartOneMainView = Backbone.View.extend({
			el: '#prompt-container',
			events: {
			},
			initialize: function() {
				this.User = window.CMUser;
				console.log(this.User);
				this.useCommandMaps = this.User.order % 2;
				this.commandSet = 'x';//Commands.commandSets[Math.floor(this.User.order / 2)];
				console.log(this.useCommandMaps);
				console.log(this.commandSet);
				this.itemCount = 0;
				this.render(this.itemCount);
			},
			render: function(itemCount) {
				_.templateSettings.variable = 'info';
				this.$el.html(_.template(instruct));
			},
		});
		return PartOneMainView;

});
