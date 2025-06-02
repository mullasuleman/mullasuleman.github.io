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

// // consistant colors
// let bgColors = ["#222", "#222", "#222", "#222"];
// let fgColors = ["#FF694D", "#FF694D", "#FF694D", "#FF694D"];

// To switch colors
let bgColors = ["#222", "#222", "#222", "#222"];
let fgColors = ["#ff694d", "#ffffff", "#adff6a", "#b791ff"];

let rand = Math.random() * (bgColors.length);
let i = Math.floor(rand);

document.documentElement.style.setProperty(`--bgColor`, bgColors[i]);
document.documentElement.style.setProperty(`--fontColor`, fgColors[i]);
document.querySelector(`[rel="icon"]`).setAttribute(`href`, `/images/favicon_${fgColors[i].replace("#", "")}.ico`);
$("#themeColor").attr("content", bgColors[i]);

function getIdPosNav(id) {
	// finds the position of selected link/ID
	if ($(window).innerWidth() < 599) {
		return ($(id).offset().top - navOffset + 14);
	} else {
		return $(id).offset().top;
	}
}

// function for animated scroll on nav click
$("header a[href^='#'], #scrollIcon").click(function (e) {
	e.preventDefault();
	let hash = e.target.hash;
	gsap.to(window, { duration: 2, scrollTo: $(window).innerWidth() < 599 ? (getIdPosNav(hash)) : yPos[hash] });
});

// function that runs as user scrolls //////////////////////////
// is executed everytime the window scrolls
$(window).scroll(function () {

	if ($(window).scrollTop() > 1) {
		$("header").css("box-shadow", '0 2px 5px rgba(100, 100, 100, 0.1)');
		if ($(window).innerWidth() < 599) {
			$("#logo").css("font-size", '1.7rem').css("padding-top", "0.5rem");
			$("header nav").css("padding-top", '0.5rem');
		}
	} else {
		$("header").css("box-shadow", 'none');
		if ($(window).innerWidth() < 599) {
			$("#logo").css("font-size", '2rem').css("padding-top", "1rem");
			$("header nav").css("padding-top", '1rem');
		}
	}

	// assiging the position of the nav bottom to while the window scrolls
	var topContentPosition = $(window).scrollTop() + navOffset;

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

		} else {
			$("nav a[href='#" + sectionID + "']").removeClass("active");
		}
	});
});



window.addEventListener("DOMContentLoaded", function () {

	gsap.to(document.querySelector("header"), {
		duration: 1,
		delay: 0.5,
		top: 0
	});

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
				onComplete: () => { panel.querySelector("div[id$='Box']").scrollTop = 0; }
			}, '<');
		});
	};

	if ($(window).innerWidth() <= 810) return;

	createScroll01();
});
