Template.selectedPicture.helpers({
	'selectedPic':function(){
		return Images.find({_id:Session.get('selectedPicture')});
	}
});

