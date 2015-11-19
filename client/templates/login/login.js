Template.login.events({
	'click #registerButton':function(){
		Router.go('/register');
	},
	'click #loginButton':function(event,template){

		var username = template.find('#loginUsername').value;
		var password = template.find('#loginPassword').value;

		Meteor.loginWithPassword(username,password,function(error){
			if(error){
				alert("incorrect password");
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