Template.worldPics.helpers({
 	'images': function(){
 		return Images.find({},{sort:{"copies.images.updatedAt":-1}});
 	}
});

Template.worldPics.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("images");
});

Template.worldPics.events({
 	'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$inc:{"metadata.likes":1}});
 	},
 	'dblclick #worldPicContainer':function(){
 		if(Meteor.user().profile.type === 'admin'){
 			Images.remove({_id:this._id});
 		}
 	},
 	'click #deletePostButton':function(){
 		if(Meteor.userId() === this.metadata.userId || Meteor.user().profile.type === 'admin'){
	 		var del = confirm("Are you sure you want to delete this picture?");
	 		if(del){
	 			Images.remove({_id:this._id});
	 		}
 		}
 	},
 	'click #wpGrid':function(){
 		$('.pic').addClass('yourImages');
 		$('.pic').removeClass('shadow')
 		$('.pic').removeAttr('id');
 		$('#userProfilePicPost').hide();
 		$('#deletePostButton').hide();
 		$('#likesDiv').hide();
 		$('#commentInput').hide();
 		$('#postUsername').hide();
 		$('#postUpdatedAt').hide();
 	}

});


