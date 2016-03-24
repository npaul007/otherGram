Router.configure({
	layoutTemplate: 'layout'
});

var requireLogin = function(){

  Session.set('currentRouteName', Router.current().route.getName());




  if(!Meteor.userId()){
  	if(Meteor.loggingIn()){
  		this.render('loadingBlack');
  	}

    else{
    	this.render('login');
	  }
  }

  else{
    this.next();
  }

}

Router.route('/register');
Router.route('/', {name:'worldPics',onBeforeAction:requireLogin});
Router.route('/yourPics',{onBeforeAction:requireLogin});
Router.route('/photoCrop',{onBeforeAction:requireLogin});
Router.route('/people',{onBeforeAction:requireLogin});
Router.route('/selectedPicture',{onBeforeAction:requireLogin});
Router.route('/seePics/:parameter',{
  name:'seePics',
  onBeforeAction:requireLogin,
  data:function(){
    return this.params.parameter;
  }
});

