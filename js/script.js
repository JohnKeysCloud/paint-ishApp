const pixels = document.getElementsByClassName('pixel');
const root = document.documentElement;
const slider = document.getElementById('slider');
const sliderOutput = document.getElementById('slider-output');
const gridBackgroundAdjuster = document.querySelector('#center-page main #canvas');
const pixelColorAdjuster = document.getElementById('color-pixels');
const canvasColorAdjuster = document.getElementById('canvas-background-color');
const eraseToggleBtn = document.getElementById('erasing-toggle');
const shadeToggleBtn = document.getElementById('shading-toggle');
const startOverBtn = document.getElementById('start-over-btn');

let canvas = document.getElementById('canvas');
let oneAxisLength = 16;

function sketchShade(e) {
	let currentOpacity = +e.target.style.opacity;
	let initialOpacity = 0.2;

	if (!e.target.classList.contains('pixel')) return;
	if (currentOpacity === 1) return;

	e.target.style.opacity = initialOpacity += currentOpacity;
}

function sketchPen(e) {
	e.target.style.opacity = 1;
}

function eraseShade(e) {
	let currentOpacity = +e.target.style.opacity;
	let initialOpacity = 0.2;

	if (!e.target.classList.contains('pixel')) return;
	if (currentOpacity === 0) return;

	e.target.style.opacity = currentOpacity -= initialOpacity;
}

function erasePen(e) {
	let currentOpacity = +e.target.style.opacity;

	if (!e.target.classList.contains('pixel')) return;
	if (currentOpacity === 0) return;

	e.target.style.opacity = 0;
}

function clearCanvas() {
	startOverBtn.classList.add('clicked');
	startOverBtn.addEventListener('animationend', () => startOverBtn.classList.remove('clicked'));

	for (let i = 0; i < pixels.length; ++i) {
		pixels[i].classList.add('refresh');
		pixels[i].addEventListener('animationend', () => {
			pixels[i].classList.remove('refresh');
			pixels[i].style.setProperty('opacity', 0);
		});
	}
	shadeToggleBtn
}
startOverBtn.addEventListener('click', clearCanvas);

function toggleEraser(e) {
	let dataSketchMethod = canvas.getAttribute('data-sketch-method');

	e.target.classList.toggle('enabled');

	if (e.target.classList.contains('enabled')) {
		if (dataSketchMethod === 'pen') {
			canvas.removeEventListener('mouseover', sketchPen);
			canvas.addEventListener('mouseover', erasePen);
		} else {
			canvas.removeEventListener('mouseover', sketchShade);
			canvas.addEventListener('mouseover', eraseShade);
		}

		if (shadeToggleBtn.classList.contains('enabled')) {
			let newCanvas = canvas.cloneNode(true);
			canvas.parentNode.replaceChild(newCanvas, canvas);
			canvas = newCanvas;
			newCanvas.addEventListener('mouseover', eraseShade);
		}
	} else {
		if (dataSketchMethod === 'pen') {
			canvas.removeEventListener('mouseover', erasePen);
			canvas.removeEventListener('mouseover', eraseShade);
			canvas.addEventListener('mouseover', sketchPen);
		} else {
			canvas.removeEventListener('mouseover', eraseShade);
			canvas.removeEventListener('mouseover', erasePen);
			canvas.addEventListener('mouseover', sketchShade);
		}
	}
} 
eraseToggleBtn.addEventListener('click', toggleEraser)

function toggleShade(e) {
	e.target.classList.toggle('enabled');
	
	if (e.target.classList.contains('enabled')) {

		canvas.removeEventListener('mouseover', sketchPen);
		canvas.setAttribute('data-sketch-method', 'shade');
		canvas.addEventListener('mouseover', sketchShade);

		if (eraseToggleBtn.classList.contains('enabled')) {
			let newCanvas = canvas.cloneNode(true);
			canvas.parentNode.replaceChild(newCanvas, canvas);
			canvas = newCanvas;
			canvas.addEventListener('mouseover', eraseShade);
		}
	} else {
		canvas.removeEventListener('mouseover', sketchShade);
		canvas.setAttribute('data-sketch-method', 'pen');
		canvas.addEventListener('mouseover', sketchPen);

		if (eraseToggleBtn.classList.contains('enabled')) {
			canvas.removeEventListener('mouseover', sketchPen);
			canvas.addEventListener('mouseover', erasePen);
		}
	}
}
shadeToggleBtn.addEventListener('click', toggleShade);

function canvasColorSwitch() {
	console.log('canvasColor Switch Event Triggered 💭');
	gridBackgroundAdjuster.style.setProperty('background', `${this.value}`);
}
canvasColorAdjuster.addEventListener('input', canvasColorSwitch);

function pixelColorSwitch() {
	console.log('pixelColor Switch Event Triggered 💭');

	let pixels = document.getElementsByClassName('pixel');
	for (let i = 0; i < pixels.length; ++i) {
		pixels[i].style.setProperty('background', `${this.value}`);
	}
}
pixelColorAdjuster.addEventListener('input', pixelColorSwitch);

function generatePixels() {
	let dimensions = oneAxisLength ** 2;

	for (let i = 0; i < dimensions; ++i) {
		let pixelBorder = document.createElement('div');
		pixelBorder.classList.add('pixel-border');

		let pixel = document.createElement('div');
		pixel.classList.add('pixel');

		pixelBorder.appendChild(pixel);
		canvas.appendChild(pixelBorder);
	}
	canvas.addEventListener('mouseover', sketchPen);
}

function destroyPixels() {
	while (canvas.firstChild) {
		canvas.removeChild(canvas.firstChild);
	}

	oneAxisLength = +slider.value;
	root.style.setProperty('--grid-fraction', oneAxisLength);

	generatePixels();
}

function updateSliderValue() {
	sliderOutput.innerHTML = `(${slider.value} x ${slider.value})`;
}

function createGrid() {
	updateSliderValue()
	destroyPixels();
}

createGrid();
slider.addEventListener('input', createGrid);