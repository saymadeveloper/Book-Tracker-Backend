let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    bookName:String,
    authorName:String,
    year:String,
    summary:String,
    ownerId:String,
    ownerName:String,
    created_at: Date,
    modified_at: Date,
    isDeleted:Boolean,
    isFavorite:Boolean
})

bookTable = mongoose.model("books", userSchema);

module.exports = bookTable;