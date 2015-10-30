Template.layout.events({
	'click .fa-sign-out':function(){
		Router.go('/');
	},
	'click .fa-globe':function(){
		Router.go('/worldPics');
	},
	'click .fa-home':function(){
		Router.go('/yourPics');
	},
	'click .fa-instagram':function(){
		Router.go('/photoCrop');
	}
});
