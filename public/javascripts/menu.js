define([
	'jquery',
	'underscore',
	'backbone'
	], function($, _, Backbone){
		var Menu = {
			hideRibbons: function() {
				$('#ribbon-container .ribbon').addClass('hidden');
			},
			showRibbons: function() {
				$('#ribbon-container .ribbon').removeClass('hidden');			
			},
			hideRibbon: function(name) {
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
			openRibbon: function(name) {
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
			// handlers
			onKeyDown: function(e) {
				var code = e.keyCode;
				if (code == KEYCODE_ALT) {
					Menu.showRibbons();
				}
			},
			onKeyUp: function(e) {
				var code = e.keyCode;
				if (code == KEYCODE_ALT) {
					Menu.hideRibbons();
				}
			},
			onClickInsideTab: function(e) {
				e.stopPropagation();
				var name = $(e.currentTarget).data('name');
				if (this.currentTab != name) {
					$('.tab').removeClass('navbar-tab-active');
					Menu.hideRibbons();

					Menu.currentTab = name;
					$(e.currentTarget).addClass('navbar-tab-active');
					Menu.openRibbon(name);
				}
				return true;
			},
			onClickOutsideTab: function(e) {
				this.currentTab = "";
				$('.tab').removeClass('navbar-tab-active');
				Menu.hideRibbons();
				return false;
			},
			render: function(mode) {
				if (mode == "R") { // ribbon
					console.log('initing Ribbon');
					$('#ribbon-container').addClass('mode-ribbon');
					$('.navbar-tabs').removeClass('hidden');
					$('.navbar-message').addClass('hidden');
					$('.tab').on('click', this.onClickInsideTab);
					$(document).on('click', this.onClickOutsideTab);
				} else { // command maps
					console.log('initing CM');
					$('#ribbon-container').addClass('mode-command-maps');
					$('.navbar-tabs').addClass('hidden');
					$('.navbar-message').removeClass('hidden');
					Menu.hideRibbons();
					$(document).on('keydown', this.onKeyDown);
					$(document).on('keyup', this.onKeyUp);
				}
			},
		};
		return Menu;
});

