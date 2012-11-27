$(document).ready(function() {


	// WAYPOINTS WITH DYNAMIC TO-TOP-LINK
	$('#top').addClass('ym-hideme');
	$.waypoints.settings.scrollThrottle = 30;
	$('#main').waypoint(function(event, direction) {
		$('#top').toggleClass('ym-hideme', direction === "up");
	}, {
		offset: '-50%'
	}).parent().find('#nav-main').waypoint(function(event, direction) {
		$(this).toggleClass('sticky', direction === "down");
		event.stopPropagation();
	});

	// SCROLL TO TOP
	$("#top").on("click", function() {
		$.scrollTo("#main", 500);
	});

	// SNIPPET HIGHLIGHTING
	$.each($("pre"), function () {
		$(this).snippet($(this).attr("class"), {"style": "symfony"});
	});

	// FANCYOX GALLERY
	$(".entry .gallery a, .entry .lefty a").attr("rel", "fancybox").fancybox({
		helpers: {
			title: {
				type: "over"
			}
		}
	});

});
