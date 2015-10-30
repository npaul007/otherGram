Template.photoCrop.rendered=function(){
	$('.cropper-example-1 > img').cropper({
	  aspectRatio: 16 / 9,
	  autoCropArea: 0.65,
	  strict: false,
	  guides: false,
	  highlight: false,
	  dragCrop: false,
	  cropBoxMovable: false,
	  cropBoxResizable: false
	});
}