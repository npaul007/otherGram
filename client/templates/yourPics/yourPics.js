Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()} ,{sort:{"copies.images.updatedAt":-1}});
	}
});

Template.yourPics.events({
 	'dblclick #postedYourPic':function(){
 		if(Meteor.user().profile.type === 'admin' || Meteor.userId() === this.metadata.userId){
 			Images.remove({_id:this._id});
 		}
 	}
});

Template.yourPics.rendered = function(event,template){
	  $("html, body").animate({ scrollTop:$("#navbar-top").offset().top-45 }, "slow");
	  return false;
}