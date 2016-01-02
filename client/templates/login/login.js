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
	},
	'keypress input':function(event,template){
		var keyCode = event.keyCode;
		if(keyCode === 13){
			var username = template.find('#loginUsername').value;
			var password = template.find('#loginPassword').value;

			Meteor.loginWithPassword(username,password,function(error){
				if(error){
					alert("incorrect password");
				}
			});
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