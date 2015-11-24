Template.layout.events({
	'click .fa-globe':function(){
		Router.go('/');
		isSelected('.fa-globe');
	},
	'click .fa-home':function(){
		Router.go('/yourPics');
		isSelected('.fa-home');
	},
	'click .fa-instagram':function(){
		Router.go('/photoCrop');
		isSelected('.fa-instagram');
	},
	'click .fa-sign-out':function(){
		isSelected('.fa-sign-out');
		Meteor.logout();
	},
	'click .fa-users':function(){
		//isSelected('.fa-users');
	}
});

isSelected = function(element){
	var icons = ['.fa-globe','.fa-home','.fa-instagram','.fa-sign-out'];

	for(i = 0; i < icons.length; i++){
		$(icons[i]).removeClass('selected');
	}

	$(element).addClass('selected');
}

currentRouteSelected = function(){
	var routeName = Router.current().route.getName();

	switch(routeName){
		case 'worldPics':
			isSelected('.fa-globe');
		break;

		case 'yourPics':
			isSelected('.fa-home');
		break;

		case 'photoCrop':
			isSelected('.fa-instagram');
		break;
	}
}

Template.layout.helpers({
	'username':function(){
		return Meteor.user().username;
	}
});


