define(['SAT'], function(SAT) {
    // Do something with the dependencies
    
    Dog = function( opts )
    {
    	for ( opt in opts ) this[opt] = opts[opt];

		this.x				= this.x || 50;
		this.y				= this.y || 50;
		this.anSit 			= this.anSit || {};
		this.anStand 		= this.anStand || {};
		this.anWalk 		= this.anWalk || {};
		this.anMidSit 		= this.anMidSit || {};
		this.anJump 		= this.anJump || {};
		this.anFall 		= this.anFall || {};
		this.rob 			= this.rob || {};
		this.dd 			= this.dd || {};
		this.cob 			= this.cob || {};
		this.loader 		= this.loader || new PIXI.AssetLoader(["../atlases/pixdog.json"]);
		this.stage 			= this.stage || {};
		this.kbHandler 		= this.kbHandler || {};
		this.stateCounter	= this.stateCounter || 0;
		this.resetCounter	= this.resetCounter || 100;
		this.loaded 		= this.loaded || false;
		this.bb 			= this.bb || new PIXI.Graphics();
		this.velx 			= this.velx || 5.2;
		this.vely 			= this.vely || 5.2;
		this.speedx 		= this.speedx || 0.5;
		this.speedy 		= this.speedy || 0.5;
		this.collided 		= this.collided || false;
		this.hit 			= this.hit || false;

		this.loader.onComplete = this.onAtlasLoaded.bind(this);
		this.loader.load();
    };

    Dog.prototype.onAtlasLoaded = function()
	{
		this.anSit = this.addAnimation([9,10,9,11],"dog");
		this.anStand = this.addAnimation([5,6,5,7],"dog");
		this.anWalk = this.addAnimation([1,2,3,4],"dog");
		this.anMidSit = this.addAnimation([8,8,8,8,8,8,8,8,8,8],"dog");
		this.anJump = this.addAnimation([14,14,14,14,14,14],"dog");
		this.anFall = this.addAnimation([15,15,15,15,15,15],"dog");

		this.rob = new PIXI.MovieClip(this.anSit);
		this.rob.position.x = this.x;
		this.rob.position.y = this.y;
		this.rob.anchor.x = 0.5;
		this.rob.anchor.y = 0.5;
		this.rob.scale.x = 5;
		this.rob.scale.y = 5;
		this.rob.animationSpeed=0.1;
		this.rob.play();

		this.dd = this._debugDraw();

		this.stage.addChild(this.dd);
		this.stage.addChild(this.rob);
		// this.stage.addChild(this.bb);

		this.loaded = true;
		this.hit = false;
	};

	Dog.prototype._debugDraw = function()
	{
		var graphics = new PIXI.Graphics();
	    graphics.beginFill("0xFF0000");

	    var cobArray = [];

	    graphics.moveTo(-this.rob.width/3,-this.rob.height/4);
		cobArray.push(new SAT.Vector(this.rob.width/3,-this.rob.height/4));

		graphics.lineTo(this.rob.width/3,-this.rob.height/4);
		cobArray.push(new SAT.Vector(this.rob.width/3,-this.rob.height/4));

		graphics.lineTo(this.rob.width/3,this.rob.height/4);
		cobArray.push(new SAT.Vector(this.rob.width/3,this.rob.height/4));

		graphics.lineTo(-this.rob.width/3,this.rob.height/4);
		cobArray.push(new SAT.Vector(-this.rob.width/3,this.rob.height/4));

		graphics.lineTo(-this.rob.width/3,-this.rob.height/4);
		cobArray.push(new SAT.Vector(-this.rob.width/3,-this.rob.height/4));

		this.cob = new SAT.Polygon(new SAT.Vector(), cobArray);
		
	    graphics.endFill();

	    return graphics;
	};

	Dog.prototype.update = function(isc)
	{
		if( this.loaded )
		{
			/*var angle = Math.atan(isc.norm.y/isc.norm.x);
			angle -= 1.57;
			if( angle <= -1.57 )
			{
				angle -= 3.14;
			}*/
			/*this.rob.rotation = angle;*/

			if( this.kbHandler.key(40) )
			{
				this.rob.position.y+=7;
				this.x = this.rob.position.x;
				this.y = this.rob.position.y;
			}
			else if( this.kbHandler.key(38) )
			{
				this.rob.position.y-=7;
				this.x = this.rob.position.x;
				this.y = this.rob.position.y;
			}

			if( this.kbHandler.key(39) )
			{
				if( this.rob.scale.x != 5 )
				{
					this.rob.scale.x = 5;
				}
				this.rob.position.x+=7;
				this.x = this.rob.position.x;
				this.y = this.rob.position.y;
				if( this.rob.textures != this.anWalk )
				{
					this.rob.textures = this.anWalk;
				}
				this.stateCounter = this.resetCounter;
			} 
			else if( this.kbHandler.key(37) )
			{
				if( this.rob.scale.x != -5 )
				{
					this.rob.scale.x = -5;
				}
				this.rob.position.x-=7;
				this.x = this.rob.position.x;
				this.y = this.rob.position.y;
				if( this.rob.textures != this.anWalk )
				{
					this.rob.textures = this.anWalk;
				}
				this.stateCounter = this.resetCounter;
			}
			else
			{
				if( this.stateCounter == 0 )
				{
					this.stateCounter = 0;
					if( this.rob && this.rob.textures != this.anSit )
					{
						this.rob.textures = this.anMidSit;
						this.rob.loop = false;

						if( !this.rob.playing )
						{
							this.rob.textures = this.anSit;
							this.rob.loop = true;
							this.rob.play();
						}
					}
				}
				else
				{
					this.stateCounter--;
					if( this.rob && this.rob.textures != this.anStand )
					{
						this.rob.textures = this.anStand;
					}
				}
			}

			// this.rob.position.y+=this.vely;
			this.y=this.rob.position.y;

			if( this.collided && !this.hit )
			{
				this.vely*=-1;
				this.hit = true;
			}

			this.cob.pos.x = this.x;
			this.cob.pos.y = this.y;
			/*
			this.cob.w = this.rob.width;
			this.cob.h = this.rob.height;*/

			this.dd.position.x = this.x;
			this.dd.position.y = this.y;
			
/*			if(isc.dist > 0.5 && !this.collided)
			{
				this.hit = false;
			}

			if(isc.dist > 24 && this.rob != undefined)
			{
				this.rob.position.y+=5;
				this.y = this.rob.position.y;
			}*/
		}
	};

	Dog.prototype.collision = function(poly,isc)
	{
		if( this.loaded )
		{
			if( PolyK.ContainsPoint(poly, this.rob.position.x, this.rob.position.y) )
			{
				// this.rob.position.x = isc.point.x;
				// // this.x = this.rob.position.x;
				// this.rob.position.y = isc.point.y;
				// // this.y = this.rob.position.y;
				this.collided = true;
			}
			else
			{
				// console.log(this.rob.position);
				this.collided = false;
			}
		}
	};

    Dog.prototype.addAnimation = function(frames,base)
	{
		var textures = [];
		for(var i in frames)
		{
			var texture = PIXI.Texture.fromFrame(base + "_" + frames[i] + ".png");
			textures.push(texture);
		}
		return textures;
	};

    // Pump out a return obj
    return Dog;
});