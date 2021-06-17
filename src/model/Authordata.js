const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.1a08p.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name : String,
    nationality : String,
    image : String,
    details : String
});

var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;