module.exports = function(app) {
    const User = require('../models/models').UserModel;

    app.get('/users/getAllUsers', function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, users: users});
        });
    });

};