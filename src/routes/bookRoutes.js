const express = require('express');
const booksRouter = express.Router(); 
const Bookdata = require('../model/Bookdata');
booksRouter.use(express.static('./public'));

function router(nav){
    // Books
    booksRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("books",{
                nav,
                title:'Library',
                books
            });
        })
    });
    // book
    booksRouter.get('/:id',function(req,res){
        const id= req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('book',{
                nav,
                title:'Library',
                book
            }); 
        });
     });

    return booksRouter;

}
module.exports = router;

