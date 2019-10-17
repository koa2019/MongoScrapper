var mongoose = require('mongoose');

// save reference to Schema constructor
var Schema = mongoose.Schema;

// use Schema contstructor to define Model
var NoteSchema = new Schema ({
    title: String,
    body: String
});

// create a new Note Model using the NoteSchema & mongoose model method
var Note = mongoose.model('Note', NoteSchema);

// export module
module.exports = Note;