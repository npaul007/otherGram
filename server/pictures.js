var ImagesStore = new FS.Store.GridFS('imageStore');

Images = new FS.Collection("images",{
	stores:[ImagesStore],
	filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Meteor.publish('pictures',function(){
	return Images.find();
});


var ProfilePictureStore = new FS.Store.GridFS('profilePicStore');

ProfilePictures = new FS.Collection("profilePictures",{
	stores:[ProfilePictureStore],
	filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Meteor.publish('profilePictures',function(){
	return ProfilePictures.find();
});

uploadStream = new Meteor.Stream('photoupload');

uploadStream.permissions.read(function() {
	return true;
});

uploadStream.permissions.write(function() {
	return true;
});












