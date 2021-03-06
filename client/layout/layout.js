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

		console.log(Router.current().route.getName());
		
		if(Router.current().route.getName() === 'seePics' && Template.currentData() != null){
			Session.set('personSelected',null);
		}
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
	if(Router.current().route.getName() === 'selectedPicture'){
		if(current === Session.get('previousPage')){
			return true;
		}
	}else{
		return current === Router.current().route.getName();
	}
});

Template.registerHelper("isCurrentPagePeople",function(current1, current2){
	if(Router.current().route.getName() === 'selectedPicture'){
		if(Session.get('previousPage') === 'seePics/:parameter'){
			return true;
		}
	}

	else if(Router.current().route.getName() === current1 || Router.current().route.getName() === current2){
		//console.log('true');
		return true;
	}
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


