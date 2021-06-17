const express = require('express');
const adminRoutes = express.Router();
const multer = require('multer');
const path= require('path');
const Bookdata = require('../model/Bookdata');
const Authordata = require('../model/Authordata');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/images/'));
    },
    filename : function (req,file,cb) {
        cb(null,Date.now()+'-'+file.originalname
        // +path.extname(file.originalname)
        );
    }
});
 
// process.env.HOME
// Initialize Upload
const uploads = multer({
    storage: storage
});


function router(navAdmin){
    // Home
    adminRoutes.get('/',function(req,res){
        res.render("adminhome",
        {
            navAdmin,
            title:'Library'
        });
    });

    // Books
    adminRoutes.get('/books',function(req,res){        
        Bookdata.find()
        .then(function(books){
            res.render("adminbooks",{
                navAdmin,
                title:'Library',
                books
            });
        })     
    });

    // Book
    adminRoutes.get('/books/:id',function(req,res){
        const id= req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('adminbook',{
                navAdmin,
                title:'Library',
                book
            }); 
        });        
    });

    // Delete Book
    adminRoutes.get('/books/delete/:id',function(req,res){
        const id= req.params.id;
        Bookdata.deleteOne({_id:id})
        .then(function(){ 
            res.redirect('/adminhome/books');
        });
    });

     //  Update Book
    adminRoutes.get('/bookupdate/:id',function(req,res){
        const id= req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('bookupdate',{
            navAdmin,
            title:'Library',
            book,
            msg:''
            }); 
        });      
    });
    adminRoutes.post('/bookupdate/update/:id',uploads.single('image'),function(req,res){
        const id= req.params.id; 
        // uploads(req,res,()=>{             
                const item ={
                title :req.body.title,
                author : req.body.author,
                genre : req.body.genre,
                image : req.file.filename,
                details : req.body.details
                } 
     
                const book = Bookdata.updateOne({_id:id},{$set: item})
                .then(function(){
                    res.redirect('/adminhome/books');
                });              
             
    });

     // Add Book
    adminRoutes.get('/addbooks',function(req,res){
        res.render("addbook",{
            navAdmin,
            title:'Library',
            msg: ''           
        });
    });

    adminRoutes.post('/addbooks/add',uploads.single('image'),function(req,res){

        // uploads(req,res,()=>{                          
                const items ={
                    title :req.body.title,
                    author : req.body.author,
                    genre : req.body.genre,
                    image : req.file.filename,
                    details : req.body.details
                }
                const book = Bookdata(items);
                book.save();
                res.redirect('/adminhome/books');
            // });
          
    });
    
    // Authors
    adminRoutes.get('/authors',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("adminauthors",{
                navAdmin,
                title:'Library',
                authors
            });
        })     
    });

    // Author
    adminRoutes.get('/authors/:id',function(req,res){
        const id= req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render('adminauthor',{
                navAdmin,
                title:'Library',
                author

            }); 
        });        
     });
    // Delete Author
    adminRoutes.get('/authors/delete/:id',function(req,res){
        const id= req.params.id;
        Authordata.deleteOne({_id:id})
        .then(function(){ 
            res.redirect('/adminhome/authors');
        });
     });
    
    //  Update Author
    adminRoutes.get('/authorupdate/:id',function(req,res){
        const id= req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
                res.render('authorupdate',{
                navAdmin,
                title:'Library',
                author,
                msg:''
            }); 
        });      
    });
    adminRoutes.post('/authorupdate/update/:id',uploads.single('image'),function(req,res){
        const id= req.params.id;
                const item ={
                    name :req.body.name,
                    nationality : req.body.nationality,
                    image : req.file.filename,
                    details : req.body.details
                }
                Authordata.updateOne({_id:id},{$set: item})
                .then(function(){
                    res.redirect('/adminhome/authors');
                });              
             
    });

    // Add Author
    adminRoutes.get('/addauthors',function(req,res){
        res.render("addauthor",{
            navAdmin,
            title:'Library',
            msg:''
            });
        });
    
    adminRoutes.post('/addauthors/add',uploads.single('image'),function(req,res){
                         
                const item ={
                    name :req.body.name,
                    nationality : req.body.nationality,
                    image : req.file.filename,
                    details : req.body.details
                }
                const author = Authordata(item);
                author.save();
                res.redirect('/adminhome/authors');
    });    
        
    return adminRoutes;
}

module.exports = router;
