if(Meteor.isClient){
	Meteor.subscribe('accounts');
}

Template.people.helpers({
	'users':function(){
		return Meteor.users.find();
	}
})

Template.people.events({
	'click #userDiv':function(event,template){
		event.preventDefault();
		var selectedUserId = this._id;
		Session.set('currentUser',selectedUserId);
		console.log(Session.get('currentUser'));
	}
});
