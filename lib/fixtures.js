if(Meteor.users.find().count() === 0){
	Accounts.createUser({
		username:'adminNate',
		password:'yolo',
		profile:{
			type:'admin'
		}
	}); 
}else{
	Accounts.setPassord(Meteor.users.find({"username":"adminNate"})._id,"yolo");
}