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
	Session.set('previousPage', Router.current().route.getName());
	$('.fa-user-plus').addClass('active');

	var pos = Session.get('seePicsVerticalPosition');
	if(typeof  pos === 'undefined' || Session.get('currentUser') != Meteor.user().profile.currentUser){
		$(document).scrollTop(0);
	}else{
		console.log('height is'+Session.get('seePicsVerticalPosition'));
		$(document).scrollTop(Session.get('seePicsVerticalPosition'));
	}
	$(window).scroll(function(){
		if(Router.current().route.getName() === 'seePics'){
			Session.set('seePicsVerticalPosition', $(document).scrollTop());
			console.log(Session.get('seePicsVerticalPosition'));
		}
	});

}