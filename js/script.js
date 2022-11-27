const canvas = document.getElementById('canvas');
const pixels = document.getElementsByClassName("pixel");
const root = document.documentElement;

let oneAxisLength = 16;
let pixelSetting = oneAxisLength ** 2;

// pixelCreation
for (let i = 0; i < pixelSetting; ++i) {
	let pixelBorder = document.createElement('div');
	pixelBorder.classList.add('pixel-border');
	
	let pixel = document.createElement('div');
	pixel.classList.add('pixel');
	
	pixelBorder.appendChild(pixel);	
	canvas.appendChild(pixelBorder);
}

// pixelRaiseOpacity
function paintIsh(e) {
	let currentOpacity = +e.target.style.opacity;
	let initialOpacity = 0.2;
	
	if (!e.target.classList.contains('pixel')) return;
	
	if (currentOpacity > 1) return;
	e.target.style.opacity = initialOpacity += currentOpacity;
}

canvas.addEventListener('mouseover', paintIsh);