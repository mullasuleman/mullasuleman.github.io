window.onload = function () {
	// $('#nav').localScroll(1000);

	let y = 0;
	let boardsFront = document.querySelectorAll("#board1_front, #board2_front");
	let boardsBack = document.querySelectorAll("#board1_back, #board2_back");
	let hoodies = document.querySelectorAll(".hoodie");
	let duration = 2;
	let containers = document.querySelectorAll(".container");
	let links = document.querySelectorAll("nav a, #logo");
	let ham = document.querySelector("#ham");
	let nav = document.querySelector("nav");

	links.forEach(link => {
		
		link.addEventListener("click", e => {
			if (e.target.tagName != "IMG")
				ham.click();
			let target = e.target.getAttribute("href") || e.target.parentNode.getAttribute("href");
			
			e.preventDefault();
			TweenMax.to(window, 1.5, {
				scrollTo: target,
				ease: Power1.easeOut
			});
		});
	});
	
	ham.addEventListener("click", () => {
		ham.firstElementChild.classList.toggle("toggleMenu");
		nav.classList.toggle("toggleNav");
	});

	window.addEventListener("scroll", () => {

		containers.forEach(container => {
			// console.log(`${container.id}: ${window.scrollY >= container.offsetTop}`);
			if (window.scrollY >= container.offsetTop) {
				links.forEach(link => {
					link.classList.remove("active");
					if (link.getAttribute("href") == `#${container.id}`) {
						link.classList.add("active");
					}
				});
			}
			
		});

		boardsFront.forEach(bf => {
			y = window.scrollY - bf.parentElement.offsetTop;
			TweenMax.to(bf, duration, {
				top: y,
				ease: Back.easeOut
			})
			// bf.style.top = `${y}px`;
		});

		boardsBack.forEach(bb => {
			y = window.scrollY - bb.parentElement.offsetTop;
			TweenMax.to(bb, duration, {
				bottom: y,
				ease: Back.easeOut
			})
			// bb.style.bottom = `${y}px`;
		});


		hoodies.forEach(hood => {
			y = window.scrollY - hood.parentElement.offsetTop;
			y = y * 100 / window.innerHeight;
			if (hood.id === "hoodie1") {
				y = (y + 10) * 1.3;
			} else if (hood.id === "hoodie2") {
				y = (y + 11) * 0.5;
			} else if (hood.id === "hoodie3") {
				y = (y + 11) * 1.4;
			}
			TweenMax.to(hood, duration, {
				top: `${y}vh`,
				ease: Back.easeOut
			})
		})
	});
}