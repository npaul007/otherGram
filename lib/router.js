Router.configure({
	layoutTemplate: 'layout'
});


Router.route('/',{name:'login'});
Router.route('/register');
Router.route('worldPics');

var requireLogin = function(){
	if(!Meteor.userId()){
		this.render('login');
	}else{
		this.next();
	}

}
