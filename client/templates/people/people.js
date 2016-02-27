Meteor.subscribe('accounts',function onReady(){
	Session.set('accountsLoaded',true);
});

Template.people.helpers({
	'users':function(){
		return Meteor.users.find();
	},
	'usersLoaded':function(){
		return Session.get('accountsLoaded');
	}
});

Template.people.events({
	'click #albumButton':function(event,template){
		event.preventDefault();

		var selectedUserId = this._id;
		Session.set('currentUser',selectedUserId);

		console.log(Session.get('currentUser'));

		Router.go('/seePics');

	}
});
