var firebase = require("firebase");

module.exports =  function (req,res,next){
    var checkLogin = firebase.auth().currentUser;
    if (checkLogin) {
        var database = firebase.database();
        database.ref("users/"+ checkLogin.uid).on('value', function (snapshot) {
            var user = snapshot.val();
            if(user.user_type == "admin"){
                return next();
            }
            else{
                res.redirect('/denied');
            }

        }, function (error) {
            console.log(error);
        });
        // res.send(checkLogin);
    }
    else{
        res.redirect('/login');
    }
};

