var mongoose = require('mongoose');
var path = require('path');
var Mockgoose = require(path.join(__dirname, '../built/mockgoose')).Mockgoose;
var expect = require('chai').expect;
var mockgoose = new Mockgoose(mongoose);
var Cat = mongoose.model('Cat', { name: String });

// create connection to first database
before("DB1 connection", (done) => {
  mockgoose.prepareStorage().then(function() {
    mongoose.createConnection("mongodb://barbaz", { user: "fakeUser", password: "fakePass" }, (err, res) => {
      if (err) throw err;
      done(err);
    });
  });
}); 

// create connection to second database
before("DB2 connection", (done) => {
  mockgoose.prepareStorage().then(function() {
    mongoose.createConnection("mongodb://foobar", { user: "fakeUser", password: "fakePass" }, (err, res) => {
      if (err) throw err;
      done(err);
    });
  });
});

it("should create a cat foo", function(done) {
  Cat.create({name: "foo"}, function(err, cat) {
    expect(err).to.be.falsy;
    done(err);
  });
});

it("should find cat foo", function(done) {
  Cat.findOne({name: "foo"}, function(err, cat) {
    expect(err).to.be.falsy;
    done(err);
  });
});

it("should remove cat foo", function(done) {
  Cat.remove({name: "foo"}, function(err, cat) {
    expect(err).to.be.falsy;
    done(err);
  });
});

// remove collections from a temporary store
after("Drop db",(done) => {
  // Here is when the error is trigged
  mockgoose.helper.reset().then(function() {
    done();
  });
});