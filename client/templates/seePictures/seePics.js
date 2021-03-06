Template.seePics.helpers({
	'usersPictures':function(){
		return Images.find({"metadata.username":Template.currentData()} ,{sort:{"uploadedAt":-1}});
	},
	'imagesLoaded':function(){
 		return Session.get('picturesLoaded');
 	}
});

Template.registerHelper('getCurrentUsername', function(){
	return Meteor.users.findOne({username:Template.currentData()}).username;
});

Template.seePics.rendered = function(){
	//console.log(Router.current().route.getName());

	var pos = Session.get('seePicsVerticalPosition');

	if(typeof  pos === 'undefined' || 
		Template.currentData() != Session.get('previousPerson') ){
		$(document).scrollTop(0);
	}else{
		//console.log('height is'+Session.get('seePicsVerticalPosition'));
		$(document).scrollTop(Session.get('seePicsVerticalPosition'));
	}

	if(Session.get('currentDisplaySettingSeePics') === "grid" ){
		addGrid();
	}else{
		addBars();
	}

	$(window).scroll(function(){
		if(Router.current().route.getName() === 'seePics'){
			Session.set('seePicsVerticalPosition', $(document).scrollTop());
			//console.log(Session.get('seePicsVerticalPosition'));
		}
	});

	window.onpopstate = function(){
		Session.set('personSelected', null);
		Router.go(Session.get('previousPage'));
	}

	Session.set('previousPerson', Template.currentData());
	Session.set('previousPage',Router.current().route.getName());
}

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
		if(Session.get('currentDisplaySettingSeePics') === "grid" ){
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
Template.seePics.helpers({
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

uploadStream.on('uploaded',function(){
	checkPictureFormatSetting();
});

Template.seePics.events({
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
		Session.set('previousPage','seePics/:parameter');

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
	 			Meteor.call('removeImage',this._id, this.metadata.userId);
	 		}
 		}
 	},
 	'click #wpGrid':function(){
 		addGrid();
 		Session.set('currentDisplaySettingSeePics',"grid");
 	},
 	'click #wpBars':function(){
 		addBars();
 		Session.set('currentDisplaySettingSeePics',"bars");
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
	},
	'click #backToPeople':function(){
		Session.set('personSelected', null);
		Router.go('people');
	}
});


