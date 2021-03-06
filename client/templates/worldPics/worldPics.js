// formats pictures in a scrollable form showing comments likes and when the picture was posted
var addBars = function() {
	$('.picDiv').addClass('worldPicContainer');
	$('.yImages').removeClass('yourImages');

	var toShow = ['.pProfile',
				  '.pDelete',
				  '.pDate',
				  '.pLikes',
				  '.pUser',
				  '.pComment',
				  '.pPost',
				  '.fa-pencil-square-o'
				  ];

	for(var p = 0; p< toShow.length; p++){
		$(toShow[p]).show();
	}
}

// formats photos in a grid format
var addGrid = function() {
	$('.picDiv').removeClass('worldPicContainer');
	$('.yImages').addClass('yourImages');

	var toHide = ['.pProfile',
				  '.pDelete',
				  '.pDate',
				  '.pLikes',
				  '.pUser',
				  '.pComment',
				  '.pPost',
				  '.fa-pencil-square-o'
				 ];

	for(var i = 0; i< toHide.length; i++){
		$(toHide[i]).hide();
	}
}

function checkPictureFormatSetting(){
	if(Session.get('currentDisplaySettingWorldPics') === "grid" ){
		addGrid();
	}else{
		addBars();
	}
}

// id generator
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

// Returns the image collections in order of the most recent picture upload date
Template.worldPics.helpers({
 	'images': function(){
 		return Images.find({},{sort:{"uploadedAt":-1}});
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
	// if more than one person likes a photo
	if(arrayObject.length >= 2){
		return arrayObject.length +" people like this";
	}
	// if nobody likes a photo
	else if(arrayObject.length === 0){
		return " ";
	}
	// if one person likes a photo
	else{
		return arrayObject.length+" person likes this";
	}
});

Template.registerHelper("showOrHideBlock",function(arrayElement, ownersUserId){
	if(Meteor.userId() === arrayElement.userId || Meteor.user().profile.type === 'admin' || Meteor.userId() === ownersUserId){
		return true;
	}else{
		return false;
	}
});

Template.registerHelper("postProfilePic",function(userId){
	if(ProfilePictures.find({"metadata.userId":userId}).count() > 0){
		return ProfilePictures.findOne({"metadata.userId":userId}).url();
	}else{
		return "default-user-icon-profile.png";
	}
});

Template.registerHelper("likedPhoto",function(){
	if(Images.find(
			{
				$and: [
					{
						_id:this._id
					}, 
					{
						"metadata.likes":
						{
							$elemMatch:
							{
								"userId":Meteor.userId()
							}
						}
					}
				]
			}
			).count() > 0){
		return true;
	}
});

/* when the world pics template is rendered check to see current session variable to see what 
format to view pictures in the user last selected */
Template.worldPics.rendered = function(){
	var pos = Session.get('worldPicsVerticalPosition');
	if(typeof  pos === 'undefined'){
		$(document).scrollTop(0);
	}else{
		//console.log('height is'+Session.get('worldPicsVerticalPosition'));
		$(document).scrollTop(Session.get('worldPicsVerticalPosition'));
	}

	if(Session.get('currentDisplaySettingWorldPics') === "grid" ){
		addGrid();
	}else{
		addBars();
	}

	$(window).scroll(function(){
		if(Router.current().route.getName() === 'worldPics'){
			Session.set('worldPicsVerticalPosition', $(document).scrollTop());
		}
	});

	Session.set('previousPage',Router.current().route.getName());
}

uploadStream.on('uploaded',function(){
	checkPictureFormatSetting();
});

Template.worldPics.events({
	'click .fa-pencil-square-o':function(event,template){
		event.preventDefault();

		var username = event.target.getAttribute('username');
		var userId = event.target.getAttribute('userId');
		var comment = event.target.getAttribute('currentComment');
		var commentId = event.target.getAttribute('commentId');
		var imageId = event.target.getAttribute('currentId');
		var ownersUserId = event.target.getAttribute('ownersUserId');

		if(Meteor.userId() === userId || Meteor.userId() === ownersUserId || Meteor.user().profile.type === 'admin'){
			if(confirm("Would you like to delete this comment?")){
				Meteor.call('removeComment',imageId,commentId,userId,username,comment);
			}else{
				if(Meteor.userId() == userId){
					if(confirm("Would you like to edit this comment?")){
						var edit = prompt("Your comment:",comment);
						Meteor.call('editComment',imageId,userId,username,comment,commentId,edit);
					}
				}
			} 
		}
	},
	// like button
	'click .fa-thumbs-o-up':function(event){
		event.preventDefault();
		Meteor.call('likePicture',this._id);
	},
	'click .pPic':function(){
		// create sessions variable of selected photo to be displayed in selectedPicture template
		Session.set('selectedPicture',this._id); 

		// Session variable stored to set respective nav icon active
		Session.set('previousPage','worldPics');

		Router.go('/selectedPicture');
	},
 	'click #deletePostButton':function(){
 		if(Meteor.userId() === this.metadata.userId || Meteor.user().profile.type === 'admin'){
	 		var del = confirm("Are you sure you want to delete this picture?");
	 		if(del){
	 			Meteor.call('removeImage',this._id, this.metadata.userId);
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

 			if(comment.length == 0){
 				return;
 			}else{
 				Meteor.call('insertComment',this._id,guidGenerator(),comment);
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


