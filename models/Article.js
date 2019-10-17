var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create new UserSchema obj using Schema constructor
var ArticleSchema = new Schema({

    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// creates model with schema above using mongoose model method
var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;