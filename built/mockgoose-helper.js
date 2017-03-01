"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = require('debug');
var MockgooseHelper = (function () {
    function MockgooseHelper(mongoose) {
        this.mongoose = mongoose;
        this.debug = Debug('MockgooseHelper');
    }
    MockgooseHelper.prototype.reset = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mongoose.connection.db.dropDatabase(function (err) {
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