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
    	thumbMaxHeight: 80,
    	thumbMaxWidth: 120,
    	thumbSize: 'small',
    }, options);
    
     return this.each(function() {
     
        var $el = $(this);
        var slides = [];
        
        // wrap the element in a mtgallery div
        $el.wrap('<div class="mtgallery"/>');
        
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
            if (ytid) {
                return ytid[1] 
            };
			return false;
        }
        
        function parseYtLink (id, order) {
            
        }
        
        function parseImgLink (link, order) {
            
        }
        
        // go through each child of selector and
        // pick out links etc
        $el.children().each(function(i) {
           var $this = $(this);
           // get only the first link
           var $link = $this.find('a:first');
           var ytid = getId($link.attr('href'));
           
           if (ytid) {
               parseYtLink(ytid,i);
           }
           else {
               parseImgLink($link.attr('href'));
           }
           
        });
        
        
        
   
     });
    
};