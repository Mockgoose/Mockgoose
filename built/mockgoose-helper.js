"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require('debug');
var async_1 = require("async");
var MockgooseHelper = (function () {
    function MockgooseHelper(mongoose) {
        this.mongoose = mongoose;
        this.debug = Debug('MockgooseHelper');
    }
    MockgooseHelper.prototype.reset = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            async_1.each(_this.mongoose.connections, function (connection, callback) {
                if (connection.readyState !== 1) {
                    return callback();
                }
                connection.dropDatabase(function (err) {
                    callback();
                }, function (e) {
                    _this.debug("@reset err dropping database " + e);
                    callback();
                });
            }, function (err) {
                if (err) {
                    _this.debug("@reset err " + err);
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    };
    ;
    MockgooseHelper.prototype.isMocked = function () {
        return this.mongoose.mocked;
    };
    return MockgooseHelper;
}());
exports.MockgooseHelper = MockgooseHelper;
//# sourceMappingURL=/Users/winfinit/workspace/rj/Mockgoose/mockgoose-helper.js.map