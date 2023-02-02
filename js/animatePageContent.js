// animated scroll based on nav link trigger ////////////////////
// determines the height of nav bar plus buffer
var navOffset = $("header").innerHeight();
// console.log(navOffset);


// function for animated scroll on nav click
$("header a[href^='#'], #scrollIcon").click(function (e) {

	// prevents browser from doing a default click
	e.preventDefault();

	// finds the position of selected link/ID
	if ($(window).innerWidth() < 599) {
		var idPosNav = $($(this).attr("href")).offset().top - navOffset;
	} else {
		var idPosNav = $($(this).attr("href")).offset().top;
	}

	// animates to selected section position
	$("body, html").animate({
		scrollTop: idPosNav
	}, 1000, "easeInOutQuad");

});

// function that runs as user scrolls //////////////////////////
// is executed everytime the window scrolls
$(window).scroll(function () {

	if ($(window).scrollTop() > 1) {
		$("header").css("box-shadow", '0 2px 5px rgba(56, 56, 56, 0.2)');
	} else {
		$("header").css("box-shadow", 'none');
	}

	// assiging the position of the nav bottom to while the window scrolls
	var topContentPosition = $(window).scrollTop() + navOffset;

	// rgba(255, 241, 200, 1) yellow
	let bgColors = ["#FF694D", "#fff", "#fff", "#222"];
	let fgColors = ["#fff", "#FF694D", "#FF694D", "#FF694D"];

	$("section").each(function (i) {
		//finds the top of a section
		if ($(window).innerWidth() < 599) {
			var sectionTopPosition = $(this).offset().top - 10;
		} else {
			var sectionTopPosition = $(this).offset().top;
		}
		
		//finds the bottom of the section
		var sectionBottomPosition = sectionTopPosition + $(this).innerHeight();

		var sectionID = $(this).attr("id");

		if (topContentPosition >= sectionTopPosition && topContentPosition <= sectionBottomPosition) {
			$("nav a[href='#" + sectionID + "']").addClass("active");
			document.documentElement.style.setProperty(`--bgColor`, bgColors[i]);
			document.documentElement.style.setProperty(`--fontColor`, fgColors[i]);
			$("#themeColor").attr("content", bgColors[i]);
		} else {
			$("nav a[href='#" + sectionID + "']").removeClass("active");
		}
	});
});