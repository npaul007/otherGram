Template.register.events({
	'submit #registerForm':function(event,template){
		event.preventDefault();

		var username = event.target.username.value;
		var password = event.target.password.value;
		var passwordConfirm = event.target.confirmPassword.value;
		var recoveryQuestion = event.target.recoveryQuestion.value;
		var recoveryAnswer = event.target.recoveryAnswer.value;

		if(password.localeCompare(passwordConfirm) != 0 ){
			alert('passwords do not match');
			return;
		}

		else if(Meteor.users.find({username:username}).count() > 0){
			alert('This username is not available');
			return;
		}

		else{
			Accounts.createUser({
				username:username,
				password:password,
				profile:{
					type:'normal',
					forgotPassword:{
						recoveryQuestion:recoveryQuestion,
						recoveryAnswer:recoveryAnswer
					}
				}
			});

			alert("You've successfully registered!");

			Router.go('/yourPics');
		}
	}
});
