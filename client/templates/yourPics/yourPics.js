Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()});
	}
});

Template.yourPics.events({
 	'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$inc:{"metadata.likes":1}});
 	}
});