var db = function(){
    var self = this,
        mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/puppies');

    self.puppyModel = mongoose.model('puppy', {
        name : String,
        breed : String,
        age : Number
    });

};

module.exports = new db();