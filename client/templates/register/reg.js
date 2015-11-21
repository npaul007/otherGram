Template.register.events({
	'click #registerSubmitButton':function(event,template){
		var username = template.find('#registerUsername').value;
		var password = template.find('#registerPassword').value;
		var passwordConfirm = template.find('#registerConfirmPassword').value;

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