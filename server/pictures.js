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

ProfilePictures.deny({
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

ProfilePictures.allow({
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




