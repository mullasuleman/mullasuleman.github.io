window.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#copyrightBox p span").innerHTML = new Date().getFullYear();

	$("header").delay(1000).animate({
		top: 0
	}, 2000);

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
		emailjs.send('contact_service', 'contact_form', this)
			.then(function () {
				console.log('SUCCESS!');
				messageStatus.innerHTML = "Message successfully sent!"
			}, function (error) {
				console.log('FAILED...', error);
				messageStatus.innerHTML = "Something went wrong"
			});

	});
});