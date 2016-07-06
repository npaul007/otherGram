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
	recoverPassword:function(userId,newPassword){
		Accounts.setPassword(userId, newPassword);
	},
	removeUserImages:function(userId){
		Images.remove({"metadata.userId":userId});
	},
	removeUser:function(userId){
		if(Meteor.users.find({_id:Meteor.userId}).profile.type == "admin")
			Meteor.users.remove({_id:userId});
		else
			console.log("Access Denied Hacker Activity Detected");
	},
	removeImage:function(picId){
		Images.remove({_id:picId});
	}
});