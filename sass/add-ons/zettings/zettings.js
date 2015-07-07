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

    /**
     * prism line numbers
     */
    $('pre > code[class^=language-]').parent().attr('class', 'line-numbers');
});
