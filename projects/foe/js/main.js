/* jslint browser: true */
/* global $, TweenMax, Sine, Circ, Back, Expo */

// hide all screens and section divs
$("main, section").hide();

// SPLASH SCREEN //////////////////////////////////////////////
$("#splash").show();

TweenMax.from("#splash", 0.5, {
	delay: 0.25,
	opacity: 0
});

TweenMax.from("#splash #foeLogoBackground", 0.75, {
	delay: 0.5,
	scale: 0,
	height: 1500,
	y: 300,
	ease: Sine.easeOut,
	boxShadow: 0
});

TweenMax.from("#splash #foeLogo", 0.75, {
	delay: 0.5,
	scale: 0,
	y: 300,
	ease: Sine.easeOut
});

TweenMax.from("#splash #foeLogoText", 0.75, {
	delay: 1,
	y: 300,
	ease: Sine.easeOut
});

TweenMax.to("#splash", 0.5, {
	delay: 3,
	opacity: 0,
	onComplete: loadLanding
});

// LANDING SCREEN ///////////////////////////////////////////

function loadLanding() {
	// preparing all the main and section to show the landing pages by loading (setting the opacity)

	$("main, section").hide().css({
		opacity: 1
	});

	$("#landing").fadeIn();

	TweenMax.from("#landing header", 0.5, {
		opacity: 0,
		y: -$("#landing header").outerHeight(),
		ease: Circ.easeOut
	});

	$("#landing .restCard").each(function (i) {
		TweenMax.from(this, 0.5, {
			delay: 0.5 + (i * 0.25),
			opacity: 0,
			x: i == 1 ? -100 : 100,
			ease: Circ.easeOut
		});
	});

	// logo click funtion to load Hearth & Stone
	$("#landing #restCard1").click(function () {
		TweenMax.to("#landing", 0.5, {
			delay: 0.5,
			opacity: 0,
			onComplete: loadRest,
			onCompleteParams: ["#rest1", "#fbc330"]
		});
	});

	// logo click funtions to load Crispy's
	$("#landing #restCard2").click(function () {
		TweenMax.to("#landing", 0.5, {
			delay: 0.5,
			opacity: 0,
			onComplete: loadRest,
			onCompleteParams: ["#rest2", "#f26a24"]
		});
	});

	// logo click funtions to load Ceviche
	$("#landing #restCard3").click(function () {
		TweenMax.to("#landing", 0.5, {
			delay: 0.5,
			opacity: 0,
			onComplete: loadRest,
			onCompleteParams: ["#rest3", "#f2a900"]
		});
	});
}


// RESTAURANT SCREENS ///////////////////////////////////////////

function loadRest(restID, highlightColor) {
	$("#landing").hide();
	$(restID).fadeIn();

	TweenMax.from(restID + " header", 0.5, {
		delay: 0.25,
		y: -$(restID + " header").outerHeight(),
		ease: Sine.easeOut
	});

	TweenMax.from(restID + " footer", 0.5, {
		delay: 0.45,
		y: $(restID + " footer").outerHeight(),
		ease: Sine.easeOut
	});

	////// highlight home icon on startup
	$(restID + " .homeIcon").css({
		boxShadow: `inset 0 -5px 0 ${highlightColor}`
	});

	// show and load home screen
	$(restID + " .home").show();
	TweenMax.from(restID + " .home", 0.5, {
		delay: 0.75,
		opacity: 0
	});

	$(restID + " .home .reveal").each(function (i) {
		TweenMax.from(this, 1, {
			delay: 1 + i * 0.25,
			opacity: 0,
			scale: 0.7,
			y: 50,
			ease: Expo.easeOut
		});
	});

	// var to target all subnav based on currrent restaurant
	var iconsTarget = restID + " .homeIcon, " + restID + " .specialsIcon, " + restID + " .reserveIcon";

	// removing the active class to apply it to the selected icon later
	$(iconsTarget).css({
		boxShadow: 'none'
	}).removeClass("active");

	// highlight home icon in footer on restaurant load
	// adding a class to check if the icon is selected or not to prevent the content from loading again on a click
	$(restID + " .homeIcon").css({
		boxShadow: `inset 0 -5px 0 ${highlightColor}`
	}).addClass("active");

	// set up section nav - highlight and load section
	$(iconsTarget).click(function () {

		if (!$(this).hasClass("active")) {
			// this will only be executed if there is no active class on the button
			// calling the hasClass will return true if the class is applied to the icon. and it will be inverted usng NOT

			// remove highlight from all icons
			$(iconsTarget).css({
				boxShadow: 'none'
			}).removeClass("active");

			// add highlight to selected icon based on highlight colour
			$(this).css({
				boxShadow: `inset 0 -5px 0 ${highlightColor}`
			}).addClass("active");

			// load selected section - send current section and section to load
			loadSection(restID + " section", restID + " " + $(this).attr("data-section"));
		}
	});
}


// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////

// function for loading internal restaurant sections
function loadSection(prevSection, nextSection) {

	// fade out previous section
	TweenMax.to(prevSection, 0.5, {
		opacity: 0,
		onComplete: function () {
			// hide and reset previous section
			$(prevSection).hide().css({
				opacity: 1
			});
			// display next section and auto scroll to top of page
			$(nextSection).show().scrollTop(0);
		}
	});

	// resetting form styles
	TweenMax.to(".error", 0.25, {
		display: 'none',
		scaleY: 0,
		ease: Sine.easeOut
	});
	// resetting style on each input
	$("input, select").each(function () {
		$(this).attr("style", "");
	});

	// animate on next section
	TweenMax.from(nextSection, 0.5, {
		delay: 0.5,
		opacity: 0
	});

	// if opening the specials tab
	if (/.specials/.test(nextSection)) {
		// loop through and reveal all elements on next screen with .reveal class applied
		$(nextSection + " .reveal").each(function (i) {
			TweenMax.from(this, 0.75, {
				delay: 1 + i * 0.125,
				opacity: 0,
				x: 50,
				ease: Expo.easeOut
			});
		});
	} else if (/.reservation/.test(nextSection)) {
		// loop through and reveal all elements on next screen with .reveal class applied
		$(nextSection + " .reveal").each(function (i) {
			TweenMax.from(this, 0.75, {
				delay: 1 + i * 0.125,
				opacity: 0,
				// scale: 0.7,
				y: 25,
				ease: Expo.easeOut
			});
		});
	} else {
		// loop through and reveal all elements on next screen with .reveal class applied
		$(nextSection + " .reveal").each(function (i) {
			TweenMax.from(this, 0.75, {
				delay: 1 + i * 0.125,
				opacity: 0,
				scale: 0.7,
				y: 100,
				ease: Expo.easeOut
			});
		});
	}
}

// set up hamburger menu to reveal main menu
// aplied to all the hamburger menus but only the active one will be displayed
$(".hamburgerMenu").click(function () {
	// this if statement will check the state of the hamburger menu and show/hide it
	if (!($(this).attr("data-click-state") == "1")) {
		// changing to state of the hamburger to opened
		$(this).attr("data-click-state", "1");
		$(this).attr("src", "img/ham_to_close.gif");
		$("#menu").fadeIn();
		TweenMax.to(".rest", 1, {
			x: -310,
			ease: Expo.easeOut
		});
	} else {
		// changing to state of the hamburger to closed
		$(this).attr("data-click-state", "0");
		$(this).attr("src", "img/close_to_ham.gif");
		$("#menu").fadeOut();
		TweenMax.to(".rest", 1, {
			x: 0,
			ease: Expo.easeOut
		});
	}
});

// set up main menu links
// go back to landing screen
$("#backToLanding").click(function () {
	// resetting the window
	$(".hamburgerMenu").attr("data-click-state", "0");
	$(".hamburgerMenu").attr("src", "img/close_to_ham.gif");
	$("#menu").fadeOut();
	TweenMax.to(".rest", 0.5, {
		x: 0,
		ease: Sine.easeOut,
		onComplete: function () {
			TweenMax.to(".rest", 0.5, {
				opacity: 0,
				onComplete: loadLanding
			});
		}
	});
});

// set up reservations submit button
// $(".rest .reserve").click(function (e) {
// 	// stops default processing for form
// 	e.preventDefault();
// 	// revealing the confirmation message
// 	// TweenMax.to(".rest .confirmation", 0.5, {
// 	// 	scale: 1,
// 	// 	opacity: 1,
// 	// 	ease: Expo.easeOut
// 	// });
// });

$("form").on("submit", function (e) {
	let formValid = true;
	let emptyField;
	e.preventDefault();

	if ($("input[name='name']", this).val() == "") {
		formValid = false;
		emptyField = $("input[name='name']", this);
	} else if ($("select[name='guests']", this).val() == "0") {
		formValid = false;
		emptyField = $("select[name='guests']", this);
	} else if ($("input[name='date']", this).val() == "") {
		formValid = false;
		emptyField = $("input[name='date']", this);
	} else if ($("select[name='time']", this).val() == "0") {
		formValid = false;
		emptyField = $("select[name='time']", this);
	} else if ($("input[name='phone']", this).val() == "") {
		formValid = false;
		emptyField = $("input[name='phone']", this);
	}

	if (formValid) {
		TweenMax.to(".rest .confirmation", 0.5, {
			scale: 1,
			opacity: 1,
			ease: Expo.easeOut
		});
		TweenMax.to(".error", 0.25, {
			display: 'none',
			scaleY: 0,
			ease: Sine.easeOut
		});
	} else {
		emptyField.focus();
		emptyField.css({
			border: `2px solid red`
		});
		TweenMax.to(".error", 0.25, {
			display: 'block',
			scaleY: 1,
			ease: Sine.easeOut
		});
	}
});

// resetting style on each input
$("input, select").focusin(function () {
	$("input, select").each(function () {
		$(this).attr("style", "");
	});
});

// set up confirmation close button
$(".rest .confirmation span").click(function (e) {
	// hiding the confirmation message
	TweenMax.to(".rest .confirmation", 0.5, {
		scale: 0,
		opacity: 0,
		ease: Circ.easeOut
	});
});