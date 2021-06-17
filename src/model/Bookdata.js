const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.1a08p.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title : String,
    author : String,
    genre : String,
    image : String,
    details : String
});

var Bookdata = mongoose.model('bookdata',BookSchema);

module.exports = Bookdata;