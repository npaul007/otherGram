Router.configure({
	layoutTemplate: 'layout'
});

var requireLogin = function(){
  Session.set('currentRouteName', Router.current().route.getName());

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

Router.onBeforeAction(requireLogin, {
    except: ['/', 'register']
});

Router.route('/reg',{name:'register'});

Router.route('/', {name:'worldPics'});

Router.route('/yourPics');

Router.route('/photoCrop');

Router.route('/people');

Router.route('/selectedPicture');

Router.route('/people/:parameter',{
  name:'seePics',
  data:function(){
    return this.params.parameter;
  }
});
