Router.configure({
	layoutTemplate: 'layout'
});

var requireLogin = function(){
  if(!Meteor.userId()){
    this.render('login');
  }else{
    this.next();
  }

}

Router.route('/world', {
  name: 'worldPics',
  waitOn: function() { 
    if(this.ready()){
      this.render()
    }else{
      this.render('loading')
    }
  },
  onBeforeAction:requireLogin
});

Router.route('/',{name:'login'});
Router.route('/register');
Router.route('/yourPics',{onBeforeAction:requireLogin});
Router.route('/photoCrop',{onBeforeAction:requireLogin});
Router.route('/loading',{onBeforeAction:requireLogin});


