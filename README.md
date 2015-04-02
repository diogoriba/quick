Quick
=====
![Quick](http://dgsprb.github.io/games/quick.png)

open multi-platform game engine

## About
Quick aims to provide a multi-platform, lightweight, easy-to-use engine to be used on game development, focusing in performance, quick development and maintainability. Based on the original engine used in Starship and Ms. Starship and using the techniques displayed on [JavaScript with Classes](http://dgsprb.github.io/JavaScriptwithClasses.pdf), it has evolved with the continuous addition of new features.

Though mainly focused on building games to be released at the Chrome Web Store, it runs on any modern JavaScript runtime, from personal computers with gamepads and keyboards to personal digital assistants with touch screens. Write once, run everywhere... now for real.

## Advantages
  * Virtual resolution;
  * Common user interface for gamepad or keyboard;
  * Multiplatform at the core;
  * No dependencies;
  * Easy to use;
  * Open - Feel free to use, read and improve the code.

## How to use
1. Add a reference to the latest minified version:
```
<script src="https://cdn.rawgit.com/dgsprb/quick/master/target/engine-20150205.min.js"></script>
```
2. Initialize the engine passing the canvas and first scene as arguments:
```
function main() {
    Quick.setName("My Game");
    Quick.init(document.getElementById("canvas"), GameScene);
}
```

Please check the [Wiki](https://github.com/dgsprb/quick/wiki) for API, demos, games and additional information.
