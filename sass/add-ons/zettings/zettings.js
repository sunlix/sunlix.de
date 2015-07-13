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

    /**
     * scrollTo
     */
    $(".toTop").on("click", function(event) {
        // prevent default behavior of <a>
        // view would jump to #main an then animate the scrolling
        event.preventDefault();

        $.scrollTo("#main", 500);
        // add #main to browser history to not break the back button
        history.pushState({
                top: window.location.href
            },
            $('title').text(),
            '#main'
        );
    });

    /**
     * prism line numbers
     */
    $('pre > code[class^=language-]').parent().attr('class', 'line-numbers');
});
