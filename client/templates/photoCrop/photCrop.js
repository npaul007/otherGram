Images = new FS.Collection("images",{
	stores:[new FS.Store.FileSystem("images",{})]
});

Template.photoCrop.events({
	'click #submitPic':function(event,template){
		event.preventDefault();

		var file = $('#uploaded').get(0).files[0]; // Stores temporaly the FSFile
		var fsFile = new FS.File(file); // take the FS.File object

		var textareaText = $('#text').val()

		fsFile.metadata = {
			post:textareaText,
			likes:0,
			userId:Meteor.userId(),
			username:Meteor.user().username
		};
		
		if ($('#uploaded').get(0).files.length === 0) {
		    alert("No files selected.");
		}

		else if(corrupted){
			alert('file is either corrupted or not an image');
		}
		
		else{
			Images.insert(fsFile);
			Router.go('/world');
		}

	}
});

Template.photoCrop.rendered=function(){

	corrupted = false;

	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#displayPic').attr('src', e.target.result);
	        }

	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$("#uploaded").change(function(){
	    readURL(this);
	    $("#displayPic")
		    .on('load', function() { alert("image loaded correctly"); })
		    .on('error', function() { alert("File is corrupted"); corrupted = true;})
		    .attr("src", $(originalImage).attr("src"))
		;
	});
}