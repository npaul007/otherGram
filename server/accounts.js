Meteor.publish('accounts',function(){
	return Meteor.users.find();
});

Meteor.users.allow({
 insert: function(){
	 return false;
 },
 update: function(){
	 return false;
 },
 remove: function(){
	 return false;
 }
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

RecoveryQuestions = new Mongo.Collection("recoveryquestions");

RecoveryQuestions.allow({
 insert: function(){
	 return true;
 },
 update: function(){
	 return false;
 },
 remove: function(){
	 return false;
 }
});

RecoveryQuestions.deny({
 insert: function(){
	 return false;
 },
 update: function(){
	 return true;
 },
 remove: function(){
	 return true;
 }
});