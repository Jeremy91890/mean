module.exports = function(app) {
    const User = require('../models/models').UserModel;

    app.get('/users/getAllUsers', function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, users: users});
        });
    });

    app.post('/users/addUser', function (req, res) {
        let newUser = new User();

        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.role = req.body.role;
        newUser.validated = 0;

        newUser.save(function(err){
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, message: "User created"});
        });
    });

    app.post('/users/validateUser', function (req, res) {
        User.findOne({ email: req.body.email }, function (err, userToValidate) {
            userToValidate.validated = 1;
            userToValidate.save();
            if (err)
                res.json({success: false, message: err});
        });
        res.json({success: true, message: "User validated"});
    });

    app.post('/users/deleteUser', function (req, res) {
        User.remove({ email: req.body.email }, function (err, userToDel) {
            if (err)
                res.json({success: false, message: err});
        });
        res.json({success: true, message: "User deleted"});
    });

};