module.exports = function(app) {
    const Crime = require('../models/models').CrimeModel;

    //
    // GET All crimes
 	//

    app.get('/crimes/getAllCrimes', function (req, res) {
        Crime.find(function (err, crimes) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, crimes: crimes});
        });
    });

    //
    // GET Crime by ID
    //

    app.get('/crimes/getCrime/:id', function (req, res) {
    	let id = req.params.id
        Crime.findOne({_id: id}, function (err, crimes) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, crimes: crimes});
        });
    });

};
