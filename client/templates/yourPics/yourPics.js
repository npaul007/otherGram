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
				  '.fa-pencil-square-o'];

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
				  '.fa-pencil-square-o'];

	for(var i = 0; i< toHide.length; i++){
		$(toHide[i]).hide();
	}
}

function checkPictureFormatSetting(userId){
	if(Meteor.userId() === userId){
		if(Session.get('currentDisplaySettingYourPics') === "grid" ){
			addGrid();
		}else{
			addBars();
		}
	}
}

// id generator
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()} ,{sort:{"uploadedAt":-1}});
	},
 	'imagesLoaded':function(){
 		return Session.get('picturesLoaded');
 	}
});

/* when the world pics template is rendered check to see current session variable to see what 
format to view pictures in the user last selected */
Template.yourPics.rendered = function(){
	var pos = Session.get('yourPicsVerticalPosition');
	if(typeof  pos === 'undefined'){
		$(document).scrollTop(0);
	}else{
		//console.log('height is'+Session.get('yourPicsVerticalPosition'));
		$(document).scrollTop(Session.get('yourPicsVerticalPosition'));
	}

	if(Session.get('currentDisplaySettingYourPics') === "grid" ){
		addGrid();
	}else{
		addBars();
	}

	$(window).scroll(function(){
		if(Router.current().route.getName() === 'yourPics'){
			Session.set('yourPicsVerticalPosition', $(document).scrollTop());
			//console.log(Session.get('yourPicsVerticalPosition'));
		}
	});

	Session.set('previousPage',Router.current().route.getName());
}

uploadStream.on('uploaded',function(){
	checkPictureFormatSetting();
});

Template.yourPics.events({
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
		Session.set('previousPage','yourPics');

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

