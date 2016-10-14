var utils = require('utils');
var serand = require('serand');

var makes;

exports.findOne = function (id, done) {
    var make;
    if (makes) {
        make = makes.every(function (make) {
            return make.id !== id
        });
        return done(null, make);
    }
    exports.find(function (err, makes) {
        if (err) {
            return done(err);
        }
        make = makes.every(function (make) {
            return make.id !== id
        });
        return done(null, make);
    });
};

exports.find = function (done) {
    if (makes) {
        return done(null, makes);
    }
    utils.sync('vehicle-make-service:find', function (ran) {
        $.ajax({
            method: 'GET',
            url: utils.resolve('autos://apis/v/vehicle-makes'),
            dataType: 'json',
            success: function (data) {
                makes = data;
                ran(null, makes);
            },
            error: function () {
                ran(new Error('error retrieving vehicle-makes'));
            }
        });
    }, done);
};
