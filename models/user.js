/*	global	db	*/
const mongoose = require("../database");
const Schema = mongoose.Schema;

module.exports = () =>{
    const contact = Schema({
        name: String,
        email: String
    });    

    const user = Schema({
        name: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        contacts: [contact]
    });

    return mongoose.model('user', user);
};