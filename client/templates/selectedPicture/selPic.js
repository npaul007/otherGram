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

