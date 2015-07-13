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
    $(".toTop").on("click", function() {
        $.scrollTo("#main", 500);
    });

    /**
     * prism line numbers
     */
    $('pre > code[class^=language-]').parent().attr('class', 'line-numbers');
});
