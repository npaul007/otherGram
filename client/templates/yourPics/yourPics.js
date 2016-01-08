Template.yourPics.helpers({
	'myImages':function(){
		return Images.find({"metadata.userId":Meteor.userId()} ,{sort:{"copies.images.updatedAt":-1}});
	}
});

Template.yourPics.rendered = function(){
	if(Session.get('currentDisplaySettingYourPics') === "grid"){
		addGrid();
	}else{
		addBars();
	}
}

Template.yourPics.events({
	'click .pPic':function(){
		Session.set('selectedPicture',this._id);
		Session.set('previousPage','YourPics');
		Router.go('/selectedPicture');
	}
	,
 	'dblclick .picDiv':function(){
 		if(Meteor.user().profile.type === 'admin'){
 			Images.remove({_id:this._id});
 		}
 	},
 	'click #deletePostButton':function(){
 		if(Meteor.userId() === this.metadata.userId || Meteor.user().profile.type === 'admin'){
	 		var del = confirm("Are you sure you want to delete this picture?");
	 		if(del){
	 			Images.remove({_id:this._id});
	 		}
 		}
 	},
 	'click #wpGrid':function(){
 		addGrid();
 		Session.set('currentDisplaySettingYourPics',"grid");
 	},
 	'click #wpBars':function(){
 		addBars();
 		Session.set('currentDisplaySettingYourPics',"bars");
 	},
 	'keypress #commentInput':function(event,template){
 		if(event.keyCode == 13){
 			event.preventDefault();
 			var comment = event.target.value;
 			console.log(comment);
 			if(comment.length == 0){
 				return;
 			}else{
	 			Images.update({_id:this._id} , {$push:{"metadata.post":[Meteor.user().username, comment]}});
				event.target.value = "";
 			}
 		}
 	},
 	'focus input':function(){
		var windowWidth = $(window).width();
		if(windowWidth < 1000){
			$('.footer').hide();
		}
	},
	'blur input':function(){
		$('.footer').show();
	}

});

