(function () {

	"use strict";

	// imports
	var Animation = com.dgsprb.quick.Animation;
	var BaseTransition = com.dgsprb.quick.BaseTransition;
	var CommandEnum = com.dgsprb.quick.CommandEnum;
	var Quick = com.dgsprb.quick.Quick;
	var Frame = com.dgsprb.quick.Frame;
	var GameObject = com.dgsprb.quick.GameObject;
    var ImageFactory = com.dgsprb.quick.ImageFactory;
	var Rect = com.dgsprb.quick.Rect;
    var Scene = com.dgsprb.quick.Scene;

	// constants
	var CLOUD_IMAGE = document.getElementById("cloudSprite");
	var CLOUD_IMAGE_MIRROR = ImageFactory.mirror(CLOUD_IMAGE);

	// functions
	function main() {
		Quick.setName("Flap Demo");
		Quick.setNumberOfLayers(3);
		Quick.init(function () { return new GameScene() });
	}

	// classes
	var Background = (function () {

		function Background() {
			GameObject.call(this);
			this.setColor("Blue");
			this.setSize(Quick.getCanvasWidth(), Quick.getCanvasHeight());
		}; Background.prototype = Object.create(GameObject.prototype);

		return Background;

	})();

	var Cloud = (function () {

		function Cloud() {
			GameObject.call(this);
			this.setImage(CLOUD_IMAGE);
			this.setBoundary(new Rect(0, 0, Quick.getCanvasWidth(), Quick.getCanvasHeight()));
		}; Cloud.prototype = Object.create(GameObject.prototype);

		// override
		Cloud.prototype.offBoundary = function () {
			this.setLeft(Quick.getCanvasRight());
		};

		return Cloud;

	})();

	var Column = (function () {

		function Column() {
			GameObject.call(this);
			this.addTag("column");
			this.setColor("DarkGray");
			this.setHeight(Quick.getCanvasHeight());
			this.setSolid();
		}; Column.prototype = Object.create(GameObject.prototype);

		return Column;

	})();

	var Fog = (function () {

		function Fog() {
			GameObject.call(this);
			this.setLayerIndex(2);
		}; Fog.prototype = Object.create(GameObject.prototype);

		// override
		Fog.prototype.update = function () {
			if (this.getLeft() > -1 * this.getSpeedX() || this.getRight() < Quick.getCanvasWidth() - this.getSpeedX()) {
				var speed = this.getSpeedX();
				this.moveX(Quick.getCanvasWidth() * -1 * speed / Math.abs(speed));
			}
		};

		return Fog;

	})();

	var GameScene = (function () {

		function GameScene() {
			Scene.call(this);
			this.add(new Background());
			var cloud1 = new Cloud();
			cloud1.setSpeedX(-0.5);
			this.add(cloud1);
			var cloud2 = new Cloud();
			cloud2.setSpeedX(-1);
			cloud2.setRight(Quick.getCanvasWidth());
			cloud2.setImage(CLOUD_IMAGE_MIRROR);
			this.add(cloud2);
			var fog1 = new Fog();
			fog1.setImageId("fogSprite0");
			fog1.setRight(Quick.getCanvasWidth());
			fog1.setSpeedX(1);
			this.add(fog1);
			var fog2 = new Fog();
			fog2.setImageId("fogSprite1");
			fog2.setSpeedX(-1);
			this.add(fog2);
			this.player = new Player();
			this.wall = new Wall();
			this.add(this.player);
			this.add(this.wall);
		}; GameScene.prototype = Object.create(Scene.prototype);

		// override
		GameScene.prototype.getNext = function () {
			return new GameScene();
		};

		// override
		GameScene.prototype.getTransition = function () {
			return new BaseTransition();
		};

		return GameScene;

	})();

	var Player = (function () {

		var ANIMATION = new Animation([
			new Frame(document.getElementById("birdSprite0"), 4),
			new Frame(document.getElementById("birdSprite1"), 4),
			new Frame(document.getElementById("birdSprite2"), 4)
		]);

		function Player() {
			GameObject.call(this);
			this.controller = Quick.getController();
			this.pointer = Quick.getPointer();
			this.setAnimation(ANIMATION);
			this.setEssential();
			this.setLayerIndex(1);
			this.setSolid();
			this.setSize(16);
			this.setCenterX(Quick.getCanvasWidth() / 3);
			this.setCenterY(Quick.getCanvasHeight() / 3);
			this.setSpeedY(-7);
		}; Player.prototype = Object.create(GameObject.prototype);

		Player.prototype.flap = function () {
			this.setImageId("birdSprite0");
			this.setAnimation(ANIMATION);
			this.setSpeedY(-7);
			Quick.play("flapSound");
		};

		// override
		Player.prototype.onCollision = function (gameObject) {
			// checks for collisions with the columns
			if (gameObject.hasTag("column")) {
				Quick.play("fallSound");
				this.expire();
			}
		};

		// override
		Player.prototype.update = function () {
			// checks for falling off the bottom of the screen
			if (this.getTop() > Quick.getCanvasHeight()) {
				this.expire();
			} else if (this.getTop() < 0) {
				this.setTop(0);
			}

			// checks for A ou click for flapping or just apply some gravity
			if (this.controller.keyPush(CommandEnum.A) || this.pointer.getPush()) {
				this.flap();
			} else if (this.getSpeedY() < 7) {
				this.setSpeedY(this.getSpeedY() + 1);
			}
		};

		return Player;

	})();

	var Wall = (function () {

		function Wall() {
			GameObject.call(this);
			// the wall is only valid within our screen limits
			this.setBoundary(new Rect(0, 0, Quick.getCanvasWidth(), Quick.getCanvasHeight()));
			this.setColor("Gray");
			this.setWidth(16);
			this.setHeight(56);
			this.setLeft(Quick.getCanvasRight());
			this.setTop(Quick.random(Quick.getCanvasHeight() - this.getHeight()));
			this.setSpeedX(-2);
		}; Wall.prototype = Object.create(GameObject.prototype);

		// override
		Wall.prototype.init = function () {
			this.top = new Column();
			this.top.setBottom(this.getTop() - 1);
			this.top.setSpeedX(this.getSpeedX());
			this.top.setWidth(this.getWidth());
			this.top.setLeft(this.getLeft());
			this.getScene().add(this.top);

			this.bottom = new Column();
			this.bottom.setTop(this.getBottom() + 1);
			this.bottom.setSpeedX(this.getSpeedX());
			this.bottom.setWidth(this.getWidth());
			this.bottom.setLeft(this.getLeft());
			this.getScene().add(this.bottom);
		};

		// override
		Wall.prototype.offBoundary = function () {
			console.log("#");
			this.expire();
			this.bottom.expire();
			this.top.expire();
			this.getScene().add(new Wall());
		};

		return Wall;

	})();

	main();

})();
