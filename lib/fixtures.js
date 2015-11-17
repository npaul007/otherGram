if(Meteor.users.find().count() === 0){
	Accounts.createUser({
		username:'nate',
		password:'fabecadeba',
		profile:{
			type:'admin'
		}
	}); 
}