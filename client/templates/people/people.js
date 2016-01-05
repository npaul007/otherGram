Meteor.subscribe('accounts');

Template.people.helpers({
	'users':function(){
		return Meteor.users.find();
	}
})
