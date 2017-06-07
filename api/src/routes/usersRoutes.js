module.exports = function(app) {
    const User = require('../models/models').UserModel;


    //
    //  GET all users
    //
    app.get('/users/getAllUsers', function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, users: users});
        });
    });


    //
    //  GET all users validated
    //

    app.get('/users/getAllUsersValidated', function (req, res) {
        User.find({ validated: true }, function (err, users) {
            if (err)
                res.json({success: false, message: err});
            else
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
            else
                res.json({success: true, users: users});
        });
    });

    //
    // ADD User
    //

    app.post('/users/addUser', function (req, res) {
        User.findOne({email: req.body.email}, function(err, isEnable){
            console.log(isEnable);
            if (err)
                res.json({success: false, message: err});
            else {
                if (isEnable) {
                    res.json({success: false, message: "User already exists"});
                }
                else {
                    var newUser = new User();

                    newUser.email = req.body.email;
                    newUser.password = req.body.password;
                    newUser.role = req.body.role;
                    newUser.validated = false;

                    newUser.save(function(err){
                        if (err)
                            res.json({success: false, message: err});
                        else
                            res.json({success: true, message: "User created"});
                    });
                }
            }
        });
    });

    //
    // VALIDATE User
    //

    app.post('/users/validateUser', function (req, res) {
        if (checkRole(req.headers['x-token'], 0) == false)
            res.json({success: false, message: 'User unauthorized'});
        else {
            User.findOne({ email: req.body.email }, function (err, userToValidate) {
                if (err)
                    res.json({success: false, message: err});
                else {
                    if (userToValidate) {
                        userToValidate.validated = true;
                        userToValidate.save();
                        res.json({success: true, message: "User validated"});
                    }
                    else
                        res.json({success: false, message: "User not found"});
                }
            });
        }
    });

    //
    // DELETE User
    //

    app.post('/users/deleteUser', function (req, res) {
        if (checkRole(req.headers['x-token'], 0) == false)
            res.json({success: false, message: 'User unauthorized'});
        else {
            User.findOne({ email: req.body.email }, function (err, userToDel) {
                if (err)
                    res.json({success: false, message: err});
                else {
                    if (userToDel) {
                        User.remove({ email: req.body.email }, function (err, userToDel) {
                            if (err)
                                res.json({success: false, message: err});
                            else
                                res.json({success: true, message: "User deleted"});
                        });
                    }
                    else
                        res.json({success: false, message: "User not found"});
                }
                    
            });
        }
    });

};