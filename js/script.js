const canvasColorPicker = document.getElementById('canvas-background-color');
const eraseToggleBtn = document.getElementById('erasing-toggle');
const canvasBackgroundInput = document.querySelector('#center-page main #canvas');
const pixels = document.getElementsByClassName('pixel');
const pixelColorInput = document.getElementById('color-pixels');
const root = document.documentElement;
const shadeToggleBtn = document.getElementById('shading-toggle');
const slider = document.getElementById('slider');
const sliderOutput = document.getElementById('slider-output');
const startOverBtn = document.getElementById('start-over-btn');
const themeSelect = document.getElementById('theme-select');

let canvas = document.getElementById('canvas');
let oneAxisLength = 16;

function sketchShade(e) {
	let currentOpacity = +e.target.style.opacity;
	let initialOpacity = 0.2;
	
	if (!e.target.classList.contains('pixel')) return;
	if (currentOpacity === 1) return;
	
	if (e.which === 1) e.target.style.opacity = initialOpacity += currentOpacity;
}

function sketchPen(e) {
	if (e.which === 1) e.target.style.opacity = 1;
}

function eraseShade(e) {
	let currentOpacity = +e.target.style.opacity;
	let initialOpacity = 0.2;
	
	if (!e.target.classList.contains('pixel')) return;
	if (currentOpacity === 0) return;
	
	if (e.which === 1) e.target.style.opacity = currentOpacity -= initialOpacity;
}

function erasePen(e) {
	let currentOpacity = +e.target.style.opacity;

	if (!e.target.classList.contains('pixel')) return;
	if (currentOpacity === 0) return;
	
	if (e.which === 1) e.target.style.opacity = 0;
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
}
startOverBtn.addEventListener('click', clearCanvas);

function toggleEraser(e) {
	let dataSketchMethod = canvas.getAttribute('data-sketch-method');

	e.target.classList.toggle('enabled');

	if (e.target.classList.contains('enabled')) {
		if (dataSketchMethod === 'pen') {
			canvas.removeEventListener('mouseover', sketchPen);
			canvas.removeEventListener('mousedown', sketchPen);
			canvas.addEventListener('mouseover', erasePen);
			canvas.addEventListener('mousedown', erasePen);
		} else {
			canvas.removeEventListener('mouseover', sketchShade);
			canvas.removeEventListener('mousedown', sketchShade);
			canvas.addEventListener('mouseover', eraseShade);
			canvas.addEventListener('mousedown', eraseShade);
		}

		if (shadeToggleBtn.classList.contains('enabled')) {
			let newCanvas = canvas.cloneNode(true);
			canvas.parentNode.replaceChild(newCanvas, canvas);
			canvas = newCanvas;
			canvas.addEventListener('mouseover', eraseShade);
			canvas.addEventListener('mousedown', eraseShade);
		}
	} else {
		if (dataSketchMethod === 'pen') {
			canvas.removeEventListener('mouseover', erasePen);
			canvas.removeEventListener('mousedown', erasePen);
			canvas.addEventListener('mouseover', sketchPen);
			canvas.addEventListener('mousedown', sketchPen);
		} else {
			canvas.removeEventListener('mouseover', eraseShade);
			canvas.removeEventListener('mousedown', eraseShade);
			canvas.addEventListener('mouseover', sketchShade);
			canvas.addEventListener('mousedown', sketchShade);
		}
	}
} 
eraseToggleBtn.addEventListener('click', toggleEraser)

function toggleShade(e) {
	e.target.classList.toggle('enabled');
	
	if (e.target.classList.contains('enabled')) {

		canvas.removeEventListener('mouseover', sketchPen);
		canvas.removeEventListener('mousedown', sketchPen);
		canvas.setAttribute('data-sketch-method', 'shade');
		canvas.addEventListener('mouseover', sketchShade);
		canvas.addEventListener('mousedown', sketchShade);

		if (eraseToggleBtn.classList.contains('enabled')) {
			let newCanvas = canvas.cloneNode(true);
			canvas.parentNode.replaceChild(newCanvas, canvas);
			canvas = newCanvas;
			canvas.addEventListener('mouseover', eraseShade);
			canvas.addEventListener('mousedown', eraseShade);
		}
	} else {
		canvas.removeEventListener('mouseover', sketchShade);
		canvas.removeEventListener('mousedown', sketchShade);
		canvas.setAttribute('data-sketch-method', 'pen');
		canvas.addEventListener('mouseover', sketchPen);
		canvas.addEventListener('mousedown', sketchPen);

		if (eraseToggleBtn.classList.contains('enabled')) {
			canvas.removeEventListener('mouseover', sketchPen);
			canvas.removeEventListener('mousedown', sketchPen);
			canvas.addEventListener('mouseover', erasePen);
			canvas.addEventListener('mousedown', erasePen);
		}
	}
}
shadeToggleBtn.addEventListener('click', toggleShade);

function canvasColorSwitch() {
	canvasBackgroundInput.style.setProperty('background', `${this.value}`);
}
canvasColorPicker.addEventListener('input', canvasColorSwitch);

function pixelColorSwitch() {
	let pixels = document.getElementsByClassName('pixel');
	for (let i = 0; i < pixels.length; ++i) {
		pixels[i].style.setProperty('background', `${this.value}`);
	}
}
pixelColorInput.addEventListener('input', pixelColorSwitch);

function switchTheme(e) {
	if (e.target.value === 'light') {
		canvasColorPicker.setAttribute('value', '#896fbe');
		pixelColorInput.setAttribute('value', '#FFFFC9');

		root.style.setProperty('--color-background', 'var(--color-purple-rain)');
		root.style.setProperty('--color-canvas', 'var(--color-hot-pink)');
		root.style.setProperty('--color-canvas-background', 'var(--color-purple-rain)');
		root.style.setProperty('--color-card-background', 'var(--color-aqua)');
		root.style.setProperty('--color-card-shadow', 'var(--color-rebecca-purple)');
		root.style.setProperty('--color-pixel', 'var(--color-cream');
		root.style.setProperty('--color-select-background', 'var(--color-cream)');
		root.style.setProperty('--color-select-text', 'black');
		root.style.setProperty('--color-settings-border', 'silver');
		root.style.setProperty('--color-start-over-btn', '#CFCFC4');
		root.style.setProperty('--color-start-over-btn-2', '#ababa1');
		root.style.setProperty('--color-start-over-txt', 'black');
		root.style.setProperty('--color-text', 'black');

	} else if (e.target.value === 'dark') {
		canvasColorPicker.setAttribute('value', '#000000');
		pixelColorInput.setAttribute('value', '#FFFFC9');

		root.style.setProperty('--color-background', 'linear-gradient(to bottom right, #25112a, black)');
		root.style.setProperty('--color-canvas', 'var(--color-hot-pink)');
		root.style.setProperty('--color-canvas-background', 'black');
		root.style.setProperty('--color-card-background', 'black');
		root.style.setProperty('--color-card-shadow', '#FF7897');
		root.style.setProperty('--color-pixel', 'var(--color-cream');
		root.style.setProperty('--color-select-background', 'black');
		root.style.setProperty('--color-select-text', 'var(--color-cream)');
		root.style.setProperty('--color-settings-border', 'rgb(111, 111, 111)');
		root.style.setProperty('--color-start-over-btn', 'black');
		root.style.setProperty('--color-start-over-btn-2', 'var(--color-card-background)');
		root.style.setProperty('--color-start-over-txt', 'var(--color-cream)');
		root.style.setProperty('--color-text', 'var(--color-cream)');
	} else if (e.target.value === 'zima') {
		canvasColorPicker.setAttribute('value', '#00000');
		pixelColorInput.setAttribute('value', '#16B8F3');

		root.style.setProperty('--color-background', 'var(--image-space)');
		root.style.setProperty('--color-canvas', 'var(--color-zima-blue)');
		root.style.setProperty('--color-canvas-background', 'black');
		root.style.setProperty('--color-card-background', 'black');
		root.style.setProperty('--color-card-shadow', 'var(--color-zima-blue)');
		root.style.setProperty('--color-pixel', 'var(--color-zima-blue');
		root.style.setProperty('--color-select-background', 'black');
        root.style.setProperty('--color-select-text', 'var(--color-zima-blue)');
		root.style.setProperty('--color-settings-border', 'rgb(111, 111, 111)');
		root.style.setProperty('--color-start-over-btn', 'black');
		root.style.setProperty('--color-start-over-btn-2', 'var(--color-zima-blue)');
		root.style.setProperty('--color-start-over-txt', 'var(--color-cream)');
		root.style.setProperty('--color-text', 'var(--color-cream)');
	}
}
themeSelect.addEventListener('input', switchTheme);

function generatePixels() {

	let totalPixels = oneAxisLength ** 2;

	for (let i = 0; i < totalPixels; ++i) {
		let pixelBorder = document.createElement('div');
		pixelBorder.classList.add('pixel-border');

		let pixel = document.createElement('div');
		pixel.classList.add('pixel');

		pixelBorder.appendChild(pixel);
		canvas.appendChild(pixelBorder);
	}
	canvas.addEventListener('mouseover', sketchPen);
	canvas.addEventListener('mousedown', sketchPen);
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

function initiateUserPref() {
	let options = document.querySelectorAll('#theme-select > option');
	
	for (let i = 0; i < options.length; ++i) {
		if (options[i].getAttribute('value') === 'dark') {
			options[i].setAttribute('selected', '');
			root.style.setProperty('--color-background', 'linear-gradient(to bottom right, #25112a, black)');
			root.style.setProperty('--color-canvas-background', 'rgb(0, 0, 0)');
			root.style.setProperty('--color-card-background', 'rgb(0, 0, 0)');
			root.style.setProperty('--color-card-shadow', '#FF7897');
			root.style.setProperty('--color-select-background', 'black');
			root.style.setProperty('--color-select-text', 'var(--color-cream)');
			root.style.setProperty('--color-settings-border', 'rgb(111, 111, 111)');
			root.style.setProperty('--color-start-over-btn', 'black');
			root.style.setProperty('--color-start-over-btn-2', 'var(--color-card-background)');
			root.style.setProperty('--color-start-over-txt', 'var(--color-cream)');
			root.style.setProperty('--color-text', 'var(--color-cream)');
		}
	}
	canvasColorPicker.setAttribute('value', '#000000');
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	initiateUserPref();
}