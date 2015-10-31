Images = new FS.Collection("images",{
	stores:[new FS.Store.FileSystem("images",{})]
});

Posts = new Meteor.Collection('posts');


Template.photoCrop.events({

});

Template.photoCrop.helpers({
	images:function(){
		return Images.find();
	}
});

function uploadPic(file){
	FS.Utility.eachFile(event,function(file){
		Images.insert(file,function(error){
				console.log(error);
			}
		);
	});
}

function uploadPost(username,comment,imageId){
	Posts.insert({
		username:username,
		commnet:comment,
		likes:0,
		imageId:imageId
	});
}