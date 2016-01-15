// formats pictures in a scrollable form showing comments likes and when the picture was posted
addBars = function() {
	$('.picDiv').addClass('worldPicContainer');
	$('.yImages').removeClass('yourImages');

	var toShow = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

	for(var p = 0; p< toShow.length; p++){
		$(toShow[p]).show();
	}
}

// formats photos in a grid format
addGrid = function() {
	$('.picDiv').removeClass('worldPicContainer');
	$('.yImages').addClass('yourImages');

	var toHide = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

	for(var i = 0; i< toHide.length; i++){
		$(toHide[i]).hide();
	}
}

// Returns the image collections in order of the most recent picture upload date
Template.worldPics.helpers({
 	'images': function(){
 		return Images.find({},{sort:{"copies.images.updatedAt":-1}});
 	},
 	'imagesLoaded':function(){
 		return Session.get('picturesLoaded');
 	}
});

// Helper responsible for displaying time since picture was posted
Template.registerHelper("timeSincePosted",function(date){
	return moment(new Date(date)).fromNow();
});

Template.registerHelper("likeCount",function(arrayObject){
	if(arrayObject.length >= 2){
		return arrayObject.length +" people like this";
	}else if(arrayObject.length === 0){
		return " ";
	}else{
		return arrayObject.length+" person likes this";
	}
});

/* when the world pics template is rendered check to see current session variable to see what 
format to view pictures in the user last selected */
Template.worldPics.rendered = function(){
	if(Session.get('currentDisplaySettingWorldPics') === "grid"){
		addGrid();
	}else{
		addBars();
	}
}

Template.worldPics.events({
	// like button
	'click .fa-thumbs-o-up':function(event){
		event.preventDefault();
		if(Images.find({$and: [{_id:this._id}, {"metadata.likes":{$elemMatch:{"userId":Meteor.userId()}}}]}).count() > 0){
			if(confirm("You have already liked this photo, would you like to unlike this photo?")){
				Images.update({_id:this._id}, {$pull:{"metadata.likes":{"userId":Meteor.userId()}}});
			}else{
				return false;
			}
		}else{
			Images.update({_id:this._id}, {$push:{"metadata.likes":{"userId":Meteor.userId()}}});
		}
	},
	'click .pPic':function(){
		// create sessions variable of selected photo to be displayed in selectedPicture template
		Session.set('selectedPicture',this._id); 

		// Session variable stored to set respective nav icon active
		Session.set('previousPage','worldPics');

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
 		addGrid();
 		Session.set('currentDisplaySettingWorldPics',"grid");
 	},
 	'click #wpBars':function(){
 		addBars();
 		Session.set('currentDisplaySettingWorldPics',"bars");
 	},
 	'keypress #commentInput':function(event,template){
 		// if the enter button is pressed and comment input isnt empty, comment is submitted into array
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






