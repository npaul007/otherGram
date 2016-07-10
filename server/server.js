function isAdmin(userId){
	return Meteor.users.findOne({_id:userId}).profile.type == "admin";
}

Meteor.methods({
	insertRecoveryQuestion:function(question,answer){
		if(RecoveryQuestions.find({"userId":Meteor.userId()}).count() < 1){
			RecoveryQuestions.insert({"userId":Meteor.userId(),"question":question,"answer":answer});
		}
	},
	getRecoveryQuestion:function(userId){
		var self = RecoveryQuestions.findOne({"userId":userId});
		return self.question;
	},
	checkAnswer:function(){
		
	},
	likePicture:function(imageId){
		if(Images.find(
			{
				$and: [
					{
						_id:imageId
					}, 
					{
						"metadata.likes":
						{
							$elemMatch:
							{
								"userId":Meteor.userId()
							}
						}
					}
				]
			}
			).count() > 0){
			Images.update({_id:imageId}, {$pull:{"metadata.likes":{"userId":Meteor.userId()}}});
		}else{
			Images.update({_id:imageId}, {$push:{"metadata.likes":{"userId":Meteor.userId()}}});
		}
	},
	editComment:function(id,userId,username,comment,commentId,edit){
		if(userId == Meteor.userId()){
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
		}
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
	removeComment:function(imageId,commentId,userId,username,comment){
		if(isAdmin(Meteor.userId()) || Meteor.userId() == userId){
			Images.update(
				{
					_id:imageId
				} , 
				{
					$pull:
					{
						"metadata.comments":
						{
							"_id":commentId,
							"userId":userId,
							"username":username, 
							"comment":comment
						}
					}
				}
			);
		}
	},
	removeUserImages:function(userId){
		if(isAdmin(Meteor.userId())){
			Images.remove({"metadata.userId":userId});
		}
	},
	removeUser:function(userId){
		if(isAdmin(Meteor.userId())){
			Meteor.users.remove({_id:userId});
			RecoveryQuestions.remove({"userId":userId});
		}
	},
	removeImage:function(picId,userId){
		if(userId == Meteor.userId() || isAdmin(Meteor.userId())){
			Images.remove({_id:picId});
		}
	},
	wipe:function(){
		if(isAdmin(Meteor.userId())){
			Images.remove({});
			ProfilePictures.remove({});
			Meteor.users.remove({"profile.type":"normal"});
			RecoveryQuestions.remove({});
		}
	}
});

