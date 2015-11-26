Template.layout.events({
	'click .fa-globe':function(){
		Router.go('/');
		removeIconClasses();
	},
	'click .fa-home':function(){
		Router.go('/yourPics');
		removeIconClasses();
	},
	'click .fa-instagram':function(){
		Router.go('/photoCrop');
		removeIconClasses();
	},
	'click .fa-sign-out':function(){
		Meteor.logout();
	},
	'click .fa-users':function(){
		//isSelected('.fa-users');
	}
});

removeIconClasses = function(element){
	var icons = ['.fa-globe','.fa-home','.fa-instagram']
	for(i = 0; i<icons.length; i++){
		$(icons[i]).removeClass('selected');
	}
}

Template.layout.helpers({
	'username':function(){
		return Meteor.user().username;
	}
});


