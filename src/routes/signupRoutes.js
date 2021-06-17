const express = require('express');
const signupRouter = express.Router();
const Userdata = require('../model/Userdata');
signupRouter.use(express.static('./public'));

function router(nav1){
    // signup
   signupRouter.get('/',function(req,res){
        res.render("signup",{
            nav1,
            title:'Library',
            msg:'',
            success:''
        });
    });

    signupRouter.post('/add',(req,res)=>{      
        var item ={
            name :req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        var data = Userdata(item);
        data.save()
        .then(()=>{
            res.render('signup'
            ,{
                nav1,
                title:'Library',
                msg :'',
                success:'Account Created Successfully. please '
            });
        })
        .catch(error=>{
            res.render('signup'
            ,{
                nav1,
                title:'Library',
                msg :'Account Exists.Please Give Another Email !!',
                success:''
            });
        });  
    });

    return signupRouter;

}

module.exports = router;