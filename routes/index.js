var routes = function(){

    var _ = require('underscore');

    this.RegisterAppRoutes = function(app){
        app.get('/', function(req, res){
            res.render('index', { title: 'An Introduction to building a website in Node.js' });
        });

        //Puppy API
        //******************************************
        var puppies = [
            {_id: 1, name : 'Koda', breed : 'Siberian Husky', age : '4'},
            {_id: 2, name : 'Yoda', breed : 'German Shepard', age : '6'},
            {_id: 3, name : 'Ginger', breed : 'Pound Puppy', age : '10'},
            {_id: 4, name : 'Dora', breed : 'Dingo', age : '5'}
        ];

        //All Puppies
        app.get('/puppyApi', function(req,res){
            res.json(puppies);
        });

        //Return A Puppy
        app.get('/puppyApi/:id', function(req,res){
            var result = _.find(puppies, function(puppy){
                return puppy._id == req.params.id;
            });
            res.json(result);
        });


        app.post('/puppyApi', function(req,res){
            var puppy = req.body;
            var existing = _.find(puppies, function(puppy){
                return puppy._id == req.body._id;
            });

            if(existing != null){
                var i = _.indexOf(puppies, existing);
                puppies[i] = puppy;
            }else{
                puppies.push(puppy);
            }
        });

        app.delete('/puppyApi/:id', function(req,res){
            puppies = _.reject(puppies, function(puppy){
                return puppy._id == req.params.id;
            });
        });

    };
};

module.exports = new routes();
