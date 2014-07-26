$(document).ready(function() {

	/**
	 * accesible tabs
	 */
	$('.jquery_tabs').accessibleTabs({
		clearfixClass: 'ym-clearfix',
		fx:"show",
		fxspeed:null,
		syncheights: true
	});

	/**
	 * define waypoint to the middle of the viewport
	 */
	$('#main').waypoint(function() {
		$('.toTop').toggleClass('hide');
	}, {
		offset: function() {
			return -$(this).height() / 4;
		}
	});

	/**
	 * Scroll to top
	 */
	$('body').scrollTo(0);
	$.scrollTo(0);
	$('.toTop').click(function () {
		$('body').stop().scrollTo( $('#main'), 800);

		return false;
	});

	/**
	 * initiate magnific popup module
	 */
	$('.gallery').magnificPopup({
		delegate: 'a', // child items selector, by clicking on it popup will open
		type: 'image',
		gallery: {enabled:true}
	});

});
