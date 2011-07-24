////////////////////////////////////////////
//
//      jquery.mtgallery.js
//          
//
////////////////////////////////////////////


jQuery.fn.mtgallery = function(options) {    
    
    var options = jQuery.extend( {
    	playerHeight: 300,
    	playerWidth: 450,
    	thumbSize: 'small',
    }, options);
    
     return this.each(function() {
     
        var $el = $(this);
        
        function embedYouTube (id) {
            var html = '';
            html += '<iframe width="'+ options.playerWidth +'" height="'+ options.playerHeight +'"';
            html += ' src="http://www.youtube.com/embed/'+ id +'" frameborder="0"';
            html += ' allowfullscreen></iframe>';
        }
        
        function getId (url) {
            // First check for new style youtube.be links
            if (url.indexOf('http://youtu.be') === 0) {
                return url.substr(url.lastIndexOf("/") + 1);
            };
            //else parse the querystring 
            var ytid = url.match("[\\?&]v=([^&#]*)");
			ytid = ytid[1];
			return ytid;
        }
        
        
        
   
     });
    
};