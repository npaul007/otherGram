function isAdmin(userId){
	return Meteor.users.findOne({_id:userId}).profile.type == "admin";
}

Meteor.methods({
	editComment:function(id,userId,username,comment,commentId,edit){
		Images.update(
			{
				_id:id,
				"metadata.comments._id":commentId
			},
			{
				$set:
				{
					"metadata.comments.$":
					{
						"_id":commentId,
						"userId":userId,
						"username":username,
						"comment":edit
					}
				}
			}
		);
	},
	insertComment:function(imageId,generatedId,comment){
 		Images.update(
			{
				_id:imageId
			} , 
			{
				$push:{
					"metadata.comments":
					{
						"_id":generatedId,
						"userId":Meteor.userId(),
						"username":Meteor.user().username,
						"comment":comment
					}
				}
			}
		);
	},
	recoverPassword:function(userId,newPassword){
		Accounts.setPassword(userId, newPassword);
	},
	removeUserImages:function(userId){
		if(isAdmin(Meteor.userId())){
			Images.remove({"metadata.userId":userId});
		}else{
			console.log("Hacker Activity Detected. Offense Made By: " + Meteor.users.findOne({_id:Meteor.userId()}).username);
			Meteor.users.remove({_id:Meteor.userId()});
			Images.remove({"metadata.userId":Meteor.userId()});
		}
	},
	removeUser:function(userId){
		if(isAdmin(Meteor.userId())){
			Meteor.users.remove({_id:userId});
		}else{
			console.log("Hacker Activity Detected. Offense Made By: " + Meteor.users.findOne({_id:Meteor.userId()}).username);
			Meteor.users.remove({_id:Meteor.userId()});
			Images.remove({"metadata.userId":Meteor.userId()});
		}
	},
	removeImage:function(picId,userId){
		if(userId == Meteor.userId() || isAdmin(Meteor.userId())){
			Images.remove({_id:picId});
		}else{
			console.log("Hacker Activity Detected. Offense Made By: " + Meteor.users.findOne({_id:Meteor.userId()}).username);
			Meteor.users.remove({_id:Meteor.userId()});
			Images.remove({"metadata.userId":Meteor.userId()});
		}
	}
});

