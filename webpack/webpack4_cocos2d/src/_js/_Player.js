import Utils from './_Utils.js';

export default class extends cc.Sprite {
	constructor() {
		super(Utils.resources[0]);

		this.anchorX = 0.5;
		this.anchorY = 0.5;
		this.setPosition(0, 0);
		this.scale = 0.5;
		this.rot = 0;

		this.scheduleUpdate();
	}

	update() {
		this.rot += 6;
		let rad = this.rot * Utils.toRad;
		let radius = 50;
		var stageSize = cc.director.getWinSize();
		this.x = Math.cos(rad) * radius + stageSize.width * 0.5;
		this.y = Math.sin(rad) * radius + stageSize.height * 0.5;
	}
}
