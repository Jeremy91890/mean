/**
 * In this file you should define your model
 **/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Schema - Crime
var CrimeSchema = mongoose.Schema({
	compnos: String,
	naturecode: String,
    incident_type_description: String,
    main_crimecode: String,
    reptdistrict: String,
    reportingarea: Number,
    fromdate: Date,
    weapontype: String,
    shooting: Boolean,
    domestic: Boolean,
    shift: String,
    year: Number,
    month: Number,
    day_week: String,
    ucrpart: String,
    x: Number,
    y: Number,
    streetname: String,
    xstreetname: String,
    location: String
},
 {collection: 'crime_incident_reports'});
var CrimeModel = mongoose.model('Crime', CrimeSchema);

//Schema - User
var UserSchema = mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    role: Number,
    validated: Boolean
}, {collection: 'users'});
var UserModel = mongoose.model('User', UserSchema);

module.exports = {
    CrimeModel: CrimeModel,
    UserModel: UserModel
};
