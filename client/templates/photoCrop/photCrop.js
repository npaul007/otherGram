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

		Images.insert(fsFile);
		
		Router.go('/worldPics');
	}
});

Template.photoCrop.rendered=function(){
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
	});
}