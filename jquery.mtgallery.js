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
        
        function resizeImg ($img, maxWidth, maxHeight) {
            var width = $img.width();
            var height = $img.height();
            
            if (width > maxWidth) {
                ratio = maxWidth / width; 
                $img.css("width", maxWidth); // Set new width
                $img.css("height", height * ratio);  // Scale height based on ratio
                width = maxWidth;
                height = height * ratio;    // Reset height to match scaled image
            };
            if(height > maxHeight){
                ratio = maxHeight / height; 
                $img.css("height", maxHeight);   
                $img.css("width", width * ratio);  
                width = width * ratio;
            }
        }
        
        function loadImg ($img, order) {
            
            var $thumb = $img.clone();
            
            // add thumbnail,resize
            $thumbs.children().eq(order).append($thumb);
            resizeImg($thumb, options.thumbMaxWidth, options.thumbMaxHeight)
            
            // add main image, resize
            $viewer.children().eq(order).append($img);
            resizeImg($img, options.playerWidth, options.playerHeight)
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