Template.worldPics.helpers({
 	'images': function(){
 		return Images.find({},{sort:{"copies.images.updatedAt":-1}});
 	}
});

Template.worldPics.events({
 	'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$inc:{"metadata.likes":1}});
 	},
 	'dblclick #worldPicContainer':function(){
 		if(Meteor.user().profile.type === 'admin' || Meteor.userId() === this.metadata.userId){
 			Images.remove({_id:this._id});
 		}
 	}
});