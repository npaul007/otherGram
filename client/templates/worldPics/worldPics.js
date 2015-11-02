
Template.worldPics.helpers({
 	'images': function(){
 		return Images.find({},{sort:{"copies.images.updatedAt":-1}});
 	}
});

Template.worldPics.rendered=function(){
	 if (!this.rendered){
	    $('#spinner').show();
	  }else{
	  	$('#spinner').hide();
	  }
}

Template.worldPics.events({
 	'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$inc:{"metadata.likes":1}});
 	}
});