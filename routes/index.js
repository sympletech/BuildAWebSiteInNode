var routes = function(){
    this.RegisterAppRoutes = function(app){
        app.get('/', function(req, res){
            res.render('index', { title: 'An Introduction to building a website in Node.js' });
        });
    };
};

module.exports = new routes();
