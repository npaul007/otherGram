Template.login.events({
	'click #registerButton':function(){
		Router.go('/register');
	},
	'click #loginButton':function(event,template){

		var username = template.find('#usernameLogin').value;
		var password = template.find('#passwordLogin').value;

		Meteor.loginWithPassword(username,password,function(error){
			if(error){
				alert("incorrect password");
			}else{
				Router.go('/world');
			}
		});
	}
});

Template.login.rendered=function(){
	// if user is already logged in
	if(Meteor.userId()){
		Router.go('/world');
	}
}