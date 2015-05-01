/**
 * Copyright (c) 2015 Diogo Schneider
 * 
 * Made with Quick
 * 
 * https://github.com/dgsprb/quick
 */

(function () {

	"use strict";

	// imports
	for (var i in com.dgsprb.quick) window[i] = com.dgsprb.quick[i];

	// functions
	function main() {
		Quick.setName("Quick Sandbox");

		console.log("Welcome to Quick Sandbox!\n" +
			"\n" +
			"You can start by creating a scene:\n" +
			"// var scene = new Scene()\n" +
			"\n" +
			"Then initializing Quick with it:\n" +
			"// Quick.init(function () { return scene })\n" +
			"\n" +
			"Have fun!");
	}

	main();

})();
