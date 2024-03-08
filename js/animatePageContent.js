// animated scroll based on nav link trigger ////////////////////
// determines the height of nav bar plus buffer
var navOffset = $("header").innerHeight();
// console.log(navOffset);
var yPos = {};
yPos = {
	"#intro": 0,
	"#work": getIdPosNav("#work"),
	"#skills": getIdPosNav("#skills"),
	"#contact": getIdPosNav("#contact")
};

function getIdPosNav(id) {
	// finds the position of selected link/ID
	if ($(window).innerWidth() < 599) {
		return ($(id).offset().top - navOffset);
	} else {
		return $(id).offset().top;
	}
}

// function for animated scroll on nav click
$("header a[href^='#'], #scrollIcon").click(function (e) {

	// prevents browser from doing a default click
	e.preventDefault();

	// console.log(e.target.hash, yPos);
	let hash = e.target.hash;
	// console.log(hash, yPos[hash]);

	// // animates to selected section position
	// $("body, html").animate({
	// 	scrollTop: idPosNav
	// }, 1000, "easeInOutQuad");
	gsap.to(window, { duration: 2, scrollTo: $(window).innerWidth() < 599 ? (getIdPosNav(hash)) : yPos[hash] });


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

	// // To switch colors
	// let bgColors = ["#FF694D", "#fff", "#fff", "#222"];
	// let fgColors = ["#fff", "#FF694D", "#FF694D", "#FF694D"];

	// consistant colors
	let bgColors = ["#222", "#222", "#222", "#222"];
	let fgColors = ["#FF694D", "#FF694D", "#FF694D", "#FF694D"];

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



window.addEventListener("DOMContentLoaded", function () {
	// const lenis = new Lenis();
	// lenis.on('scroll', ScrollTrigger.update)

	// gsap.ticker.add((time) => {
	// 	lenis.raf(time * 500)
	// })

	// gsap.ticker.lagSmoothing(0)

	gsap.to(window, { duration: 0.1, scrollTo: 0 });

	gsap.registerPlugin(ScrollTrigger);

	const createScroll01 = () => {
		const panels = Array.from(document.querySelectorAll("section"));
		panels.forEach((panel, index) => {
			const isLast = index === panels.length - 1;

			gsap.timeline({
				scrollTrigger: {
					trigger: panel,
					start: "top top",
					scrub: 0.5,
				}
			}).to(panel, {
				ease: "none",
				startAt: { filter: "brightness(100%), blur(0px)" },
				filter: isLast ? "none" : "brightness(50%) blur(10px)",
				scale: 0.8,
				translateY: 50,
				borderRadius: 40,
			}, '<');
		});
	};

	if ($(window).innerWidth() <= 810) return;

	createScroll01();
});