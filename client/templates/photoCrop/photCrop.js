Images = new FS.Collection("images",{
	stores:[new FS.Store.FileSystem("images",{})]
});

Template.photoCrop.events({
	'change #uploaded':function(event,template){
		event.preventDefault();
		var file = $('#uploaded').get(0).files[0]; // Stores temporaly the FSFile
		var fsFile = new FS.File(file); // take the FS.File object
		fsFile.metadata = {nameValueMetadata:"Cool Stuff"};
		Images.insert(fsFile);
	}
});




