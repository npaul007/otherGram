Router.configure({
	layoutTemplate: 'layout'
});

var requireLogin = function(){
  Session.set('currentRouteName', Router.current().route.getName());

  if(Session.get('previousPage') === 'selectedPicture'){
    removeActive();
  }

  if(!Meteor.userId()){
  	if(Meteor.loggingIn()){
  		this.render('loadingBlack');
  	}else{
    	this.render('login');
	  }
  }else{
    this.next();
  }
}

function removeActive(){
  var icons = [
    '.fa-globe',
    '.fa-instagram',
    '.fa-user-plus',
    '.fa-home'
  ];

  for(var k = 0; k < icons.length; k++){
    if($(icons[k]).hasClass('active')){
      $(icons[k]).removeClass('active');
    }
  }
}

Router.route('/register');

Router.route('/', {name:'worldPics',onBeforeAction:requireLogin});

Router.route('/yourPics',{onBeforeAction:requireLogin});

Router.route('/photoCrop',{onBeforeAction:requireLogin});

Router.route('/people',{onBeforeAction:requireLogin});

Router.route('/selectedPicture',{onBeforeAction:requireLogin});

Router.route('/people/:parameter',{
  name:'seePics',
  onBeforeAction:requireLogin,
  data:function(){
    return this.params.parameter;
  }
});
