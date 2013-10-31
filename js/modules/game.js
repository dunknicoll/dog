define(['jQuery','modules/dog','libs/dpoly', 'PIXI', 'PolyK', 'EventDispatcher', 'libs/keyboard'],
function( $, Dog, Dpoly, PIXI, PolyK, EventDispatcher, KeyboardHandler )
{

    Game = function()
    {
        var self = this;
        $(function()
        {
            self.kbHandler          = new KeyboardHandler( window );
            self.kbHandler.capture  = true;

            self.response           = new SAT.Response();

            self.renderer = new PIXI.WebGLRenderer(800, 600);

            self.poly = [50, 362, 213, 342, 421, 284, 536, 272, 659, 272, 772, 280, 886, 342, 963, 394, 963, 430, 55, 430, 50, 362];


            self.stage = new PIXI.Stage;
            //( stage:PIXI.Stage, kbHandler:KeyboardHandler, x:number = 0, y:number = 0)
            self.dog = new Dog({"stage":self.stage,"kbHandler":self.kbHandler,"x":100,"y":50});
            self.platform = new Dpoly({"stage":self.stage,"points":self.poly,"color":"0x0000FF"});

/*            self.isc = new PolyK.ClosestEdge(self.poly, self.dog.x, self.dog.y);
            self.marker = new PIXI.Graphics();
            self.stage.addChild(self.marker);
*/
            // self.kbHandler.slowKey( 39, self.moveDogRight.bind(self) );
            // self.kbHandler.slowKey( 37, self.moveDogLeft.bind(self) );

            document.body.appendChild(self.renderer.view);
            self.tick();
        });
    }

    Game.prototype.tick = function()
    {
        this.renderer.render(this.stage);

        /*this.isc = new PolyK.ClosestEdge(this.poly, this.dog.x, this.dog.y);

        this.marker.clear();
        this.marker.beginFill("0xFF0000");
        this.marker.lineStyle(3, 0xFF0000);
        if(this.isc.edge<<1 == this.poly.length-2)
        {
            this.marker.moveTo(this.poly[this.isc.edge*2+0], this.poly[this.isc.edge*2+1]);
            this.marker.lineTo(this.poly[0], this.poly[1]);

        }
        else
        {
            this.marker.moveTo(this.poly[this.isc.edge*2+0], this.poly[this.isc.edge*2+1]);
            this.marker.lineTo(this.poly[this.isc.edge*2+2], this.poly[this.isc.edge*2+3]);
        }

        this.dog.update(this.isc);
        this.dog.collision(this.poly, this.isc, PolyK);
        
        this.marker.lineStyle(3, 0xFF0000);
        this.marker.moveTo(this.dog.x, this.dog.y);
        this.marker.lineTo(this.isc.point.x, this.isc.point.y);
        this.marker.endFill();*/
        if( this.dog.loaded )
        {
            var collided = SAT.testPolygonPolygon(this.dog.cob, this.platform.cob, this.response);
            if (collided) {
                console.log(collided);
            };
        }
        this.dog.update();

        window.requestAnimFrame( this.tick.bind(this) );
    };

    return new Game;
});