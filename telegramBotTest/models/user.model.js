const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    userId: {type: Number, unique: true, required: true},
    username: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    authDate: {type: Date, default: Date.now}
})

const User = model("User", userSchema);

module.exports = User;