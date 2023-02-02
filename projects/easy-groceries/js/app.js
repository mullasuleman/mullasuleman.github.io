// to store the list of products in the cart
var myCart = {};
// list of products preiously in the cart
var myProducts = {};

$(document).foundation();

// function to fetch departments for the splash page
function get_departments() {
	// console.log("get_departments");
	var getDepartments = $.ajax({
		url: "services/get_departments.php",
		type: "POST",
		dataType: "json"
	});

	getDepartments.fail(function (jqXHR, textStatus) {
		console.log("Something went wrong! (getDepartments)" + textStatus);
	});

	getDepartments.done(function (data) {
		var content = "";
		if (data.error.id == "0") {
			$.each(data.departments, function (i, item) {
				content += `
				<div class="cell large-3 medium-4 small-6 category getProductsByDepartment" data-id="${item.id}" title="${item.name}">
					<div class="cat-image-container">
						<img src="./images/${item.c_image}" alt="Category ${item.name}" />
					</div>
					<p class="category-title">${item.name}</p>
				</div>`;
			});
		} else {
			console.log("Oh no, Something went wrong.");
		}
		$(".category-container").html(content);
		$(".splash-container").fadeIn();
	});
}

// function to fetch department list and build markup for the nav
function getDepartmentsNav() {
	var getDepartments = $.ajax({
		url: "services/get_departments.php",
		type: "POST",
		dataType: "json"
	});

	getDepartments.fail(function (jqXHR, textStatus) {
		console.log("Something went wrong! (getDepartments)" + textStatus);
	});

	getDepartments.done(function (data) {
		var content = `<p class="category-title">Categories<span id="close-categories-nav" class="show-for-small-only">X</span></p>`;
		if (data.error.id == "0") {
			$.each(data.departments, function (i, item) {
				content += `<p class="category-item getProductsByDepartment" data-id="${item.id}" title="${item.name}">${item.name}</p>`;
			});
		} else {
			console.log("Oh no, Something went wrong.");
		}
		$(".category-sidebar").html(content);
	});
}

// function to build product card markup
function getProductView(item) {
	let image_path = item.image_path;
	if (imgExists(image_path)) {
		// console.log("succcess");
	} else {
		image_path = `./images/img404.jpg`;
	}

	var content = `
	<div class="cell large-4 medium-6 small-6 product" title="${item.product_name}">
		<div class="prod-image-container">
			<img src="${image_path}" alt="${item.product_name}" />
		</div>
		<p class="product-title">${item.product_name}</p>
		<div class="price-quantity-container grid-x align-right">
			<p class="cell large-6 medium-6 small-12 price">$${item.avg_price}</p>
			<p class="grid-x large-6 medium-6 small-12 align-justify quantity">
			<button class="large-3 medium-3 small-3 remove-quantity quantity-button" data-id="${item.id}">-</button>
			<span class="large-3 medium-3 small-3 quantity-amount quantity_${item.id}">1</span>
			<button class="large-3 medium-3 small-3 add-quantity quantity-button" data-id="${item.id}">+</button>
			</p>
		</div>
		<button class="add-to-cart-button" data-id=${item.id}>Add to Cart</button>
	</div>`;
	return content;
}

// function to search product
function searchProduct() {
	var search = $("#search").val();
	if (search) {
		$(".hideAll").fadeOut();
		setTimeout(getProductsBySearch, 200, search);
		$(".products-container").delay(300).fadeIn();
		$(window).scrollTop(0);
	}
}

// function to fetch products by search
function getProductsBySearch(search) {
	var getProducts = $.ajax({
		url: "services/get_products_by_search.php",
		type: "POST",
		data: {
			search: search
		},
		dataType: "json"
	});

	getProducts.fail(function (jqXHR, textStatus) {
		console.log("Something went wrong! (getProducts)" + textStatus);
	});

	getProducts.done(function (data) {
		var content = "";
		if (data.error.id == "0") {
			$.each(data.products, function (i, item) {
				content += getProductView(item);
			});
		}
		$(".products-grid").html(content);
		$(".container-title h1").html(`Searching for "${search}"`);
		getDepartmentsNav();
	});
}


// function to fetch products by department
function getProductsByDepartment(department_id) {
	var getProducts = $.ajax({
		url: "services/get_products_by_department.php",
		type: "POST",
		data: {
			department_id: department_id
		},
		dataType: "json"
	});

	getProducts.fail(function (jqXHR, textStatus) {
		console.log("Something went wrong! (getProducts)" + textStatus);
	});

	getProducts.done(function (data) {
		// console.log(data);
		console.log(data);

		var content = "";
		if (data.error.id == "0") {
			$.each(data.products, function (i, item) {
				content += getProductView(item);
			});
		} else {
			console.log("Oh no, Something went wrong.");
		}
		$(".container-title h1").html(`Category / ${data.department_search}`);
		$(".products-grid").html(content);
		getDepartmentsNav();
	});
}

// function to build cart markup
function buildCart() {
	var content = `
	<div class="grid-x large-12 medium-12 small-12 hide-for-small-only cart-table-title">
		<div class="cell large-6 medium-6 product-desc">
			<p>Item Description</p>
		</div>
		<div class="cell large-2 medium-2 text-center product-quantity">
			<p>Quantity</p>
		</div>
		<div class="cell large-2 medium-2 text-right product-total">
			<p>Total</p>
		</div>
		<div class="cell large-2 medium-2 text-right product-remove">
			<p>Remove</p>
		</div>
	</div>`;

	var sub_total = 0.00;

	// loop through cart
	$.each(myProducts, function (i, item) {
		var item_number = i + 1;

		var quantity = myCart[item.id];
		var extended_price = parseInt(quantity) * parseFloat(item.avg_price);
		var extendPrice = extended_price.toFixed(2);
		var avg_price = parseFloat(item.avg_price);
		var avgPrice = avg_price.toFixed(2);
		console.table(item);

		let image_path = item.image_path;
		if (imgExists(image_path)) {
			// console.log("succcess");
		} else {
			image_path = `./images/img404.jpg`;
		}

		content += `
		<div class="grid-x large-12 medium-12 small-12 cart-table-item">
			<div class="grid-x large-6 medium-6 small-12 product-desc">
				<div class="large-3 medium-3 small-3 cart-image-container">
					<img src="${image_path}" alt="${item.product_name}" />
				</div>
				<div class="large-9 medium-9 small-9 align-top cart-product-details">
					<p class="product-title">${item.product_name}</p>
					<p class="product-upc">UPC: ${item.upc}</p>
					<p class="product-price-each">$${avgPrice} / ${item.unit}</p>
				</div>
			</div>
			<div class="grid-x large-2 medium-2 small-4 align-middle product-quantity">
				<p class="grid-x large-12 medium-12 small-12 align-center quantity">
					<button class="large-3 medium-3 small-3 remove-quantity cart_minus quantity-button" data-id="${item.id}">-</button>
					<span class="large-3 medium-3 small-3 quantity-amount cart_quantity_${item.id}" data-id="${item.id}">${quantity}</span>
					<button class="large-3 medium-3 small-3 add-quantity cart_plus quantity-button" data-id="${item.id}">+</button>
				</p>
			</div>
			<div class="grid-x large-2 medium-2 small-4 align-middle product-total">
				<p class="cell text-right item-total">$${extendPrice}</p>
			</div>
			<div class="grid-x large-2 medium-2 small-4 align-middle product-remove">
				<p class="cell text-right remove-item cart_delete" data-id="${item.id}">X</p>
			</div>
		</div>`;
		sub_total = sub_total + extended_price;

	});

	var subTotal = sub_total.toFixed(2);
	var hst = subTotal * 0.13;
	var HST = hst.toFixed(2);
	var total = hst + sub_total;
	var TOTAL = total.toFixed(2);

	$(".product-list").html(content);
	$(".subtotal-amount").html(`$${subTotal}`);
	$(".hst-amount").html(`$${HST}`);
	$(".total-amount").html(`$${TOTAL}`);

	checkEmptyCart();
}

// function to check if the cart is empty and show a message
function checkEmptyCart() {
	if (Object.size(myCart) == 0) {
		// Showing message if cart is empty
		var content = `
		<div class="grid-x large-12 medium-12 small-12 hide-for-small-only cart-table-title">
			<div class="cell large-6 medium-6 product-desc">
				<p>Item Description</p>
			</div>
			<div class="cell large-2 medium-2 text-center product-quantity">
				<p>Quantity</p>
			</div>
			<div class="cell large-2 medium-2 text-right product-total">
				<p>Total</p>
			</div>
			<div class="cell large-2 medium-2 text-right product-remove">
				<p>Remove</p>
			</div>
		</div>`;
		content += `<div class="cell large-12 medium-12 small-12 cart-empty-message"><p>There are no products added to the cart.</p></div>`;
		$(".product-list").html(content);
	}
}

// function to fetch products in the cart from DB
function getProductsByCart() {
	var json = JSON.stringify(myCart);

	var getProducts = $.ajax({
		url: "services/get_products_by_cart.php",
		type: "POST",
		data: {
			json: json
		},
		dataType: "json"
	});

	getProducts.fail(function (jqXHR, textStatus) {
		if (Object.size(myCart) > 0) {
			console.error("Something went wrong! (getProducts-cart)" + textStatus);
		}
		checkEmptyCart()
	});

	getProducts.done(function (data) {
		console.table(data);
		myProducts = data.products;

		buildCart();
	});
}

// function to calculate object size
Object.size = function (obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key))
			size++;
	}
	return size;
}

function imgExists(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status != 404;
}


// !document ready function
$(document).ready(function () {
	get_departments();

	$(document).on("click", "body #loginOK", function () {
		$("#loginForm").submit();
	});


	$("#loginForm").on('submit', function (e) {

		e.preventDefault();

		let validate = false;

		/*
		let message = "";

		if ($("#genre").val() == "") {
			validate = true;
			message = `Please select a Genre
			`;
			$("#genre").focus();
		}

		if ($("#name").val() == "") {
			validate = true;
			message += `Please Enter a Name.
			`;
			$("#name").focus();
		}
		*/

		if (validate) {
			alert(message);
		} else {

			$.ajax({
				type: 'POST',
				url: "services/login_account.php",
				data: new FormData(this),
				dataType: "json",
				contentType: false,
				cache: false,
				processData: false,

				beforeSend: function () {
					//console.log("Fading screen");
					$('#loginOK').attr("disabled", "disabled");
					$('#loginForm').css("opacity", "0.5");
				},

				success: function (data) {
					//console.log("DONE: "+data);


					console.log("USER ID: " + data.ea_user_id);

					if (data.error.id == "0" && data.ea_user_id != "-1") {
						// success
						$('.login-box').hide();
						$('.no-account-box').hide();
						$("#billing_email").val(data.email);

						// populating billing form
						$("#billing_name_first").val(data.billing_name_first);
						$("#billing_name_last").val(data.billing_name_last);
						$("#billing_address").val(data.billing_address);
						$("#billing_city").val(data.billing_city);
						$("#billing_province").val(data.billing_province);
						$("#billing_postal_code").val(data.billing_postal_code);

						// populating shipping form
						$("#shipping_name_first").val(data.shipping_name_first);
						$("#shipping_name_last").val(data.shipping_name_last);
						$("#shipping_address").val(data.shipping_address);
						$("#shipping_city").val(data.shipping_city);
						$("#shipping_province").val(data.shipping_province);
						$("#shipping_postal_code").val(data.shipping_postal_code);
						$(".billing-info, .shipping-info").show();
					} else {
						console.log(data.error.message);
					}

					$('#loginForm').css("opacity", "");
					$("#loginOK").removeAttr("disabled");
				}
			});

		}
	});

	// event handler for create account button
	$(document).on("click", "body #ca_loginOK", function () {
		//console.log("Please Please More sir!");
		$("#createAccountForm").submit();
	});

	// intercepting the create account submit event
	$("#createAccountForm").on('submit', function (e) {

		e.preventDefault();

		let validate = false;
		let message = "";

		if ($("#ca_password").val() != $("#ca_password2").val()) {
			validate = true;
			message = "Passwords do not match";
		}

		if (validate) {
			alert(message);
		} else {
			$.ajax({
				type: 'POST',
				url: "services/create_account.php",
				data: new FormData(this),
				dataType: "json",
				contentType: false,
				cache: false,
				processData: false,

				beforeSend: function () {
					//console.log("Fading screen");
					$('#ca_loginOK').attr("disabled", "disabled");
					$('#createAccountForm').css("opacity", "0.5");
				},

				success: function (data) {
					//console.log("DONE: "+data);

					console.log(data.error.message);
					console.log("USER ID: " + data.user_id);

					$('#createAccountForm').css("opacity", "");
					$("#ca_loginOK").removeAttr("disabled");
				}
			});
		}
	});

	// signout as guest
	$(document).on("click", "body #guest", function () {
		$(".hidden").hide();
		$(".billing-info, .shipping-info").show();
	});

	// create account
	$(document).on("click", "body #createAccount", function () {
		$(".hidden").hide();
		$(".createAccount").show();
	});

	$(document).on("click", "body .checkout", function () {
		// temporary alert
		alert("This is not a part of the demo.");
		// $(".hidden").hide();
		// $(".login-box").show();
		// $(".no-account-box").show();

		// *code to show the accounts tab
		// $("#cart-panel-label").attr("aria-selected", "false");
		// $("#cart-panel-label").attr("aria-expanded", "false");
		// $("#cart-panel-label").attr("tabindex", "-1");
		// $("#cart-panel-label").parent().removeClass("is-active");
		// $("#cart-panel").attr('aria-hidden', 'true');
		// $("#cart-panel").removeClass("is-active");
		// $("#cart-panel").hasClass("accordion-content") ? $("#cart-panel").css("display", "none") : true;

		// $("#account-panel-label").attr("aria-selected", "true");
		// $("#account-panel-label").attr("aria-expanded", "true");
		// $("#account-panel-label").attr("tabindex", "0");
		// $("#account-panel-label").parent().addClass("is-active");
		// $("#account-panel").attr('aria-hidden', 'false');
		// $("#account-panel").addClass("is-active");
		// $("#account-panel").hasClass("accordion-content") ? $("#account-panel").css("display", "block") : true;

	});

	// login
	$(document).on("click", "body #login", function () {
		$(".hideAll").hide();
		$(".login").show();
	});

	// setting event listener on the cart + button
	$(document).on("click", "body .cart_plus", function () {
		//console.log("cart plus");
		var product_id = $(this).attr("data-id");
		var quantity = parseInt(myCart[product_id] + 1);
		myCart[product_id] = quantity;
		//$(".cart_quantity_" + product_id).html(quantity);

		buildCart();
	});

	// setting event listener on the cart - button
	$(document).on("click", "body .cart_minus", function () {
		var product_id = $(this).attr("data-id");
		var quantity = parseInt(myCart[product_id] - 1);
		if (quantity < 1) {
			quantity = 1;
		}
		myCart[product_id] = quantity;
		buildCart();
	});

	// function to delete the item from the cart
	$(document).on("click", "body .cart_delete", function () {
		var product_id = $(this).attr("data-id");
		delete myCart[product_id];
		var size = Object.size(myCart);
		console.log(myCart);
		$("#cart-counter").html(size);
		var deleteItem;
		// selecting the item to delete by looping through
		$.each(myProducts, function (i, item) {
			if (item.id == product_id) {
				deleteItem = i;
			}
		});

		// deleting the item from the specified index
		if (deleteItem != undefined) {
			myProducts.splice(deleteItem, 1);
		}
		buildCart();
	});

	// function to show the cart
	$("#cart-counter, #nav-cart").click(function (e) {
		e.preventDefault();
		getProductsByCart();
		$(".fade").fadeIn();
	});

	// function to hide the cart
	$(".continue-shopping, #cart-close").click(function (e) {
		$(".fade").fadeOut();
	});

	// function to show the search results
	$("#search-icon").click(function () {
		$("#search").focus();
		searchProduct();
	});

	$("#search").keypress(function (e) {
		var keyCode = (e.keyCode ? e.keyCode : e.which);
		if (keyCode == 13) {
			searchProduct();
			$("#search").blur();
		}
	});

	$("#categories-nav").click(function () {
		$(".hideForSmall").fadeIn();
	})

	$(document).on("click", "body #close-categories-nav", function () {
		$(".hideForSmall").fadeOut();
	})

	// load products from the category selector
	$(document).on("click", "body .getProductsByDepartment", function () {
		var department_id = $(this).attr("data-id");
		$(".hideAll").fadeOut();
		setTimeout(getProductsByDepartment, 200, department_id);
		$(".products-container").delay(300).fadeIn();
		$(window).scrollTop(0);
	});

	// product page plus button event handler
	$(document).on("click", "body .add-quantity", function () {
		var product_id = $(this).attr("data-id");
		var quantity = parseInt($(".quantity_" + product_id).html());
		++quantity;
		$(".quantity_" + product_id).html(quantity)
	});

	// product page minus button event handler
	$(document).on("click", "body .remove-quantity", function () {
		var product_id = $(this).attr("data-id");
		var quantity = parseInt($(".quantity_" + product_id).html());
		quantity > 1 ? --quantity : 1;
		$(".quantity_" + product_id).html(quantity)
	});

	// add to cart event handler
	$(document).on("click", "body .add-to-cart-button", function () {
		var product_id = $(this).attr("data-id");
		var quantity = parseInt($(".quantity_" + product_id).html());
		if (myCart[product_id] != undefined) {
			var currentValue = myCart[product_id];
			myCart[product_id] = parseInt(quantity) + parseInt(currentValue);
		} else {
			myCart[product_id] = quantity;
		}

		var size = Object.size(myCart);
		console.table(myCart);

		$("#cart-counter").html(size);
		gsap.to("#cart-counter", {
			duration: 0.2,
			y: -10,
			scale: 1.2,
			onComplete: () => {
				gsap.to("#cart-counter", {
					duration: 0.1,
					scale: 1,
					y: 0
				})
			}
		});
	});
});