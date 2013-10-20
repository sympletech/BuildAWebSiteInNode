var routes = function(){
    this.RegisterAppRoutes = function(app){
        app.get('/', function(req, res){
            res.render('index', { title: 'Express' });
        });
    };
};

module.exports = new routes();
