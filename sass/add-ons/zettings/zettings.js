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
    });

    /**
     * infinite scroll on click
     */
    (function(){
        'use strict';

        var container = '.article-container';
        var items     = 'article';
        var more      = '.article-load-more';

        $(more).on({
            click: function(event) {
                event.preventDefault();

                var url = $(this).attr('href');

                $.ajax({
                    url: url,
                    success: function(data) {
                        var html      = $($.parseHTML(data));
                        var htmlItems = html.find(items);
                        var htmlMore  = html.find(more);

                        if(htmlMore.length) {
                            var newUrl = htmlMore.attr('href');
                            $(more).attr('href', newUrl);
                        } else {
                            $(more).parent().remove();
                        }

                        if(htmlItems.length) {
                            $(container).append(htmlItems);
                        }
                    }
                });
            }
        })
    }());

    /**
     * scrollTo
     */
    $(".toTop").on("click", function(event) {
        // prevent default behavior of <a>
        // view would jump to #main an then animate the scrolling
        event.preventDefault();

        $.scrollTo("#main", 500, {
            onAfter: function() {
                // set the browser history to #main to not break the back button
                window.location = '#main';
            }
        });
    });

    /**
     * prism line numbers
     */
    $('pre > code[class^=language-]').parent().attr('class', 'line-numbers');
});
