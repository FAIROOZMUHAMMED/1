const express = require('express');
const userRoutes = express.Router();

function router(nav){
    // User Home
    userRoutes.get('/',function(req,res){
        res.render("userhome",
        {
            nav,
            title:'Library'
        });
    });

  return userRoutes;

}

module.exports = router;