Template.seePics.helpers({
	'usersPictures':function(){
		return Images.find({"metadata.userId":Session.get('currentUser')} ,{sort:{"uploadedAt":-1}});
	},
	'imagesLoaded':function(){
 		return Session.get('picturesLoaded');
 	}
});

Template.registerHelper('getCurrentUsername', function(){
	return Meteor.users.findOne({_id:Session.get('currentUser')}).username;
});