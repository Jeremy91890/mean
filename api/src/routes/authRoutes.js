const User = require('../models/models').UserModel;
var authorizedUsers = [];

createToken = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    var token = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    return (token);
};

checkToken = function (token) {
    for (var row in authorizedUsers) {
        if (authorizedUsers[row].token == token) {
            return true;
        }
    }
    return false;
};

checkRole = function (token, role) {
    for (var row in authorizedUsers) {
        if (authorizedUsers[row].token == token) {
            if (authorizedUsers[row].role <= role)
                return true;
        }
    }
    return false;
}

getMailByToken = function (token) {
    for (var row in authorizedUsers) {
        if (authorizedUsers[row].token == token) {
            return authorizedUsers[row].email;
        }
    }
    return ;
};

module.exports = function(app) {

    app.post('/auth/checkCredentials', function (req, res) {
        User.findOne({email: req.body.email}, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            }
            else if (user) {
                // check if password matches
                if (user.password != req.body.password) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                }
                else {
                    // if user is found and password is right
                    // check if user is validated
                    if (user.validated == true) {
                        // create a token
                        var token = createToken();
                        authorizedUsers.push({token: token, email: user.email, role: user.role, validated: user.validated});
                        // return the information including token as JSON
                        res.json({success: true, token: token, role: user.role});
                    }
                    else
                        res.json({success: false, message: 'Authentication failed. User not allowed.'});
                }
            }
        });
    });

    app.post('/auth/deleteToken', function (req, res) {
        var find = false;
        if (checkToken(req.headers['x-token']) == false)
            res.json({success: false, message: "User unauthorized"});
        else {
            for (var row in authorizedUsers) {
                if (authorizedUsers[row].token == req.body.token) {
                    authorizedUsers.splice(row, 1);
                    find = true;
                    res.json({success: true, message: "token deleted"});
                }
            }
            if (find == false) {
                res.json({success: false, message: "token not exist"});
            }
        }
    });
};
