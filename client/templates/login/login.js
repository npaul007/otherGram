Template.login.events({
	'click #registerButton':function(){
		Router.go('/register');
	},
	'submit .loginForm':function(event,template){
		event.preventDefault();

		var username = event.target.username.value;
		var password = event.target.password.value;

		Meteor.loginWithPassword(username,password,function(error){
			if(error){
				alert("Invalid Username/Password");
			}
		});

		Session.set('currentDisplaySettingWorldPics',"bars");
	},
	'keypress input':function(event,template){
		var keyCode = event.keyCode;
		if(keyCode === 13){
			template.find('#loginButton').click();
		}

		$('.footer').show();
	},
	'focus input':function(){
		var windowWidth = $(window).width();

		if(windowWidth < 1000){
			$('.footer').hide();
		}
	},
	'blur input':function(){
		$('.footer').show();
	}
});

Template.login.rendered=function(){
	// if user is already logged in
	if(Meteor.userId()){
		Router.go('/world');
	}
}