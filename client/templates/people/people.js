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

		Router.go('/seePics/'+this._id);
	}
});

Template.people.rendered = function(){
	var pos = Session.get('peopleVerticalPosition');
	if(typeof  pos === 'undefined'){
		$(document).scrollTop(0);
	}else{
		console.log('height is'+Session.get('peopleVerticalPosition'));
		$(document).scrollTop(Session.get('peopleVerticalPosition'));
	}
	$(window).scroll(function(){
		if(Router.current().route.getName() === 'people'){
			Session.set('peopleVerticalPosition', $(document).scrollTop());
			console.log(Session.get('peopleVerticalPosition'));
		}
	});
}
