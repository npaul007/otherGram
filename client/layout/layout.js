Template.layout.events({
	'click .fa-sign-out':function(){
		Meteor.logout();
	},
	'click .fa-globe':function(){
		Router.go('/');
	},
	'click .fa-instagram':function(){
		Router.go('/photoCrop');
	},
	'click .fa-home':function(){
		Router.go('/yourPics');
	},
	'click .fa-user-plus':function(){
		Router.go('/people');
	}
});

Template.navbar.helpers({
	'username':function(){
		return Meteor.user().username;
	},
	'profilePicLoaded':function(){
		return Session.get('profilePicLoaded');
	}
});

Template.registerHelper("profilePic",function(){
	if(ProfilePictures.find({"metadata.userId":Meteor.userId()}).count() < 1){
		return "default-user-icon-profile.png";
	}else{
		return ProfilePictures.findOne({"metadata.userId":Meteor.userId()}).url();
	}
});

Template.navbar.events({
	'click #loggedUserPic':function(event,template){
		template.find('#profilePicUpload').click();
	},
	'change #profilePicUpload':function(){
		var file = $('#profilePicUpload').get(0).files[0]; 
		var fsFile = new FS.File(file);

		fsFile.metadata = {
			userId:Meteor.userId()
		};

		if(ProfilePictures.find({"metadata.userId":Meteor.userId()}).count() > 0){
			var _id = ProfilePictures.findOne({"metadata.userId":Meteor.userId()})._id;
			console.log(_id);
			ProfilePictures.remove({_id:_id});
		}

		ProfilePictures.insert(fsFile,function(error,fileObject){
			if(error){
				alert('Upload failed... please try again.');
				return;
			}else{
				alert('Upload successful!');
			}
		});
	}
});

Template.registerHelper("isCurrentPage",function(current){
	return current === Session.get("currentRouteName");
});

Template.registerHelper("isCurrentPagePeople",function(current1, current2){
	if(Router.current().route.getName() === current1 || Router.current().route.getName() === current2){
		//console.log('true');
		return true;
	}
});

Template.footer.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("currentUser");
});

var ProfilePictureStore = new FS.Store.GridFS('profilePicStore');

ProfilePictures = new FS.Collection("profilePictures",{
	stores:[ProfilePictureStore],
	filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Meteor.subscribe('profilePictures',function onReady(){
	Session.set('profilePicLoaded',true);
});

ProfilePictures.deny({
 insert: function(){
	 return false;
 },
 update: function(){
	 return false;
 },
 remove: function(){
	 return false;
 },
 download: function(){
	 return false;
 }
});

ProfilePictures.allow({
 insert: function(){
	 return true;
 },
 update: function(){
	 return true;
 },
 remove: function(){
	 return true;
 },
 download: function(){
	 return true;
 }
});
