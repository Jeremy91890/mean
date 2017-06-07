module.exports = function(app) {
    const User = require('../models/models').UserModel;

    //
    //  GET all users validated
    //

    app.get('/users/getAllUsersValidated', function (req, res) {
        User.find({ validated: true }, function (err, users) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, users: users});
        });
    });

    //
    //  GET all users non-validated
    //

    app.get('/users/getAllUsersNonValidated', function (req, res) {
        User.find({ validated: false }, function (err, users) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, users: users});
        });
    });

    //
    // ADD User
    //

    app.post('/users/addUser', function (req, res) {
        var newUser = new User();

        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.role = req.body.role;
        newUser.validated = false;

        newUser.save(function(err){
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, message: "User created"});
        });
    });

    //
    // VALIDATE User
    //

    app.post('/users/validateUser', function (req, res) {
        User.findOne({ email: req.body.email }, function (err, userToValidate) {
            userToValidate.validated = true;
            userToValidate.save();
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, message: "User validated"});
        });
    });

    //
    // DELETE User
    //

    app.post('/users/deleteUser', function (req, res) {
        User.remove({ email: req.body.email }, function (err, userToDel) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, message: "User deleted"});
        });
    });

};