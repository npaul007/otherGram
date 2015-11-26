Template.layout.events({
	'click .fa-sign-out':function(){
		Meteor.logout();
	}
});

Template.layout.helpers({
	'username':function(){
		return Meteor.user().username;
	}
});

Template.registerHelper("isCurrentPage",function(current){
	return current === Session.get("currentRouteName") ;
});