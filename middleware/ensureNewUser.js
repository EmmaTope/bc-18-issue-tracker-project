var firebase = require("firebase");

module.exports =  function (req,res,next){
    var checkLogin = firebase.auth().currentUser;
    if (checkLogin) {
        res.redirect('/');
    }
    else{
        return next();
    }
};

