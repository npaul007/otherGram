Template.layout.events({
	'click .fa-globe':function(){
		Router.go('/');
	},
	'click .fa-home':function(){
		Router.go('/yourPics');
	},
	'click .fa-instagram':function(){
		Router.go('/photoCrop');
	},
	'click .fa-sign-out':function(){
		Meteor.logout();
	}
});

Template.navbar.helpers({
	'username':function(){
		return Meteor.user().username;
	}
});
