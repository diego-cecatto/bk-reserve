(function() {
	function toJSONString( form ) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;
			if( name ) {
				obj[ name ] = value;
			}
		}
		return JSON.stringify( obj );
    }
    document.addEventListener( "DOMContentLoaded", function() {
        var form = document.getElementsByTagName( "form" )[0];
        form.addEventListener( "submit", function( e ) {
            e.preventDefault();
            var json = toJSONString( this );
            salvar(json);
        }, false);
    });
})();