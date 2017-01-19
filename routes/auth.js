var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var isAuthenticated = require('../middleware/isAuthenticated');
var ensureNewUser = require('../middleware/ensureNewUser');
var moment = require('moment');

router.get('/', isAuthenticated,function (req, res,next) {
    var currentUser = req.session.user;
    res.render('accounts/welcome', {
        currentUser: currentUser
    });

});

router.get('/login',ensureNewUser,function (req, res,next) {
    res.render('accounts/login', {
        errors: req.flash('errors')
    });
});

router.get('/register',ensureNewUser, function (req, res,next) {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

router.post('/register',ensureNewUser, function (req, res,next) {
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    // Sign in with email and pass.
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            // 'userid': user.uid,
            var currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
            var saveUser = {
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'user_type': "member",
                'department': "null",
                'created_at': currentDate,
                'updated_at': currentDate,
                'departmentName': "",
                'admin':"",
                'key': user.uid
            };
            var ref = firebase.database().ref('/users/'+ user.uid);
            ref.set(saveUser);
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function () {
                    req.session.user = saveUser;
                    res.redirect('/');
                })
                .catch(function (error) {
                    // console.log(error);
                    req.flash('errors', "Registered but failed to login. Try again Later");
                    return res.redirect('/login');
                });

        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            // res.send(error);
            req.flash('errors', error.message);
            return res.redirect('/register');
        });
});

router.post('/login',ensureNewUser, function (req, res,next) {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            var checkLogin = firebase.auth().currentUser;
            var database = firebase.database();
            database.ref("users/"+ checkLogin.uid).on('value', function (snapshot) {
                var user = snapshot.val();
                req.session.user = user;
                if (user.user_type == "admin") {
                    res.redirect('/users');
                }
                else {
                    res.redirect('/');
                }
            }, function (error) {
                console.log(error);
            });

        })
        .catch(function (error) {
            console.log(error);
            req.flash('errors', error.message);
            return res.redirect('/login');
        });

});

router.get('/logout', function (req, res) {
    firebase.auth().signOut()
        .then(function () {
        res.redirect("/login");
        })
        .catch(function (error) {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
});

module.exports = router;
