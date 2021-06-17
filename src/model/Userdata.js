const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.1a08p.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : String,
    email : {type :String, unique:true },
    password : String,
});

var Userdata = mongoose.model('userdata',UserSchema);

module.exports = Userdata;