Template.layout.events({
	'click .fa-globe':function(){
		Router.go('/');
		removeIconClasses(this);
	},
	'click .fa-home':function(){
		Router.go('/yourPics');
		removeIconClasses(this);
	},
	'click .fa-instagram':function(){
		Router.go('/photoCrop');
		removeIconClasses(this);
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
	$(element).addClass('selected');
}

Template.layout.helpers({
	'username':function(){
		return Meteor.user().username;
	}
});


