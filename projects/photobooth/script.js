class Photobooth {
	constructor() {

		// grab the common UI elements
		this.tabToggle = document.querySelectorAll(".tabs");
		this.panels = document.querySelector("#filters, #gallery");

		// grab the video and canvas html elements
		this.video = document.querySelector("video");
		this.canvas = document.querySelector(".photo");
		this.redPreview = document.querySelector("#redPreview");
		this.splitPreview = document.querySelector("#splitPreview");
		this.greenScreenPreview = document.querySelector("#greenScreenPreview");
		this.nightModePreview = document.querySelector("#nightModePreview");
		this.pinkStalePreview = document.querySelector("#pinkStalePreview");

		// get the context so we can write to it
		this.ctx = this.canvas.getContext("2d");
		this.redPrevCtx = this.redPreview.getContext("2d");
		this.splitPrevCtx = this.splitPreview.getContext("2d");
		this.greenScreenPrevCtx = this.greenScreenPreview.getContext("2d");
		this.nightModePrevCtx = this.nightModePreview.getContext("2d");
		this.pinkStalePrevCtx = this.pinkStalePreview.getContext("2d");

		// background image for the green screen
		this.bg = document.querySelector("#bg");

		// color sliders used for the green screen
		this.colorSliders = document.querySelectorAll("input");

		// variable to store all the stickers
		this.stickers = document.querySelectorAll(".sticker");

		// variable for the resert sticker button
		this.resetStickers = document.querySelector("#resetSticker");

		// get the greenscreen controls 
		this.rMin = document.querySelector("#rMin");
		this.gMin = document.querySelector("#gMin");
		this.bMin = document.querySelector("#bMin");
		this.rMax = document.querySelector("#rMax");
		this.gMax = document.querySelector("#gMax");
		this.bMax = document.querySelector("#bMax");

		// get the strip to show the image, shutter button to grab images
		this.strip = document.querySelector(".strip");
		this.shutter = document.querySelector("#captureButton");

		// *set event listeners

		// UI events
		// toggle for the tabs on/off
		this.tabToggle.forEach(toggle => toggle.addEventListener("click", (e) => {
			// if tab is open, then close it
			if (e.target.getAttribute("data-toggle") == "1") {
				gsap.to(toggle.parentNode, {
					duration: 0.25,
					height: "45px",
					backgroundColor: "darksalmon",
					onStart: function () {
						e.target.parentNode.style.overflow = "hidden";
					}
				});
				e.target.setAttribute("data-toggle", 0)
			} else {
				// else if tab is open, then close it
				gsap.to(toggle.parentNode, {
					duration: 0.25,
					height: "auto",
					backgroundColor: "#2891e7",
					onComplete: function () {
						e.target.parentNode.style.overflow = "auto";
					}
				});
				e.target.setAttribute("data-toggle", 1)
			}
		}))

		// *adding event listeners on the previews
		// event listener for the original preview -- resets all the styles
		this.video.addEventListener("click", () => this.resetFilters());

		// event listener for the red filter
		this.redPreview.addEventListener("click", () => {
			this.greenScreen = false;
			this.split = false;
			this.red = !this.red;
			this.nightMode = false;
			this.pinkStale = false;
		});

		// event listener for the split filter
		this.splitPreview.addEventListener("click", () => {
			this.greenScreen = false;
			this.split = !this.split;
			this.red = false;
			this.nightMode = false;
			this.pinkStale = false;
		});

		// event listener for the green screen filter
		this.greenScreenPreview.addEventListener("click", (e) => {
			this.greenScreen = !this.greenScreen;
			this.split = false;
			this.red = false;
			this.nightMode = false;
			this.pinkStale = false;
		});

		// event listener for the night mode filter
		this.nightModePreview.addEventListener("click", (e) => {
			this.greenScreen = false;
			this.split = false;
			this.red = false;
			this.nightMode = !this.nightMode;
			this.pinkStale = false;
		});

		// event listener for the stale pink filter
		this.pinkStalePreview.addEventListener("click", (e) => {
			this.greenScreen = false;
			this.split = false;
			this.red = false;
			this.nightMode = false;
			this.pinkStale = !this.pinkStale;
		});

		// event handler for all the color sliders to handle the change in value
		this.colorSliders.forEach(input => input.addEventListener("change", () => this.loadGSValues()));

		// * DRAG AND DROP EVENTS

		// event handler to get mouse coordinates on the canvas while dragging over it
		this.canvas.addEventListener("dragover", (ev) => {
			ev.preventDefault();
			this.mousePos = this.getMousePos(this.canvas, ev);
		});

		// event handler to prevent from opening the image link when dropped
		this.canvas.addEventListener("drop", (ev) => {
			ev.preventDefault();
		});

		// drag event handler for all the stickers
		this.stickers.forEach(sticker => {
			sticker.addEventListener("dragstart", (ev) => {
				this.addedSticker = document.querySelector(`#${ev.target.id}`);
			});
		});

		// event handler to reset sticker button
		this.resetStickers.addEventListener("click", () => this.addedSticker = "");

		// resetting the filters for initial load
		this.resetFilters();

		// loading initial green screen color values
		this.loadGSValues();

		// getting the video feed
		this.getVideo();

		// event listener for shutter button to take pictures
		this.shutter.addEventListener("click", () => this.takePhoto());

		// set up our listener for painting to our canvas
		this.video.addEventListener("canplay", () => {
			this.paintToCanvas();
		});
	}

	// function to get the values of color sliders
	loadGSValues() {
		this.rMinVal = this.rMin.value;
		this.gMinVal = this.gMin.value;
		this.bMinVal = this.bMin.value;
		this.rMaxVal = this.rMax.value;
		this.gMaxVal = this.gMax.value;
		this.bMaxVal = this.bMax.value;
	}

	// function to reset all the filters
	resetFilters() {
		// booleans for showing/hiding effects
		this.red = false;
		this.split = false;
		this.greenScreen = false;
		this.nightMode = false;
		this.pinkStale = false;
	}

	// set up streaming video
	getVideo() {
		// to use on server, it has to be an https://
		// returns a promise and is followed by a then()
		navigator.mediaDevices.getUserMedia({
			// which media to grab
			video: true,
			audio: false
		}).then(localMediaStream => {
			// setting the source of the video to the stream grabbed
			this.video.srcObject = localMediaStream;
			this.video.play();
		}).catch(error => {
			console.log(`We do not want a video ${error}`);
		});
	}

	// function to set height and width of the canvas
	setCanvasDimentions() {
		// get the height and width of the video and size the canvas
		this.width = this.video.videoWidth;
		this.height = this.video.videoHeight;

		// setting up main canvas and the preview canvases' dimentions
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.redPreview.width = this.width;
		this.redPreview.height = this.height;
		this.splitPreview.width = this.width;
		this.splitPreview.height = this.height;
		this.greenScreenPreview.width = this.width;
		this.greenScreenPreview.height = this.height;
		this.nightModePreview.width = this.width;
		this.nightModePreview.height = this.height;
		this.pinkStalePreview.width = this.width;
		this.pinkStalePreview.height = this.height;
	}

	// function to draw the video feed on all canvas
	drawOnCanvas() {
		// drawing on different canvases
		this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
		this.redPrevCtx.drawImage(this.video, 0, 0, this.width, this.height);
		this.splitPrevCtx.drawImage(this.video, 0, 0, this.width, this.height);
		this.greenScreenPrevCtx.drawImage(this.video, 0, 0, this.width, this.height);
		this.nightModePrevCtx.drawImage(this.video, 0, 0, this.width, this.height);
		this.pinkStalePrevCtx.drawImage(this.video, 0, 0, this.width, this.height);
	}

	// *paint the video stream from the camera to canvas
	paintToCanvas() {
		// setting canvas dimentions
		this.setCanvasDimentions();

		// set up the interval to draw to the canvas
		return setInterval(() => {

			// drawing on all the canvas
			this.drawOnCanvas();

			// pulling the image data from different canvases
			let pixels = this.ctx.getImageData(0, 0, this.width, this.height);
			let redPixels = this.redPrevCtx.getImageData(0, 0, this.width, this.height);
			let splitPixels = this.splitPrevCtx.getImageData(0, 0, this.width, this.height);
			let greenPixels = this.greenScreenPrevCtx.getImageData(0, 0, this.width, this.height);
			let nightModePixels = this.nightModePrevCtx.getImageData(0, 0, this.width, this.height);
			let pinkStalePixels = this.pinkStalePrevCtx.getImageData(0, 0, this.width, this.height);

			// checking if any filter is set
			if (this.split == true) {
				pixels = this.rgbSplit(pixels);
			} else if (this.red == true) {
				pixels = this.redEffect(pixels);
			} else if (this.greenScreen == true) {
				pixels = this.greenScreenEffect(pixels);
			} else if (this.nightMode == true) {
				pixels = this.nightModeEffect(pixels);
			} else if (this.pinkStale == true) {
				pixels = this.pinkStaleEffect(pixels);
			}
			
			// drawing on the video on main canvas
			this.ctx.putImageData(pixels, 0, 0);

			// if a sticker is placed, draw the sticker on canvas at the mouse location
			if (this.addedSticker && this.mousePos) {
				this.ctx.drawImage(this.addedSticker, this.mousePos.x - this.addedSticker.clientWidth, this.mousePos.y - this.addedSticker.clientHeight, this.addedSticker.width, this.addedSticker.height);
			}

			// updating the preview of the red filter
			redPixels = this.redEffect(redPixels);
			this.redPrevCtx.putImageData(redPixels, 0, 0);

			// updating the preview of the split filter
			splitPixels = this.rgbSplit(splitPixels);
			this.splitPrevCtx.putImageData(splitPixels, 0, 0);

			// updating the preview of the green screen filter
			greenPixels = this.greenScreenEffect(greenPixels);
			this.greenScreenPrevCtx.putImageData(greenPixels, 0, 0);

			// updating the preview of the night mode filter
			nightModePixels = this.nightModeEffect(nightModePixels);
			this.nightModePrevCtx.putImageData(nightModePixels, 0, 0);

			// updating the preview of the pinkStale filter
			pinkStalePixels = this.pinkStaleEffect(pinkStalePixels);
			this.pinkStalePrevCtx.putImageData(pinkStalePixels, 0, 0);
		}, 16);
	}

	// *green screen effect
	greenScreenEffect(pixels) {
		// creating a ghost canvas to draw image data for background
		let imageCanvas = document.createElement('canvas');
		let ictx = imageCanvas.getContext('2d');

		// setting canvas width
		imageCanvas.width = this.width;
		imageCanvas.height = this.height;

		// drawing an image to ghost canvas
		ictx.drawImage(this.bg, 0, 0, this.width, this.height);

		// reading image data from ghost canvas
		let imagePixels = ictx.getImageData(0, 0, this.width, this.height);

		// setting up the loop to read the data 4 bits at a time
		// grab the data array from the video pixels and store it for manipulation
		for (let i = 0, size = pixels.data.length; i < size; i += 4) {
			// storing pixels data into r, g, b to check against colors
			let r = pixels.data[i];
			let g = pixels.data[i + 1];
			let b = pixels.data[i + 2];

			// checking if the pixel color data falls in the specified range
			if (!(r > this.rMinVal && g > this.gMinVal && b > this.bMinVal & r < this.rMaxVal && g < this.gMaxVal && b < this.bMaxVal)) {
				// replacing the pixels of drawn image
				imagePixels.data[i] = r;
				imagePixels.data[i + 1] = g;
				imagePixels.data[i + 2] = b;
			}

		}
		return imagePixels;
	}

	// *rgb split pixels
	rgbSplit(pixels) {
		// setting up the loop to read the data 4 bits at a time
		// grab the data array from the video pixels and store it for manipulation
		for (let i = 0; i < pixels.data.length; i += 4) {
			// shift the pixel values over and rewrite
			pixels.data[i] = pixels.data[i + 100]; // red
			pixels.data[i + 1] = pixels.data[i + 1]; // green
			pixels.data[i + 2] = pixels.data[i + 202]; // blue
			// pixels.data[i + 3] = pixels.data[i + 2] // alpha
		}
		return pixels;
	}

	// *rgb split pixels
	redEffect(pixels) {
		// setting up the loop to read the data 4 bits at a time
		// grab the data array from the video pixels and store it for manipulation
		for (let i = 0; i < pixels.data.length; i += 4) {
			// shift the pixel values over and rewrite
			pixels.data[i] = pixels.data[i] + 100; // red
			pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
			pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
			// pixels.data[i + 3] = pixels.data[i + 2] // alpha
		}
		return pixels;
	}

	// *night mode pixels
	nightModeEffect(pixels) {
		// setting up the loop to read the data 4 bits at a time
		// grab the data array from the video pixels and store it for manipulation
		for (let i = 0; i < pixels.data.length; i += 4) {
			// shift the pixel values over and rewrite
			pixels.data[i] = pixels.data[i]; // red
			pixels.data[i + 1] = pixels.data[i] * 2; // green
			pixels.data[i + 2] = pixels.data[i] * 1.5; // blue
			// pixels.data[i + 3] = pixels.data[i + 2] // alpha
		}
		return pixels;
	}

	// *pink stale pixels
	pinkStaleEffect(pixels) {
		// setting up the loop to read the data 4 bits at a time
		// grab the data array from the video pixels and store it for manipulation
		let gradient = this.getGradient(this.width, this.height);

		for (let i = 0, size = gradient.data.length; i < size; i += 4) {
			// merging pixels with the gradient
			// red
			gradient.data[i + 0] = this.transform(pixels.data[i + 0], gradient.data[i + 0]);
			// green
			gradient.data[i + 1] = this.transform(pixels.data[i + 1], gradient.data[i + 1]);
			// blue
			gradient.data[i + 2] = this.transform(pixels.data[i + 2], gradient.data[i + 2]);
		}
		return gradient;
	}

	// function to merge two canvases' pixels
	transform(bottomPixel, topPixel) {
		return 255 - (255 - topPixel) * (255 - bottomPixel) / 255;
	}

	// function to create a gradient to be merged with the canvas
	getGradient(width, height) {
		let gradientCanvas = document.createElement('canvas');
		let gctx = gradientCanvas.getContext('2d');

		gradientCanvas.width = width;
		gradientCanvas.height = height;

		// Fill a Radial Gradient
		let gradient = gctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.6);

		gradient.addColorStop(0, "#804e0f");
		gradient.addColorStop(1, "#3b003b");

		gctx.fillStyle = gradient;
		gctx.fillRect(0, 0, width, height);

		return gctx.getImageData(0, 0, width, height);
	}

	// function to get mouse cordinates over the canvas
	getMousePos(canvas, ev) {
		let rect = canvas.getBoundingClientRect();
		return {
			x: ev.clientX - rect.left,
			y: ev.clientY - rect.top
		};
	}

	// *take photo
	// function to save the canvas data as an image and show it in the gallery
	takePhoto() {
		const data = this.canvas.toDataURL('image/jpg');
		const link = document.createElement('a');
		link.href = data;
		link.setAttribute('download', 'Photo');
		link.textContent = "Download Image";
		link.innerHTML = `<img src="${data}" />`;
		this.strip.insertBefore(link, this.strip.firstChild);
	}
}

let myPhotobooth = new Photobooth();