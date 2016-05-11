Template.selectedPicture.helpers({
	'selectedPic':function(){
		return Images.find({_id:Session.get('selectedPicture')});
	}
});

Template.selectedPicture.rendered = function(){
	var selPic = Session.get('selectedPicture');
	if(typeof selPic === 'undefined'){
		history.go(-1);
	}
}

Template.selectedPicture.events({
	'click #sel-del':function(){
		var deletePicture = confirm('Are you sure you would like to delete this photo?');
	},
	'click #sel-prof':function(){
		var _id = Session.get('selectedPicture');
		var img = Images.findOne({_id:_id});

		console.log(img.metadata.username);

		Router.go(/people/+img.metadata.username);
	},
	'click #sel-comm':function(e){
		e.preventDefault();

		$('#myModal').modal('show');
	}
});

