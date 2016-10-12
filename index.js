var utils = require('utils');
var serand = require('serand');

var makes;

exports.findOne = function (id, done) {
    $.ajax({
        method: 'GET',
        url: utils.resolve('autos://apis/v/vehicle-makes/' + id),
        dataType: 'json',
        success: function (make) {
            done(null, make);
        },
        error: function () {
            done(new Error('error retrieving vehicle-makes ' + id));
        }
    });
};

exports.find = function (done) {
    if (makes) {
        return done(null, makes);
    }
    $.ajax({
        method: 'GET',
        url: utils.resolve('autos://apis/v/vehicle-makes'),
        dataType: 'json',
        success: function (data) {
            makes = data;
            done(null, data);
        },
        error: function () {
            done(new Error('error retrieving vehicle-makes'));
        }
    });
};
