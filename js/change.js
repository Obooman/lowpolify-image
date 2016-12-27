var fileName = document.querySelector('#fileName');
var download = document.querySelector('#downloadImage');

document.documentElement.ondragover = function(ev){
	ev.preventDefault();
}

document.documentElement.ondrop = function(ev){
	ev.preventDefault();

	var file = ev.dataTransfer.files[0];
	var reader = new FileReader();

	reader.readAsDataURL(file);

	reader.onload = function(){
		oImage.src = reader.result;
	}
}

download.onclick = function(){
	var oA = document.createElement('a');
	oA.href = oC.toDataURL();
	oA.download = fileName.value ? fileName.value : 'lowpolify_image' + '.png'

	oA.click();
}

