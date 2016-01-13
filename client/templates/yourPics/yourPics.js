Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()} ,{sort:{"copies.images.updatedAt":-1}});
	},
 	'imagesLoaded':function(){
 		return Session.get('picturesLoaded');
 	}
});

/* when the world pics template is rendered check to see current session variable to see what 
format to view pictures in the user last selected */
Template.yourPics.rendered = function(){
	if(Session.get('currentDisplaySettingYourPics') === "grid"){
		addGrid();
	}else{
		addBars();
	}
}

Template.yourPics.events({
	'click .fa-thumbs-o-up':function(){
		if(this.metadata.likes.length === 0){
			Images.update({_id:this._id}, {$push:{"metadata.likes":Meteor.userId()}});
		}else{
			for(var g = 0; g<this.metadata.likes.length; g++){
				if(Meteor.userId() === this.metadata.likes[g]){
					var unlike = confirm("You have already liked this post, would you like to unlike it?");
					if(unlike){
						Images.update({_id:this._id}, {$pull:{"metadata.likes":Meteor.userId()}});
					}
				}else{
					Images.update({_id:this._id}, {$push:{"metadata.likes":Meteor.userId()}});
				}
			} 
		}
	},
	'click .pPic':function(){
		// create sessions variable of selected photo to be displayed in selectedPicture template
		Session.set('selectedPicture',this._id);

		// Session variable stored to set respective nav icon active
		Session.set('previousPage','yourPics');

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
 		Session.set('currentDisplaySettingYourPics',"grid");
 	},
 	'click #wpBars':function(){
 		addBars();
 		Session.set('currentDisplaySettingYourPics',"bars");
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

