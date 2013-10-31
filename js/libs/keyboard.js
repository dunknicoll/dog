define(['EventDispatcher'], function(EventDispatcher) {

	KeyboardHandler = function( focus ) 
	{
		EventDispatcher.call(this);

		this.focus = focus;

		this.logging = false;
		this.capture = false;

		this.keys 		= [];
		this.callbacks 	= [];

		this.focus.addEventListener('keydown', this.handleKeyDown.bind(this));
		this.focus.addEventListener('keyup', this.handleKeyUp.bind(this));

		return( this );
	};

	KeyboardHandler.prototype = Object.create( EventDispatcher.prototype );

	KeyboardHandler.prototype.handleKeyDown = function( e )
	{
		this._setKey( e );
		if (this.callbacks[ e.keyCode ])
		{
			if ( this.capture ) e.preventDefault();
			this.callbacks[ e.keyCode ].call();
		}
	};

	KeyboardHandler.prototype.handleKeyUp = function( e )
	{
		if ( this.capture ) e.preventDefault();
		this._resetKey( e );
	};

	KeyboardHandler.prototype._setKey = function( e ) 
	{
		if (this.logging) console.log( e.keyCode );
		this.keys[ e.keyCode ] = true;
	};

	KeyboardHandler.prototype._resetKey = function( e ) 
	{
		this.keys[ e.keyCode ] = false;
	};

	KeyboardHandler.prototype.key = function( id ) 
	{
		return this.keys[ id ];
	}; 

	KeyboardHandler.prototype.slowKey = function( id, callback ) 
	{
		this.callbacks[ id ] = callback;
	};

	return KeyboardHandler;
});