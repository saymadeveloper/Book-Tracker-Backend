let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: Date,
    modified_at: Date,
})
userTable = mongoose.model("users", userSchema, "users")

module.exports = userTable;