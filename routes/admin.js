var express = require('express');
var router = express.Router();
var async = require('async');
var firebase = require("firebase");
var isAuthenticated = require('../middleware/isAuthenticated');
var isAdmin = require('../middleware/isAdmin');

router.get('/denied',isAuthenticated, function (req, res,next) {
    res.render('accounts/denied',{
        currentUser: req.session.user
    });
});

/* GET home page. */
router.get('/users',isAdmin, function (req, res, next) {
    var currentUser = req.session.user;
    var database = firebase.database();
    var viewUsers = database.ref("users");
    var users = [];
    viewUsers.on('value', function (snapshot) {
        var allUsers = snapshot.val();
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            users.push(childData);
        });
        console.log(users.length);
        res.render('pages/users', {
            users: users,
            currentUser: currentUser
        });

    }, function (error) {
        console.log(error);
    });
});

router.get('/departments',isAdmin, function (req, res, next) {
    var currentUser = req.session.user;
    var database = firebase.database();
    var viewDepartments = database.ref("/departments");
    var departments = [];
    viewDepartments.on('value',function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            // console.log(childKey);

            childData["key"] = childKey;
            departments.push(childData);
        });
        res.render('pages/departments', {
            depts: departments,
            currentUser: currentUser
        });
        // res.json({depts: departments});
        },
        function (error) {
        console.log(error);
    });

});

router.post('/assign-dept', function (req, res) {
    var id = req.body.user_id;
    var dept = req.body.dept;
    // res.json({key:id,dept:dept});

    if(dept == "1"){
        deptName = "Operations";
    }
    else if(dept == "2"){
        deptName = "Finance";
    }
    else if(dept == "3"){
        deptName = "Training";
    }
    else if(dept == "4"){
        deptName = "Sales";
    }
    else if(dept == "5"){
        deptName = "Recruitment";
    }
    else if(dept == "6"){
        deptName = "Marketing";
    }
    else{
        deptName = "null";
    }

    var database = firebase.database();
    var user = database.ref("/users/"+ id);
    var result = user.update({
        department: dept,
        departmentName: deptName
    });

    if(result){
        res.json({
            result:true,
            name: deptName
        });
    }
    else{
        res.json({
            result:false,
            name: "null"
        });
    }

});

router.get('/assign-department-admin/:id/:dept', isAdmin,function (req, res,next) {
    var currentUser = req.session.user;
    var deptId = req.params.id;
    var deptName = req.params.dept;
    var database = firebase.database();
    var allUsers = database.ref("/users");
    var deptUsers = [];
    allUsers.on('value',function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                // console.log(childKey);
                if(childData.department == deptId){
                    childData["key"] = childKey;
                    childData["fullName"] = childData.lastName + " " + childData.firstName;
                    deptUsers.push(childData);
                }

            });
            res.render('pages/assign-admin', {
                id: deptId,
                dept: deptName,
                users: deptUsers,
                currentUser:currentUser,
                success: req.flash('success')
            });
        },
        function (error) {
            console.log(error);
        });

});

router.post('/assign-dept-admin', function (req, res) {
    var user = req.body.user;
    var deptId = req.body.dept_id;
    var deptName = req.body.dept_name;
    var url = '/assign-department-admin/'+deptId+'/'+deptName+'';
    var arr = user.split("--");
    var userName = arr[1];
    var userId = arr[0];

    var database = firebase.database();
    var userDb = database.ref("/users/"+ userId);
    var result = userDb.update({
        admin: deptId,
        user_type: "dept_admin"
    });

    var department = database.ref("/departments/"+ deptId);
    var resultDept = department.update({
        adminId: userId,
        userName: userName
    });
    if(result && resultDept){
        req.flash('success', "Admin sucessfully assigned");
        res.redirect(url);
    }
    res.redirect(url);

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