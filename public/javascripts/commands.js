define([
	'jquery',
	'underscore',
	'backbone'
	], function($, _, Backbone){
		var Commands = {
			namesDict: {
				"Font": ["Font", "Bold", "Italic", "Underline", "Strikethrough", "Subscript", "Superscript", "Font Width", "Font Height", "Header", "Code Format", "Hyperlink"],
				"Paragraph": ["New Paragraph", "Left Align", "Center", "Right Align", "Justify", "Columns", "Indent", "Unindent", "Numbered List", "Bulleted List", "Sort Descending", "Sort Ascending"],
				"Insert": ["Open Folder", "Create Table", "Area Chart", "Pie Chart", "Bar Graph", "Line Chart", "Import Word", "Import Excel", "Import PDF", "Insert Picture", "Insert Audio", "Insert Video"],
				"Drawing": ["Pencil", "Paintbrush", "Eraser", "Eyedropper", "Blur", "Auto Retouch", "Draw Circle", "Draw Square", "Draw Line", "Crop", "Rotate Counterclockwise", "Rotate Clockwise"],
				"Symbols": ["Left Arrow", "Right Arrow", "Up Arrow", "Down Arrow", "Circle", "Times", "Heart", "Star", "Asterisk", "Euro", "Yen", "Pound"],
			},
			allCommands: [
				"Font", "Bold", "Italic", "Underline", "Strikethrough", "Subscript", "Superscript", "Font Width", "Font Height", "Header", "Code Format", "Hyperlink",
				"New Paragraph", "Left Align", "Center", "Right Align", "Justify", "Columns", "Indent", "Unindent", "Numbered List", "Bulleted List", "Sort Descending", "Sort Ascending",
				"Open Folder", "Create Table", "Area Chart", "Pie Chart", "Bar Graph", "Line Chart", "Import Word", "Import Excel", "Import PDF", "Insert Picture", "Insert Audio", "Insert Video",
				"Pencil", "Paintbrush", "Eraser", "Eyedropper", "Blur", "Auto Retouch", "Draw Circle", "Draw Square", "Draw Line", "Crop", "Rotate Counterclockwise", "Rotate Clockwise",
				"Left Arrow", "Right Arrow", "Up Arrow", "Down Arrow", "Circle", "Times", "Heart", "Star", "Asterisk", "Euro", "Yen", "Pound"
			],
			commandSets: [
				[0, 2, 19, 16, 50, 55],
				[4, 11, 23, 15, 54, 55],
			],
			shuffle: function(array) {
			    var counter = array.length, temp, index;

			    // While there are elements in the array
			    while (counter > 0) {
			        // Pick a random index
			        index = Math.floor(Math.random() * counter);

			        // Decrease counter by 1
			        counter--;

			        // And swap the last element with it
			        temp = array[counter];
			        array[counter] = array[index];
			        array[index] = temp;
			    }
			    return array;
			},
			inSameSet: function(id1, id2) {
				return Math.floor(id1/12) == Math.floor(id2/12);
			},
			numRibbonSwitches: function(commandSet) {
				var numSwitches = 0;
				for (var i = 1; i < commandSet.length; i++) {
					if (!inSameSet(commandSet[i], commandSet[i-1])) {
						numSwitches++;
					}
				}
				console.log("num switches: " + numSwitches);
				return numSwitches;
			},
			shuffleValid: function(commandSet) {
				// note: this permutes the actual commandSet passed in
				do {
					shuffle(commandSet);
				} while (numRibbonSwitches(commandSet) != 3);
			},
		};
		return Commands;
});

