window.addEventListener("DOMContentLoaded", function () {
	const dialog = document.querySelector("#dialog");
	document.querySelector("#copyrightBox p span").innerHTML = new Date().getFullYear();

	(function () {
		// https://dashboard.emailjs.com/admin/account
		emailjs.init('3cJAxWF0djjsGN5Uw');
	})();

	let contactForm = document.querySelector("#contactForm");
	let messageStatus = document.querySelector("#messageStatus");

	// event listener for the contact form submit
	contactForm.addEventListener("submit", function (e) {
		e.preventDefault();

		// sending/fetching data from the server
		emailjs.sendForm('contact_service', 'contact_form', this)
			.then(function () {
				console.log('SUCCESS!');
				messageStatus.innerHTML = "Message successfully sent!"
			}, function (error) {
				console.log('FAILED...', error);
				messageStatus.innerHTML = "Something went wrong"
			});

	});

	$(".unavail.projectLink").click((e) => {
		e.preventDefault();
		dialog.showModal();
	});

	$("#closeModal").click((e) => {
		dialog.close();
	});

	function iOS() {
		return [
			'iPad Simulator',
			'iPhone Simulator',
			'iPod Simulator',
			'iPad',
			'iPhone',
			'iPod'
		].includes(navigator.userAgent)
			// iPad on iOS 13 detection
			|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)
	}

	if (iOS()) {
		$(".project").click((e) => {
			$(".project").removeClass("hover");
			console.log("on");
			console.log(e.currentTarget);
			e.currentTarget.classList.add('hover')
		})
	}
});