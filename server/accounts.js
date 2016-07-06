Meteor.publish('accounts',function(){
	return Meteor.users.find();
});
