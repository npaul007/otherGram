Router.configure({
	layoutTemplate: 'layout'
});

var requireLogin = function(){
  if(!Meteor.userId()){
  	if(Meteor.loggingIn()){
  		this.render('loading')
  	}
    else{
    	this.render('login');
	  }
  }
  else{
    this.next();
    currentRouteSelected();
  }
}

Router.route('/register');
Router.route('/', {name:'worldPics',onBeforeAction:requireLogin});
Router.route('/yourPics',{onBeforeAction:requireLogin});
Router.route('/photoCrop',{onBeforeAction:requireLogin});

isSelected = function(element){
  var icons = ['.fa-globe','.fa-home','.fa-instagram','.fa-sign-out'];

  for(i = 0; i < icons.length; i++){
    $(icons[i]).removeClass('selected');
  }
  
  $(element).addClass('selected');
}

currentRouteSelected = function(){
  var routeName = Router.current().route.getName();

  switch(routeName){
    //if this.has class bla bla bla
    case 'worldPics': 
      isSelected('.fa-globe');
    break;

    case 'yourPics':
      isSelected('.fa-home');
    break;

    case 'photoCrop':
      isSelected('.fa-instagram');
    break;
  }
}