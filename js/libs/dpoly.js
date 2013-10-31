define(['PIXI', 'SAT', 'PolyK'], function(PIXI, SAT, PolyK) {

	Dpoly = function( opts )
	{
		for ( opt in opts ) this[opt] = opts[opt];

		this.cob = this._SPoly();
		this.rob = this._PPoly();

		var ab = PolyK.GetAABB( this.cob.pointsArray() );

		this.stage.addChild(this.rob);

	};

	Dpoly.prototype._PPoly = function()
	{
		var graphics = new PIXI.Graphics();
	    graphics.beginFill(this.color);

	    var points = this.cob.points;
	    graphics.moveTo(this.cob.points[0].x,this.cob.points[0].y);

	    for(var i=0; i<points.length; i++)
		{
			var px = points[i].x;
			var py = points[i].y;
			graphics.lineTo(px, py);
		}

		graphics.lineTo(this.cob.points[0].x,this.cob.points[0].y);
		
	    graphics.endFill();

	    return graphics;
	};


	Dpoly.prototype._SPoly = function()
	{
		var points = this.points;

	    var p1 = points.shift();
	    var p2 = points.shift();

	    var vectorArray = [];

	    for(var i=0; i<points.length/2; i++)
		{
			var px = points[2*i];
			var py = points[2*i+1];
			vectorArray.push(new SAT.Vector(px,py));
		}

		var polygon = new SAT.Polygon(new SAT.Vector(), vectorArray);

		return polygon;
	};

	return Dpoly;

});