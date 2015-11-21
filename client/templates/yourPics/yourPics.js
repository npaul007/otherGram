Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()} ,{sort:{"copies.images.updatedAt":-1}});
	}
});

Template.yourPics.events({
 	'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$inc:{"metadata.likes":1}});
 	},
 	'dblclick #postedYourPic':function(){
 		if(Meteor.user().profile.type === 'admin' || Meteor.userId() === this.metadata.userId){
 			Images.remove({_id:this._id});
 		}
 	}
});