var db = function(){
    var self = this,
        mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/puppies');

    self.puppyModel = mongoose.model('puppy', {
        name : String,
        breed : String,
        age : Number
    });

    self.userModel = mongoose.model('user',{
        twitterId : Number,
        username : String,
        displayName : String
    });

};

module.exports = new db();