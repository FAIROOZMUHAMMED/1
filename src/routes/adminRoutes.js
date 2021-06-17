const express = require('express');
const multer = require('multer');
const path = require('path');
const adminRoutes = express.Router();
adminRoutes.use(express.static('./public'));
const Bookdata = require('../model/Bookdata');
const Authordata = require('../model/Authordata');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/images/',
    filename : function (req,file,cb) {
        cb(null,file.fieldname + '-'+ Date.now()+
        path.extname(file.originalname));
    }
});

// Initialize Upload
const uploads = multer({
    storage: storage,
    fileFilter : function (req,file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check File Type
function checkFileType(file,cb) {
    // Allowed extentions
    const filetypes = /jpeg|jpg|png|gif/;
    // check Extention
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    }
    else{
        cb('Error: Image only!');       
    }
}

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
        Bookdata.remove({_id:id})
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
    adminRoutes.post('/bookupdate/update/:id',function(req,res){

        uploads(req,res,(err)=>{
            if(err){
                const id= req.params.id;
                Bookdata.findOne({_id:id})
                .then(function(book){
                    res.render('bookupdate',{
                    navAdmin,
                    title:'Library',
                    book,
                    msg:err
                    }); 
                }); 
            }
            else{
                const id= req.params.id;
                var item ={
                title :req.body.title,
                author : req.body.author,
                genre : req.body.genre,
                image : req.file.filename,
                details : req.body.details
                } 
     
                Bookdata.updateOne({_id:id},{$set: item})
                .then(function(){
                res.redirect('/adminhome/books');
                });
            };
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

    adminRoutes.post('/addbooks/add',function(req,res){
        
        uploads(req,res,(err)=>{           
            if(err){
                res.render("addbook",{
                    navAdmin,
                    title:'Library',
                    msg: err                   
                });
            }
            else{               
                var item ={
                    title :req.body.title,
                    author : req.body.author,
                    genre : req.body.genre,
                    image : req.file.filename,
                    details : req.body.details
                }
                var book = Bookdata(item);
                book.save()
                res.redirect('/adminhome/books');
            }
        });
          
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
        Authordata.remove({_id:id})
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
    adminRoutes.post('/authorupdate/update/:id',function(req,res){
        uploads(req,res,(err)=>{
            if(err){
                const id= req.params.id;
                Authordata.findOne({_id:id})
                .then(function(author){
                        res.render('authorupdate',{
                        navAdmin,
                        title:'Library',
                        author,
                        msg:err
                    }); 
                }); 
            }
            else{
                const id= req.params.id;
                var item ={
                    name :req.body.name,
                    nationality : req.body.nationality,
                    image : req.file.filename,
                    details : req.body.details
                }
                Authordata.updateOne({_id:id},{$set: item})
                .then(function(){
                    res.redirect('/adminhome/authors');
                }); 
            };
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
    
    adminRoutes.post('/addauthors/add',function(req,res){

        uploads(req,res,(err)=>{            
            if(err){
                res.render("addbook",{
                    navAdmin,
                    title:'Library',
                    msg: err
                       
                });
            }
            else{               
                var item ={
                    name :req.body.name,
                    nationality : req.body.nationality,
                    image : req.file.filename,
                    details : req.body.details
                }
                var author = Authordata(item);
                author.save();
                res.redirect('/adminhome/authors');
            };
        });
    });    
        
    return adminRoutes;
}

module.exports = router;