// pixelRaiseOpacity
for (let i = 0; i <= pixels.length; ++i) {
	let opacity = 0;

	function paintIsh(e) {
		if (opacity === 1) return;
		e.target.style.opacity = opacity += 0.2;
	}

	pixels[i].addEventListener('mouseenter', paintIsh);
}
