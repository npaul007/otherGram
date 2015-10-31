Template.register.events({
	'click #submitButton':function(event,template){
		var username = template.find('#username').value;
		var password = template.find('#password').value;
		var passwordConfirm = template.find('#confirmPassword').value;

		if(password.localeCompare(passwordConfirm) !=0){
			alert('passwords do not match');
			return;
		}else{
			
			Accounts.createUser({
				username:username,
				password:password
			});

			Router.go('yourPics');
		}
	}
});