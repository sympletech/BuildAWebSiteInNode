var routes = function(){

    var _ = require('underscore'),
        db = require('../data/db');

    this.RegisterAppRoutes = function(app){
        app.get('/', function(req, res){
            res.render('index', { title: 'An Introduction to building a website in Node.js' });
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
