Template.selectedPicture.helpers({
	'selectedPic':function(){
		return Images.find({_id:Session.get('selectedPicture')});
	}
});

Template.registerHelper("reverseComments",function(arr){
	arr.reverse();
});

Template.selectedPicture.rendered = function(){
	var selPic = Session.get('selectedPicture');

	if(typeof selPic === 'undefined'){
		history.go(-1);
	}

	//Session.set('previousPage',Router.current().route.getName());
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


