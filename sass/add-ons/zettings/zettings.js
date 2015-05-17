$(document).ready(function() {
    /**
     * magnific popup
     */
    $('.gallery').magnificPopup({
        type    : 'image',
        gallery : 'true'
    });

    /**
     * prism line numbers
     */
    $('pre > code[class^=language-]').parent().attr('class', 'line-numbers');
});
