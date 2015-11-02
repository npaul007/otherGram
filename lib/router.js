Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/world', {
  name: 'worldPics',
  waitOn: function() { 
    if(this.ready()){
      this.render()
    }else{
      this.render('loading')
    }
  }
});

Router.route('/',{name:'login'});
Router.route('/register');
Router.route('/yourPics');
Router.route('/photoCrop');
Router.route('/loading');

var requireLogin = function(){
	if(!Meteor.userId()){
		this.render('login');
	}else{
		this.next();
	}

}
