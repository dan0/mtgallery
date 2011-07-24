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
        $el.wrap($('<div class="mt-gallery"/>'));
        var $gal = $el.parent('.mt-gallery');
        $gal.append('<div class="mt-viewer"></div><ul class="mt-thumbs"></ul>');
        var $viewer = $gal.find('.mt-viewer');
        var $thumbs = $gal.find('.mt-thumbs');
        
        
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
        
        function loadImg ($img, order) {
            
            var $thumb = $img.clone();
            
            
            $thumbs.children().eq(order).append($thumb);
            
            var width = $thumb.width();
            var height = $thumb.height();
            
            if (width > options.thumbMaxWidth) {
                ratio = options.thumbMaxWidth / width; 
                $thumb.css("width", options.thumbMaxWidth); // Set new width
                $thumb.css("height", height * ratio);  // Scale height based on ratio
                width = options.thumbMaxWidth;
                height = height * ratio;    // Reset height to match scaled image
            };
            if(height > options.thumbMaxHeight){
                ratio = options.thumbMaxHeight / height; 
                $thumb.css("height", options.thumbMaxHeight);   
                $thumb.css("width", width * ratio);  
                width = width * ratio;
            }
            
        }
        
        // go through each child of selector and
        // pick out links etc
        $el.children().each(function(i) {
            
           var $this = $(this);
           
           // get only the first link
           var $link = $this.find('a:first');
           var href = $link.attr('href');
           var ytid = getId(href);
           
           $viewer.append('<div/>');
           $thumbs.append('<li/>');
           
           if (ytid) {
               
               var thumbUrl = "http://img.youtube.com/vi/" + ytid + "/0.jpg";

           }
           else {
               // Is an image link
               //parseImgLink($link.attr('href'), );
               
               var $img = $("<img/>") 
                   .attr("src", href)
                   .load(function() {
                      loadImg($(this), i);
                   });
               
               
           }
           
        });
        
        
        
   
     });
    
};