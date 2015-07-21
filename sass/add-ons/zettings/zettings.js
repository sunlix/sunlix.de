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
                        var htmlItems = html.find(container).first().children(items);
                        var htmlMore  = html.find(more).first();

                        if(htmlMore.length) {
                            var newUrl = htmlMore.attr('href');
                            $(more).attr('href', newUrl);
                        } else {
                            $(more).parent().remove();
                        }

                        if(htmlItems.length) {
                            $(container).first().append(htmlItems);
                        }

                        var id = '#' + htmlItems.first().attr('id');
                        $.scrollTo(id, 500, {
                            onAfter: function() {
                                // set the browser history to given id to not break the back button
                                window.location = id;
                            }
                        });
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
