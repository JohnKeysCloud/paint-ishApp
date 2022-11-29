let canvas = document.getElementById('canvas');
const pixels = document.getElementsByClassName('pixel');
const root = document.documentElement;
const slider = document.getElementById('slider');
const sliderOutput = document.getElementById('slider-output');
const gridBackgroundAdjuster = document.querySelector('#center-page main #canvas');
const pixelColorAdjuster = document.getElementById('color-pixels');
const canvasColorAdjuster = document.getElementById('canvas-background-color');

let oneAxisLength = 16;

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

function pixelRaiseOpacity(e) {
	let currentOpacity = +e.target.style.opacity;
	let initialOpacity = 0.2;

	if (!e.target.classList.contains('pixel')) return;
	if (currentOpacity === 1) return;

	e.target.style.opacity = initialOpacity += currentOpacity;
}
canvas.addEventListener('mouseover', pixelRaiseOpacity);

function pixelCreation() {
	let dimensions = oneAxisLength ** 2;

	for (let i = 0; i < dimensions; ++i) {
		let pixelBorder = document.createElement('div');
		pixelBorder.classList.add('pixel-border');

		let pixel = document.createElement('div');
		pixel.classList.add('pixel');

		pixelBorder.appendChild(pixel);
		canvas.appendChild(pixelBorder);
	}
}

function pixelDestruction() {
	while (canvas.firstChild) {
		canvas.removeChild(canvas.firstChild);
	}

	oneAxisLength = +slider.value;
	root.style.setProperty('--grid-fraction', oneAxisLength);

	pixelCreation();
}

function updateSliderValue() {
	sliderOutput.innerHTML = `(${slider.value} x ${slider.value})`;
}

function createGrid() {
	updateSliderValue()
	pixelDestruction();
}
createGrid();

slider.addEventListener('input', createGrid);