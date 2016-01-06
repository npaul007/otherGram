Template.worldPics.helpers({
 	'images': function(){
 		return Images.find({},{sort:{"copies.images.updatedAt":-1}});
 	}
});

Template.registerHelper("timeSincePosted",function(date){
	return timeSince(date);
});

timeSince = function(date) {
	switch (typeof time) {
	    case 'number': break;
	    case 'string': time = +new Date(time); break;
	    case 'object': if (time.constructor === Date) time = time.getTime(); break;
	    default: time = +new Date();
	}
	var time_formats = [
	    [60, 'seconds', 1], // 60
	    [120, '1 minute ago', '1 minute from now'], // 60*2
	    [3600, 'minutes', 60], // 60*60, 60
	    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
	    [86400, 'hours', 3600], // 60*60*24, 60*60
	    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
	    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
	    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
	    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
	    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
	    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
	    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
	    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
	    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
	    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
	];
	var seconds = (+new Date() - time) / 1000,
	    token = 'ago', list_choice = 1;

	if (seconds == 0) {
	    return 'Just now'
	}
	if (seconds < 0) {
	    seconds = Math.abs(seconds);
	    token = 'from now';
	    list_choice = 2;
	}
	var i = 0, format;
	while (format = time_formats[i++])
	    if (seconds < format[0]) {
	        if (typeof format[2] == 'string')
	            return format[list_choice];
	        else
	            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
	    }
	return time;
}

Template.worldPics.onCreated(function () {
  // Use this.subscribe inside onCreated callback
  this.subscribe("images");
});

Template.worldPics.events({
 	/*'click .fa-thumbs-o-up':function(){
 		Images.update({_id:this._id},{$push:{"metadata.likes":Meteor.userId()}});
 	}, */
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
 		$('.picDiv').removeClass('worldPicContainer');
 		$('.yImages').addClass('yourImages');

 		var toHide = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

 		for(var i = 0; i< toHide.length; i++){
 			$(toHide[i]).hide();
 		}
 	},
 	'click #wpBars':function(){
 		$('.picDiv').addClass('worldPicContainer');
 		$('.yImages').removeClass('yourImages');

 		var toShow = ['.pProfile','.pDelete','.pDate','.pLikes','.pUser','.pComment','.pPost'];

 		for(var p = 0; p< toShow.length; p++){
 			$(toShow[p]).show();
 		}
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








