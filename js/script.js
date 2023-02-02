window.addEventListener("DOMContentLoaded", function () {
	$("header").delay(1000).animate({
		top: 0
	}, 2000);

	let contactForm = document.querySelector("#contactForm");
	let messageStatus = document.querySelector("#messageStatus");

	// event listener for the contact form submit
	contactForm.addEventListener("submit", function (e) {
		e.preventDefault();

		// sending/fetching data from the server
		let url = "services/send_message.php";
		fetch(url, {
			body: new FormData(e.target),
			method: "post"
		})
			.then(response => response.json())
			.then(message => {
				if (message.code) {
					messageStatus.innerText = "Message sent successfully!";
				} else {
					messageStatus.innerText = "There was a problem sending the message.";
				}
			}).catch(error => {
				messageStatus.innerText = "There was a problem connecting to the server.";
				
			});
	});
});