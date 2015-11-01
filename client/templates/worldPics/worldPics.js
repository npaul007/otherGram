
Template.worldPics.helpers({
 	'images': function(){
 		return Images.find() ;
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