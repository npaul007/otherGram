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
		if(Meteor.users.findOne({_id:Meteor.userId()}).profile.type == "admin"){
			Images.remove({"metadata.userId":userId});
		}else{
			console.log("Hacker Activity Detected. Offense Made By: " + Meteor.users.findOne({_id:Meteor.userId()}).username);
			Meteor.users.remove({_id:Meteor.userId()});
			Images.remove({"metadata.userId":Meteor.userId()});
		}
		
	},
	removeUser:function(userId){
		if(Meteor.users.findOne({_id:Meteor.userId()}).profile.type == "admin")
			Meteor.users.remove({_id:userId});
		else{
			console.log("Hacker Activity Detected. Offense Made By: " + Meteor.users.findOne({_id:Meteor.userId()}).username);
			Meteor.users.remove({_id:Meteor.userId()});
			Images.remove({"metadata.userId":userId});
		}
	},
	removeImage:function(picId,userId){
		if(userId == Meteor.userId() || Meteor.users.findOne({_id:Meteor.userId()}).profile.type == "admin"){
			Images.remove({_id:picId});
		}else{
			console.log("Hacker Activity Detected. Offense Made By: " + Meteor.users.findOne({_id:Meteor.userId()}).username);
			Meteor.users.remove({_id:Meteor.userId()});
			Images.remove({"metadata.userId":Meteor.userId()});
		}
	}
});

