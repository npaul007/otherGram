Template.selectedPicture.helpers({
	'selectedPic':function(){
		return Images.find({_id:Session.get('selectedPicture')});
	}
});

Template.registerHelper("reverseComments",function(arr){
	arr.reverse();
});

Template.registerHelper("adminOnlySees",function(userId){
	if(Meteor.user().profile.type === 'admin' && Meteor.userId() != userId){
		return true;
	}else{
		return false;
	}
});

// id generator
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

Template.selectedPicture.rendered = function(){
	var selPic = Session.get('selectedPicture');

	if(typeof selPic === 'undefined'){
		history.go(-1);
	}

	//Session.set('previousPage',Router.current().route.getName());
}

Template.selectedPicture.events({
	'click #sel-prof':function(){
		var _id = Session.get('selectedPicture');
		var img = Images.findOne({_id:_id});

		Session.set('personSelected',img.metadata.username);

		Router.go(/people/+img.metadata.username);
	},
	'click #sel-comm':function(e){
		e.preventDefault();

		$('#myModal').modal('show');
	},
	 'keypress #commentInput':function(event,template){
 		// if the enter button is pressed and comment input isnt empty, comment is submitted into array
 		if(event.keyCode == 13){
 			event.preventDefault();

 			var comment = event.target.value;

 			if(comment.length == 0){
 				return;
 			}else{
				Meteor.call('insertComment',this._id,guidGenerator(),comment);
				event.target.value = "";
 			}
 		}
 	},
 	'click .fa-thumbs-o-up':function(event){
		event.preventDefault();
		Meteor.call('likePicture',this._id);
	},
	'click .fa-pencil-square-o':function(event,template){
		event.preventDefault();

		var username = event.target.getAttribute('username');
		var userId = event.target.getAttribute('userId');
		var comment = event.target.getAttribute('currentComment');
		var commentId = event.target.getAttribute('commentId');
		var imageId = event.target.getAttribute('currentId');
		var ownersUserId = event.target.getAttribute('ownersUserId');

		if(Meteor.userId() === userId || Meteor.userId() === ownersUserId || Meteor.user().profile.type === 'admin'){
			if(confirm("Would you like to delete this comment?")){
				Meteor.call('removeComment',imageId,commentId,userId,username,comment);
			}else{
				if(Meteor.userId() == userId){
					if(confirm("Would you like to edit this comment?")){
						var edit = prompt("Your comment:",comment);
						Meteor.call('editComment',imageId,userId,username,comment,commentId,edit);
					}
				}
			} 
		}
	},
	'click #sel-del':function(){
 		if(Meteor.userId() === this.metadata.userId || Meteor.user().profile.type === 'admin'){
	 		var del = confirm("Are you sure you want to delete this picture?");
	 		if(del){
	 			Meteor.call('removeImage',this._id, this.metadata.userId);
	 			history.go(-1);
	 		}
 		}
 	},
 	'click #sel-ban':function(){
 		if(confirm("Are you sure you want to ban " + this.metadata.username + "?")){
 			Meteor.call('removeUser',this.metadata.userId);
 			Meteor.call('removeUserImages',this.metadata.userId);
 			history.go(-1);
 		}
 	}
});



