Template.worldPics.helpers({
 	'images': function(){
 		return Images.find({},{sort:{"copies.images.updatedAt":-1}});
 	}
});

Template.registerHelper("timeSincePosted",function(date){
	return moment(new Date(date)).fromNow();
});

Template.worldPics.onCreated(function () {
  this.subscribe("images");
});

Template.worldPics.events({
	'click .picDiv':function(){
		Session.set('selectedPicture',this._id);
		console.log(Session.get('selectedPicture'));
		Router.go('/selectedPicture');
	}
	,
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
 		$('.picDiv').removeClass('worldPicContainer');
 		$('.yImages').addClass('yourImages');

 		var toHide = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

 		for(var i = 0; i< toHide.length; i++){
 			$(toHide[i]).hide();
 		}
 	},
 	'click #wpBars':function(){
 		$('.picDiv').addClass('worldPicContainer');
 		$('.yImages').removeClass('yourImages');

 		var toShow = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

 		for(var p = 0; p< toShow.length; p++){
 			$(toShow[p]).show();
 		}
 	},
 	'keypress #commentInput':function(event,template){
 		if(event.keyCode == 13){
 			event.preventDefault();
 			var comment = event.target.value;
 			console.log(comment);
 			if(comment.length == 0){
 				return;
 			}else{
	 			Images.update({_id:this._id} , {$push:{"metadata.post":[Meteor.user().username, comment]}});
				event.target.value = "";
 			}
 		}
 	},
 	'focus input':function(){
		var windowWidth = $(window).width();
		if(windowWidth < 1000){
			$('.footer').hide();
		}
	},
	'blur input':function(){
		$('.footer').show();
	}

});








