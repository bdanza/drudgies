$(document).ready(function () {
	$.ajax({
	  url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=?&q=' + encodeURIComponent('http://feeds.feedburner.com/DrudgeReportFeed'),
	  dataType : 'json',
	  success  : function (data) {
	    if (data.responseData.feed && data.responseData.feed.entries) {
	      $.each(data.responseData.feed.entries, function (i, e) {
	      	process(e);
	      });
	    }
	  }
	});

});

function process(entry) {
	// create a dummy element for the html of the feed entry
	// now we can interact with it like 
	var el = document.createElement("div");
	$(el).html(entry.content);

	$(el).find("a").each(function (i, link) {
		// find the link for the original article
		// luckily, it appears that this always has the text, "link"
		if ($(link).html() === "link") {
			var linkedFrom = $(link).attr("href");
			// If the link is from the daily caller, push an alert
			if (linkedFrom.indexOf("dailycaller") !== -1) {
				alert("drudge linked to the daily caller!");
			}
			$("#drudge-links").append($("<li class='drudge-link'>").html(linkedFrom));
		}
	});
}