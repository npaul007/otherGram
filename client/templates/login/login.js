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
	},
	'click #forgotPassword':function(){
		var username = prompt('Please enter your username');

		var recoveryQuestion = Meteor.users.findOne({username:username}).profile.forgotPassword.recoveryQuestion;

		if(recoveryQuestion != null){
			var recoveryAnswer = prompt("Answer the following recovery question:\n" + recoveryQuestion);
			if(recoveryAnswer === Meteor.users.findOne({username:username}).profile.forgotPassword.recoveryAnswer){
				alert('Access Granted.');
				var newPassword = prompt('Please enter your new password:');
				var confirmNewPassword = prompt('Please confirm your new password:');

				while(newPassword != confirmNewPassword){
					alert('Passwords do not match.');
					newPassword = prompt('Please enter your new password:');
					confirmNewPassword = prompt('Please confirm your new password:');
				}
				alert('this works');
				/*Meteor.users.update({username:username}, {$set:{'password':'yolo'}});
				alert('Your new password is:' + newPassword); */
			}else{
				alert('Access Denied.');
			}
		}else{
			alert('This user does not exist.');
		}
	}
});

Template.login.rendered=function(){
	// if user is already logged in
	if(Meteor.userId()){
		Router.go('/world');
	}
}