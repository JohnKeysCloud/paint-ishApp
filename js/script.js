const canvas = document.getElementById('canvas');
let pixelSetting = 16;

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
let pixels = document.getElementsByClassName('pixel');
for (let i = 0; i <= pixels.length; ++i) {
	let opacity = 0;

	function paintIsh(e) {
		if (opacity === 1) return;
		console.log(e.target);
		e.target.style.opacity = opacity += 0.2;
	}

	pixels[i].addEventListener('mouseenter', paintIsh);
}
