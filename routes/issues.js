var express = require('express');
var router = express.Router();
var async = require('async');
var firebase = require("firebase");
var helper = require('../util/helper');
var moment = require('moment');
var Validator = require('validatorjs');
var isAuthenticated = require('../middleware/isAuthenticated');

router.get('/',isAuthenticated, function (req, res,next) {
    var currentUser = req.session.user;

    var database = firebase.database();
    var viewIssues = database.ref("/issues");
    var issues = [];
    viewIssues.on('value',function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                childData["key"] = childKey;
                issues.push(childData);
            });
            res.render('issues/index', {
                issues: issues,
                currentUser: currentUser
            });
        },
        function (error) {
            console.log(error);
        });

});

router.get('/create',isAuthenticated, function (req, res) {
    var currentUser = req.session.user;
    console.log(currentUser.firstName);
    res.render('issues/create',{
        success: req.flash('success'),
        messages: req.flash('messages'),
        currentUser:currentUser
    });
});

router.post('/',isAuthenticated, function (req, res,next) {
    var currentUser = req.session.user;
    var rules = {
        issue_name : 'required',
        issue_description : 'required',
        issue_priority : 'required',
        issue_dept : 'required'
    };
    var deptValues = req.body.issue_dept;
    var arr = deptValues.split("--");
    var deptId = arr[0];
    var deptName = arr[1];
    var obj = req.body;
    var validator = new Validator(obj,rules);
    validator.setAttributeFormatter(function(attribute) {
        return attribute.replace(/_/g, ' ');
    });
    if(validator.passes()) {
        var database = firebase.database();
        var user = database.ref("/issues/");
        var result = user.push({
            issueName: req.body.issue_name,
            issueDescription: req.body.issue_description,
            issuePriority: req.body.issue_priority,
            issueDeptId: deptId,
            issueDeptName: deptName,
            createdByKey: currentUser.key,
            assignedUserName: "",
            assignedUserId: "",
            issueStatus: "open",
            createdByName: currentUser.lastName + " " + currentUser.firstName,
            openedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
            closedOn: ""
        });
        req.flash('success', "Created Successfully");
        return res.redirect('/issue/create');
    }
    else{
        var errors = helper.validationErrorsToArray(validator.errors.all());
        console.log(errors[0]);
        res.send("bad");
        // req.flash('messages', errors);
        // return res.redirect('/issue/create');
    }

});

module.exports = router;


// router.get('/users', function (req, res, next) {
//     var database = firebase.database();
//     var viewUsers = database.ref("users");
//     var users = [];
//     viewUsers.on('value', function (snapshot) {
//         var allUsers = snapshot.val();
//         async.forEach(allUsers,function(user, userCallback){
//
//             firebase.database().ref('/departments' + user.department).on('value', function (snap) {
//                 if (snap.val() != null) {
//                     user['departmentName'] = snap.val().name;
//                 }
//                 else {
//                     user['departmentName'] = "NULL";
//                 }
//                 // console.log(user);
//                 users.push(user);
//                 userCallback();
//
//             });
//
//         }, function(err){
//             if (err) {
//                 console.log(err);
//             }
//             console.log(users.length);
//             res.render('pages/users', {users: users});
//         });
//
//     }, function (error) {
//         console.log(error);
//     });
// });