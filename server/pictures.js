var ImagesStore = new FS.Store.GridFS('imageStore');

Images = new FS.Collection("images",{
	stores:[ImagesStore],
	filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Images.allow({
	insert:function(){
		return true;
	},
	remove:function(){
		return false;
	},
	update:function(){
		return false;
	}
});

Images.deny({
	insert:function(){
		return false;
	},
	remove:function(){
		return true;
	},
	update:function(){
		return true;
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

ProfilePictures.allow({
	insert:function(){
		return true;
	},
	remove:function(){
		return false;
	},
	update:function(){
		return false;
	}
});

ProfilePictures.deny({
	insert:function(){
		return false;
	},
	remove:function(){
		return true;
	},
	update:function(){
		return true;
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












