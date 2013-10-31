define(['PIXI', 'SAT'], function(PIXI, SAT) {

	Dlib = function( opts )
	{

	};

	Dlib.prototype.poly = function(Polygon, color)
	{
		var graphics = new PIXI.Graphics();
	    graphics.beginFill(color);

	    var point = Polygon.points;

	    var p1 = points.shift();
	    var p2 = points.shift();

	    graphics.moveTo(p1,p2);

	    var pointer = 2;

	    for(var i=0; i<points.length/2; i++)
		{
			var px = points[2*i];
			var py = points[2*i+1];
			graphics.lineTo(px, py);
		}
		
	    graphics.endFill();

	    return graphics;
	};

	return new Dlib;

});