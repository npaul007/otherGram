Template.selectedPicture.helpers({
	'selectedPic':function(){
		return Images.find({_id:Session.get('selectedPicture')});
	}
});

Template.selectedPicture.rendered = function(){
	var lastPage = Session.get('previousPage');

	if(lastPage === "worldPics"){
		$('.fa-globe').addClass('active');
	}

	else if(lastPage === "yourPics"){
		$('.fa-home').addClass('active');
	}
}