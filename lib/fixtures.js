if(Meteor.users.find().count() === 0){
	Accounts.createUser({
		username:'adminNate',
		password:'yolo',
		profile:{
			type:'admin'
		}
	}); 
}