Template.selectedPicture.helpers({
	'selectedPic':function(){
		return Images.find({_id:Session.get('selectedPicture')});
	}
});

Template.selectedPicture.rendered = function(){
	Session.set('previousPage',Router.current().route.getName());
}