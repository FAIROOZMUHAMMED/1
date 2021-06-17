const express = require('express');
const app =new express();
const port = process.env.PORT || 5500;

const nav= [
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    }
];

const nav1= [
    {
        link:'/login',name:'Login'
    },
    {
        link:'/signup',name:'Signup'
    }
];

const navAdmin = [
    {
        link:'/adminhome/books',name:'Books'
    },
    {
        link:'/adminhome/addbooks',name:'Add Books'
    },
    {
        link:'/adminhome/authors',name:'Authors'
    },
    {
        link:'/adminhome/addauthors',name:'Add Author'
    }
];

const booksRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(navAdmin);
const userRouter = require('./src/routes/userRoutes')(nav);
const authorRouter = require('./src/routes/authorRoutes')(nav);
const loginRouter = require('./src/routes/loginRoutes')(nav1);
const signupRouter = require('./src/routes/signupRoutes')(nav1);
// const addauthorRouter = require('./src/routes/addauthorRoutes')(navAdmin);


app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views',__dirname+ '/src/views');
app.use('/books',booksRouter);
// app.use('/adminhome/addbooks',adminRouter);
app.use('/authors',authorRouter);
// app.use('/addauthors',adminRouter);
app.use('/login',loginRouter);
app.use('/userhome',userRouter);
app.use('/signup',signupRouter);
app.use('/adminhome',adminRouter);



app.get('/',function(req,res){
    res.render("index",
    {
        nav1,
        title:'Library'
    });
});

app.listen(port,()=>{
    console.log("server ready at "+port+ " [Admin Details{email: admin@gmail.com , password :Admin@123}]");
});