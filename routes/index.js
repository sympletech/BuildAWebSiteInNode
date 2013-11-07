var routes = function(){

    var _ = require('underscore'),
        db = require('../data/db'),
        app = require('../app'),
        passport = require('passport');

    function securedRoute() {
        return function(req, res, next) {
            if(req.user)
                next();
            else
                res.redirect('/login');
        }
    }

    this.RegisterAppRoutes = function(app){
        app.get('/',
            securedRoute(),
            function(req, res){
                res.render('index', { title: 'An Introduction to building a website in Node.js', user : req.user  });
        });

        //Login
        //******************************************

        app.get('/login', function(req, res){
            res.render('login', {title : 'Please Login'});
        });

        app.get('/login/twitter', passport.authenticate('twitter'));

        app.get('/login/twitter/callback',
            passport.authenticate('twitter', { successRedirect: '/',
                failureRedirect: '/login' }));

        app.get('/logout', function(req, res){
            req.session.destroy();
            req.user = null;
            res.redirect('/login');
        });

        //Puppy API
        //******************************************

        //All Puppies
        app.get('/puppyApi', function(req,res){
            db.puppyModel.find(function(err, puppies){
                res.json(puppies);
            });
        });

        //Return A Puppy
        app.get('/puppyApi/:id', function(req,res){
            db.puppyModel.findOne({_id : req.params.id }, function(err, puppy ){
                res.json(puppy);
            });
        });

        app.post('/puppyApi', function(req,res){
            db.puppyModel.findOne({_id : req.body._id }, function(err, puppy ){
                var newPuppy = false;
                if(puppy == null){
                    puppy = new db.puppyModel();
                    newPuppy = true;
                }
                puppy.name = req.body.name;
                puppy.breed = req.body.breed;
                puppy.age = req.body.age;

                puppy.save(function(err, p){
                    res.json(newPuppy ? 'Puppy Has Been Created' : 'Puppy Has Been Updated' );
                });
            });
        });

        app.delete('/puppyApi/:id', function(req,res){
            db.puppyModel.findOne({_id : req.params.id }, function(err, puppy ){
                puppy.remove(function(err){
                    res.json('Puppy Has Been Deleted');
                });
            });
        });

    };
};

module.exports = new routes();
