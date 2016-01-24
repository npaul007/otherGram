Images = new FS.Collection("images",{
	stores:[new FS.Store.FileSystem("images",{path:"pictures"})],
	filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Images.deny({
 insert: function(){
	 return false;
 },
 update: function(){
	 return false;
 },
 remove: function(){
	 return false;
 },
 download: function(){
	 return false;
 }
});

Images.allow({
 insert: function(){
	 return true;
 },
 update: function(){
	 return true;
 },
 remove: function(){
	 return true;
 },
 download: function(){
	 return true;
 }
});

// if pictures collection is ready return true
Meteor.subscribe('pictures', function onReady(){
	Session.set('picturesLoaded',true);
});

Template.photoCrop.events({
	'click #submitPic':function(event,template){
		event.preventDefault();

		// create new fs file with the uploaded picture
		var file = $('#uploaded').get(0).files[0]; 
		var fsFile = new FS.File(file);

		// grab current user's username and their post
		var comment = template.find('#text').value;
		var username = Meteor.user().username;
		var _id = guidGenerator();
		var userId = Meteor.userId();

		// if text isn't posted insert nothing
		if(comment.length < 1){
			fsFile.metadata = {
				likes:[],
				comments:[],
				userId:Meteor.userId(),
				username:Meteor.user().username,
				date:Date()
			};
		}else{
			// create the metadata to store the date, comments, likes, userId and username
			fsFile.metadata = {
				likes:[],
				comments:[
					{_id:_id, userId:userId, username:username , comment:comment}
				],
				userId:Meteor.userId(),
				username:Meteor.user().username,
				date:Date()
			};
		}


		
		// if there is no uploaded picture
		if ($('#uploaded').get(0).files.length === 0) {
		    alert("No files selected.");
		}else{
			// if there is an uploaded picture insert the file into our collection
			Images.insert(fsFile,function(error,fileObject){
				if(error){
					alert('Upload failed... please try again.');
					return;
				}else{
					alert('Upload successful!');
					Router.go('/');
				}
			});
		}
	},
	'click #uploadLabel':function(event,template){
		event.preventDefault();
		// event for styled upload label
		template.find('#uploaded').click();
	}
});

Template.photoCrop.rendered=function(){
	// upload picture
	$("#uploaded").change(function(){
		// read the URL
	    readURL(this);

	    $("#displayPic")
		    .on('load', function() { 
		    	alert("Your image has loaded correctly."); 
		    })
		    .on('error', function() { 
		    	alert("File is corrupted!"); 
		    });
	});

}

// this function displays the picture on the photo upload display
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#displayPic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


