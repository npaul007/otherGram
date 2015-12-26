Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()} ,{sort:{"copies.images.updatedAt":-1}});
	}
});

Template.yourPics.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("myImages");
});


Template.yourPics.events({
 	/*'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$push:{"metadata.likes":Meteor.userId()}});
 	}, */
	'dblclick .picDiv':function(){
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
		$('.picDiv').removeClass('shadow');
		$('.picDiv').removeClass('worldPicContainer');
		$('.yImages').addClass('yourImages');

		var toHide = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

		for(var i = 0; i< toHide.length; i++){
			$(toHide[i]).hide();
		}
	},
	'click #wpBars':function(){
		$('.picDiv').addClass('shadow');
		$('.picDiv').addClass('worldPicContainer');
		$('.yImages').removeClass('yourImages');

		var toShow = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

		for(var p = 0; p< toShow.length; p++){
			$(toShow[p]).show();
		}
	},
	'keypress #commentInput':function(event,template){
 		if(event.keyCode == 13){
 			var comment = template.find('#commentInput').value;
 			Images.update({_id:this._id} , 
 				{$push:
 					{"metadata.post":
 						[
 							Meteor.user().username, 
 							comment
 						]
 					}
 				}
 			);
 			template.find('#commentInput').value = " ";
 		}
 	}

});

