module.exports = function(app) {
    const Crime = require('../models/models').CrimeModel;

    app.get('/crimes/getAllCrimes', function (req, res) {
        Crime.find(function (err, crimes) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, crimes: crimes});
        });
    });

    app.get('/crimes/geHundredtLatestCrimes', function (req, res) {
        Crime.find(function (err, crimes) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, crimes: crimes});
        }).sort({'fromdate': -1}).limit(100);
    });

};
