module.exports = function(app) {
    const Crime = require('../models/models').CrimeModel;

    //
    // GET All crimes
 	//

    app.get('/crimes/getAllCrimes', function (req, res) {
        if (checkToken(req.headers['x-token']) == false)
            res.json({success: false, message: "User unauthorized"});
        else {
            Crime.find(function (err, crimes) {
                if (err)
                    res.json({success: false, message: err});
                res.json({success: true, crimes: crimes});
            });
        }
    });

    //
    // GET Crime by ID
    //

    app.get('/crimes/getCrime/:id', function (req, res) {
        if (checkToken(req.headers['x-token']) == false)
            res.json({success: false, message: "User unauthorized"});
        else {
            let id = req.params.id;
            Crime.findOne({_id: id}, function (err, crimes) {
                if (err)
                    res.json({success: false, message: err});
                res.json({success: true, crimes: crimes});
            });
        }
    });

 	//
    // CREATE Crime
    //

    app.post('/crimes/addCrime', function (req, res) {
        if (checkRole(req.headers['x-token'], 1) == false)
            res.json({success: false, message: 'User unauthorized'});
        else {
            var newCrime = Crime();
                
            newCrime.compnos = req.body.compnos;
            console.log(newCrime);
            newCrime.naturecode = req.body.naturecode;
            newCrime.incident_type_description = req.body.incident_type_description;
            newCrime.main_crimecode = req.body.main_crimecode;
            newCrime.reptdistrict = req.body.reptdistrict;
            newCrime.reportingarea = req.body.reportingarea;
            newCrime.fromdate = req.body.fromdate;
            newCrime.weapontype = req.body.weapontype;
            newCrime.shooting = req.body.shooting;
            newCrime.domestic = req.body.domestic;
            newCrime.shift = req.body.shift;
            newCrime.year = req.body.year;
            newCrime.month = req.body.month;
            newCrime.day_week = req.body.day_week;
            newCrime.ucrpart = req.body.ucrpart;
            newCrime.x = req.body.x;
            newCrime.y = req.body.y;
            newCrime.streetname = req.body.streetname;
            newCrime.xstreetname = req.body.xstreetname;
            newCrime.location = req.body.location;
            newCrime.save(function(err, data) {
                if (err)
                    res.json({success: false, message: data});
                else {
                    res.json({success: true, message: data});
                }

            });
        }
    });
  
  //
  // Get 100 latest crimes
  //

    app.get('/crimes/geHundredtLatestCrimes', function (req, res) {
        if (checkToken(req.headers['x-token']) == false)
            res.json({success: false, message: "User unauthorized"});
        else {
            Crime.find(function (err, crimes) {
                if (err)
                    res.json({success: false, message: err});
                res.json({success: true, crimes: crimes});
            }).sort({'fromdate': -1}).limit(100);
        }
    });

  //
  // Get 100 oldest crimes
  //

      app.get('/crimes/geHundredtOldestCrimes', function (req, res) {
          if (checkToken(req.headers['x-token']) == false)
            res.json({success: false, message: "User unauthorized"});
          else {
            Crime.find(function (err, crimes) {
                if (err)
                    res.json({success: false, message: err});
                res.json({success: true, crimes: crimes});
            }).sort({'fromdate': 1}).limit(100);
        }
    });

    //
    // search crime by text
    //

    app.post('/crimes/searchCrimeByText', function (req, res) {
        if (checkToken(req.headers['x-token']) == false)
            res.json({success: false, message: "User unauthorized"});
        else {
            Crime.find({ $text: { $search: req.body.search }}, function (err, crimes) {
                if (err)
                    res.json({success: false, message: err});
                else
                    res.json({success: true, crimes: crimes});
            }).sort({'fromdate': -1}).limit(500);
        }
    });

    //
    // Get crimes by Criterias
    //

    app.post('/crimes/getCrimeByCriterias', function (req, res) {
        if (checkToken(req.headers['x-token']) == false)
            res.json({success: false, message: "User unauthorized"});
        else {
            var query = {};
            if (req.body.natudecode != "null")
                query.naturecode = req.body.naturecode;
            if (req.body.weapontype != "null")
                query.weapontype = req.body.weapontype;
            if (req.body.fromdate != "null")
                query.fromdate = req.body.fromdate;

            Crime.find({fromdate: {$gte: new Date(2015,07,10), $lt: new Date(2015,07,11)}}, function (err, crimes) {
                if (err)
                    res.json({success: false, message: err});
                res.json({success: true, crimes: crimes});
            }).sort({'fromdate': -1});
        }
    });
};
