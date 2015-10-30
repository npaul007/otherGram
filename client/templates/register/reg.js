Template.register.events({
	'click #submitButton':function(event,template){
		var password = template.find('#password').value;
		var passwordConfirm = template.find('#confirmPassword').value;

		if(password.localeCompare(passwordConfirm) !=0){
			alert('passwords do not match');
			return;
		}
	}
});