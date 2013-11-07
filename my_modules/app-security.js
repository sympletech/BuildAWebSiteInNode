var appSecurity = function(){
    var passport = require('passport')
        , TwitterStrategy = require('passport-twitter').Strategy
        , db = require('../data/db')
        , app = require('../app');

    this.init = function(){
        passport.use(new TwitterStrategy({
                consumerKey: 'VqcWMfL7wWsAwicF6zBw',
                consumerSecret: 'nZsLvaOVTSGdWEORLQDeToeGoZgMY2tlLuiAtU60qU',
                callbackURL: "http://127.0.0.1:3000/login/twitter/callback",
                passReqToCallback: true
            },
            function(req, token, tokenSecret, profile, done) {
                if(!req.user){
                    //Not Logged In
                    db.userModel.findOne({twitterId: profile.id}, function(err, user){
                        if(user == null){
                            user = new db.userModel({
                                twitterId : profile.id,
                                username : profile.username,
                                displayName : profile.displayName
                            });
                            user.save(function(err, user){
                                done(null, user);
                            });
                        }else{
                            done(null, user);
                        }
                    });
                }else{
                    //Already Logged In
                    done(null, req.user);
                }

            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user.twitterId);
        });

        passport.deserializeUser(function(id, done) {
            db.userModel.findOne({twitterId: id}, function(err, user){
                done(err, user);
            });
        });
    }
};

module.exports = new appSecurity();