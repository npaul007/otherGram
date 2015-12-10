Template.layout.events({
	'click .fa-sign-out':function(){
		Meteor.logout();
	},
	'click .fa-globe':function(){
		Router.go('/');
	},
	'click .fa-instagram':function(){
		Router.go('/photoCrop');
	},
	'click .fa-home':function(){
		Router.go('/yourPics');
	}
});

Template.navbar.helpers({
	'username':function(){
		return Meteor.user().username;
	}
});

Template.registerHelper("isCurrentPage",function(current){
	return current === Session.get("currentRouteName");
});

Template.footer.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("currentUser");
});