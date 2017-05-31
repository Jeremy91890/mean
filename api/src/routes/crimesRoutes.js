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
    	let id = req.params.id;
        Crime.findOne({_id: id}, function (err, crimes) {
            if (err)
                res.json({success: false, message: err});
            res.json({success: true, crimes: crimes});
        });
    });

 	//
    // CREATE Crime
    //

    app.post('/crimes/addCrime', function (req, res) {
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
		    console.log(newCrime);

    	  newCrime.save(function(err, data) {
  			if (err)
  				return (res.send(err))
            res.json({success: true, message: data});

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
