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
    	nextBack: true,
    	backText: 'back',
    	nextText: 'next',
    	keyNav: true
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
            return html;
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
        
        function loadSlide ($gallery, order) {
            var $target = $gallery.find('.mt-viewer').children('div').eq(order);
            var $thumb = $gallery.find('.mt-thumbs').children('li').eq(order);
            $gallery.find('.mt-viewer').children('div').hide();
            $gallery.find('.current').removeClass('current');
            $target.show();
            $thumb.addClass('current');
        }
        
        function backSlide ($gal) {
            var target = $gal.find('.mt-thumbs li.current').index();
            if (target == 0) {
                target = $gal.find('.mt-thumbs li:last').index();
            }
            else {
                target --;
            }
            loadSlide($gal, target);
        }
        
        function nextSlide ($gal) {
            var target = $gal.find('.mt-thumbs li.current').index();
            if (target == $gal.find('.mt-thumbs li:last').index()) {
                target = $gal.find('.mt-thumbs li:first').index();
            }
            else {
                target ++;
            }
            loadSlide($gal, target);
        }
        
        function resizeImg ($img, maxWidth, maxHeight) {
            var width = $img.width();
            var height = $img.height();
            
            console.log('width '+ width);
            console.log('height '+ height);
            
            if (width > maxWidth) {
                ratio = maxWidth / width; 
                $img.css("width", maxWidth); // Set new width
                $img.css("height", height * ratio);  // Scale height based on ratio
                width = maxWidth;
                height = height * ratio;    // Reset height to match scaled image
                $img.css({
                    'position': 'absolute',
                    'left': '0px',
                    'top': Math.floor((maxHeight - height)/2 ) + 'px'
                }).animate({
                    'opacity': 1
                }, 500);
            };
            if(height > maxHeight){
                ratio = maxHeight / height; 
                $img.css("height", maxHeight);   
                $img.css("width", width * ratio);  
                width = width * ratio;
                height = maxHeight;
                $img.css({
                    'position': 'absolute',
                    'top': '0px',
                    'left': Math.floor((maxWidth - width)/2 ) + 'px'
                }).animate({
                        'opacity': 1
                    }, 500);
            }
            
            
        }
        
        function loadImg ($img, order) {
            
            var $thumb = $img.clone().appendTo($thumbs.children().eq(order));
            
            $thumb.load(function() {
                // add thumbnail,resize
                resizeImg($(this), options.thumbMaxWidth, options.thumbMaxHeight);
            });
              
            $img.appendTo($viewer.children().eq(order)).load(function() {
                resizeImg($(this), options.playerWidth, options.playerHeight)
            })  
            // add main image, resize
            
        }
        
        // go through each child of selector and
        // pick out links etc
        $el.children().each(function(i) {
            
           var $this = $(this);
           
           // get only the first link
           var $link = $this.find('a:first');
           var href = $link.attr('href');
           var ytid = getId(href);
           
           $('<div/>').appendTo($viewer).css('z-index',9000-i);
           //add current class to first list item appended
           var htmlString = i == 0 ? '<li class="current"/>' :  '<li/>';
           $(htmlString).appendTo($thumbs).click(function() {
               loadSlide($gal, $(this).index());
           });
           
           if (ytid) {
               
               var thumbUrl = "http://img.youtube.com/vi/" + ytid + "/0.jpg";
               var $thumb = $("<img/>") 
                      .attr("src", thumbUrl)
                      .load(function() {
                         // add thumbnail,resize
                         $thumbs.children().eq(i).append($(this));
                         resizeImg($thumb, options.thumbMaxWidth, options.thumbMaxHeight)
                      });
                $viewer.children('div').eq(i).html(embedYouTube(ytid));
           }
           else {
               // Is an image link
               //parseImgLink($link.attr('href'), );
               
               var $img = $("<img/>") 
                   .attr("src", href)
                   .css({'opacity':0})
                   //.load(function() {
                //      
                //   });
                loadImg($img, i);

           }
           
        });
        
       
        if (options.nextBack) {
            $('<a class="mt-back" href="#">' + options.backText + '</a>')
                .appendTo($gal)
                .click(function() {
                    backSlide($gal);
                    return false;
                });
            $('<a class="mt-next" href="#">' + options.nextText + '</a>')
                .appendTo($gal)
                .click(function() {
                    nextSlide($gal);
                    return false;
                });
        };
        
        if (options.keyNav) {
            $(document).keydown(function(e){
                if (e.keyCode == 37) { 
                   //left
                   backSlide($gal);
                   return false;
                }
                if (e.keyCode == 39) { 
                   //right
                   nextSlide($gal);
                   return false;
                }
            });
        };
   
     });
    
};