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

		var file = $('#uploaded').get(0).files[0]; 
		var fsFile = new FS.File(file);
		var textareaText = $('#text').val()

		fsFile.metadata = {
			likes:[],
			post:[
				[Meteor.user().username , textareaText]
			],
			userId:Meteor.userId(),
			username:Meteor.user().username,
			date:Date()
		};
		
		if ($('#uploaded').get(0).files.length === 0) {
		    alert("No files selected.");
		}else{
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
		template.find('#uploaded').click();
	}
});

Template.photoCrop.rendered=function(){
	$("#uploaded").change(function(){
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

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#displayPic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}



