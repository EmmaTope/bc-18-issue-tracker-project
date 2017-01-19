var express = require('express');
var router = express.Router();
var async = require('async');
var firebase = require("firebase");
var isAuthenticated = require('../middleware/isAuthenticated');


router.get('/', function (req, res) {
   res.send("Good boy");
});
/* GET home page. */
// router.get('/users',isAuthenticated, function (req, res, next) {
router.get('/users', function (req, res, next) {
    var database = firebase.database();
    var viewUsers = database.ref("users");
    var users = [];
    viewUsers.on('value', function (snapshot) {
        var allUsers = snapshot.val();
        async.forEach(allUsers,function(user, userCallback){

            firebase.database().ref('/departments' + user.department).on('value', function (snap) {
                if (snap.val() != null) {
                    user['departmentName'] = snap.val().name;
                }
                else {
                    user['departmentName'] = "NULL";
                }
                // console.log(user);
                users.push(user);
                userCallback();

            });

        }, function(err){
            if (err) {
                console.log(err);
            }
            console.log(users.length);
            res.render('pages/users', {users: users});
        });

    }, function (error) {
        console.log(error);
    });
});

router.get('/departments', function (req, res, next) {
    var database = firebase.database();
    var viewDepartments = database.ref("/departments");
    var departments = [];
    viewDepartments.on('value',function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            // console.log(childKey);
            if(childData.admin == null){
                childData["admin"] = "NO ADMIN";
            }
            childData["key"] = childKey;
            departments.push(childData);
        });

        res.render('pages/departments', {depts: departments});
        // res.json({depts: departments});
        },
        function (error) {
        console.log(error);
    });

});
module.exports = router;

// viewDepartments.once('value')
//     .then(function(snapshot) {
//         var key = snapshot.key;
//         var childKey = snapshot.val();
//         console.log(key);
//         res.json({users: childKey});
//     })
//     .catch(function (error) {
//         var errorMessage = error.message;
//         console.log(errorMessage);
//     });