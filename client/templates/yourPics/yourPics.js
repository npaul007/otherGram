Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()} ,{sort:{"copies.images.updatedAt":-1}});
	}
});

Template.yourPics.events({
 	'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$inc:{"metadata.likes":1}});
 	}
});