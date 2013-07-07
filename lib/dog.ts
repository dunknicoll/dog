/// <reference path="PIXI.d"/>
/// <reference path="keyboard" />

class Dog 
{
	x			:	number;
	y			:	number;
	anSit		: 	any;
	anStand		: 	any;
	anWalk		: 	any;
	anMidSit	: 	any;
	anJump		: 	any;
	anFall		: 	any;
	sprite 		:	PIXI.MovieClip;
	loader 		:	PIXI.AssetLoader;
	stage 		:	PIXI.Stage;
	kbHandler	: 	KeyboardHandler;
	stateCounter:	number;
	resetCounter:	number;

	constructor( stage:PIXI.Stage, kbHandler:KeyboardHandler, x:number = 0, y:number = 0)
	{
		this.stage = stage;

		this.stateCounter = 0;
		this.resetCounter = 100;

		this.kbHandler = kbHandler;

		this.loader = new PIXI.AssetLoader(["../atlases/pixdog.json"]);

		this.loader.onComplete = this.onAtlasLoaded.bind(this);

		this.loader.load();

		this.x = x;
		this.y = y;
	};

	onAtlasLoaded()
	{
		this.anSit = this.addAnimation([9,10,9,11],"dog");
		this.anStand = this.addAnimation([5,6,5,7],"dog");
		this.anWalk = this.addAnimation([1,2,3,4],"dog");
		this.anMidSit = this.addAnimation([8,8,8,8,8,8,8,8,8,8],"dog");
		this.anJump = this.addAnimation([14,14,14,14,14,14],"dog");
		this.anFall = this.addAnimation([15,15,15,15,15,15],"dog");

		this.sprite = new PIXI.MovieClip(this.anSit);
		this.sprite.position.x = this.x;
		this.sprite.position.y = this.y;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.scale.x = 5;
		this.sprite.scale.y = 5;
		this.sprite.animationSpeed=0.1;
		this.sprite.play();

		this.stage.addChild(this.sprite);

	};

	update()
	{
		if( this.kbHandler.key(39) )
		{
			if( this.sprite.scale.x != 5 )
			{
				this.sprite.scale.x = 5;
			}
			this.sprite.position.x+=7;
			if( this.sprite.textures != this.anWalk )
			{
				this.sprite.textures = this.anWalk;
			}
			this.stateCounter = this.resetCounter;
		} 
		else if( this.kbHandler.key(37) )
		{
			if( this.sprite.scale.x != -5 )
			{
				this.sprite.scale.x = -5;
			}
			this.sprite.position.x-=7;
			if( this.sprite.textures != this.anWalk )
			{
				this.sprite.textures = this.anWalk;
			}
			this.stateCounter = this.resetCounter;
		}
		else
		{
			if( this.stateCounter == 0 )
			{
				this.stateCounter = 0;
				if( this.sprite && this.sprite.textures != this.anSit )
				{
					this.sprite.textures = this.anMidSit;
					this.sprite.loop = false;

					if( !this.sprite.playing )
					{
						this.sprite.textures = this.anSit;
						this.sprite.loop = true;
						this.sprite.play();
					}
				}
			}
			else
			{
				this.stateCounter--;
				if( this.sprite && this.sprite.textures != this.anStand )
				{
					this.sprite.textures = this.anStand;
				}
			}
		}
	};

	addAnimation(frames:number[],base:string)
	{
		var textures = [];
		for(var i in frames)
		{
			var texture = PIXI.Texture.fromFrame(base + "_" + frames[i] + ".png");
			textures.push(texture);
		}
		return textures;
	}
};