/*-----------------------------------------------------------------------------------*/
/*	POSTS GRID
/*-----------------------------------------------------------------------------------*/

$(window).load(function(){
    var $container = $('.blog-grid');

    var gutter = 30;
    var min_width = 345;
    $container.imagesLoaded( function(){
        $container.masonry({
            itemSelector : '.post',
            gutterWidth: gutter,
            isAnimated: true,
              columnWidth: function( containerWidth ) {
                var box_width = (((containerWidth - gutter)/2) | 0) ;

                if (box_width < min_width) {
                    box_width = (((containerWidth - gutter)/2) | 0);
                }

                if (box_width < min_width) {
                    box_width = containerWidth;
                }

                $('.post').width(box_width);

                return box_width;
              }
        });
        $container.css( 'visibility', 'visible' ).parent().removeClass( 'loading' );
    });
});

/*-----------------------------------------------------------------------------------*/
/*	VIDEO
/*-----------------------------------------------------------------------------------*/

$(document).ready(function(){
    $('.video').fitVids();

/*-----------------------------------------------------------------------------------*/
/*	BUTTON HOVER
/*-----------------------------------------------------------------------------------*/

    $("a.button, .forms fieldset .btn-submit, #commentform input#submit").css("opacity","1.0");
    $("a.button, .forms fieldset .btn-submit, #commentform input#submit").hover(function () {
    $(this).stop().animate({ opacity: 0.85 }, "fast");  },
    function () {
    $(this).stop().animate({ opacity: 1.0 }, "fast");
    });

/*-----------------------------------------------------------------------------------*/
/*	IMAGE HOVER
/*-----------------------------------------------------------------------------------*/

//    $('.quick-flickr-item').addClass("b-page__img_frame_hover");
    $('.b-page__img_frame_hover a').prepend('<span class="more"></span>');


    $('.b-page__img_frame_hover').mouseenter(function(e) {

        $(this).children('a').children('span').fadeIn(300);
    }).mouseleave(function(e) {

        $(this).children('a').children('span').fadeOut(200);
    });
});

/*-----------------------------------------------------------------------------------*/
/*	TWITTER
/*-----------------------------------------------------------------------------------*/

getTwitters('twitter', {
        id: 'elemisdesign', 
        count: 2, 
        enableLinks: true, 
        ignoreReplies: false,
        template: '<span class="twitterPrefix"><span class="twitterStatus">%text%</span><br /><em class="twitterTime"><a href="http://twitter.com/%user_screen_name%/statuses/%id%">%time%</a></em>',
        newwindow: true
});

/*-----------------------------------------------------------------------------------*/
/*	FLICKR
/*-----------------------------------------------------------------------------------*/

$(document).ready(function(){
	$('.b-widget__flickr-feed').dcFlickr({
		limit: 9, 
        q: { 
            id: '51789731@N07',
			lang: 'en-us',
			format: 'json',
			jsoncallback: '?'
        },
		onLoad: function(){
			$('.frame a').prepend('<span class="more"></span>');
			$('.frame').mouseenter(function(e) {

            $(this).children('a').children('span').fadeIn(300);
        }).mouseleave(function(e) {

            $(this).children('a').children('span').fadeOut(200);
        });
		}
	});
});	

/*-----------------------------------------------------------------------------------*/
/*	AUDIO PLAYER
/*-----------------------------------------------------------------------------------*/

$(window).load(function(){
    $('.blog-grid audio').mediaelementplayer({
        audioWidth: '100%',
        features: ['playpause','progress','tracks'],
        videoVolume: 'horizontal'
    });
});

$(document).ready(function(){
    $('.single audio').mediaelementplayer({
        audioWidth: '100%',
        features: ['playpause','progress','tracks'],
        videoVolume: 'horizontal'
    });
});

/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/

ddsmoothmenu.init({
	mainmenuid: "b-menu",
	orientation: 'h',
	classname: 'b-menu',
	contentsource: "markup"
});
