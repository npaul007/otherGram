Template.register.events({
	'click #registerSubmitButton':function(event,template){
		var username = template.find('#registerUsername').value;
		var password = template.find('#registerPassword').value;
		var passwordConfirm = template.find('#registerConfirmPassword').value;

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
					type:'normal'
				}
			});

			Router.go('yourPics');
		}
	},
	'keypress input':function(event,template){
		var keyCode = event.keyCode;
		if(keyCode === 13){
			template.find('#registerSubmitButton').click();
		}
	}
});