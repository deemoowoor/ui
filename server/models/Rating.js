var mongoose = require('mongoose');


var ratingSchema = mongoose.Schema({
    takingRegistredPassengerId:String,
    username:String,
    ratedUsername:String,
    ratedDate:Date,
    rating:String,
    ratingScore:String,
    comment:String


});
var Rating = mongoose.model('Rating', ratingSchema);
function createDefaultRatings() {
    Rating.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            Rating.create({username:"triin",ratedUsername:"vladimir",ratedDate:new Date(),rating: 1,comment:"väga hea"});
            Rating.create({username:"jaanus",ratedUsername:"vladimir",ratedDate:new Date(),rating: 1,comment:"täpne ja korralik sõit"});
            Rating.create({username:"jaanus",ratedUsername:"vladimir",ratedDate:new Date(),rating: 1,comment:"hästi sõidab väga normaalne inimene"});
            Rating.create({username:"jaanus",ratedUsername:"vladimir",ratedDate:new Date(),rating: -1,comment:"haises"});
            Rating.create({username:"jaanus",ratedUsername:"vladimir",ratedDate:new Date(),rating: 0,comment:"jäi hiljkas"});
            Rating.create({username:"jaanus",ratedUsername:"triin",ratedDate:new Date(),rating: 1,comment:"täpne ja abivalmis"});
            Rating.create({username:"jaanus",ratedUsername:"triin",ratedDate:new Date(),rating: 1,comment:"viis ukseni aitäh"});
            Rating.create({username:"jaanus",ratedUsername:"triin",ratedDate:new Date(),rating: 1,comment:"väga lõbus sõit"});

        }
    })
}






exports.createDefaultRatings = createDefaultRatings;