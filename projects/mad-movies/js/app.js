$(document).foundation()

function get_search(search_text) {

	let getSearch = $.ajax({
		url: "services/search.php",
		type: "POST",
		data: {
			search_text: search_text
		},
		dataType: "json"
	});

	getSearch.done(function (data) {
		let content = "";
		let search_type;
		let poster_id;
		let poster_name;

		let id;
		let name;
		let class_type;
		if (data && Object.keys(data).length >= 0) {
			$.each(data, function (i, item) {
				search_type = item.type;
				poster_id = item.cover_id;
				poster_name = item.cover_name;

				if (search_type == 1) {
					// movie_code
					id = item.movie_id;
					name = item.movie_name;
					class_type = "movie_search";
				} else {
					// people_code
					id = item.people_id;
					name = item.name;
					class_type = "people_search";
				}

				let poster_path = `./uploads_copy/${poster_id}/${poster_name}`;

				if (imgExists(poster_path)) {
					// console.log("succcess");
				} else {
					poster_path = `./images/img404.jpg`;
				}

				content += `
				<li class="${class_type}" data-id="${id}">
					<div><img src="${poster_path}" alt="${poster_name}"></div>
					<div>${name}</div>
				</li>
			`;
			});
		} else {
			content = "";
		}

		$(".search_list").html(content);

	});

	getSearch.fail(function (jqXHR, textStatus) {
		// alert("Something went wrong! : (getMovie) " + textStatus);
		let content = "";
		content += `
				<li>
					No Results found.
				</li>
			`;
		$(".search_list").html(content);
	});
}

function get_splash() {
	let getSplash = $.ajax({
		url: "services/splash.php",
		type: "POST",
		data: {
			movie_count: 8
		},
		dataType: "json"
	});

	getSplash.done(function (data) {
		let content = "";
		$.each(data, function (i, item) {
			let movie_id = item.movie_id;
			let movie_name = item.movie_name;
			let movie_rating = item.movie_rating;
			let movie_year = item.movie_year;
			let run_length = item.run_length;
			let poster_id = item.cover_id;
			let poster_name = item.cover_name;

			let poster_path = `./uploads_copy/${poster_id}/${poster_name}`;

			if (imgExists(poster_path)) {
				// console.log("succcess");
			} else {
				poster_path = `./images/img404.jpg`;
			}

			content += `
			<!-- <div class="large-3 small-6 cell gray-4 height-2">
				<div class="card movie" data-id="${movie_id}" class="width-100">
					<img src="${poster_path}" alt="${movie_name}">
					<div class="card-section">
						<h4>${movie_name}</h4>
					</div>
				</div>
			</div> -->
			<div class="cell card large-3 medium-6 small-6 movie-card" data-id="${movie_id}">
					<img src="${poster_path}" alt="${movie_name}">
					<div class="card-section">
						<div class="card-info">
							<p class="title">${movie_name}</p>
							<p class="duration">${run_length}</p>
							<p class="year">${movie_year}</p>
						</div>
						<div class="movie-rating">
							<p>${movie_rating}</p>
						</div>
					</div>
				</div>
			`;
		});

		$(".splash_content").html(content);
	});
	
	getSplash.fail(function (jqXHR, textStatus) {
		alert("Something went wrong! : (getSplash) " + textStatus);
	});
	// console.log("here");
}

function get_movie(movie_id) {
	$(".NA").show().removeClass(".NA");
	let getMovie = $.ajax({
		url: "services/movie.php",
		type: "POST",
		data: {
			movie_id: movie_id
		},
		dataType: "json"
	});

	getMovie.done(function (data) {

		$(".name").html(data.movie_name);
		$(".description").html(data.description);
		$(".rating").html(data.movie_rating);
		$(".run_length").html(data.run_length);
		$(".date").html(data.movie_date_me);
		$(".category").html(data.category);
		$(".country").html(data.country);
		$(".language").html(data.language);

		if (data.genre) {
			$(".genre").html(data.genre.join(", "));
		}

		let writer_list = [];

		if (data.writers) {
			$.each(data.writers, function (i, item) {
				writer_list.push(item.name);
			});
			$(".writers").html(writer_list.join(", "));
		} else {
			$(".writers").parent().addClass("NA").hide();
		}

		if (data.description) {
			$(".synopsis-text").html(data.description);
		} else {
			$(".synopsis-text").parent().parent().addClass("NA").hide();
			$(".synopsis-text").parent().parent().prev().addClass("NA").hide();
		}

		if (data.movie_didyouknow) {
			$(".did-you-know").html(data.movie_didyouknow);
		} else {
			$(".did-you-know").parent().parent().addClass("NA").hide();
			$(".did-you-know").parent().parent().prev().addClass("NA").hide();
		}


		// add picture image
		let poster_path = `./uploads_copy/${data.cover_image_id}/${data.cover_image_name}`;

		if (imgExists(poster_path)) {
			// console.log("succcess");
		} else {
			poster_path = `./images/img404.jpg`;
		}

		$(".main-poster").attr("src", poster_path).attr("alt", data.movie_name);

		let content = "";
		$.each(data.related_movies, function (i, item) {
			let movie_id = item.movie_id;
			let movie_name = item.movie_name;
			let poster_id = item.id;
			let poster_name = item.name;

			let poster_path = `./uploads_copy/${poster_id}/${poster_name}`;

			if (imgExists(poster_path)) {
				// console.log("succcess");
			} else {
				poster_path = `./images/img404.jpg`;
			}

			content += `
			<div class="cell card large-3 medium-6 small-6 movie-card" data-id="${movie_id}">
				<img src="${poster_path}">
				<div class="card-section">
					<div class="card-info">
						<p class="title">${movie_name}</p>
					</div>
				</div>
			</div>
			`;
		});

		if (content) {
			$(".related-movies").html(content);
		} else {
			$(".related-movies").parent().addClass("NA").hide();
			$(".related-movies").parent().prev().addClass("NA").hide();
		}


		let peopleContent = "";
		$.each(data.cast, function (i, item) {
			let people_id = item.people_id;
			let name = item.name;
			let character_name = item.character_name;
			let poster_id = item.image_id;
			let poster_name = item.image_name;

			let poster_path = `./uploads_copy/${poster_id}/${poster_name}`;

			if (imgExists(poster_path)) {
				// console.log("succcess");
			} else {
				poster_path = `./images/img404.jpg`;
			}

			peopleContent += `
			<div class="cell card large-3 medium-6 small-6 actor-card" data-id="${people_id}">
				<img src="${poster_path}" alt="${name}">
				<div class="card-section">
					<div class="card-info">
						<p class="actor-name">${name}</p>
						<p class="character-name">${character_name}</p>
					</div>
				</div>
			</div>
			`;
		});

		if (peopleContent) {
			$(".cast").html(peopleContent);
		} else {
			$(".cast").parent().addClass("NA").hide();
			$(".cast").parent().prev().addClass("NA").hide();
		}


		let screenshotContent = "";
		$.each(data.movie_images, function (i, item) {
			let image_id = item.id;
			let image_name = item.name;

			let image_path = `./uploads_copy/${image_id}/${image_name}`;

			if (imgExists(image_path)) {
				// console.log("succcess");
			} else {
				image_path = `./images/img404.jpg`;
			}

			screenshotContent += `
			<div class="cell large-4 medium-4 small-12">
				<img src="${image_path}" alt="${image_name}" />
			</div>
			`;
		});

		if (screenshotContent) {
			$(".screenshots").html(screenshotContent);
		} else {
			$(".screenshots").addClass("NA").hide();
			$(".screenshots").prev().addClass("NA").hide();
		}

	});

	getMovie.fail(function (jqXHR, textStatus) {
		alert("Something went wrong! : (getMovie) " + textStatus);
	});
}

function get_people(people_id) {
	$(".NA").show().removeClass(".NA");
	let getPeople = $.ajax({
		url: "services/people.php",
		type: "POST",
		data: {
			people_id: people_id
		},
		dataType: "json"
	});

	getPeople.done(function (data) {

		$(".name").html(data.people_name);
		$(".biography").html(data.people_biography);
		$(".born-date").html(data.born);
		if (data.died == "I'm Alive!") {
			$(".died-date").parent().hide();
		} else {
			$(".died-date").parent().show();
			$(".died-date").html(data.died);
		}


		// add picture image
		let poster_path = `./uploads_copy/${data.cover_image_id}/${data.cover_image_name}`;

		if (imgExists(poster_path)) {
			// console.log("succcess");
		} else {
			poster_path = `./images/img404.jpg`;
		}

		$(".cover-image").attr("src", poster_path).attr("alt", data.people_name);


		let content = "";
		$.each(data.movies, function (i, item) {
			// // console.log(item);

			let movie_id = item.movie_id;
			let movie_name = item.movie_name;
			let poster_id = item.image_id;
			let poster_name = item.image_name;
			let character_name = item.character_name;
			let year = item.year;

			let poster_path = `./uploads_copy/${poster_id}/${poster_name}`;

			content += `
			<div class="cell card large-3 medium-6 small-6 movie-card" data-id="${movie_id}">
				<img src="${poster_path}" alt="${movie_name}">
				<div class="card-section">
					<div class="card-info">
						<p class="title">${movie_name}</p>
						<p class="character-name">${character_name}</p>
						<p class="year">${year}</p>
					</div>
				</div>
			</div>
			`;
		});

		if (content) {
			$(".actor-movies").html(content);
		} else {
			$(".actor-movies").addClass("NA").hide();
			$(".actor-movies").prev().addClass("NA").hide();
		}


		let screenshotContent = "";
		$.each(data.people_images, function (i, item) {
			let image_id = item.id;
			let image_name = item.name;

			let image_path = `./uploads_copy/${image_id}/${image_name}`;

			if (imgExists(image_path)) {
				// console.log("succcess");
			} else {
				image_path = `./images/img404.jpg`;
			}

			screenshotContent += `
			<div class="cell large-4 medium-4 small-12">
				<img src="${image_path}" alt="${image_name}" />
			</div>
			`;
		});

		
		if (screenshotContent) {
			$(".screenshots").html(screenshotContent);
		} else {
			$(".screenshots").addClass("NA").hide();
			$(".screenshots").prev().addClass("NA").hide();
		}

	});

	getPeople.fail(function (jqXHR, textStatus) {
		alert("Something went wrong! : (getPeople) " + textStatus);
	});
}

function imgExists(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status != 404;
}

$(document).ready(
	function () {
		$(".hide_all").fadeOut();
		// $("#loader-box").fadeIn();
		get_splash();
		$(".splash_container").fadeIn();
		$("#loader-box").delay(400).fadeOut();

		$("#search").focus(function () {
			$(".found").show();
			if ($("#search").val() == "") {
				$(".search_list").html("");
			}
		});

		$("#search").keyup(function () {
			let search = $("#search").val();
			get_search(search);
		});

		$("#logo").click(function () {
			$("#loader-box").fadeIn();
			$(".hide_all").fadeOut();
			$(window).scrollTop(0);
			get_splash();
			$(".splash_container").fadeIn();
			$("#loader-box").delay(400).fadeOut();
		});

		$(document).on("click", "body .movie-card, body .movie_search", function () {
			$("#loader-box").fadeIn();
			$(".hide_all").fadeOut();
			$(window).scrollTop(0);
			get_movie($(this).attr("data-id"));
			$(".movie_container").fadeIn();
			$("#loader-box").delay(400).fadeOut();
		});

		$(document).on("click", "body .actor-card, body .people_search", function () {
			$("#loader-box").fadeIn();
			$(".hide_all").fadeOut();
			$(window).scrollTop(0);
			get_people($(this).attr("data-id"));
			$(".people_container").fadeIn();
			$("#loader-box").delay(400).fadeOut();
		});
	}
);