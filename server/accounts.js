Meteor.publish('accounts',function(){
	return Meteor.users.find();
});

Meteor.users.deny({
 insert: function(){
	 return true;
 },
 update: function(){
	 return true;
 },
 remove: function(){
	 return true;
 }
});