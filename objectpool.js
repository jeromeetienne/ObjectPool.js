var ObjectPool = function(ctor, nPreallocate){
	if( nPreallocate === undefined )	nPreallocate	= 100;
	return {
		_pool	: new Array(nPreallocate),
		reset	: function()	{ this._pool = [];	},
		put	: function(obj)	{ this._pool.push(obj);	},
		get	: function(){			
			if( this._pool.length > 0 )	return this._pool.pop();
			return this.grow();		
		},
		grow	: function(nObject){
			if( nObject === undefined )	nObject = nPreallocate;
			for(var i=0; i < nObject; i++)	this._pool.push(new ctor());
			return new ctor();
		}
	};
};