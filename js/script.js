let canvas = document.getElementById('canvas');
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
canvas.addEventListener('mouseover', sketchPen);

function toggleEraser(e) {
	let dataSketchMethod = canvas.getAttribute('data-sketch-method');

	e.target.classList.toggle('enabled');

	if (e.target.classList.contains('enabled')) {
		e.target.style.transform = 'scale(1.1)';

		if (dataSketchMethod === 'pen') {
			console.log('remove pen listener')
			canvas.removeEventListener('mouseover', sketchPen);

			function erasePen(e) {
				let currentOpacity = +e.target.style.opacity;

				if (!e.target.classList.contains('pixel')) return;
				if (currentOpacity === 0) return;
			
				e.target.style.opacity = 0;
			}

			canvas.addEventListener('mouseover', erasePen)
		} else {
			console.log('remove shade listener');
			canvas.removeEventListener('mouseover', sketchShade);
		
			function eraseShade(e) {
				let currentOpacity = +e.target.style.opacity;
				let initialOpacity = 0.2;

				if (!e.target.classList.contains('pixel')) return;
				if (currentOpacity === 0) return;
			
				e.target.style.opacity = currentOpacity -= initialOpacity;
			}

			canvas.addEventListener('mouseover', eraseShade)
		}
	} else {
		e.target.style.transform = 'scale(1)';

		if (dataSketchMethod === 'pen') {
			canvas.removeEventListener('mouseover', erasePen);
		} else {
			canvas.removeEventListener('mouseover', eraseShade);
		}

		if (dataSketchMethod === 'pen') {
			canvas.addEventListener('mouseover', sketchPen);
		} else {
			canvas.addEventListener('mouseover', sketchShade);
		}
	}
} 
eraseToggleBtn.addEventListener('click', toggleEraser)

function toggleShade(e) {
	let dataSketchMethod = canvas.getAttribute('data-sketch-method');

	e.target.classList.toggle('enabled');
	
	canvas.removeEventListener('mouseover', sketchShade);
	canvas.removeEventListener('mouseover', sketchPen);
	
	if (e.target.classList.contains('enabled')) {
		canvas.removeEventListener('mouseover', sketchPen);
		canvas.setAttribute('data-sketch-method', 'shade');
		canvas.addEventListener('mouseover', sketchShade);
	} else {
		canvas.removeEventListener('mouseover', sketchShade);
		canvas.setAttribute('data-sketch-method', 'pen');
		canvas.addEventListener('mouseover', sketchPen);
	}
}
shadeToggleBtn.addEventListener('click', toggleShade);
		
function clearCanvas() {
	for (let i = 0; i < pixels.length; ++i) {
		pixels[i].classList.add('refresh');
		pixels[i].addEventListener('animationend', () => {
			pixels[i].classList.remove('refresh');
			pixels[i].style.setProperty('opacity', 0);
		});
	}
}
startOverBtn.addEventListener('click', clearCanvas)

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