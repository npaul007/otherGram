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

		var username = this.username;

		Session.set('personSelected', username);

		Router.go('/people/'+username);
	},
	'click #ban-people':function(){
		if(confirm("Are you sure you want to ban " + this.username + "?")){
 			Meteor.call('removeUser',this._id, Meteor.userId());
 			Meteor.call('removeUserImages',this._id, Meteor.userId());
 		}
	}
});

Template.people.rendered = function(){
	var person = Session.get('personSelected');

	if(person != null)
		Router.go('/people/'+person);
	else
		Router.go('people');

	var pos = Session.get('peopleVerticalPosition');
	if(typeof  pos === 'undefined'){
		$(document).scrollTop(0);
	}

	else{
		//console.log('height is'+Session.get('peopleVerticalPosition'));
		$(document).scrollTop(Session.get('peopleVerticalPosition'));
	}

	$(window).scroll(function(){
		if(Router.current().route.getName() === 'people'){
			Session.set('peopleVerticalPosition', $(document).scrollTop());
			//console.log(Session.get('peopleVerticalPosition'));
		}
	});

	Session.set('previousPage',Router.current().route.getName());
}
