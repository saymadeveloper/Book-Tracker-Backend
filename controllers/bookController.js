const mongoose = require("mongoose");
const db = require("../db/database");
const userModel = require("../model/userModel");
const bookModel = require("../model/BookModel");
const utils = require("../utils/utils");

module.exports = {
    post:{
        addBookItem: async(req,res) =>{
            
            const bookName = req.body.bookName;
            const authorName = req.body.authorName;
            const year = req.body.year;
            const ownerId = req.user._id;
            const ownerName = req.user.name;
            const data = {
                bookName:bookName,
                authorName:authorName,
                year:year,
                ownerId:ownerId,
                ownerName:ownerName,
                isDeleted:false,
                isFavorite:false,
                created_at: utils.getCurrentDate(),
                modified_at: utils.getCurrentDate(),
            }
            bookModel.create(data)
            .then((result)=>{
                return res.json({
                    status:200,
                    message: "Book Added Successfully Done!!!", 
                    data:result 
                })
            })
            .catch((err)=>{
                return res.json({
                    status:500,
                    message: "Error" + err,
                });
            })
            
            
        }
    },
    get:{
        getBooksItem: async(req,res) =>{
            const id = req.user._id;
            bookModel.find({ownerId: mongoose.Types.ObjectId(id),isDeleted:false,isFavorite:false})
            .then((result)=>{
                return res.json({
                    status: 200,
                    count: result.length,
                    data: result,  
                }) 
            })
            .catch((err)=>{
                return res.json({
                    status: 500,
                    message: "Erro" + err,  
                })
            })
        },
        getfavoriteBooksItem: async(req,res) =>{
            const id = req.user._id;
            bookModel.find({ownerId: mongoose.Types.ObjectId(id),isDeleted:false,isFavorite:true})
            .then((result)=>{
                return res.json({
                    status: 200,
                    count: result.length,
                    data: result,  
                }) 
            })
            .catch((err)=>{
                return res.json({
                    status: 500,
                    message: "Erro" + err,  
                })
            })
        }
    },
    put:{
     isFavorite: async (req, res)=>{
      const ownerId = req.user._id;
      const bookId = req.body._id;
      const isFavorite = req.body.isFavorite;
      bookModel.updateOne(
        {
            _id:mongoose.Types.ObjectId(bookId),
            ownerId:mongoose.Types.ObjectId(ownerId)
        },
        {
            $set:{
                isFavorite:isFavorite,
            }
        }
      ).then(result=>{
        return res.json(
            {
                status:200,
                message:"Your book added favorite list!!!",
            }
        )

      }).catch(err=>{
        return res.json({
            status:500,
            message:"Erro" + err,
        });
      })

     }
    },
    delete:{
        deletedBook: async(req,res)=>{
            const id = req.body.id
            bookModel.updateOne(
                {
                    _id:mongoose.Types.ObjectId(id),
                },
                {
                    $set:{
                        isDeleted:true,
                    }
                }
              ).then(result=>{
                return res.json(
                    {
                        status:200,
                        message:"Your book is deleted!!!",
                    }
                )
        
              }).catch(err=>{
                return res.json({
                    status:500,
                    message:"Erro" + err,
                });
              })
        }
    }
}