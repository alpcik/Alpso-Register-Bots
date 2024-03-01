const { Schema, model } = require("mongoose");

let otoRegisterDatabase = Schema({
    userID: { type: String, default: ""}, 
    roleID: {type: Array, default: []},
    name: {type: String, default: ""},
    age: {type: String, default: ""}
})

module.exports = model("otokayit", otoRegisterDatabase);
