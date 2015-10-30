Template.login.events({
	'click #registerButton':function(){
		Router.go('/register');
	},
	'click #loginButton':function(){
		Router.go('/worldPics');
	}
});