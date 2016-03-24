Template.selectedPicture.helpers({
	'selectedPic':function(){
		return Images.find({_id:Session.get('selectedPicture')});
	}
});

Template.selectedPicture.rendered = function(){
	var lastPage = Session.get('previousPage');

	if(!Session.get('selectedPicture')){
		history.go(-1);
	}

	if(lastPage === "worldPics"){
		$('.fa-globe').addClass('active');
	}

	else if(lastPage === "yourPics"){
		$('.fa-home').addClass('active');
	}

	if(lastPage === 'seePics/:parameter'){
		$('.fa-user-plus').addClass('active');
	}

	Session.set('previousPage',Router.current().route.getName());
}