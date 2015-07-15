$(document).ready(function() {
    /**
     * magnific popup
     */
    $('.gallery').magnificPopup({
        delegate : 'a',
        type     : 'image',
        gallery  : {
            enabled : true
        },
        image    : {
            titleSrc : function(item) {
                return item.el.children('img').attr('alt');
            }
        }
    });

    $('a[href$=".jpg"], a[href$=".png"]').magnificPopup({
        type  : 'image',
        image : {
            titleSrc : function(item) {
                return item.el.children('img').attr('alt');
            }
        }
    });

    /**
     * waypoints
     */
    var waypoints = $('#main').waypoint({
        handler: function(direction) {
            $('.toTop').toggleClass('hide');
        },
        offset: '-25%'
    })

    var infinite = new Waypoint.Infinite({
        element: $('.article-container').first(),
        items: 'article',
        more: '.article-load-more',
        onAfterPageLoad: function() {
            if($('.article-load').length < 1){
                $('.article-load').remove();
            }
        }
    })

    /**
     * scrollTo
     */
    $(".toTop").on("click", function(event) {
        // prevent default behavior of <a>
        // view would jump to #main an then animate the scrolling
        event.preventDefault();

        $.scrollTo("#main", 500);
        // set the browser history to #main to not break the back button
        window.location = '#main';
    });

    /**
     * prism line numbers
     */
    $('pre > code[class^=language-]').parent().attr('class', 'line-numbers');
});
