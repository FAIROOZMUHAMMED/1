const express = require('express');
const loginRouter = express.Router();
const Userdata = require('../model/Userdata');
loginRouter.use(express.static('./public'));


function router(nav1){
    // login
    loginRouter.get('/',function(req,res){
        res.render("login",
            {
            nav1,
            title:'Library',
            msg:''
            });
    });
    // validation
    loginRouter.post('/valid',async(req,res)=>{
        
        try {
            
            const email =req.body.email;
            const password =req.body.password;

            const user = await Userdata.findOne({email:email});
            
            // ADMIN [email: admin@gmail.com && password: Admin@123]
            if(email === "admin@gmail.com" && password === "Admin@123"){
                res.redirect('/adminhome');
            }else if(user.password === password){
                res.redirect('/userhome');
            }else{
                res.render('login',
                   {
                    nav1,
                    title:'Library',
                    msg :'Incorrect password !!'
                   }
                );
            }
            
        } 
        catch (error){
            res.render('login',
               {
                nav1,
                title:'Library',
                msg :'Please Create an Account First !!'
               }
            );
        }                
    }); 

    return loginRouter;

}

module.exports = router;


